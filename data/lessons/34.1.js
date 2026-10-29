/* Chuqur dars: 34.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.1", {
  "lesson": [
    "### GitHub repozitoriy",
    "GitHub repozitoriy — oddiy Git repozitoriy ustiga platforma imkoniyatlari qo'shilgani: PR, issue, Actions, xavfsizlik vositalari, relizlar, hujjatlar. Loyiha tuzilmasi ham platformaga moslashadi.",
    "",
    "### Muhim fayllar",
    "- `README.md`: loyiha nima, qanday o'rnatiladi, qanday ishga tushiriladi. Birinchi ko'riladigan sahifa.",
    "- `LICENSE`: ochiq loyihada litsenziya majburiy ma'noda, yopiq loyihada ham muhim.",
    "- `.github/`: platformaga xos fayllar: `workflows/` (Actions), `CODEOWNERS`, `dependabot.yml`, `ISSUE_TEMPLATE/`, `pull_request_template.md`.",
    "- `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`: jamoa va hissa qo'shuvchilar uchun.",
    "",
    "### Sozlamalar",
    "- **Ko'rinish**: public, private yoki internal (tashkilot ichida).",
    "- **Default branch** (`main`).",
    "- **Merge usullari**: merge commit, squash, rebase. Ko'pincha faqat squash yoqiladi.",
    "- **Merge'dan keyin branch'ni avtomatik o'chirish**.",
    "- **Auto-merge** ruxsati.",
    "",
    "### Tashkilot darajasi",
    "Organization (tashkilot) jamoalar (teams), umumiy secret'lar va runner'lar, standart sozlamalar va **template repository** (yangi loyiha uchun tayyor tuzilma: CI, shablonlar, linter sozlamalari) beradi. Tashkilotda `.github` nomli maxsus repozitoriy barcha repolarga standart community health fayllarini (shablonlar, SECURITY.md) tarqatadi.",
    "",
    "### gh CLI",
    "`gh` komandasi GitHub bilan terminaldan ishlaydi: repo yaratish, PR ochish, issue, workflow ishga tushirish. Skriptlash va avtomatlashtirish uchun qulay.",
    "",
    "### Nima uchun standartlash",
    "Har loyiha o'z tartibida bo'lsa, jamoa a'zosi har yangi repoda adashadi. Template va tashkilot darajasidagi standartlar bir xil CI, xavfsizlik va jarayonni kafolatlaydi."
  ],
  "examples": [
    {
      "title": "gh bilan repo yaratish va sozlash",
      "lang": "bash",
      "code": [
        "gh repo create acme/billing --private --template acme/laravel-template --clone",
        "cd billing",
        "gh repo edit --delete-branch-on-merge --enable-squash-merge \\",
        "  --enable-merge-commit=false --enable-rebase-merge=false --enable-auto-merge"
      ],
      "note": "Faqat squash va avtomatik branch o'chirish yoqiladi."
    },
    {
      "title": "Repo tuzilmasi",
      "lang": "text",
      "code": [
        ".github/",
        "  workflows/ci.yml",
        "  CODEOWNERS",
        "  dependabot.yml",
        "  pull_request_template.md",
        "  ISSUE_TEMPLATE/bug.yml",
        "README.md",
        "LICENSE",
        "SECURITY.md"
      ],
      "note": "Platforma fayllari .github/ ichida turadi."
    }
  ],
  "pitfalls": [
    "README'siz repozitoriy: yangi odam loyihani qanday ishga tushirishni bilmaydi.",
    "Hamma merge usullarini yoqib qo'yish: tarix turli uslubda aralash bo'lib qoladi.",
    "Har repozitoriyni qo'lda sozlash: farqlar to'planadi. Template va tashkilot standartlaridan foydalaning.",
    "Private repoga maxfiy ma'lumotni commit qilish \"xavfsiz\" deb o'ylash: ko'rinish keyinchalik o'zgarishi yoki klon qilinishi mumkin."
  ]
});
