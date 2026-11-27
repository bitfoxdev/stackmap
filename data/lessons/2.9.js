/* Chuqur dars: 2.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.9", {
  "lesson": [
    "### Qanday ishlaydi",
    "`Cache::get('k')` → `Illuminate\\Support\\Facades\\Cache` ichidagi `getFacadeAccessor()` `'cache'` qaytaradi → `__callStatic` container'dan `'cache'` servisini oladi va `get('k')` ni **obyektda** chaqiradi. Ya'ni facade — container servisiga proksi. Ro'yxat: Laravel docs \"Facade Class Reference\" (`Auth`, `Cache`, `DB`, `Event`, `Http`, `Log`, `Mail`, `Queue`, `Route`, `Schema`, `Storage`, `URL`, `Validator`, ...).",
    "",
    "### Facade vs DI",
    "| | Facade | Constructor injection |",
    "|---|---|---|",
    "| Qisqalik | `Cache::get()` | constructor + property |",
    "| Bog'liqlik | yashirin (klassni ochmay ko'rinmaydi) | ochiq |",
    "| Test | `Facade::fake()` / `shouldReceive` | mock/fake obyekt |",
    "| IDE/statik tahlil | helper kerak (`barryvdh/ide-helper`) | tabiiy |",
    "| \"Class creep\" | oson (1 qator qo'shish) | constructor o'sishi signal beradi |",
    "Qoida: framework servislari (Cache, Log, Storage) uchun facade qabul qilingan; **o'z domen servislari** uchun constructor injection. Jamoa kelishuvi muhim.",
    "",
    "### Test",
    "- `Mail::fake()`, `Queue::fake()`, `Event::fake()`, `Storage::fake()`, `Notification::fake()`, `Http::fake()`, `Bus::fake()` — fake obyekt bilan almashtiradi, keyin `assertSent/Queued/Dispatched`.",
    "- `Cache::shouldReceive('get')->once()->with('k')->andReturn('v')` — Mockery bilan kutilgan chaqiruv; `Cache::spy()` keyin tekshirish.",
    "- Haqiqiy implementatsiya yaxshiroq bo'lsa (Cache `array` driver) — fake o'rniga undan foydalaning.",
    "",
    "### Real-time facade",
    "Istalgan klassga `use Facades\\App\\Services\\Report;` — `Report::build()` obyektga chaqirish, container orqali; klassni o'zgartirmay \"facade\" qiladi va testda `Report::shouldReceive(...)`. Kamdan-kam ishlatiladi.",
    "",
    "### Helper funksiyalar",
    "`cache()`, `config()`, `logger()`, `session()`, `view()`, `auth()`, `request()`, `app()`, `now()`, `collect()` — bir xil servislarga qisqa yo'l (ichida facade/container).",
    "",
    "### Qoidalar",
    "1. Facade'ni constructor-bog'liqlik o'rnini bosuvchi \"yashirin global\" sifatida o'z servislaringizga qo'llamang.",
    "2. Testlarda fake'lar haqiqiy tashqi chaqiruvni oldini oladi.",
    "3. Bir klassda 5+ facade — SRP belgisi.",
    "4. `Auth::user()` ni servis ichida emas, controller'dan argument sifatida bering."
  ],
  "examples": [
    {
      "title": "Facade va DI",
      "lang": "php",
      "note": "Ikki variant",
      "code": [
        "// Facade",
        "class Rates",
        "{",
        "    public function usd(): float",
        "    {",
        "        return Cache::remember('rate:usd', 3600, fn () => $this->fetch());",
        "    }",
        "}",
        "",
        "// Constructor injection (ochiq bog'liqlik)",
        "use Illuminate\\Contracts\\Cache\\Repository;",
        "",
        "class Rates",
        "{",
        "    public function __construct(private readonly Repository $cache) {}",
        "",
        "    public function usd(): float",
        "    {",
        "        return $this->cache->remember('rate:usd', 3600, fn () => $this->fetch());",
        "    }",
        "}"
      ]
    },
    {
      "title": "Facade test",
      "lang": "php",
      "note": "fake va shouldReceive",
      "code": [
        "public function test_order_sends_mail(): void",
        "{",
        "    Mail::fake();",
        "    $this->postJson('/orders', $this->payload())->assertCreated();",
        "    Mail::assertQueued(OrderReceipt::class);",
        "}",
        "",
        "public function test_rate_is_cached(): void",
        "{",
        "    Cache::shouldReceive('remember')->once()->with('rate:usd', 3600, Mockery::type('Closure'))->andReturn(12500.0);",
        "    $this->assertSame(12500.0, app(Rates::class)->usd());",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Bitta klassda o'nlab facade: bog'liqliklar yashirin o'sadi (class creep); constructor ko'rinishi bu signalni beradi.",
    "`Auth::user()`/`request()` ni servis qatlamida ishlatish: HTTP kontekstiga qotib qoladi, buyruq/queue'da `null`; argument qiling.",
    "Facade'ni `static` deb o'ylab, holat saqlash: aslida container obyekti, Octane'da so'rovlar orasida bo'lishi mumkin.",
    "`Mail::fake()` ni chaqirmay `assertSent`: tashqi xat haqiqatan ketadi yoki assert xato beradi.",
    "`Cache::shouldReceive` ni ortiqcha qo'llash: implementatsiyaga bog'liq mo'rt test; `array` driver bilan natijani tekshiring.",
    "IDE helper'siz facade metodlari \"topilmadi\" ko'rinadi: `ide-helper` yoki PHPDoc `@method`."
  ]
});
