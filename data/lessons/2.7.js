/* Chuqur dars: 2.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.7", {
  "lesson": [
    "### Ikki metod",
    "- `register(): void` — **faqat** container binding'lari (`bind`, `singleton`). Boshqa provider'lar hali yuklanmagan bo'lishi mumkin: bu yerda event, route, view yoki boshqa servisni **ishlatmang**.",
    "- `boot(): void` — hamma provider `register` qilingandan keyin; bu yerda hamma servis mavjud: `Gate::policy()`, `Event::listen`, `Route::bind`, `View::composer`, `Relation::enforceMorphMap`, `Model::shouldBeStrict()`, `Schedule`, validatsiya qoidalari. `boot` ga type-hint bilan DI beriladi.",
    "",
    "### Yaratish va ro'yxatga olish",
    "`php artisan make:provider PaymentServiceProvider` — Laravel 11+ da avtomatik `bootstrap/providers.php` ga qo'shiladi. Paketlar `composer.json` dagi `extra.laravel.providers` orqali **avtomatik** (package auto-discovery).",
    "",
    "### Odatiy joylar",
    "- `AppServiceProvider::boot()`: `Model::shouldBeStrict(! app()->isProduction())` (lazy loading, noma'lum atribut, mass assignment xatolari), `Vite::prefetch`, `Schema::defaultStringLength`, `Carbon::setLocale`, `JsonResource::withoutWrapping()`, `Relation::enforceMorphMap([...])`, `Password::defaults(...)`.",
    "- `Model::automaticallyEagerLoadRelationships()` (12.x) — N+1 ni avtomatik yumshatadi (loyihada o'rganib ishlating).",
    "- `RouteServiceProvider` Laravel 11+ da yo'q: `RateLimiter::for('api', ...)` ni `AppServiceProvider::boot()` ga qo'ying (12.13).",
    "",
    "### Deferred",
    "`implements DeferrableProvider` + `provides(): array` — binding faqat kerak bo'lganda yuklanadi (ishga tushishni yengillashtiradi). Faqat `register` bilan ishlovchi provider uchun.",
    "",
    "### Qoidalar",
    "1. Provider'larni **yengil** saqlang: har so'rovda ishlaydi; DB/tarmoq so'rovi yo'q.",
    "2. `register` — faqat binding; qolgani `boot`.",
    "3. Mavzu bo'yicha ajrating (`PaymentServiceProvider`), hammasini `AppServiceProvider` ga yig'may.",
    "4. Provider tartibiga bog'liq mantiq yozmang."
  ],
  "examples": [
    {
      "title": "Provider",
      "lang": "php",
      "note": "register va boot",
      "code": [
        "namespace App\\Providers;",
        "",
        "use App\\Contracts\\PaymentGateway;",
        "use App\\Models\\{Order, User};",
        "use App\\Policies\\OrderPolicy;",
        "use App\\Services\\StripeGateway;",
        "use Illuminate\\Database\\Eloquent\\Relations\\Relation;",
        "use Illuminate\\Support\\Facades\\Gate;",
        "use Illuminate\\Support\\ServiceProvider;",
        "",
        "class PaymentServiceProvider extends ServiceProvider",
        "{",
        "    public function register(): void",
        "    {",
        "        $this->app->singleton(PaymentGateway::class, fn () => new StripeGateway(config('services.stripe.secret')));",
        "    }",
        "",
        "    public function boot(): void",
        "    {",
        "        Gate::policy(Order::class, OrderPolicy::class);",
        "        Relation::enforceMorphMap(['order' => Order::class, 'user' => User::class]);",
        "    }",
        "}"
      ]
    },
    {
      "title": "Qat'iy rejim",
      "lang": "php",
      "note": "AppServiceProvider::boot",
      "code": [
        "use Illuminate\\Database\\Eloquent\\Model;",
        "",
        "public function boot(): void",
        "{",
        "    // lazy loading, noma'lum atribut va mass assignment xatolarini ushlaydi (lokal/testda)",
        "    Model::shouldBeStrict(! $this->app->isProduction());",
        "",
        "    JsonResource::withoutWrapping();",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`register()` ichida boshqa servisni (Cache, Config'dan tashqari, Auth) ishlatish: u hali tayyor emas.",
    "Provider'da har so'rovda DB so'rovi/HTTP chaqiruv: butun ilovani sekinlashtiradi.",
    "`bootstrap/providers.php` ga qo'shmasdan provider yaratib \"ishlamayapti\" deb qolish: ro'yxatga olinmagan.",
    "Hamma narsani `AppServiceProvider` ga yig'ish: katta, o'qib bo'lmaydigan \"god provider\".",
    "Deferred provider'da `boot()` ga tayanish: u kerak bo'lmaguncha yuklanmaydi.",
    "`Model::shouldBeStrict()` ni production'da yoqish: kutilmagan istisno foydalanuvchiga tushadi; odatda faqat lokal/testda."
  ]
});
