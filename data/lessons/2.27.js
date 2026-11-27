/* Chuqur dars: 2.27. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.27", {
  "lesson": [
    "### Container `make()`",
    "`Container::build()` — `ReflectionClass` bilan konstruktor parametrlarini o'qiydi: har bir type-hint uchun `resolve` (rekursiv), primitive uchun contextual binding yoki default; hal qilib bo'lmasa `BindingResolutionException`. Singleton/binding'lar massivda (`$bindings`, `$instances`). `Application` ham container (`Illuminate\\Foundation\\Application extends Container`).",
    "",
    "### Pipeline",
    "`Illuminate\\Pipeline\\Pipeline`: `(new Pipeline(app()))->send($passable)->through([A::class, B::class])->then(fn ($p) => $p)`. Har bosqich `handle($passable, Closure $next)` — middleware bilan bir xil (HTTP middleware shu orqali ishlaydi, 2.4). O'z oqimlaringizda ham ishlatiladi (filtrlar zanjiri, narx hisoblash bosqichlari).",
    "",
    "### Macroable",
    "`Str`, `Arr`, `Collection`, `Request`, `Response`, `Builder` va boshqalar `Macroable` trait'ini ishlatadi: `Collection::macro('toUpper', fn () => $this->map(fn ($v) => strtoupper($v)));` (provider `boot()` da). Kamchilik: IDE/statik tahlil ko'rmaydi (`ide-helper`), nom to'qnashuvi. `mixin()` — klassdagi metodlarni makro qiladi.",
    "",
    "### Manager va driver",
    "`Cache`, `Queue`, `Mail`, `Filesystem`, `Session`, `Hash`, `Auth` — `Manager` naqshi: `config` dagi driver nomi bo'yicha `createXDriver()` metodini chaqiradi. Maxsus driver: `Cache::extend('mydriver', fn ($app) => Cache::repository(new MyStore))`, `Auth::provider(...)`, `Storage::extend('custom', ...)`, `Queue::extend`. Kontrakt: har bir driver `Illuminate\\Contracts\\...\\Store` kabi interfeysni implement qiladi (shuning uchun ilova kodi driverni bilmaydi).",
    "",
    "### Kontraktlar",
    "`Illuminate\\Contracts\\*` — framework servislarining interfeyslari. Ilovada konkret klass (`Illuminate\\Cache\\Repository`) o'rniga kontraktga bog'lanish (`Illuminate\\Contracts\\Cache\\Repository`) va paketlarda shartnoma sifatida.",
    "",
    "### Qayerga qarash",
    "`vendor/laravel/framework/src/Illuminate/...`: `Container/Container.php`, `Routing/Router.php`, `Pipeline/Pipeline.php`, `Foundation/Application.php`. Xatoni tushunish uchun stack trace'dagi framework klasslarini o'qish — eng yaxshi o'quv.",
    "",
    "### Qoidalar",
    "1. Framework ichiga (`vendor`) tegmang; kengaytma nuqtalaridan (makro, driver, provider, event) foydalaning.",
    "2. Makro — kam; avval oddiy klass/helper.",
    "3. Kontraktga bog'lanish — paketlarda; ilovada konkret (Facade/DI) ham qabul.",
    "4. Ichki API (internal) versiyalar orasida o'zgaradi: `@internal` belgisiga ehtiyot."
  ],
  "examples": [
    {
      "title": "Pipeline",
      "lang": "php",
      "note": "Zanjirli bosqichlar",
      "code": [
        "use Illuminate\\Pipeline\\Pipeline;",
        "",
        "$price = app(Pipeline::class)",
        "    ->send(new Cart($items))",
        "    ->through([ApplyCoupon::class, ApplyTax::class, RoundTotal::class])",
        "    ->thenReturn();",
        "",
        "class ApplyTax",
        "{",
        "    public function handle(Cart $cart, \\Closure $next)",
        "    {",
        "        $cart->total = (int) round($cart->total * 1.12);",
        "        return $next($cart);",
        "    }",
        "}"
      ]
    },
    {
      "title": "Makro va maxsus driver",
      "lang": "php",
      "note": "boot() da",
      "code": [
        "use Illuminate\\Support\\{Collection, Str};",
        "use Illuminate\\Support\\Facades\\Cache;",
        "",
        "public function boot(): void",
        "{",
        "    Str::macro('phone', fn (string $v) => preg_replace('/\\D+/', '', $v));",
        "    Collection::macro('toCsv', fn () => $this->map(fn ($row) => implode(',', (array) $row))->implode(\"\\n\"));",
        "",
        "    Cache::extend('memory-lru', fn ($app) => Cache::repository(new LruStore(max: 1000)));",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Makroni IDE helper'siz yozish: avtocomplete va statik tahlil metodni \"topa olmaydi\"; `ide-helper` yoki PHPDoc.",
    "Bir xil nomdagi makro (yoki framework'ning keyingi versiyasida paydo bo'lgan metod) bilan to'qnashuv: ilova buziladi.",
    "`vendor` ichidagi kodni patch qilish: `composer install` da yo'qoladi; kengaytma nuqtasi.",
    "Pipeline bosqichida `$next` ni chaqirmaslik: zanjir to'xtaydi va natija `null`.",
    "Maxsus driverni kontraktga to'liq mos qilmaslik: ayrim metodlar kamida `Exception` tashlaydi, kutilmagan joyda yiqiladi.",
    "Ichki (`@internal`) klass/metodlarga tayanish: minor versiyada ham o'zgarishi mumkin."
  ]
});
