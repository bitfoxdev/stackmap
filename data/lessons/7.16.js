/* Chuqur dars: 7.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.16", {
  "lesson": [
    "### Tamoyillar",
    "1. **Kichik va tez-tez**: har hafta/ikki haftada patch/minor; \"katta portlash\"dan arzon.",
    "2. **Yangilash alohida PR'da**, boshqa ishlardan ajratilgan (regressiyani topish oson).",
    "3. **Avtomatlashtirish**: Dependabot yoki Renovate PR ochadi; CI testlar va `composer audit` ni ishga tushiradi.",
    "4. **Himoya**: yaxshi test qoplamasi; staging; bosqichli deploy.",
    "5. **Rejalashtirish**: major (Laravel, PHP) alohida loyiha (2.28).",
    "",
    "### Buyruqlar",
    "- `composer outdated --direct` (`-m` minor-only, `-p` patch-only, `-M` major-only; `--strict` — eskirgan bo'lsa exit≠0). Rang: sariq — semver-buzuvchi yangilash bor; qizil — semver-mos yangilash bor.",
    "- `composer update vendor/pkg --dry-run`, so'ng `update vendor/pkg` (7.7); `-W` ehtiyotkorlik bilan.",
    "- `composer update --minimal-changes` (`-m`): faqat zarur o'zgarishlar.",
    "- `composer bump` — pastki chegaralarni o'rnatilgan versiyaga ko'tarish; **kutubxonada ko'r-ko'rona emas** (docs; `--dev-only` xavfsizroq). `config.bump-after-update` — avtomatik bump.",
    "- `composer audit` (7.13) har yangilashda.",
    "",
    "### Renovate/Dependabot",
    "Guruhlash: `patch+minor` bitta PR, `major` alohida, `require-dev` alohida; `schedule` (haftada bir), `stabilityDays`/`minimumReleaseAge` (yangi versiyani bir necha kun kutish: supply-chain himoyasi), `lockFileMaintenance`. PHP/Laravel major'larni qo'lda (label bilan).",
    "Composer docs yangi `policy.cooldown.period` (masalan `\"7 days\"`) sozlamasini tasvirlaydi: yangi chiqqan versiyalar belgilangan muddatdan keyin o'rnatilishi; `--no-cooldown` bilan bir martalik chetlab o'tish. Bu imkoniyat sizning Composer versiyangizda bor-yo'qligini `composer --version` va docs bilan tekshiring.",
    "",
    "### Tartib",
    "1. Dushanba: bot PR'lari ko'riladi (patch/minor guruh).",
    "2. CI yashil + audit yashil → staging → production.",
    "3. Major: alohida branch, upgrade guide, kanareyka.",
    "4. Muammoli paket: `conflict`/pin vaqtincha, issue qo'ying.",
    "5. Abandoned → almashtirish rejasi.",
    "",
    "### Qoidalar",
    "1. Yangilash alohida, kichik, testlangan.",
    "2. Avtomatik PR + majburiy CI.",
    "3. Major'lar rejali; yangi versiyani darhol emas, bir oz kutib oling.",
    "4. Lock va `composer.json` bir PR'da."
  ],
  "examples": [
    {
      "title": "Renovate",
      "lang": "json",
      "note": "renovate.json",
      "code": [
        "{",
        "  \"extends\": [\"config:recommended\"],",
        "  \"schedule\": [\"before 6am on monday\"],",
        "  \"packageRules\": [",
        "    { \"matchManagers\": [\"composer\"], \"matchUpdateTypes\": [\"patch\", \"minor\"], \"groupName\": \"composer minor+patch\", \"minimumReleaseAge\": \"3 days\" },",
        "    { \"matchManagers\": [\"composer\"], \"matchUpdateTypes\": [\"major\"], \"dependencyDashboardApproval\": true },",
        "    { \"matchDepTypes\": [\"require-dev\"], \"groupName\": \"dev dependencies\" }",
        "  ],",
        "  \"lockFileMaintenance\": { \"enabled\": true }",
        "}"
      ]
    },
    {
      "title": "CI tekshiruvlari",
      "lang": "bash",
      "note": "outdated va audit",
      "code": [
        "composer outdated --direct --minor-only --strict   # eskirgan direct bor bo'lsa fail",
        "composer audit --locked",
        "composer update --dry-run                          # nima o'zgarishini oldindan ko'rish"
      ]
    }
  ],
  "pitfalls": [
    "Yangilashni yillab kechiktirib keyin hammasini birdan ko'tarish: katta regressiya va konflikt.",
    "Bot PR'larini testsiz/ko'rmasdan merge qilish: regressiya va zararli paket xavfi.",
    "Bir PR'da ko'p major'ni yangilash: sababni topib bo'lmaydi.",
    "`composer bump` ni kutubxonada ko'r-ko'rona ishlatish: moslikni keraksiz toraytiradi.",
    "Yangi chiqqan versiyani darhol production'ga olish: maintainer akkaunti buzilishi (supply chain) xavfi; kutish davri yoki review.",
    "Abandoned paket uchun reja qilmaslik: yangilanish to'xtaydi, xavfsizlik zaifliklari qoladi."
  ]
});
