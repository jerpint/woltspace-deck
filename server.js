const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = parseInt(process.argv.find((a, i, arr) => arr[i - 1] === '--port') || '4010');
const SLIDES_DIR = __dirname;

app.use(express.json({ limit: '1mb' }));

// Serve slide files with edit overlay injected
app.get('/slide-*.html', (req, res) => {
  const file = path.join(SLIDES_DIR, path.basename(req.path));
  if (!fs.existsSync(file)) return res.status(404).send('Not found');

  let html = fs.readFileSync(file, 'utf-8');

  // Inject the edit overlay script before </body>
  const editScript = fs.readFileSync(path.join(SLIDES_DIR, 'edit-overlay.js'), 'utf-8');
  html = html.replace('</body>', `<script>${editScript}</script></body>`);

  res.type('html').send(html);
});

// Save endpoint — receives edited HTML content
app.post('/api/save', (req, res) => {
  const { file, updates } = req.body;
  if (!file || !file.match(/^slide-\d+-[\w-]+\.html$/)) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  const filePath = path.join(SLIDES_DIR, file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });

  let html = fs.readFileSync(filePath, 'utf-8');

  // Apply text updates: find elements by their original text and replace
  for (const { selector, oldText, newText } of updates) {
    if (oldText && newText && oldText !== newText) {
      html = html.replace(oldText.trim(), newText.trim());
    }
  }

  fs.writeFileSync(filePath, html);
  res.json({ ok: true });
});

// List all slides
app.get('/api/slides', (req, res) => {
  const slides = fs.readdirSync(SLIDES_DIR)
    .filter(f => f.match(/^slide-\d+-[\w-]+\.html$/))
    .sort();
  res.json(slides);
});

// Serve index — slide navigator
app.get('/', (req, res) => {
  const indexFile = path.join(SLIDES_DIR, 'index.html');
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  // Fallback: redirect to first slide
  const slides = fs.readdirSync(SLIDES_DIR)
    .filter(f => f.match(/^slide-\d+-[\w-]+\.html$/))
    .sort();
  if (slides.length) return res.redirect('/' + slides[0]);
  res.send('No slides yet');
});

// Static files
app.use(express.static(SLIDES_DIR));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`woltspace-deck running on http://localhost:${PORT}`);
});
