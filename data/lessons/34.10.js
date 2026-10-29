/* Chuqur dars: 34.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.10", {
  "lesson": [
    "### GitHub Release",
    "GitHub Release — Git tag ustiga qo'yilgan **reliz sahifasi**: reliz yozuvi (release notes), biriktirilgan fayllar (arxiv, binar) va \"Latest\" belgisi. U foydalanuvchilarga \"nima o'zgardi\" haqida xabar berishning markazi.",
    "",
    "### Tarkibi",
    "- **Tag**: `v2.4.0` (mavjud yoki relizda yaratiladi).",
    "- **Sarlavha va yozuv**: nima yangi, nima tuzatildi, buzuvchi o'zgarishlar.",
    "- **Asset'lar**: build natijalari, arxivlar.",
    "- **Pre-release belgisi**: barqaror emas (beta, rc).",
    "- **Latest**: eng so'nggi barqaror reliz.",
    "",
    "### Avtomatik reliz yozuvi",
    "GitHub PR'lar ro'yxatidan reliz yozuvini **avtomatik generatsiya** qiladi (`--generate-notes`). `.github/release.yml` fayli PR'larni label bo'yicha toifalarga (Yangi imkoniyatlar, Tuzatishlar, Hujjatlar) ajratadi, ba'zi label'larni (`ignore-for-release`) chiqarib tashlaydi. Shuning uchun PR label'larini to'g'ri qo'yish muhim.",
    "",
    "### Composer va relizlar",
    "PHP paketlari uchun Composer versiyalarni aynan **Git tag'lardan** oladi (Packagist orqali). Shuning uchun SemVer tag chiqarish paketni chiqarish bilan teng. Reliz yozuvi esa foydalanuvchiga yangilashdan oldin o'qiydigan hujjat.",
    "",
    "### Buzuvchi o'zgarishlar",
    "Reliz yozuvida buzuvchi o'zgarishlar (breaking changes) alohida va ko'zga tashlanadigan bo'lsin, yangilash yo'riqnomasi bilan.",
    "",
    "### Avtomatlashtirish",
    "Tag push'ida workflow reliz yaratadi, asset'larni biriktiradi va deploy qiladi (34.18). Shunda reliz takrorlanuvchan va insonsiz.",
    "",
    "### Xabarnoma",
    "Repo kuzatuvchilari relizlar haqida xabar oladi (Watch -> Releases). Muhim kutubxonada bu foydalanuvchilarni xabardor qilishning asosiy usuli."
  ],
  "examples": [
    {
      "title": "Reliz yaratish",
      "lang": "bash",
      "code": [
        "gh release create v2.4.0 --generate-notes --title \"v2.4.0\"",
        "gh release create v2.5.0-rc.1 --prerelease --generate-notes",
        "gh release upload v2.4.0 build/app.zip"
      ],
      "note": "--generate-notes PR'lar ro'yxatidan yozuvni avtomatik yaratadi."
    },
    {
      "title": "Reliz yozuvini toifalash",
      "lang": "yaml",
      "code": [
        "# .github/release.yml",
        "changelog:",
        "  exclude:",
        "    labels: [ignore-for-release, dependencies]",
        "  categories:",
        "    - title: Yangi imkoniyatlar",
        "      labels: [feature]",
        "    - title: Tuzatishlar",
        "      labels: [bug]",
        "    - title: Buzuvchi o'zgarishlar",
        "      labels: [breaking]",
        "    - title: Boshqalar",
        "      labels: ['*']"
      ],
      "note": "PR label'lariga qarab bo'limlar hosil bo'ladi."
    }
  ],
  "pitfalls": [
    "PR'larga label qo'ymaslik: avtomatik reliz yozuvi \"Boshqalar\" bo'limiga to'planadi.",
    "Buzuvchi o'zgarishni reliz yozuvida ajratmaslik: foydalanuvchilar yangilab, kutilmaganda sinadi.",
    "Beqaror versiyani pre-release deb belgilamaslik: u \"Latest\" bo'lib, hamma uni oladi.",
    "Reliz tag'ini keyin o'zgartirish: paket iste'molchilari va keshlar eski tag'ga tayanadi."
  ]
});
