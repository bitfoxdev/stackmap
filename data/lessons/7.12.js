/* Chuqur dars: 7.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.12", {
  "lesson": [
    "### Xato ko'rinishi",
    "Resolver chiqishi: \"Problem 1: - Root composer.json requires A ^2 -> satisfiable by A[2.0.0]. - A[2.0.0] requires B ^3 ... - Root composer.json requires C ^1 -> C 1.x requires B ^2 ...\". O'qish tartibi: **eng pastki** (\"you can only install one version of a package\") qatordan yuqoriga.",
    "",
    "### Tashxis",
    "- `composer why-not vendor/b 3.*` (`prohibits`) — nima B 3 ni to'sib turibdi (PHP/ext ham).",
    "- `composer why vendor/b` (`depends`) — kim B ga bog'liq (`-r`, `-t`).",
    "- `composer update vendor/a -W --dry-run` — kengaytirilgan yangilash mumkinmi.",
    "- `composer show -a vendor/a` — mavjud versiyalar va ularning talablari.",
    "- `composer require vendor/a:^3 --dry-run` — o'zgartirishsiz sinash.",
    "- `composer diagnose`, `composer check-platform-reqs` (PHP/ext tekshiruvi; `config.platform`ni e'tiborsiz qoldiradi).",
    "",
    "### Yechim yo'llari (afzalligi bo'yicha)",
    "1. **Bloklovchi paketni yangilang** (`-W`): ko'pincha yangi versiya yangi bog'liqlikni qo'llaydi.",
    "2. **O'z cheklovingizni kengaytiring/toraytiring** (7.5): juda tor pin (`1.2.3`) yoki juda keng `*` sabab.",
    "3. **Paketni almashtiring** (abandoned/mos kelmaydigan).",
    "4. **Fork** + `repositories` (vcs) + `dev-branch as 1.0.0` inline alias — vaqtinchalik; PR yuboring.",
    "5. **`replace`/`provide`** — ongli, kam hollarda.",
    "6. **Platform**: serverda PHP/ext yetishmasa — muhitni yangilang. `--ignore-platform-req=php` yoki `config.platform` faqat vaqtincha/CI uchun: ilova haqiqiy muhitda ishlamasligi mumkin (`platform_check.php` runtime'da to'xtatadi).",
    "",
    "### Stability",
    "`minimum-stability: stable` bo'lganda beta paketni talab qilish konflikt beradi: paket darajasida `@beta` yoki `minimum-stability: beta` + `prefer-stable: true`.",
    "",
    "### Oldini olish",
    "Tor pin'lardan qoching (ilovada `^`), kutubxonada keng diapazon, muntazam kichik yangilanishlar (7.16), `composer why-not` ni yangilashdan oldin ishlatish.",
    "",
    "### Qoidalar",
    "1. Konfliktni kamaytirish uchun muntazam yangilang.",
    "2. `--ignore-platform-reqs` ni production'da ishlatmang.",
    "3. Vaqtinchalik fork/alias uchun muddat va issue qo'ying.",
    "4. Xato matnini pastdan yuqoriga o'qing."
  ],
  "examples": [
    {
      "title": "Tashxis",
      "lang": "bash",
      "note": "why-not va dry-run",
      "code": [
        "composer require vendor/a:^3.0 --dry-run",
        "composer why-not monolog/monolog 3.*",
        "composer why monolog/monolog -t",
        "composer update vendor/a -W --dry-run",
        "composer check-platform-reqs"
      ]
    },
    {
      "title": "Fork va alias",
      "lang": "json",
      "note": "Vaqtinchalik tuzatish",
      "code": [
        "{",
        "  \"repositories\": [{ \"type\": \"vcs\", \"url\": \"https://github.com/acme/vendor-pkg-fork\" }],",
        "  \"require\": { \"vendor/pkg\": \"dev-fix-php85 as 2.4.0\" }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`--ignore-platform-reqs`ni production'da ishlatish: kerakli PHP/ext yo'q muhitda ilova runtime'da yiqiladi.",
    "`config.platform` ni haqiqiy muhitdan boshqa versiyaga qo'yib unutib qoldirish: resolver boshqa PHP uchun versiya tanlaydi.",
    "Konflikt xabarini yuqoridan o'qish: sabab pastda.",
    "Tor pin (`1.2.3`) ilovada konflikt manbai.",
    "Fork'ni muddatsiz qoldirish: yangilanish va xavfsizlik tuzatishlari o'tkazib yuboriladi.",
    "Aliasni (`dev-x as 1.0`) doimiy yechim deb qoldirish."
  ]
});
