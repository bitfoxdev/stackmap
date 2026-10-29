/* Chuqur dars: 34.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.18", {
  "lesson": [
    "### Reliz avtomatlashtirish",
    "Qo'lda reliz (versiyani yozish, changelog tuzish, tag qo'yish, deploy qilish) xato va farqlarga moyil. Avtomatlashtirish relizlarni **bir xil, tez va insonsiz** qiladi.",
    "",
    "### Conventional Commits asosida",
    "Agar commit'lar Conventional Commits formatida bo'lsa (33.3), vositalar o'zi aniqlaydi:",
    "- `fix:` -> PATCH versiya.",
    "- `feat:` -> MINOR versiya.",
    "- `feat!:` yoki `BREAKING CHANGE:` -> MAJOR versiya.",
    "- Changelog commit'lardan avtomatik tuziladi.",
    "",
    "### Vositalar",
    "- **release-please** (Google): `main` dagi commit'larni kuzatib, \"Release PR\" ochadi.",
    "- **semantic-release**: commit'lar asosida to'liq avtomatik reliz.",
    "",
    "### release-please oqimi",
    "1. Commit'lar `main` ga tushadi.",
    "2. Bot **Release PR** ochadi: yangilangan versiya va CHANGELOG bilan.",
    "3. Jamoa PR'ni ko'rib chiqadi va **merge qiladi**.",
    "4. Merge'dan keyin bot **tag va GitHub Release** yaratadi.",
    "5. Tag/Release workflow'ni ishga tushiradi: deploy yoki paket nashri.",
    "",
    "Bu oqimda reliz vaqtini odamlar tanlaydi (PR'ni merge qilib), qolgani avtomatik.",
    "",
    "### Afzalliklari",
    "- **Insoniy xato kamayadi**: versiya noto'g'ri yoki changelog unutilmaydi.",
    "- **Izchillik**: har reliz bir xil jarayondan o'tadi.",
    "- **Tezlik**: relizga bir bosish.",
    "- **Kuzatuvchanlik**: relizlar tarixi PR'lar bilan bog'liq.",
    "",
    "### Shartlari",
    "Jamoa commit formatiga rioya qilishi kerak (commitlint bilan majburlang). PR'larni squash qilsangiz, **PR sarlavhasi** commit xabari bo'ladi: uni ham format bo'yicha tekshiring.",
    "",
    "### PHP/Composer uchun",
    "Paket uchun tag yetarli (Packagist avtomatik oladi). Ilova uchun release-please `release-type: php` yoki `simple` turi bilan versiyani faylda yangilaydi."
  ],
  "examples": [
    {
      "title": "release-please workflow",
      "lang": "yaml",
      "code": [
        "name: release-please",
        "on:",
        "  push:",
        "    branches: [main]",
        "permissions:",
        "  contents: write",
        "  pull-requests: write",
        "jobs:",
        "  release:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: googleapis/release-please-action@v4",
        "        with:",
        "          release-type: php"
      ],
      "note": "Bot Release PR ochadi, merge'dan keyin tag va reliz yaratadi."
    },
    {
      "title": "Commit'dan versiyagacha",
      "lang": "text",
      "code": [
        "fix(billing): prevent double invoice        -> 2.4.1 (PATCH)",
        "feat(refund): add refund endpoint            -> 2.5.0 (MINOR)",
        "feat(api)!: remove v1 orders endpoint        -> 3.0.0 (MAJOR, buzuvchi)"
      ],
      "note": "Versiya commit turidan aniqlanadi."
    }
  ],
  "pitfalls": [
    "Commit formatiga rioya qilmaslik: vosita to'g'ri versiya va changelog tuza olmaydi. Commitlint bilan majburlang.",
    "Squash merge'da PR sarlavhasini formatlamaslik: u commit xabari bo'lib, release vositasi uni tushunmaydi.",
    "Release PR'ni ko'rmasdan merge qilish: noto'g'ri versiya yoki changelog chiqadi.",
    "Reliz workflow'iga keng ruxsat berish: `contents: write` va secret'lar xavfsiz boshqarilsin."
  ]
});
