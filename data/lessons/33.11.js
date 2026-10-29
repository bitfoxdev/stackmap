/* Chuqur dars: 33.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.11", {
  "lesson": [
    "### Interactive rebase",
    "`git rebase -i HEAD~5` oxirgi 5 commit'ni **tahrirlash rejimida** ochadi. Maqsad: push qilishdan oldin tarixni review qilish oson, mantiqiy ketma-ketlikka keltirish.",
    "",
    "### Buyruqlar",
    "Har commit oldida amal yoziladi:",
    "- `pick`: o'zgarishsiz qoldirish.",
    "- `reword`: xabarni o'zgartirish.",
    "- `edit`: commit'da to'xtab, o'zgartirish imkonini berish.",
    "- `squash`: oldingi commit'ga qo'shib, xabarlarni birlashtirish.",
    "- `fixup`: oldingisiga qo'shish, o'zining xabarini tashlash.",
    "- `drop`: commit'ni olib tashlash.",
    "- qatorlar tartibini o'zgartirish: commit'lar tartibi o'zgaradi.",
    "",
    "### fixup va autosquash",
    "Eng qulay ish usuli: review'dan keyin tuzatishni `git commit --fixup <sha>` bilan qiling (u \"fixup! ...\" xabarli commit yaratadi), keyin `git rebase -i --autosquash origin/main`: Git fixup commit'larni avtomatik tegishli commit yoniga qo'yadi va birlashtiradi.",
    "",
    "### Nimaga kerak",
    "\"wip\", \"fix typo\", \"oops\" kabi shovqinli commit'lar review'ni qiyinlashtiradi. Ularni toza, mantiqiy commit'larga aylantirasiz. Bu bisect va revert uchun ham foydali.",
    "",
    "### Qoida",
    "Faqat **shaxsiy, hali umumiy bo'lmagan** commit'larni qayta yozing (rebase oltin qoidasi). Push qilingan shaxsiy branch'da rebase'dan keyin `--force-with-lease` kerak.",
    "",
    "### Xato bo'lsa",
    "Rebase jarayonida adashsangiz: `git rebase --abort`. Tugagandan keyin: `git reflog` bilan oldingi holatga qaytish mumkin (33.17)."
  ],
  "examples": [
    {
      "title": "Review'dan keyingi tuzatishlarni birlashtirish",
      "lang": "bash",
      "code": [
        "git commit --fixup a1b2c3d          # a1b2c3d commit'iga tuzatish",
        "git commit --fixup 7e4f9c0",
        "git rebase -i --autosquash origin/main   # fixup'lar o'z joyiga tushadi",
        "git push --force-with-lease"
      ],
      "note": "Tahrirlash oynasida deyarli hech narsa qilish shart emas, autosquash o'zi tartiblaydi."
    },
    {
      "title": "Rebase ro'yxati",
      "lang": "text",
      "code": [
        "pick   a1b2c3d feat(refund): add refund endpoint",
        "fixup  7e4f9c0 fixup! feat(refund): add refund endpoint",
        "reword 5d2a8b1 test: add refund tests",
        "drop   9c3e7f2 wip debug"
      ],
      "note": "fixup birinchisiga qo'shiladi, reword xabarni o'zgartirishga ruxsat beradi, drop o'chiradi."
    }
  ],
  "pitfalls": [
    "Push qilingan va boshqalar ishlatadigan commit'larni qayta yozish: tarix to'qnashadi.",
    "Rebase'dan keyin oddiy `git push` ni urinish: rad etiladi, `--force-with-lease` kerak.",
    "Hamma commit'ni bittaga `squash` qilish: foydali mantiqiy bo'linish yo'qoladi.",
    "Rebase paytida adashganda panikaga tushish: `--abort` yoki `reflog` bilan qaytish mumkin."
  ]
});
