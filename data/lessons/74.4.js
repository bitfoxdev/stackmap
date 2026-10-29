/* Chuqur dars: 74.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.4", {
  "lesson": [
    "### Feature test nima",
    "Feature test — Laravel'dagi eng asosiy test turi. U butun HTTP so'rovni bajaradi: route, middleware, validatsiya, controller, servis, DB, event'lar, javob. Natija foydalanuvchi ko'radigan xatti-harakat.",
    "",
    "### Nima uchun eng qimmatli",
    "Feature test **kam xarajat bilan yuqori ishonch** beradi. U haqiqiy HTTP serverisiz ishlagani uchun tez, lekin butun zanjirni sinaydi. Unit testlarda alohida to'g'ri qismlar birgalikda ishlamasligi mumkin; feature test bu bo'shliqni yopadi.",
    "",
    "### Tuzilishi",
    "1. **Arrange**: factory bilan ma'lumot, `actingAs()` bilan foydalanuvchi.",
    "2. **Act**: `postJson`, `getJson` va hokazo.",
    "3. **Assert**: javob (status, JSON), DB holati (`assertDatabaseHas`), yon ta'sirlar (`Queue::assertPushed`, `Mail::assertQueued`).",
    "",
    "### Nimani qamrash kerak",
    "Har endpoint uchun: muvaffaqiyat, validatsiya xatosi, autentifikatsiya (mehmon), avtorizatsiya (ruxsatsiz foydalanuvchi) va chekka holatlar. Bu \"endpoint matritsasi\" butun API xavfsizligi va to'g'riligini beradi.",
    "",
    "### Tashqi servislar",
    "Feature testda tashqi servislar (`Http::fake`, `Mail::fake`, `Queue::fake`) fake qilinadi, DB esa haqiqiy bo'ladi. Shunda test tez va barqaror, lekin ichki mantiq haqiqiy.",
    "",
    "### Hajm haqida",
    "Feature testlar unit'dan sekin. Murakkab mantiqni (hisob-kitob, qoidalar) unit testlarga chiqaring, feature test esa ulanish va oqimni tekshirsin."
  ],
  "examples": [
    {
      "title": "Endpoint testi",
      "lang": "php",
      "code": [
        "it('creates an order for the authenticated customer', function () {",
        "    Queue::fake();",
        "    $customer = Customer::factory()->create();",
        "    $product = Product::factory()->create(['stock' => 10]);",
        "",
        "    $this->actingAs($customer->user)",
        "        ->postJson('/api/orders', ['items' => [['product_id' => $product->id, 'qty' => 2]]])",
        "        ->assertCreated()",
        "        ->assertJsonPath('data.status', 'pending');",
        "",
        "    $this->assertDatabaseHas('orders', ['customer_id' => $customer->id, 'status' => 'pending']);",
        "    Queue::assertPushed(ReserveStock::class);",
        "});"
      ],
      "note": "Javob, DB va yon ta'sir bir testda, lekin bitta xatti-harakat uchun."
    },
    {
      "title": "Endpoint matritsasi",
      "lang": "php",
      "code": [
        "it('rejects guests', fn () => $this->postJson('/api/orders', [])->assertUnauthorized());",
        "",
        "it('validates the payload', fn () => $this->actingAs($user)",
        "    ->postJson('/api/orders', ['items' => []])->assertJsonValidationErrors('items'));",
        "",
        "it('forbids viewers', fn () => $this->actingAs($viewer)",
        "    ->postJson('/api/orders', $payload)->assertForbidden());"
      ],
      "note": "Mehmon, validatsiya va ruxsat holatlari har endpoint uchun takrorlanadi."
    }
  ],
  "pitfalls": [
    "Murakkab hisob-kitobni faqat feature testda sinash: sekin va xato joyini topish qiyin. Unit testga chiqaring.",
    "Faqat baxtli yo'lni testlash: autentifikatsiya, ruxsat va validatsiya xatolari tekshirilmaydi.",
    "Tashqi servisni fake qilmaslik: testlar sekin, beqaror va pulli bo'lib qoladi.",
    "Faqat javobni tekshirish: DB holati va yon ta'sirlar tekshirilmay qoladi."
  ]
});
