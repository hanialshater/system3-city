// Docs (a city page template): how the company works NOW, what comes next, and how it evolved, from the documents
// contract (system3-meta src/docs.mjs; docs/product/DOCS.md). The handbook first; then the living docs by subject (owner,
// last change; stale after 90 days); the plans with their horizons; the architecture snapshots as a timeline. Records
// (EDDs, ADRs, decisions…) stay on the Knowledge page. Reads only ctx.docs.
// Visuals: a doc's `diagrams` (Mermaid text, docs/product/DOCS.md "Visuals") are drawn on the one common whiteboard
// (SkyKit.sketchSvg, when the HQ has the kit); otherwise the Mermaid text is shown as it is written.
const SUBJECTS = ["architecture", "org", "rituals", "processes", "runbooks", "standards", "tools"];
function draw(m, esc) {
  try { const K = globalThis.SkyKit; if (K?.sketchSvg) return `<div class="cs3 dc-wb">${K.sketchSvg({ v: 1, title: "", mermaid: m })}</div>`; } catch {}
  return `<pre class="dc-mm" title="Mermaid: drawn on the whiteboard where the HQ has it">${esc(m)}</pre>`;
}
export function render({ docs, esc }) {
  const all = docs ?? [], live = all.filter((d) => d.kind === "doc"), plans = all.filter((d) => d.kind === "plan"), snaps = all.filter((d) => d.kind === "snapshot").sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!live.length && !plans.length && !snaps.length) return `<h1>Docs</h1><div class="empty">No current docs yet. A company keeps a handbook and marks its living docs, plans and snapshots in their headers (system3-meta docs/product/DOCS.md).</div>`;
  const today = new Date().toISOString().slice(0, 10), age = (d) => (d ? Math.round((Date.parse(today) - Date.parse(d)) / 864e5) : null);
  const open = (d) => (d.n != null ? `style="cursor:pointer" onclick="state.view='knowledge';kv().tab='docs';openDoc(${d.n});location.hash=state.company+'/knowledge'"` : "");
  const row = (d) => { const a = age(d.updated); return `<div class="card dc ${a != null && a > 90 ? "dc-stale" : ""}" ${open(d)}><b>${esc(d.title)}</b><div class="k">${esc(d.path)}${d.owner ? ` · ${esc(d.owner)}` : ""}${d.updated ? ` · changed ${esc(d.updated)}${a > 90 ? " · <b>stale</b>" : ""}` : ""}</div>${d.summary ? `<div class="dc-sum">${esc(d.summary)}</div>` : ""}${(d.diagrams ?? []).length ? `<details class="dc-vis" onclick="event.stopPropagation()"><summary class="k">${d.diagrams.length} diagram${d.diagrams.length > 1 ? "s" : ""}</summary>${d.diagrams.map((m) => draw(m, esc)).join("")}</details>` : ""}</div>`; };
  const hb = live.find((d) => d.subject === "handbook");
  const bySubject = SUBJECTS.map((s) => [s, live.filter((d) => d.subject === s)]);
  const other = live.filter((d) => d.subject !== "handbook" && !SUBJECTS.includes(d.subject));
  const plan = (d) => `<div class="card dc ${d.until && d.until < today ? "dc-stale" : ""}" ${open(d)}><b>${esc(d.title)}</b> <span class="chip">${esc(d.subject ?? "plan")}</span><div class="k">${d.until ? `until ${esc(d.until)}${d.until < today ? " · <b>ended: write the next one</b>" : ""}` : "no horizon"}${d.owner ? ` · ${esc(d.owner)}` : ""}${d.status ? ` · ${esc(d.status)}` : ""}</div>${(d.diagrams ?? []).map((m) => draw(m, esc)).join("")}</div>`;
  const snap = (d) => `<li><span ${open(d)}><b>${esc(d.date ?? "?")}</b> ${esc(d.title)} <span class="k">${esc(d.subject ?? "")}</span></span>${(d.diagrams ?? []).slice(0, 1).map((m) => draw(m, esc)).join("")}</li>`;
  const records = all.filter((d) => (d.kind ?? "record") === "record").length;
  return `${STYLE}<h1>Docs</h1><div class="sub1">How it works now, what comes next, how it evolved. ${records} records (EDDs, ADRs, decisions…) are on the Knowledge page.</div>
  ${hb ? `<h2>Start here</h2>${row(hb)}` : `<div class="card dc-stale">No handbook yet (system3-meta templates/HANDBOOK.md).</div>`}
  <h2>How it works now</h2><div class="dc-grid">${bySubject.map(([s, ds]) => `<div><h3>${esc(s)}</h3>${ds.map(row).join("") || `<div class="k">in the handbook${hb ? "" : " (none yet)"}</div>`}</div>`).join("")}${other.length ? `<div><h3>other</h3>${other.map(row).join("")}</div>` : ""}</div>
  <h2>What comes next</h2>${plans.map(plan).join("") || `<div class="empty">No plans yet: an operational plan and an architecture plan (templates/docs/OP.md, ARCHITECTURE-PLAN.md).</div>`}
  <h2>How it evolved</h2>${snaps.length ? `<ol class="dc-time">${snaps.map(snap).join("")}</ol>` : `<div class="empty">No snapshots yet (templates/docs/ARCHITECTURE-SNAPSHOT.md).</div>`}`;
}
const STYLE = `<style>.dc{margin-bottom:8px;border-left:4px solid var(--ok,#3a7)}.dc-stale{border-left-color:var(--warn,#c90)}.dc b{overflow-wrap:anywhere}.dc-sum{margin-top:4px;color:var(--muted);font-size:.92em}.dc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px}.dc-grid h3{font-size:.95rem;text-transform:capitalize;margin:6px 0}.dc-time{padding-left:18px}.dc-time li{margin:8px 0}.dc-time li>span{cursor:pointer}.dc-mm{white-space:pre;overflow-x:auto;font-size:.8em;background:var(--panel,rgba(127,127,127,.08));padding:8px;border-radius:6px;margin-top:6px}.dc-wb{margin-top:6px;overflow-x:auto}.dc-wb svg{max-width:100%;height:auto}.dc-vis{margin-top:6px}</style>`;
