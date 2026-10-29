/* Chuqur dars: 74.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.18", {
  "lesson": [
    "### Test bajarilish vaqti",
    "Testlar tez bo'lsa, dasturchi ularni tez-tez yuritadi va tez fikr-mulohaza oladi (fast feedback loop). Agar to'plam 20 daqiqa ishlasa, odamlar uni yuritishdan qochadi, yiqilish kech aniqlanadi va tuzatish qimmatlashadi.",
    "",
    "### Sekinlikning sabablari",
    "- Unit testlarda ortiqcha I/O: DB, fayl, tarmoq.",
    "- Har test uchun butun ilovani yuklash.",
    "- Ko'p ma'lumot yaratish (kerak bo'lmagan factory bog'lanishlari).",
    "- Sekin parol heshlash.",
    "- Tashqi servislarga haqiqiy so'rovlar.",
    "- Hammasi bitta jarayonda ketma-ket.",
    "",
    "### Tezlashtirish yo'llari",
    "- **Unit testlarda I/O yo'q**: sof sinflar uchun Laravel `TestCase` o'rniga yengil bazaviy sinf.",
    "- **Parol heshlash**: `BCRYPT_ROUNDS=4` (testda), chunki bcrypt ataylab sekin. Argon2 uchun ham xotira va vaqt parametrlarini pasaytiring.",
    "- **Yengil driver'lar**: `CACHE_STORE=array`, `SESSION_DRIVER=array`, `MAIL_MAILER=array`, `QUEUE_CONNECTION=sync`.",
    "- **Parallel testlar** (`--parallel`).",
    "- `LazilyRefreshDatabase` va migratsiya sxema dump'i.",
    "- **Ma'lumotni minimal yaratish**: faqat kerak bo'lgan yozuvlar.",
    "- **Tashqi chaqiruvlarni fake qilish**: `Http::fake()`.",
    "",
    "### SQLite in-memory haqida",
    "SQLite xotirada tez, lekin production'dagi MySQL/PostgreSQL'dan farq qiladi. Unit va oddiy feature testlarda mumkin, lekin DB'ga xos mantiq uchun haqiqiy engine kerak. Tezlik uchun haqiqiylikni qurbon qilmang: haqiqiy DB'ni `tmpfs`da ishlatish ko'pincha yetarli tezlikni beradi.",
    "",
    "### Profil qilish",
    "Avval o'lchang. `php artisan test --profile` (Pest: `--profile`) eng sekin testlarni ko'rsatadi. Odatda kam sonli testlar vaqtning katta qismini oladi: o'shalarni tuzating.",
    "",
    "### Nisbatni saqlash",
    "Sekin testlarni (sandbox, E2E) alohida suite'ga ajrating, kunlik tezkor to'plam esa daqiqalar ichida tugasin."
  ],
  "examples": [
    {
      "title": "Test uchun tez sozlamalar",
      "lang": "xml",
      "code": [
        "<php>",
        "    <env name=\"BCRYPT_ROUNDS\" value=\"4\"/>",
        "    <env name=\"CACHE_STORE\" value=\"array\"/>",
        "    <env name=\"SESSION_DRIVER\" value=\"array\"/>",
        "    <env name=\"MAIL_MAILER\" value=\"array\"/>",
        "    <env name=\"QUEUE_CONNECTION\" value=\"sync\"/>",
        "    <env name=\"TELESCOPE_ENABLED\" value=\"false\"/>",
        "</php>"
      ],
      "note": "Parol heshlash va driver'lar testlarni sezilarli tezlashtiradi."
    },
    {
      "title": "Sekin testlarni topish",
      "lang": "bash",
      "code": [
        "php artisan test --profile            # eng sekin 10 ta test",
        "php artisan test --parallel           # yadrolarga taqsimlash",
        "php artisan test --testsuite=Unit     # tez fikr-mulohaza"
      ],
      "note": "Avval o'lchang, keyin tezlashtiring."
    }
  ],
  "pitfalls": [
    "O'lchamasdan optimallashtirish: vaqtning ko'p qismini kam sonli testlar olishi mumkin, profil qiling.",
    "Tezlik uchun SQLite'ga o'tib, DB'ga xos xatolarni yashirish.",
    "Testda parol heshlash xarajatini qoldirish: yuzlab login testlari bcrypt tufayli daqiqalarga cho'ziladi.",
    "Hamma narsani bitta sekin to'plamda saqlash: tez va sekin testlar ajratilmasa, fikr-mulohaza kechikadi."
  ]
});
