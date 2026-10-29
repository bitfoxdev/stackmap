/* Chuqur dars: 34.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.16", {
  "lesson": [
    "### Ruxsat darajalari",
    "GitHub repozitoriyda besh asosiy rol bor:",
    "- **Read**: ko'rish va klon qilish.",
    "- **Triage**: issue va PR'larni boshqarish (label, assignee), kodga yozmaydi.",
    "- **Write**: push, branch ochish, PR merge (himoya qoidalari doirasida).",
    "- **Maintain**: repo sozlamalarining ko'pini boshqarish, lekin xavfli amallarsiz.",
    "- **Admin**: to'liq nazorat, jumladan o'chirish va himoyani o'zgartirish.",
    "",
    "### Tashkilotda boshqarish",
    "- Ruxsatni **jamoalar (teams)** orqali bering, shaxslarga emas. Odam jamoaga qo'shiladi yoki chiqadi, ruxsatlar o'zi o'zgaradi.",
    "- **Base permissions**: tashkilot a'zolarining barcha repolarga standart ruxsati (ko'pincha \"No permission\" yoki \"Read\").",
    "- **Outside collaborator**: tashkilot a'zosi bo'lmagan, alohida repoga qo'shilgan tashqi odam. Ularni ehtiyotkorlik bilan boshqaring.",
    "",
    "### GITHUB_TOKEN ruxsatlari",
    "Har workflow'ga avtomatik `GITHUB_TOKEN` beriladi. Uning ruxsati `permissions:` bloki bilan **minimal** qilinadi. Yangi repolarda standart faqat o'qish. Faqat kerakli job'ga kerakli ruxsatni bering (masalan, `pull-requests: write` izoh yozish uchun).",
    "",
    "### Eng kam huquq tamoyili",
    "- Ko'pchilik dasturchilar: **Write** (himoyalangan branch bilan, `main` ga to'g'ridan-to'g'ri yozolmaydi).",
    "- **Admin**: kam sonli, aniq mas'ul.",
    "- Maxsus ruxsat uchun **custom role** (Enterprise).",
    "",
    "### Audit",
    "Muntazam ko'rib chiqing:",
    "- ketgan xodimlar va kontraktorlar;",
    "- ishlatilmayotgan **deploy key**'lar (ayniqsa yozish ruxsatlilari);",
    "- **GitHub App** va **OAuth** ilovalarining ruxsatlari;",
    "- Personal access token'lar va ularning amal qilish muddati (fine-grained token afzal);",
    "- 2FA majburiyligi.",
    "",
    "Audit log kim, nima, qachon o'zgartirganini ko'rsatadi."
  ],
  "examples": [
    {
      "title": "Minimal GITHUB_TOKEN ruxsatlari",
      "lang": "yaml",
      "code": [
        "permissions:",
        "  contents: read            # umumiy: faqat o'qish",
        "",
        "jobs:",
        "  comment:",
        "    permissions:",
        "      pull-requests: write  # faqat shu job'ga izoh yozish uchun",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - run: gh pr comment ${{ github.event.number }} --body \"CI tugadi\"",
        "        env: { GH_TOKEN: ${{ github.token }} }"
      ],
      "note": "Ruxsat faqat kerak joyda kengaytiriladi."
    },
    {
      "title": "Audit",
      "lang": "bash",
      "code": [
        "gh api orgs/acme/members --jq '.[].login'                      # a'zolar",
        "gh api repos/acme/billing/collaborators --jq '.[] | {login, role_name}'",
        "gh api repos/acme/billing/keys --jq '.[] | {title, read_only}'   # deploy key'lar"
      ],
      "note": "Yozish ruxsatli deploy key'lar xavfliroq."
    }
  ],
  "pitfalls": [
    "Ruxsatni shaxslarga bevosita berish: odam ketganda yoki rol o'zgarganda tozalash esdan chiqadi. Jamoalar ishlating.",
    "GITHUB_TOKEN'ga keng ruxsat berish: kompromis bo'lgan action ko'p narsani o'zgartirishi mumkin.",
    "Hammaga Admin berish: himoya va sozlamalar tasodifan o'zgaradi.",
    "Eskirgan deploy key va OAuth ilovalarni tozalamaslik: unutilgan kirish yo'llari xavfsizlik teshigi bo'ladi."
  ]
});
