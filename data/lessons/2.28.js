/* Chuqur dars: 2.28. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.28", {
  "lesson": [
    "### Qo'llab-quvvatlash siyosati (docs'ga ko'ra)",
    "| Versiya | PHP | Xato tuzatish | Xavfsizlik |",
    "|---|---|---|---|",
    "| 11 | 8.2–8.4 | tugagan | **2026-03-12 da tugagan** |",
    "| 12 | 8.2–8.5 | 2026-08-13 | 2027-02-24 |",
    "| 13 | 8.3–8.5 | 2027 Q3 | 2028-03-17 |",
    "Xavfsizlik yangilanishi tugagan versiya production'da xavfli: yangilash rejasi kerak. Aniq sanalarni har safar `laravel.com/docs/releases` dan tekshiring (ular o'zgarishi mumkin).",
    "",
    "### Laravel 13 asosiy yangiliklari (docs)",
    "AI SDK (birinchi tomon), JSON:API resurslari (2.25), `PreventRequestForgery` middleware (CSRF himoyasining yangilangan shakli), `Queue::route(...)`, atribut asosidagi sozlash (`#[Tries]`, `#[Backoff]`, `#[Timeout]`, `#[Middleware]`, `#[Authorize]`), `Cache::touch`, pgvector uchun `whereVectorSimilarTo`. To'liq ro'yxat va breaking change'lar — rasmiy upgrade guide.",
    "",
    "### Strategiya",
    "1. **Bitta major** bir vaqtda (11 → 12 → 13), har birini alohida deploy qiling; sakrab o'tmang.",
    "2. Avval PHP versiyasini ko'taring (yangi Laravel talab qiladi) va ilova ishlashini tasdiqlang.",
    "3. `composer.json` da `laravel/framework` constraint'ini o'zgartiring, `composer why-not laravel/framework 13.*` bilan bloklovchi paketlarni toping, paketlarni yangilang (yoki almashtiring).",
    "4. Rasmiy **Upgrade Guide**ni (har major uchun) bo'limma-bo'lim o'qing: \"likelihood of impact\" (High/Medium/Low) belgisiga qarang.",
    "5. Avtomatlashtirish: **Rector** (`rector/rector` + `driftingly/rector-laravel`), Laravel Shift (pullik, avtomatik PR), `php artisan about`.",
    "6. Deprecation'larni ko'ring: `error_reporting(E_ALL)` va `deprecations` log kanali (`LOG_DEPRECATIONS_CHANNEL`).",
    "7. Test: CI'da yangi versiya bilan to'liq test; staging; kanareyka (10% trafik) yoki feature flag.",
    "8. Orqaga qaytarish rejasi (kod + migratsiya, 2.37).",
    "",
    "### Skelet bilan sinxron",
    "Major'larda skelet (`laravel/laravel`) o'zgaradi (yangi `bootstrap/app.php` kabi); mavjud loyiha eski tuzilmada qolishi mumkin, lekin yangi konvensiyalarga ko'chirish uchun `laravel/laravel` o'zgarishlarini ko'rib chiqing. Laravel 11 da `Kernel`/`Handler` olib tashlangan (2.1, 2.2).",
    "",
    "### Doimiy qarz",
    "Har 6–12 oyda kichik yangilash (minor/patch) — \"katta portlash\"dan arzon. `composer outdated --direct`, Dependabot/Renovate, `composer audit` (xavfsizlik).",
    "",
    "### Qoidalar",
    "1. Qo'llab-quvvatlash tugashidan oldin yangilang; muddatni jamoa kalendariga qo'ying.",
    "2. Testlarsiz major yangilanmaydi: avval test qoplamini oshiring.",
    "3. Bitta major — bitta PR/deploy.",
    "4. Paket mosligini yangilashdan oldin tekshiring."
  ],
  "examples": [
    {
      "title": "Yangilash tekshiruvi",
      "lang": "bash",
      "note": "Composer va Rector",
      "code": [
        "php -v                                        # yangi Laravel talab qilgan PHP'mi",
        "composer outdated --direct",
        "composer why-not laravel/framework 13.*       # bloklovchilar",
        "composer require laravel/framework:^13.0 --with-all-dependencies",
        "php artisan about",
        "composer audit",
        "vendor/bin/rector process --dry-run           # avtomatik refaktor ko'rinishi",
        "php artisan test --parallel"
      ]
    },
    {
      "title": "CI matritsasi",
      "lang": "yaml",
      "note": "PHP × Laravel",
      "code": [
        "strategy:",
        "  matrix:",
        "    php: ['8.3', '8.4']",
        "    laravel: ['12.*', '13.*']",
        "steps:",
        "  - run: composer require \"laravel/framework:${{ matrix.laravel }}\" --no-update",
        "  - run: composer update --prefer-dist --no-interaction",
        "  - run: php artisan test"
      ]
    }
  ],
  "pitfalls": [
    "Xavfsizlik muddati tugagan versiyada (masalan, Laravel 11 — 2026-03-12 dan keyin) qolish: ma'lum zaifliklar tuzatilmaydi.",
    "Bir vaqtda ikki major'ni sakrab o'tish: xato manbasini ajratib bo'lmaydi; ketma-ket.",
    "Paketlar mosligini tekshirmasdan `laravel/framework` constraint'ini ko'tarish: composer yechilmaydi yoki ishlamaydigan versiya o'rnatiladi.",
    "Testsiz yangilash: breaking change production'da topiladi.",
    "Yangi PHP versiyasini Laravel bilan bir vaqtda ko'tarish: nosozlik manbasi noaniq; avval PHP.",
    "Upgrade guide'ni o'qimasdan faqat Shift/Rector'ga tayanish: maxsus kod yoki konfiguratsiya o'zgarishi qoladi."
  ]
});
