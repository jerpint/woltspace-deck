# Runbook — woltspace: the scaffold for harnesses

**Slot: ~10 minutes, technical audience, with a live demo.**

Eight slides. The demo gets a third of the talk, which is right — it's the part
that proves the rest. Everything before it is setup for the demo, not a substitute.

## The clock

| # | Slide | Budget | The one job |
|---|-------|--------|-------------|
| 01 | title | 0:20 | Say the line: *woltspace is the scaffold for harnesses.* |
| 02 | thesis | 1:10 | Harnesses are solved; the layer around them isn't. |
| 03 | anatomy | 1:20 | What a wolt is — and that three harnesses run here today. |
| 04 | persistence | 0:50 | Sessions are disposable, wolts aren't. |
| 05 | iwcl | 1:10 | Agents coordinating without an orchestrator holding both. |
| 06 | reach | 1:00 | Apps that stay up; a terminal in your pocket. |
| 07 | demo | 3:30 | Show it. Hand off and switch away. |
| 08 | close | 0:40 | Repeat the line, point at the repo, take questions. |
| | | **10:00** | |

Ten minutes exactly with no slack, which means it's really nine — a demo always
overruns. Plan for that.

## If you're running long

Cut in this order. Each cut is safe on its own; the story still lands.

1. **04 persistence** — the demo shows memory surviving better than a slide can.
2. **02 thesis** → fold into the title beat: "harnesses are solved, the scaffold isn't."
3. **06 reach** → keep only the telegram card and say the rest over the demo.

Do **not** cut 03 or 05. Anatomy earns the word "wolt" (everything after depends
on it) and IWCL is the part nobody else has.

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

One of the talk's points is that these slides are served from inside woltspace,
over the public internet. **That isn't true yet** — the deck currently sits behind
Cloudflare Access, so an audience hits a login wall:

```bash
curl -sI https://woltspace-deck.woltspace.com/ | head -1   # → 302 to cloudflareaccess.com
```

`"public": true` in `woltspace.json` only means "serve it on the subdomain". It
does **not** mean unauthenticated. The wildcard Access application
(`woltspace-apps`, covering `*.woltspace.com`) gates every app subdomain to
jerpint's email.

To open just this one, add a dedicated Access application for
`woltspace-deck.woltspace.com` with a **bypass** policy — a more specific
hostname match wins over the wildcard, so no other app is affected:

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

Delete that application afterwards to close it again.

### Read the deck's own writes first

**The deck must go read-only at the same time.** Editing is unauthenticated —
that's fine for a local tool, but a public deck with an open `/api/save` means
anyone who finds the URL can rewrite the slides while you're standing in front
of them. Restart with the flag set:

```bash
DECK_READONLY=1   # in the app env, then restart the app
curl -X POST http://localhost:7777/apps/woltspace-deck/stop
curl -X POST http://localhost:7777/apps/woltspace-deck/start
```

Read-only keeps auto-reload (so deckwolt can still push fixes from the terminal)
but removes the edit controls and refuses every write. The server prints which
mode it's in on startup — check the log rather than assuming.

**Order on the day:** go read-only → verify writes are refused → open Access →
load the deck from a phone on cell data (not your wifi, and not a browser that
already has the Access cookie) → talk. Close Access afterwards.

## Mechanics

- `?present` on any slide hides the edit controls.
- Arrow keys or space to advance.
- Copy lives in `copy.md` — edit it and the open slide reloads. You can fix a
  typo between slides if you have to.
- Grid of all slides: <https://woltspace-deck.woltspace.com/>
