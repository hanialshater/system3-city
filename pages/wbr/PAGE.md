---
name: wbr
title: WBR
description: The weekly business review, one issue a week kept as a dated record, the week's metrics against their targets and last week, releases, spend against the budget and the stop rule, milestones moved, top issues, asks waiting on the owner and principles-audit changes. A company with its own WBR ritual shows its ritual records.
kind: template
reads: [dashboard]
from: System 3 city
---

# WBR

The dashboard contract's `wbr` (additive, 2026-10-26): `{ records: [issue], current: issue, recordedThisWeek }`.

An issue (Meta's `src/wbr.mjs`): `{ week, from, to, at, metrics: [{ label, value, target, last, direction? }],
unmeasured, releases, spend: { unit, spent, approved, left, thisWeek, stopRule, costTarget }, milestones: { moved },
issues: { open, total, top }, asks: { waiting, top }, principles, principlesChanged, prevWeek }`.

- **Recorded weeks** are dated records: `node src/wbr.mjs record <company dir>` (in system3-meta) writes
  `wbr/<YYYY-Www>.json` beside `company.json`, and the next week compares against it (last week's metrics, milestones
  moved, spend this week, principles gaps opened and closed).
- **This week** is live until it is recorded, and says so.
- **A company with its own WBR ritual** publishes its ritual records as issues (`source: "ritual record"`: the record,
  its operating snapshot, anomalies, decisions asked of the founder, objections carried), as System 3 Lessons does.

The WBR is company-internal: it shows only on the company's own page, with no city roll-up.

Use it: copy it into your company (`node src/city-copy.mjs page wbr <company dir>`, in system3-meta).
