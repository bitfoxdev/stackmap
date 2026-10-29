/* Chuqur dars: 34.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.7", {
  "lesson": [
    "### GitHub Actions",
    "GitHub Actions — repozitoriyga o'rnatilgan CI/CD. Workflow'lar `.github/workflows/*.yml` fayllarida YAML bilan yoziladi va kod bilan birga versiyalanadi.",
    "",
    "### Tuzilishi",
    "- **Workflow**: bitta YAML fayl.",
    "- **Event** (`on:`): ishga tushiruvchi (`push`, `pull_request`, `schedule` (cron), `workflow_dispatch` (qo'lda), `release`, `merge_group`).",
    "- **Job**: bir runner'da bajariladigan qadamlar to'plami. Job'lar odatda parallel, `needs:` bilan ketma-ket qilinadi.",
    "- **Step**: `run:` (shell buyrug'i) yoki `uses:` (tayyor action).",
    "- **Runner**: GitHub-hosted (`ubuntu-latest`) yoki self-hosted (o'z serveringiz).",
    "- **Action**: qayta ishlatiladigan qadam (marketplace).",
    "",
    "### Laravel uchun tipik pipeline",
    "1. `actions/checkout`.",
    "2. `shivammathur/setup-php`: PHP versiyasi va kengaytmalar.",
    "3. Composer keshi va `composer install`.",
    "4. Service container'lar: MySQL/PostgreSQL, Redis (health check bilan).",
    "5. Pint, Larastan (PHPStan).",
    "6. Pest/PHPUnit (`--parallel`).",
    "7. Keyin: deploy (faqat `main` yoki tag'da).",
    "",
    "### Foydali imkoniyatlar",
    "- **Matritsa** (`strategy.matrix`): bir nechta PHP versiyasida sinash.",
    "- **Keshlash** (`actions/cache` yoki `setup-php` keshi).",
    "- `concurrency`: bir tarmoqdagi eski ishlarni bekor qilish.",
    "- **Artefaktlar**: log, hisobot saqlash.",
    "- **Reusable workflow** va **composite action**: takrorlanuvchi qismlarni umumiy qilish.",
    "",
    "### Eslatma",
    "Batafsil Actions mavzusi alohida bo'limda (45-skill). Bu yerda GitHub platformasidagi o'rni: PR bilan birga ishlashi, status check sifatida branch protection'ga ulanishi."
  ],
  "examples": [
    {
      "title": "Minimal CI workflow",
      "lang": "yaml",
      "code": [
        "name: ci",
        "on:",
        "  pull_request:",
        "  push:",
        "    branches: [main]",
        "",
        "concurrency:",
        "  group: ci-${{ github.ref }}",
        "  cancel-in-progress: true",
        "",
        "jobs:",
        "  test:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: shivammathur/setup-php@v2",
        "        with: { php-version: '8.4', coverage: none }",
        "      - run: composer install --no-interaction --prefer-dist",
        "      - run: php artisan test --parallel"
      ],
      "note": "concurrency yangi push bo'lganda eski ishni bekor qiladi."
    },
    {
      "title": "PHP versiyalar matritsasi",
      "lang": "yaml",
      "code": [
        "jobs:",
        "  test:",
        "    strategy:",
        "      fail-fast: false",
        "      matrix:",
        "        php: ['8.3', '8.4']",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: shivammathur/setup-php@v2",
        "        with: { php-version: ${{ matrix.php }} }"
      ],
      "note": "Har PHP versiyasi alohida job sifatida ishlaydi."
    }
  ],
  "pitfalls": [
    "Keshsiz CI: har ishga tushirishda butun bog'liqliklar qayta yuklanadi.",
    "Eski ishlarni bekor qilmaslik (`concurrency` yo'q): ketma-ket push'larda resurs behuda sarflanadi.",
    "Workflow'ni lokal sinay olmaslik: kichik o'zgarishlar uchun ko'p commit. `act` kabi vositalar yoki alohida branch'da sinang.",
    "Uchinchi tomon action'ni versiyasiz (`@main`) ishlatish: kutilmagan o'zgarish yoki xavfsizlik xavfi."
  ]
});
