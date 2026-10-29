/* Chuqur dars: 74.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.12", {
  "lesson": [
    "### Mocking strategiyasi",
    "Test double'lar (mock, stub, fake, spy) testni tashqi dunyodan ajratadi. Savol: **qachon va nimani** soxtalashtirish kerak. Noto'g'ri tanlov yoki ortiqcha mock test qiymatini yo'qotadi.",
    "",
    "### Laravel Fake'lari",
    "Laravel tayyor fake'lar beradi:",
    "- `Queue::fake()`: job'lar navbatga qo'yilmaydi, tekshiriladi.",
    "- `Event::fake()`: event'larni ushlaydi (aniq ro'yxat bilan).",
    "- `Mail::fake()`, `Notification::fake()`: xat va bildirishnoma yuborilmaydi.",
    "- `Http::fake()`: tashqi HTTP so'rovlar soxta javob oladi.",
    "- `Storage::fake()`, `Bus::fake()`, `Exceptions::fake()`.",
    "",
    "### Asosiy qoida",
    "**O'zingiz boshqarmaydigan tashqi chegaralarni** (tashqi API, SMS provayder, to'lov shlyuzi, xat yuborish) soxtalashtiring. O'zingizning ichki biznes sinflaringizni (domen modeli, xizmatlar) **haddan tashqari mock qilmang**.",
    "",
    "### Over-mocking xavfi",
    "Ichki sinflarni mock qilsangiz, test faqat \"A B'ni chaqirdi\" ni tekshiradi, ya'ni implementatsiyani nusxalaydi. Refactoring'da xatti-harakat o'zgarmasa ham test sinadi, aksincha, haqiqiy xato bo'lsa ham test yashil qolishi mumkin. Bunday test foydasiz.",
    "",
    "### Test double turlari",
    "- **Stub**: tayyor javob qaytaradi.",
    "- **Fake**: soddalashtirilgan ishlaydigan nusxa (in-memory repository). Ko'pincha eng yaxshisi.",
    "- **Mock**: chaqiruvlarni kutadi va tekshiradi.",
    "- **Spy**: chaqiruvlarni qayd qiladi, keyin tekshiriladi.",
    "",
    "### Tanlov",
    "Xatti-harakatga qarang (fake, natija), ichki chaqiruvlarga emas (mock). Iloji bo'lsa fake yoki haqiqiy obyektni ishlating."
  ],
  "examples": [
    {
      "title": "Tashqi chegarani fake qilish",
      "lang": "php",
      "code": [
        "it('sends the sms through the provider and stores the result', function () {",
        "    Http::fake(['api.eskiz.uz/*' => Http::response(['id' => 'sms-1', 'status' => 'sent'], 200)]);",
        "",
        "    app(SendOtp::class)->handle('+998901234567');",
        "",
        "    Http::assertSent(fn ($r) => $r['mobile_phone'] === '998901234567');",
        "    $this->assertDatabaseHas('otps', ['phone' => '+998901234567', 'provider_id' => 'sms-1']);",
        "});"
      ],
      "note": "Tashqi API fake, DB va ichki mantiq haqiqiy."
    },
    {
      "title": "Ichki sinfni mock qilish o'rniga fake",
      "lang": "php",
      "code": [
        "// ❌ ichki xizmatni mock: implementatsiyaga bog'langan",
        "$repo = Mockery::mock(OrderRepository::class);",
        "$repo->shouldReceive('save')->once();",
        "",
        "// ✅ fake: xatti-harakatni tekshiradi",
        "$repo = new InMemoryOrderRepository();",
        "$action->handle($customer, $lines);",
        "expect($repo->all())->toHaveCount(1);"
      ],
      "note": "Fake natijaga qaraydi, ichki chaqiruvlarga emas."
    }
  ],
  "pitfalls": [
    "Ichki biznes sinflarni mock qilish: test implementatsiyani nusxalaydi va refactoring'da sinadi.",
    "Fake bilan sinab, haqiqiy adapterni hech qachon tekshirmaslik: fake va haqiqat farq qilishi mumkin.",
    "Har chaqiruvni `shouldReceive` bilan qat'iy tartibda tekshirish: testlar juda mo'rt bo'ladi.",
    "`Event::fake()` ni ro'yxatsiz ishlatish: model event'lari ham o'chadi va kutilmagan xatti-harakat chiqadi."
  ]
});
