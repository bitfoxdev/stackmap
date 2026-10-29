/* Chuqur dars: 33.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.3", {
  "lesson": [
    "### Yaxshi commit",
    "Commit — mantiqiy va yaxlit o'zgarish birligi. Yaxshi commit:",
    "- **Bitta maqsad** (xususiyat, tuzatish yoki refactoring, aralashtirilmagan).",
    "- Loyiha **build bo'ladi va testlar o'tadi** (bisect va revert uchun muhim).",
    "- **Tushunarli xabar**.",
    "",
    "### Xabar tuzilishi",
    "- **Sarlavha**: qisqa (50–72 belgigacha), buyruq maylida (\"fix\", \"add\", \"prevent\"), oxirida nuqta yo'q.",
    "- **Bo'sh qator**.",
    "- **Tana**: **nega** shunday qilinganini tushuntiradi (nima o'zgargani diff'da ko'rinadi). Muammo, qaror, kerak bo'lsa muqobillar.",
    "",
    "### Conventional Commits",
    "`type(scope): sarlavha` formati: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`. Buzuvchi o'zgarish `!` yoki `BREAKING CHANGE:` bilan. Afzalligi: avtomatik changelog va SemVer versiyalash vositalari ishlaydi, tarix o'qilishi oson.",
    "",
    "### amend",
    "`git commit --amend` oxirgi commit'ni tuzatadi (xabar yoki unutilgan fayl). U commit'ni **yangi** SHA bilan almashtiradi, shuning uchun faqat push qilinmagan yoki shaxsiy branch'dagi commit uchun ishlating.",
    "",
    "### Muallif va imzo",
    "Muallif `user.name` va `user.email` dan olinadi, ularni to'g'ri sozlang. `git commit -S` GPG yoki SSH kalit bilan **imzolaydi** (`gpg.format ssh`), platforma \"Verified\" belgisini ko'rsatadi. Bu muallifni ishonchli tasdiqlaydi.",
    "",
    "### Tez-tez uchraydigan xato",
    "\"fix\", \"update\", \"wip\" kabi ma'nosiz xabarlar. Olti oydan keyin `git blame` shu xabarni ko'rsatganda, nega o'zgartirilgani noma'lum."
  ],
  "examples": [
    {
      "title": "Yaxshi commit xabari",
      "lang": "text",
      "code": [
        "fix(billing): prevent double invoice on webhook retry",
        "",
        "Payme webhook'i timeout'dan keyin qayta yuborilganda bitta buyurtma uchun",
        "ikkita hisob-faktura yaratilardi. Endi event_id unique constraint bilan",
        "deduplikatsiya qilinadi.",
        "",
        "Refs: PAY-142"
      ],
      "note": "Sarlavha nima, tana nega haqida. Tiket havolasi oxirida."
    },
    {
      "title": "Commit'ni tuzatish va imzolash",
      "lang": "bash",
      "code": [
        "git add app/Services/Invoice.php",
        "git commit --amend --no-edit        # unutilgan faylni oxirgi commit'ga qo'shish (push'dan oldin)",
        "git commit -S -m \"feat(refund): add partial refund endpoint\"",
        "git config user.email \"ali@example.uz\""
      ],
      "note": "amend faqat push qilinmagan commit uchun xavfsiz."
    }
  ],
  "pitfalls": [
    "Push qilingan commit'ni `--amend` qilish: tarix o'zgaradi va boshqalar bilan to'qnashuv chiqadi.",
    "Ma'nosiz xabarlar (\"fix\", \"wip\"): keyin sababni topib bo'lmaydi.",
    "Bir commit'da bir nechta mavzu: revert va review qiyinlashadi.",
    "Xabarda faqat \"nima\" yozish: kod buni o'zi ko'rsatadi, \"nega\" esa yo'qoladi."
  ]
});
