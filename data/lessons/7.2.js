/* Chuqur dars: 7.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.2", {
  "lesson": [
    "### Tarkibi",
    "- `packages` va `packages-dev` — har paket: `name`, `version` (aniq), `source`/`dist` (URL + reference/hash), `require`, `autoload`, `time`.",
    "- `content-hash` — `composer.json` ning bog'liqlikka ta'sir qiluvchi qismlarining hash'i: `composer.json` o'zgargan, lock yangilanmagan bo'lsa Composer ogohlantiradi.",
    "- `platform` / `platform-dev` — loyiha talab qilgan PHP/ext versiyalari.",
    "- `minimum-stability`, `stability-flags`, `prefer-stable`, `aliases`.",
    "",
    "### install vs update",
    "- `composer install`: lock **bor** bo'lsa uni aynan o'sha versiyalar bilan o'rnatadi (yangi versiya qidirmaydi). Lock **yo'q** bo'lsa resolve qiladi va lock yaratadi.",
    "- `composer update [paket...]`: `composer.json` cheklovlariga mos **eng yangi** versiyalarni hal qilib, lock'ni qayta yozadi; keyin o'rnatadi. Ismli paket bo'lsa faqat u (va kerak bo'lsa bog'liqliklari).",
    "- `composer update --lock` — versiyalarni o'zgartirmay faqat `content-hash` va metadata'ni yangilaydi (\"lock eskirgan\" ogohlantirishini yo'qotadi).",
    "",
    "### Nega commit qilinadi",
    "Docs bo'yicha lock hamma muhitda (dasturchilar, CI, production) bir xil versiyalarni ta'minlaydi va keyingi oylarda ham ishlaydigan holatni qayta tiklash imkonini beradi. Ilovada **majburiy**. Lock'siz CI'da `install` har kuni boshqa versiya olishi mumkin (\"mening kompyuterimda ishlaydi\").",
    "",
    "### Jamoa ish tartibi",
    "- Lock'ni qo'lda tahrir qilmang; faqat `composer require/update/remove` orqali.",
    "- `composer.lock` PR'da o'zgarsa — nima yangilanganini ko'rib chiqing (`composer show -D`, diff). Katta, sababsiz yangilash — shubhali.",
    "- Merge konflikti: lock'ni qo'lda birlashtirmang: `composer.json` ni hal qiling, so'ng `composer update --lock` yoki kerakli paketlar uchun `composer update vendor/a vendor/b` bilan qayta yarating.",
    "- `COMPOSER_NO_INTERACTION` bilan CI'da `composer install` (hech qachon `update`).",
    "",
    "### Qoidalar",
    "1. Ilovada `composer.lock` git'da.",
    "2. CI/production: `composer install` (lock bo'yicha), `update` emas.",
    "3. `update` — ongli, kichik, alohida PR'da.",
    "4. Lock eskirganini `composer validate` ushlasin."
  ],
  "examples": [
    {
      "title": "Lock oqimi",
      "lang": "bash",
      "note": "install va update",
      "code": [
        "composer install                       # lock bo'yicha: reproducible",
        "composer update monolog/monolog        # faqat shu paket (va kerakli bog'liqliklar)",
        "composer update --lock                 # composer.json o'zgardi, versiyalar o'zgarmasin",
        "composer validate --strict             # lock eskirganmi?",
        "git diff composer.lock | grep '\"version\"'   # nima o'zgardi"
      ]
    },
    {
      "title": "Lock fragmenti",
      "lang": "json",
      "note": "Aniq versiya va hash",
      "code": [
        "{",
        "  \"content-hash\": \"9a7f...c3\",",
        "  \"packages\": [",
        "    {",
        "      \"name\": \"monolog/monolog\",",
        "      \"version\": \"3.8.0\",",
        "      \"source\": { \"type\": \"git\", \"url\": \"https://github.com/Seldaek/monolog.git\", \"reference\": \"5cf826f2...\" },",
        "      \"dist\": { \"type\": \"zip\", \"url\": \"https://api.github.com/repos/Seldaek/monolog/zipball/5cf826f2...\" }",
        "    }",
        "  ]",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "CI/production'da `composer update` ishlatish: har deploy boshqa versiya, takrorlanmaydigan xatolar.",
    "Lock'ni `.gitignore` ga qo'yish: har muhitda turli versiya.",
    "Lock merge-konfliktini qo'lda tahrirlash: `content-hash` va bog'liqliklar nomuvofiq bo'ladi; qayta yarating.",
    "`composer.json` ni o'zgartirib lock'ni yangilamaslik: `install` ogohlantiradi, CI'da eski bog'liqliklar o'rnatiladi.",
    "Katta `composer update` ni boshqa o'zgarishlar bilan bitta commit'da qilish: regressiyani topish qiyin.",
    "`packages-dev` ni production'da o'rnatish: `install --no-dev` ni unutish."
  ]
});
