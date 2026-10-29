/* Chuqur dars: 33.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.19", {
  "lesson": [
    "### Pull Request oqimi",
    "PR (GitHub) yoki MR (GitLab) — o'zgarishni asosiy branch'ga qo'shishdan oldin muhokama, tekshiruv va tasdiq jarayoni. To'liq oqim:",
    "1. Qisqa umrli branch ochish.",
    "2. Kichik, mantiqiy commit'lar.",
    "3. Push va PR ochish: tavsif bilan.",
    "4. **CI tekshiruvlari** avtomatik ishlaydi (testlar, statik tahlil, uslub).",
    "5. **Review**: kamida bitta hamkasb ko'rib chiqadi.",
    "6. Tuzatishlar (qo'shimcha commit'lar yoki fixup).",
    "7. Tasdiq va **merge**.",
    "8. Branch o'chiriladi, deploy.",
    "",
    "### Yaxshi PR tavsifi",
    "- **Nima**: qisqa mazmun.",
    "- **Nega**: biznes yoki texnik sabab, tiket havolasi.",
    "- **Qanday testlandi**: avtomatik va qo'lda.",
    "- Skrinshot (UI uchun), migratsiya yoki deploy eslatmasi, buzuvchi o'zgarishlar.",
    "",
    "### Yaxshi PR xususiyatlari",
    "- **Kichik**: 200–400 qator atrofida. Katta PR sifatli ko'rib chiqilmaydi (\"LGTM\" bilan o'tadi).",
    "- **Bitta maqsad**: aralash o'zgarishlarni ajrating.",
    "- **O'z-o'zini review**: ochishdan oldin o'z diff'ingizni o'qing, debug qoldiqlarini olib tashlang.",
    "- Tiketga bog'langan.",
    "- **Draft PR**: ish tugamasdan erta fikr-mulohaza olish uchun.",
    "",
    "### Katta o'zgarishlar",
    "Katta xususiyatni bo'laklarga bo'ling: **stacked PR**'lar (har biri oldingisiga tayanadi) yoki **feature flag** ortida bosqichma-bosqich `main`ga kiritish. Shunda har PR kichik va xavfsiz.",
    "",
    "### Review madaniyati",
    "Review kodga, odamga emas. Izohlar aniq va konstruktiv, \"nega\" bilan. Muallif tezda javob beradi. Reviewer tez javob beradi (kutish eng katta sekinlashtirish)."
  ],
  "examples": [
    {
      "title": "PR shabloni",
      "lang": "markdown",
      "code": [
        "## Nima",
        "Refund endpoint'i qo'shildi (qisman qaytarish).",
        "",
        "## Nega",
        "PAY-142: operatorlar qisman qaytarishni qo'lda bajarishyapti.",
        "",
        "## Qanday testlandi",
        "- Feature testlar (muvaffaqiyat, validatsiya, ruxsat)",
        "- Payme sandbox'da qo'lda",
        "",
        "## Eslatma",
        "- Yangi migratsiya: refunds jadvali",
        "- Buzuvchi o'zgarish yo'q"
      ],
      "note": "`.github/pull_request_template.md` ga qo'yilsa, har PR shu shablon bilan ochiladi."
    },
    {
      "title": "Review'dan oldin o'z-o'zini tekshirish",
      "lang": "bash",
      "code": [
        "git fetch origin",
        "git diff origin/main...HEAD --stat      # nechta fayl va qator o'zgargan",
        "git diff origin/main...HEAD             # o'z diff'ingizni o'qing",
        "git log --oneline origin/main..HEAD     # commit'lar toza ekanini ko'rish"
      ],
      "note": "Uch nuqta (...) umumiy ajdoddan beri o'zgarishlarni ko'rsatadi."
    }
  ],
  "pitfalls": [
    "Juda katta PR (1000+ qator): sifatli ko'rib chiqilmaydi va xato o'tib ketadi.",
    "Tavsifsiz PR: reviewer maqsadni tushunish uchun vaqt sarflaydi yoki noto'g'ri tushunadi.",
    "O'z diff'ini o'qimasdan yuborish: debug qoldiqlari va tasodifiy fayllar review'ga tushadi.",
    "Review'ni kunlab kutish: branch eskiradi, konfliktlar ko'payadi, jamoa sekinlashadi."
  ]
});
