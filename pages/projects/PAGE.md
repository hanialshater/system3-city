---
name: projects
title: Projects
description: The company's project register, open projects first and worst health first, each with its owner, status, due date, what happens next, what blocks it and why its health is what it is. Health is checked by code, not only asserted, so a past-due or stale project cannot look green.
kind: template
reads: [dashboard]
from: System 3 city
---

# Projects

The dashboard contract's `projects` (additive, 2026-11-01), from System 3 Meta's `src/projects.mjs`:

```json
{ "v": 1, "source": "projects.json", "total": 3, "byStatus": { "active": 2, "blocked": 1 },
  "projects": [{ "id": "first-light", "title": "First public release", "owner": "chief-of-staff", "status": "active",
    "why": "…", "doneWhen": "…", "due": "2026-11-23", "updated": "2026-11-01", "next": "…",
    "blockers": [{ "what": "the domain is not bought", "waitingOn": "founder" }],
    "links": [{ "label": "charter", "href": "company/initiatives/first-light/charter.md" }],
    "health": "yellow", "healthWhy": ["a blocker"] }],
  "problems": [] }
```

A company keeps `projects.json` beside `company.json` (`node src/projects.mjs <company> add|set|--check` in
system3-meta), or names a `projectsCmd` that prints this shape from its own register (System 3 Lessons maps its budget
register this way). Health: past due is red; blocked, a blocker that waits on no one, not updated in 14 days, an owner
outside the org, or over budget is yellow; otherwise the owner's call stands. Each override says why.

Use it: copy it into your company (`node src/city-copy.mjs page projects <company dir>`, in system3-meta).
