---
name: releases
title: Release log
description: The company's release log, newest first. Each release has its date, title, notes, the commit and who approved it. Every deploy needs the owner's approval (PRINCIPLES.md P13).
kind: template
reads: [dashboard]
from: System 3 city
---

# Release log

This page shows every release, newest first. Each one has its date, title and notes, the commit it shipped, and who approved it. It reads the dashboard contract's `releases`.

To use it, copy it into your company (`node src/city-copy.mjs page releases <company dir>`, in system3-meta) and add one entry to `releases.json` beside `company.json` for every release:

```json
{ "releases": [{ "id": "r12", "date": "2026-10-25", "title": "Search in Arabic", "notes": ["…"],
  "commit": "abc1234", "approvedBy": "the owner, in the conversation of 2026-10-25" }] }
```

A release with no `approvedBy` shows as **not approved**. That is the point.
