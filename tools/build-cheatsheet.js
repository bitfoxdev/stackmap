#!/usr/bin/env node
/* Cheat sheet yig'ish: node tools/build-cheatsheet.js [--level senior|middle|all] [--priority core|all] [--skill slug] [--out fayl.html]
 * Standart: priority=core, level=middle+ (Middle, Strong Middle, Senior, Lead). Natija: cheatsheet.html (chop etishga tayyor). */
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 ? process.argv[i + 1] : d; };
const level = arg("level", "middle"), priority = arg("priority", "core"), only = arg("skill", ""), out = arg("out", "cheatsheet.html");

global.window = {};
const skills = [];
global.registerSkill = (s) => skills.push(s);
global.registerLesson = () => {};
const run = (rel) => (0, eval)(fs.readFileSync(path.join(root, rel), "utf8"));
run("data/manifest.js");
window.SKILL_FILES.forEach((f) => run("data/skills/" + f));
run("data/interview-questions.js");
const Q = window.INTERVIEW_QUESTIONS;

const rank = { Foundation: 0, Junior: 1, Middle: 2, "Strong Middle": 3, Senior: 4, Lead: 5 };
const min = { all: 0, junior: 1, middle: 2, senior: 4 }[level] ?? 2;
const qmin = { all: 0, junior: 0, middle: 1, senior: 2 }[level] ?? 1;
const qrank = { junior: 0, middle: 1, senior: 2, lead: 3 };
const join = (x) => (Array.isArray(x) ? x.join("\n") : x || "");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const inline = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
function md(text) {
  const lines = text.split("\n"); let html = "", code = null, list = null;
  const close = () => { if (list) { html += `</${list}>`; list = null; } };
  for (const l of lines) {
    if (l.startsWith("```")) { if (code === null) { close(); code = []; } else { html += `<pre>${esc(code.join("\n"))}</pre>`; code = null; } continue; }
    if (code) { code.push(l); continue; }
    let m;
    if ((m = l.match(/^###\s+(.*)/))) { close(); html += `<h4>${inline(m[1])}</h4>`; }
    else if ((m = l.match(/^\s*[-*]\s+(.*)/))) { if (list !== "ul") { close(); html += "<ul>"; list = "ul"; } html += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^\s*\d+\.\s+(.*)/))) { if (list !== "ol") { close(); html += "<ol>"; list = "ol"; } html += `<li>${inline(m[1])}</li>`; }
    else if (!l.trim()) close();
    else { close(); html += `<p>${inline(l.replace(/^>\s?/, ""))}</p>`; }
  }
  close(); return html;
}

const groups = window.SKILL_GROUPS; const byId = Object.fromEntries(skills.map((s) => [s.id, s]));
let body = "", nSub = 0, nQ = 0, toc = "";
for (const g of groups) {
  let gHtml = "";
  for (const id of g.skills) {
    const s = byId[id]; if (!s || (only && s.slug !== only)) continue;
    const subs = s.subskills.filter((x) => (rank[x.level] ?? 2) >= min && (priority === "all" || x.priority === priority));
    const qs = Q.filter((q) => q.skillSlug === s.slug && (qrank[q.level] ?? 1) >= qmin);
    if (!subs.length && !qs.length) continue;
    nSub += subs.length; nQ += qs.length;
    gHtml += `<section class="skill" id="s${s.id}"><h3>${esc(s.id + ". " + s.title)}</h3>`;
    if (subs.length) gHtml += "<dl>" + subs.map((x) => `<dt>${esc(x.id)} ${esc(x.title)} <span class="lv">${esc(x.level)}</span></dt><dd>${md(join(x.description))}</dd>`).join("") + "</dl>";
    if (qs.length) gHtml += `<h4>Intervyu savollari</h4><ul class="qs">` + qs.map((q) => `<li><b>${esc(q.level)}</b> ${inline(q.title)}</li>`).join("") + "</ul>";
    gHtml += "</section>";
    toc += `<a href="#s${s.id}">${esc(s.id + " " + s.title)}</a>`;
  }
  if (gHtml) body += `<h2>${esc(g.title)}</h2>${gHtml}`;
}
const css = `body{font:14px/1.5 system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1rem;color:#111}h1{margin-bottom:.2rem}h2{border-bottom:2px solid #22c55e;padding-top:1.5rem;break-after:avoid}h3{margin:1.5rem 0 .3rem;break-after:avoid}h4{margin:.6rem 0 .2rem}dt{font-weight:600;margin-top:.8rem}dd{margin:.2rem 0 0 1rem}dd p{margin:.2rem 0}code{background:#eef;padding:0 .25em;border-radius:3px;font-family:ui-monospace,monospace;font-size:.92em}pre{background:#f4f4f6;padding:.6rem;overflow:auto;border-radius:4px;font-size:12px;white-space:pre-wrap}.lv{font-weight:400;font-size:.75em;color:#666;border:1px solid #ccc;border-radius:8px;padding:0 .4em;margin-left:.4em}.qs{padding-left:1.2rem}.toc{columns:3;font-size:12px}.toc a{display:block;color:#145}@media print{.toc{display:none}body{margin:0;max-width:none;font-size:11px}pre{font-size:9.5px}section{break-inside:auto}}`;
fs.writeFileSync(path.join(root, out), `<!DOCTYPE html><html lang="uz"><head><meta charset="utf-8"><title>Stack Map — Cheat sheet</title><style>${css}</style></head><body><h1>Stack Map — Cheat sheet</h1><p>Filtr: daraja ≥ ${esc(level)}, ustuvorlik: ${esc(priority)}. ${nSub} ta subskill, ${nQ} ta intervyu savoli.</p><div class="toc">${toc}</div>${body}</body></html>`);
console.log(`${out}: ${nSub} subskill, ${nQ} savol`);
