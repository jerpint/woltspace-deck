# You built an app. Now what?

Audience: comfortable with coding agents, new to engineering workflows.
Informal and demo-led. Seven slides. Presented on September 16, 2026 with the
pricing playground demo; confirm duration and demo availability before reuse.
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

## 03: what is Woltspace?
Woltspace is a place on your computer where coding agents work on apps you can
run, revisit, and share. Bring the coding agent you already use.
The workspace helps manage what the agent builds. Saved data requires durable
storage in the app; Woltspace is not an automatic database or backup service.
Skip harness terminology and internals.

### Meet your wolt (same slide)
A wolt is a continuing identity and workspace for a coding agent, not a new model.
It has a name, a role, and memory saved in files that carry across sessions.
Introduce the actual demo wolt by name and briefly show its workspace.
Woltspace is the place, the wolt does the work, and the app is what you keep and use.
Transition: "Let's ask a wolt to build something."

## 04: same wolt, your choice of agent
Claude Code, Codex, and OpenCode are the tools driving the coding agent.
You can start a new session for the same wolt with a different tool.
The wolt's identity, file-based memory, and app files remain in its workspace.
This does not transfer the previous tool's entire chat history automatically.
Use familiar tool names on the slide and explain "harness" aloud only if helpful.
Transition: "Let's use one of them to build our app."

## 05: demo
The September 16 demo used the pricing playground: price, customers, fixed costs,
revenue, profit, and break-even. It uses mock inputs and has no database.
Have a working checkpoint ready and show one small live improvement, such as an
annual-plan discount. Explain what the demo actually saves; do not imply that
its inputs demonstrate durable record storage. For a persistence demo, use an app
that explicitly saves records on disk and verify refresh and reopen behavior.

## 06: GitHub and safe improvements
Ask the wolt to save the working version to GitHub.
Show one named checkpoint and the history. A commit is a saved code checkpoint;
a push copies local commits to GitHub. GitHub stores code and history, not
necessarily the database, secrets, or a running app. App data needs its own backups.
The audience does not need to learn Git commands to ask for this workflow.
Keep the reusable presentation in GitHub and review future changes in a pull request.

### Safe improvements (same slide)
Ask for one small feature on a branch. A branch is a separate version of the code
for trying a change; it is not automatically a separate running app or database.
Show the change, test it, then ask to merge if happy. A pull request is a place to
review a proposed change on GitHub, if useful to show. The wolt handles commands;
the human judges the result. Preserve existing data when changing the app.

## 07: share and close
Share the chosen demo app only with the human's authorization.
Open it on a phone and demonstrate the same app. If the chosen demo saves shared
records, submit one and show it on the laptop.
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
