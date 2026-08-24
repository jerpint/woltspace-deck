# deck

The woltspace presentation deck. Repo: `woltspace-deck`; the app is named `deck`,
which is what puts it at `deck.woltspace.com`.

A presentation tool built for woltspace. **Copy lives in `copy.md`; layout lives in the slide
HTML.** The human writes words in one markdown file, a wolt builds the slides, and the browser
reloads the moment either one changes.

Originally built by prwolt (raccoon, Opus) for jerpint's April 2026 talk; the copy layer was added
by deckwolt. Use it as a starting point for your own deck.

## Quick start

```bash
npm install
node server.js --port 4010
```

Inside woltspace the platform handles this — start the app from the lodge, never run the start
command directly:

```bash
curl -X POST http://localhost:7777/apps/deck/start
```

## The copy layer

`copy.md` is the source of truth for every word on every slide:

```md
## slide-02-thesis

### heading
The harness is the easy part now.

### bullets
- A harness gives you **one agent, one session**.
- woltspace is the layer around it.
```

- `## slide-NN-slug` — the slide the block belongs to
- `### key` — a text slot on that slide; content runs to the next `###`, `##`, or `---`
- Lines starting with `- ` render as that slot's list (cards / rows / bullets / chips — the
  layout decides which). A paragraph renders as a paragraph.
- `**bold**`, `*italic*`, `` `code` ``, `[link](url)` work. In a card or row, the leading
  **bold** becomes the label.

Slides are templates: any element with `data-copy="key"` gets its contents filled from `copy.md`
at request time. Placeholder text baked into the template shows through until copy exists for
that key, so you can build a layout before the words are written.

Round-trip: browser edits save **back into `copy.md`**, converted to markdown. So in-browser
editing and file editing never fight — there's one source of truth either way.

### Three ways to edit the copy

| | Where | Good for |
|---|---|---|
| **`/copy`** | the whole file in one textarea, Ctrl+S to save | writing, restructuring, phone edits |
| **Edit overlay** | on a slide: Edit button, type in place, Ctrl+S | tweaking one line while looking at it |
| **`copy.md`** | the file on disk, any editor | bulk changes, git |

All three write to the same `copy.md`. Saving from `/copy` rejects an empty file and reports
slide names that don't match any slide, instead of silently blanking them.

## How it works

- **Slides are HTML files** named `slide-01-title.html`, `slide-02-whatever.html`. The server
  auto-discovers anything matching `slide-{number}-{slug}.html`.
- **Auto-reload** — the browser polls `/api/hash` every 1.5s. The hash covers the slide template
  *and* `copy.md`, so editing copy in any editor reloads the browser.
- **Browser editing** — click Edit (top-right), type, hit Save or Ctrl+S. `Ctrl+E` toggles edit
  mode. Escape cancels.
- **Arrow keys** (or space) navigate between slides.
- **`?present`** on any slide URL hides the edit controls for stage use.
- **`DECK_READONLY=1`** turns off editing entirely — the overlay isn't offered and
  `/api/save` returns 403. Auto-reload still works. **Set this whenever the deck is
  reachable from the public internet**: editing is unauthenticated by design, so a
  public writable deck lets anyone rewrite the slides. The server logs its mode at
  startup.
- **Index page** at `/` shows a grid of all slides with live previews.
- **`/api/copy`** returns the parsed copy as JSON — useful for checking what the deck thinks the
  words are.

## Shared assets

- `theme.css` — palette, type, and the list layouts (`ul.cards`, `ul.rows`, `ul.bullets`,
  `ul.chips`), the `.term` terminal block, nav, and the hero brand card. Slides stay ~1KB each.
- `scene.css` + `scene.js` — the pixel forest background scene. Drop both into a slide and it
  builds itself; used on the title and closing slides.
- `sprites.js` — the pixel creatures (beaver, raccoon, otter) from the April deck. Any element
  with `data-sprite="raccoon"` gets the sprite as inline SVG; `data-px` sets the scale.
- Layout classes: `ul.cards[.accent]`, `ul.rows[.striped]`, `ul.bullets`, `ul.chips`,
  `ul.timeline`, `ul.manifesto`, and `.terminal` wrapping a `ul.term`. A list item written
  `main — rest` (spaced em dash) splits into `<strong>` + `<span class="rest">` so each layout
  styles the halves independently.

## Adding slides

Create a file following the naming pattern — the number controls sort order:

```
slide-07-my-topic.html
```

Link `<nav class="slide-nav">` to the adjacent slides so keyboard nav works (copy the pattern from
an existing slide), mark text elements with `data-copy="key"`, then add a matching
`## slide-07-my-topic` block to `copy.md`.

## Runbook

[RUNBOOK.md](RUNBOOK.md) holds the per-slide clock for the live talk, the cut
order if it runs long, and demo pre-flight. Update it whenever the slot changes —
a deck built for 10 minutes is a different deck than one built for 30.

## One deck at a time

The live deck's slides sit at the repo root. When a talk is done it gets archived under `decks/`
and tagged — see [DECKS.md](DECKS.md).
