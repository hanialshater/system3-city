---
name: news
title: News
description: City news, a dated feed across every company from what the HQ already reads (releases, milestones done, decisions, new companies, features shipped, kudos), with an Atom feed (feed.xml) to subscribe to and a weekly digest (the newsletter) as one Markdown and one HTML issue a week.
kind: built-in
reads: [dashboard, events, docs, city registry]
from: System 3 Meta, hq/index.html (City section) and src/news.mjs
---

# News

One dated feed across every company, built only from what the HQ already reads of them:

- **releases**: each company's release log (`[deploy]` releases, with who approved them);
- **milestones done**: a done milestone, dated by its `doneOn` or the first date in its evidence;
- **decisions**: decision documents and ADRs (the docs tool), and decisions on the board (events);
- **new companies**: the registry cards' `joined`;
- **features shipped**: features with a shipped, done or live status and their `since`;
- **kudos**: `kudos` events.

The static build writes `data/news.json`, an Atom feed (`feed.xml`) and one issue a week, `digest/<YYYY-Www>.md` and
`.html` (the newsletter). The page shows the feed with filters by kind and company, and the issues. Sending the
newsletter by e-mail is not part of the HQ: it would need an external service, which is the founder's decision.
