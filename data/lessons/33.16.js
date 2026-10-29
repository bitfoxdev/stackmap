/* Chuqur dars: 33.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.16", {
  "lesson": [
    "### Bisect nima",
    "`git bisect` regressiyani keltirib chiqargan commit'ni **binary search** bilan topadi. Siz \"yaxshi\" (xato yo'q) va \"yomon\" (xato bor) commit'ni belgilaysiz, Git oralig'ning o'rtasidagi commit'ni sinash uchun checkout qiladi. Har javobdan keyin oraliq yarmiga qisqaradi.",
    "",
    "### Samaradorlik",
    "N commit orasidan sabab log₂(N) qadamda topiladi: 1000 commit uchun taxminan 10 qadam. Qo'lda har commit'ni ko'rish yoki taxmin qilishdan ancha tez.",
    "",
    "### Qo'lda va avtomatik",
    "**Qo'lda**: `git bisect start`, `git bisect bad` (joriy), `git bisect good v2.3.0`, keyin har checkout'dan keyin test qilib `good` yoki `bad` deysiz.",
    "",
    "**Avtomatik**: `git bisect run <buyruq>`. Buyruqning chiqish kodi qaror beradi: `0` — good, `1..127` (125 dan tashqari) — bad, `125` — bu commit'ni o'tkazib yuborish (skip, masalan build bo'lmasa). To'liq avtomatik va insonsiz.",
    "",
    "### Eng samarali usul",
    "Regressiyani qayta yaratuvchi **test yozing** va `bisect run` bilan ishga tushiring. Bu eng ishonchli va takrorlanuvchan. Test yangi commit'lardagi funksiyaga bog'liq bo'lsa, uni commit'lardan mustaqil joyda (masalan, vaqtinchalik fayl) saqlang.",
    "",
    "### Sharti: commit gigiyenasi",
    "Har commit'da loyiha build bo'lishi va testlar ishlashi kerak (33.12). Buzuq oraliq commit'lar bisect'ni chalg'itadi, bunda `git bisect skip` ishlatiladi.",
    "",
    "### Tugatish",
    "Natijadan keyin `git bisect reset` asl branch'ga qaytaradi. Topilgan commit'ni `git show` bilan o'rganing, so'ngra tuzatish va regressiya testini qo'shing."
  ],
  "examples": [
    {
      "title": "To'liq avtomatik bisect",
      "lang": "bash",
      "code": [
        "git bisect start",
        "git bisect bad HEAD",
        "git bisect good v2.3.0",
        "git bisect run php artisan test --filter=RefundTest",
        "# Git: \"<sha> is the first bad commit\"",
        "git bisect reset"
      ],
      "note": "Test regressiyani qayta yaratadi va Git avtomatik qidiradi."
    },
    {
      "title": "Maxsus skript bilan",
      "lang": "bash",
      "code": [
        "cat > /tmp/check.sh <<'EOF'",
        "#!/usr/bin/env bash",
        "composer install --quiet --no-interaction || exit 125    # build bo'lmasa: skip",
        "php artisan test --filter=RefundTest",
        "EOF",
        "chmod +x /tmp/check.sh",
        "git bisect run /tmp/check.sh"
      ],
      "note": "125 chiqish kodi commit'ni o'tkazib yuboradi, 0 good, qolgani bad."
    }
  ],
  "pitfalls": [
    "Build buzuq oraliq commit'lar bilan bisect: noto'g'ri natija. `git bisect skip` ishlating.",
    "Test skriptini bisect checkout qilgan commit'lar ichida saqlash: eski commit'da u yo'q bo'lishi mumkin.",
    "Chiqish kodini noto'g'ri tushunish: 125 skip degani, xato emas.",
    "`bisect reset` qilishni unutish: repozitoriy qidiruv holatida va eski commit'da qolib ketadi."
  ]
});
