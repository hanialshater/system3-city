// People (a city page template): the org as a directory, by team, with each person's last activity.
export function render({ org, events, esc, time }) {
  if (!(org ?? []).length) return `<h1>People</h1><div class="empty">No org yet.</div>`;
  const last = {}; for (const e of events ?? []) if (e.by) last[e.by] = e;
  const by = Object.fromEntries(org.map((o) => [o.id, o])), teams = {};
  for (const o of org) (teams[o.team ?? "no team"] ??= []).push(o);
  const row = (o) => `<tr><td><b>${esc(o.name ?? o.id)}</b><div class="k">${esc(o.id)}</div></td><td>${esc(o.title ?? "")}</td><td class="k">${esc(o.roomName ?? o.room ?? "")}${o.floorName ? `<div>${esc(o.floorName)}</div>` : ""}</td><td class="k">${o.reportsTo ? esc(by[o.reportsTo]?.name ?? o.reportsTo) : "—"}</td><td class="k">${last[o.id] ? `${time(last[o.id].t)}<div>${esc(String(last[o.id].text ?? last[o.id].title ?? last[o.id].type).slice(0, 80))}</div>` : "—"}</td></tr>`;
  return `<h1>People</h1><div class="sub1">${org.length} people in ${Object.keys(teams).length} teams</div>${Object.entries(teams).sort((a, b) => b[1].length - a[1].length).map(([t, os]) => `<h3 style="margin:16px 0 6px">${esc(t)} <span class="k">${os.length}</span></h3><table><tr><th>who</th><th>title</th><th>where</th><th>reports to</th><th>last activity</th></tr>${os.map(row).join("")}</table>`).join("")}`;
}
