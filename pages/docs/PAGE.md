---
name: docs
title: Docs
description: How the company works now (the handbook and its living docs by subject), what comes next (the operational plan and the architecture plan, with their horizons) and how the architecture evolved (dated snapshots), apart from the records that explain how it got here.
kind: template
reads: [docs]
from: System 3 city
---

# Docs

Reads the documents contract (System 3 Meta's `src/docs.mjs`, the company's `docsCmd`). Every entry has a `kind`:

| kind | from the document's header | shown as |
|---|---|---|
| `doc` | `kind: doc · subject: architecture` (the handbook is always a doc) | by subject, with its last change; stale after 90 days |
| `plan` | `kind: plan · subject: operations · until: 2027-01-01` | with its horizon; flagged when it has ended |
| `snapshot` | `kind: snapshot · subject: architecture · date: 2026-11-01` | a timeline |
| `record` | anything else (EDD, ADR, decision, …) | counted; listed on the Knowledge page |

The guideline is system3-meta `docs/product/DOCS.md`, the templates are `templates/docs/`, and the check is
`node src/docs.mjs <root> --check`.

Use it: copy it into your company (`node src/city-copy.mjs page docs <company dir>`, in system3-meta).
