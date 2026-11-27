/* Chuqur dars: 7.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.14", {
  "lesson": [
    "### Reproducibility omillari",
    "1. **`composer.lock`** commit'da va faqat `composer install` (7.2). Docs: reproducible build default; takroriy install bir xil `vendor/` (autoloader fayllari ham) beradi, vaqt belgilari bundan mustasno.",
    "2. **Composer versiyasi**: Docker'da `composer:2.x` aniq tegi (yoki sha); `composer self-update` har safar boshqa versiya olib kelmasin.",
    "3. **PHP versiyasi va kengaytmalar**: build muhiti production bilan mos; `composer check-platform-reqs` (PHP va ext tekshiruvi, `config.platform`ni e'tiborsiz qoldiradi). Composer `vendor/composer/platform_check.php` yaratadi: runtime'da PHP/ext versiyasi mos kelmasa ilova darrov to'xtaydi (`config.platform-check`, default `php-only`).",
    "4. **Tarmoq**: dist URL'lar GitHub'dan; kesh/mirror (Artifactory) va `COMPOSER_CACHE_DIR` CI keshi tezlashtiradi; `source-fallback` default o'chiq.",
    "5. **Sozlamalar**: `COMPOSER_*` env (masalan `COMPOSER_NO_DEV`), `preferred-install: dist`.",
    "6. **autoloader-suffix**: default lock `content-hash` dan olinadi: lock bir xil bo'lsa autoloader nomlari barqaror.",
    "",
    "### Tavsiya etilgan build",
    "```bash",
    "composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader",
    "composer check-platform-reqs",
    "```",
    "Yoki `--classmap-authoritative` (production). `--no-scripts` faqat ishonchsiz kontekstda; Laravel'da `post-autoload-dump` (`package:discover`) kerak bo'lgani uchun odatda skriptlar yoqiq qoladi.",
    "",
    "### Bir marta build — hamma joyga",
    "Artefakt (Docker image yoki arxiv) **bir marta** CI'da quriladi (vendor + frontend build + `optimize` qadamlari), keyin staging → production'ga **o'zgarishsiz** ko'chiriladi. Production'da `composer install` qilmaslik: tarmoq xatolari va versiya siljishi yo'q. Image tegi — commit SHA.",
    "",
    "### Tekshirish",
    "Ikki marta build → `vendor/` va `composer.lock` hash'lari (`find vendor -type f | sort | xargs sha256sum | sha256sum`), yoki image digest. Mos kelmasa: Composer/PHP versiyasi yoki tarmoq farqi.",
    "",
    "### Qoidalar",
    "1. Lock + `install`; CI'da `update` yo'q.",
    "2. Composer va PHP versiyalari qotirilgan.",
    "3. Platform tekshiruvi build'da.",
    "4. Artefakt bir marta yaratiladi, ilgari suriladi."
  ],
  "examples": [
    {
      "title": "Dockerfile",
      "lang": "dockerfile",
      "note": "Multi-stage, qotirilgan Composer",
      "code": [
        "FROM composer:2.8 AS vendor",
        "WORKDIR /app",
        "COPY composer.json composer.lock ./",
        "RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --no-autoloader",
        "",
        "FROM php:8.3-cli AS build",
        "COPY --from=vendor /usr/bin/composer /usr/bin/composer",
        "WORKDIR /app",
        "COPY --from=vendor /app/vendor ./vendor",
        "COPY . .",
        "RUN composer dump-autoload --no-dev --optimize --classmap-authoritative \\",
        " && composer check-platform-reqs"
      ]
    },
    {
      "title": "Taqqoslash",
      "lang": "bash",
      "note": "Ikki build hash'i",
      "code": [
        "find vendor -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum",
        "composer --version      # build'lar orasida bir xil bo'lishi kerak",
        "php -v"
      ]
    }
  ],
  "pitfalls": [
    "CI/production'da `composer update`: har build boshqa versiyalar.",
    "Composer'ning `latest` image/self-update'ini ishlatish: build'lar orasida xatti-harakat o'zgaradi.",
    "Build muhiti PHP/ext'i production'dan farqli: `platform_check.php` runtime'da ilovani to'xtatadi yoki noto'g'ri versiya tanlanadi.",
    "Production'da `composer install` qilish (artefakt o'rniga): tarmoq nosozligi va siljish.",
    "`--no-scripts` bilan build qilib `package:discover` ni unutish (Laravel): provider'lar ro'yxatga olinmaydi.",
    "Lock'ni build'ga nusxalamaslik (`COPY composer.json` faqat): lock'siz resolve bo'lib ketadi."
  ]
});
