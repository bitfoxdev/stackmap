/* Chuqur dars: 35.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.1", {
  "lesson": [
    "### GitLab Projects va Groups tushunchasi",
    "GitLab platformasida har bir dasturiy ta'minot birligi **project** sifatida boshqariladi. Oddiy Git hostingdan farqli ravishda, GitLab loyihasi repozitoriy, issue tracker, merge requestlar, CI/CD pipeline dvigateli, konteyner hamda paketlar registry'si va wiki hujjatlar tizimini bitta mustahkam blokda birlashtiradi.",
    "",
    "Lekin real korporativ tizimlarda o'nlab, hatto yuzlab loyihalar bo'ladi. Ularni samarali boshqarish, xavfsizlik huquqlarini taqsimlash va resurslarni bo'lishish uchun **Groups** va **Subgroups** arxitekturasi qo'llaniladi. Guruhlar loyihalarni tashkilot, bo'lim yoki mahsulot bo'yicha mantiqiy ierarxiyaga tizish imkonini beradi.",
    "",
    "### Sozlamalar va xavfsizlik merosi",
    "GitLab guruhlarining eng kuchli ustunligi — konfiguratsiya va a'zolikning ierarxik meros o'tishidir (inheritance). Guruh sathida kiritilgan quyidagi parametrlar barcha quyi loyihalarga avtomatik tatbiq etiladi:",
    "- **A'zolik va ruxsatlar**: Agar xodim backend guruhiga Developer etib tayinlansa, u guruhdagi 50 ta loyihaning barchasida bir zumda Developer huquqini oladi.",
    "- **CI/CD o'zgaruvchilari**: Guruh darajasida saqlangan umumiy API kalitlar, Sentry DSN yoki Dockerhub ma'lumotlari quyi repozitoriylarda qayta-qayta yozilmaydi.",
    "- **Group Runnerlar**: Butun tashkilot yoki bo'lim uchun ajratilgan quvvatli build serverlari barcha loyihalarga xizmat ko'rsatadi.",
    "- **Push va Merge qoidalari**: Majburiy commit formatlari yoki litsenziya talablari yuqori guruhdan nazorat qilinadi.",
    "",
    "### To'g'ri ierarxiya tuzilishi",
    "Katta kompaniyalarda tavsiya etiladigan tuzilma odatda quyidagicha bo'ladi: `company/product/backend/service-name`, `company/shared/docker-images` yoki `company/infra/terraform`. Quyi guruhlar sonini chuqurlashtirib yubormasdan (3-4 daraja ideal), har bir jamoaning mas'uliyat maydonini aniq chegaralash lozim.",
    "",
    "### glab CLI orqali tezkor boshqaruv",
    "GitLab rasmiy CLI vositasi (`glab`) orqali dasturchi brauzerni ochmasdan turib guruh ichida yangi loyihalar ochishi, klon qilishi va sozlamalarni buyruqlar satridan boshqara oladi."
  ],
  "examples": [
    {
      "title": "Guruh va subgroup loyihalari tuzilmasi",
      "lang": "text",
      "code": [
        "acme-corp/                  # Bosh tashkilot guruhi (global a'zolar, runnerlar)",
        "├── shared/                 # Umumiy kutubxonalar va CI shablonlari",
        "│   ├── ci-templates        # Standart .gitlab-ci.yml shablonlari",
        "│   └── laravel-core-pkg    # Ichki Composer paketi",
        "└── fintech/                # Mahsulot bo'yicha subgroup",
        "    ├── billing-api         # Laravel Billing mikroxizmati",
        "    └── auth-service        # Autentifikatsiya servisi"
      ],
      "note": "Sozlamalar va a'zolik tepadan pastga qarab avtomatik meros o'tadi."
    },
    {
      "title": "glab orqali loyiha yaratish va klonlash",
      "lang": "bash",
      "code": [
        "# Guruh ichida yangi private Laravel loyihasini yaratish",
        "glab repo create acme-corp/fintech/payments-service --private --defaultBranch main",
        "",
        "# Loyihani to'g'ridan-to'g'ri klon qilish",
        "glab repo clone acme-corp/fintech/payments-service"
      ],
      "note": "Terminal orqali tezkor boshqaruv CI/CD skriptlarida ham juda qo'l keladi."
    }
  ],
  "pitfalls": [
    "Barcha loyihalarni bitta umumiy guruh ostiga yig'ish: vaqt o'tishi bilan loyihalar chalkashib ketadi va alohida huquqlar berish qiyinlashadi.",
    "Guruh darajasidagi maxfiy CI o'zgaruvchilarini Protected qilmasdan qoldirish: har qanday oddiy branchdagi pipeline ularni o'qiy oladi.",
    "Subgroup ierarxiyasini 6-7 darajagacha chuqurlashtirish: URL manzillar haddan tashqari uzun bo'lib ketadi va boshqaruv qiyinlashadi."
  ]
});
