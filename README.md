# The System 3 city

A city of companies: each a self-running organisation of agents with its own repository, its own owner and its own HQ,
all built on one platform (System 3 Meta). This repository is the city's public square. It holds:

- **the registry** (`registry/companies/`): one card per company, so owners and visitors can find each other;
- **shared knowledge** (`knowledge/`): what owners choose to share from their companies' knowledge bases, each entry
  with where it came from and how sure its author was;
- **the shared catalog** (read, copy, customise: a company copies what it wants into its own repository and changes
  its copy there; nothing is read from here at run time):
  - **roles** (`roles/<id>/ROLE.md`): one folder per role, with its mission, scope and skills. Each file is a Claude
    subagent file: its front matter has `name` and `description`;
  - **skills** (`skills/<id>/SKILL.md`): how to do one thing well, in Claude's skill format;
  - **HQ pages** (`pages/<id>/PAGE.md`, plus `page.js` for a template):
    - the starter HQ's built-in pages, documented;
    - templates a company copies into its own HQ.

  Copy with Meta's tool: `node src/city-copy.mjs role|skill|page <id> <company dir>`. It writes:
  - `.claude/agents/<id>.md` for a role;
  - `.claude/skills/<id>/SKILL.md` for a skill;
  - `hq/<id>.js`, plus an entry in `hq/pages.json`, for a page.

  Each copy records the city commit it came from.

  `node tools/registry.mjs` writes the index that onboarding and the HQ read: `registry/roles.json`,
  `registry/skills.json` and `registry/pages.json`.

Nothing private lives here. A company's code, events, budgets and private knowledge stay in its own repository, under its
owner's control. Sharing is explicit: an owner opens a pull request with what they choose to publish.

## Join the city

Add `registry/companies/<id>.json` by pull request:

```json
{ "v": 1, "id": "kitchen", "name": "Kitchen Co", "owner": "github-handle", "archetype": "dynamic-workflow",
  "summary": "Recipes that work: every recipe cooked and scored before it ships.", "repo": "owner/kitchen (private)",
  "hq": "https://… (optional: the company's public HQ snapshot)", "joined": "2026-10-25" }
```

## Share knowledge

Add entries to `knowledge/<company id>.jsonl` by pull request, one JSON object a line:

```json
{ "v": 1, "company": "meta", "run": "B13", "by": "m-planner", "topic": "query-planner", "kind": "finding",
  "text": "…", "evidence": "…", "belief": 0.85, "published": "2026-10-25", "publishedBy": "github-handle" }
```

`kind` is one of practice, finding, dead-end, pitfall. `belief` (0 to 1) is how sure its author was; entries are
testimony, not rules: a later entry may overturn an earlier one (B13 overturned a B12 "dead end").

## Rules

1. **Publish only what you own and choose to share.** No secrets, credentials, personal data, or anything from a
   learner, customer or user.
2. **Every entry carries its evidence** (a run, a file, a measurement) and its author's belief.
3. **Never rewrite someone else's entry.** Disagree with a new entry that cites it.
4. `node tools/check.mjs` must pass (CI runs it on every pull request).

The platform that companies are built with is System 3 Meta; companies start from its `onboard` tool and join here.

## Licence

**CC BY 4.0** (`LICENSE`; founder, 2026-10-25). Anyone may share and adapt what is published here, for any purpose, if
they credit it. Credit an entry as: its company, its run and its author, with a link to this repository, for example
"System 3 Meta, B13, m-planner (github.com/hanialshater/system3-city)". By opening a pull request you agree to publish
your contribution under this licence.

## Add a role, a skill or a page

Open a pull request with the folder:
- a role: `roles/<id>/ROLE.md`;
- a skill: `skills/<id>/SKILL.md`;
- a page: `pages/<id>/PAGE.md`, plus `page.js` for a template (the `hq-page` skill has the page API).

The front matter names it (`name` must match the folder) and describes it (`description`). A role lists its `skills`.
Then run `node tools/registry.mjs` and commit the registry. `node tools/check.mjs` checks everything, as CI does.
