# You built an app. Now what?

Audience: comfortable with coding agents, new to engineering workflows.
Informal and demo-led. Seven slides. Duration and demo app still to be confirmed.
The slide text is deliberately sparse. These are talking points, not a script.

## 01: opener
You already know how to ask an agent to build something. Now give that thing a home.
This is about keeping, improving, and sharing a useful app.

## 02: the familiar artifact
Start with the browser-stored artifact tools this audience uses.
Which version is the good one? Is your friend's data the same as yours?
Local storage is state, but it belongs to that browser. Avoid claiming every
artifact product lacks persistence, sharing, or versioning.
A useful prototype creates a reason to want a continuing app and a clear workflow.

## 03: Woltspace as the home
Woltspace is a place on your computer where coding agents work on apps you can
run, revisit, and share. A wolt is an agent with a continuing identity and workspace.
Point at the three cards. Code, saved app data, and running the app are different things.
Persistence requires the app to implement durable storage; Woltspace is the home,
not an automatic database or backup service. Skip harness terminology and internals.

## 04: demo
Demo candidate, not yet selected: a tiny shared suggestion box.
Ask for an app that saves records on disk. Add one record, refresh, close and reopen.
Explain only what is visible: a screen, code handling the request, saved data.
Have a working checkpoint ready. Prefer one small live improvement over waiting
for an entire unprepared build. Do not create or publish a demo app until selected.

## 05: GitHub
Ask the wolt to save the working version to GitHub.
Show one named checkpoint and the history. A commit is a saved code checkpoint;
a push copies local commits to GitHub. GitHub stores code and history, not
necessarily the database, secrets, or a running app. App data needs its own backups.
The audience does not need to learn Git commands to ask for this workflow.
These presentation files are committed locally only; do not push this branch.

## 06: safe improvements
Ask for one small feature on a branch. A branch is a separate version of the code
for trying a change; it is not automatically a separate running app or database.
Show the change, test it, then ask to merge if happy. A pull request is a place to
review a proposed change on GitHub, if useful to show. The wolt handles commands;
the human judges the result. Preserve existing data when changing the app.

## 07: share and close
Share the chosen demo app only with the human's authorization.
Open it on a phone and submit something. Show that record on the laptop.
The computer serving the app needs to stay on and connected for others to reach it.
The closing QRs point to Woltspace's source and website, not to the demo app.
Repeat: keep it, improve it, share it.

## Preflight
- Confirm talk duration and chosen demo app.
- Prepare a working checkpoint and sample data.
- Check the actual phone access and sharing configuration ahead of the talk.
- Open the first slide and use arrow keys or space. Use browser fullscreen.
- Google Fonts are external; load ahead of time if connectivity is uncertain.
- Use the rendered static preview for local slide review. It has no authoring API.
