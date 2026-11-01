// Radar (a city page template): the technology, techniques and AI practices the company trusts, drawn as radars in the
// manner of the Zalando and Thoughtworks tech radars, from the dashboard contract's `radar` (system3-meta src/radar.mjs).
// Three radars by default (tech stack; org and techniques; AI), each with four quadrants and four rings from the centre
// out: adopt (the default for new work), trial (in use on purpose, with a way back), assess (worth a look), hold (no new
// work; what replaces it). Each entry is a numbered blip, laid out in rows inside its sector so blips never overlap; the
// legend beside each radar lists them by quadrant and ring. Moves between rings follow the radar flow (flows.json).
// Inline SVG, no library, deterministic. Reads only ctx.dashboard.
const RINGS = [["adopt", "the default for new work"], ["trial", "in use on purpose, with a way back"], ["assess", "worth a look"], ["hold", "no new work"]];
const R = [0, 0.42, 0.64, 0.82, 1]; // ring boundaries as a share of the radius: adopt gets the most room
// quadrant k (0..3) spans these angles (SVG: 0 = right, clockwise): top-right, top-left, bottom-left, bottom-right
const SPAN = [[-90, 0], [-180, -90], [90, 180], [0, 90]];
const CORNER = [["end", 1, 0], ["start", 0, 0], ["start", 0, 1], ["end", 1, 1]];

function layout(entries, quadrants, rad) {
  const pos = new Map();
  quadrants.forEach((q, k) => RINGS.forEach(([ring], ri) => {
    const here = entries.filter((b) => b.quadrant === q.id && b.ring === ring); if (!here.length) return;
    const [a0, a1] = SPAN[k], r0 = rad * R[ri], r1 = rad * R[ri + 1], gap = 22;
    // rows inside the band, inner to outer, as many as fit; each row holds as many blips as its arc allows
    const rows = []; for (let r = r0 + gap * 0.75; r <= r1 - gap * 0.55 + 0.01; r += gap) rows.push(r);
    if (!rows.length) rows.push((r0 + r1) / 2);
    const caps = rows.map((r) => Math.max(1, Math.floor(((a1 - a0 - 10) * Math.PI / 180) * r / gap)));
    let left = here.length; const per = rows.map((_, i) => { const n = Math.min(caps[i], Math.ceil(left / (rows.length - i))); left -= n; return n; });
    // if the band is full, the last row takes the rest (it never happens below about 10 blips per sector)
    if (left > 0) per[per.length - 1] += left;
    let i = 0;
    rows.forEach((r, ri2) => { const n = per[ri2]; for (let j = 0; j < n; j++, i++) { const t = (j + 0.5 + (ri2 % 2) * 0.25) / (n + (ri2 % 2) * 0.25), a = (a0 + 5 + (a1 - a0 - 10) * t) * Math.PI / 180; pos.set(here[i].n, [Math.cos(a) * r, Math.sin(a) * r]); } });
  }));
  return pos;
}

function one(radar, esc, idx) {
  const quadrants = radar.quadrants ?? [], size = 520, c = size / 2, rad = c - 22;
  const blips = []; let n = 0;
  for (const q of quadrants) for (const [r] of RINGS) for (const e of radar.entries.filter((x) => x.quadrant === q.id && x.ring === r).sort((a, b) => String(a.name).localeCompare(String(b.name)))) blips.push({ ...e, n: ++n });
  const pos = layout(blips, quadrants, rad);
  const rings = RINGS.map(([r], i) => `<circle cx="${c}" cy="${c}" r="${(rad * R[i + 1]).toFixed(1)}" class="rr rr-${r}"/>`).reverse().join("")
    + `<line x1="${c}" y1="${c - rad}" x2="${c}" y2="${c + rad}" class="rx"/><line x1="${c - rad}" y1="${c}" x2="${c + rad}" y2="${c}" class="rx"/>`
    + RINGS.map(([r], i) => `<text x="${c + 5}" y="${(c - rad * R[i + 1] + 13).toFixed(1)}" class="rl">${r}</text>`).join("");
  const dots = blips.map((b) => { const [x, y] = pos.get(b.n) ?? [0, 0]; return `<g class="rb rb-${esc(b.ring)}" tabindex="0"><title>${esc(`${b.n}. ${b.name} (${b.ring})${b.why ? `: ${b.why}` : ""}${b.replaces ? ` · instead: ${b.replaces}` : ""}`)}</title><circle cx="${(c + x).toFixed(1)}" cy="${(c + y).toFixed(1)}" r="9"/><text x="${(c + x).toFixed(1)}" y="${(c + y + 3.5).toFixed(1)}">${b.n}</text></g>`; }).join("");
  const labels = quadrants.map((q, k) => { const [anchor, cx, cy] = CORNER[k]; return `<text x="${cx ? size - 4 : 4}" y="${cy ? size - 6 : 14}" text-anchor="${anchor}" class="rq">${esc(q.name)}</text>`; }).join("");
  const svg = `<svg class="rd-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(radar.title)}: ${blips.length} entries">${rings}${dots}${labels}</svg>`;
  const legend = (k) => { const q = quadrants[k]; if (!q) return "<div></div>"; return `<div class="rd-leg"><h3>${esc(q.name)}</h3>${RINGS.map(([r]) => { const es = blips.filter((b) => b.quadrant === q.id && b.ring === r); return es.length ? `<div><div class="k rd-rn rd-${r}">${r}</div><ol>${es.map((b) => `<li value="${b.n}" title="${esc(b.why ?? "")}"><b>${esc(b.name)}</b>${b.version ? ` <span class="k">${esc(b.version)}</span>` : ""}${b.replaces ? ` <span class="k">→ ${esc(b.replaces)}</span>` : ""}${(b.history ?? []).length ? ` <span class="k">(was ${b.history.map((h) => esc(h.ring)).join(" → ")})</span>` : ""}</li>`).join("")}</ol></div>` : ""; }).join("") || `<div class="k">none yet</div>`}</div>`; };
  return `<section class="rd-one" id="radar-${esc(radar.id)}"><h2>${esc(radar.title)} <span class="k">${blips.length} · ${RINGS.map(([r]) => `${radar.byRing?.[r] ?? 0} ${r}`).join(" · ")}</span></h2>
    <div class="rd-layout">${legend(1)}${svg}${legend(0)}${legend(2)}${legend(3)}</div></section>`;
}

export function render({ dashboard, esc }) {
  const v = dashboard?.radar;
  if (!v || !(v.entries ?? []).length) return `<h1>Tech radar</h1><div class="empty">No radar yet. A company keeps radar.json beside company.json (system3-meta src/radar.mjs, templates/radar.json): three radars, tech stack, org and techniques, and AI.</div>`;
  const radars = (v.radars ?? []).length ? v.radars : [{ id: "tech", title: "Tech radar", quadrants: [{ id: "techniques", name: "Techniques" }, { id: "tools", name: "Tools" }, { id: "platforms", name: "Platforms" }, { id: "languages-frameworks", name: "Languages & frameworks" }], entries: v.entries, byRing: v.byRing }];
  return `${STYLE}<h1>Radars</h1><div class="sub1">${v.total} entries in ${radars.length} radar${radars.length > 1 ? "s" : ""} · reviewed ${esc(v.reviewed ?? "never")} by ${esc(v.owner ?? "?")} · hover a blip for why · moves between rings follow the radar flow</div>
  <nav class="rd-nav">${radars.map((r) => `<a href="javascript:void 0" onclick="document.getElementById('radar-${esc(r.id)}').scrollIntoView({behavior:'smooth'})">${esc(r.title)}</a>`).join(" · ")}</nav>
  ${(v.problems ?? []).length ? `<div class="card rd-problems"><b>Problems</b><ul>${v.problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>` : ""}
  ${radars.map((r, i) => one(r, esc, i)).join("")}`;
}
const STYLE = `<style>
.rd-nav{margin:6px 0 12px}.rd-one{margin-bottom:28px}
.rd-layout{display:grid;grid-template-columns:1fr minmax(0,520px) 1fr;grid-template-areas:"tl s tr" "bl s br";gap:8px 18px;align-items:start}
.rd-layout>:nth-child(1){grid-area:tl}.rd-layout>svg{grid-area:s}.rd-layout>:nth-child(3){grid-area:tr}.rd-layout>:nth-child(4){grid-area:bl}.rd-layout>:nth-child(5){grid-area:br}
@media (max-width:960px){.rd-layout{grid-template-columns:1fr;grid-template-areas:"s" "tl" "tr" "bl" "br"}}
.rd-svg{width:100%;height:auto;max-width:520px;justify-self:center}
.rr{fill:none;stroke:var(--line,#ccc);stroke-width:1}.rr-adopt{fill:color-mix(in srgb,#2f8f5b 9%,transparent)}.rr-trial{fill:color-mix(in srgb,#2f6fb0 5%,transparent)}.rr-assess{fill:color-mix(in srgb,#b0832f 4%,transparent)}.rr-hold{fill:color-mix(in srgb,#b03a3a 5%,transparent)}
.rx{stroke:var(--line,#ccc);stroke-width:1.5}.rl{font-size:10px;fill:var(--muted,#888);text-transform:uppercase;letter-spacing:.08em}.rq{font-size:12px;font-weight:600;fill:var(--fg,currentColor)}
.rb circle{stroke:var(--bg,#fff);stroke-width:1.5}.rb text{font-size:9px;font-weight:700;fill:#fff;text-anchor:middle;pointer-events:none}.rb{cursor:help}.rb:hover circle,.rb:focus circle{stroke:var(--fg,#222);stroke-width:2}
.rb-adopt circle{fill:#2f8f5b}.rb-trial circle{fill:#2f6fb0}.rb-assess circle{fill:#b0832f}.rb-hold circle{fill:#b03a3a}
.rd-leg h3{font-size:.95rem;margin:4px 0}.rd-leg ol{margin:2px 0 8px 24px;padding:0}.rd-leg li{font-size:.9em;margin:1px 0;overflow-wrap:anywhere}.rd-rn{text-transform:uppercase;letter-spacing:.06em;font-weight:600}
.rd-adopt{color:#2f8f5b}.rd-trial{color:#2f6fb0}.rd-assess{color:#b0832f}.rd-hold{color:#b03a3a}.rd-problems{border-color:var(--warn,#c90);margin-bottom:12px}
</style>`;
