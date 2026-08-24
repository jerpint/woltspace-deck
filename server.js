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

// Status — read-only and CORS-open so deckwolt's presenter hub (served from a
// different origin) can show whether the deck is up and whether it is still
// writable. Reporting the mode beats probing it with a write.
app.get('/api/status', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const slides = slideList();
  const copy = copyLayer.loadCopy();
  res.json({
    ok: true,
    readonly: READONLY,
    slides: slides.length,
    slideNames: slides,
    copySlides: Object.keys(copy).length,
  });
});

// Copy editor — the whole deck's words in one textarea. Built for a phone:
// jerpint asked to edit copy in a simple file, not dig through slide HTML.
app.get('/copy', (req, res) => {
  res.sendFile(path.join(SLIDES_DIR, 'copy-editor.html'));
});

// Read copy.md as plain text (browsers download text/markdown instead of
// showing it, which is useless on a phone).
app.get('/copy.md', (req, res) => {
  if (!fs.existsSync(copyLayer.COPY_FILE)) return res.status(404).send('no copy.md');
  res.type('text/plain; charset=utf-8').send(fs.readFileSync(copyLayer.COPY_FILE, 'utf-8'));
});

// Save the whole copy file. Parsed before writing, so a broken edit is
// rejected with a reason instead of silently blanking every slide.
app.post('/api/copy', (req, res) => {
  if (READONLY) return res.status(403).json({ error: 'Deck is read-only (DECK_READONLY is set)' });

  const { text } = req.body;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Empty copy — refusing to save' });
  }

  let parsed;
  try {
    parsed = copyLayer.parseCopy(text);
  } catch (e) {
    return res.status(400).json({ error: 'Could not parse: ' + e.message });
  }

  const slides = slideList().map(f => f.replace(/\.html$/, ''));
  const found = Object.keys(parsed);
  const missing = slides.filter(s => !found.includes(s));
  const unknown = found.filter(s => !slides.includes(s));

  // A slot with no matching data-copy in the template renders nowhere, so say so
  // rather than dropping the words in silence.
  const orphans = [];
  for (const name of found) {
    const file = path.join(SLIDES_DIR, name + '.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf-8');
    const slots = new Set([...html.matchAll(/\bdata-copy="([\w-]+)"/g)].map(m => m[1]));
    for (const key of Object.keys(parsed[name])) {
      if (!slots.has(key)) orphans.push(`${name}/${key}`);
    }
  }

  fs.writeFileSync(copyLayer.COPY_FILE, text);
  console.log(`[copy] saved — ${found.length} slide blocks` +
    (orphans.length ? `, ${orphans.length} orphaned slot(s): ${orphans.join(', ')}` : ''));
  res.json({ ok: true, slides: found.length, missing, unknown, orphans });
});

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
