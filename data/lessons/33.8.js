/* Chuqur dars: 33.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.8", {
  "lesson": [
    "### Revert va reset farqi",
    "Ikkalasi ham o'zgarishni \"bekor qiladi\", lekin ular tarixga butunlay boshqacha ta'sir qiladi.",
    "",
    "### git revert",
    "`git revert <sha>` ko'rsatilgan commit o'zgarishlarini **teskarisiga qo'llaydigan yangi commit** yaratadi. Tarix saqlanadi: xato commit ham, uni bekor qilgan commit ham ko'rinadi. Shuning uchun **umumiy, push qilingan** branch'larda (main) xatoni bekor qilishning xavfsiz yo'li.",
    "",
    "### git reset",
    "`git reset` joriy branch ko'rsatkichini boshqa commit'ga **suradi**. Uch rejim:",
    "- `--soft`: faqat ko'rsatkich suriladi, o'zgarishlar **staging'da** qoladi. Bir necha commit'ni bittaga birlashtirish uchun qulay.",
    "- `--mixed` (standart): ko'rsatkich suriladi, o'zgarishlar working tree'da qoladi (staging bo'shaydi).",
    "- `--hard`: ko'rsatkich suriladi **va working tree'dagi o'zgarishlar yo'qoladi**.",
    "",
    "### Qoida",
    "- **Push qilingan umumiy tarix**: `revert`. Tarixni qayta yozmaysiz, boshqalarga halaqit bermaysiz.",
    "- **Lokal, push qilinmagan**: `reset` mumkin va ko'pincha qulay.",
    "",
    "### Merge commit'ni revert qilish",
    "Merge commit'ni revert qilishda qaysi ota'ni asos qilish kerakligini aytish kerak: `git revert -m 1 <merge-sha>` (1 — odatda `main` tomoni). Eslab qoling: bunday revert'dan keyin o'sha branch'ni qayta merge qilsangiz, avval revert'ni revert qilish kerak.",
    "",
    "### Xavfsizlik to'ri",
    "`reset --hard` dan oldin o'zgarishlaringiz commit yoki stash qilinganini tekshiring. Commit'lar yo'qolsa, ko'pincha `git reflog` bilan tiklanadi (33.17), lekin commit qilinmagan working tree o'zgarishlari tiklanmaydi."
  ],
  "examples": [
    {
      "title": "Revert: umumiy branch",
      "lang": "bash",
      "code": [
        "git revert 3f9c2ab          # xato commit'ni bekor qiluvchi yangi commit",
        "git revert -m 1 9d1e4b7      # merge commit'ni bekor qilish (1-ota asos)",
        "git push origin main"
      ],
      "note": "Tarix o'zgarmaydi, shuning uchun push oddiy ishlaydi."
    },
    {
      "title": "Reset: lokal commit'larni birlashtirish",
      "lang": "bash",
      "code": [
        "git reset --soft HEAD~3       # oxirgi 3 commit'ni olib tashlab, o'zgarishlar staging'da",
        "git commit -m \"feat(refund): add refund endpoint\"",
        "",
        "git reset --hard origin/main  # lokal branch'ni remote holatiga majburan tenglashtirish (XAVFLI)"
      ],
      "note": "--hard commit qilinmagan o'zgarishlarni o'chiradi."
    }
  ],
  "pitfalls": [
    "Push qilingan commit'ni `reset` qilib `--force` bilan yuborish: boshqalarning tarixi buziladi.",
    "`reset --hard` ni commit qilinmagan o'zgarishlar bor holda ishlatish: ular qaytmaydi.",
    "Merge commit'ni `-m` ko'rsatmasdan revert qilishga urinish: Git qaysi ota'ni asos qilishni bilmaydi.",
    "Revert qilingan branch'ni to'g'ridan-to'g'ri qayta merge qilish: o'zgarishlar kirmaydi, avval revert'ni revert qilish kerak."
  ]
});
