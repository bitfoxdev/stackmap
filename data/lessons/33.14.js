/* Chuqur dars: 33.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.14", {
  "lesson": [
    "### Tag nima",
    "Tag — muayyan commit'ga **doimiy nom**, odatda reliz versiyasi: `v2.4.0`. Branch'dan farqi: branch oldinga suriladi, tag esa bir commit'da qotib turadi.",
    "",
    "### Ikki turi",
    "- **Annotated tag** (`git tag -a v2.4.0 -m \"...\"`): alohida obyekt, unda muallif, sana, xabar (va ixtiyoriy imzo `-s`) bor. **Relizlar uchun** tavsiya etiladi.",
    "- **Lightweight tag** (`git tag v2.4.0`): shunchaki commit'ga ko'rsatkich. Vaqtinchalik belgilar uchun.",
    "",
    "### Push qilish",
    "Tag'lar `git push` bilan avtomatik **yuborilmaydi**. Alohida: `git push origin v2.4.0` yoki barcha tag'lar uchun `git push origin --tags`. Faqat annotated tag'lar uchun `git push --follow-tags`.",
    "",
    "### Versiyalash",
    "**SemVer** (`MAJOR.MINOR.PATCH`): MAJOR buzuvchi o'zgarish, MINOR orqaga mos yangi imkoniyat, PATCH tuzatish. Composer paketlari versiyalarni aynan tag'lardan oladi, shuning uchun kutubxona chiqarish tag qo'yishdan iborat.",
    "",
    "### CI/CD bilan",
    "Tag push reliz konveyerini ishga tushirishi mumkin: build, imzolash, reliz yozuvi, deploy. Shunda har reliz takrorlanuvchan va kuzatiladigan.",
    "",
    "### Qoida: push qilingan tag'ni o'zgartirmang",
    "Tag'ni boshqa commit'ga ko'chirish yoki o'chirib qayta yaratish xavfli: kimdir allaqachon eski tag'ni yuklab olgan, CI keshlagan. Xato bo'lsa, yangi versiya (`v2.4.1`) chiqaring.",
    "",
    "### Foydali buyruqlar",
    "`git tag -l \"v2.*\"` ro'yxat, `git describe --tags` joriy commit eng yaqin tag'dan qancha uzoqligini ko'rsatadi, `git show v2.4.0` tag ma'lumoti. Keyingi commit'dan reliz yozuvini `git log v2.3.0..v2.4.0 --oneline` bilan olish mumkin."
  ],
  "examples": [
    {
      "title": "Reliz tag'i",
      "lang": "bash",
      "code": [
        "git tag -a v2.4.0 -m \"Refund endpoint, Payme timeout fix\"",
        "git push origin v2.4.0",
        "git describe --tags          # v2.4.0-3-g7c1e9a2: tag'dan 3 commit keyin"
      ],
      "note": "Annotated tag muallif va xabar bilan saqlanadi."
    },
    {
      "title": "Reliz o'zgarishlari ro'yxati",
      "lang": "bash",
      "code": [
        "git log v2.3.0..v2.4.0 --oneline --no-merges",
        "git tag -l \"v2.*\" --sort=-v:refname | head",
        "git show v2.4.0 --stat"
      ],
      "note": "Ikki tag oralig'idagi commit'lar changelog uchun xomashyo."
    }
  ],
  "pitfalls": [
    "Push qilingan tag'ni boshqa commit'ga ko'chirish: kimdir eski versiyani allaqachon ishlatgan.",
    "Tag'ni push qilishni unutish: `git push` tag'larni yubormaydi, CI reliz ishga tushmaydi.",
    "Lightweight tag'ni reliz uchun ishlatish: muallif va xabar yo'q, imzolab bo'lmaydi.",
    "SemVer qoidalariga rioya qilmaslik: PATCH ichida buzuvchi o'zgarish iste'molchilarni sindiradi."
  ]
});
