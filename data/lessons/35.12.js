/* Chuqur dars: 35.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.12", {
  "lesson": [
    "### GitLab Releases arxitekturasi",
    "Git tizimidagi oddiy git tag faqat ma'lum bir commitga ko'rsatilgan ishora hisoblanadi. **GitLab Release** esa ushbu tag ustiga qurilgan, relizning to'liq tavsifi (Changelog), unga biriktirilgan binary assetlar, hisobotlar va o'zgarmas dalillarni (Evidence) o'zida jamlagan rasmiy mahsulot versiyasidir.",
    "",
    "### Asosiy komponentlar",
    "- **Changelog**: Ushbu relizda qanday yangi xususiyatlar qo'shildi, qaysi xatolar tuzatildi va qanday buzuvchi o'zgarishlar (breaking changes) bor. GitLab Changelog API commit xabarlaridagi trailerlar (masalan `Changelog: added`) yoki Conventional Commits asosida avtomatik o'zgarishlar ro'yxatini shakllantiradi.",
    "- **Release Assets**: Kompilyatsiya qilingan binary fayllar, zip arxivlar, Docker image havolalari yoki Package Registry dagi paketlarga to'g'ridan-to'g'ri havolalar.",
    "- **Release Evidence (Audit isboti)**: Reliz yaratilgan lahzada loyihaning holati, xavfsizlik testlari natijalari va imzolangan ma'lumotlarning JSON formati o'zgarmas arxivga saqlanadi. Bu korporativ xavfsizlik auditi uchun muhimdir.",
    "",
    "### CI/CD orqali relizni avtomatlashtirish",
    "Zamonaviy yondashuvda relizni qo'lda UI orqali yaratilmaydi. Loyihaga yangi Git tag (masalan `v1.4.0`) push qilinganda, CI/CD pipeline dagi maxsus job avtomatik ishga tushadi va `release-cli` vositasi orqali to'laqonli reliz sahifasini hosil qiladi."
  ],
  "examples": [
    {
      "title": ".gitlab-ci.yml da avtomatlashtirilgan Release jobi",
      "lang": "yaml",
      "code": [
        "create_release:",
        "  stage: deploy",
        "  image: registry.gitlab.com/gitlab-org/release-cli:latest",
        "  rules:",
        "    - if: $CI_COMMIT_TAG",
        "  script:",
        "    - echo \"Creating official release for $CI_COMMIT_TAG\"",
        "  release:",
        "    tag_name: '$CI_COMMIT_TAG'",
        "    name: 'Release $CI_COMMIT_TAG'",
        "    description: 'Reliz avtomatik ravishda pipeline tomonidan yaratildi.'",
        "    assets:",
        "      links:",
        "        - name: 'Docker Image'",
        "          url: 'https://$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG'"
      ],
      "note": "Faqat tag push qilinganda ishlaydi va release sahifasini yaratadi."
    },
    {
      "title": "Changelog traileri bilan commit qilish",
      "lang": "bash",
      "code": [
        "$ git commit -m \"feat(auth): add two-factor authentication support",
        "",
        "Changelog: added\""
      ],
      "note": "GitLab API ushbu commitni avtomatik ravishda reliz tavsifiga kiritadi."
    }
  ],
  "pitfalls": [
    "Katta hajmdagi zip yoki tar.gz arxivlarini to'g'ridan-to'g'ri git repozitoriy ichiga commit qilish: git repozitoriy hajmi shishib ketadi (o'rniga Release Assets yoki Package Registry ishlating).",
    "Taglarni semantik versiyalash qoidalarisiz (SemVer) noizchil nomlash (masalan 'v1', 'reliz_yangi', 'prod').",
    "Changelog yuritmasdan reliz chiqarish: boshqa dasturchilar nimalar o'zgarganini kod diff orqali qidirishga majbur bo'ladi."
  ]
});
