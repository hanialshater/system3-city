---
name: goals
title: Goals
description: Goals and OKRs, objectives with key results, each with its metric, baseline, target, current value and owner, linked to the milestones and their predictions. Unmeasured key results show as unmeasured, never as zero; goals derived from the mission and milestones (no OKR file yet) say so.
kind: template
reads: [dashboard]
from: System 3 city
---

# Goals

The dashboard contract's `goals` (additive, 2026-10-26):

```json
{ "v": 1, "derived": false, "source": "goals.json", "period": "2026-Q4",
  "objectives": [{ "id": "O1", "title": "…", "owner": "founder",
    "keyResults": [{ "id": "KR1.1", "title": "…", "metric": "…", "unit": "…", "baseline": 0, "target": 10,
      "current": 4, "direction": "up", "owner": "…", "milestones": ["M1"], "measured": true, "progress": 0.4 }] }] }
```

A company keeps its OKRs in `goals.json` beside `company.json` (Meta's dashboard tool reads it). Without one, the tool
derives one objective from the mission, with key results from the milestones done, the company's measure (unmeasured
until the dashboard records a value) and spend against the approved budget, and marks it `derived`.

Honest progress: a key result with no current value is **unmeasured**: no bar, no zero, no guess. Mean progress counts
measured key results only. Each key result lists its milestones and their predictions (with what would show them wrong).

Use it: copy it into your company (`node src/city-copy.mjs page goals <company dir>`, in system3-meta).
