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

## Mechanics

- `?present` on any slide hides the edit controls.
- Arrow keys or space to advance.
- Copy lives in `copy.md` — edit it and the open slide reloads. You can fix a
  typo between slides if you have to.
- Grid of all slides: <https://woltspace-deck.woltspace.com/>
