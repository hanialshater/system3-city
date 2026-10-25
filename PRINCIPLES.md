# Principles

What makes an organisation of agents as good as one strong agent. This is the city's copy of System 3 Meta's
principles (`PRINCIPLES.md` in System 3 Meta, 2026-10-25; founder: these are the default in Meta, the city and
onboarding). Meta's file holds the full evidence; the run names below point to it. They are testimony, not law (P9):
a company that drops one records why, in a decision record.

| # | Principle | Evidence | How the catalog carries it |
|---|---|---|---|
| P1 | **Proportion.** The default is one strong agent; an org only for a reason: it does not fit one context, runs long, recurs, or its risk needs independent checking. | B6, B8, B9, B10; B9c §3 | `chief-of-staff` proposes the single-agent baseline first; skill `org-in-proportion` |
| P2 | **Warm makers, not chains of cold stages.** One maker per item runs its own checks; independent checking once, at the end. | B6, B8, B9B | `chief-of-staff` dispatches one maker per item; every maker role checks in its own loop; skill `org-in-proportion` |
| P3 | **Full context, chosen by the worker.** Members read what they choose and stay warm. | B9, B10 | Roles say where things are, never what to read (`area-engineer`, `sweeper`, `architect`) |
| P4 | **Autonomy with claims.** Members choose from a shared board and claim an area before touching shared code. | B11, B12, B13 | `area-engineer`, `sweeper`, `architect` |
| P5 | **Contract first, one owner per area.** | B11 | `architect`, `principal-engineer` |
| P6 | **An independent referee, with a held-out part.** Main never gets worse; a checker is never the maker. | B10, B13 | `evaluation-steward` (held-out part), `fact-checker`, `qa-tester`; skills `land-past-the-referee`, `artifact-before-account` |
| P7 | **Few members, the right models.** At most 4 in a crew, 8 roles in a corporate design, unless a size reason is stated. | B12, B13 | Skill `org-in-proportion`; `chief-of-staff-ceo-office` reviews headcount |
| P8 | **Money binds before time.** A cost target per item and a stop rule; work over 2x target pauses for the owner. | B10, B12, B13; F-50 | `chief-of-staff`, `portfolio-manager`; skill `org-in-proportion` |
| P9 | **Shared, organised learning with beliefs.** Lessons with evidence and belief, read as testimony. | B9, B13 | Skill `record-lessons`; `knowledge/` |
| P10 | **Predictions before runs.** Every milestone, benchmark or launch, with "wrong if". | Every benchmark (BENCH13 protocol) | `chief-of-staff`, `analytics-steward`; skill `predictions-first` |
| P11 | **The operator does not produce.** The one who routes work does none of it. | F-13, F-50 | `chief-of-staff` |
| P12 | **Copy, then customise.** A copied role names only its company's paths and roles. | The blog's audit, 2026-10-25 | Catalog roles are generic, with a "What your company supplies" section; `node tools/check.mjs` refuses a role naming a company path |
| P13 | **The human stays in the loop that changes the loops.** Deploys, budgets, the referee and the org design are the owner's to approve; objections travel with decisions. | Every company's constitution and CLAUDE.md | `release-manager`, `evaluation-steward`, `chief-of-staff-ceo-office`; skill `decision-record` |

## How a company uses them

1. Copy a role (`node src/city-copy.mjs role <id> <company dir>` in System 3 Meta).
2. Customise the copy: replace each `<placeholder>` in its "What your company supplies" section with your company's
   own path, command or role, and drop what you do not have. The copy is yours; the catalog's role stays generic.
3. Break a principle only for a reason the work gives, written in a decision record the owner approves.
