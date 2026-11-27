/* Chuqur dars: 7.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.6", {
  "lesson": [
    "### PSR-4",
    "```json",
    "{ \"autoload\": { \"psr-4\": { \"App\\\\\": \"app/\", \"Database\\\\Factories\\\\\": \"database/factories/\" } },",
    "  \"autoload-dev\": { \"psr-4\": { \"Tests\\\\\": \"tests/\" } } }",
    "```",
    "`App\\Http\\Controllers\\UserController` → `app/Http/Controllers/UserController.php`. Prefiks `\\\\` bilan tugashi kerak (docs). Bir prefiksga bir nechta katalog berish mumkin (massiv). **Fayl yo'li katta-kichik harfga sezgir** (Linux): `app/Http/controllers/` ≠ `app/Http/Controllers/`.",
    "",
    "### Boshqa turlar",
    "- `classmap` — katalog/fayllarni skanerlab klass→fayl jadvali (`.php`, `.inc`); PSR-4'ga mos kelmaydigan eski kod uchun. Yangi klass qo'shilsa `dump-autoload` kerak.",
    "- `files` — har so'rovda **doim** yuklanadigan fayllar (global helper funksiyalar: `app/helpers.php`). Ko'p `files` ishga tushishni sekinlashtiradi.",
    "- `psr-0` — eski; yangi kodda PSR-4.",
    "- `exclude-from-classmap` — yo'llarni classmap'dan chiqarish (`**` pattern).",
    "- `autoload-dev` — faqat dev (`--no-dev` da yuklanmaydi).",
    "",
    "### Qachon dump kerak",
    "PSR-4 da yangi fayl qo'shish `dump-autoload`siz ishlaydi (dinamik qidiruv). `autoload` maydoni (yangi namespace, `files`, `classmap`) o'zgarsa `composer dump-autoload` kerak. Optimallashtirilgan autoloader (classmap) bo'lsa — har yangi klassdan keyin qayta dump qilish kerak.",
    "",
    "### Optimallashtirish (production)",
    "1. `composer install --optimize-autoloader` / `dump-autoload -o` — PSR-4 → classmap (tezroq).",
    "2. `--classmap-authoritative` (`-a`) — **faqat** classmap'dan yuklaydi (diskni qidirmaydi), `-o` ni nazarda tutadi. Classmap'da yo'q klass avtomatik topilmaydi: dinamik yaratiladigan klasslar bo'lsa xavfli.",
    "3. `--apcu-autoloader` — topilgan/topilmagan natijalarni APCu'da keshlaydi (APCu kengaytmasi kerak).",
    "`config`: `optimize-autoloader`, `classmap-authoritative`, `apcu-autoloader` (default `false`). Laravel `composer.json` da `optimize-autoloader: true` odatda yoqilgan.",
    "",
    "### Tekshirish",
    "`composer dump-autoload -o --strict-psr` — PSR-4 xaritasiga mos kelmaydigan klasslar (namespace ≠ yo'l) uchun exit code 1; `--strict-ambiguous` — bir klass bir necha faylda yoki katta-kichik harf farqida. Config: `strict-psr-autoloader`. CI'da yoqing.",
    "",
    "### Qoidalar",
    "1. Namespace = yo'l, fayl nomi = klass nomi, katta-kichik harfga e'tibor bering.",
    "2. Production: `-o` yoki `-a` (+ APCu mumkin).",
    "3. Global funksiyalarni `files` ga kamdan-kam qo'shing.",
    "4. CI'da `--strict-psr`."
  ],
  "examples": [
    {
      "title": "Autoload",
      "lang": "json",
      "note": "PSR-4 va helper fayl",
      "code": [
        "{",
        "  \"autoload\": {",
        "    \"psr-4\": { \"App\\\\\": \"app/\", \"Database\\\\Seeders\\\\\": \"database/seeders/\" },",
        "    \"files\": [\"app/helpers.php\"],",
        "    \"classmap\": [\"legacy/\"],",
        "    \"exclude-from-classmap\": [\"legacy/tests/\"]",
        "  },",
        "  \"autoload-dev\": { \"psr-4\": { \"Tests\\\\\": \"tests/\" } },",
        "  \"config\": { \"optimize-autoloader\": true }",
        "}"
      ]
    },
    {
      "title": "Buyruqlar",
      "lang": "bash",
      "note": "Optimallashtirish va tekshirish",
      "code": [
        "composer dump-autoload                                    # autoload maydoni o'zgargach",
        "composer dump-autoload -o --strict-psr --strict-ambiguous # CI: mapping xatolari",
        "composer install --no-dev --classmap-authoritative       # production",
        "php -r 'echo class_exists(\"App\\\\Models\\\\User\") ? \"ok\" : \"yo'q\", PHP_EOL;'"
      ]
    }
  ],
  "pitfalls": [
    "Windows/macOS'da `Controllers` papkasi `controllers` bo'lib qolgan: lokalda ishlaydi, Linux production'da klass topilmaydi (case-sensitive).",
    "Namespace va papka yo'li mos emas: PSR-4 klassni topmaydi; `--strict-psr` ushlaydi.",
    "`classmap-authoritative` bilan dinamik yaratilgan yoki keyin qo'shilgan klass: autoload topolmaydi; deploy'da qayta dump.",
    "`files` ga ko'p og'ir fayl qo'shish: har so'rovda yuklanadi.",
    "`autoload` maydonini o'zgartirib `dump-autoload` qilmaslik: yangi namespace ishlamaydi.",
    "`autoload-dev` namespace'ini production kodida ishlatish: `--no-dev` da yuklanmaydi."
  ]
});
