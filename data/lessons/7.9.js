/* Chuqur dars: 7.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.9", {
  "lesson": [
    "### Event'lar (docs)",
    "- `pre-install-cmd` / `post-install-cmd` — `install` (lock bor).",
    "- `pre-update-cmd` / `post-update-cmd` — `update` (yoki lock'siz `install`).",
    "- `pre-autoload-dump` / `post-autoload-dump` — autoload dump (install/update/`dump-autoload`).",
    "- `post-root-package-install`, `post-create-project-cmd` — `create-project`.",
    "- Paket event'lari: `pre/post-package-install|update|uninstall`; `pre/post-status-cmd`, `pre/post-archive-cmd`.",
    "Laravel'da odatiy: `post-autoload-dump` → `Illuminate\\Foundation\\ComposerScripts::postAutoloadDump` va `@php artisan package:discover --ansi`; `post-update-cmd` → `vendor:publish --tag=laravel-assets`; `post-root-package-install` → `.env` nusxasi; `post-create-project-cmd` → `key:generate`.",
    "",
    "### Turlari",
    "- PHP callback: `\"MyVendor\\\\MyClass::postUpdate\"` (statik metod, `Composer\\Script\\Event` oladi).",
    "- Shell: `\"phpunit\"`, `\"vendor/bin/pint --test\"`.",
    "- `@php artisan ...` — joriy PHP binary; `@composer ...` — joriy Composer (bir qatorda `&&` zanjir yo'q: massivga ajrating); `@putenv APP_ENV=testing` — kross-platforma env.",
    "- `@test` — boshqa skriptga havola (`\"@test -vvv\"` argument bilan). Massiv — ketma-ket bajaradi; xato bo'lsa to'xtaydi.",
    "- `@additional_args` / `@no_additional_args` (Composer 2.8+) — CLI argumentlar qayerga qo'shilishini boshqaradi.",
    "",
    "### Maxsus buyruqlar",
    "Oldindan belgilangan event bo'lmagan nom `composer <nom>` bo'ladi: `\"test\": \"phpunit\"` → `composer test -- --filter X`. `scripts-descriptions` (`composer list`/`run -l` da ko'rinadi), `scripts-aliases` (2.7+). `composer run-script nom [--timeout=N] [--no-dev]`. `process-timeout` default 300 s: uzoq skript uchun `Composer\\Config::disableProcessTimeout` yoki `config.process-timeout`.",
    "",
    "### Muhit",
    "`COMPOSER_DEV_MODE` (install/update/dump-autoload paytida): `--no-dev` da `0`, aks holda `1` — skript ichida dev-only ishni shartlash. `COMPOSER_SKIP_SCRIPTS` yoki `--no-scripts` — skriptlarni o'tkazib yuboradi.",
    "",
    "### Xavfsizlik",
    "Faqat **root** `composer.json` skriptlari ishlaydi, bog'liqlik skriptlari emas. Lekin **plugin**lar bog'liqlik sifatida kod bajara oladi: `config.allow-plugins` (default `{}` — hech biri ruxsat etilmagan; `true` hammasiga ruxsat, tavsiya etilmaydi). Notanish loyiha `composer install`ini ishga tushirishdan oldin skript va plugin'larini ko'zdan kechiring; CI'da kerak bo'lsa `--no-scripts --no-plugins`.",
    "",
    "### Qoidalar",
    "1. Skript qisqa; uzun mantiq alohida fayl/buyruqda.",
    "2. `post-autoload-dump` da `package:discover` kabi Laravel qadamlari saqlansin.",
    "3. `allow-plugins` ni aniq ro'yxat bilan.",
    "4. Skript idempotent va CI-do'st (interaktivsiz)."
  ],
  "examples": [
    {
      "title": "Scripts",
      "lang": "json",
      "note": "Test, lint va zanjir",
      "code": [
        "{",
        "  \"scripts\": {",
        "    \"post-autoload-dump\": [",
        "      \"Illuminate\\\\Foundation\\\\ComposerScripts::postAutoloadDump\",",
        "      \"@php artisan package:discover --ansi\"",
        "    ],",
        "    \"test\": [\"@php artisan config:clear --ansi\", \"@php artisan test\"],",
        "    \"lint\": \"vendor/bin/pint --test\",",
        "    \"ci\": [\"@lint\", \"@test\"]",
        "  },",
        "  \"scripts-descriptions\": { \"ci\": \"Lint + testlarni ishga tushiradi\" }",
        "}"
      ]
    },
    {
      "title": "Ishlatish",
      "lang": "bash",
      "note": "Argument va xavfsizlik",
      "code": [
        "composer test -- --filter=OrderTest         # '--' dan keyin argument handler'ga",
        "composer run-script ci --timeout=0",
        "composer install --no-scripts --no-plugins  # ishonchsiz loyihani ko'rishda",
        "composer config allow-plugins.php-http/discovery true"
      ]
    }
  ],
  "pitfalls": [
    "Dependency paketning skripti ishlaydi deb o'ylash: faqat root paketniki.",
    "`allow-plugins: true` (hammasiga ruxsat): zararli plugin CI/dev mashinada kod bajaradi.",
    "`@composer a && @composer b` bitta qatorda: ishlamaydi; massivga ajrating.",
    "`pre-install-cmd`/`pre-update-cmd` da dependency'ga tayanish: bu paytda ular o'rnatilmagan bo'lishi mumkin.",
    "Uzun skriptda `process-timeout` (300 s) ga urilish: `--timeout` yoki `disableProcessTimeout`.",
    "Skriptda interaktiv so'rov (`--no-interaction` CI'da osilib qoladi): argument/env bering."
  ]
});
