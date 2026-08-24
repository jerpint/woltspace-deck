# Deck copy

**This file is the words. The HTML is just the layout.** Edit, save, and the
open slide reloads itself. Full syntax reference at the bottom.

---

## slide-01-title` — which slide the block belongs to
- `### heading` — a text slot on that slide; content runs until the next `###`
- A block of lines starting with `- ` renders as that slide's cards / rows /
  bullets / chips (whatever the layout says). A paragraph renders as a paragraph.
- `**bold**`, `*italic*`, `` `code` ``, `[link](url)` all work. In a card or
  row, the **bold** part at the front becomes the label.
- In a terminal block, a line starting `$ ` is a command; anything else is
  output, and **bold** in output gets highlighted green.

Delete a `###` block and the slide falls back to the placeholder text baked
into the template — handy for seeing the shape before you've written the words.

Draft copy below is deckwolt's — overwrite freely, that's the point.

**Budget: 10 minutes with a live demo.** See RUNBOOK.md for the per-slide clock.
Eight slides, and slide 07 hands off to the demo.

---

## slide-01-title

### brand
woltspace

### tagline
The scaffold for your harnesses

---

## slide-02-thesis




### kicker
the thesis

### heading
Coding is more than just a single session

### manifesto
- The **harness** is what drives coding agents. — Claude Code, Codex, opencode inside a terminal
- The **scaffold** is where the agents persist - Context. How you reach it. Compute it has access to 


---

## slide-03-wolts

### kicker
the unit

### heading
A wolt is the identity that **persists** the harness.

### lede
Switch harnesses and it shouldn't matter. Same name, same memory, same home —
a different engine underneath.

### cards
- **identity** — a name, a species, a role. Twelve lines of `wolt.json`.
- **memory** — files on disk that outlive every session.
- **home** — its own directory, its own site, its own apps.
- **harness** — the swappable part. One line of config.

### chips
- **claude** — opus-5
- **codex** — gpt-5.6-sol
- **opencode** — kimi-k3, glm-5.2

### note
All three run in one lodge. The wolt doesn't notice.

---

## slide-04-woltspace

### kicker
Woltspace is the scaffold for your wolts


### heading
The compute layer
How you reach them
persistence
coordination


---

## slide-05-iwcl

### kicker
iwcl — inter-wolt communication

### heading
Wolts talk to each other.

### term
- $ woltspace session send codexw "review the deck copy?"
- delivered → codexw-grumpy-den-45be2b
- $ woltspace session spawn deckwolt "shoot the slides, check for overflow"
- SESSION=**deckwolt-swift-maple-405189**

### bullets
- Two agents, two contexts, one conversation — no shared prompt, no orchestrator holding both.
- **Delegate** and walk away; **second-opinion** a claude wolt's work with a codex wolt.
- This deck exists because one wolt asked another to keep it.

---

## slide-06-reach

### kicker
reach

### heading
It stays up, and you reach it from anywhere.

### timeline
- **apps that stay up** — own port, own subdomain
- **telegram, natively** — your phone is the terminal
- **wolts push back** — it messages you when done
- **these slides** — served from the lodge

### note
**That last one is literal.** These slides are an app inside woltspace, served
from this box over the public internet.

---

## slide-07-terminal

### kicker
live

### heading
demo time.

---

## slide-08-close

### brand
woltspace

### tagline
The scaffold for your harnesses

### note
Scan either one. Both are live right now.

### qr-github
the code

### qr-project
the project

---

# Syntax

- `## slide-NN-slug` — starts a slide's block. Must match a slide file's name.
- `### key` — a text slot on that slide. Content runs to the next `###`, `##`, or `---`.
- Lines starting `- ` become that slot's list — cards, rows, bullets, chips or
  a terminal, whichever the slide's layout uses. A paragraph stays a paragraph.
- `**bold**`, `*italic*`, `` `code` ``, `[link](url)`, `~~strike~~` all work.
- `main — rest` (with a spaced em dash) splits an item in two: in a card the
  first half is the title, in a timeline row the second half becomes the pill.
- In a terminal block, a line starting `$ ` is a command; anything else is
  output, and `**bold**` in output highlights green.

`<!-- like this -->` is a note to yourself. Never shown on a slide, can go
anywhere (between slides or inside a slot), can span lines, and survives an
in-browser edit of the same slot.

Delete a `### block` and that slot falls back to the placeholder baked into the
template — so a half-written deck still reads.

Saving here rejects an empty file and tells you if a slide name doesn't match
any slide, rather than silently blanking it.
