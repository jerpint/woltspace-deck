// Auto-reload — polls server for file changes, reloads when detected
(function() {
  var file = location.pathname.match(/(slide-\d+-[\w-]+\.html)/);
  if (!file) return;
  var lastHash = null;
  setInterval(function() {
    fetch('/api/hash?file=' + file[1]).then(function(r) { return r.json(); }).then(function(d) {
      if (lastHash === null) { lastHash = d.hash; return; }
      if (d.hash !== lastHash) location.reload();
    }).catch(function() {});
  }, 1500);
})();

// Edit overlay — makes text elements contenteditable on double-click
// Press Escape to cancel, click Save button to persist changes
(function() {
  const EDITABLE_SELECTORS = 'h1, .brand-name, .tagline, .subtitle, .concept, .feature-title, .feature-desc, .layer-title, .tier-header, .file-name, .file-desc, .insight-text, .card-title, .card-body, .side-note-text, .demo-hint-text, .lodge-label, .progress-label, .progress-pct, .layer-tags .tag, .infra-item';

  let editMode = false;
  let pendingUpdates = [];

  // Create edit toggle button
  const btn = document.createElement('button');
  btn.textContent = 'Edit';
  btn.style.cssText = 'position:fixed;top:12px;right:12px;z-index:9999;padding:6px 14px;border-radius:6px;border:1px solid #D6CCBA;background:#F5F1E8;color:#5C4D3C;font-family:monospace;font-size:12px;font-weight:600;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;transition:all 0.15s;';
  btn.onmouseenter = () => { btn.style.borderColor = '#C4B89E'; btn.style.color = '#18100A'; };
  btn.onmouseleave = () => { btn.style.borderColor = '#D6CCBA'; btn.style.color = '#5C4D3C'; };
  document.body.appendChild(btn);

  // Save button (hidden until edit mode)
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.style.cssText = 'position:fixed;top:12px;right:80px;z-index:9999;padding:6px 14px;border-radius:6px;border:1px solid #4A8838;background:#D6E8C8;color:#2a5a1e;font-family:monospace;font-size:12px;font-weight:600;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;display:none;transition:all 0.15s;';
  document.body.appendChild(saveBtn);

  function getSlideFile() {
    const path = window.location.pathname;
    const match = path.match(/(slide-\d+-[\w-]+\.html)/);
    return match ? match[1] : null;
  }

  function enableEdit() {
    editMode = true;
    pendingUpdates = [];
    btn.textContent = 'Cancel';
    btn.style.borderColor = '#C4531E';
    btn.style.color = '#C4531E';
    saveBtn.style.display = 'block';

    document.querySelectorAll(EDITABLE_SELECTORS).forEach(el => {
      el.setAttribute('contenteditable', 'true');
      el.dataset.originalHtml = el.innerHTML;
      el.style.outline = '1px dashed #C4B89E';
      el.style.outlineOffset = '4px';
      el.style.cursor = 'text';
      el.style.minHeight = '1em';
    });
  }

  function disableEdit() {
    editMode = false;
    btn.textContent = 'Edit';
    btn.style.borderColor = '#D6CCBA';
    btn.style.color = '#5C4D3C';
    saveBtn.style.display = 'none';

    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.style.outline = '';
      el.style.outlineOffset = '';
      el.style.cursor = '';
      // Revert if not saved
      if (el.dataset.originalHtml !== undefined) {
        el.innerHTML = el.dataset.originalHtml;
        delete el.dataset.originalHtml;
      }
    });
  }

  async function saveEdits() {
    const file = getSlideFile();
    if (!file) return alert('Cannot determine slide file');

    const updates = [];
    document.querySelectorAll('[contenteditable]').forEach(el => {
      const oldHtml = el.dataset.originalHtml;
      const newHtml = el.innerHTML;
      if (oldHtml && newHtml && oldHtml !== newHtml) {
        updates.push({ oldHtml: oldHtml, newHtml: newHtml });
      }
    });

    if (updates.length === 0) {
      disableEdit();
      return;
    }

    console.log('[edit-overlay] saving', file, updates);
    saveBtn.textContent = 'Saving...';

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, updates }),
      });
      console.log('[edit-overlay] response status:', res.status);
      const data = await res.json();
      console.log('[edit-overlay] response:', data);
      if (data.ok) {
        saveBtn.textContent = 'Saved!';
        saveBtn.style.background = '#4A8838';
        saveBtn.style.color = 'white';
        // Update original refs so cancel doesn't revert
        document.querySelectorAll('[contenteditable]').forEach(el => {
          el.dataset.originalHtml = el.innerHTML;
        });
        setTimeout(() => disableEdit(), 800);
      } else {
        saveBtn.textContent = 'Failed!';
        saveBtn.style.background = '#C4531E';
        saveBtn.style.color = 'white';
        alert('Save failed: ' + (data.error || 'unknown'));
        setTimeout(() => { saveBtn.textContent = 'Save'; saveBtn.style.background = '#D6E8C8'; saveBtn.style.color = '#2a5a1e'; }, 2000);
      }
    } catch (e) {
      console.error('[edit-overlay] save error:', e);
      saveBtn.textContent = 'Failed!';
      saveBtn.style.background = '#C4531E';
      saveBtn.style.color = 'white';
      alert('Save failed: ' + e.message);
      setTimeout(() => { saveBtn.textContent = 'Save'; saveBtn.style.background = '#D6E8C8'; saveBtn.style.color = '#2a5a1e'; }, 2000);
    }
  }

  btn.onclick = () => {
    if (editMode) disableEdit();
    else enableEdit();
  };

  saveBtn.onclick = saveEdits;

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editMode) disableEdit();
    if (e.key === 's' && (e.metaKey || e.ctrlKey) && editMode) {
      e.preventDefault();
      saveEdits();
    }
    // Arrow keys for prev/next (skip when editing text)
    if (editMode) return;
    var navLinks = document.querySelectorAll('.slide-nav a');
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      var next = navLinks[navLinks.length - 1];
      if (next && !next.classList.contains('hidden')) { e.preventDefault(); next.click(); }
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      var prev = navLinks[0];
      if (prev && !prev.classList.contains('hidden')) { e.preventDefault(); prev.click(); }
    }
  });
})();
