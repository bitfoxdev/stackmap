/* Chuqur dars: 33.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.10", {
  "lesson": [
    "### Konflikt nima",
    "Konflikt — ikki branch **bir xil joyni turlicha** o'zgartirganda Git avtomatik birlashtira olmasligi. Bu normal hodisa, xato emas. Git faylni markerlar bilan belgilaydi:",
    "- `<<<<<<< HEAD`: joriy branch versiyasi.",
    "- `=======`: ajratuvchi.",
    "- `>>>>>>> branch`: kiruvchi versiya.",
    "",
    "### Qanday hal qilinadi",
    "1. Konfliktli fayllarni toping: `git status` yoki `git diff --name-only --diff-filter=U`.",
    "2. Har joyda **ikkala tomonning maqsadini** tushuning. Faqat \"qaysi qatorlar qolsin\" emas: har o'zgarish nima uchun qilingan?",
    "3. To'g'ri birlashtirilgan kodni yozing, markerlarni olib tashlang.",
    "4. **Testlarni ishga tushiring**: kod kompilyatsiya bo'lsa ham mantiqan noto'g'ri bo'lishi mumkin.",
    "5. `git add`, keyin `git merge --continue` yoki `git rebase --continue`.",
    "",
    "### Vositalar",
    "- IDE merge tool (3 oynali ko'rinish: ours, theirs, natija).",
    "- `git mergetool`.",
    "- `git checkout --ours <fayl>` / `--theirs <fayl>`: butun faylni bir tomondan olish. Merge'da ours — joriy branch, **rebase'da teskari**.",
    "- `rerere` (`rerere.enabled true`): bir xil konflikt yechimini eslab qolib, takroriy konfliktlarda avtomatik qo'llaydi. Uzoq rebase'larda juda foydali.",
    "",
    "### Konfliktlarni kamaytirish",
    "- Qisqa umrli branch'lar.",
    "- `main` bilan tez-tez sinxronlash.",
    "- Katta formatlash o'zgarishlarini (Pint, qayta nomlash) alohida PR qilish.",
    "- Bir faylni bir vaqtda ko'p odam o'zgartirmasligi uchun kodni kichik modullarga bo'lish.",
    "",
    "### Xavfli joylar",
    "Avtomatik merge ham mantiqiy konflikt keltirishi mumkin (ikkala tomon bir xil funksiyani turlicha o'zgartirib, matnan konflikt yo'q). Shu sabab merge'dan keyin CI va testlar muhim."
  ],
  "examples": [
    {
      "title": "Konfliktni hal qilish ish tartibi",
      "lang": "bash",
      "code": [
        "git merge origin/main              # CONFLICT (content): Merge conflict in app/Models/Order.php",
        "git diff --name-only --diff-filter=U # konfliktli fayllar",
        "# faylni tahrirlang, markerlarni olib tashlang",
        "php artisan test",
        "git add app/Models/Order.php",
        "git merge --continue"
      ],
      "note": "Testlarni qo'shish mantiqiy konfliktni ushlaydi."
    },
    {
      "title": "rerere va bekor qilish",
      "lang": "bash",
      "code": [
        "git config --global rerere.enabled true   # takroriy yechimlarni eslab qoladi",
        "git checkout --theirs composer.lock       # butun faylni kiruvchi tomondan olish (merge'da)",
        "composer install                          # lock fayl uchun odatda qayta yaratish yaxshiroq",
        "git merge --abort                         # hammasini bekor qilish"
      ],
      "note": "composer.lock kabi generatsiya fayllarini qo'lda birlashtirmang."
    }
  ],
  "pitfalls": [
    "Markerlarni qoldirib commit qilish: kod buziladi. Commit'dan oldin `git diff --check` yoki qidiruv bilan tekshiring.",
    "Faqat \"ours/theirs\" bilan yopish: bir tomonning ishi jimgina yo'qoladi.",
    "Hal qilingandan keyin testlarni yurgizmaslik: matnan to'g'ri, mantiqan noto'g'ri birlashma o'tib ketadi.",
    "`composer.lock` yoki generatsiya fayllarini qo'lda birlashtirish: tegishli komanda bilan qayta yarating."
  ]
});
