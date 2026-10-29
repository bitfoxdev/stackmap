/* Chuqur dars: 74.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.15", {
  "lesson": [
    "### Kod qamrovi",
    "Code coverage — testlar dastur kodining necha foiz qatori (yoki tarmog'i) ni ishga tushirganini ko'rsatuvchi metrika. U qaysi kod testlanmaganini topishga yordam beradi.",
    "",
    "### Qanday hisoblanadi",
    "Qamrovni yig'ish uchun kengaytma kerak:",
    "- **Xdebug** (`XDEBUG_MODE=coverage`): keng imkoniyatli, sekinroq.",
    "- **PCOV**: faqat qamrov uchun, Xdebug'dan ancha tez. CI uchun odatiy tanlov.",
    "",
    "Laravel'da `php artisan test --coverage`, Pest'da `--coverage --min=80`. Hisobot HTML, Clover (CI uchun) yoki konsol ko'rinishida.",
    "",
    "### Muhim: foiz sifat emas",
    "**100% qamrov xatolar yo'q degani emas.** Qator \"chaqirilgan\" bo'lishi mumkin, lekin natijasi tekshirilmagan. Assertion'siz test qamrovni oshiradi, lekin hech narsani isbotlamaydi. Qamrov faqat \"tekshirilmagan kod\"ni ko'rsatadi, \"yaxshi tekshirilgan\"ni emas.",
    "",
    "### Senior yondashuvi",
    "Quruq foiz ketidan quvmaslik. Savol: **asosiy biznes mantiq** (to'lov, narx, ruxsat) yaxshi qoplanganmi? Muhim qismlar uchun qamrovni yuqori ushlang, trivial kod (getter, konfiguratsiya) uchun emas.",
    "",
    "### Minimal chegara",
    "CI'da `--min=80` kabi chegara qo'yish qamrov tushib ketishining oldini oladi. Chegara realistik bo'lsin va asta-sekin oshirilsin. Yangi kod uchun **diff coverage** (faqat o'zgargan qatorlar qamrovi) foydaliroq, chunki eski kodni majburan qoplashga urinmaydi.",
    "",
    "### Tarmoq qamrovi",
    "Qator qamrovi `if` ning ikki tarmog'idan faqat bittasi bajarilganini yashiradi. Branch coverage aniqroq, mutation testing esa eng ishonchli (74.16)."
  ],
  "examples": [
    {
      "title": "Qamrovni hisoblash",
      "lang": "bash",
      "code": [
        "# PCOV bilan (tez)",
        "php -d pcov.enabled=1 artisan test --coverage --min=80",
        "",
        "# Xdebug bilan",
        "XDEBUG_MODE=coverage php artisan test --coverage --coverage-html=build/coverage"
      ],
      "note": "--min qamrov chegaradan past bo'lsa, buyruq xato bilan tugaydi."
    },
    {
      "title": "Qamrov yolg'on ishonch bersa",
      "lang": "php",
      "code": [
        "// Qator ishga tushadi (100% qamrov), lekin hech narsa tekshirilmaydi",
        "it('calculates price', function () {",
        "    (new PriceCalculator())->calculate($cart);",
        "    expect(true)->toBeTrue();",
        "});",
        "",
        "// Haqiqiy tekshiruv",
        "it('calculates price with vat', function () {",
        "    expect((new PriceCalculator())->calculate($cart))->toEqual(Money::uzs(112_000));",
        "});"
      ],
      "note": "Ikkala test ham kodni ishga tushiradi, lekin faqat ikkinchisi xatoni ushlay oladi."
    }
  ],
  "pitfalls": [
    "Foizni maqsad qilish: assertion'siz testlar qamrovni oshiradi, ishonchni emas.",
    "Qamrov yuqori bo'lgani uchun xatolar yo'q deb o'ylash: chaqirilgan kod to'g'ri ishlashi shart emas.",
    "Xdebug'ni har CI ishga tushirishda yoqib qo'yish: testlar keraksiz sekinlashadi. PCOV ishlating yoki qamrovni alohida bosqichda yuriting.",
    "Trivial kodni majburan qoplash: vaqt ketadi, qiymat kam."
  ]
});
