// The decisions inbox (a city page template): what waits on the owner, from the dashboard contract's asks.
export function render({ dashboard, esc }) {
  const asks = [...(dashboard?.asks ?? [])].sort((a, b) => (a.priority ?? 9) - (b.priority ?? 9));
  if (!asks.length) return `<h1>Decisions</h1><div class="empty">Nothing waits on you.</div>`;
  const kinds = {}; for (const a of asks) kinds[a.kind ?? "ask"] = (kinds[a.kind ?? "ask"] ?? 0) + 1;
  const card = (a) => `<div class="card" style="margin-bottom:10px"><div><span class="chip">${a.priority != null ? `P${a.priority}` : "—"}</span> <span class="chip">${esc(a.kind ?? "ask")}</span> <b>${esc(a.id)}</b> ${esc(a.title)}</div>
    <div class="k" style="margin-top:4px">${esc(a.status ?? "open")}${a.from ? ` · from ${esc(a.from)}` : ""}${a.since ? ` · since ${esc(a.since)}` : ""}</div>
    ${a.blocks ? `<div style="margin-top:6px"><span class="k">blocks</span> ${esc(a.blocks)}</div>` : ""}
    ${(a.options ?? []).length ? `<ul>${a.options.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
    ${a.recommendation ? `<div><span class="k">recommended</span> ${esc(a.recommendation)}</div>` : ""}
    ${(a.links ?? []).length ? `<div class="k" style="margin-top:6px">${a.links.map((l) => `<code>${esc(l)}</code>`).join(" · ")}</div>` : ""}</div>`;
  return `<h1>Decisions</h1><div class="sub1">${asks.length} waiting on you · ${Object.entries(kinds).map(([k, n]) => `${n} ${esc(k)}`).join(" · ")}</div>${asks.map(card).join("")}`;
}
