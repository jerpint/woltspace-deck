# Deck copy

**This file is the words. The HTML is just the layout.** Edit, save, and the
open slide reloads itself. Full syntax reference at the bottom.

---

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

---

## slide-03-harness

### kicker
harness and scaffold

### manifesto
- The **harness** is what drives coding agents. — Claude Code, Codex, opencode inside a terminal
- The **scaffold** is where the agents persist - Context. How you reach it. Compute it has access to

---

## slide-04-wolts

### kicker
the unit

### heading
The wolt is the identity that **persists**

### lede
Switching harnesses **shouldn't** matter 

### cards
- **identity** — a name, a role, a responsibility.
- **memory** — files on disk that outlive every session.
- **home** — its own directory, its own site, its own apps.
- **skills** — what the wolt can do inside woltspace

### chips
- **claude** — opus-5
- **codex** — gpt-5.6-sol
- **opencode** — kimi-k3, glm-5.2

### note
All three run in one lodge. The wolt doesn't notice.

---

## slide-05-woltspace

### kicker
Woltspace is the scaffold for your wolts


### heading
The compute layer
How you reach them
Coordination

---

## slide-06-compute

### kicker
the compute layer

### heading
A container where everything is allowed.

### timeline
- **a docker container** — on your machine, no permissions prompts
- **all harnesses supported** — if it can run in a CLI, it's compatible
- **cloudflared or your domain** — a real URL for what it runs
- **these slides** — an app in that container

### note
**That last one is literal.** You're looking at a page served out of the
container, over the public internet, from jerpint's box.

---

## slide-07-reach

### kicker
how you reach them

### heading
The terminal is wherever you are.

### timeline
- **telegram** — from your phone, in a thread
- **slack** — same session, your team's channel
- **the terminal** — straight in, when you want to look
- **they reach you** — a wolt pings you when it's done

### note
Same session underneath all three. The interface is a detail.

---

## slide-08-coordination

### kicker
coordination

### heading
Wolts talk to each other.

### lede
The inter-wolt communication layer — one line puts a message in another wolt's
session, and it replies into yours.

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

## slide-09-terminal

### kicker
live

### heading
demo time.

---

## slide-10-close

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
