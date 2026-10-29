/* Chuqur dars: 34.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.5", {
  "lesson": [
    "### Issue'lar",
    "Issue — vazifa, bug yoki g'oyani kuzatish birligi. Ular jamoaning \"nima qilish kerak\" ro'yxatini ko'rinadigan va muhokama qilinadigan qiladi.",
    "",
    "### Issue shablonlari",
    "`.github/ISSUE_TEMPLATE/` papkasida shablonlar turadi. Ikki format:",
    "- **Markdown shablon**: tayyor matn.",
    "- **YAML issue formasi**: tuzilgan maydonlar (matn, tanlov, checkbox) va **majburiy maydonlar** (`validations: required: true`). Foydalanuvchi muhim ma'lumotni to'ldirmasdan yubora olmaydi.",
    "",
    "Odatda: *Bug report*, *Feature request*, *Savol*. `config.yml` bilan shablonsiz issue ochishni o'chirish yoki tashqi havola (masalan, qo'llab-quvvatlash) qo'shish mumkin.",
    "",
    "### Tashkil qilish",
    "- **Label'lar**: tur (`bug`, `feature`), prioritet (`P0`–`P3`), modul/hudud.",
    "- **Assignee**: mas'ul.",
    "- **Milestone**: reliz yoki sprintga bog'lash.",
    "- **Sub-issue'lar** va **issue turlari**: katta vazifani bo'laklarga ajratish.",
    "- **PR bilan bog'lash**: PR tavsifida `Closes #N`.",
    "",
    "### Yaxshi bug report",
    "- Qisqa va aniq sarlavha.",
    "- **Qayta yaratish qadamlari**.",
    "- **Kutilgan** va **haqiqiy** natija.",
    "- **Muhit**: versiya, brauzer, OS.",
    "- Log, skrinshot, xato xabari.",
    "",
    "### Triage",
    "Yangi issue'lar muntazam ko'rib chiqilishi kerak: dublikatni yopish, label va prioritet berish, mas'ul tayinlash, ma'lumot yetishmasa so'rash. Triage'siz issue ro'yxati chiqindixonaga aylanadi.",
    "",
    "### Avtomatlashtirish",
    "Actions yoki Projects workflow'lari yangi issue'ga label qo'yishi, uzoq vaqt javobsiz issue'ni yopishi (stale bot) mumkin."
  ],
  "examples": [
    {
      "title": "Bug formasi",
      "lang": "yaml",
      "code": [
        "# .github/ISSUE_TEMPLATE/bug.yml",
        "name: Bug report",
        "description: Xato haqida xabar bering",
        "labels: [bug, triage]",
        "body:",
        "  - type: textarea",
        "    id: steps",
        "    attributes:",
        "      label: Qayta yaratish qadamlari",
        "      placeholder: \"1. ... 2. ... 3. ...\"",
        "    validations: { required: true }",
        "  - type: textarea",
        "    id: expected",
        "    attributes: { label: Kutilgan va haqiqiy natija }",
        "    validations: { required: true }",
        "  - type: input",
        "    id: version",
        "    attributes: { label: Ilova versiyasi }"
      ],
      "note": "Majburiy maydonlar to'liq bo'lmagan xabarni oldini oladi."
    },
    {
      "title": "Shablonlar sozlamasi",
      "lang": "yaml",
      "code": [
        "# .github/ISSUE_TEMPLATE/config.yml",
        "blank_issues_enabled: false",
        "contact_links:",
        "  - name: Savol-javob",
        "    url: https://github.com/acme/billing/discussions",
        "    about: Savollar uchun Discussions'dan foydalaning"
      ],
      "note": "Bo'sh issue ochish o'chirilib, savollar boshqa joyga yo'naltiriladi."
    }
  ],
  "pitfalls": [
    "Shablonsiz issue: qadamlar va muhit yo'q, bug'ni qayta yaratib bo'lmaydi.",
    "Triage qilmaslik: yuzlab javobsiz issue to'planib, haqiqiy muammolar ko'milib qoladi.",
    "Prioritet va label tizimini aniqlamaslik: har kim o'zicha ishlatadi.",
    "Issue'ni PR bilan bog'lamaslik: ish bajarilgan, lekin issue ochiq qolib ketadi."
  ]
});
