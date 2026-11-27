/* Chuqur dars: 2.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.6", {
  "lesson": [
    "### Avto-resolution",
    "Klass konstruktorida type-hint qilingan bog'liqliklarni container **o'zi** yaratadi (rekursiv), ro'yxatga olish kerak emas — konkret klasslar uchun. Interfeys yoki primitive (string/int) bo'lsa — binding kerak.",
    "",
    "### Binding turlari",
    "- `bind(Interface::class, Concrete::class)` yoki closure — **har chaqiruvda yangi** nusxa (transient).",
    "- `singleton(...)` — bitta nusxa ilova umri davomida (so'rov ichida va **Octane/queue worker'da so'rovlar orasida ham**!).",
    "- `scoped(...)` — bitta nusxa **bitta so'rov/job** doirasida; keyingisida qayta yaratiladi (Octane/queue uchun xavfsiz singleton).",
    "- `instance($abstract, $obj)` — tayyor obyektni ro'yxatga olish (testda ko'p).",
    "- `bindIf`, `singletonIf` — faqat bog'lanmagan bo'lsa.",
    "- Ro'yxatga olish joyi: `AppServiceProvider::register()` (2.7).",
    "",
    "### Contextual binding",
    "```php",
    "$this->app->when(PhotoController::class)->needs(Filesystem::class)->give(fn () => Storage::disk('photos'));",
    "$this->app->when(ReportService::class)->needs('$limit')->give(config('reports.limit'));   // primitive",
    "```",
    "`#[Config('app.name')]`, `#[CurrentUser]`, `#[Storage('s3')]`, `#[Cache('redis')]`, `#[Log('daily')]`, `#[DB('mysql')]`, `#[Auth('web')]`, `#[Give(Impl::class)]` kabi **attribute'lar** (Laravel 11+/12) constructor'da bog'liqlikni to'g'ridan-to'g'ri belgilaydi.",
    "",
    "### Tag va extend",
    "`$this->app->tag([A::class, B::class], 'reports')` → `app()->tagged('reports')`. `extend(Abstract::class, fn ($obj, $app) => new Decorator($obj))` — decorator qo'shish. `resolving`/`afterResolving` — yaratilganda hodisa.",
    "",
    "### Chaqirish",
    "`app(Service::class)`, `app()->make(Service::class, ['x' => 1])` (`makeWith`), `resolve()`. Kodda **constructor injection** afzal; `app()`/`resolve()` (service locator) faqat framework chekkasida (provider, buyruq, closure route). `app()->call([$obj, 'method'])` — metodni bog'liqliklarini to'ldirib chaqiradi.",
    "",
    "### Octane/queue worker",
    "`singleton` ichida so'rovga xos holat (user, request, locale) saqlansa, **boshqa so'rovga sizib o'tadi**. Holat kerak bo'lsa `scoped` yoki har safar `app('request')` ni olish. `Octane::flush` / `octane:reload`.",
    "",
    "### Test",
    "`$this->app->instance(PaymentGateway::class, $fake)` yoki Mockery: `$this->mock(PaymentGateway::class, fn ($m) => $m->shouldReceive('charge')->once()->andReturnTrue())`; `partialMock`, `spy`. Facade fake'lar (2.9) shu mexanizmga tayanadi.",
    "",
    "### Qoidalar",
    "1. Interfeysga bog'liq bo'ling (testlash va almashtirish oson).",
    "2. `singleton` faqat holatsiz yoki qimmat-yaratiladigan servis uchun.",
    "3. Service locator (`app()`) biznes kodda emas.",
    "4. Binding'lar provider'da markazlashgan."
  ],
  "examples": [
    {
      "title": "Binding turlari",
      "lang": "php",
      "note": "AppServiceProvider::register",
      "code": [
        "use App\\Contracts\\PaymentGateway;",
        "use App\\Services\\{StripeGateway, ReportService};",
        "",
        "public function register(): void",
        "{",
        "    $this->app->bind(PaymentGateway::class, fn ($app) => new StripeGateway(config('services.stripe.secret')));",
        "",
        "    $this->app->singleton(ExchangeRates::class);                 // qimmat, holatsiz",
        "",
        "    $this->app->scoped(TenantContext::class);                    // har so'rovga alohida (Octane xavfsiz)",
        "",
        "    $this->app->when(ReportService::class)->needs('$limit')->give(100);",
        "}"
      ]
    },
    {
      "title": "Testda almashtirish",
      "lang": "php",
      "note": "mock",
      "code": [
        "public function test_checkout_charges_gateway(): void",
        "{",
        "    $this->mock(PaymentGateway::class, function ($mock) {",
        "        $mock->shouldReceive('charge')->once()->with(10_000)->andReturn(true);",
        "    });",
        "",
        "    $this->actingAs(User::factory()->create())->postJson('/checkout', ['amount' => 10_000])->assertOk();",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`singleton` ichida so'rovga xos holat (joriy foydalanuvchi, til): Octane/queue worker'da boshqa so'rovga sizib o'tadi; `scoped` ishlating.",
    "Primitive (string/int) parametrli klassni binding'siz resolve qilish: `BindingResolutionException`; contextual binding yoki closure.",
    "Biznes kodda `app(Service::class)`: yashirin bog'liqlik va testlash qiyin; constructor injection.",
    "Dumaloq bog'liqlik (A→B→A): cheksiz rekursiya/xato; mas'uliyatni ajrating yoki lazy (closure) bering.",
    "`bind` o'rniga `singleton` unutib, \"bitta nusxa\" kutish: har chaqiruvda yangi obyekt va keshlangan holat yo'qoladi.",
    "Testda haqiqiy servisni (to'lov, SMS) mock'lamaslik: tashqi tizimga haqiqiy so'rov ketadi."
  ]
});
