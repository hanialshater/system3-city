// Radar (a city page template): the technology the company trusts, from the dashboard contract's `radar` (system3-meta
// src/radar.mjs). Four quadrants by four rings: adopt (the default), trial (in one place, with a way back), assess (worth a
// look), hold (no new work; what replaces it). Problems (stale reviews, a hold with no replacement) on top. Reads only
// ctx.dashboard.
const RINGS = [["adopt", "the default for new work"], ["trial", "in use on purpose, with a way back"], ["assess", "worth a look"], ["hold", "no new work"]];
const QUADRANTS = [["languages-frameworks", "Languages & frameworks"], ["tools", "Tools"], ["platforms", "Platforms"], ["techniques", "Techniques"]];
export function render({ dashboard, esc }) {
  const v = dashboard?.radar;
  if (!v || !(v.entries ?? []).length) return `<h1>Tech radar</h1><div class="empty">No tech radar yet. A company keeps radar.json beside company.json (system3-meta src/radar.mjs, templates/radar.json).</div>`;
  const cell = (q, r) => v.entries.filter((e) => e.quadrant === q && e.ring === r).map((e) => `<div class="rd-e" title="${esc(e.why ?? "")}"><b>${esc(e.name)}</b>${e.version ? ` <span class="k">${esc(e.version)}</span>` : ""}<div class="k">${esc(e.why ?? "")}${e.replaces ? ` · use instead: ${esc(e.replaces)}` : ""}</div></div>`).join("");
  return `${STYLE}<h1>Tech radar</h1><div class="sub1">${v.total} entries · reviewed ${esc(v.reviewed ?? "never")} by ${esc(v.owner ?? "?")} · ${RINGS.map(([r]) => `${v.byRing?.[r] ?? 0} ${r}`).join(" · ")}</div>
  ${(v.problems ?? []).length ? `<div class="card rd-problems"><b>Problems</b><ul>${v.problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>` : ""}
  <div class="rd-wrap"><table class="rd"><tr><th></th>${RINGS.map(([r, d]) => `<th class="rd-${r}">${r}<div class="k">${d}</div></th>`).join("")}</tr>
  ${QUADRANTS.map(([q, name]) => `<tr><th>${name}</th>${RINGS.map(([r]) => `<td class="rd-${r}">${cell(q, r)}</td>`).join("")}</tr>`).join("")}</table></div>`;
}
const STYLE = `<style>.rd-wrap{overflow-x:auto}.rd{border-collapse:collapse;width:100%;min-width:640px}.rd th,.rd td{border:1px solid var(--line);padding:8px;vertical-align:top;text-align:left}.rd th.rd-adopt,.rd td.rd-adopt{background:color-mix(in srgb,var(--ok,#3a7) 8%,transparent)}.rd th.rd-hold,.rd td.rd-hold{background:color-mix(in srgb,var(--bad,#c33) 7%,transparent)}.rd-e{margin-bottom:8px}.rd-e b{overflow-wrap:anywhere}.rd-problems{border-color:var(--warn,#c90);margin-bottom:12px}</style>`;
