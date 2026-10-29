/* Chuqur dars: 34.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.17", {
  "lesson": [
    "### Repozitoriy xavfsizligi",
    "Repozitoriy va CI — hujum maqsadi: kodni o'zgartirish, secret'larni o'g'irlash yoki build'ga zararli kod kiritish (supply chain). Himoya ko'p qatlamli.",
    "",
    "### Asosiy choralar",
    "- **Branch va tag himoyasi**: majburiy PR, review, status check'lar (34.2, 34.11).",
    "- **2FA majburiy** (tashkilot darajasida).",
    "- **Imzolangan commit'lar**: muallif haqiqiyligi.",
    "- **Secret scanning va push protection** (34.8, 34.13).",
    "- **Dependabot** va **code scanning**.",
    "- **Deploy key'lar** faqat o'qish ruxsati bilan, har loyiha uchun alohida.",
    "- **Webhook secret'lari**: kelgan so'rovlarni imzo bilan tekshirish.",
    "",
    "### Actions xavfsizligi",
    "Workflow'lar kod bajaradi va secret'larga murojaat qiladi, shuning uchun alohida e'tibor kerak:",
    "- **Uchinchi tomon action'larni to'liq commit SHA bilan qotiring** (`uses: owner/action@<40 belgili SHA>`). Tag (`@v4`) o'zgartirilishi mumkin, SHA o'zgarmaydi. Dependabot SHA'larni ham yangilaydi.",
    "- `pull_request_target` dan ehtiyot bo'ling: u asosiy repo kontekstida va secret'lar bilan ishlaydi. Fork'dan kelgan kodni shu kontekstda ishga tushirish (checkout qilib bajarish) xavfli.",
    "- Minimal `permissions` (`GITHUB_TOKEN` uchun).",
    "- **Skript inyeksiyasi**: PR sarlavhasi, branch nomi kabi kontrol qilinmaydigan qiymatlarni to'g'ridan-to'g'ri `run:` ichiga qo'ymang. Ularni `env:` orqali bering.",
    "- Self-hosted runner'larni ochiq repolarda ishlatmang.",
    "",
    "### Supply chain bahosi",
    "**OpenSSF Scorecard** repozitoriyni xavfsizlik amaliyotlari bo'yicha avtomatik baholaydi (himoya, SHA bilan qotirish, Dependabot, imzolangan reliz).",
    "",
    "### Qoida",
    "Xavfsizlikni bir marta emas, doimiy sozlang: yangi action yoki ruxsat qo'shilganda uni xavf nuqtai nazaridan ko'rib chiqing."
  ],
  "examples": [
    {
      "title": "Action'ni SHA bilan qotirish",
      "lang": "yaml",
      "code": [
        "- uses: actions/checkout@<40 belgili commit SHA>        # v4",
        "- uses: shivammathur/setup-php@<40 belgili commit SHA>  # v2"
      ],
      "note": "SHA o'zgarmaydi, tag esa ko'chirilishi mumkin. Dependabot SHA'larni ham yangilaydi."
    },
    {
      "title": "Skript inyeksiyasidan saqlanish",
      "lang": "yaml",
      "code": [
        "# XAVFLI: PR sarlavhasi to'g'ridan-to'g'ri shell'ga tushadi",
        "- run: echo \"${{ github.event.pull_request.title }}\"",
        "",
        "# XAVFSIZ: env orqali, shell uni oddiy qiymat sifatida ko'radi",
        "- run: echo \"$TITLE\"",
        "  env:",
        "    TITLE: ${{ github.event.pull_request.title }}"
      ],
      "note": "Sarlavhada `\"; curl ... #` kabi kod bo'lsa, birinchi variant uni bajaradi."
    }
  ],
  "pitfalls": [
    "Uchinchi tomon action'ni `@main` yoki tag bilan ishlatish: muallifning hisobi buzilsa, zararli kod sizning secret'laringiz bilan ishlaydi.",
    "`pull_request_target` da fork kodini checkout qilib ishga tushirish: begona kod secret'larga ega bo'ladi.",
    "PR sarlavhasi yoki branch nomini `run:` ichiga to'g'ridan-to'g'ri qo'yish: skript inyeksiyasi.",
    "Deploy key'ga yozish ruxsati berish: u o'g'irlansa, kod o'zgartiriladi."
  ]
});
