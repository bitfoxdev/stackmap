/* Chuqur dars: 35.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.3", {
  "lesson": [
    "### GitLab da professional Code Review madaniyati",
    "Code review — faqat xatolarni izlash emas, balki jamoada bilim almashish, arxitektura standartlarini muhofaza qilish va kod sifatini bir xil yuqori darajada ushlab turish vositasidir. GitLab bu jarayonni o'ta qulay qiluvchi maxsus interaktiv asboblarni taqdim etadi.",
    "",
    "### Asosiy review vositalari",
    "- **Qatorga va ko'p qatorga izoh**: Diff sahifasida bir yoki bir nechta qatorni sichqoncha bilan belgilab, aniq kontekstga yo'naltirilgan fikr qoldirish.",
    "- **Suggestion bloklari**: Reviewer shunchaki \"buni o'zgartiring\" deb yozmasdan, taklif qilinayotgan to'g'ri kodni yozib beradi. Muallif bitta tugmani bosish (`Apply suggestion`) orqali ushbu kodni to'g'ridan-to'g'ri yangi commit sifatida qabul qila oladi.",
    "- **Start a review (Batch review)**: Eng muhim qoida! Reviewer har bir izoh yozganda muallifga alohida bildirishnoma yuborishi uning ishini bo'ladi. \"Start a review\" rejimi barcha izohlarni qoralama (draft) holda yig'ib, umumiy xulosa bilan bir vaqtda chop etish imkonini beradi.",
    "- **Threadlarni resolve qilish**: Muhokama qilingan har bir masala qat'iy yopilishi (`Resolve thread`) shart qilib belgilanishi mumkin. Agar bitta hal etilmagan savol qolsa ham, GitLab merge tugmasini bloklaydi.",
    "",
    "### Avtomatlashtirilgan tekshiruvlar yordami",
    "Inson ko'zi uslubiy nuqsonlarni (bo'shliqlar, qavslar, PSR standartlari) tekshirishga vaqt sarflamasligi kerak. GitLab CI/CD orqali linterlar (Pint, PHP-CS-Fixer) va statik analizatorlar (Larastan) avtomatik ishga tushib, xatolarni bevosita MR ning o'zida widget ko'rinishida ko'rsatadi."
  ],
  "examples": [
    {
      "title": "GitLab Suggestion bloki sintaksisi",
      "lang": "markdown",
      "code": [
        "N+1 muammosini oldini olish uchun bog'liqlikni eager loading bilan yuklaymiz:",
        "",
        "```suggestion",
        "$orders = $user->orders()->with('items.product')->latest()->get();",
        "```",
        "",
        "Iltimos, ushbu yondashuvni qo'llab ko'ring."
      ],
      "note": "Muallif diff oynasida 'Apply suggestion' tugmasi orqali buni bir zumda commit qiladi."
    },
    {
      "title": "Kodni qat'iy qabul qilish sozlamalari",
      "lang": "text",
      "code": [
        "Merge checks:",
        "  [x] Pipelines must succeed",
        "  [x] All threads must be resolved",
        "Merge request approvals:",
        "  - Minimum eligible approvals: 2",
        "  - Code Owner approval required: Yes"
      ],
      "note": "Barcha savollar to'liq yopilmaguncha kod productionga o'ta olmaydi."
    }
  ],
  "pitfalls": [
    "Bitta-bitta izoh yuborib muallifning pochta qutisini to'ldirish: doimo 'Start a review' rejimida ishlang.",
    "Linter qiladigan ishlarni (probellarni) qo'lda tekshirib vaqt yo'qotish: formatlashni CI botlarga yuklang.",
    "Muammo amalda hal qilinmasdan turib, 'tuzatildi' deb threadni yuzaki yopib yuborish."
  ]
});
