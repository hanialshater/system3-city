// Projects (a city page template): the company's project register from the dashboard contract's `projects`
// (system3-meta src/projects.mjs). Open projects first, worst health first: each with its owner, status, due date, what
// happens next, what blocks it and why its health is what it is (health is checked by code: past due is red; blocked,
// stale or an owner outside the org is yellow). Done and dropped projects are folded below. Reads only ctx.dashboard.
const OPEN = new Set(["proposed", "active", "paused", "blocked"]);
export function render({ dashboard, esc }) {
  const v = dashboard?.projects;
  if (!v || !(v.projects ?? []).length) return `<h1>Projects</h1><div class="empty">No projects recorded yet. A company keeps its register in projects.json beside company.json (system3-meta src/projects.mjs), or names a projectsCmd that prints it.</div>`;
  const open = v.projects.filter((p) => OPEN.has(p.status)), closed = v.projects.filter((p) => !OPEN.has(p.status));
  const count = (h) => open.filter((p) => p.health === h).length;
  const link = (l) => (/^https?:/.test(l.href ?? "") ? `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label ?? l.href)}</a>` : `<code>${esc(l.label ? `${l.label}: ${l.href}` : l.href)}</code>`);
  const card = (p) => `<div class="card pj pj-${esc(p.health)}"><div class="pj-head"><span class="pj-dot" title="${esc(p.health)}"></span><b>${esc(p.title)}</b><span class="chip">${esc(p.status)}</span><span class="k" style="margin-left:auto">${esc(p.owner ?? "")}${p.due ? ` · due ${esc(p.due)}` : ""}</span></div>
    <div class="k">${esc(p.id)}${p.updated ? ` · updated ${esc(p.updated)}` : ""}</div>
    ${p.why ? `<div class="pj-row"><span class="k">why</span> ${esc(p.why)}</div>` : ""}
    ${p.doneWhen ? `<div class="pj-row"><span class="k">done when</span> ${esc(p.doneWhen)}</div>` : ""}
    ${p.next ? `<div class="pj-row"><span class="k">next</span> ${esc(p.next)}</div>` : ""}
    ${(p.blockers ?? []).map((b) => `<div class="pj-row pj-block"><span class="k">blocked by</span> ${esc(b.what)}${b.waitingOn ? ` <span class="k">· waiting on</span> ${esc(b.waitingOn)}` : ""}</div>`).join("")}
    ${p.health !== "green" && (p.healthWhy ?? []).length ? `<div class="pj-row pj-why"><span class="k">${esc(p.health)}</span> ${p.healthWhy.map(esc).join("; ")}</div>` : ""}
    ${p.budget ? `<div class="pj-row"><span class="k">budget</span> ${esc(p.budget.spent ?? 0)} of ${esc(p.budget.approved)} ${esc(p.budget.unit ?? "")}</div>` : ""}
    ${(p.links ?? []).length ? `<div class="pj-row pj-links">${p.links.map(link).join(" · ")}</div>` : ""}</div>`;
  return `${STYLE}<h1>Projects</h1><div class="sub1">from ${esc(v.source)}${(v.problems ?? []).length ? ` · <b>${v.problems.length} problem${v.problems.length > 1 ? "s" : ""}</b> in the register` : ""}</div>
  <div class="row" style="margin-bottom:14px"><div class="card stat"><div class="k">open</div><div class="v">${open.length}</div></div><div class="card stat"><div class="k">red</div><div class="v">${count("red")}</div></div><div class="card stat"><div class="k">yellow</div><div class="v">${count("yellow")}</div></div><div class="card stat"><div class="k">done · dropped</div><div class="v">${closed.length}</div></div></div>
  ${(v.problems ?? []).length ? `<div class="card pj-problems"><b>Problems in the register</b><ul>${v.problems.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
  ${open.map(card).join("") || `<div class="empty">No open projects.</div>`}
  ${closed.length ? `<details><summary class="k">${closed.length} done or dropped</summary>${closed.map(card).join("")}</details>` : ""}`;
}
const STYLE = `<style>.pj{margin-bottom:12px;border-left:4px solid var(--line)}.pj-green{border-left-color:var(--ok,#3a7)}.pj-yellow{border-left-color:var(--warn,#c90)}.pj-red{border-left-color:var(--bad,#c33)}.pj-head{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.pj-head b{overflow-wrap:anywhere}.pj-dot{width:10px;height:10px;border-radius:50%;background:var(--line);flex:none;align-self:center}.pj-green .pj-dot{background:var(--ok,#3a7)}.pj-yellow .pj-dot{background:var(--warn,#c90)}.pj-red .pj-dot{background:var(--bad,#c33)}.pj-row{margin-top:4px;overflow-wrap:anywhere}.pj-block{color:var(--bad,#c33)}.pj-why{color:var(--muted)}.pj-problems{border-color:var(--warn,#c90);margin-bottom:12px}</style>`;
