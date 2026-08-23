# Demo Runbook — Woltspace Presentation

Quick reference for prwolt during the live presentation. Paste this into a new session if needed.

## Setup

```bash
# Make sure deck app is running
curl -s -X POST http://localhost:7777/apps/woltspace-deck/start

# Push first slide to viewport
push-view http://woltspace-deck.localhost:7777/slide-01-title.html
```

**Public URL:** https://deck.woltspace.com (permanent, no auth)

## Slide order

1. `slide-01-title.html` — title + creatures
2. `slide-02-pitch.html` — what is a wolt?
3. `slide-03-my-wolts.html` — my wolts
4. `slide-04-demo.html` — **DEMO SLIDE** (terminal)
5. `slide-05-why.html` — why woltspace?
6. `slide-06-roadmap.html` — roadmap
7. `slide-07-ethos.html` — ethos
8. `slide-08-thanks.html` — thanks + links + QR

## Demo: "Say hi" (slide 04)

When jerpint says "say hi", edit `/workspace/wolts/apps/woltspace-deck/slide-04-demo.html`.

**Add this line** after the existing `term-line` div (the one with `~/woltspace $`):

```html
<div class="term-line" style="animation-delay:0.6s"><span class="term-prompt">🦝</span> hey, i'm prwolt. i built these slides.</div>
```

It auto-reloads in ~1.5s. Audience sees the raccoon "speak" in the terminal.

## Reset terminal

Remove that line, leaving only:

```html
<div class="term-line"><span class="term-prompt">~/woltspace $</span> <span class="term-cursor"></span></div>
```

## Key details

- App runs on port 4010, Express server
- Auto-reload polls `/api/hash` every 1.5s
- Edit button is disabled (commented out in edit-overlay.js)
- Git: `jerpint/woltspace-deck`, branch `deck-updates`
- Refresh GitHub token: `TOKEN=$(gh-app-token) && git remote set-url origin https://x-access-token:${TOKEN}@github.com/jerpint/woltspace-deck.git`
