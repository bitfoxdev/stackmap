/* Chuqur dars: 2.40. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.40", {
  "lesson": [
    "### Matn",
    "`Str::slug('Salom Dunyo')`, `Str::limit($t, 100)`, `Str::mask('9987654321', '*', 3)`, `Str::uuid()`, `Str::ulid()`, `Str::random(32)`, `Str::contains`, `Str::startsWith`, `Str::of(...)`.",
    "**Fluent**: `str('  Salom ')->trim()->lower()->slug()->limit(20)->toString()`; `Str::of($s)->replace()->title()->after()->before()->explode()`. `str()` — `Str::of` ning qisqasi.",
    "",
    "### Massiv",
    "`Arr::get($arr, 'a.b.c', default)`, `Arr::only`, `Arr::except`, `Arr::pluck`, `Arr::dot` / `Arr::undot`, `Arr::wrap`, `Arr::first/last`, `Arr::flatten`. `data_get($model_or_array, 'user.address.city', default)` va `data_set`, `data_fill` — massiv, obyekt va kolleksiyada bir xil ishlaydi, `*` wildcard bilan.",
    "",
    "### Number",
    "`Number::format(1234.5, precision: 1, locale: 'uz')`, `Number::currency(1000, 'UZS', 'uz')`, `Number::fileSize(1024 * 1024)` → `1 MB`, `Number::percentage(12.5)`, `Number::abbreviate(1_200_000)`, `Number::spell(3)`. `intl` PHP kengaytmasi kerak.",
    "",
    "### Boshqa",
    "- `tap($v, fn ($v) => ...)` — qiymatni qaytaradi, yon amal bilan. `rescue(fn () => risky(), $default)` — istisnoni `report` qilib default qaytaradi.",
    "- `retry($times, fn () => call(), $sleepMs, $when)` — qayta urinish (idempotent amal uchun).",
    "- `Sleep::for(500)->milliseconds()`; testda `Sleep::fake()` — kutmaydi, `Sleep::assertSlept(...)`. `usleep/sleep` o'rniga Sleep ishlating.",
    "- `Uri::of('https://a.com/x')->withQuery(['p' => 1])->path('y')` — URL qurish. `Benchmark::dd(fn)` — tezlik o'lchash. `Lottery::odds(1, 100)->winner(fn () => ...)` — ehtimoliy ishga tushirish (sampling).",
    "- `now()`, `today()`, `collect()`, `value()`, `when()`, `blank()`, `filled()`, `optional()`, `throw_if()`, `abort_if()`, `cache()`, `to_route()`.",
    "",
    "### Qoidalar",
    "1. Avval framework yordamchisini qidiring, keyin o'zingiz yozing.",
    "2. Maxsus/qayta ishlatiladigan mantiq uchun alohida klass, yordamchi funksiyaga yig'maslik.",
    "3. `retry` faqat idempotent amalga; `Sleep` — testda fake.",
    "4. Global helper o'rniga jamoada kelishilgan uslub (facade yoki helper) izchil."
  ],
  "examples": [
    {
      "title": "Matn, massiv, raqam",
      "lang": "php",
      "note": "Fluent va data_get",
      "code": [
        "use Illuminate\\Support\\{Arr, Number, Str};",
        "",
        "$slug = str('  Laravel Dars #1  ')->trim()->slug()->limit(20, '')->toString();",
        "$masked = Str::mask('9987654321', '*', 3);                    // 998*******",
        "$city = data_get($order, 'customer.address.city', 'Noma\\'lum');",
        "$items = Arr::only($payload, ['name', 'price']);",
        "",
        "echo Number::currency(1500000, 'UZS', 'uz');",
        "echo Number::fileSize(5 * 1024 * 1024);                       // 5 MB"
      ]
    },
    {
      "title": "retry va Sleep",
      "lang": "php",
      "note": "Beqaror chaqiruv va test",
      "code": [
        "$data = retry(3, fn () => Http::timeout(5)->get($url)->throw()->json(), 200);",
        "",
        "$value = rescue(fn () => $this->fetchRate(), 12500.0);        // xato bo'lsa default, xato report qilinadi",
        "",
        "public function test_waits_between_attempts(): void",
        "{",
        "    Sleep::fake();",
        "",
        "    $this->service->pollUntilReady();",
        "",
        "    Sleep::assertSleptTimes(3);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`retry()` ni idempotent bo'lmagan amalga (to'lov, email) qo'llash: ikki marta bajariladi.",
    "Testda haqiqiy `sleep()`/`usleep()` ishlatish: test sekinlashadi; `Sleep` + `Sleep::fake()`.",
    "`Number::currency` ni `intl` kengaytmasisiz ishlatish: xato; kengaytmani o'rnating.",
    "`data_get` dan keyin tur tekshirmaslik: `null`/kutilmagan tur kelishi mumkin.",
    "`rescue` bilan xatoni \"yutib yuborish\": xato report qilinadi, lekin natija jimgina default bo'ladi; muhim joyda ishlatmang.",
    "Har bir mayda ish uchun o'z `helpers.php` yozish: framework allaqachon bor narsani takrorlash."
  ]
});
