---
name: pipeline
title: Pipeline
description: Every item's place in its content type's life cycle. Each content type is a state machine (brief, build, checks, publish, deploy...) with an owner per state. The page shows each type's states as columns with their items, what each item waits on, and the items that have not moved.
kind: template
reads: [dashboard]
from: System 3 city
---

# Pipeline

Each content type has its own life cycle, a state machine. This page shows where every item is in it. It reads the dashboard contract's `pipeline`:

```json
{ "pipeline": {
  "types": [{ "id": "multi-card", "title": "Multi-card sequence",
    "states": [{ "id": "brief", "title": "Brief", "owner": "category owner", "kind": "maker" },
               { "id": "build", "title": "Build", "owner": "demo-builder", "kind": "maker" },
               { "id": "checks", "title": "Checks", "owner": "quality", "kind": "check" },
               { "id": "published", "title": "Published", "owner": "release-manager", "kind": "owner" },
               { "id": "deployed", "title": "Live", "owner": "release-manager", "kind": "owner" }] }],
  "items": [{ "id": "math/flatten-the-cube-to-a-dot", "title": "Flatten the cube to a dot", "type": "multi-card",
    "state": "checks", "since": "2026-10-25", "version": 2, "waitingOn": ["learner walk v2"], "category": "math" }] } }
```

- **States** are in order, and each has one owner (PRINCIPLES.md P5). `kind` says whether the state is a maker, a check or the owner's decision.
- **An item** is in exactly one state. `waitingOn` lists what stops it from moving on.
- **The page flags an item that has stayed in one state too long** (`staleDays`, default 7).

To use it, copy the template into your company (`node src/city-copy.mjs page pipeline <company dir>`, in system3-meta). Your dashboard tool then prints `pipeline`. Meta's `dashboard.mjs` reads it from `pipeline.json` beside `company.json`; a company with its own records computes it in its adapter.
