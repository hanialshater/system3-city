---
name: features
title: Features
description: The company's features list. Every feature with its status (live, building, planned, retired), since when, its owner, a summary and its links, grouped by status.
kind: template
reads: [dashboard]
from: System 3 city
---

# Features

This page lists what the company's product does, grouped by status: live, building, planned and retired. It reads the dashboard contract's `features`.

To use it, copy it into your company (`node src/city-copy.mjs page features <company dir>`, in system3-meta) and
keep `features.json` beside `company.json`:

```json
{ "features": [{ "id": "search", "title": "Search", "status": "live", "since": "2026-09-01", "owner": "site-engineer",
  "summary": "Search every post in both languages", "links": ["https://…"] }] }
```

A feature's owner is one role (PRINCIPLES.md P5).
