---
name: flows
title: Flows
description: The company's checklists for each kind of work (feature, incident, model, new idea, data), with what to write, who checks it, what to register and which living docs to update, and every piece of work with the steps it still misses.
kind: template
reads: [dashboard]
from: System 3 city
---

# Flows

The dashboard contract's `work` (additive, 2026-11-01), from System 3 Meta's `src/flows.mjs`. The company's flows are
`flows.json` beside company.json (a copy of Meta's `templates/flows.json`), and its work items are checklists in
`work/<type>/<id>.md`. A tick needs evidence. A check is never by the owner. A step may be n/a only when it is
conditional, and only with a reason. A closed item with a step left is a problem. The guideline is system3-meta
`docs/product/FLOWS.md`.

Use it: copy it into your company (`node src/city-copy.mjs page flows <company dir>`, in system3-meta).
