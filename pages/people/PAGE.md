---
name: people
title: People
description: A directory of everyone in the org (name, title, team, where they sit, who they report to), searchable by team, with each person's last activity from the event log.
kind: template
reads: [org, events]
from: System 3 city
---

# People

A directory of everyone in the org, grouped by team. For each person it shows the name, title, room and floor, who
they report to, and their last event in the log.

Use it: add `{ "id": "people", "title": "People", "city": "people" }` to your `hq/pages.json`.
