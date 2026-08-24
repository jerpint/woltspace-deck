# Runbook — woltspace: the scaffold for harnesses

**Slot: ~10 minutes, technical audience, with a live demo.**

Eight slides. The demo gets a third of the talk, which is right — it's the part
that proves the rest. Everything before it is setup for the demo, not a substitute.

## The clock

| # | Slide | Budget | The one job |
|---|-------|--------|-------------|
| 01 | title | 0:20 | Say the line: *woltspace — the scaffold for your harnesses.* |
| 02 | thesis | 1:00 | Coding is more than one session: harness vs scaffold. |
| 03 | wolts | 1:10 | What a wolt is — and that three harnesses run here today. |
| 04 | woltspace | 0:40 | Name the three parts. Don't explain them — 05–07 do that. |
| 05 | compute | 1:10 | A container where everything is allowed, with a real URL. |
| 06 | reach | 0:50 | Telegram, Slack, terminal — same session underneath. |
| 07 | coordination | 1:10 | IWCL: agents talking with no orchestrator holding both. |
| 08 | terminal | 3:20 | Show it. Hand off and switch away. |
| 09 | close | 0:40 | Repeat the line, point at the QRs, take questions. |
| | | **10:00** | |

Slide 04 is a promise: three items, numbered `01`–`03`. Slides 05, 06 and 07
carry those numbers in their kickers and arrive in that order, so the audience
always knows which third of the scaffold they're in. If you reorder the
enumeration, reorder the slides — the numbers come from CSS and won't warn you.

Ten minutes exactly with no slack, which means it's really nine — a demo always
overruns. Plan for that.

## If you're running long

Cut in this order. Each cut is safe on its own; the story still lands.

1. **06 reach** — the shallowest of the three; say it over the demo instead.
   If you cut it, drop "How you reach them" from 04 too, or the promise breaks.
2. **02 thesis** → fold into the title beat: harness versus scaffold, one sentence.

Do **not** cut 03, 04, 05 or 07. 03 earns the word "wolt" (everything after
depends on it), 04 is the promise the back half keeps, and 05 and 07 are the
two parts nobody else has.

**Cutting an explain slide means editing 04.** The enumeration and the slides
after it have to match, or you promise three things and deliver two.

## Demo

Not pinned down yet. Whatever it is, slide 07's three bullets should say what to
watch for *before* you switch away — a technical audience will forgive a rough
demo but not an unexplained one.

Three beats is the ceiling for 3:30. Candidates, strongest first:

- **Telegram → work → push back.** Send a wolt a task from your phone, let it
  work, get the notify. Proves reach and autonomy in one shot, and it's the
  thing people haven't seen before.
- **IWCL hand-off.** One wolt delegating to another, live. Hardest to follow on
  a projector — needs the terminal big and a narrated line-by-line.
- **This deck.** Edit `copy.md`, watch the slide reload mid-talk. Cheap, fast,
  and it's already on screen — good as a *closer* if the main demo runs short.

Pre-flight: lodge up, deck app running, the wolts you'll name actually alive
(`woltspace session list --alive`), and slide URLs on `?present` so the edit
button isn't in the projection.

## Going public before the talk

One of the talk's points is that these slides are served from inside woltspace
over the public internet. That is true of the container; it is **not yet true of
who can reach it** — Cloudflare Access still gates the hostname, so an audience
hits a login wall:

```bash
curl -sI https://woltspace-deck.woltspace.com/ | head -1   # → 302 to cloudflareaccess.com
```

`"public": true` in `woltspace.json` only means "serve it on the subdomain". It
does not mean unauthenticated.

### What is already done

- **Read-only by default.** `DECK_READONLY=1` is in the app's start command, so
  writes are refused and `/copy`, `/copy.md` and `GET /api/copy` do not exist.
  Check it, don't assume it: `curl -s localhost:4010/api/status`.
- **Static serving is an allowlist.** Dotfiles (`.git`), `node_modules/`,
  `decks/`, and the server source are all refused; only known asset types under
  the deck directory are served.

### The one step left, and it is yours

Open the hostname with a bypass policy. A more specific hostname match wins over
the `*.woltspace.com` wildcard, so no other app is affected:

```bash
# Needs CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN from /workspace/wolts/.env
APP=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/access/apps" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
  --data '{"name":"woltspace-deck-public","domain":"woltspace-deck.woltspace.com","type":"self_hosted","session_duration":"24h"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['result']['id'])")

curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/access/apps/$APP/policies" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
  --data '{"name":"public-bypass","decision":"bypass","include":[{"everyone":{}}]}'
```

Delete that Access application afterwards to close it again. Keep the `$APP` id.

### Order on the day

1. Confirm read-only: `curl -s localhost:4010/api/status` → `"readonly":true`.
2. Confirm the writes are refused: `POST /api/save` and `/api/copy` → 403.
3. Open Access with the commands above.
4. Load it from a **phone on cell data**, in a browser with no Access cookie —
   your own laptop is already logged in and will pass either way.
5. Talk. Then delete the Access application.

### What is exposed while it is open

Only the deck: slide pages, `theme.css`, `scene.js`, `sprites.js`, the QR SVGs,
and three read-only JSON endpoints (`/api/slides`, `/api/status`, `/api/hash`).
`/api/status` reports the slide count and whether the deck is read-only — no
paths, no secrets.

The hostname reaches the lodge's app router, which scopes strictly by subdomain:
lodge paths (`/apps`, `/tui`, `/wolt/...`) all 404 on the deck hostname, on GET
and POST alike. Verified, including Host-header probes and encoded traversal.

Two things worth knowing rather than fixing:

- Slides carry **real session ids** (`codexw-grumpy-den-45be2b`). They identify
  a session; acting on one needs lodge access, which the public hostname does
  not grant. Harmless, but they are real names on a public page.
- The deck's **content** becomes public: the copy, the QRs, and the fact this
  lodge exists at `woltspace.com`. That is the point of the slide.

## Mechanics

- `?present` on any slide hides the edit controls.
- Arrow keys or space to advance.
- Copy lives in `copy.md` — edit it and the open slide reloads. You can fix a
  typo between slides if you have to.
- Grid of all slides: <https://woltspace-deck.woltspace.com/>
