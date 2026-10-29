/* Chuqur dars: 74.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.17", {
  "lesson": [
    "### Testlar CI'da",
    "CI (Continuous Integration) har commit va pull request'da testlarni **avtomatik** ishga tushiradi. Bu testlarning haqiqiy qiymati: \"mening mashinamda ishlaydi\" emas, jamoaning umumiy kafolati.",
    "",
    "### Odatiy konveyer",
    "1. Kodni yuklab olish, PHP va kengaytmalarni sozlash.",
    "2. Bog'liqliklarni o'rnatish (`composer install`), keshdan foydalanish.",
    "3. Xizmatlarni ko'tarish: MySQL/PostgreSQL va Redis service container'lari (health check bilan).",
    "4. Muhitni sozlash: `.env.testing`, `APP_KEY`.",
    "5. Migratsiyalar.",
    "6. Testlarni yuritish (parallel).",
    "7. Natijalar va artefaktlar: JUnit XML, qamrov, log fayllari.",
    "",
    "### Merge'ni bloklash",
    "Asosiy qoida: **birorta test yiqilsa, PR merge qilinmaydi.** Buni platforma darajasida majburlang (branch protection, required status checks). Aks holda qizil to'plam odatiy holga aylanadi.",
    "",
    "### Bosqichlar",
    "Tez fikr-mulohaza uchun ketma-ketlik: lint va statik tahlil, unit testlar, integratsion/feature testlar, E2E. Tez bosqich yiqilsa, qimmatlarini ishga tushirmang. Mustaqil bosqichlarni parallel yuriting.",
    "",
    "### Barqarorlik",
    "CI testlari muhit farqidan yiqilmasligi kerak: aniq PHP versiyasi, vaqt zonasi, locale, bir xil servis versiyalari. Matritsa (bir nechta PHP versiyasi) qo'llab-quvvatlanadigan versiyalarni tekshiradi.",
    "",
    "### Tezlik",
    "Composer keshi, parallel testlar, sxema dump, keraksiz bosqichlarni olib tashlash. 10 daqiqadan ortiq CI jamoani sekinlashtiradi.",
    "",
    "### Diagnostika",
    "Yiqilganda log, JUnit hisoboti va kerak bo'lsa skrinshot artefakt sifatida saqlansin."
  ],
  "examples": [
    {
      "title": "GitHub Actions: testlar",
      "lang": "yaml",
      "code": [
        "name: tests",
        "on: [push, pull_request]",
        "jobs:",
        "  tests:",
        "    runs-on: ubuntu-latest",
        "    services:",
        "      mysql:",
        "        image: mysql:8.4",
        "        env: { MYSQL_DATABASE: app_test, MYSQL_ROOT_PASSWORD: secret }",
        "        ports: [\"3306:3306\"]",
        "        options: >-",
        "          --health-cmd=\"mysqladmin ping -h 127.0.0.1 -psecret\"",
        "          --health-interval=5s --health-retries=10",
        "      redis:",
        "        image: redis:7",
        "        ports: [\"6379:6379\"]",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: shivammathur/setup-php@v2",
        "        with: { php-version: \"8.4\", coverage: pcov }",
        "      - uses: actions/cache@v4",
        "        with:",
        "          path: vendor",
        "          key: composer-${{ hashFiles('composer.lock') }}",
        "      - run: composer install --no-interaction --prefer-dist",
        "      - run: php artisan test --parallel --coverage --min=80",
        "        env: { DB_HOST: 127.0.0.1, DB_DATABASE: app_test, REDIS_HOST: 127.0.0.1 }"
      ],
      "note": "Servislar health check bilan, keshlangan vendor, parallel testlar va qamrov chegarasi."
    },
    {
      "title": "Merge'ni bloklash",
      "lang": "text",
      "code": [
        "GitHub: Settings -> Branches -> Branch protection rule (main)",
        "  [x] Require status checks to pass before merging   -> \"tests\"",
        "  [x] Require branches to be up to date before merging"
      ],
      "note": "Yiqilgan testli PR merge tugmasi faol bo'lmaydi."
    }
  ],
  "pitfalls": [
    "Merge'ni majburan bloklamaslik: qizil testlar odatiy holga aylanadi va to'plamga ishonch yo'qoladi.",
    "Service container'larni health check'siz ishlatish: servis tayyor bo'lmay testlar tasodifan yiqiladi.",
    "CI muhiti lokaldan farq qilishi (PHP versiyasi, vaqt zonasi): faqat CI'da yiqiladigan testlar.",
    "Juda sekin CI (20+ daqiqa): dasturchilar uni aylanib o'tishga harakat qiladi."
  ]
});
