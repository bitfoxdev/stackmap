/* Chuqur dars: 74.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.14", {
  "lesson": [
    "### Parallel testlash",
    "Test to'plami katta bo'lsa, ularni bitta jarayonda ketma-ket yurgizish uzoq davom etadi. Parallel testlash to'plamni protsessorning bir necha yadrosiga bo'lib, umumiy vaqtni sezilarli (taxminan 3–5 barobar) qisqartiradi.",
    "",
    "### Laravel'da",
    "`php artisan test --parallel` komandasi testlarni bir nechta jarayonga taqsimlaydi. Jarayonlar sonini `--processes=4` bilan belgilash mumkin. Pest ham `--parallel` ni qo'llab-quvvatlaydi. Sizning vazifangiz — testlar parallel ishlashga tayyor bo'lsin.",
    "",
    "### Izolyatsiya",
    "Har jarayon boshqalarning ma'lumotiga tegmasligi kerak:",
    "- **DB**: Laravel har jarayon uchun alohida baza yaratadi (nomi `<db>_test_<token>` ko'rinishida). Siz hech narsa qilmaysiz.",
    "- **Redis, cache**: jarayon tokenini kalit prefiksiga qo'shing (`ParallelTesting::token()`).",
    "- **Fayllar**: har jarayon uchun alohida papka yoki disk ildizi.",
    "- **Tashqi resurslar**: sandbox yozuvlari, portlar to'qnashmasligi uchun jarayonga xos nomlar.",
    "",
    "### Hook'lar",
    "`ParallelTesting::setUpProcess()`, `setUpTestCase()`, `setUpTestDatabase()` kabi hook'lar jarayon yoki test boshlanishida maxsus sozlash (masalan, DB'ni seeder bilan to'ldirish) qilishga imkon beradi.",
    "",
    "### Kamchiliklar",
    "- Har jarayon uchun DB yaratish boshlang'ich vaqt oladi (sxema dump uni tezlashtiradi).",
    "- Resurs ko'p (xotira, CPU), CI'da yadrolar soni cheklangan bo'lishi mumkin.",
    "- Parallel rejimda yashiringan izolyatsiya xatolari chiqadi. Buni muammo emas, foyda deb qarang: testlar aslida mustaqil bo'lmagan.",
    "",
    "### Qamrov bilan",
    "Parallel rejimda coverage ham ishlaydi, lekin sekinlashishi mumkin. CI'da ko'pincha parallel testlar bir bosqichda, coverage alohida ishga tushiriladi."
  ],
  "examples": [
    {
      "title": "Ishga tushirish",
      "lang": "bash",
      "code": [
        "php artisan test --parallel",
        "php artisan test --parallel --processes=4",
        "php artisan test --parallel --recreate-databases   # DB'larni qayta yaratish"
      ],
      "note": "--recreate-databases sxema o'zgargandan keyin kerak bo'ladi."
    },
    {
      "title": "Jarayonga xos prefiks",
      "lang": "php",
      "code": [
        "// app/Providers/AppServiceProvider.php::boot()",
        "ParallelTesting::setUpProcess(function (int $token) {",
        "    config(['cache.prefix' => \"test{$token}_\"]);",
        "});",
        "",
        "ParallelTesting::setUpTestDatabase(function (string $database, int $token) {",
        "    Artisan::call('db:seed', ['--class' => ReferenceDataSeeder::class]);",
        "});"
      ],
      "note": "Har jarayon o'z kesh prefiksi va to'ldirilgan DB'si bilan ishlaydi."
    }
  ],
  "pitfalls": [
    "Umumiy Redis kalitlari yoki fayl nomlari bilan parallel ishga tushirish: jarayonlar bir-birining ma'lumotini o'zgartiradi.",
    "Parallel rejimdagi yiqilishni \"parallel aybdor\" deb qoldirish: odatda testlarning o'zida yashirin bog'liqlik bor.",
    "Yadrolar sonidan ko'p jarayon ishga tushirish: konteyner almashishi tezlikni oshirmaydi, kamaytiradi.",
    "Sxema o'zgargandan keyin DB'larni qayta yaratmaslik: jarayonlar eski sxema bilan ishlaydi."
  ]
});
