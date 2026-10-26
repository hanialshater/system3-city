---
name: operators
title: Operators
description: The city's hub for human operators and builders, by discipline (engineering, applied science, product, operations, editorial, design, growth): what each does in an agent company, the open seats in every company (human seats from its org, what waits on its owner, parked roles that would come back for a human), how the city judges an operator (a trial with a referee and predictions first), and a profile schema with a fictional example. No personal data.
kind: built-in
reads: [org, dashboard, city registry operators.json]
from: System 3 Meta, hq/index.html (City section)
---

# Operators

Where the city finds and grows the humans who operate and build its companies, grouped by discipline: engineering,
applied science and research, product, operations and infrastructure, editorial, design, and growth.

- **What each discipline does in an agent company**: the seats the principles keep human (P13: deploys, budgets, the
  referee, the org design; the evaluation steward; the author's and founder's approvals), and the parked roles that
  would come back for a human.
- **Open seats per company**: the registry's seeds (`registry/operators.json` `seats`) joined with what the HQ reads
  through each company's tools: a role in its org that the registry names as a human seat (`seatKinds`), the asks
  waiting on its owner (its dashboard), and its parked roles with their triggers (the dashboard's `parked`).
- **How the city judges an operator**: a trial task with a referee and predictions first (the `operator-trial` skill).
- **Profiles**: a schema and one example marked fictional. Real profiles, names, e-mails and CVs live only in the
  founder's private intake, which does not exist yet; `tools/check.mjs` refuses e-mail addresses, links to forms and an
  example not marked fictional.

Built into the starter HQ's City section (`#city/operators`; `data/operators.json` in the static build).
