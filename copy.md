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
Switch harnesses and it shouldn't matter. Same name, same memory, same home,
same apps — a different engine underneath. That's the whole idea.

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
All three running in one lodge right now. The wolt doesn't notice.

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
- delivered → codexw-scruffy-maple-0df670
- $ woltspace session spawn deckwolt "build slides 6-9"
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
**That last one is literal.** This deck is an app inside woltspace, on jerpint's
box, reachable at `woltspace-deck.woltspace.com` over the public internet — and
deckwolt is editing it while you read.

---

## slide-07-demo

### kicker
live

### heading
Let's actually run it.

### bullets
- *(fill this in once you know the demo — three beats, max)*
- *(what the audience should watch for)*
- *(what it proves)*

### note
Slide exists to hand off. Talk over it, then switch away.

---

## slide-08-close

### brand
woltspace

### tagline
The scaffold for your harnesses

### subtitle
Bring your own harness.

### note
github.com/jerpint/woltspace — and a live lodge to poke at.
