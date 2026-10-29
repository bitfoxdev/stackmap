/* Chuqur dars: 34.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.15", {
  "lesson": [
    "### Shablonlar",
    "Shablonlar jarayonni **standartlashtiradi** va muhim narsalarni unutmaslikka yordam beradi. GitHub bir necha turdagi shablonni qo'llab-quvvatlaydi.",
    "",
    "### Turlari",
    "- **PR shabloni**: `.github/pull_request_template.md`. Har yangi PR shu matn bilan ochiladi: nima, nega, qanday testlandi, checklist. Bir nechta shablon kerak bo'lsa, `.github/PULL_REQUEST_TEMPLATE/` papkasi.",
    "- **Issue shablonlari**: `.github/ISSUE_TEMPLATE/` (markdown yoki YAML formalari).",
    "- **Discussion shablonlari**.",
    "- **Repository template**: tayyor tuzilmali repo, \"Use this template\" bilan yangi loyiha yaratiladi (CI, linter, `.github/` sozlamalari).",
    "- **Workflow shablonlari**: tashkilot uchun tayyor CI.",
    "- Tashkilotdagi `.github` repozitoriy: barcha repolar uchun standart community health fayllari.",
    "",
    "### Checklist'lar",
    "PR checklist'i tez-tez unutiladigan qadamlarni eslatadi:",
    "- testlar qo'shildi yoki yangilandi;",
    "- migratsiya **orqaga mos** (expand/contract), deploy paytida eski kod bilan ishlaydi;",
    "- `.env.example` va hujjat yangilandi;",
    "- buzuvchi o'zgarish bo'lsa, belgilandi;",
    "- xavfsizlik: yangi endpoint ruxsat tekshiruviga ega.",
    "",
    "### Yaxshi shablon",
    "- **Qisqa**: uzun shablon to'ldirilmaydi yoki o'chirib tashlanadi.",
    "- **Ahamiyatli**: haqiqiy xatolar va tajribaga asoslangan savollar.",
    "- **Muntazam yangilanadigan**: jamoa o'rganganlarini qo'shadi, ishlatilmaganlarini olib tashlaydi.",
    "",
    "### Ortiqcha rasmiyatchilik",
    "Majburiy ravishda to'ldirilmaydigan bo'sh checklist foydasiz. Muhimlarini qoldirib, qolganini avtomatik tekshiruvlarga (CI) topshiring: bu odamlar xotirasidan ishonchli."
  ],
  "examples": [
    {
      "title": "PR shabloni",
      "lang": "markdown",
      "code": [
        "## Nima",
        "<!-- qisqa mazmun -->",
        "",
        "## Nega",
        "<!-- tiket havolasi, biznes yoki texnik sabab -->",
        "",
        "## Qanday testlandi",
        "<!-- avtomatik va qo'lda -->",
        "",
        "## Checklist",
        "- [ ] Testlar qo'shildi/yangilandi",
        "- [ ] Migratsiya orqaga mos (expand/contract)",
        "- [ ] .env.example va hujjat yangilandi",
        "- [ ] Yangi endpoint ruxsat tekshiruviga ega"
      ],
      "note": "Har PR shu matn bilan ochiladi."
    },
    {
      "title": "Template repository ishlatish",
      "lang": "bash",
      "code": [
        "gh repo create acme/payments --private --template acme/laravel-template --clone",
        "# yangi repo CI, shablonlar va .github/ sozlamalari bilan tayyor"
      ],
      "note": "Har loyiha bir xil boshlang'ich tuzilmadan boshlanadi."
    }
  ],
  "pitfalls": [
    "Juda uzun shablon: to'ldirilmaydi yoki o'chiriladi.",
    "Eskirgan checklist: ishlatilmaydigan bandlar odamlarni mexanik belgilashga o'rgatadi.",
    "Avtomatlashtirish mumkin bo'lgan narsani checklist'ga qo'yish: CI odamdan ishonchli.",
    "Template repository'ni yangilamaslik: yangi loyihalar eskirgan konfiguratsiya bilan boshlanadi."
  ]
});
