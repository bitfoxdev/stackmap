/* Chuqur dars: 34.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.8", {
  "lesson": [
    "### Secret'lar",
    "Secret — workflow'da ishlatiladigan shifrlangan maxfiy qiymat: API kalit, deploy kaliti, parol. Ular repozitoriyda ochiq saqlanmaydi.",
    "",
    "### Darajalar",
    "- **Repository secret**: shu repo'ning barcha workflow'lari ko'radi.",
    "- **Environment secret**: faqat shu environment'ga (masalan, `production`) murojaat qilgan job ko'radi. **Eng xavfsiz tanlov** production kalitlari uchun.",
    "- **Organization secret**: tanlangan repolar uchun umumiy.",
    "",
    "### Ishlatish",
    "Workflow'da `${{ secrets.NAME }}` orqali olinadi, odatda `env:` bilan buyruqqa beriladi. GitHub log'larda ularning qiymatini avtomatik **niqoblaydi** (`***`). Lekin niqoblash mukammal emas: qiymatni o'zgartirib (base64, bo'lib) chiqarsangiz, ko'rinib qolishi mumkin.",
    "",
    "### Fork PR'lar",
    "Fork'dan kelgan PR'larda secret'lar **berilmaydi** (begona kod ularni o'g'irlamasligi uchun). Dependabot PR'lariga alohida Dependabot secret'lari beriladi.",
    "",
    "### Xavfsizlik qoidalari",
    "- **Minimal ko'rinish**: production secret'ini faqat deploy job'iga, environment orqali bering.",
    "- **Muntazam aylantirish** (rotation) va sizsa darhol almashtirish.",
    "- **OIDC**: uzoq muddatli bulut kalitlari (AWS, GCP) o'rniga qisqa muddatli token (workflow identifikatsiyasi orqali). Kalit saqlash kerak emas.",
    "- Secret'ni `echo` qilmang, fayl sifatida artefaktga qo'ymang.",
    "- Uchinchi tomon action'ga ortiqcha secret bermang.",
    "",
    "### Secret scanning va push protection",
    "GitHub repozitoriyga tushgan kalitlarni topadi (secret scanning) va push paytida bloklaydi (push protection). Bu eng arzon va samarali himoya qatlamlaridan.",
    "",
    "### Lokal ishlab chiqish",
    "Lokal `.env` repozitoriyga kirmaydi (`.gitignore`). CI uchun test muhiti secret'lari soxta yoki sandbox qiymatlar bo'lsin."
  ],
  "examples": [
    {
      "title": "Secret'ni env orqali berish",
      "lang": "yaml",
      "code": [
        "- name: Deploy",
        "  run: ./deploy.sh",
        "  env:",
        "    DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}"
      ],
      "note": "Qiymat log'da niqoblanadi, lekin `echo` qilmang."
    },
    {
      "title": "OIDC bilan AWS (kalit saqlamasdan)",
      "lang": "yaml",
      "code": [
        "permissions:",
        "  id-token: write",
        "  contents: read",
        "",
        "steps:",
        "  - uses: aws-actions/configure-aws-credentials@v4",
        "    with:",
        "      role-to-assume: arn:aws:iam::123456789012:role/gha-deploy",
        "      aws-region: eu-central-1"
      ],
      "note": "Uzoq muddatli AWS kalit o'rniga qisqa muddatli token olinadi."
    }
  ],
  "pitfalls": [
    "Production secret'ini repo darajasida saqlash: har workflow va har PR job'i ko'rishi mumkin. Environment secret ishlating.",
    "Secret'ni log'ga chiqarish yoki o'zgartirib echo qilish: niqoblash ushlamaydi.",
    "Uzoq muddatli bulut kalitlarini saqlash: OIDC bilan almashtiring.",
    "Sizib chiqqan secret'ni faqat o'chirib qo'yish: uni darhol almashtirish (revoke) shart."
  ]
});
