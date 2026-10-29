/* Chuqur dars: 34.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.3", {
  "lesson": [
    "### GitHub PR imkoniyatlari",
    "GitHub PR — Git branch'ni muhokama va tekshiruv oqimiga aylantiradi (33.19). Platforma ko'plab qo'shimcha imkoniyat beradi.",
    "",
    "### Asosiy imkoniyatlar",
    "- **Draft PR**: tayyor emas, lekin erta fikr kerak. Merge qilib bo'lmaydi, \"Ready for review\" bosilgach tayyor bo'ladi.",
    "- **Reviewer'lar**: qo'lda yoki CODEOWNERS orqali avtomatik tayinlanadi.",
    "- **Label'lar**: tur, prioritet; changelog toifalashda ham ishlatiladi.",
    "- **Issue'ni avtomatik yopish**: tavsifda `Closes #142` (yoki `Fixes`, `Resolves`), PR merge bo'lganda issue yopiladi.",
    "- **Suggested changes**: reviewer ```suggestion bloki bilan aniq tuzatish taklif qiladi, muallif bir bosishda qabul qiladi.",
    "- **Auto-merge**: shartlar (check'lar, tasdiqlar) bajarilganda PR o'zi merge bo'ladi.",
    "- **Merge queue**: ko'p PR'li repolarda ularni ketma-ket, yangi `main` ustida tekshirib merge qiladi.",
    "- **PR shablonlari**.",
    "",
    "### Merge usullari",
    "Repo darajasida yoqilgan usullardan PR'da tanlanadi: merge commit, squash, rebase (33.5).",
    "",
    "### Auto-merge sharti",
    "Auto-merge repo sozlamasida yoqilgan bo'lishi va branch protection'da majburiy shartlar bo'lishi kerak. Aks holda \"hozir merge\" ruxsat etiladi va auto-merge ma'nosiz.",
    "",
    "### Merge queue va workflow",
    "Merge queue ishlashi uchun CI workflow'lari `merge_group` event'iga ham javob berishi kerak: aks holda queue'dagi PR tekshiruvi ishga tushmaydi va qotib qoladi.",
    "",
    "### gh CLI",
    "`gh pr create`, `gh pr checkout 123`, `gh pr review`, `gh pr merge` bilan PR oqimini terminaldan boshqarish mumkin."
  ],
  "examples": [
    {
      "title": "PR ochish va auto-merge",
      "lang": "bash",
      "code": [
        "gh pr create --draft --title \"feat: refund endpoint\" --body-file .github/pr.md",
        "gh pr ready                                 # draftdan chiqarish",
        "gh pr merge 142 --squash --auto --delete-branch   # check'lar o'tgach o'zi merge"
      ],
      "note": "--auto repo sozlamasida auto-merge yoqilgan bo'lishini talab qiladi."
    },
    {
      "title": "merge_group uchun workflow",
      "lang": "yaml",
      "code": [
        "on:",
        "  pull_request:",
        "  merge_group:        # merge queue uchun majburiy",
        "",
        "jobs:",
        "  tests:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - run: composer install --no-interaction --prefer-dist",
        "      - run: php artisan test --parallel"
      ],
      "note": "merge_group bo'lmasa, queue'dagi PR check'lari hech qachon ishga tushmaydi."
    }
  ],
  "pitfalls": [
    "Merge queue yoqib, workflow'ga `merge_group` qo'shishni unutish: PR'lar queue'da qotib qoladi.",
    "Auto-merge'ni required check'larsiz ishlatish: shartsiz darhol merge bo'ladi.",
    "Draft PR'ni cheksiz davom ettirish: review kutayotganlar uchun noaniqlik. Tayyor bo'lganda ready qiling.",
    "Issue'ni yopuvchi so'zni PR sarlavhasida kutish: kalit so'z tavsifda (yoki commit xabarida) bo'lishi kerak."
  ]
});
