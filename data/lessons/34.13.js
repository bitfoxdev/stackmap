/* Chuqur dars: 34.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.13", {
  "lesson": [
    "### GitHub xavfsizlik vositalari",
    "GitHub bir nechta qatlamli xavfsizlik vositalarini beradi. Ular kod, bog'liqliklar va maxfiy ma'lumotlarni himoya qiladi.",
    "",
    "### Asosiy vositalar",
    "- **Dependabot alerts**: zaif dependency'lar haqida ogohlantirish (34.12).",
    "- **Code scanning**: CodeQL (yoki boshqa SARIF vositalari) kodni zaifliklar uchun statik tahlil qiladi, natijalarni PR'da ko'rsatadi. CodeQL PHP'ni qo'llab-quvvatlamaydi (JS/TS, Python, Java, C# va boshqalarni qo'llab-quvvatlaydi), PHP uchun Larastan, Psalm taint analysis yoki Semgrep SARIF natijasi bilan ulanadi.",
    "- **Secret scanning**: repozitoriyga tushgan kalit va tokenlarni topadi.",
    "- **Push protection**: kalit bor commit'ni **push paytida bloklaydi**.",
    "- **Repository security advisories**: o'z loyihangizdagi zaiflikni **yashirin** muhokama qilish.",
    "- **Private vulnerability reporting**: tashqi tadqiqotchi zaiflikni sizga yopiq kanal orqali yuboradi.",
    "",
    "### Security advisory jarayoni",
    "1. Zaiflik haqida xabar keladi (yashirin).",
    "2. Advisory yaratiladi va **private fork**'da tuzatish tayyorlanadi (ommaga ko'rinmaydi).",
    "3. CVE so'raladi (GitHub CNA sifatida beradi).",
    "4. Tuzatilgan versiya chiqariladi va advisory e'lon qilinadi, foydalanuvchilarga Dependabot alert ketadi.",
    "",
    "### SECURITY.md",
    "Fayl zaiflik haqida **qanday xabar berish**ni ko'rsatadi: aloqa, javob muddati, qo'llab-quvvatlanadigan versiyalar. Ommaviy issue ochmaslikni so'rang.",
    "",
    "### Triage",
    "Alert'larni jimgina yopmang va hammasiga bir xil ahamiyat bermang. Savol: bu zaiflik **bizga haqiqatan ta'sir qiladimi** (zaif funksiya ishlatiladimi)? SLA belgilang: kritik zaiflik kunlar ichida, past ahamiyatlilar rejali. Yopilganini tasdiqlang.",
    "",
    "### Kod xavfsizligi bilan birga",
    "Vositalar kod ko'rib chiqish va xavfsiz dasturlash amaliyotini almashtirmaydi, faqat to'ldiradi."
  ],
  "examples": [
    {
      "title": "SECURITY.md",
      "lang": "markdown",
      "code": [
        "# Xavfsizlik siyosati",
        "",
        "## Zaiflik haqida xabar berish",
        "Zaiflik topsangiz, ommaviy issue ochmang. Quyidagiga yozing:",
        "security@example.uz (PGP kalit: ...)",
        "",
        "72 soat ichida javob beramiz va tuzatish muddatini kelishamiz.",
        "",
        "## Qo'llab-quvvatlanadigan versiyalar",
        "| Versiya | Qo'llab-quvvatlanadi |",
        "|---|---|",
        "| 2.x | ha |",
        "| 1.x | faqat xavfsizlik tuzatishlari |"
      ],
      "note": "Private vulnerability reporting yoqilgan bo'lsa, tadqiqotchi to'g'ridan-to'g'ri GitHub orqali yuboradi."
    },
    {
      "title": "CodeQL workflow",
      "lang": "yaml",
      "code": [
        "name: codeql",
        "on:",
        "  pull_request:",
        "  schedule: [{ cron: '0 3 * * 1' }]",
        "permissions:",
        "  security-events: write",
        "  contents: read",
        "jobs:",
        "  analyze:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: github/codeql-action/init@v3",
        "        with: { languages: javascript-typescript }",
        "      - uses: github/codeql-action/analyze@v3"
      ],
      "note": "CodeQL PHP'ni qo'llab-quvvatlamaydi: bu misol loyihadagi JS/TS (frontend) kodi uchun. PHP uchun Larastan, Psalm yoki Semgrep ishlating."
    }
  ],
  "pitfalls": [
    "Push protection'ni o'chirib qo'yish: kalit commit'ga kirib ketadi.",
    "Alert'larni triage qilmasdan yopish: haqiqiy ta'sir qiluvchi zaiflik e'tiborsiz qoladi.",
    "Zaiflikni ommaviy issue'da muhokama qilish: tuzatishdan oldin hujumchilarga ma'lum bo'ladi.",
    "Faqat vositalarga tayanish: ular xavfsiz dasturlash va review o'rnini bosmaydi."
  ]
});
