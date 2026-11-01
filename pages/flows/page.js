// Flows (a city page template): the company's checklists for each kind of work (feature, incident, model, idea, data)
// and every piece of work with what it still misses, from the dashboard contract's `work` (system3-meta src/flows.mjs;
// docs/product/FLOWS.md). Open work first, most steps missing first. Reads only ctx.dashboard.
const PHASES = ["start", "design", "build", "check", "register", "docs", "release", "close"];
export function render({ dashboard, esc }) {
  const v = dashboard?.work;
  if (!v || !(v.flows ?? []).length) return `<h1>Flows</h1><div class="empty">No flows yet. A company copies system3-meta templates/flows.json beside its company.json and keeps one checklist per piece of work in work/ (src/flows.mjs).</div>`;
  const items = v.items ?? [], open = items.filter((i) => i.status !== "closed").sort((a, b) => (b.total - b.done) - (a.total - a.done)), closed = items.filter((i) => i.status === "closed");
  const bar = (i) => `<span class="fl-bar"><span style="width:${i.total ? Math.round((100 * i.done) / i.total) : 0}%"></span></span>`;
  const item = (i) => `<div class="card fl-i"><div class="fl-h"><span class="chip">${esc(i.flow)}</span><b>${esc(i.title || i.id)}</b><span class="k" style="margin-left:auto">${esc(i.owner ?? "")}${i.opened ? ` · ${esc(i.opened)}` : ""}</span></div>${bar(i)}<div class="k">${i.done}/${i.total} steps${(i.missing ?? []).length ? ` · missing: ${i.missing.map(esc).join(", ")}` : ""} · <code>${esc(i.path ?? "")}</code></div></div>`;
  const flow = (f) => `<details class="card fl-f"><summary><b>${esc(f.type)}</b> <span class="k">${esc(f.title)} · ${f.steps.length} steps</span></summary>${PHASES.filter((p) => f.steps.some((s) => s.phase === p)).map((p) => `<div class="fl-ph"><div class="k">${esc(p)}</div><ul>${f.steps.filter((s) => s.phase === p).map((s) => `<li><b>${esc(s.id)}</b> <span class="chip fl-${esc(s.who)}">${esc(s.who)}</span> ${esc(s.what)}${s.required === true ? "" : ` <span class="k">(${esc(s.required)})</span>`}<div class="k">evidence: ${esc(s.evidence)}${s.docs ? ` · living docs: ${s.docs.map(esc).join(", ")}` : ""}</div></li>`).join("")}</ul></div>`).join("")}</details>`;
  return `${STYLE}<h1>Flows</h1><div class="sub1">Checklists so nothing is missed: what to write, who checks it (never the maker), what to register, which docs to update · from ${esc(v.source ?? "")}</div>
  ${(v.problems ?? []).length ? `<div class="card fl-problems"><b>Problems</b><ul>${v.problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>` : ""}
  <h2>Open work <span class="k">${open.length}</span></h2>${open.map(item).join("") || `<div class="empty">No open work items.</div>`}
  <h2>The flows</h2>${v.flows.map(flow).join("")}
  ${closed.length ? `<details><summary class="k">${closed.length} closed</summary>${closed.map(item).join("")}</details>` : ""}`;
}
const STYLE = `<style>.fl-i{margin-bottom:8px}.fl-h{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.fl-h b{overflow-wrap:anywhere}.fl-bar{display:block;height:6px;border-radius:3px;background:var(--line);margin:6px 0;overflow:hidden}.fl-bar span{display:block;height:100%;background:var(--ok,#3a7)}.fl-f{margin-bottom:8px}.fl-ph ul{margin:4px 0 8px 18px;padding:0}.fl-ph li{margin:4px 0;overflow-wrap:anywhere}.fl-checker{background:color-mix(in srgb,var(--warn,#c90) 20%,transparent)}.fl-founder{background:color-mix(in srgb,var(--bad,#c33) 15%,transparent)}.fl-problems{border-color:var(--warn,#c90);margin-bottom:12px}</style>`;
