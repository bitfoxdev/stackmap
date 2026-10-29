/* Chuqur dars: 74.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.10", {
  "lesson": [
    "### Baza testlari izolyatsiyasi",
    "Har test boshqa testlar qoldirgan ma'lumotdan **toza** va mustaqil holatda ishlashi kerak. Aks holda testlar tartibga bog'liq bo'lib qoladi: yakka o'tadi, to'plamda yiqiladi.",
    "",
    "### RefreshDatabase",
    "Laravel'da `RefreshDatabase` trait'i migratsiyalarni bir marta bajaradi, keyin har testni **tranzaksiya** ichida yurgizadi va tugagach `ROLLBACK` qiladi. Shuning uchun:",
    "- har test toza DB bilan boshlanadi;",
    "- tozalash juda tez (jadvallarni o'chirish emas, bitta rollback);",
    "- testlar tartibiga bog'liqlik yo'qoladi.",
    "",
    "### Variantlar",
    "- `RefreshDatabase`: odatiy tanlov, tranzaksiya asosida.",
    "- `LazilyRefreshDatabase`: faqat DB'ga murojaat qilgan testlarda migratsiya ishga tushadi.",
    "- `DatabaseTransactions`: sxema tayyor deb hisoblab, faqat tranzaksiya ochadi.",
    "- `DatabaseTruncation`: har testdan keyin jadvallarni tozalaydi. Haqiqiy commit kerak bo'lganda.",
    "- `DatabaseMigrations`: har test uchun migratsiyani qayta bajaradi. Eng sekin.",
    "",
    "### Tranzaksiya cheklovlari",
    "Boshqa ulanish yoki jarayon (queue worker) commit qilinmagan o'zgarishni ko'rmaydi, `afterCommit` hodisalari alohida e'tibor talab qiladi, MySQL'da DDL implicit commit qiladi. Bunday testlar uchun truncation ishlating.",
    "",
    "### Test DB ni himoya qilish",
    "Dev DB'da testlarni hech qachon yurgizmang. Test DB nomini majburan tekshiring va `config:cache` qolib ketmaganini ta'minlang, aks holda `RefreshDatabase` ishchi ma'lumotni o'chirib yuborishi mumkin.",
    "",
    "### Parallel testlar",
    "`--parallel` bilan Laravel har jarayon uchun alohida DB yaratadi, shuning uchun izolyatsiya jarayonlar orasida ham saqlanadi."
  ],
  "examples": [
    {
      "title": "RefreshDatabase",
      "lang": "php",
      "code": [
        "uses(RefreshDatabase::class);",
        "",
        "it('starts every test with an empty orders table', function () {",
        "    expect(Order::count())->toBe(0);",
        "    Order::factory()->count(3)->create();",
        "    expect(Order::count())->toBe(3);",
        "});",
        "",
        "it('does not see orders of the previous test', function () {",
        "    expect(Order::count())->toBe(0);",
        "});"
      ],
      "note": "Rollback tufayli ikkinchi test toza DB'ni ko'radi."
    },
    {
      "title": "Haqiqiy commit kerak bo'lganda",
      "lang": "php",
      "code": [
        "uses(DatabaseTruncation::class);",
        "",
        "it('lets a second connection see committed data', function () {",
        "    Order::factory()->create();",
        "",
        "    expect(DB::connection('reports')->table('orders')->count())->toBe(1);",
        "});"
      ],
      "note": "Ikkinchi ulanish tranzaksiyadagi o'zgarishni ko'rmasdi, shuning uchun truncation."
    }
  ],
  "pitfalls": [
    "Dev DB'da testlarni ishga tushirish: `RefreshDatabase` ishchi jadvallarni o'chirishi mumkin.",
    "Tranzaksiya asosidagi testda boshqa ulanishdan o'qishni kutish: commit qilinmagan ma'lumot ko'rinmaydi.",
    "Testlarda umumiy ma'lumotga tayanish: tartib o'zgarsa yiqiladi.",
    "Hamma testda `DatabaseMigrations` ishlatish: to'plam keraksiz sekinlashadi."
  ]
});
