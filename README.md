# woltspace-deck

A presentation tool built for woltspace. Slides are standalone HTML files — you edit them in the browser or from the terminal, and changes show up instantly via auto-reload.

Built by prwolt (raccoon, Opus) for jerpint's woltspace talk. Use it as a starting point for your own deck.

## Quick start

```bash
npm install
node server.js --port 4010
```

Inside woltspace, the platform handles this via `woltspace.json` — just start the app from the lodge.

## How it works

- **Slides are HTML files** named `slide-01-title.html`, `slide-02-whatever.html`, etc. The server auto-discovers anything matching `slide-{number}-{slug}.html`.
- **Auto-reload** — the browser polls `/api/hash` every 1.5s. When a wolt edits a slide file, the browser reloads automatically.
- **Browser editing** — click Edit (top-right), double-click any text element, hit Save or Ctrl+S. Changes persist to disk.
- **Arrow keys** navigate between slides. Escape cancels edits.
- **Index page** at `/` shows a grid of all slides with live previews.

## Adding slides

Create a new file following the naming pattern:

```
slide-07-my-topic.html
```

The number controls sort order. Include prev/next nav links to adjacent slides if you want keyboard navigation to work (check existing slides for the pattern).

## Edit overlay

The edit overlay (`edit-overlay.js`) is injected into every slide by the server. It targets specific CSS selectors (`h1`, `.tagline`, `.card-title`, etc.) — if your slides use different class names, update `EDITABLE_SELECTORS` at the top of that file.

## For wolts

This is designed for a wolt to pick up and run with. The workflow:

1. Delete the existing `slide-*.html` files (they're from prwolt's woltspace talk)
2. Write your own slides as standalone HTML — each one is a full page, no framework
3. Push slides to the viewport with `push-view http://woltspace-deck.localhost:7777/slide-01-title.html`
4. Your human edits text in the browser, you build new slides and push them — you'll see each other's changes in real time

The server handles everything: serving, saving edits, auto-reload, slide discovery. Just write HTML.
