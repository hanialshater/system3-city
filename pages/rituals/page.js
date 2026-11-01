// Rituals (a city page template): when each ritual is due, on two clocks, from the dashboard contract's `rituals`
// (system3-meta src/cadence.mjs). Agent-clock rituals fire on work and are never overdue while a company is idle;
// human-clock rituals fire on calendar slots in the founder's time zone. They meet at the weekly review, which lists the
// agent records held since it was last held. Due rituals first; blocking ones marked. Reads only ctx.dashboard.
export function render({ dashboard, esc }) {
  const v = dashboard?.rituals;
  if (!v || !(v.rituals ?? []).length) return `<h1>Rituals</h1><div class="empty">No ritual schedule yet. A company keeps rituals.json beside company.json (system3-meta src/cadence.mjs), or names a ritualsCmd that prints it.</div>`;
  const day = (s) => (s ? esc(String(s).slice(0, 16).replace("T", " ")) : "never");
  const row = (r) => `<div class="card rt ${r.due ? "rt-due" : r.waitUntil ? "rt-wait" : "rt-ok"}"><div class="rt-head"><b>${esc(r.ritual)}</b>${r.blocks ? `<span class="chip" title="while due, new work waits">blocks</span>` : ""}<span class="k" style="margin-left:auto">${r.due ? "due" : r.waitUntil ? `work due; not before ${day(r.waitUntil)}` : r.clock === "human" && r.nextSlot ? `next ${esc(r.nextSlot)}` : r.clock === "agent" ? "on work" : ""}</span></div>
    <div class="k">${r.clock === "human" ? `${esc(r.slot ?? "")} · ` : ""}last held ${day(r.last)}</div>
    ${r.reasons?.length ? `<div class="rt-row">${r.reasons.map(esc).join("; ")}</div>` : ""}
    ${r.why ? `<div class="rt-row rt-why">${esc(r.why)}</div>` : ""}
    ${r.rollup ? `<details class="rt-row"><summary class="k">${r.rollup.length} agent record${r.rollup.length === 1 ? "" : "s"} since it was last held</summary><ul>${r.rollup.map((x) => `<li>${esc(x.ritual)} · ${day(x.ts)} · <code>${esc(x.record)}</code></li>`).join("")}</ul></details>` : ""}</div>`;
  const sort = (a, b) => Number(b.due) - Number(a.due) || a.ritual.localeCompare(b.ritual);
  const agent = v.rituals.filter((r) => r.clock === "agent").sort(sort), human = v.rituals.filter((r) => r.clock !== "agent").sort(sort);
  return `${STYLE}<h1>Rituals</h1><div class="sub1">from ${esc(v.source ?? "")} · human clock in ${esc(v.timeZone ?? "UTC")}${(v.problems ?? []).length ? ` · <b>${v.problems.length} problem${v.problems.length > 1 ? "s" : ""}</b> in the schedule` : ""}</div>
  <div class="row" style="margin-bottom:14px"><div class="card stat"><div class="k">due</div><div class="v">${(Array.isArray(v.due) ? v.due : []).length}</div></div><div class="card stat"><div class="k">blocking</div><div class="v">${(Array.isArray(v.blocking) ? v.blocking : []).length}</div></div><div class="card stat"><div class="k">agent clock</div><div class="v">${agent.length}</div></div><div class="card stat"><div class="k">human clock</div><div class="v">${human.length}</div></div></div>
  ${(v.problems ?? []).length ? `<div class="card rt-problems"><b>Problems in the schedule</b><ul>${v.problems.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
  <div class="rt-cols"><div><h2>Agent clock <span class="k">fires on work; an idle company owes none</span></h2>${agent.map(row).join("") || `<div class="empty">None.</div>`}</div>
  <div><h2>Human clock <span class="k">calendar slots</span></h2>${human.map(row).join("") || `<div class="empty">None.</div>`}</div></div>`;
}
const STYLE = `<style>.rt{margin-bottom:10px;border-left:4px solid var(--line)}.rt-ok{border-left-color:var(--ok,#3a7)}.rt-wait{border-left-color:var(--warn,#c90)}.rt-due{border-left-color:var(--bad,#c33)}.rt-head{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.rt-row{margin-top:4px;overflow-wrap:anywhere}.rt-why{color:var(--muted)}.rt-problems{border-color:var(--warn,#c90);margin-bottom:12px}.rt-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:16px}.rt-cols h2{font-size:1rem}</style>`;
