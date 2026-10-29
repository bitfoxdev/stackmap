/* Chuqur dars: 74.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.11", {
  "lesson": [
    "### Test ma'lumotlari",
    "Testlar uchun ma'lumotni qanday yaratish — test o'qilishi va barqarorligini belgilaydi. Laravel'da buning asosiy vositasi **Model Factory** va **Seeder**.",
    "",
    "### Factory",
    "Factory model uchun standart (haqiqiyga o'xshash) qiymatlarni yaratadi. Test faqat o'ziga **muhim** maydonlarni belgilaydi: `User::factory()->create(['role' => 'admin'])`. Qolganini factory to'ldiradi, shuning uchun test qisqa va niyati ochiq.",
    "",
    "### State (holat)",
    "Nomlangan holatlar o'qiluvchanlikni oshiradi: `User::factory()->unverified()->admin()->create()`. Holat nomi niyatni ifodalaydi va takrorlanuvchi sozlamani bir joyga yig'adi. Bog'lanishlar uchun `for()`, `has()`, `recycle()`.",
    "",
    "### Seeder",
    "Seeder ma'lumotnoma (reference) ma'lumotlari uchun: mamlakatlar, valyutalar, rollar, ruxsatlar. Ular hamma testga kerak va kam o'zgaradi.",
    "",
    "### Man etilganlar",
    "- **Qattiq yozilgan id**: `User::find(1)` tartib va tasodifga bog'liq.",
    "- **Production'dan nusxalangan ma'lumot**: shaxsiy ma'lumot sizishi va tushunib bo'lmaydigan holatlar.",
    "- **Hamma testlar tayanadigan bitta katta fixture**: bir o'zgarish ko'p testni sindiradi.",
    "- **Testlar orasida umumiy ma'lumot**: izolyatsiya buziladi.",
    "",
    "### Faker",
    "Faker tasodifiy qiymat beradi, ba'zan kutilmagan (juda uzun satr, maxsus belgi). Bu foydali: u haqiqiy xatolarni ochadi. Lekin test natijasi tasodifga bog'liq bo'lsa, qiymatni aniq belgilang. `unique()` ko'p yozuvda tugab qolishi mumkin.",
    "",
    "### Minimal ma'lumot",
    "Test uchun zarur bo'lgan eng kam ma'lumotni yarating. Ko'p ma'lumot testni sekin va tushunarsiz qiladi."
  ],
  "examples": [
    {
      "title": "Holatlar va bog'lanish",
      "lang": "php",
      "code": [
        "// database/factories/UserFactory.php",
        "public function admin(): static",
        "{",
        "    return $this->state(fn () => ['role' => 'admin']);",
        "}",
        "",
        "public function unverified(): static",
        "{",
        "    return $this->state(fn () => ['email_verified_at' => null]);",
        "}",
        "",
        "// testda",
        "$admin = User::factory()->admin()->create();",
        "$customer = Customer::factory()->has(Order::factory()->count(3))->create();"
      ],
      "note": "Holat nomi niyatni ifodalaydi, has() bog'liq yozuvlarni yaratadi."
    },
    {
      "title": "Muhim qiymatlar ochiq",
      "lang": "php",
      "code": [
        "it('does not allow unverified users to place orders', function () {",
        "    $user = User::factory()->unverified()->create();",
        "",
        "    $this->actingAs($user)->postJson('/api/orders', $payload)->assertForbidden();",
        "});"
      ],
      "note": "Aynan shu testga kerak bo'lgan holat (tasdiqlanmagan) ochiq ko'rinadi."
    }
  ],
  "pitfalls": [
    "Qattiq yozilgan id (`find(1)`): testlar tartibga va boshqa testlarga bog'liq bo'lib qoladi.",
    "Production ma'lumotini testda ishlatish: shaxsiy ma'lumot sizib chiqadi va holat tushunarsiz.",
    "Bitta katta umumiy fixture: bir o'zgarish ko'plab testni sindiradi.",
    "Factory'ni ortiqcha ma'lumot yaratadigan qilish: testlar sekinlashadi va kerak bo'lmagan bog'lanishlar paydo bo'ladi."
  ]
});
