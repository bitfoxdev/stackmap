/* Chuqur dars: 2.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.1", {
  "lesson": [
    "### So'rov yo'li",
    "1. Veb-server (Nginx/Apache/FrankenPHP) hamma so'rovni `public/index.php` ga yo'naltiradi.",
    "2. `vendor/autoload.php` (Composer) va `bootstrap/app.php` yuklanadi: u `Application` (Service Container, 2.6) ni yaratadi: `Application::configure(basePath: dirname(__DIR__))->withRouting(...)->withMiddleware(...)->withExceptions(...)->create()`.",
    "3. So'rov ilovaning HTTP handler'iga beriladi (Laravel 11+ da `Http\\Kernel` fayli loyihada ko'rinmaydi, framework ichida).",
    "4. **Bootstrap**: `.env`, config, istisno handler, Facade'lar, **provider'lar**: avval hammasining `register()`, keyin hammasining `boot()` (2.7).",
    "5. So'rov **global middleware** → router marshrutni topadi (binding, 2.3) → **guruh/route middleware** (2.4) → controller/closure.",
    "6. Javob middleware'lardan **teskari tartibda** qaytadi va yuboriladi.",
    "7. `terminate()`: javob yuborilgandan keyin (terminable middleware, sessiyani saqlash, 2.4).",
    "",
    "### Nima uchun bilish kerak",
    "- `register` ichida `auth()`, `request()->user()` yo'q: provider'lar so'rovdan oldin, hali middleware ishlamagan (foydalanuvchi aniqlanmagan).",
    "- \"Nega xato 500 emas, 404/419?\": middleware yoki binding javobni controller'dan oldin to'xtatgan.",
    "- \"Nega o'zgargan `.env` ta'sir qilmayapti\": config keshlangan (2.10, 2.41).",
    "",
    "### Boshqa kirish nuqtalari",
    "- **Artisan**: `php artisan` → xuddi shu bootstrap, lekin HTTP middleware yo'q (console kernel).",
    "- **Queue worker**: ilova **bir marta** yuklanadi va job'lar ketma-ket ishlaydi (kod o'zgarsa `queue:restart`, 2.41).",
    "- **Octane**: ilova xotirada qoladi, har so'rov uchun faqat so'rov-ishlov beriladi: holat sizishi xavfi (2.6).",
    "- **Test**: `TestCase` ilovani yaratadi, `get()` HTTP kernel'dan o'tkazadi.",
    "",
    "### Kuzatish",
    "`php artisan route:list -v` (middleware bilan), `php artisan about` (muhit, kesh holati), `php artisan optimize` / `optimize:clear`, Telescope/Debugbar/Pulse; `Log::info` ni middleware va controller'ga qo'yib tartibni ko'rish.",
    "",
    "### Qoidalar",
    "1. Mantiqni to'g'ri qatlamga qo'ying: kesishuvchi (middleware), kirish (Form Request), biznes (Action), javob (Resource).",
    "2. `register` — binding, `boot` — qolgani.",
    "3. Hayot siklini bilmaslik \"sehr\" tuyg'usini beradi: xatoda oqimni log bilan kuzating."
  ],
  "examples": [
    {
      "title": "bootstrap/app.php",
      "lang": "php",
      "note": "Laravel 11+ sozlash markazi",
      "code": [
        "use Illuminate\\Foundation\\Application;",
        "use Illuminate\\Foundation\\Configuration\\{Exceptions, Middleware};",
        "",
        "return Application::configure(basePath: dirname(__DIR__))",
        "    ->withRouting(",
        "        web: __DIR__.'/../routes/web.php',",
        "        api: __DIR__.'/../routes/api.php',",
        "        commands: __DIR__.'/../routes/console.php',",
        "        health: '/up',",
        "    )",
        "    ->withMiddleware(function (Middleware $middleware) {",
        "        $middleware->alias(['admin' => \\App\\Http\\Middleware\\EnsureAdmin::class]);",
        "    })",
        "    ->withExceptions(function (Exceptions $exceptions) { /* report / render */ })",
        "    ->create();"
      ]
    },
    {
      "title": "Tartibni kuzatish",
      "lang": "php",
      "note": "Log bilan before/after/terminate",
      "code": [
        "class Trace",
        "{",
        "    public function handle($request, Closure $next)",
        "    {",
        "        Log::info('1 before middleware');",
        "        $response = $next($request);",
        "        Log::info('3 after middleware');",
        "        return $response;",
        "    }",
        "",
        "    public function terminate($request, $response): void",
        "    {",
        "        Log::info('4 terminate');",
        "    }",
        "}",
        "// controller: Log::info('2 controller');   -> natija: 1, 2, 3, (javob yuboriladi), 4"
      ]
    }
  ],
  "pitfalls": [
    "`register()` ichida `auth()->user()` yoki boshqa servisni chaqirish: foydalanuvchi aniqlanmagan, servislar hali ro'yxatda emas.",
    "O'zgargan `.env` ta'sir qilmaydi: config keshi; `optimize:clear`.",
    "Queue worker/Octane'da kod o'zgargach qayta ishga tushirmaslik: eski kod xotirada ishlaydi.",
    "Middleware tartibini bilmay `auth` dan oldin ruxsat tekshiruvini qo'yish.",
    "`terminate` ichida foydalanuvchiga ko'rinadigan chiqish: javob allaqachon yuborilgan.",
    "Eski qo'llanma bo'yicha `app/Http/Kernel.php` ni qidirish: Laravel 11+ da `bootstrap/app.php`."
  ]
});
