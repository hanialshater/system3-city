---
name: pipeline
title: Pipeline
description: Every item's place in its content type's life cycle. Each content type is a state machine (brief, build, checks, publish, deploy...) with an owner per state and its forward, skip and back transitions. The page draws each machine as a diagram with counts, a kanban and a group × state table grouped by the unit of scale (for example the category), drill-downs 25 items at a time with what each waits on, and a search that shows one item's path.
kind: template
reads: [dashboard]
from: System 3 city
---

# Pipeline

Each content type has its own life cycle, a state machine. This page shows the machine and where every item is in it,
grouped by the company's unit of scale. It reads the dashboard contract's `pipeline`:

```json
{ "pipeline": {
  "staleDays": 7,
  "groupBy": "category", "subgroupBy": "strand",
  "groups": [{ "id": "math", "title": "Mathematics", "subgroups": [{ "id": "geometry", "title": "Geometry & Measurement" }] }],
  "types": [{ "id": "multi-card", "title": "Multi-card sequence",
    "states": [{ "id": "brief", "title": "Brief", "owner": "category owner", "kind": "maker" },
               { "id": "build", "title": "Build", "owner": "demo-builder", "kind": "maker" },
               { "id": "checks", "title": "Checks", "owner": "quality", "kind": "check" },
               { "id": "revise", "title": "Revise (one round)", "owner": "demo-builder", "kind": "maker" },
               { "id": "published", "title": "Published", "owner": "release-manager", "kind": "owner" },
               { "id": "deployed", "title": "Live", "owner": "release-manager", "kind": "owner" }],
    "transitions": [{ "from": "brief", "to": "build", "kind": "forward", "label": "a builder takes the brief" },
                    { "from": "checks", "to": "revise", "kind": "back", "label": "a check said revise" },
                    { "from": "revise", "to": "checks", "kind": "back", "label": "re-run the failed check" }] }],
  "items": [{ "id": "math/flatten-the-cube-to-a-dot", "title": "Flatten the cube to a dot", "type": "multi-card",
    "state": "checks", "since": "2026-10-25", "version": 2, "waitingOn": ["learner walk v2"],
    "category": "math", "group": "math", "subgroup": "geometry",
    "history": [{ "state": "build", "since": "2026-10-20" }, { "state": "checks", "since": "2026-10-25" }] }],
  "historySource": "what the history rests on" } }
```

- **States** are in order, and each has one owner (PRINCIPLES.md P5). `kind` says whether the state is a maker, a check
  or the owner's decision.
- **Transitions** (additive) are the edges: `forward` along the path, `skip` past an optional state, `back` for rework
  (a failed check, a revision round, a new version). Without them the page assumes each state leads to the next.
- **An item** is in exactly one state. `waitingOn` lists what stops it from moving on. `group` is the unit of scale
  (`groupBy` names it; default the item's `category`), `subgroup` a logical split inside it (`subgroupBy`).
- **`history`** (optional) is the item's path so far, oldest first, ending at its current state. Give it only when your
  records can tell it, and say in `historySource` what it rests on.
- **Stale**: an item that has stayed in one state more than `staleDays` (default 7).

The page has four views:

1. **State machine** (the default): each type as an SVG diagram, left to right, a node per state with its owner, kind
   and item count (stale counts marked), forward arrows, back edges dashed, skips dotted. It scrolls inside its box on a
   phone. Click a node to list its items.
2. **Kanban**: one collapsible section per group, its states as columns, at most 25 cards a column until "show more".
3. **Categories**: the group × state table, counts with stale marks; a row opens to its subgroups. Click a cell or a
   name to list those items.
4. **Search**: an item's path through its states, with dates where known, what is ahead, and what it waits on now.

Lists show stale items first, 25 at a time; the drill-down and the kanban share one item card. There is no flat list of
every item.

To use it, copy the template into your company (`node src/city-copy.mjs page pipeline <company dir>`, in system3-meta).
Your dashboard tool then prints `pipeline`. Meta's `dashboard.mjs` reads it from `pipeline.json` beside `company.json`
and fills `transitions` and `group` where they are missing; a company with its own records computes it in its adapter.
