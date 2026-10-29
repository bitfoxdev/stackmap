/* Chuqur dars: 74.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.5", {
  "lesson": [
    "### API testlari",
    "REST API testlari endpoint'larning **shartnomasini** tekshiradi: HTTP status kodlari, JSON tuzilmasi, maydon tiplari va xato formatlari. Frontend va boshqa iste'molchilar shu shartnomaga tayanadi, shuning uchun uni buzish eng qimmat xatolardan.",
    "",
    "### Asosiy assertion'lar",
    "- `assertJsonStructure([...])`: tuzilma (kalitlar).",
    "- `assertJsonPath('data.status', 'paid')`: aniq qiymat.",
    "- `assertJsonFragment(['id' => 5])`: javobning istalgan joyida fragment.",
    "- `assertJsonCount(3, 'data')`, `assertJsonMissingPath(...)`.",
    "- Fluent: `assertJson(fn (AssertableJson $json) => ...)`.",
    "",
    "### Salbiy holatlar",
    "Faqat `200` ni tekshirmang. Quyidagilar ham shartnomaning bir qismi:",
    "- `401 Unauthorized`: autentifikatsiya yo'q.",
    "- `403 Forbidden`: ruxsat yo'q.",
    "- `404 Not Found`: resurs yo'q.",
    "- `422 Unprocessable Entity`: validatsiya xatosi va xato kalitlari.",
    "- `429 Too Many Requests`: rate limit.",
    "",
    "### Tiplar va format",
    "Tipni tekshiring: `id` son, `price` raqam (satr emas), `created_at` ISO 8601, bo'sh qiymat `null` yoki yo'q. Tip o'zgarishi iste'molchilarni jim sindiradi.",
    "",
    "### Versiyalash va orqaga moslik",
    "Ommaviy API'da maydonni olib tashlash yoki tipini o'zgartirish buzuvchi o'zgarish. Testlar shuni ushlashi uchun javob tuzilmasi aniq tekshirilsin. Yangi maydon qo'shish buzmaydi, shuning uchun `assertExactJson` o'rniga `assertJson` ishlatish qulayroq.",
    "",
    "### OpenAPI bilan",
    "Javoblarni OpenAPI sxemasi bilan avtomatik solishtiradigan vositalar mavjud. Bu hujjat va kod mos kelishini kafolatlaydi."
  ],
  "examples": [
    {
      "title": "Shartnoma va tiplar",
      "lang": "php",
      "code": [
        "it('returns the order contract', function () {",
        "    $order = Order::factory()->paid()->create();",
        "",
        "    $this->actingAs($order->customer->user)",
        "        ->getJson(\"/api/orders/{$order->id}\")",
        "        ->assertOk()",
        "        ->assertJsonStructure(['data' => ['id', 'status', 'total', 'created_at']])",
        "        ->assertJson(fn (AssertableJson $json) => $json",
        "            ->has('data', fn ($d) => $d",
        "                ->whereType('id', 'integer')",
        "                ->whereType('total', 'integer')",
        "                ->where('status', 'paid')",
        "                ->etc()));",
        "});"
      ],
      "note": "Tuzilma va tiplar birgalikda shartnomani tashkil qiladi."
    },
    {
      "title": "Salbiy holatlar",
      "lang": "php",
      "code": [
        "it('answers 401, 403, 404 and 422 consistently', function () {",
        "    $this->getJson('/api/orders')->assertUnauthorized();",
        "    $this->actingAs($viewer)->postJson('/api/orders', $payload)->assertForbidden();",
        "    $this->actingAs($user)->getJson('/api/orders/999999')->assertNotFound();",
        "    $this->actingAs($user)->postJson('/api/orders', [])->assertUnprocessable()->assertJsonStructure(['message', 'errors']);",
        "});"
      ],
      "note": "Xato javoblari ham izchil formatda bo'lishi kerak."
    }
  ],
  "pitfalls": [
    "Faqat `200` holatini tekshirish: xato formati va ruxsat holatlari sinalmaydi.",
    "Tipni tekshirmaslik: `price` songa o'rniga satr qaytib, iste'molchilarni jim sindiradi.",
    "`assertExactJson` ni ko'p ishlatish: yangi maydon qo'shilganda ortiqcha testlar sinadi.",
    "Maydonni olib tashlash yoki qayta nomlashni testlamaslik: orqaga mosliksiz o'zgarish productionga chiqadi."
  ]
});
