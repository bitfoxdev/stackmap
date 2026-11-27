/* Chuqur dars: 7.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.7", {
  "lesson": [
    "### require / remove",
    "- `composer require vendor/pkg` — versiyani o'zi tanlaydi (agar ko'rsatilmasa, tavsiya etilgan cheklov), `composer.json` ga yozadi, resolve qiladi, lock va `vendor/` ni yangilaydi. `composer require vendor/pkg:^2.1`.",
    "- `--dev` — `require-dev` ga. `--no-update` — faqat `composer.json` ni tahrirlaydi (`--no-install` ni nazarda tutadi). `--dry-run` — hech narsani o'zgartirmaydi.",
    "- `-w` (`--update-with-dependencies`) va `-W` (`--update-with-all-dependencies`): yangi paketning bog'liqliklarini ham yangilashga ruxsat (`-W` root talablarini ham). Bloklovchi cheklov bo'lsa kerak bo'ladi.",
    "- `--fixed` — aniq versiyani yozadi (faqat `project` turi yoki `--dev`).",
    "- `composer remove vendor/pkg` — `composer.json` dan olib, o'chiradi; `--unused` — endi kerak bo'lmagan paketlarni olib tashlaydi; `--dev` — `require-dev` dan.",
    "",
    "### install va update",
    "- `composer install` — lock bo'yicha (7.2). Yangi mashina/CI/deploy: faqat shu.",
    "- `composer update` — hamma narsani `composer.json` cheklovlari doirasida yangilaydi (xavfli, katta diff).",
    "- `composer update vendor/pkg` — faqat shu paket (agar `composer.json` da bo'lsa, vaqtinchalik cheklov uning ichida bo'lishi kerak). `-w`/`-W` — bog'liqliklari bilan.",
    "- `--with vendor/pkg:1.2.3` — `composer.json` ni tahrirlamay vaqtinchalik cheklov (docs: barcha paketlar yangilanadi).",
    "- `--minimal-changes` (`-m`) — faqat zarur o'zgarishlar (`COMPOSER_MINIMAL_CHANGES=1`).",
    "- `--lock` — versiyalarni o'zgartirmay lock hash'ini yangilaydi.",
    "- `--dry-run` — simulyatsiya. `--prefer-lowest` / `--prefer-stable` — pastki chegarani sinash (kutubxonalar uchun).",
    "- `composer reinstall vendor/pkg` — `vendor/` dagi buzilgan/o'zgartirilgan paketni qayta o'rnatadi.",
    "",
    "### Xavfsiz odat",
    "1. `--dry-run` bilan oldindan ko'ring.",
    "2. Ismli yangilash; keyin `git diff composer.lock` — kutilgan paketlar o'zgardimi?",
    "3. Testlar va `composer audit` (7.13).",
    "4. Lock + `composer.json` bitta commit'da.",
    "5. Production'da hech qachon `require`/`update`: faqat `install`.",
    "",
    "### Fayl rejimi",
    "`vendor/` ni qo'lda tahrirlamang (qayta o'rnatishda yo'qoladi); o'zgartirish kerak bo'lsa fork yoki patch paket (`cweagans/composer-patches`).",
    "",
    "### Qoidalar",
    "1. `vendor/` git'da emas; lock git'da.",
    "2. Aniq paketni yangilang, \"hammasini\" emas.",
    "3. Har `require` dan keyin `why` bilan tranzitivlarni ko'ring.",
    "4. Olib tashlaganda kodda ham ishlatilishini tozalang (`remove` + `grep`)."
  ],
  "examples": [
    {
      "title": "Ongli yangilash",
      "lang": "bash",
      "note": "dry-run, ismli update, diff",
      "code": [
        "composer require spatie/laravel-permission --dry-run",
        "composer require spatie/laravel-permission",
        "composer update monolog/monolog -W --dry-run",
        "composer update monolog/monolog -W",
        "git diff --stat composer.lock",
        "composer audit && php artisan test"
      ]
    },
    {
      "title": "Tozalash",
      "lang": "bash",
      "note": "remove, reinstall",
      "code": [
        "composer remove barryvdh/laravel-debugbar --dev",
        "composer remove --unused",
        "composer reinstall vendor/broken-pkg        # vendor/ da buzilgan paket",
        "composer install --no-dev --no-scripts      # production (skriptsiz sinash)"
      ]
    }
  ],
  "pitfalls": [
    "Production serverda `composer update`: lock o'zgaradi, versiyalar kutilmagan siljiydi.",
    "Hamma narsani yangilovchi `composer update` ni boshqa ishlar bilan birga qilish: regressiyani topish qiyin.",
    "`-W` ni ko'r-ko'rona ishlatish: root talablarini ham ko'taradi; avval `--dry-run`.",
    "`vendor/` ichidagi kodni qo'lda tuzatish: `install` da yo'qoladi; fork/patch.",
    "`composer require` dan keyin `composer.json` da `*` yoki juda keng cheklov qolishi: tahrirlab toraytiring.",
    "`--no-update` dan keyin `install` ni unutish: `composer.json` va `lock` mos emas."
  ]
});
