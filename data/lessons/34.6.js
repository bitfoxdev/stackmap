/* Chuqur dars: 34.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.6", {
  "lesson": [
    "### GitHub Projects",
    "GitHub Projects — issue va PR'lar ustida ishlaydigan moslashuvchan jadval, kanban va timeline vositasi. U kod bilan bir joyda, shuning uchun vazifalar va ish ko'rinishi sinxron bo'ladi.",
    "",
    "### Ko'rinishlar",
    "- **Table**: jadval, ustunlar bilan filtr, saralash, guruhlash.",
    "- **Board**: kanban (Backlog, Ready, In progress, Review, Done).",
    "- **Roadmap**: vaqt chizig'i (timeline).",
    "",
    "### Custom maydonlar",
    "Standart maydonlardan tashqari o'zingiz qo'shasiz: **Status**, **Priority** (P0–P3), **Iteration** (sprint, masalan 2 hafta), **Estimate** (baho), matn, son, sana, tanlov. Iteration maydoni Scrum sprintlarini yuritishga imkon beradi.",
    "",
    "### Avtomatlashtirish",
    "Built-in workflow'lar: PR merge bo'lganda issue \"Done\" holatiga o'tadi, yangi issue avtomatik loyihaga qo'shiladi va \"Backlog\" holatini oladi, yopilgan element arxivlanadi. Murakkabroq holatlar uchun Actions + GraphQL API.",
    "",
    "### Bir nechta repozitoriy",
    "Loyiha tashkilot darajasida bo'lib, bir nechta repozitoriydagi issue va PR'larni birlashtiradi. Bu mahsulot bo'yicha umumiy ko'rinish beradi.",
    "",
    "### Insights",
    "Insights bo'limida burndown, vaqt bo'yicha o'zgarish va maydonlar bo'yicha grafiklar quriladi.",
    "",
    "### Qachon yetarli",
    "Kichik va o'rta jamoalar uchun Projects Jira'ga yengil muqobil: sozlash oson, kod bilan chuqur integratsiya. Murakkab ish jarayonlari (maxsus workflow, hisobotlar, bir nechta portfel) uchun Jira kabi vositalar kerak bo'lishi mumkin.",
    "",
    "### Amaliy maslahat",
    "Maydonlarni va ustunlarni kam saqlang: ko'p maydon to'ldirilmay qoladi. Haftalik ko'rib chiqish (backlog grooming) loyihani dolzarb tutadi."
  ],
  "examples": [
    {
      "title": "Loyiha tuzilishi",
      "lang": "text",
      "code": [
        "Project \"Billing Q3\"",
        "Board:   Backlog -> Ready -> In progress -> Review -> Done",
        "Maydonlar: Priority (P0-P3), Iteration (2 hafta), Estimate (1,2,3,5,8)",
        "Avtomatlashtirish: PR merged -> Done, yangi issue -> Backlog"
      ],
      "note": "Maydonlar kam, lekin ishlatiladigan."
    },
    {
      "title": "gh bilan loyihaga qo'shish",
      "lang": "bash",
      "code": [
        "gh project list --owner acme",
        "gh project item-add 7 --owner acme --url https://github.com/acme/billing/issues/142",
        "gh project item-list 7 --owner acme --format json | jq '.items | length'"
      ],
      "note": "Loyiha raqami (7) ro'yxatdan olinadi."
    }
  ],
  "pitfalls": [
    "Haddan tashqari ko'p maydon va ustunlar: hech kim to'ldirmaydi, ma'lumot ishonchsiz bo'ladi.",
    "Avtomatlashtirishni yoqmaslik: holatlarni qo'lda yangilash unutiladi.",
    "Backlog'ni ko'rib chiqmaslik: eskirgan vazifalar to'planib ketadi.",
    "Murakkab hisobot talab qilinganda Projects'ga majburlash: ehtiyojga mos vositani tanlang."
  ]
});
