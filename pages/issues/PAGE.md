---
name: issues
title: Issues
description: Issues, Linear-like, from the company's own tracker through its tools, a list with filters (state, owner, project, priority, words) grouped by state, owner or project, a board by state, and each issue's detail. Paginated, so it stays fast at thousands of issues; keyboard-friendly (j/k, Enter, Esc, /, l, b).
kind: template
reads: [dashboard]
from: System 3 city
---

# Issues

The dashboard contract's `issues` (additive, 2026-10-26):

```json
{ "v": 1, "source": "company/ops/board.json", "total": 2049,
  "states": { "backlog": 1069, "todo": 68, "in progress": 15, "review": 188, "done": 645, "canceled": 64 },
  "items": [{ "id": "W-001", "title": "…", "state": "todo", "priority": 2, "owner": "fact-checker",
    "project": "…", "labels": [], "created": "2026-10-12", "updated": "2026-10-14", "url": "…" }] }
```

States are backlog, todo, in progress, review, done and canceled; priority is 0 (none), 1 (urgent), 2 (high),
3 (medium) or 4 (low). Each company's issues come from its own tracker through its tools:

- an adapter for its board (System 3 Lessons: `company/ops/board.json`, about 2,000 items);
- an `issues.json` beside `company.json`, which Meta's dashboard tool reads; Meta's
  `node src/issues.mjs github <owner/repo> --write=<company dir>/issues.json` writes one from GitHub issues (pull
  requests left out; open is todo, or in progress when assigned; closed is done, or canceled when not planned).

The page opens on the active states (backlog to review). The list shows 50 rows a page per group; the board, 20 cards
a column with "more". Keys: `j`/`k` move, `Enter` opens, `Esc` goes back, `/` searches, `l` list, `b` board.

Use it: copy it into your company (`node src/city-copy.mjs page issues <company dir>`, in system3-meta).
