/* Chuqur dars: 35.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.6", {
  "lesson": [
    "### GitLab CI/CD arxitekturasi va asoslari",
    "GitLab platformasining eng kuchli ustunliklaridan biri — uning yadro qismiga to'liq o'rnatilgan **GitLab CI/CD** tizimidir. Boshqa tizimlardan (Jenkins, TeamCity) farqli ravishda tashqi plaginlar talab qilinmaydi; butun pipeline arxitekturasi loyiha ildizidagi `.gitlab-ci.yml` deklarativ fayli orqali kod sifatida (Pipeline as Code) boshqariladi.",
    "",
    "### Asosiy tushunchalar",
    "- **Pipeline**: Muhandislik jarayonining to'liq zanjiri bo'lib, o'zgarishlar kiritilganda avtomatik ishga tushadi.",
    "- **Stages**: Mantiqiy bosqichlar ketma-ketligi (masalan `build`, `test`, `security`, `deploy`). Bitta stage ichidagi barcha joblar parallel bajariladi; keyingi stage ga o'tish uchun oldingisi muvaffaqiyatli tugashi shart.",
    "- **Jobs**: Muayyan bosqichda bajariladigan aniq vazifa (masalan `pest_tests`, `pint_lint`, `docker_build`).",
    "- **Scripts**: Konteyner yoki muhit ichida bajariladigan shell buyruqlari to'plami.",
    "",
    "### Cache va Artifacts farqi (Kritik jihat)",
    "Dasturchilar ko'p adashadigan muhim farq:",
    "- **Cache**: Joblar o'rtasida takrorlanuvchi fayllarni (masalan `vendor/`, `node_modules/`, Composer keshi) tezlashtirish uchun saqlash vositasi. Kesh kafolatlanmaydi (ephemeral) — agar runner o'zgarsa, kesh bo'sh bo'lishi mumkin. Shuning uchun kod kesh bo'lmaganda ham mustaqil yuklab oladigan bo'lishi shart.",
    "- **Artifacts**: Bajarilgan job natijasida hosil bo'lgan muhim fayllar (masalan, kompilyatsiya qilingan frontend fayllari, test coverage hisobotlari). Ular GitLab serveriga yuklanadi va keyingi bosqich joblariga 100% kafolat bilan yetkazib beriladi.",
    "",
    "### Services: Test uchun xizmatlar konteyneri",
    "Laravel testlarini ishga tushirishda real MySQL, Redis yoki PostgreSQL kerak bo'ladi. GitLab CI da `services:` bo'limi orqali yondosh Docker konteyneri bir zumda ko'tariladi va asosiy job unga tarmoq orqali to'g'ridan-to'g'ri bog'lanadi."
  ],
  "examples": [
    {
      "title": "Laravel uchun to'liq .gitlab-ci.yml namunasi",
      "lang": "yaml",
      "code": [
        "stages:",
        "  - prepare",
        "  - test",
        "  - deploy",
        "",
        "variables:",
        "  DB_CONNECTION: mysql",
        "  DB_HOST: mysql",
        "  DB_DATABASE: testing",
        "  MYSQL_ROOT_PASSWORD: secret",
        "",
        "composer_job:",
        "  stage: prepare",
        "  image: composer:2",
        "  script:",
        "    - composer install --prefer-dist --no-interaction --no-progress",
        "  cache:",
        "    key: ${CI_COMMIT_REF_SLUG}",
        "    paths:",
        "      - vendor/",
        "",
        "pest_test:",
        "  stage: test",
        "  image: php:8.3-cli",
        "  services:",
        "    - mysql:8.0",
        "  script:",
        "    - docker-php-ext-install pdo_mysql",
        "    - cp .env.example .env.testing",
        "    - php artisan key:generate --env=testing",
        "    - php artisan migrate --env=testing",
        "    - ./vendor/bin/pest"
      ],
      "note": "Stages ketma-ket, services esa avtomatik aloqa tarmog'iga ulanadi."
    },
    {
      "title": "Include orqali umumiy shablonlarni ulash",
      "lang": "yaml",
      "code": [
        "include:",
        "  - project: 'acme/ci-templates'",
        "    file: '/templates/laravel-security-scan.yml'",
        "  - template: 'Security/Secret-Detection.gitlab-ci.yml'"
      ],
      "note": "Kompaniya bo'yicha yagona xavfsizlik va lint standartlari bir qatorda ulanadi."
    }
  ],
  "pitfalls": [
    "Vendor papkasini 'artifacts' qilib belgilash: har bir jobda yuzlab megabayt ma'lumot serverga ortiqcha yuklanadi va CI sekinlashadi; o'rniga 'cache' ishlatish kerak.",
    "Joblar ichida `apt-get update` ni har safar qayta yuklash: CI vaqtini cho'zadi; oldindan tayyorlangan Docker image ishlatish maqsadga muvofiq.",
    "Database hostini 'localhost' deb belgilash: GitLab CI da alohida xizmat konteyneri servis nomi bilan chaqiriladi (`DB_HOST: mysql`)."
  ]
});
