/* Chuqur dars: 7.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.8", {
  "lesson": [
    "### Qaysi bo'limga",
    "- **`require`**: ilova ishlashi uchun: `laravel/framework`, DB drayverlar, to'lov SDK, `ext-*`, `php`.",
    "- **`require-dev`**: test (`phpunit`, `pest`, `mockery`), statik tahlil (`larastan`, `phpstan`), format (`pint`), `fakerphp/faker` (agar production'da seed/factory ishlatilmasa), `laravel/pail`, `laravel/sail`.",
    "- **Chegara holat**: Faker'ni production'da seeder yoki demo ma'lumot uchun ishlatsangiz — `require`. **Telescope/Debugbar**: odatda `require-dev` (production'da ochiq bo'lsa xavfsizlik riski); production'da kerak bo'lsa `dont-discover` + gate.",
    "- Kod production'da dev paket klassiga tayansa, `--no-dev` dan keyin \"class not found\".",
    "",
    "### Ta'siri",
    "`composer install --no-dev` (yoki `COMPOSER_NO_DEV=1`): `require-dev` o'rnatilmaydi va **`autoload-dev` qoidalari ham generatsiya qilinmaydi** (docs). `composer dump-autoload --no-dev` — shu rejimda autoloader. `composer update --no-dev` ham mavjud.",
    "",
    "### Root-only",
    "`require-dev` faqat ildiz paket uchun ishlaydi: kutubxonangizni o'rnatgan kishi sizning dev bog'liqliklaringizni olmaydi. Shuning uchun test uchun kerak narsa `require-dev` da, lekin kutubxona kodi o'zi ishlatadigan narsa `require` da bo'lishi kerak.",
    "",
    "### Laravel kontekst",
    "Service provider auto-discovery: dev paketning provider'i `--no-dev` da yo'q bo'ladi; kod u klassga havola qilsa xato. `config/app.php`/`bootstrap/providers.php` da dev paket provider'ini qo'lda yozmang yoki shartli (`if (class_exists(...))`/`environment('local')`) qo'shing.",
    "",
    "### Tekshirish",
    "`composer install --no-dev` + `php artisan about` + smoke test (CI'da alohida production-simulyatsiya job). `composer why vendor/pkg` bilan paket kim uchun kerakligini ko'ring.",
    "",
    "### Qoidalar",
    "1. Production'da faqat `--no-dev` o'rnatish.",
    "2. Dev paketga kod darajasida bog'lanmang.",
    "3. CI'da `--no-dev` rejimida smoke test.",
    "4. `require` ni minimal saqlang."
  ],
  "examples": [
    {
      "title": "Bo'linish",
      "lang": "json",
      "note": "Laravel ilovasi",
      "code": [
        "{",
        "  \"require\": {",
        "    \"php\": \"^8.2\",",
        "    \"laravel/framework\": \"^12.0\",",
        "    \"laravel/tinker\": \"^2.10\"",
        "  },",
        "  \"require-dev\": {",
        "    \"fakerphp/faker\": \"^1.23\",",
        "    \"laravel/pail\": \"^1.2\",",
        "    \"laravel/pint\": \"^1.18\",",
        "    \"mockery/mockery\": \"^1.6\",",
        "    \"phpunit/phpunit\": \"^11.0\"",
        "  }",
        "}"
      ]
    },
    {
      "title": "Production simulyatsiyasi",
      "lang": "bash",
      "note": "--no-dev",
      "code": [
        "composer install --no-dev --optimize-autoloader --no-interaction",
        "php artisan about",
        "php artisan route:list >/dev/null && echo \"routes ok\"",
        "composer why fakerphp/faker                  # --no-dev da yo'q bo'lishi kerak"
      ]
    }
  ],
  "pitfalls": [
    "Test paketini `require` ga yozish: production'ga tushadi, hajm va xavf.",
    "Production'da ishlatiladigan paketni `require-dev` ga yozish: `--no-dev` dan keyin \"class not found\".",
    "Debugbar/Telescope'ni production'da ochiq qoldirish: ma'lumot sizishi.",
    "`--no-dev` da `autoload-dev` yo'qolishini hisobga olmaslik: test yordamchi klasslarga production kodidan murojaat.",
    "Kutubxonada `require-dev` ga tayanib \"foydalanuvchi ham o'rnatadi\" deb o'ylash: root-only.",
    "Dev paket provider'ini `bootstrap/providers.php` ga qattiq yozish: `--no-dev` da xato."
  ]
});
