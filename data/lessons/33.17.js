/* Chuqur dars: 33.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.17", {
  "lesson": [
    "### Reflog nima",
    "Reflog — `HEAD` va branch'larning **lokal** harakatlari jurnali: commit, checkout, reset, rebase, merge, amend. Har safar ko'rsatkich o'zgarganda yozuv qo'shiladi.",
    "",
    "### Nima uchun qutqaruvchi",
    "\"Yo'qolgan\" commit'lar aslida darhol o'chmaydi. `reset --hard`, noto'g'ri rebase, tasodifan o'chirilgan branch'dan keyin ham commit obyektlari bazada turadi va reflog ularga yo'l ko'rsatadi. Ular odatda uzoq vaqt saqlanadi: yetib boriladigan yozuvlar standart ~90 kun, yetib bo'lmaydiganlar ~30 kun.",
    "",
    "### Qanday ishlatiladi",
    "`git reflog` ro'yxatini ko'rib, kerakli holatni toping (`HEAD@{3}` yoki SHA). Keyin:",
    "- `git reset --hard HEAD@{3}`: shu holatga qaytish.",
    "- `git branch rescue <sha>`: yo'qolgan commit'dan yangi branch yaratish (xavfsizroq, mavjud ish ustiga yozmaydi).",
    "- `git checkout -b rescue <sha>`.",
    "- `git cherry-pick <sha>`: bitta commit'ni olish.",
    "",
    "### Cheklovlar",
    "- **Faqat lokal**: boshqa mashinadagi yoki push qilinmagan va hech qachon commit qilinmagan ishni tiklamaydi.",
    "- **Commit qilinmagan** working tree o'zgarishlari reflog'da yo'q (ular hech qachon commit bo'lmagan). Shu sabab `reset --hard` dan oldin stash yoki commit qiling.",
    "- Vaqt o'tib `git gc` tozalaydi.",
    "",
    "### Branch reflog",
    "Har branch'ning o'z jurnali bor: `git reflog show feature/x`. Vaqt bo'yicha ham qidirish mumkin: `git reflog --date=relative` yoki `main@{yesterday}`.",
    "",
    "### Odat",
    "Xavfli amaldan oldin zaxira branch (`git branch backup`) yarating. Reflog muammodan keyin yordam beradi, lekin oldindan ehtiyot yaxshiroq."
  ],
  "examples": [
    {
      "title": "Yo'qolgan commit'ni tiklash",
      "lang": "bash",
      "code": [
        "git reset --hard HEAD~3                 # xato: 3 commit yo'qoldi",
        "git reflog --date=relative | head -10",
        "# 7c1e9a2 HEAD@{1}: commit: feat(refund): add refund endpoint",
        "git branch rescue-refunds 7c1e9a2        # commit'dan yangi branch",
        "git switch rescue-refunds"
      ],
      "note": "Yangi branch asl ishni xavfsiz qaytaradi."
    },
    {
      "title": "O'chirilgan branch",
      "lang": "bash",
      "code": [
        "git branch -D feature/old                # tasodifan o'chirildi",
        "git reflog | grep \"feature/old\"           # oxirgi commit SHA'sini topish",
        "git branch feature/old a8d03fe            # tiklash"
      ],
      "note": "Branch o'chirilganda ham commit'lari reflog orqali topiladi."
    }
  ],
  "pitfalls": [
    "Reflog hamma narsani tiklaydi deb o'ylash: commit qilinmagan o'zgarishlar va boshqa mashinadagi ish tiklanmaydi.",
    "Tiklashdan oldin `git gc` ishga tushirish: yetib bo'lmaydigan obyektlar tozalanishi mumkin.",
    "`reset --hard` bilan tiklashga urinish: ishlayotgan ishni ustidan yozadi, avval `git branch rescue` qiling.",
    "Reflog'ni remote'da bor deb o'ylash: u faqat sizning lokal repozitoriyingizda."
  ]
});
