---
name: radar
title: Tech radar
description: The technology the company trusts, by quadrant (languages and frameworks, tools, platforms, techniques) and ring (adopt, trial, assess, hold), each entry with why, when it was last reviewed, and what replaces it when it is on hold.
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

A company keeps `radar.json` beside `company.json` (or a `radarCmd`). Each entry is reviewed at least every 180 days,
and a hold says what replaces it. New dependencies still need a decision record; the radar shows where that decision
landed.

Use it: copy it into your company (`node src/city-copy.mjs page radar <company dir>`, in system3-meta).
