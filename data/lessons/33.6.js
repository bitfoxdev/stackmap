/* Chuqur dars: 33.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.6", {
  "lesson": [
    "### Rebase nima",
    "Rebase branch commit'larini **boshqa asosga ko'chirib qayta yozadi**. `git rebase main` feature branch'ning commit'larini olib, `main` ning oxiriga birin-ketin qayta qo'llaydi. Natija: tarix chiziqli, merge commit yo'q.",
    "",
    "### Muhim: SHA o'zgaradi",
    "Rebase paytida commit'lar **yangi** nusxalari yaratiladi (boshqa ota'li), shuning uchun ularning SHA'si o'zgaradi. Eski commit'lar tashlab yuboriladi. Bu tarixni qayta yozish demak.",
    "",
    "### Oltin qoida",
    "**Boshqalar ishlatayotgan umumiy tarixni rebase qilmang.** `main` yoki boshqalar undan branch ochgan push qilingan branch'ni rebase qilsangiz, ularning tarixi sizniki bilan mos kelmay qoladi va chalkashlik boshlanadi. Rebase **shaxsiy** feature branch uchun mos: uni `main` ning yangi holatiga moslash.",
    "",
    "### Rebase va merge farqi",
    "- **Merge**: tarixni saqlaydi, merge commit qo'shadi. Xavfsiz, lekin graf murakkablashadi.",
    "- **Rebase**: tarixni chiziqli qiladi, lekin qayta yozadi. Toza, lekin ehtiyot talab qiladi.",
    "",
    "### Push qilingan branch'ni rebase'dan keyin",
    "Branch allaqachon remote'da bo'lsa, rebase'dan keyin oddiy push rad etiladi (tarix farq qiladi). `git push --force-with-lease` ishlatiladi: u faqat remote'da **siz bilmagan** o'zgarish bo'lmasa yozadi. Oddiy `--force` boshqa odamning push qilgan ishini jimgina o'chirishi mumkin.",
    "",
    "### Konflikt",
    "Rebase paytida konflikt chiqsa, har commit uchun alohida hal qilinadi: `git add`, keyin `git rebase --continue`. Bekor qilish: `git rebase --abort`. Eslatma: rebase paytida `ours` va `theirs` ma'nosi **teskari** (ours — asos, theirs — sizning commit'ingiz)."
  ],
  "examples": [
    {
      "title": "Feature'ni main'ga moslash",
      "lang": "bash",
      "code": [
        "git fetch origin",
        "git rebase origin/main",
        "# konflikt bo'lsa: hal qiling, git add ..., git rebase --continue",
        "git push --force-with-lease"
      ],
      "note": "--force-with-lease boshqaning push'ini tasodifan o'chirmaydi."
    },
    {
      "title": "Xavfsiz tekshiruv",
      "lang": "bash",
      "code": [
        "git branch backup-before-rebase     # zaxira",
        "git rebase origin/main",
        "git range-diff backup-before-rebase...HEAD   # rebase nimani o'zgartirganini solishtirish",
        "git rebase --abort                           # kerak bo'lsa to'xtatish"
      ],
      "note": "Zaxira branch rebase xatosidan oson qaytish imkonini beradi."
    }
  ],
  "pitfalls": [
    "`main` yoki umumiy branch'ni rebase qilish: boshqalarning tarixi buziladi.",
    "`git push --force` ishlatish: remote'dagi begona push'larni o'chirib yuborishi mumkin. `--force-with-lease` ishlating.",
    "Rebase paytida `ours/theirs` ni merge'dagidek tushunish: ular teskari, noto'g'ri tomon tanlanadi.",
    "Konfliktli rebase'ni yarmida tashlab ketish: repozitoriy \"rebase jarayonida\" holatda qoladi, `--abort` yoki `--continue` kerak."
  ]
});
