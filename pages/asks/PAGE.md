---
name: asks
title: Decisions inbox
description: Everything waiting on the company's owner (the CEO), by priority, with what each blocks, the options, the recommendation and links; and how many are open by kind.
kind: template
reads: [dashboard]
from: System 3 city
---

# Decisions inbox

A page for the owner: the dashboard contract's `asks`, sorted by priority, with what each one blocks. It shows the
options, the recommendation and the links, and counts the open asks by kind.

Use it: copy it into your company (`node src/city-copy.mjs page asks <company dir>`, in system3-meta) and customise your copy. Your dashboard tool
must print `asks` (Meta's `dashboard.mjs` reads them from `asks.json` beside `company.json`).
