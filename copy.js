// copy.js — the deck's copy layer.
//
// copy.md is the single source of truth for every word on every slide.
// Slides are layout templates: any element with data-copy="key" gets its
// innerHTML filled from copy.md at request time. The edit overlay saves
// back into copy.md, so in-browser edits and file edits stay in sync.

const fs = require('fs');
const path = require('path');

const COPY_FILE = path.join(__dirname, 'copy.md');

// A field's content ends at the next slide/field header or a `---` separator.
const TERMINATOR = /^(#{2,3}\s|---+\s*$)/;

// ── parse ──────────────────────────────────────────────────────────────
// ## slide-01-title      starts a slide block
// ### heading            starts a field; content runs to the next ###/##
function parseCopy(text) {
  const slides = {};
  let slide = null;
  let field = null;
  let buf = [];

  const flush = () => {
    if (slide && field) slides[slide][field] = buf.join('\n').trim();
    buf = [];
  };

  for (const line of text.split('\n')) {
    const slideMatch = line.match(/^##\s+(slide-\d+-[\w-]+)\s*$/);
    const fieldMatch = line.match(/^###\s+([\w-]+)\s*$/);

    if (slideMatch) {
      flush();
      field = null;
      slide = slideMatch[1];
      slides[slide] = slides[slide] || {};
    } else if (fieldMatch && slide) {
      flush();
      field = fieldMatch[1];
    } else if (/^---+\s*$/.test(line)) {
      flush();
      field = null;
    } else if (field) {
      buf.push(line);
    }
  }
  flush();
  return slides;
}

function loadCopy() {
  if (!fs.existsSync(COPY_FILE)) return {};
  return parseCopy(fs.readFileSync(COPY_FILE, 'utf-8'));
}

// ── markdown → html (inline only, plus lists) ──────────────────────────
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMd(s) {
  return escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<span class="struck">$1</span>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// A field is either a list (every non-blank line starts with "- ") or prose.
function isList(value) {
  const lines = value.split('\n').filter(l => l.trim());
  return lines.length > 0 && lines.every(l => /^\s*-\s+/.test(l));
}

function renderField(value) {
  if (!value) return '';
  if (isList(value)) {
    const items = value.split('\n').filter(l => l.trim())
      .map(l => l.replace(/^\s*-\s+/, ''));
    const isTerm = items.some(i => /^\$\s/.test(i));
    return items.map(item => {
      if (isTerm) {
        const cmd = /^\$\s/.test(item);
        return `<li class="${cmd ? 'cmd' : 'out'}">${inlineMd(item.replace(/^\$\s+/, ''))}</li>`;
      }
      // "main — rest" splits so layouts can style the halves independently.
      // Requires a spaced em/en dash, so mid-sentence hyphens are safe.
      const split = item.match(/^([\s\S]+?)\s+[—–]\s+([\s\S]+)$/);
      if (split) {
        return `<li>${inlineMd(split[1].trim())}` +
               `<span class="rest">${inlineMd(split[2].trim())}</span></li>`;
      }
      return `<li>${inlineMd(item)}</li>`;
    }).join('\n');
  }
  return value.split(/\n{2,}/).map(inlineMd).join('<br><br>');
}

// ── html → markdown (for saving overlay edits back into copy.md) ───────
function htmlToMd(html) {
  const items = [...html.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/gi)]
    .map(m => (/class="[^"]*\bcmd\b[^"]*"/i.test(m[1]) ? '$ ' : '') + m[2]);
  const toMd = (s) => s
    .replace(/\s*<span class="rest">([\s\S]*?)<\/span>/gi, ' — $1')
    .replace(/<span class="struck">([\s\S]*?)<\/span>/gi, '~~$1~~')
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(div|p)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/[ \t]+/g, ' ')
    .trim();

  if (items.length) return items.map(i => `- ${toMd(i)}`).join('\n');
  return toMd(html);
}

// ── write a field back into copy.md, preserving everything else ────────
function saveFields(slideName, fields) {
  if (!fs.existsSync(COPY_FILE)) throw new Error('copy.md not found');
  const lines = fs.readFileSync(COPY_FILE, 'utf-8').split('\n');

  let changed = 0;
  for (const [key, value] of Object.entries(fields)) {
    const span = findFieldSpan(lines, slideName, key);
    if (!span) {
      console.log(`[copy] no such field: ${slideName}/${key}`);
      continue;
    }
    lines.splice(span.start, span.end - span.start, ...value.split('\n'), '');
    changed++;
  }

  fs.writeFileSync(COPY_FILE, lines.join('\n'));
  return changed;
}

// Lines [start, end) hold the field's content (header excluded).
function findFieldSpan(lines, slideName, key) {
  let inSlide = false;
  for (let i = 0; i < lines.length; i++) {
    const slideMatch = lines[i].match(/^##\s+(slide-\d+-[\w-]+)\s*$/);
    if (slideMatch) {
      inSlide = slideMatch[1] === slideName;
      continue;
    }
    if (!inSlide) continue;
    const fieldMatch = lines[i].match(/^###\s+([\w-]+)\s*$/);
    if (fieldMatch && fieldMatch[1] === key) {
      let end = i + 1;
      while (end < lines.length && !TERMINATOR.test(lines[end])) end++;
      return { start: i + 1, end };
    }
  }
  return null;
}

// ── fill a slide template's data-copy slots ────────────────────────────
function renderSlide(html, slideName, copy) {
  const fields = copy[slideName] || {};
  return html.replace(
    /(<(\w+)\b[^>]*\bdata-copy="([\w-]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
    (match, open, tag, key, fallback, close) => {
      if (!(key in fields)) return match;   // no copy yet — keep the placeholder
      return open + renderField(fields[key]) + close;
    }
  );
}

module.exports = { COPY_FILE, loadCopy, parseCopy, renderSlide, renderField, htmlToMd, saveFields };
