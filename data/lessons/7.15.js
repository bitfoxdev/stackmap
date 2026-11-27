/* Chuqur dars: 7.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.15", {
  "lesson": [
    "### Asosiy buyruq",
    "```bash",
    "composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction",
    "```",
    "- `--no-dev`: `require-dev` o'rnatilmaydi, `autoload-dev` generatsiya qilinmaydi (docs). Env: `COMPOSER_NO_DEV=1`.",
    "- `--prefer-dist`: docs'da alohida flag emas — dist default (`preferred-install: dist`); `source` faqat lokal dev uchun.",
    "- `--optimize-autoloader` (`-o`): PSR-4 → classmap. `--classmap-authoritative` (`-a`): faqat classmap (disk qidirilmaydi; `-o` ni nazarda tutadi). `--apcu-autoloader`: APCu keshi.",
    "- `--no-interaction` (`COMPOSER_NO_INTERACTION=1`): so'rovsiz.",
    "- `--no-scripts`/`--no-plugins`: ishonchsiz kontekstda; Laravel'da `package:discover` kerak (7.9).",
    "",
    "### Production'da bo'lmasligi kerak",
    "`composer.json`/`lock` dan tashqari: `.git`, testlar (ixtiyoriy), `auth.json` (CI maxfiy env'ida), `vendor/bin` ichida dev vositalar. Kod artefaktida `vendor/` bor, lekin git'da yo'q.",
    "",
    "### Tekshirish",
    "```bash",
    "composer check-platform-reqs           # PHP/ext (config.platform'ni e'tiborsiz qoldiradi)",
    "composer show -s                       # root package",
    "composer show | grep -i -E 'debugbar|faker|phpunit'   # bo'sh bo'lishi kerak",
    "php artisan about",
    "```",
    "`composer audit --no-dev --locked` — faqat production bog'liqliklar.",
    "",
    "### Laravel deploy bilan",
    "`install --no-dev -o` → `npm run build` → `migrate --force` → `artisan optimize` → symlink → `queue:restart` (2.41). Telescope kabi paketlar `dont-discover`/`require-dev` bilan.",
    "",
    "### Xavfsizlik",
    "Production'da dev vositalar (Debugbar, Telescope, Ignition debug) ma'lumot oshkor qiladi; `APP_DEBUG=false`. `COMPOSER_ALLOW_SUPERUSER=1` faqat konteynerda; production hostda root ostida `composer` ishlatmang.",
    "",
    "### Qoidalar",
    "1. `--no-dev` har doim production'da.",
    "2. `-o` (yoki `-a`) yoqilgan.",
    "3. `check-platform-reqs` build'da.",
    "4. Build artefaktini deploy qiling (7.14)."
  ],
  "examples": [
    {
      "title": "Production build",
      "lang": "bash",
      "note": "Skript",
      "code": [
        "set -euo pipefail",
        "export COMPOSER_NO_INTERACTION=1",
        "composer install --no-dev --prefer-dist --optimize-autoloader",
        "composer check-platform-reqs",
        "composer audit --no-dev --locked",
        "php artisan optimize"
      ]
    },
    {
      "title": "Sozlama",
      "lang": "json",
      "note": "composer.json config",
      "code": [
        "{",
        "  \"config\": {",
        "    \"optimize-autoloader\": true,",
        "    \"preferred-install\": \"dist\",",
        "    \"sort-packages\": true,",
        "    \"allow-plugins\": { \"php-http/discovery\": true }",
        "  }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Production'da `--no-dev`siz install: Faker/Debugbar/test paketlari qoladi.",
    "`classmap-authoritative` yoqib, keyin yangi klass qo'shib deploy qilmaslik (qayta dump): klass topilmaydi.",
    "Production hostda root ostida `composer` ishlatish: fayl ruxsatlari va xavfsizlik muammosi.",
    "`auth.json`ni image/artefaktga qoldirish: kredit sizadi (CI env va multi-stage).",
    "`composer update` ni production'da ishlatish.",
    "`--no-scripts` bilan Laravel'da `package:discover` unutish: provider'lar ulanmaydi."
  ]
});
