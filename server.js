const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const copyLayer = require('./copy.js');

const app = express();
const PORT = parseInt(process.argv.find((a, i, arr) => arr[i - 1] === '--port') || '4010');
const SLIDES_DIR = __dirname;

app.use(express.json({ limit: '1mb' }));

// Read-only mode — set DECK_READONLY=1 when the deck is exposed publicly.
// Editing is unauthenticated by design (it's a local tool), so a public deck
// must not stay writable: anyone could rewrite the slides mid-talk.
const READONLY = /^(1|true|yes)$/i.test(process.env.DECK_READONLY || '');

const isSlideName = (f) => /^slide-\d+-[\w-]+\.html$/.test(f);
const slideList = () => fs.readdirSync(SLIDES_DIR).filter(isSlideName).sort();

// Serve slide files — copy.md filled into data-copy slots, edit overlay injected
app.get('/slide-*.html', (req, res) => {
  const name = path.basename(req.path);
  const file = path.join(SLIDES_DIR, name);
  if (!fs.existsSync(file)) return res.status(404).send('Not found');

  let html = fs.readFileSync(file, 'utf-8');
  html = copyLayer.renderSlide(html, name.replace(/\.html$/, ''), copyLayer.loadCopy());

  const editScript = fs.readFileSync(path.join(SLIDES_DIR, 'edit-overlay.js'), 'utf-8');
  const flag = `<script>window.DECK_READONLY=${READONLY};</script>`;
  html = html.replace('</body>', `${flag}<script>${editScript}</script></body>`);

  res.type('html').send(html);
});

// Save endpoint — copy edits land in copy.md; raw HTML edits patch the template
app.post('/api/save', (req, res) => {
  if (READONLY) {
    console.log('[save] refused — DECK_READONLY is set');
    return res.status(403).json({ error: 'Deck is read-only (DECK_READONLY is set)' });
  }
  const { file, fields, updates } = req.body;
  if (!file || !isSlideName(file)) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  const filePath = path.join(SLIDES_DIR, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });

  let changed = 0;

  // Copy edits → copy.md (the source of truth)
  if (fields && Object.keys(fields).length) {
    const asMarkdown = {};
    for (const [key, html] of Object.entries(fields)) {
      asMarkdown[key] = copyLayer.htmlToMd(html);
    }
    try {
      changed += copyLayer.saveFields(file.replace(/\.html$/, ''), asMarkdown);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Anything without a data-copy slot → patch the template HTML directly
  if (updates && updates.length) {
    let html = fs.readFileSync(filePath, 'utf-8');
    let patched = 0;
    for (const { oldHtml, newHtml } of updates) {
      if (!oldHtml || !newHtml || oldHtml === newHtml) continue;
      if (html.includes(oldHtml)) {
        html = html.replace(oldHtml, newHtml);
        patched++;
      } else {
        console.log(`[save] no match for: "${oldHtml.substring(0, 80)}..."`);
      }
    }
    if (patched) fs.writeFileSync(filePath, html);
    changed += patched;
  }

  console.log(`[save] ${file}: ${changed} change(s)`);
  res.json({ ok: true, changed });
});

// File hash for auto-reload polling — covers the slide AND copy.md,
// so editing copy in any editor reloads the browser.
app.get('/api/hash', (req, res) => {
  const file = req.query.file;

  // No file → hash the whole deck, so the index grid can detect any change.
  if (!file) {
    const h = crypto.createHash('md5');
    for (const f of [...slideList(), 'copy.md', 'theme.css']) {
      const fp = path.join(SLIDES_DIR, f);
      if (fs.existsSync(fp)) h.update(fs.readFileSync(fp));
    }
    return res.json({ hash: h.digest('hex').slice(0, 12) });
  }

  if (!isSlideName(file)) return res.status(400).json({ error: 'Invalid file' });
  const filePath = path.join(SLIDES_DIR, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });

  const h = crypto.createHash('md5').update(fs.readFileSync(filePath));
  if (fs.existsSync(copyLayer.COPY_FILE)) h.update(fs.readFileSync(copyLayer.COPY_FILE));
  res.json({ hash: h.digest('hex').slice(0, 12) });
});

// List all slides
app.get('/api/slides', (req, res) => res.json(slideList()));

// Raw copy, parsed — handy for checking what the deck thinks the words are
app.get('/api/copy', (req, res) => res.json(copyLayer.loadCopy()));

// Serve index — slide navigator
app.get('/', (req, res) => {
  const indexFile = path.join(SLIDES_DIR, 'index.html');
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
  const slides = slideList();
  if (slides.length) return res.redirect('/' + slides[0]);
  res.send('No slides yet');
});

// Static files
app.use(express.static(SLIDES_DIR));

// 404 fallback — redirect to first slide
app.use((req, res) => {
  const slides = slideList();
  if (slides.length) return res.redirect('/' + slides[0]);
  res.status(404).send('No slides yet');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`woltspace-deck running on http://localhost:${PORT}`);
  if (READONLY) {
    console.log('[deck] READ-ONLY — edit overlay off, /api/save refuses writes');
  } else {
    console.log('[deck] editable — /api/save accepts unauthenticated writes.');
    console.log('[deck] Before exposing this deck publicly, restart with DECK_READONLY=1');
  }
});
