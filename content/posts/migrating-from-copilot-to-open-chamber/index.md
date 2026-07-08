---
title: Migrating from GitHub Copilot in VS Code to Open Chamber with Opencode
date: "2026-07-08T15:00:21.174Z"
slug: "/migrating-copilot-open-chamber"
template: "post"
draft: false
category: "Migrations"
tags:
  - VS Code
  - GitHub Copilot
  - Open Chamber
  - Opencode
description: "A guide on moving from GitHub Copilot to the Open Chamber extension with Opencode in VS Code."
socialImage: "../defaultSocialImage.jpg"
---

## Introduction

Copilot got me hooked on AI pair-programming, but I kept running into the same wall: I wanted to run local models, switch providers freely, and not be locked into a single vendor's roadmap. That search led me to [Opencode](https://opencode.ai) paired with the [Open Chamber](https://openchamber.dev) VS Code extension.

Here's why I switched, what I like, what's still rough around the edges, and how to get set up yourself.

![screenshot of Open Chamber's chat panel next to a code diff in VS Code](/media/open-chamber-screenshot.png)

## Why Opencode? Best for Local LLM

[Opencode](https://opencode.ai) is an open-source agent framework that runs either as a terminal UI (TUI) or as a standalone server. It supports a wide range of models — local and cloud — which makes it the most flexible, future-proof choice if you don't want to marry yourself to one provider.

That "runs as a server" detail matters more than it sounds. It's the whole reason Open Chamber is possible at all — more on that below.

## The Problem with Existing VS Code Agent Extensions

Before landing on this setup, I tried nearly everything the marketplace had to offer:

| Tool | Why it fell short |
|---|---|
| **Ollama integration** | Deprecated and no longer maintained |
| **Cline, Continue, etc.** | Custom agents, but not a full agent *framework* — you lose features and flexibility |
| **Llama extension** | Still young, mostly focused on autocomplete for now |
| **VS Code custom endpoints** | Local LLM support exists, but it's clunky and could be discontinued anytime |
| **Model-specific tools** (Qwen, Mistral, etc.) | Lock you into a single provider — risky as ecosystems shift |

The common thread: none of them treat interoperability as a first-class feature. Opencode does — it's a unified interface that speaks to many models across many providers, so switching providers later doesn't mean switching your whole workflow.

## What the Open Chamber Extension Actually Does

[Open Chamber](https://openchamber.dev) is the glue between Opencode and VS Code. Under the hood, it:

- **Starts Opencode in server mode** — instead of a one-off CLI process, you get a persistent backend your editor can talk to.
- **Provides a UI that mirrors Copilot's look and feel**, so the transition doesn't feel jarring.
- **Instantly loads your sessions, models, and configuration files** on startup.
- **Adds value on top of Opencode** rather than reinventing it — it's a client for the same engine, not a competing one.

### The detail that sold me: one server, many surfaces

Because Open Chamber talks to Opencode's server API rather than wrapping its own separate agent, **your TUI and your VS Code UI are looking at the exact same session.** Kick off a task from the terminal on your laptop, then open VS Code and watch the same conversation, diffs, and file edits show up live — no re-syncing, no separate history. Start something in Open Chamber's VS Code panel, and it's just as visible if you drop into `opencode` in the terminal.

That's a genuinely different model from Copilot, where your chat context lives inside one editor window and nowhere else. Here, the *server* holds the state — the UI is just a window into it, and you can have as many windows open as you like.

## What I Like About the Extension

- **Context-adding** — Drop in arbitrary files or selections as context for the agent, the same way you would with Copilot.
- **Familiar UI** — The layout echoes Copilot closely enough that the learning curve is nearly flat.
- **Diffs for review** — See changes before you accept them, just like Copilot's inline suggestions — nothing lands in your files without a look first.

> **Tip:** By default, Open Chamber opens in the primary explorer pane. Open the Activity Bar and drag it into the *secondary* side pane instead — that layout lets you add files to context the same natural way Copilot does.

## Where It's Still Rough: Native TUI Features

Not everything is polished yet. The native terminal UI in Opencode doesn't have the rich Git diff view that VS Code gives you for free. If you live in a terminal-first workflow, Git TUIs in general still lag behind what VS Code offers — this is a genuine trade-off, not a dealbreaker, but worth knowing going in.

## Try OC v2 (Beta) — Likely the Long-Term Bet

There's a newer extension, **OC v2**, available on the VS Code Marketplace:

👉 [OC v2 on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sst-dev.opencode-v2)

It's still in beta, but of everything I've tried, it looks like the safest long-term option to keep an eye on.

## Conclusion

Moving from GitHub Copilot to [Open Chamber](https://openchamber.dev) powered by [Opencode](https://opencode.ai) gets you:

- An **open-source, model-agnostic** LLM workflow.
- Tighter integration between your terminal and editor — because they're literally sharing the same session.
- A **future-proof setup** that doesn't lock you into any single vendor.

If you want a developer-friendly, extensible way to bring AI into VS Code without giving up control over which model runs the show, Opencode + Open Chamber is worth the switch.