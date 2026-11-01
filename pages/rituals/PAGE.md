---
name: rituals
title: Rituals
description: When each ritual is due, on two clocks. The agents' clock fires on work and is never overdue while a company is idle; the human clock fires on calendar slots in the founder's time zone. They meet at the weekly review, which lists every agent record since it was last held, so the human reads the agents' work once a week.
kind: template
reads: [dashboard]
from: System 3 city
---

# Rituals

The dashboard contract's `rituals` (additive, 2026-11-01), from System 3 Meta's `src/cadence.mjs`:

```json
{ "v": 1, "source": "rituals.json", "timeZone": "Europe/Berlin",
  "rituals": [
    { "ritual": "retro", "clock": "agent", "last": "2026-10-28T10:00:00Z", "due": true, "blocks": true,
      "reasons": ["5 merge event(s) since last (threshold 5)"], "why": "after work, not after time" },
    { "ritual": "wbr", "clock": "human", "slot": "weekly:mon", "lastSlot": "2026-10-26", "nextSlot": "2026-11-02",
      "last": "2026-10-27T08:00:00Z", "due": false, "reasons": [], "why": "where the clocks meet",
      "rollup": [{ "ritual": "retro", "record": "rituals/records/2026-10-28-retro.md", "ts": "2026-10-28T10:00:00Z" }] }],
  "due": ["retro"], "blocking": ["retro"], "problems": [] }
```

A company keeps `rituals.json` beside `company.json` (`node src/cadence.mjs <company> [--check]` in system3-meta), or
names a `ritualsCmd` that prints this shape (System 3 Lessons serves `company/rituals/triggers.json` this way). A record
`<YYYY-MM-DD>-<ritual>*.md` in one of the schedule's `records` folders holds its ritual.

Use it: copy it into your company (`node src/city-copy.mjs page rituals <company dir>`, in system3-meta).
