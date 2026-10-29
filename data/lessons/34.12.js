/* Chuqur dars: 34.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.12", {
  "lesson": [
    "### Dependabot",
    "Dependabot dependency'larni **avtomatik yangilaydi** va zaif versiyalar haqida ogohlantiradi. Eskirgan paketlar xavfsizlik va barqarorlik xavfi, lekin qo'lda kuzatish qiyin.",
    "",
    "### Ikki funksiya",
    "- **Version updates**: yangi versiya chiqqanda avtomatik PR (`dependabot.yml` bilan sozlanadi).",
    "- **Security updates**: zaiflik topilgan paket uchun darhol tuzatuvchi PR (repo sozlamasidan yoqiladi).",
    "- **Dependabot alerts**: zaif dependency'lar ro'yxati va ogohlantirishlar.",
    "",
    "### dependabot.yml",
    "`.github/dependabot.yml` quyidagilarni belgilaydi:",
    "- **ekotizimlar**: `composer`, `npm`, `github-actions`, `docker`.",
    "- **jadval**: kunlik, haftalik, oylik.",
    "- **groups**: bir PR'da bir nechta bog'liq yangilanish (masalan, barcha `laravel/*` va `illuminate/*`). PR sonini kamaytiradi.",
    "- **ignore**: ma'lum paket yoki versiya turini o'tkazib yuborish (masalan, major).",
    "- **open-pull-requests-limit**: ochiq PR'lar soni.",
    "- **reviewers, labels**: avtomatik tayinlash.",
    "",
    "### Samarali ishlatish",
    "- Kuchli **CI** bo'lsa, minor/patch yangilanishlarni **auto-merge** qilish mumkin, major'larni qo'lda ko'rib chiqing.",
    "- **GitHub Actions** versiyalarini ham yangilab turing: ular ham dependency va supply chain vektori.",
    "- Muhim paketlarni guruhlab, birga yangilang.",
    "",
    "### Composer nuance'lari",
    "Dependabot `composer.json` dagi cheklov (constraint) doirasida `composer.lock` ni yangilaydi, doiradan chiqish uchun `composer.json` ni o'zgartirgan PR ochadi. `versioning-strategy` sozlamasi bu xatti-harakatni boshqaradi.",
    "",
    "### Shovqinni boshqarish",
    "Cheklovsiz Dependabot yuzlab PR ochib, jamoani charchatadi. Guruhlash, haftalik jadval va limit shovqinni kamaytiradi."
  ],
  "examples": [
    {
      "title": "dependabot.yml",
      "lang": "yaml",
      "code": [
        "version: 2",
        "updates:",
        "  - package-ecosystem: composer",
        "    directory: /",
        "    schedule: { interval: weekly, day: monday }",
        "    open-pull-requests-limit: 5",
        "    groups:",
        "      laravel: { patterns: [\"laravel/*\", \"illuminate/*\"] }",
        "      dev-tools: { dependency-type: development, update-types: [minor, patch] }",
        "    ignore:",
        "      - dependency-name: \"*\"",
        "        update-types: [\"version-update:semver-major\"]",
        "  - package-ecosystem: github-actions",
        "    directory: /",
        "    schedule: { interval: monthly }"
      ],
      "note": "Major yangilanishlar qo'lda, qolganlari guruhlangan."
    },
    {
      "title": "Minor/patch'larni auto-merge",
      "lang": "yaml",
      "code": [
        "name: dependabot-auto-merge",
        "on: pull_request",
        "permissions: { contents: write, pull-requests: write }",
        "jobs:",
        "  auto:",
        "    if: github.actor == 'dependabot[bot]'",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - id: meta",
        "        uses: dependabot/fetch-metadata@v2",
        "      - if: steps.meta.outputs.update-type != 'version-update:semver-major'",
        "        run: gh pr merge --auto --squash \"${{ github.event.pull_request.html_url }}\"",
        "        env: { GH_TOKEN: ${{ secrets.GITHUB_TOKEN }} }"
      ],
      "note": "Merge faqat required check'lar o'tgach bo'ladi."
    }
  ],
  "pitfalls": [
    "Dependabot'ni cheklovsiz yoqish: yuzlab PR jamoani charchatadi. Guruhlang va limit qo'ying.",
    "CI zaif bo'lsa auto-merge: buzuvchi yangilanish tekshirilmay kiradi.",
    "GitHub Actions versiyalarini yangilamaslik: eskirgan action zaif bo'lishi mumkin.",
    "Security alert'larni e'tiborsiz qoldirish: haqiqatan ta'sir qiluvchi zaiflik bo'lib qoladi."
  ]
});
