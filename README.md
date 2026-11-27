# Stack Map

Senior PHP / Laravel dasturchi uchun shaxsiy bilim xaritasi va intervyu trenajyori. Til: o'zbek (lotin), texnik atamalar inglizcha.

## Nimalar bor

- **Bilim xaritasi:** 16 guruh, 85 skill, 1597 subskill (Category → Skill → Subskill). Har birida tavsif, ustuvorlik, daraja, amaliy topshiriq, qabul mezonlari va prerequisite'lar. Progress subskill bo'yicha belgilanadi.
- **Chuqur darslar:** subskill sahifasida `lesson`, `examples`, `pitfalls` (`data/lessons/`).
- **Intervyu mashqi:** savol-javoblar bazasi, A–D testlar, mock simulyator, bookmark va takrorlash (SRS).

## Ishga tushirish

Server ham, build ham kerak emas: `index.html` ni brauzerda oching.

Progress brauzerda (localStorage) saqlanadi; JSON fayl orqali eksport va import qilish mumkin. Hisoblar mahalliy IndexedDB'da saqlanadi (backend yo'q).

## Tuzilma

| Yo'l | Vazifasi |
|---|---|
| `index.html`, `assets/` | Ilova (vanilla HTML/CSS/JS) |
| `data/manifest.js` | Guruhlar va fayllar ro'yxati |
| `data/skills/NN-slug.js` | Skill mazmuni (`registerSkill`) |
| `data/lessons/<subId>.js` | Chuqur darslar (`registerLesson`) |
| `data/interview-questions.js`, `data/interview-tests.js` | Intervyu ma'lumotlari |
| `tools/validate.js` | Ma'lumotlarni tekshirish skripti |
| `tz.txt` | Taksonomiya manbai |
| `FLASH.md` | Kontent yozish qoidalari (LLM uchun) |
| `PRODUCT.md`, `DESIGN-SYSTEM.md`, `BLUEPRINT-PROMPT.md` | Mahsulot va dizayn hujjatlari |

## Ma'lumotlarni tekshirish

```bash
node tools/validate.js
```

Skript barcha fayllarni yuklab sintaksisni, `id` takrorini, buzilgan prerequisite va bog'lanishlarni tekshiradi va dars/savol qamrovi hisobotini chiqaradi.
