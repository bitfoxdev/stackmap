/* Chuqur dars: 33.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.4", {
  "lesson": [
    "### Branch nima uchun",
    "Branch mustaqil ish chizig'i: yangi xususiyat yoki tuzatishni asosiy kodga tegmasdan ishlaysiz. Yaratish: `git switch -c feature/x`, o'chirish: `git branch -d feature/x`.",
    "",
    "### Strategiyalar",
    "- **GitHub Flow**: `main` doim deploy qilinadigan holatda, ish qisqa feature branch'larda, PR orqali birlashadi. Oddiy va ko'p jamoalar uchun yetarli.",
    "- **GitFlow**: `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`. Rejali relizlar va bir nechta versiya uchun, lekin murakkab va sekin.",
    "- **Trunk-based development**: juda qisqa (soatlar) branch'lar yoki to'g'ridan-to'g'ri `main`, tugallanmagan ish **feature flag** ortida. CI/CD va tez yetkazib berish uchun ideal, kuchli CI va test madaniyatini talab qiladi.",
    "",
    "### Umumiy qoidalar",
    "- **Qisqa umrli branch'lar** (kunlar). Uzoq branch'da konfliktlar va integratsiya xavfi o'sadi.",
    "- `main` doim ishlaydigan holatda.",
    "- **Nomlash konvensiyasi**: `feature/`, `fix/`, `chore/`, `hotfix/` va tiket raqami: `feature/PAY-142-refund-endpoint`.",
    "- Birlashtirilgan branch'ni o'chiring.",
    "",
    "### Tanlash",
    "Veb-ilova va uzluksiz deploy: GitHub Flow yoki trunk-based. Bir vaqtda bir nechta versiyani qo'llab-quvvatlash (kutubxona, on-premise): release branch'lar kerak. Strategiya jamoa hajmi, release ritmi va CI sifatiga bog'liq.",
    "",
    "### Upstream",
    "`git push -u origin branch` lokal branch'ni remote bilan bog'laydi (`-u` bir marta), keyin `git push` va `git pull` argumentsiz ishlaydi."
  ],
  "examples": [
    {
      "title": "Feature branch ishi",
      "lang": "bash",
      "code": [
        "git switch main && git pull --ff-only",
        "git switch -c feature/PAY-142-refund-endpoint",
        "# ... commit'lar ...",
        "git push -u origin feature/PAY-142-refund-endpoint"
      ],
      "note": "Yangi branch yangilangan main'dan ochiladi."
    },
    {
      "title": "Branch'larni boshqarish",
      "lang": "bash",
      "code": [
        "git branch -vv                       # lokal branch'lar va upstream",
        "git branch --merged main             # main'ga qo'shilganlar (o'chirsa bo'ladi)",
        "git branch -d feature/old            # birlashtirilgan bo'lsa o'chiradi",
        "git push origin --delete feature/old # remote'dan o'chirish"
      ],
      "note": "`-d` birlashtirilmagan branch'ni o'chirmaydi, `-D` majburan o'chiradi."
    }
  ],
  "pitfalls": [
    "Haftalab yashaydigan branch'lar: konfliktlar va integratsiya xavfi o'sadi.",
    "GitFlow'ni kerak bo'lmasa ham qo'llash: oddiy veb-ilova uchun ortiqcha murakkablik.",
    "Branch nomlash qoidasi yo'qligi: tarixda va PR ro'yxatida nima ekanini tushunish qiyin.",
    "`main` ni buzuq holatda qoldirish: hamma undan branch ochadi va muammo ko'payadi."
  ]
});
