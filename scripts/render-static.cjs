// Render a local review copy without starting or publishing an app.
const fs = require('fs');
const path = require('path');
const copy = require('../copy.js');
const root = path.resolve(__dirname, '..');
const target = path.resolve(process.argv[2] || path.join(root, 'dist'));
fs.mkdirSync(target, { recursive: true });
const slides = fs.readdirSync(root).filter(f => /^slide-\d+-[\w-]+\.html$/.test(f)).sort();
const words = copy.loadCopy();
const overlay = fs.readFileSync(path.join(root, 'edit-overlay.js'), 'utf8').split('// Edit overlay')[1];
for (const name of slides) {
  let html = copy.renderSlide(fs.readFileSync(path.join(root, name), 'utf8'), name.slice(0, -5), words);
  if (/[\u2014]|&mdash;|&#8212;|&#x2014;/i.test(html)) throw new Error('Em dash in ' + name);
  html = html.replace('</body>', '<script>window.DECK_READONLY=true;</script><script>// Edit overlay' + overlay + '</script></body>');
  fs.writeFileSync(path.join(target, name), html);
}
for (const name of ['theme.css', 'scene.css', 'scene.js', 'sprites.js', 'qr-github.svg', 'qr-project.svg']) {
  fs.copyFileSync(path.join(root, name), path.join(target, name));
}
let index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
index = index.replace("fetch('/api/slides').then(r=>r.json())", 'Promise.resolve(' + JSON.stringify(slides) + ')');
index = index.slice(0, index.indexOf('// Auto-reload')) + '</script></body></html>';
index = index.replace("a.href='/'+file;", "a.href=file;").replace('src="/${file}"', 'src="${file}"');
fs.writeFileSync(path.join(target, 'index.html'), index);
console.log('Rendered ' + slides.length + ' slides to ' + target);
