// The book reader (a city page template): a company's books from the books contract (ctx.books, from its books tool,
// e.g. Meta's src/books.mjs): a shelf, each public book's table of contents, and its chapters in a readable typeface and
// measure, light and dark, at phone width, with drafts marked. A private book shows only its title, its status and that
// it is private: the books tool never puts its text in ctx. Reads only ctx.books; view state lives in memory
// (globalThis.__hqBook); nothing is fetched or stored.
const WPM = 230;
const STATUS = { draft: ["Draft", "a work in progress: this text will change before release"], protected: ["Author's text", "protected: the press does not edit it"], manuscript: ["Manuscript", "the current manuscript, not yet released"] };

/** a small, safe Markdown reader: everything is escaped first; links only to http(s) */
export function md(src, esc) {
  const inline = (s) => esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>").replace(/(^|[\s(])_([^_]+)_(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\[([^\]]+)\]\((?!https?:)[^)]*\)/g, "$1");
  const lines = String(src ?? "").split("\n"), out = []; let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^```/.test(l)) { const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i++; out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`); continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(l); if (h) { const n = Math.min(4, h[1].length + 1); out.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) { out.push("<hr>"); i++; continue; }
    if (/^>/.test(l)) { const buf = []; while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, "")); out.push(`<blockquote>${md(buf.join("\n"), esc)}</blockquote>`); continue; }
    if (/^\s*\|/.test(l)) { const rows = []; while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]); const cells = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()); const body = rows.filter((r) => !/^\s*\|?\s*:?-{2,}/.test(r));
      out.push(`<div class="bk-table"><table>${body.map((r, k) => `<tr>${cells(r).map((c) => (k === 0 && rows.length > 1 && /^\s*\|?\s*:?-{2,}/.test(rows[1]) ? `<th>${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join("")}</tr>`).join("")}</table></div>`); continue; }
    if (/^\s*([-*+]|\d+[.)])\s+/.test(l)) { const ordered = /^\s*\d/.test(l), items = []; while (i < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) { let it = lines[i++].replace(/^\s*([-*+]|\d+[.)])\s+/, ""); while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) it += " " + lines[i++].trim(); items.push(`<li>${inline(it)}</li>`); } out.push(ordered ? `<ol>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`); continue; }
    const buf = []; while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|```|\s*\||\s*([-*+]|\d+[.)])\s+)/.test(lines[i])) buf.push(lines[i++].trim()); out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}

export function render(ctx) {
  const { esc } = ctx, books = Array.isArray(ctx.books) ? ctx.books : [];
  if (!books.length) return `<h1>Books</h1><div class="empty">No books listed (the company's books tool: a public book with its chapters, a private one with its title and status only).</div>`;
  const G = (globalThis.__hqBook ??= {}), key = ctx.company?.id ?? "hq", ui = (G[key] ??= { book: null, ch: null, size: 1 });
  if (ui.book && !books.some((b) => b.id === ui.book)) { ui.book = null; ui.ch = null; }
  const redraw = () => { const el = globalThis.document?.getElementById("bk-root"); if (el) el.innerHTML = draw(); };
  G.open = (b, ch = null) => { ui.book = b; ui.ch = ch; redraw(); globalThis.scrollTo?.(0, 0); };
  G.size = (d) => { ui.size = Math.max(0, Math.min(2, ui.size + d)); redraw(); };
  const chip = (s) => `<span class="bk-st bk-${esc(s)}" title="${esc(STATUS[s]?.[1] ?? s)}">${esc(STATUS[s]?.[0] ?? s)}</span>`;
  const mins = (w) => `${Math.max(1, Math.round(w / WPM))} min`;
  const shelf = () => `<h1>Books</h1><div class="sub1">${books.length} book${books.length > 1 ? "s" : ""} · from the press's books tool; a private book shows only its title and status</div><div class="bk-shelf">${books.map((b) => {
    const drafts = b.chapters.filter((c) => c.status === "draft").length, words = b.chapters.reduce((a, c) => a + (c.words ?? 0), 0);
    return `<div class="card bk-card${b.private ? " bk-private" : ""}"${b.private || !b.chapters.length ? "" : ` onclick="globalThis.__hqBook.open('${esc(b.id)}')" role="button" tabindex="0"`}><div class="bk-spine"></div><div><h3>${esc(b.title)}</h3>${b.subtitle ? `<div class="k">${esc(b.subtitle)}</div>` : ""}<div class="chips" style="margin-top:8px"><span class="chip">${b.private ? "🔒 private" : "public"}</span>${b.status ? `<span class="chip">${esc(b.status)}</span>` : ""}${b.chapters.length ? `<span class="k">${b.chapters.length} sections · ${mins(words)} · ${drafts} draft${drafts === 1 ? "" : "s"}</span>` : ""}</div>
      <div class="k" style="margin-top:8px">${b.private ? "Private: its text stays in its own repository. The HQ shows only its title and status." : b.missing ? esc(b.missing) : esc(b.note ?? "")}</div>${!b.private && b.chapters.length ? `<div style="margin-top:10px"><b class="bk-go">Read →</b></div>` : ""}</div></div>`; }).join("")}</div>`;
  const toc = (b) => {
    let html = "", open = false; const group = (t) => { if (open) html += "</ol>"; html += `<h3 class="bk-part">${t}</h3><ol class="bk-toc">`; open = true; };
    for (const c of b.chapters) { if (c.kind === "part") { group(`<a onclick="globalThis.__hqBook.open('${esc(b.id)}',${c.n})">${esc(c.title)}</a>`); continue; } if (!open) group("Front matter");
      html += `<li><a onclick="globalThis.__hqBook.open('${esc(b.id)}',${c.n})">${esc(c.title)}</a> ${c.status !== "manuscript" ? chip(c.status) : ""}<span class="k"> · ${mins(c.words)}</span></li>`; }
    if (open) html += "</ol>";
    const drafts = b.chapters.filter((c) => c.status === "draft");
    return `<div class="crumbs"><a onclick="globalThis.__hqBook.open(null)">Books</a><span class="k">›</span><span>${esc(b.title)}</span></div><h1>${esc(b.title)}</h1>${b.subtitle ? `<div class="sub1">${esc(b.subtitle)}${b.author ? ` · ${esc(b.author)}` : ""}</div>` : ""}
      <div class="card" style="margin-bottom:14px">${esc(b.status ?? "")}${drafts.length ? ` · <b>${drafts.length} draft chapter${drafts.length > 1 ? "s" : ""}</b>, marked ${chip("draft")}` : ""}${b.repo ? ` · <span class="k">${esc(b.repo)}</span>` : ""}${b.note ? `<div class="k" style="margin-top:6px">${esc(b.note)}</div>` : ""}</div>
      <nav class="bk-contents">${html}</nav>`;
  };
  const chapter = (b, c) => {
    const prev = b.chapters[c.n - 1], next = b.chapters[c.n + 1], nav = `<div class="bk-pn">${prev ? `<a class="pill" onclick="globalThis.__hqBook.open('${esc(b.id)}',${prev.n})">← ${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a class="pill" onclick="globalThis.__hqBook.open('${esc(b.id)}',${next.n})">${esc(next.title)} →</a>` : "<span></span>"}</div>`;
    return `<div class="crumbs"><a onclick="globalThis.__hqBook.open(null)">Books</a><span class="k">›</span><a onclick="globalThis.__hqBook.open('${esc(b.id)}')">${esc(b.title)}</a><span class="k">›</span><span>${esc(c.title)}</span></div>
      <div class="bk-bar"><span class="k">${c.n + 1} of ${b.chapters.length} · ${mins(c.words)}</span><span><button class="pill" onclick="globalThis.__hqBook.size(-1)" aria-label="smaller text">A−</button><button class="pill" onclick="globalThis.__hqBook.size(1)" aria-label="larger text">A+</button></span></div>
      ${c.status === "draft" ? `<div class="bk-banner">${chip("draft")} This chapter is a work in progress: its text will change before release.</div>` : c.status === "protected" ? `<div class="bk-banner">${chip("protected")} The author's text, protected: the press does not edit it.</div>` : ""}
      <article class="bk-read bk-s${ui.size}">${md(c.body, esc)}</article>${nav}`;
  };
  const draw = () => { const b = books.find((x) => x.id === ui.book && !x.private); if (!b) return shelf(); const c = ui.ch != null ? b.chapters[ui.ch] : null; return c ? chapter(b, c) : toc(b); };
  return `${STYLE}<div id="bk-root">${draw()}</div>`;
}
const STYLE = `<style>
.bk-shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.bk-card{display:grid;grid-template-columns:14px 1fr;gap:12px;cursor:pointer}.bk-card.bk-private{cursor:default}
.bk-spine{border-radius:4px;background:linear-gradient(180deg,var(--accent),color-mix(in srgb,var(--accent) 55%,#000))}.bk-private .bk-spine{background:repeating-linear-gradient(45deg,var(--line) 0 6px,var(--chip) 6px 12px)}
.bk-go{color:var(--accent)}
.bk-st{display:inline-block;font-size:11px;padding:1px 7px;border-radius:999px;border:1px solid var(--line);color:var(--muted);vertical-align:1px}
.bk-st.bk-draft{border-color:var(--warn);color:var(--warn)}.bk-st.bk-protected{border-color:var(--accent);color:var(--accent)}
.bk-part{margin:18px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}.bk-part a{color:inherit}
.bk-toc{margin:0;padding-left:22px;display:grid;gap:4px}.bk-toc a,.bk-part a{cursor:pointer}.bk-toc a:hover{color:var(--accent)}
.bk-bar{display:flex;justify-content:space-between;align-items:center;gap:8px;max-width:38rem;margin:0 auto 8px}
.bk-banner{max-width:38rem;margin:0 auto 14px;padding:10px 12px;border:1px solid var(--warn);border-radius:10px;background:color-mix(in srgb,var(--warn) 9%,transparent)}
.bk-read{max-width:38rem;margin:0 auto;font-family:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Source Serif Pro",serif;font-size:1.125rem;line-height:1.7;color:var(--text);overflow-wrap:break-word;hyphens:auto}
.bk-read.bk-s0{font-size:1rem}.bk-read.bk-s2{font-size:1.3rem}
.bk-read h2{font-size:1.75em;line-height:1.2;margin:.4em 0 .2em}.bk-read h3{font-size:1.25em;margin:1.6em 0 .4em}.bk-read h4{font-size:1.05em;margin:1.4em 0 .3em}
.bk-read p{margin:0 0 1em}.bk-read blockquote{margin:1em 0;padding:0 0 0 1em;border-left:3px solid var(--line);color:var(--muted)}
.bk-read hr{border:0;text-align:center;margin:1.6em 0}.bk-read hr:after{content:"⁂";color:var(--muted)}
.bk-read code{font-size:.85em}.bk-read pre{overflow:auto;background:var(--chip);padding:10px;border-radius:8px;font-size:.8em}
.bk-table{overflow-x:auto;margin:1em 0}.bk-read table{border-collapse:collapse;font-family:inherit;font-size:.9em}.bk-read td,.bk-read th{border:1px solid var(--line);padding:4px 8px;text-align:left;vertical-align:top}
.bk-pn{max-width:38rem;margin:24px auto 0;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.bk-pn a{cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (max-width:600px){.bk-read{font-size:1.05rem;line-height:1.65}.bk-read.bk-s2{font-size:1.2rem}}
</style>`;
