/* Chuqur dars: 7.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.10", {
  "lesson": [
    "### Repository turlari",
    "```json",
    "{ \"repositories\": [",
    "  { \"type\": \"vcs\", \"url\": \"git@gitlab.com:acme/billing.git\" },",
    "  { \"type\": \"path\", \"url\": \"../packages/*\", \"options\": { \"symlink\": true } },",
    "  { \"type\": \"composer\", \"url\": \"https://packages.acme.com\" }",
    "] }",
    "```",
    "- **vcs**: git repo'dan to'g'ridan-to'g'ri; versiyalar **teg**lardan (`v1.2.0`), dev versiya — branch (`dev-main`, `1.x-dev`). Repo'ning `composer.json` ida `name` bo'lishi shart.",
    "- **path**: lokal katalog (monorepo, rivojlanish); default symlink (`COMPOSER_MIRROR_PATH_REPOS=1` — nusxa). Lock'da `dist.type: path`: production'da bunday paket bo'lmasligi kerak.",
    "- **composer**: Composer-mos registry — Satis (statik), **Private Packagist**, GitLab Package Registry, GitHub Packages, Artifactory/Nexus.",
    "- **artifact**: zip fayllar katalogi (offline).",
    "- **package**: inline ta'rif (kamdan-kam).",
    "Packagist'dan **tartib muhim**: birinchi mos kelgan repository g'olib; Packagist oxirida. Ichki paket nomi tashqi nom bilan to'qnashsa, \"dependency confusion\" xavfi: ichki repository'larni `canonical`/`only` bilan toraytiring yoki nomni vendor-prefiks bilan himoyalang (`acme/*`).",
    "",
    "### Kirish",
    "- `auth.json` (loyiha yoki `COMPOSER_HOME`): `http-basic`, `github-oauth`, `gitlab-token`, `bearer`. **Git'ga qo'shmang** (`.gitignore`). `composer config --auth ...` yoki `-g`.",
    "- CI: `COMPOSER_AUTH` env (JSON) yoki CI maxfiy o'zgaruvchi; GitLab'da `gitlab-ci-token` bilan job token (docs: ba'zi dist yuklashlar yangi GitLab versiyasini talab qiladi). `store-auths: false` CI'da kreditlarni diskka yozmaydi.",
    "- SSH kalit: `git@...` URL (deploy key).",
    "- Kreditlar `composer.json`/`lock` ga tushmasligi shart.",
    "",
    "### Versiyalash",
    "Teglar SemVer (7.4): `v1.0.0`; `composer.json` da `version` maydonini qo'lda yozmang (teg bilan to'qnashadi). Private Packagist/Satis teglarni indekslaydi. Monorepo: bir repo'da ko'p paket — `path` rivojlanishda, nashrda alohida teglar yoki split.",
    "",
    "### Xavfsizlik",
    "- Token'lar minimal huquqli (read-only), rotatsiya.",
    "- `secure-http: true` (default): HTTPS faqat.",
    "- Ichki paket nomlarini ommaviy Packagist'da band qiling yoki repository `only` cheklovi.",
    "- Lock'ni tekshirish: `composer install` private paketni topmasa 404/auth xatosi.",
    "",
    "### Qoidalar",
    "1. Kreditlar `auth.json`/env'da, git'da emas.",
    "2. Rivojlanishda `path`, production/CI'da teg/registry.",
    "3. Ichki repository'larni ommaviy bilan to'qnashuvdan himoyalang.",
    "4. Teglarni SemVer bilan yuriting."
  ],
  "examples": [
    {
      "title": "Repository va auth",
      "lang": "json",
      "note": "vcs + path",
      "code": [
        "{",
        "  \"repositories\": [",
        "    { \"type\": \"vcs\", \"url\": \"git@gitlab.com:acme/billing-sdk.git\" },",
        "    { \"type\": \"path\", \"url\": \"../shared/*\", \"options\": { \"symlink\": true } }",
        "  ],",
        "  \"require\": { \"acme/billing-sdk\": \"^1.2\", \"acme/shared-ui\": \"@dev\" }",
        "}"
      ]
    },
    {
      "title": "CI da token",
      "lang": "bash",
      "note": "COMPOSER_AUTH",
      "code": [
        "export COMPOSER_AUTH='{\"gitlab-token\":{\"gitlab.com\":\"'\"$CI_READ_TOKEN\"'\"}}'",
        "composer config store-auths false",
        "composer install --no-interaction --prefer-dist",
        "# auth.json lokal: composer config --auth gitlab-token.gitlab.com <token>   (git'ga qo'shilmasin!)"
      ]
    }
  ],
  "pitfalls": [
    "`auth.json` yoki tokenni git'ga commit qilish: kredit sizadi; tarixdan o'chirish va token'ni almashtirish kerak.",
    "`path` repository bilan o'rnatilgan paketni lock'da qoldirib production'ga chiqarish: u yerda katalog yo'q.",
    "Ichki paket nomi ommaviy Packagist'dagi bilan bir xil: dependency confusion; vendor-prefiks va repository cheklovi.",
    "`version` maydonini `composer.json` ga qo'lda yozish: git tegi bilan to'qnashadi.",
    "CI'da token'ni log'ga chiqarish yoki `store-auths` bilan diskka qoldirish.",
    "Katta huquqli (write) token bilan o'qishni bajarish: kerakli minimal huquq."
  ]
});
