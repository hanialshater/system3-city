---
name: radar
title: Tech radar
description: Three radars in the manner of the Zalando and Thoughtworks tech radars (tech stack; org and techniques; AI), each with four quadrants and four rings (adopt, trial, assess, hold), numbered blips that never overlap, and a legend with why, the ring history and what replaces a hold.
kind: template
reads: [dashboard]
from: System 3 city
---

# Tech radar

The dashboard contract's `radar` (additive, 2026-11-01), from System 3 Meta's `src/radar.mjs`:

```json
{ "v": 1, "source": "radar.json", "owner": "principal-engineer", "reviewed": "2026-11-01", "total": 2,
  "byRing": { "adopt": 1, "trial": 0, "assess": 0, "hold": 1 },
  "entries": [{ "name": "TypeScript", "quadrant": "languages-frameworks", "ring": "adopt", "why": "…", "reviewed": "2026-11-01" },
              { "name": "lane batches", "quadrant": "techniques", "ring": "hold", "why": "…", "replaces": "domain teams" }],
  "problems": [] }
```

A company keeps `radar.json` beside `company.json` (or a `radarCmd`). Version 2 holds `radars: [{ id, title, quadrants?, entries }]` (defaults: tech = languages-frameworks, tools, platforms, data; org = engineering, process, structure, governance; ai = models, agents, practices, evaluation), and the view keeps the flat `entries` beside `radars`. Moving an entry between rings follows the radar flow (system3-meta templates/flows.json). Each entry is reviewed at least every 180 days,
and a hold says what replaces it. New dependencies still need a decision record; the radar shows where that decision
landed.

Use it: copy it into your company (`node src/city-copy.mjs page radar <company dir>`, in system3-meta).
