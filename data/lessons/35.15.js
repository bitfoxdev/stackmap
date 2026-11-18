/* Chuqur dars: 35.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.15", {
  "lesson": [
    "### GitLab Permissions va Rollar iyerarxiyasi",
    "Axborot xavfsizligining eng asosiy tamoyili — **Least Privilege** (minimal zaruriy huquqlar berish) tamoyilidir. GitLab bu tamoyilni amalga oshirish uchun qat'iy va mantiqiy rollar tizimiga ega. Har bir a'zo guruh yoki loyiha darajasida aniq bir rolga ega bo'ladi.",
    "",
    "### Standart rollar va ularning mas'uliyati",
    "- **Guest**: Eng cheklangan rol. Faqat ommaviy ma'lumotlarni, o'ziga ruxsat berilgan issue larni ko'ra oladi. Kodni o'qiy olmaydi va klon qila olmaydi.",
    "- **Reporter**: Kodni va repozitoriyni o'qiy oladi (Read-only), CI/CD natijalarini ko'radi, issue ochadi, lekin branchlarga kod yoza olmaydi (QA muhandislari yoki mahsulot menejerlari uchun mos).",
    "- **Developer**: Asosiy ishchi kuchi! Yangi branchlar ocha oladi, kod push qiladi, Merge Request yaratadi, CI joblarni qayta yurgizadi. Lekin himoyalangan (protected) branchlarga to'g'ridan-to'g'ri merge qila olmaydi va loyiha sozlamalarini o'zgartira olmaydi.",
    "- **Maintainer**: Jamoa yetakchisi (Team Lead/Tech Lead). Protected branchlarni boshqaradi, MR larni merge qiladi, CI/CD o'zgaruvchilarini sozlaydi, loyiha sozlamalarini o'zgartiradi.",
    "- **Owner**: Guruh yoki loyiha egasi. Loyihani o'chirish, boshqa guruhga ko'chirish, xavfsizlik siyosatlarini belgilash huquqiga ega.",
    "",
    "### Ruxsatlar merosi (Inheritance) va cheklovlar",
    "Guruh darajasida berilgan rol barcha quyi loyihalarga meros o'tadi. Muhim qoida: **Meros o'tgan rolni quyi loyihada pasaytirib bo'lmaydi!** Agar xodim guruhda Developer bo'lsa, uni quyi loyihada Reporter qilib cheklay olmaysiz (faqat Maintainer ga oshirish mumkin). Shuning uchun global guruhda faqat minimal huquqlar berilishi kerak.",
    "",
    "### Vaqtinchalik a'zolik (Expiration date)",
    "Tashqi pudratchilar (autsource/freelance) jalb qilinganda ularning a'zoligiga aniq tugash sanasi belgilanadi. Muddat yetgach GitLab ularning kirish huquqini avtomatik bekor qiladi."
  ],
  "examples": [
    {
      "title": "GitLab rollari vakolatlari taqqoslanishi",
      "lang": "text",
      "code": [
        "Amal                             | Reporter | Developer | Maintainer",
        "---------------------------------|----------|-----------|-----------",
        "Kodni klonlash (git pull)        |   HA     |    HA     |    HA",
        "Branch ochish va push qilish     |   YO'Q   |    HA     |    HA",
        "Protected branchga merge         |   YO'Q   |   YO'Q*   |    HA",
        "CI/CD o'zgaruvchilarini o'zgart. |   YO'Q   |   YO'Q    |    HA",
        "Loyihani o'chirish               |   YO'Q   |   YO'Q    |   YO'Q (Owner)"
      ],
      "note": "*Agar approval qoidalarida Developer ruxsati berilmagan bo'lsa."
    },
    {
      "title": "A'zolik muddatini belgilash",
      "lang": "text",
      "code": [
        "Member: john_contractor",
        "Role: Developer",
        "Access expiration date: 2026-12-31"
      ],
      "note": "Belgilangan sana o'tishi bilan tizimga kirish avtomatik bloklanadi."
    }
  ],
  "pitfalls": [
    "Barcha dasturchilarga oson bo'lsin deb Maintainer huquqini tarqatish: xavfsizlik va Protected Branch qoidalarini parokanda qiladi.",
    "Guruh darajasida yuqori huquq berib, keyin bitta maxfiy loyihada uni cheklashga urinish (ruxsatni pastga tushirib bo'lmaydi).",
    "Pudratchi yoki ishdan ketgan xodimlarning akkauntlarini o'z vaqtida o'chirishni unutish (Expiration date ishlating)."
  ]
});
