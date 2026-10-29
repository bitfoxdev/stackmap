/* Chuqur dars: 33.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.15", {
  "lesson": [
    "### Release branch",
    "Release branch (`release/2.4`) — reliz **tayyorlash va qo'llab-quvvatlash** uchun alohida chiziq. Unda yangi imkoniyatlar to'xtatiladi (feature freeze), faqat bug fix'lar kiradi. Relizdan keyin eski versiyalar uchun patch'lar shu yerda chiqariladi.",
    "",
    "### Qachon kerak",
    "- **Bir nechta versiyani parallel qo'llab-quvvatlash**: on-premise mahsulotlar, mobil SDK, ommaviy kutubxona (2.x va 3.x ikkalasiga ham xavfsizlik yangilanishi).",
    "- **Rejali relizlar** uzoq tasdiqlash (QA, sertifikatlash) bilan.",
    "- GitFlow modelida.",
    "",
    "### Qachon kerak emas",
    "Doimiy deploy qilinadigan veb-ilovada (SaaS) `main` doim reliz holatida bo'ladi, release branch ortiqcha. Reliz shunchaki tag bilan belgilanadi. Keraksiz branch'lar sinxronlash yukini oshiradi.",
    "",
    "### Tuzatishlar oqimi",
    "Bug fix avval `main`ga, keyin kerakli release branch'larga **cherry-pick** (`-x` bilan) qilinadi. Shunda `main` hech qachon tuzatishdan orqada qolmaydi. Qarama-qarshi tartib (avval release, keyin main) ham bor, lekin tuzatish `main`da yo'qolib qolish xavfi bor. Jamoa qoidasi aniq bo'lsin.",
    "",
    "### Reliz jarayoni",
    "1. `release/2.4` ni `main` dan oching.",
    "2. Faqat bug fix, versiya raqamini yangilash, changelog.",
    "3. Tag: `v2.4.0`.",
    "4. Relizdan keyin kerak bo'lsa `main` ga qaytarib merge (versiya o'zgarishi uchun).",
    "5. Patch'lar: tuzatish, cherry-pick, `v2.4.1`.",
    "",
    "### Eski branch'larni yopish",
    "Qo'llab-quvvatlash muddati tugagan release branch'larni arxivlang (tag qoldirib branch'ni o'chiring) va foydalanuvchilarga yangilanish yo'lini ko'rsating."
  ],
  "examples": [
    {
      "title": "Patch relizi",
      "lang": "bash",
      "code": [
        "git switch -c release/2.4 v2.4.0        # eski reliz tag'idan branch",
        "git cherry-pick -x 3f9c2ab                # main'dagi tuzatish",
        "git tag -a v2.4.1 -m \"Hotfix: payme timeout\"",
        "git push origin release/2.4 v2.4.1"
      ],
      "note": "Tuzatish `main`da allaqachon bor, shuning uchun cherry-pick qilinadi."
    },
    {
      "title": "Qaysi relizda qaysi tuzatish",
      "lang": "bash",
      "code": [
        "git branch -r --contains 3f9c2ab       # tuzatish qaysi branch'larda bor",
        "git log --oneline v2.4.0..release/2.4  # 2.4.0 dan keyingi patch'lar"
      ],
      "note": "Tuzatish barcha kerakli branch'larga kirganini tekshirish uchun."
    }
  ],
  "pitfalls": [
    "Doimiy deploy qilinadigan veb-ilovada ham release branch'lar yuritish: sinxronlash ishi ko'payadi, foyda yo'q.",
    "Tuzatishni faqat release branch'ga qilib, `main` ga kiritmaslik: keyingi relizda xato qaytadi.",
    "Release branch'da yangi imkoniyat qo'shish: feature freeze buziladi.",
    "Qo'llab-quvvatlanmaydigan eski branch'larni ochiq qoldirish: foydalanuvchilar eskirgan va zaif versiyada qoladi."
  ]
});
