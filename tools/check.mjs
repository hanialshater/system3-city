#!/usr/bin/env node
// Validates the city: every registry card, every shared knowledge entry and the shared catalog (generic roles included). Dependency-free; CI runs it on every PR.
//   node tools/check.mjs [root]    exit 1 with the problems, if any
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registry, frontMatter } from "./registry.mjs";

const KINDS = ["practice", "finding", "dead-end", "pitfall"];
const ID = /^[a-z0-9][a-z0-9-]{0,62}$/;
// what must never be published: tokens and keys, and e-mail addresses (personal data)
const SECRET = /(gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[abp]-[A-Za-z0-9-]{10,}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/;

// P12, copy then customise: a catalog role is generic, so it names no company's paths or commands. A <placeholder> in
// its "What your company supplies" section may, and so may the `from:` provenance line in its front matter.
const COMPANY_PATH = /(?:^|[^\w./-])(?:company|tools|tests|src)\/|npm run company/;
export function companySpecific(raw) {
  const found = []; let supplies = false;
  raw.split("\n").forEach((line, i) => {
    if (/^## /.test(line)) supplies = /^## What your company supplies\s*$/.test(line);
    if (/^from:/.test(line)) return;
    const text = supplies ? line.replace(/<[^<>\n]*>/g, "") : line;
    if (COMPANY_PATH.test(text)) found.push(i + 1);
  });
  return found;
}

export function check(root) {
  const p = [], ids = new Set(), regDir = path.join(root, "registry", "companies"), kDir = path.join(root, "knowledge");
  for (const f of fs.existsSync(regDir) ? fs.readdirSync(regDir) : []) {
    if (!f.endsWith(".json")) continue;
    const at = `registry/companies/${f}`, raw = fs.readFileSync(path.join(regDir, f), "utf8"); let c;
    try { c = JSON.parse(raw); } catch { p.push(`${at}: not JSON`); continue; }
    if (SECRET.test(raw)) p.push(`${at}: looks like a secret or personal data`);
    if (c.v !== 1) p.push(`${at}: v must be 1`);
    if (!ID.test(c.id ?? "") || f !== `${c.id}.json`) p.push(`${at}: id must be lowercase letters, digits and dashes, and match the file name`);
    for (const k of ["name", "owner", "archetype", "summary"]) if (!String(c[k] ?? "").trim()) p.push(`${at}: ${k} is required`);
    // every company follows PRINCIPLES.md and its card carries its latest audit (Meta: node src/principles.mjs <company>)
    if (c.principles?.source !== "PRINCIPLES.md" || ![c.principles.followed, c.principles.gaps, c.principles.manual].every(Number.isInteger) || !/^\d{4}-\d{2}-\d{2}$/.test(c.principles.audited ?? "")) p.push(`${at}: principles is required: { source: "PRINCIPLES.md", followed, gaps, manual, audited } (PRINCIPLES.md)`);
    ids.add(c.id);
  }
  for (const f of fs.existsSync(kDir) ? fs.readdirSync(kDir) : []) {
    if (!f.endsWith(".jsonl")) continue;
    const company = f.slice(0, -6);
    if (!ids.has(company)) p.push(`knowledge/${f}: no company ${company} in the registry`);
    fs.readFileSync(path.join(kDir, f), "utf8").split("\n").forEach((line, i) => {
      if (!line.trim()) return;
      const at = `knowledge/${f}:${i + 1}`; let e;
      try { e = JSON.parse(line); } catch { p.push(`${at}: not JSON`); return; }
      if (SECRET.test(line)) p.push(`${at}: looks like a secret or personal data`);
      if (e.company !== company) p.push(`${at}: company must be ${company}`);
      if (!KINDS.includes(e.kind)) p.push(`${at}: kind is one of ${KINDS.join(", ")}`);
      for (const k of ["topic", "text", "evidence", "publishedBy"]) if (!String(e[k] ?? "").trim()) p.push(`${at}: ${k} is required`);
      if (!(typeof e.belief === "number" && e.belief >= 0 && e.belief <= 1)) p.push(`${at}: belief is a number from 0 to 1`);
    });
  }
  // the shared catalog: each role, skill and page folder has its Markdown file with front matter, its name matches its
  // folder, a role's skills exist, a template page has its module; and the registry is up to date
  const reg = registry(root), skillIds = new Set(reg.skills.skills.map((x) => x.id));
  for (const [kind, file] of [["roles", "ROLE.md"], ["skills", "SKILL.md"], ["pages", "PAGE.md"]]) {
    const dir = path.join(root, kind);
    for (const d of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
      const f = path.join(dir, d, file), at = `${kind}/${d}/${file}`;
      if (!fs.statSync(path.join(dir, d)).isDirectory()) continue;
      if (!fs.existsSync(f)) { p.push(`${at}: missing`); continue; }
      const raw = fs.readFileSync(f, "utf8"), fm = frontMatter(raw)?.fm;
      if (SECRET.test(raw)) p.push(`${at}: looks like a secret or personal data`);
      if (!fm) { p.push(`${at}: needs front matter between --- lines`); continue; }
      if (fm.name !== d || !ID.test(d)) p.push(`${at}: name must match the folder (lowercase letters, digits and dashes)`);
      if (!String(fm.description ?? "").trim()) p.push(`${at}: description is required`);
      if (kind === "roles") for (const s of fm.skills ?? []) if (!skillIds.has(s)) p.push(`${at}: skill ${s} is not in skills/`);
      if (kind === "roles") for (const n of companySpecific(raw)) p.push(`${at}:${n}: names a company-specific path or command (write it as a <placeholder> under "What your company supplies")`);
      if (kind === "pages" && fm.kind === "template" && !fs.existsSync(path.join(dir, d, "page.js"))) p.push(`${at}: a template page needs page.js`);
      if (kind === "pages" && fs.existsSync(path.join(dir, d, "page.js")) && SECRET.test(fs.readFileSync(path.join(dir, d, "page.js"), "utf8"))) p.push(`pages/${d}/page.js: looks like a secret or personal data`);
    }
  }
  for (const k of ["roles", "skills", "pages"]) { const f = path.join(root, "registry", `${k}.json`); if (!fs.existsSync(f) || fs.readFileSync(f, "utf8") !== JSON.stringify(reg[k], null, 1) + "\n") p.push(`registry/${k}.json: out of date (run node tools/registry.mjs)`); }
  return p;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const p = check(path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "..")));
  if (p.length) { console.error(p.join("\n")); process.exit(1); }
  console.log("the city checks out");
}
