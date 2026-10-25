#!/usr/bin/env node
// The city's shared catalog: roles (roles/<id>/ROLE.md), skills (skills/<id>/SKILL.md) and HQ pages (pages/<id>/PAGE.md
// and, for a template, page.js), each a folder with a Markdown file whose front matter describes it. This tool reads
// them and writes the registry (registry/roles.json, skills.json, pages.json) that onboarding and the HQ read.
//   node tools/registry.mjs [root]            write the registry
//   node tools/registry.mjs [root] --check    exit 1 if the registry is out of date
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** front matter: `key: value` lines between `---` fences; `[a, b]` is a list */
export function frontMatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text); if (!m) return null;
  const fm = {}; for (const l of m[1].split("\n")) { const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(l); if (!kv) continue; const v = kv[2].trim(); fm[kv[1]] = /^\[.*\]$/.test(v) ? v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean) : v; }
  return { fm, body: m[2] };
}
const section = (body, h) => { const m = new RegExp(`^## ${h}\\n+([\\s\\S]*?)(?=\\n## |$)`, "m").exec(body); return m ? m[1].split("\n").filter((l) => /^- /.test(l)).map((l) => l.slice(2).trim()) : []; };
export function registry(root) {
  const read = (kind, file) => { const dir = path.join(root, kind); return (fs.existsSync(dir) ? fs.readdirSync(dir) : []).filter((d) => fs.existsSync(path.join(dir, d, file))).sort().map((d) => ({ dir: d, ...(frontMatter(fs.readFileSync(path.join(dir, d, file), "utf8")) ?? { fm: null, body: "" }) })); };
  const roles = read("roles", "ROLE.md").map(({ dir, fm, body }) => ({ id: fm?.name ?? dir, title: fm?.title ?? dir, team: fm?.team ?? null, reportsTo: fm?.reportsTo ?? null, layer: fm?.layer ?? null, description: fm?.description ?? "", mission: (/\*\*Mission\.\*\*\s*(.+)/.exec(body)?.[1] ?? "").trim(), inScope: section(body, "In scope"), outOfScope: section(body, "Out of scope"), skills: fm?.skills ?? [], from: fm?.from ?? null, path: `roles/${dir}/ROLE.md` }));
  const skills = read("skills", "SKILL.md").map(({ dir, fm }) => ({ id: fm?.name ?? dir, description: fm?.description ?? "", path: `skills/${dir}/SKILL.md`, usedBy: roles.filter((r) => r.skills.includes(fm?.name ?? dir)).map((r) => r.id) }));
  const pages = read("pages", "PAGE.md").map(({ dir, fm }) => ({ id: fm?.name ?? dir, title: fm?.title ?? dir, description: fm?.description ?? "", kind: fm?.kind ?? "template", reads: fm?.reads ?? [], path: `pages/${dir}/PAGE.md`, ...(fs.existsSync(path.join(root, "pages", dir, "page.js")) ? { module: `pages/${dir}/page.js` } : {}) }));
  return { roles: { v: 1, roles }, skills: { v: 1, skills }, pages: { v: 1, pages } };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "."), r = registry(root), stale = [];
  for (const k of ["roles", "skills", "pages"]) { const f = path.join(root, "registry", `${k}.json`), s = JSON.stringify(r[k], null, 1) + "\n"; if (process.argv.includes("--check")) { if (!fs.existsSync(f) || fs.readFileSync(f, "utf8") !== s) stale.push(`registry/${k}.json`); } else fs.writeFileSync(f, s); }
  if (stale.length) { console.error(`out of date: ${stale.join(", ")} (run node tools/registry.mjs)`); process.exit(1); }
  console.log(process.argv.includes("--check") ? "the registry is up to date" : `registry: ${r.roles.roles.length} roles, ${r.skills.skills.length} skills, ${r.pages.pages.length} pages`);
}
