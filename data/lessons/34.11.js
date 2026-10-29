/* Chuqur dars: 34.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.11", {
  "lesson": [
    "### GitHub'da tag'lar",
    "GitHub'dagi tag'lar oddiy Git tag'lari (33.14) bilan bir xil. Platforma ularga qo'shimcha imkoniyatlar qo'shadi: himoya, avtomatik workflow'lar, relizlar bilan bog'lash.",
    "",
    "### Tag himoyasi",
    "Muhim tag'larni (`v*`) kim yaratishi, o'zgartirishi yoki o'chirishi mumkinligini cheklash kerak, chunki reliz tag'lariga deploy va paket iste'molchilari tayanadi. Hozirgi yondashuv — **rulesets** (target: tag, naqsh `v*`). Eski \"tag protection rules\" ruleset'lar bilan almashtirilgan.",
    "- Tag yaratishni faqat maintainer'lar yoki reliz jamoasiga ruxsat berish.",
    "- Mavjud tag'ni o'zgartirish va o'chirishni taqiqlash (immutability).",
    "",
    "### Tag push'ida workflow",
    "`on: push: tags: ['v*.*.*']` bilan tag yuborilganda reliz konveyeri ishga tushadi: build, testlar, GitHub Release yaratish, deploy. Reliz jarayoni \"tag qo'yish\" ga aylanadi.",
    "",
    "### Relizlar bilan bog'lash",
    "Tag relizlar bilan bog'liq: Release har doim tag'ga ishora qiladi. Tag'siz Release yaratilsa, GitHub tag'ni o'zi yaratadi.",
    "",
    "### Immutability nega muhim",
    "Tag'ni boshqa commit'ga ko'chirish xavfli: bir kishi eski tag'dan yuklab olgan, CI keshlagan, paket menejeri kontrol summasini saqlagan. Tag o'zgarsa, ular \"bir xil versiya, turli kod\" holatiga tushadi (supply chain xavfi). Xato bo'lsa yangi versiya chiqaring.",
    "",
    "### Nomlash",
    "SemVer: `v2.4.0`. Pre-release: `v2.5.0-rc.1`. Qat'iy naqsh (`v*.*.*`) tasodifiy tag'lardan workflow'ni himoya qiladi.",
    "",
    "### Tag va branch farqi",
    "Workflow'da tag va branch nomi to'qnashishi mumkin (bir xil nom). Reliz tag'lari uchun `v` prefiksini ishlating va branch'larda ishlatmang."
  ],
  "examples": [
    {
      "title": "Tag push'ida reliz workflow'i",
      "lang": "yaml",
      "code": [
        "on:",
        "  push:",
        "    tags: ['v*.*.*']",
        "",
        "jobs:",
        "  release:",
        "    runs-on: ubuntu-latest",
        "    permissions:",
        "      contents: write",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - run: gh release create \"${{ github.ref_name }}\" --generate-notes",
        "        env:",
        "          GH_TOKEN: ${{ github.token }}"
      ],
      "note": "Tag yuborilishi bilan reliz sahifasi yaratiladi."
    },
    {
      "title": "Tag ruleset g'oyasi",
      "lang": "text",
      "code": [
        "Ruleset \"release tags\" -> target: tags, pattern: v*",
        "  [x] Restrict creations     (faqat release-managers)",
        "  [x] Restrict updates       (tag'ni ko'chirib bo'lmaydi)",
        "  [x] Restrict deletions"
      ],
      "note": "Reliz tag'lari yaratilgandan keyin o'zgarmas bo'ladi."
    }
  ],
  "pitfalls": [
    "Tag yaratishni hammaga ruxsat berish: tasodifiy tag reliz workflow'ini ishga tushirishi mumkin.",
    "Push qilingan tag'ni o'chirib qayta yaratish: iste'molchilar va keshlar kutilmagan kodni oladi.",
    "Naqshsiz `on: push: tags` : har qanday tag'da reliz boshlanadi.",
    "Tag va branch uchun bir xil nomlardan foydalanish: Git va workflow noaniq nomni noto'g'ri tushunadi."
  ]
});
