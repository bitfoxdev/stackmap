/* Chuqur dars: 2.30. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.30", {
  "lesson": [
    "### Asoslar",
    "```php",
    "$res = Http::withToken($token)->acceptJson()->timeout(5)->get('https://api.example.com/users', ['page' => 1]);",
    "$res->ok(); $res->status(); $res->json('data.0.id'); $res->body(); $res->header('X-Id'); $res->failed(); $res->successful();",
    "```",
    "`post($url, $data)` (JSON default; forma uchun `asForm()`), `put`, `patch`, `delete`, `attach('file', $contents, 'a.pdf')` (multipart), `withHeaders`, `withBasicAuth`, `baseUrl()`, `withUserAgent`, `withQueryParameters`, `withCookies`.",
    "",
    "### Xato boshqaruvi",
    "`4xx/5xx` Laravel Http klientida **istisno tashlamaydi**, `Response` qaytaradi. Variantlar: `$res->throw()` (RequestException), `->throwIf(...)`, `->throwUnlessStatus(...)`, `Http::...->throw()->get()` zanjirda. Ulanish xatosi (timeout, DNS) — `ConnectionException`. `retry(3, 200, fn ($e, $req) => $e instanceof ConnectionException, throw: false)` — qayta urinish (ms oralig'i, shart). **Faqat idempotent** operatsiyani retry qiling (GET, PUT, idempotency-key bilan POST).",
    "",
    "### Timeout",
    "Default timeout bor (30 s); har doim aniq belgilang: `->timeout(5)` (butun so'rov), `->connectTimeout(2)`. Timeout'siz tashqi chaqiruv butun worker/so'rovni osib qo'yadi.",
    "",
    "### Parallel",
    "`Http::pool(fn (Pool $pool) => [$pool->as('a')->get(...), $pool->as('b')->get(...)])` → natijalar `$responses['a']`. Katta fan-out uchun queue job'larga bo'ling.",
    "",
    "### Sozlangan klient",
    "`Http::macro('billing', fn () => Http::baseUrl(config('services.billing.url'))->withToken(config('services.billing.token'))->timeout(5)->retry(3, 200)->acceptJson());` → `Http::billing()->post(...)`. Yoki alohida klass (`BillingClient`) ichida; testlash oson.",
    "",
    "### Middleware va log",
    "`->withRequestMiddleware(fn ($r) => $r->withHeader('X-Trace', ...))`, `withResponseMiddleware`. Event: `RequestSending`, `ResponseReceived`, `ConnectionFailed`. Loglashda **sirlarni** (token, kartalar) chiqarmang.",
    "",
    "### Test",
    "`Http::fake(['api.example.com/*' => Http::response(['ok' => true], 200)])`; `Http::fakeSequence()`; `Http::assertSent(fn ($r) => $r->url() === '...' && $r['id'] === 1)`; `Http::preventStrayRequests()` — fake'siz haqiqiy so'rovga yo'l qo'ymaydi (CI uchun majburiy).",
    "",
    "### Qoidalar",
    "1. Har chaqiruvga timeout; retry faqat idempotentga.",
    "2. Tashqi javobni validatsiya qiling (ishonchsiz); `json()` kutilgan tuzilmada ekaniga tayanmang.",
    "3. Tashqi xatolik biznes oqimini buzmasin (queue, circuit breaker, fallback).",
    "4. Testda `preventStrayRequests`."
  ],
  "examples": [
    {
      "title": "Sozlangan klient va xato",
      "lang": "php",
      "note": "macro, retry, throw",
      "code": [
        "use Illuminate\\Http\\Client\\ConnectionException;",
        "use Illuminate\\Support\\Facades\\Http;",
        "",
        "Http::macro('billing', fn () => Http::baseUrl(config('services.billing.url'))",
        "    ->withToken(config('services.billing.token'))",
        "    ->acceptJson()",
        "    ->timeout(5)->connectTimeout(2)",
        "    ->retry(3, 200, fn ($e) => $e instanceof ConnectionException, throw: false));",
        "",
        "$invoice = Http::billing()",
        "    ->withHeaders(['Idempotency-Key' => $key])",
        "    ->post('/invoices', ['order_id' => $order->id])",
        "    ->throw()                       // 4xx/5xx -> RequestException",
        "    ->json();"
      ]
    },
    {
      "title": "Parallel va test",
      "lang": "php",
      "note": "pool, fake",
      "code": [
        "$r = Http::pool(fn ($pool) => [",
        "    $pool->as('users')->get('https://api.example.com/users'),",
        "    $pool->as('orders')->get('https://api.example.com/orders'),",
        "]);",
        "$users = $r['users']->json();",
        "",
        "public function test_invoice_created(): void",
        "{",
        "    Http::preventStrayRequests();",
        "    Http::fake(['billing.test/*' => Http::response(['id' => 7], 201)]);",
        "",
        "    $this->assertSame(7, app(BillingClient::class)->create($order)['id']);",
        "    Http::assertSent(fn ($req) => $req->hasHeader('Idempotency-Key'));",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Timeout bermaslik: tashqi tizim \"osilib\" qolsa butun worker/PHP-FPM jarayoni band bo'ladi.",
    "Non-idempotent POST'ni retry qilish: to'lov/buyurtma ikki marta yaratiladi; Idempotency-Key.",
    "`4xx/5xx` istisno tashlaydi deb o'ylash: `throw()`siz xato \"jim\" o'tib ketadi va `json()` bo'sh qaytadi.",
    "Tashqi javobga ishonib `->json('data.id')` ni validatsiyasiz ishlatish: format o'zgarsa `null`.",
    "Testda `Http::fake()` qilmay yoki `preventStrayRequests`siz yozish: CI haqiqiy API'ga so'rov yuboradi.",
    "Token/karta ma'lumotini so'rov/javob logiga chiqarish: loglarda sir sizadi."
  ]
});
