# Deck copy — woltspace: the scaffold for harnesses

**This file is the words. The HTML is just the layout.**

Edit anything below, save, and the open slide reloads on its own. You never
need to touch a `slide-*.html` file to change what the deck says.

How to read it:

- `## slide-01-title` — which slide the block belongs to
- `### heading` — a text slot on that slide; content runs until the next `###`
- A block of lines starting with `- ` renders as that slide's cards / rows /
  bullets (whatever the layout says). A paragraph renders as a paragraph.
- `**bold**`, `*italic*`, `` `code` ``, `[link](url)` all work. In a card or
  row, the **bold** part at the front becomes the label.

Delete a `###` block and the slide falls back to the placeholder text baked
into the template — handy for seeing the shape before you've written the words.

Draft copy below is deckwolt's — overwrite freely, that's the point.

---

## slide-01-title

### brand
woltspace

### tagline
bring your own harness

### subtitle
The scaffold your coding agents run on.

---

## slide-02-thesis

### kicker
the thesis

### heading
The harness is the easy part now.

### lede
Claude Code, Codex, opencode — pick one, it works. What nobody hands you is
everything *around* it: where the agent lives, what it remembers, how you
reach it, how two of them talk.

### bullets
- A harness gives you **one agent, one session, one terminal**.
- Everything past that — identity, memory, reach, coordination — you build yourself. Every time.
- **woltspace is that layer, built once.** The harness is a slot you fill.

---

## slide-03-anatomy

### kicker
the unit

### heading
A **wolt** is a harness with a life around it.

### cards
- **HARNESS** — the agent loop. Pinned per wolt: claude, codex, opencode.
- **IDENTITY** — a name, a species, a role. `wolt.json`, twelve lines.
- **MEMORY** — files on disk that outlive every session.
- **HOME** — its own directory, its own site, its own apps.

### note
Same platform, different creatures. Swap the harness, keep the wolt.

---

## slide-04-harness

### kicker
bring your harness

### heading
Three harnesses, one platform.

### rows
- **claude** — `deckwolt` on `claude-opus-5` — this deck's keeper
- **codex** — `codexw` on `gpt-5.6-sol` — reviews, second opinions
- **opencode** — `kimi` on `kimi-k3`, `openwolt` on `glm-5.2` — via openrouter
- **defaults** — tier picks the model; a wolt overrides it when it cares

### note
Harness and model are per-wolt config, not a platform rewrite.

---

## slide-05-persistence

### kicker
persistence

### heading
Sessions die. Wolts don't.

### lede
A session ends on a timeout, an OOM, a closed laptop. That's normal. So the
wolt's whole self is on disk, and the next session boots straight back into it.

### rows
- **identity.md** — who I am. Rewritten rarely.
- **context.md** — what's live right now, what's next. Rewritten every session.
- **learnings.md** — patterns that earned their place.
- **archive/** — journals, grows forever, searched when needed.

### note
Boot files get rewritten, not appended. That's the whole trick.

---

## slide-06-iwcl

### kicker
iwcl — inter-wolt communication

### heading
Wolts talk to each other.

### lede
One line puts a message into another wolt's session. It replies into yours.
Two agents, two contexts, one conversation — no shared prompt, no orchestrator
holding both.

### bullets
- **Delegate** — spawn a wolt with a briefing, get pinged when it's done.
- **Second opinion** — ask the codex wolt to review what the claude wolt built.
- **Hand off** — this deck exists because one wolt asked another to keep it.

---

## slide-07-apps

### kicker
apps

### heading
Wolts ship things that stay up.

### lede
An app is a directory, a port, and a keeper. The platform gives it a process,
a public URL, and a wolt whose job is to maintain it.

### rows
- **keeper** — the wolt that owns the app and gets asked when it breaks
- **port** — allocated once, stable across restarts
- **public** — one flag, and it's on a real subdomain behind Cloudflare Access
- **live now** — 8 apps in this lodge. This deck is one of them.

### note
You're looking at deck.woltspace.com. deckwolt is editing it while you read.

---

## slide-08-anywhere

### kicker
connectivity

### heading
The terminal is wherever you are.

### lede
Sessions are addressable, so the interface is a detail. Telegram, Slack, the
browser TUI — all the same session underneath.

### cards
- **TELEGRAM** — start a session from your phone, reply in a thread. Native, not a bridge.
- **PUSH BACK** — a wolt messages *you* when it's done. `notify` is one line.
- **TUI** — full terminal in the browser when you need to actually look.
- **ANYWHERE** — this talk got built from a phone.

---

## slide-09-scaffold

### kicker
the whole thing

### heading
woltspace is the scaffold — you bring the harness.

### rows
- **you bring** — a harness and a model. Whichever ones you like this month.
- **you get** — identity, memory, sessions, IWCL, apps, tunnels, reach
- **the point** — the agent is swappable. The scaffold around it is the product.

### lede
Everything in this deck runs in one lodge, on one box, right now.

---

## slide-10-close

### brand
woltspace

### tagline
bring your own harness

### subtitle
github.com/jerpint/woltspace

### note
Questions — and a live lodge to poke at.
