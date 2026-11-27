#!/usr/bin/env node
/* Stack Map ma'lumotlarini tekshiradi: node tools/validate.js  (loyiha ildizidan) */
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const rd = (p) => fs.readFileSync(path.join(root, p), "utf8");
const join = (x) => (Array.isArray(x) ? x.join("\n") : x || "");
const words = (x) => join(x).split(/\s+/).filter(Boolean).length;

const errors = [];
const warnings = [];
const skills = [];
const lessons = {};
global.window = {};
global.registerSkill = (s) => skills.push(s);
global.registerLesson = (id, l) => { lessons[id] = l; };
const run = (rel) => {
  try { (0, eval)(rd(rel)); } catch (e) { errors.push(`${rel}: ${e.message}`); }
};

run("data/manifest.js");
const SKILL_FILES = window.SKILL_FILES || [];
const LESSON_FILES = window.LESSON_FILES || [];
SKILL_FILES.forEach((f) => run("data/skills/" + f));
fs.readdirSync(path.join(root, "data/lessons")).filter((f) => f.endsWith(".js")).forEach((f) => run("data/lessons/" + f));
run("data/interview-questions.js");
run("data/interview-tests.js");

const Q = window.INTERVIEW_QUESTIONS || [];
const T = window.INTERVIEW_TESTS || [];

// --- skill / subskill ---
const subIds = new Set();
const slugs = new Set();
const skillIds = new Set();
for (const s of skills) {
  if (skillIds.has(s.id)) errors.push(`skill id takror: ${s.id}`);
  skillIds.add(s.id); slugs.add(s.slug);
  for (const x of s.subskills || []) {
    if (subIds.has(x.id)) errors.push(`subskill id takror: ${x.id}`);
    subIds.add(x.id);
    if (!join(x.description).trim()) errors.push(`${x.id}: description bo'sh`);
    if (!x.practicalTask) warnings.push(`${x.id}: practicalTask yo'q`);
    if (!(x.acceptanceCriteria || []).length) warnings.push(`${x.id}: acceptanceCriteria yo'q`);
  }
}
for (const s of skills) for (const x of s.subskills || []) for (const p of x.prerequisites || []) {
  if (/^\d+\.\d+$/.test(p) ? !subIds.has(p) : !slugs.has(p)) errors.push(`${x.id}: noto'g'ri prerequisite "${p}"`);
}

// --- manifest ---
const files = new Set(fs.readdirSync(path.join(root, "data/skills")));
SKILL_FILES.forEach((f) => { if (!files.has(f)) errors.push(`manifest: skill fayli yo'q ${f}`); });
files.forEach((f) => { if (!SKILL_FILES.includes(f)) warnings.push(`manifest'da yo'q skill fayli: ${f}`); });
const lfiles = fs.readdirSync(path.join(root, "data/lessons")).filter((f) => f.endsWith(".js"));
lfiles.forEach((f) => { if (!LESSON_FILES.includes(f)) errors.push(`LESSON_FILES'da yo'q: ${f}`); });
LESSON_FILES.forEach((f) => { if (!lfiles.includes(f)) errors.push(`LESSON_FILES: fayl yo'q ${f}`); });

// --- darslar ---
for (const id of Object.keys(lessons)) {
  if (!subIds.has(id)) errors.push(`dars yetim: ${id}`);
  const l = lessons[id];
  if (!l.lesson || !words(l.lesson)) errors.push(`${id}: dars matni bo'sh`);
  if (words(l.lesson) < 250) warnings.push(`${id}: dars qisqa (${words(l.lesson)} so'z, me'yor 350-600)`);
  if (!(l.examples || []).length) warnings.push(`${id}: examples yo'q`);
}

// --- savollar va testlar ---
const dup = (arr, name) => {
  const seen = new Set();
  arr.forEach((q) => { if (seen.has(q.id)) errors.push(`${name} id takror: ${q.id}`); seen.add(q.id); });
};
dup(Q, "savol"); dup(T, "test");
Q.forEach((q) => {
  if (!slugs.has(q.skillSlug)) errors.push(`${q.id}: noma'lum skillSlug "${q.skillSlug}"`);
  if (q.subskillId && !subIds.has(q.subskillId)) errors.push(`${q.id}: noma'lum subskillId ${q.subskillId}`);
  if (!words(q.answer)) errors.push(`${q.id}: javob bo'sh`);
});
T.forEach((t) => {
  if (t.subskillId && !subIds.has(t.subskillId)) errors.push(`${t.id}: noma'lum subskillId ${t.subskillId}`);
  const keys = (t.options || []).map((o) => o.key);
  if (keys.length < 2) errors.push(`${t.id}: variantlar yetarli emas`);
  if (!keys.includes(t.correct)) errors.push(`${t.id}: correct "${t.correct}" variantlar ichida yo'q`);
});

// --- hisobot ---
const subs = skills.reduce((a, s) => a + s.subskills.length, 0);
const lessonCov = skills.map((s) => [s, s.subskills.filter((x) => lessons[x.id]).length]);
const qSlugs = new Set(Q.map((q) => q.skillSlug));
const tSlugs = new Set(T.map((q) => q.skillSlug));
console.log(`Skill: ${skills.length}, subskill: ${subs}, dars: ${Object.keys(lessons).length}, savol: ${Q.length}, test: ${T.length}`);
console.log(`Darssiz skill: ${lessonCov.filter(([s, n]) => n === 0).length}, to'liq darsli: ${lessonCov.filter(([s, n]) => n === s.subskills.length).length}`);
console.log(`Savolsiz skill: ${skills.filter((s) => !qSlugs.has(s.slug)).map((s) => s.id).join(", ") || "yo'q"}`);
console.log(`Testsiz skill: ${skills.filter((s) => !tSlugs.has(s.slug)).length}`);
if (process.argv.includes("--warnings")) warnings.forEach((w) => console.log("OGOHLANTIRISH:", w));
else console.log(`Ogohlantirishlar: ${warnings.length} (ko'rish: --warnings)`);
errors.forEach((e) => console.log("XATO:", e));
console.log(errors.length ? `\n${errors.length} ta xato` : "\nXato topilmadi");
process.exit(errors.length ? 1 : 0);
