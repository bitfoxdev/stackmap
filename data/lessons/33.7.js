/* Chuqur dars: 33.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.7", {
  "lesson": [
    "### Cherry-pick",
    "`git cherry-pick <sha>` boshqa branch'dagi bitta (yoki bir nechta) commit'ni **joriy branch'ga nusxalaydi**. Commit'ning o'zgarishi qayta qo'llanib, yangi SHA'li yangi commit yaratiladi.",
    "",
    "### Qachon ishlatiladi",
    "- **Hotfix'ni ko'chirish**: `main` ga qilingan tuzatishni eski `release/2.4` ga ham olib o'tish.",
    "- **Xato branch**: commit noto'g'ri branch'ga qilingan bo'lsa, uni to'g'ri joyga ko'chirib, xatosini tuzatish.",
    "- Katta branch'dan faqat bitta mustaqil tuzatishni ajratib olish.",
    "",
    "### Ehtiyot choralari",
    "- **Dublikat commit**: bir xil o'zgarish ikki SHA bilan ikki branch'da turadi. Keyinroq branch'lar merge qilinsa, Git ularni bog'liq deb bilmaydi: konflikt yoki ikki marta qo'llangan o'zgarish bo'lishi mumkin.",
    "- **Bog'liqlik**: commit boshqa commit'ga tayanadi (u yaratgan funksiyani chaqiradi) bo'lsa, cherry-pick yolg'iz ishlamaydi yoki buzuq kod beradi.",
    "- **Ko'p cherry-pick** — branching strategiyasi muammosi belgisi: tez-tez bir branch'dan ikkinchisiga nusxalash kerak bo'lsa, qisqa umrli branch va merge yaxshiroq.",
    "",
    "### Foydali parametrlar",
    "- `-x`: xabarga \"(cherry picked from commit ...)\" qo'shadi, manba kuzatiladi.",
    "- `-n` (`--no-commit`): o'zgarishni qo'llaydi, lekin commit qilmaydi.",
    "- `A^..B`: oraliqdagi commit'lar.",
    "",
    "### Konflikt",
    "Konflikt chiqsa, hal qilib `git cherry-pick --continue`; bekor qilish uchun `--abort`."
  ],
  "examples": [
    {
      "title": "Hotfix'ni release branch'ga ko'chirish",
      "lang": "bash",
      "code": [
        "git switch release/2.4",
        "git cherry-pick -x 3f9c2ab        # xabarga manba SHA'si yoziladi",
        "git push origin release/2.4"
      ],
      "note": "-x keyinchalik qaysi commit'dan olinganini ko'rsatadi."
    },
    {
      "title": "Bir nechta commit va xato branch",
      "lang": "bash",
      "code": [
        "# oraliq: A dan B gacha (A kirmaydi, A^..B kiritadi)",
        "git cherry-pick A^..B",
        "",
        "# commit xato branch'ga tushgan: to'g'ri branch'ga ko'chirib, eskisidan olib tashlash",
        "git switch correct-branch && git cherry-pick 3f9c2ab",
        "git switch wrong-branch && git reset --hard HEAD~1   # push qilinmagan bo'lsa"
      ],
      "note": "reset --hard faqat commit push qilinmagan bo'lsa xavfsiz."
    }
  ],
  "pitfalls": [
    "Har safar cherry-pick bilan ishlash: branching strategiyasi noto'g'ri belgisi.",
    "Bog'liq commit'larni yolg'iz ko'chirish: kod buziladi yoki kompilyatsiya bo'lmaydi.",
    "`-x` ni qo'ymaslik: keyinchalik dublikat commit'larning manbasini topish qiyin.",
    "Dublikat commit'li branch'larni keyin merge qilganda kutilmagan konfliktlarga tayyor bo'lmaslik."
  ]
});
