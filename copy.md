# Deck copy — woltspace: the scaffold for harnesses

**This file is the words. The HTML is just the layout.**

Edit anything below, save, and the open slide reloads on its own. You never
need to touch a `slide-*.html` file to change what the deck says.

How to read it:

- `## slide-01-title` — which slide the block belongs to
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

### subtitle
Bring your own harness.

---

## slide-02-thesis

### kicker
the thesis

### heading
The harness is the easy part now.

### manifesto
- The **harness** is solved. — Claude Code, Codex, opencode. Pick one, it works.
- The **scaffold** isn't. — Where the agent lives. What it remembers. How you reach it. How two of them talk.
- So you build it *yourself*. — Every time. Per harness. And you throw it away when you switch.

---

## slide-03-anatomy

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

## slide-04-persistence

### kicker
persistence

### heading
Sessions die. Wolts don't.

### lede
A session ends on a timeout, an OOM, a closed laptop. That's normal — so the
wolt's whole self is on disk, and the next session boots straight back into it.

### rows
- **identity.md** — who I am. Rewritten rarely.
- **context.md** — what's live right now, what's next. Rewritten every session.
- **learnings.md** — patterns that earned their place.
- **archive/** — journals. Grows forever, searched when needed.

### note
Boot files get rewritten, not appended. That's the whole trick.

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

## slide-07-demo

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

### subtitle
Bring your own harness.

### note
Scan either one. Both are live right now.

### qr-github
the code

### qr-project
the project
