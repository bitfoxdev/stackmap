/* Chuqur dars: 34.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.14", {
  "lesson": [
    "### CODEOWNERS",
    "`CODEOWNERS` fayli yo'l naqshlari bo'yicha **mas'ul shaxslar yoki jamoalarni** belgilaydi. PR shu fayllarga tegsa, egalar avtomatik reviewer sifatida so'raladi.",
    "",
    "### Joylashuvi va sintaksisi",
    "Fayl `.github/CODEOWNERS`, repo ildizida yoki `docs/` ichida turadi. Qator: `naqsh @egasi1 @org/jamoa`. Naqshlar `.gitignore` ga o'xshash (`*`, `/yo'l/`, `*.sql`).",
    "",
    "### Muhim qoida: oxirgi mos qator ustun",
    "Bir fayl bir nechta naqshga mos kelsa, **eng oxirgi** mos qator qo'llanadi. Shuning uchun umumiy qoida (`*`) tepada, aniqlari pastda yoziladi.",
    "",
    "### Branch protection bilan",
    "Qoidada **Require review from Code Owners** yoqilsa, egalar tasdig'i merge uchun **majburiy** bo'ladi. Usiz CODEOWNERS faqat avtomatik so'rov va tavsiya.",
    "",
    "### Qayerda foydali",
    "- **To'lov va moliya mantiqi**.",
    "- **Xavfsizlik** (autentifikatsiya, ruxsatlar).",
    "- **DB migratsiyalari** (DBA ko'radi).",
    "- **CI/CD konfiguratsiyasi** (`.github/workflows/`).",
    "- **Infratuzilma** (Docker, Terraform).",
    "",
    "### Xavflar",
    "- **Juda keng egalik**: har PR bir necha kishiga tushsa, review sekinlashadi va hamma boshqa odamga tashlaydi (\"bystander effect\").",
    "- **Yagona ega**: ta'til yoki ketish ishni to'xtatadi. Jamoa (team) ishlating, shaxs emas.",
    "- **Eskirish**: ketgan odamlar va mavjud bo'lmagan jamoalar. CODEOWNERS ni muntazam yangilang.",
    "- Ega repozitoriyga **write** ruxsatiga ega bo'lishi kerak, aks holda qoida ishlamaydi.",
    "",
    "### Tekshirish",
    "GitHub faylda sintaksis xatolarini ko'rsatadi. Fayl noto'g'ri bo'lsa, qoida jim ishlamasligi mumkin, shuning uchun tuzilma o'zgarganda tekshiring."
  ],
  "examples": [
    {
      "title": "CODEOWNERS",
      "lang": "text",
      "code": [
        "# .github/CODEOWNERS",
        "# Umumiy qoida tepada, aniqlar pastda (oxirgi mos qator ustun)",
        "*                         @acme/backend",
        "/app/Domain/Billing/      @acme/billing-team",
        "/database/migrations/     @acme/dba @acme/backend-leads",
        "/.github/workflows/       @acme/devops",
        "/app/Http/Middleware/Auth* @acme/security"
      ],
      "note": "Har yo'l uchun mas'ul jamoa, shaxs emas."
    },
    {
      "title": "Branch protection bilan",
      "lang": "text",
      "code": [
        "Ruleset: [x] Require a pull request",
        "         [x] Require review from Code Owners",
        "-> /database/migrations/ ga tegadigan PR'ni @acme/dba tasdiqlamaguncha merge qilib bo'lmaydi"
      ],
      "note": "Majburiy tasdiq uchun Code Owners qoidasi yoqilgan bo'lishi kerak."
    }
  ],
  "pitfalls": [
    "Eng aniq qoidani tepaga qo'yish: pastdagi umumiy `*` uni bosib ketadi (oxirgi mos qator ustun).",
    "Yakka shaxsni ega qilish: ta'til yoki ketishda review to'xtaydi. Jamoadan foydalaning.",
    "Hamma narsaga egalik berish: PR'lar kutish navbatiga tushadi.",
    "CODEOWNERS'ni yangilamaslik: mavjud bo'lmagan egalar review'ni jim bloklaydi."
  ]
});
