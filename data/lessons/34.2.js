/* Chuqur dars: 34.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.2", {
  "lesson": [
    "### Branch protection va rulesets",
    "GitHub'da muhim branch'larni himoyalashning ikki yo'li bor: klassik **branch protection rules** va yangi, kuchliroq **rulesets**. Ikkalasi ham Git darajasidagi qoidalarni platformada majburlaydi (33.20 ga qarang).",
    "",
    "### Asosiy qoidalar",
    "- **Require a pull request**: to'g'ridan-to'g'ri push taqiqlanadi.",
    "- **Required approvals**: tasdiqlar soni.",
    "- **Require review from Code Owners**.",
    "- **Dismiss stale approvals**: yangi push'dan keyin eski tasdiq bekor qilinadi. Tasdiqlangan kodni keyin o'zgartirib yashirib bo'lmaydi.",
    "- **Require status checks**: CI job'lari (testlar, Larastan, Pint) o'tishi shart.",
    "- **Require branches to be up to date**.",
    "- **Require conversation resolution**.",
    "- **Require signed commits**, **linear history**.",
    "- **Block force pushes** va **restrict deletions**.",
    "- **Merge queue**.",
    "",
    "### Rulesets afzalliklari",
    "- Bir qoida bir nechta branch/tag/repo uchun (naqsh bo'yicha).",
    "- **Tashkilot darajasida** barcha repolarga bir vaqtda qo'llash mumkin.",
    "- Bir nechta ruleset qatlamlanadi, eng qattiqi ustun.",
    "- **Enforcement rejimi**: avval `Evaluate` (faqat ogohlantirish, bloklamaydi), sinab ko'rgach `Active`.",
    "- Bypass ro'yxati aniq (kim va qanday chetlay oladi).",
    "",
    "### Bypass",
    "Adminlarning chetlab o'tish huquqini **minimal** qiling. Agar admin har doim bloklarni o'tkaza olsa, himoya zaif. Favqulodda holat uchun alohida, kuzatiladigan bypass yo'li bo'lsin.",
    "",
    "### Status check nomlari",
    "Required check nomi workflow job nomiga mos bo'lishi kerak. Job nomi o'zgarsa yoki matritsa bo'lsa, qoida \"kutilmoqda\" holatda abadiy qolib, merge'ni bloklashi mumkin. Check'lar nomini barqaror saqlang."
  ],
  "examples": [
    {
      "title": "main ruleset g'oyasi",
      "lang": "text",
      "code": [
        "Ruleset \"main protection\" (Active) -> target: default branch",
        "  [x] Require a pull request: 1 approval, Code Owners, dismiss stale approvals",
        "  [x] Require status checks: tests, larastan, pint",
        "  [x] Require branches up to date",
        "  [x] Block force pushes, restrict deletions",
        "  Bypass: faqat \"release-managers\" jamoasi (kerak bo'lganda)"
      ],
      "note": "Avval Evaluate rejimida sinab, keyin Active qiling."
    },
    {
      "title": "Qoidalarni gh api bilan ko'rish",
      "lang": "bash",
      "code": [
        "gh api repos/acme/billing/rulesets --jq '.[] | {id, name, enforcement}'",
        "gh api repos/acme/billing/branches/main/protection | jq '.required_status_checks.contexts'"
      ],
      "note": "Sozlamalarni kod orqali tekshirish auditni osonlashtiradi."
    }
  ],
  "pitfalls": [
    "Adminlarga keng bypass berish: himoya ishonchsiz bo'lib qoladi.",
    "Required check nomi workflow bilan mos kelmasligi: PR \"kutilmoqda\" holatda qotib, merge qilib bo'lmaydi.",
    "Eskirgan tasdiqlarni bekor qilmaslik: tasdiqdan keyin kod o'zgartirilib, ko'rib chiqilmagan holda merge bo'ladi.",
    "Yangi ruleset'ni darhol Active qilish: ishni kutilmaganda bloklashi mumkin, avval Evaluate rejimida sinang."
  ]
});
