/* Chuqur dars: 33.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.9", {
  "lesson": [
    "### Stash nima",
    "`git stash` tugallanmagan o'zgarishlarni **vaqtincha** yashirin joyga saqlab, working tree'ni toza holatga qaytaradi. Odatiy holat: ish o'rtasida shoshilinch hotfix chiqdi, boshqa branch'ga o'tish kerak, lekin hozirgi ishni commit qilgingiz kelmaydi.",
    "",
    "### Asosiy buyruqlar",
    "- `git stash push -m \"izoh\"`: o'zgarishlarni izoh bilan saqlash. Izoh keyin ro'yxatda aniqlik beradi.",
    "- `git stash push -u`: kuzatilmayotgan (untracked) fayllarni ham saqlaydi. Standart holatda ular olinmaydi.",
    "- `git stash list`: ro'yxat (`stash@{0}` eng yangisi).",
    "- `git stash pop`: eng yangisini qo'llab, ro'yxatdan **o'chiradi**.",
    "- `git stash apply`: qo'llaydi, lekin ro'yxatda **qoldiradi** (bir nechta branch'ga qo'llash uchun).",
    "- `git stash show -p`: ichida nima borligini ko'rish.",
    "- `git stash drop`: o'chirish.",
    "",
    "### Cheklov: uzoq muddatli joy emas",
    "Stash qisqa vaqtli. Unutilgan stash'lar ro'yxatda yig'ilib, nima ekani noma'lum bo'lib qoladi yoki tasodifan tozalanadi. Uzoq ish uchun **WIP commit** (keyin `reset --soft` yoki interactive rebase bilan tozalanadi) yoki alohida branch yaxshiroq.",
    "",
    "### Konflikt",
    "`stash pop` paytida konflikt chiqishi mumkin (o'sha fayllar o'zgargan bo'lsa). Bunda stash o'chirilmaydi, konfliktni hal qilib, qo'lda `git stash drop` qilasiz.",
    "",
    "### worktree muqobili",
    "`git worktree add ../hotfix hotfix/x` boshqa branch'ni **alohida papkada** ochadi, shuning uchun stash kerak bo'lmaydi: ikkala ish bir vaqtda ochiq turadi."
  ],
  "examples": [
    {
      "title": "Hotfix uchun vaqtincha chetga chiqish",
      "lang": "bash",
      "code": [
        "git stash push -u -m \"WIP: refund validation\"",
        "git switch main && git switch -c hotfix/payme-timeout",
        "# ... hotfix, commit, push ...",
        "git switch -                      # oldingi branch'ga qaytish",
        "git stash pop"
      ],
      "note": "-u yangi (untracked) fayllarni ham olib ketadi."
    },
    {
      "title": "worktree bilan stash'siz",
      "lang": "bash",
      "code": [
        "git worktree add ../app-hotfix -b hotfix/payme-timeout main",
        "cd ../app-hotfix        # alohida papka, hozirgi ish tegilmagan",
        "# ... hotfix ...",
        "git worktree remove ../app-hotfix"
      ],
      "note": "Ikki branch bir vaqtda ochiq, stash va branch almashtirish kerak emas."
    }
  ],
  "pitfalls": [
    "Stash'ni uzoq saqlash: izohsiz ro'yxat to'planib, nima ekani esdan chiqadi.",
    "`-u` ni unutish: yangi fayllar working tree'da qoladi va branch almashtirishga halaqit beradi.",
    "`stash pop` konfliktidan keyin stash o'chdi deb o'ylash: u saqlanib qoladi, qo'lda drop kerak.",
    "Stash'ga muhim ishni ishonish: commit yoki branch'dan kamroq ishonchli."
  ]
});
