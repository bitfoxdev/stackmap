/* Chuqur dars: 33.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.12", {
  "lesson": [
    "### Commit gigiyenasi",
    "Toza commit tarixi debug, code review va revert uchun uzoq muddatli qiymat. Yomon tarix (ma'nosiz xabarlar, aralash o'zgarishlar) har keyingi qidiruvni qimmatlashtiradi.",
    "",
    "### Qoidalar",
    "- **Bitta commit, bitta mantiqiy o'zgarish.** Formatlash yoki refactoring funksional o'zgarishdan ajratilsin, shunda review va revert oson.",
    "- **Har commit'da build va testlar o'tadi.** Bu `git bisect` ishlashining sharti (33.16).",
    "- **Maxfiy ma'lumot hech qachon commit qilinmaydi**: `.env`, API kalitlar, parollar. Tasodifan kirsa, tarixdan o'chirish yetmaydi: kalitni almashtirish kerak (33.13).",
    "- **Katta binar fayllar** Git LFS orqali, oddiy repozitoriyga emas.",
    "- Generatsiya qilingan fayllar (build, `vendor/`) kuzatilmaydi.",
    "",
    "### Avtomatlashtirish",
    "- **pre-commit hook'lar**: Pint (uslub), PHPStan (statik tahlil), tez testlar.",
    "- **commitlint**: xabar formatini majburlash (Conventional Commits).",
    "- **gitleaks** kabi vosita: maxfiy ma'lumotni commit'dan oldin ushlaydi.",
    "- CI'da bir xil tekshiruvlar (hook'lar chetlab o'tilishi mumkin).",
    "",
    "### Tekshirish",
    "Push qilishdan oldin o'z ishingizni ko'zdan kechiring: `git log --oneline origin/main..HEAD`, `git show --stat HEAD`. Keraksiz fayl, katta diff yoki debug qoldiqlari birinchi qarashda ko'rinadi.",
    "",
    "### Tozalash",
    "Push'dan oldin interactive rebase bilan \"wip\" va \"fix typo\" commit'larini tartibga keltiring (33.11). Push'dan keyin umumiy tarixga tegmang.",
    "",
    "### Madaniyat",
    "Gigiyena jamoa kelishuvi: qisqa qo'llanma (commit formati, PR hajmi) va avtomatik tekshiruvlar odatni qo'llab-quvvatlaydi."
  ],
  "examples": [
    {
      "title": "Push'dan oldin tekshirish",
      "lang": "bash",
      "code": [
        "git log --oneline origin/main..HEAD   # sizning commit'laringiz",
        "git show --stat HEAD                  # oxirgi commit hajmi va fayllari",
        "git diff origin/main --stat           # umumiy o'zgarish",
        "git diff --check                      # ortiqcha bo'shliq va conflict markerlari"
      ],
      "note": "Muammo remote'ga chiqishidan oldin ko'rinadi."
    },
    {
      "title": "Hook bilan avtomatik tekshirish",
      "lang": "bash",
      "code": [
        "# .githooks/pre-commit",
        "#!/usr/bin/env bash",
        "vendor/bin/pint --dirty --test || exit 1",
        "vendor/bin/phpstan analyse --no-progress || exit 1",
        "gitleaks protect --staged --no-banner || exit 1"
      ],
      "note": "Uslub, tahlil va maxfiy ma'lumot commit'dan oldin tekshiriladi."
    }
  ],
  "pitfalls": [
    "Formatlash va funksional o'zgarishni aralashtirish: review'da haqiqiy o'zgarishni ko'rib bo'lmaydi.",
    "Build buzuq commit'lar: `bisect` ularda to'xtab, regressiyani topolmaydi.",
    "Maxfiy ma'lumotni commit qilib, keyingi commit'da o'chirish: tarixda qoladi, kalitni almashtirish shart.",
    "Hook'larga ishonib, CI'da tekshirmaslik: hook'lar `--no-verify` bilan chetlab o'tiladi."
  ]
});
