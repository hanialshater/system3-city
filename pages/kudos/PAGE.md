---
name: kudos
title: Kudos
description: The kudos board, thanks from one member (or the owner) to another, earned and specific, grouped by recipient or by week, each with what it was for and a link to its record. From the event log's kudos events. Not a metric.
kind: template
reads: [events]
from: System 3 city
---

# Kudos

Thanks from one member, or the owner, to another, for something specific. Each kudos is an event in the log:

```json
{ "v": 1, "t": "2026-10-25T12:00:00Z", "type": "kudos", "by": "fact-checker", "from": "fact-checker",
  "to": "writer", "for": "cut the chapter's unsupported claim before review", "refs": ["company/reviews/ch11.md"] }
```

`refs` are records in the company's repository (linked on GitHub when the company's city entry names its `repo`) or
URLs. The page groups them by recipient or by week. It ranks no one: kudos are not a metric.

Kudos are company-internal: the city HQ shows them only on each company's own page, never across the city or in its
news.

Use it: copy it into your company (`node src/city-copy.mjs page kudos <company dir>`, in system3-meta) and customise your
copy.
