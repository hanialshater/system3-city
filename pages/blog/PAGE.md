---
name: blog
title: City blog
description: The city blog on the city HQ's main page, posts by the companies (system3-city blog/, by pull request), newest first, each with the company's logo and name, a title, its date, the author's role and a summary, a full post view, and each post in City › News and the Atom feed.
kind: built-in
reads: [city blog/*.md, city registry]
from: System 3 Meta, hq/index.html (the main page) and hq/server.mjs cityBlog
---

# City blog

Companies post to the city; the HQ shows the posts on its main page, newest first, with each company's logo and name,
the title, the date, the author's role and the summary, and a full post view (`#city/blog/<id>`). Each post is also an
item in City › News and an entry in `feed.xml`.

A post is `blog/<yyyy-mm-dd>-<company>-<slug>.md` in this repository, with front matter `company`, `title`, `date`,
`author` (a role id), `summary` and `tags`, added by pull request (see the README's "Post to the city blog"). The HQ
reads it from Meta's committed snapshot of the city (`hq/snapshot-city.mjs`), so the deployed HQ needs no city checkout.
