/* Chuqur dars: 2.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.8", {
  "lesson": [
    "### Nima va nega",
    "Yomon: `$stripe = new StripeClient(config('x'))` metod ichida (qattiq bog'liq, mock qilib bo'lmaydi). Yaxshi: constructor'da `PaymentGateway $gateway` — kim bergani muhim emas. Foydalar: test (fake), almashtirish (Stripe → Payme), bog'liqliklar ochiq (constructor'ga qarab sinf nimaga tayanishi ko'rinadi).",
    "",
    "### Laravel'da",
    "- **Constructor injection** (asosiy): `public function __construct(private PaymentGateway $gateway, private LoggerInterface $log) {}` — Laravel type-hint'ni container orqali hal qiladi (2.6). `readonly` property: `private readonly`.",
    "- **Method injection**: controller metodi, job `handle()`, listener `handle()`, middleware, Artisan `handle()` — Laravel type-hint qilingan klasslarni o'zi beradi.",
    "- **Closure/route**: `Route::get('/', function (Request $r, Service $s) {...})`.",
    "- `app()->call($callable)` — istalgan callable'ning bog'liqliklarini to'ldiradi.",
    "",
    "### Interfeysga bog'lanish",
    "`interface PaymentGateway { public function charge(int $amount): bool; }`, implementatsiya `StripeGateway`, provider'da `bind` (2.7). Mijoz kod faqat interfeysni biladi. Test: `FakeGateway` yoki `$this->mock(PaymentGateway::class)`. Har bir klassga interfeys **shart emas**: almashtirish/ko'p implementatsiya bo'lishi mumkin bo'lgan chegaralarda (to'lov, SMS, storage) yozing.",
    "",
    "### Anti-pattern'lar",
    "- **Service Locator**: metod ichida `app(Foo::class)` / `resolve()` / `Facade` ni bilimsiz chaqirish — bog'liqlik yashirin. Chekka joylarda (provider, buyruq) ruxsat.",
    "- **Katta constructor** (5–7+ parametr) — klass ko'p narsa qilayotgani belgisi (SRP): bo'ling, yoki bog'liq xizmatlarni bitta fasad-servisga yig'ing.",
    "- **Constructor'da ish qilish** (so'rov, tarmoq): constructor faqat saqlaydi.",
    "- Model/Request'ni servis konstruktoriga berish: ular so'rovga xos; metod argumenti qiling.",
    "- **Optional dependency** (`?Logger = null`) va `null` tekshiruvlari: har doim talab qiling yoki `NullLogger` kabi null-object bering.",
    "",
    "### Qoidalar",
    "1. Bog'liqlik — constructor'da, `private readonly`.",
    "2. Chegaralarda interfeys; ichkarida konkret klass yetadi.",
    "3. Servis so'rov holatini saqlamasin (stateless).",
    "4. `new` faqat qiymat obyektlari va DTO uchun."
  ],
  "examples": [
    {
      "title": "Oldin va keyin",
      "lang": "php",
      "note": "new → injection",
      "code": [
        "// Oldin: qattiq bog'liq, mock qilib bo'lmaydi",
        "class CheckoutService",
        "{",
        "    public function pay(Order $order): bool",
        "    {",
        "        $gw = new StripeGateway(config('services.stripe.secret'));",
        "        return $gw->charge($order->total);",
        "    }",
        "}",
        "",
        "// Keyin",
        "class CheckoutService",
        "{",
        "    public function __construct(private readonly PaymentGateway $gateway) {}",
        "",
        "    public function pay(Order $order): bool",
        "    {",
        "        return $this->gateway->charge($order->total);",
        "    }",
        "}"
      ]
    },
    {
      "title": "Unit test",
      "lang": "php",
      "note": "Fake bilan",
      "code": [
        "class FakeGateway implements PaymentGateway",
        "{",
        "    public array $charged = [];",
        "    public function charge(int $amount): bool { $this->charged[] = $amount; return true; }",
        "}",
        "",
        "public function test_pay_charges_order_total(): void",
        "{",
        "    $gw = new FakeGateway();",
        "    $ok = (new CheckoutService($gw))->pay(Order::factory()->make(['total' => 5000]));",
        "",
        "    $this->assertTrue($ok);",
        "    $this->assertSame([5000], $gw->charged);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Metod ichida `app(Foo::class)`: yashirin bog'liqlik (service locator), unit test'da almashtirish qiyin.",
    "7+ parametrli constructor: klass ko'p mas'uliyatni o'z zimmasiga olgan; bo'ling.",
    "Constructor ichida DB/HTTP chaqiruv: obyekt yaratilishi yon ta'sir beradi va testlash qiyinlashadi.",
    "Har bir klass uchun bitta implementatsiyali interfeys yozish: keraksiz ceremonial; chegarada yozing.",
    "So'rovga xos obyekt (`Request`, `Auth::user()`)ni singleton servisga qotirish: Octane'da sizib o'tadi (2.6).",
    "`?Dependency = null` bilan ixtiyoriy bog'liqlik: `null` tekshiruvlari tarqaladi; null-object."
  ]
});
