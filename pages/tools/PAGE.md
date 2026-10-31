---
name: tools
title: Tools
description: Everything System 3 Meta provides to the city's companies on one page. It lists the command-line tools, the HQ's views, routes, scripts and pages, the apps, and the drawing kit with its whiteboard. Each entry has what it does, how to run it, the feature it belongs to and a link to its source. The list comes from Meta's code, never by hand.
kind: built-in
reads: [Meta's toolbox (src/toolbox.mjs)]
from: System 3 Meta, hq/index.html (City section)
---

# Tools

One page with everything System 3 Meta, the platform every company is built on, provides. Nobody writes the list by
hand. Meta's `src/toolbox.mjs` reads it from the code (`features.mjs capabilities`), so a new tool appears on the page
in the same commit that adds it.

- **Command-line tools.** Onboarding, the crew, dashboards, the principles audit, the release log, city copy and
  publish, and the rest. Each one shows the first sentence of its file's header, its `node …` usage lines and a link to
  its source.
- **The HQ.** Its views, routes, scripts and pages.
- **Apps.** The HQ, the launcher and the Operators Academy.
- **Grouping.** By kind or by feature (features.json), with each feature's status. A tool in no feature is flagged.
- **The drawing kit.** Every element of the city, each one linking to Meta's Studio.
- **The whiteboard.** Agents illustrate an architecture, a system design, a conceptual sketch or a wireframe as data.
  The page shows the examples next to their JSON and the kit's API. The `whiteboard-sketch` skill describes the format.

The page is built into the starter HQ's City section (`#city/tools`). It reads `/api/tools`, or `data/tools.json` in
the static build. To see the same list in a terminal, run `node src/toolbox.mjs` in a system3-meta checkout; add
`--json` for the data.
