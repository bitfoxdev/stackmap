/* Chuqur dars: 33.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.20", {
  "lesson": [
    "### Himoyalangan branch",
    "Branch protection — `main`, `release/*` kabi muhim branch'larga **majburiy qoidalar**. Ular \"inson xatosi\" va beparvo o'zgarishlardan himoya qiladi hamda sifat darvozalarini (testlar, review) chetlab o'tib bo'lmaydigan qiladi.",
    "",
    "### Odatiy qoidalar",
    "- **To'g'ridan-to'g'ri push taqiqlangan**: faqat PR orqali.",
    "- **Kamida N ta tasdiq** (odatda 1–2).",
    "- **CODEOWNERS tasdig'i**: muhim fayllar (to'lov, xavfsizlik) tegishli egasi ko'rib chiqishi shart.",
    "- **Status check'lar majburiy**: testlar, PHPStan, Pint o'tishi kerak.",
    "- **Branch yangilangan bo'lishi**: PR `main` ning oxirgi holatiga asoslangan bo'lsin (yoki merge queue).",
    "- **Force push va o'chirish taqiqlangan**.",
    "- **Imzolangan commit'lar** (talab qilinsa).",
    "- **Chiziqli tarix** (merge commit taqiqlanadi, squash yoki rebase majburiy).",
    "- Muhokamalar (review izohlari) hal qilingan bo'lishi.",
    "",
    "### Nega muhim",
    "Qoida faqat \"kelishuv\" bo'lsa, shoshilinch paytda uni buzish oson. Platforma darajasidagi himoya buzishga yo'l qo'ymaydi. Bu ayniqsa `main` doim deploy qilinadigan bo'lsa zarur.",
    "",
    "### Adminlar uchun",
    "Qoidalar adminlarga ham tegishli bo'lsin (\"include administrators\"). Aks holda istisno odatga aylanadi. Haqiqiy favqulodda vaziyat uchun hujjatlangan, kuzatiladigan yo'l bo'lsin.",
    "",
    "### CODEOWNERS",
    "`CODEOWNERS` fayli yo'llarga mas'ul jamoalarni belgilaydi. PR shu fayllarni o'zgartirsa, egalari avtomatik review'ga qo'shiladi va (qoida yoqilgan bo'lsa) tasdig'i shart.",
    "",
    "### Merge queue",
    "Katta jamoada ko'p PR bir vaqtda merge bo'lsa, har biri o'z holatida yashil, birga esa buzuq bo'lishi mumkin. **Merge queue** PR'larni ketma-ket, yangi `main` ustida qayta tekshirib, merge qiladi."
  ],
  "examples": [
    {
      "title": "main uchun qoidalar",
      "lang": "text",
      "code": [
        "main:",
        "  [x] Require a pull request before merging (1 approval)",
        "  [x] Require review from Code Owners",
        "  [x] Require status checks: tests, phpstan, pint",
        "  [x] Require branches to be up to date before merging",
        "  [x] Require conversation resolution",
        "  [x] Do not allow bypassing the above settings   (adminlar ham)",
        "  [ ] Allow force pushes / deletions"
      ],
      "note": "GitHub: Settings -> Branches -> Branch protection rule. GitLab: Protected branches."
    },
    {
      "title": "CODEOWNERS",
      "lang": "text",
      "code": [
        "# .github/CODEOWNERS",
        "*                       @org/backend",
        "/app/Billing/           @org/payments-team",
        "/database/migrations/   @org/backend-leads",
        "/.github/workflows/     @org/devops"
      ],
      "note": "Muhim yo'llar uchun tegishli jamoa review'ga avtomatik qo'shiladi."
    }
  ],
  "pitfalls": [
    "Qoidalarni adminlarga qo'llamaslik: istisno odatga aylanib, himoya ma'nosiz bo'ladi.",
    "Status check'larni majburiy qilmaslik: qizil CI bilan ham merge qilish mumkin bo'ladi.",
    "CODEOWNERS ni eskirgan holda qoldirish: ketgan odamlar yoki mavjud bo'lmagan jamoalar review'ni to'sib qo'yadi.",
    "Qoidalarni juda qattiq qilish va favqulodda yo'lsiz qoldirish: shoshilinch hotfix paytida jamoa uni aylanib o'tadi."
  ]
});
