/* Chuqur dars: 74.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.19", {
  "lesson": [
    "### Testlarni qo'llab-quvvatlash",
    "Testlar ham kod: ularni yozish bir marta, qo'llab-quvvatlash esa doimiy. Yomon saqlangan testlar jamoani sekinlashtiradi va oxir-oqibat o'chirib tashlanadi yoki e'tiborsiz qoldiriladi.",
    "",
    "### Toza test kodi",
    "- **Tushunarli nomlar**: test nomi xatti-harakatni ifodalaydi.",
    "- **DRY, lekin me'yorida**: takrorlanuvchi setup'ni yordamchi funksiya, factory holati yoki `beforeEach` ga chiqaring. Lekin har test o'zining **muhim** qiymatlarini ochiq ko'rsatsin; ortiqcha abstraksiya testni o'qib bo'lmas qiladi.",
    "- **Yordamchilar**: stsenariy funksiyalari (`placeOrder()`), maxsus expectation'lar, builder'lar.",
    "- **Tuzilma**: testlar kod tuzilmasini aks ettirsin (`tests/Unit/Billing/...`).",
    "",
    "### Mo'rt testlar (brittle tests)",
    "Kichik biznes o'zgarishida **ko'p** test sinsa, demak testlar implementatsiya tafsilotiga haddan tashqari bog'langan. Sabablari:",
    "- ichki sinflarni mock qilish va chaqiruv tartibini tekshirish;",
    "- aniq matn yoki HTML tuzilmasiga bog'lanish;",
    "- umumiy katta fixture;",
    "- private holatni tekshirish.",
    "",
    "Yechim: **xatti-harakatni** tekshiring, ichki tuzilmani emas. Fake'lar, natija assertion'lari, barqaror selektorlar.",
    "",
    "### O'zgarishda test yangilash",
    "Talab o'zgarsa, test ham o'zgarishi kerak: bu normal. Ammo har bir mayda refactoring testni sindirsa, bu dizayn belgisi. Testni \"yashil qilish uchun\" shunchaki assertion'ni o'zgartirish xavfli: avval nima uchun yiqilganini tushuning.",
    "",
    "### Tozalash",
    "Eskirgan, takroriy va foydasiz testlarni o'chiring. Skip qilingan va karantindagi testlarni muntazam ko'rib chiqing. Qiymat bermaydigan test — faqat yuk."
  ],
  "examples": [
    {
      "title": "Mo'rt va barqaror test",
      "lang": "php",
      "code": [
        "// ❌ mo'rt: ichki tartibga bog'langan",
        "$repo = Mockery::mock(OrderRepository::class);",
        "$repo->shouldReceive('findOrFail')->once()->ordered();",
        "$repo->shouldReceive('save')->once()->ordered();",
        "",
        "// ✅ barqaror: natijaga qaraydi",
        "$action->handle($orderId);",
        "expect($repo->find($orderId)->status())->toBe(OrderStatus::Paid);"
      ],
      "note": "Ikkinchi test ichki chaqiruvlar o'zgarsa ham yiqilmaydi."
    },
    {
      "title": "Stsenariy yordamchisi",
      "lang": "php",
      "code": [
        "// tests/Support/helpers.php",
        "function paidOrder(array $override = []): Order",
        "{",
        "    return Order::factory()->paid()->create($override);",
        "}",
        "",
        "it('refunds a paid order', function () {",
        "    $order = paidOrder(['total' => 50_000]);   // muhim qiymat ochiq",
        "",
        "    app(RefundOrder::class)->handle($order);",
        "",
        "    expect($order->fresh()->status)->toBe(OrderStatus::Refunded);",
        "});"
      ],
      "note": "Takror yordamchida, muhim qiymat testning o'zida."
    }
  ],
  "pitfalls": [
    "Testni yashil qilish uchun assertion'ni shunchaki o'zgartirish: yiqilish sababini tushunmasdan xatoni yashirish.",
    "Ortiqcha abstraksiya: testni tushunish uchun besh fayl o'qishga to'g'ri keladi.",
    "Implementatsiyaga bog'langan mock'lar: har refactoring'da yuzlab test sinadi.",
    "Eskirgan va skip qilingan testlarni yillab saqlash: ular yuk bo'lib, qiymat bermaydi."
  ]
});
