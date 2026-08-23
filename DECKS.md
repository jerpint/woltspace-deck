# Decks

This app hosts **one live presentation at a time** — the current deck's slides live at the
repo root as `slide-NN-slug.html`, auto-discovered by the server.

When a talk is done, its slides move to `decks/<date>-<slug>/` and the final state gets a
git tag. Archived slides stay browsable (static-served, no edit overlay) at
`/decks/<folder>/slide-01-....html`; the tag has the exact working tree if you want perfect
playback (nav links and root-relative assets break in the archive folder).

## Previous decks

| Deck | Given | Story | Archive | Tag |
|------|-------|-------|---------|-----|
| woltspace intro talk (built by prwolt) | April 2026 | what woltspace is — wolts, the lodge, live demo | `decks/2026-04-woltspace-talk/` | `deck-2026-04` |

## Current deck

Kept by **deckwolt**. Story: *woltspace is the scaffold for harnesses.*
