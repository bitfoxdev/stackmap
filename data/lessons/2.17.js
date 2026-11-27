/* Chuqur dars: 2.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.17", {
  "lesson": [
    "### Kanallar",
    "`config/logging.php`: `default` (`LOG_CHANNEL`), `stack` bir nechta kanalni birlashtiradi (`'channels' => ['daily', 'slack']`). Muhim kanallar: `single` (bitta fayl), `daily` (kunlik fayl, `days => 14`), `stderr` (Docker/K8s: log yig'uvchi oladi), `syslog`, `errorlog`, `slack`, `null`, `emergency`. Maxsus: `monolog` driver (handler/formatter), `custom` (`via` factory), `Log::build([...])` (runtime'da).",
    "",
    "### Daraja",
    "RFC 5424: `debug, info, notice, warning, error, critical, alert, emergency`. `LOG_LEVEL` bu darajadan past xabarlarni tashlaydi. Production: `info` yoki `warning`; `debug` faqat vaqtincha (hajm va sirlar xavfi).",
    "",
    "### Ishlatish",
    "`Log::info('Buyurtma yaratildi', ['order_id' => $order->id])`, `Log::channel('billing')->error(...)`, `Log::stack(['slack', 'daily'])->critical(...)`, `logger('xabar')` yordamchi. Xato bilan: `Log::error($e->getMessage(), ['exception' => $e])` — stack trace Monolog formatter'ida.",
    "",
    "### Kontekst va korrelyatsiya",
    "- `Log::withContext([...])` — shu kanaldagi keyingi hamma yozuvlarga qo'shiladi (kanal darajasida).",
    "- `Log::shareContext([...])` (Laravel 11+) — **hamma** kanallarga, jumladan queue job'larga ham uzatiladi.",
    "- `Context::add('request_id', ...)` (Laravel 11+, 2.31) — log va queue job'larga avtomatik qo'shiladi.",
    "- So'rov boshida middleware'da `X-Request-Id` ni o'qib/yaratib kontekstga qo'ying: bitta so'rovni butun tizimda kuzatish uchun.",
    "",
    "### Format",
    "Konteynerda **JSON** (`'formatter' => \\Monolog\\Formatter\\JsonFormatter::class`) + `stderr`: ELK/Loki/Datadog osonroq qayta ishlaydi. Alohida `daily` fayl serverda disk to'ldirishi mumkin: `days` va logrotate.",
    "",
    "### Xavfsizlik",
    "Parol, token, karta raqami, to'liq so'rov tanasini loglamang. `$request->all()` ni loglamang. Maskalash: maxsus `Tap` yoki processor. Validatsiya xatosida `old()` ga `$dontFlash` (`password`) — Laravel 11+ `->dontFlash([...])` `withExceptions` da.",
    "",
    "### Kuzatuv",
    "Log — tarixiy tahlil; metrika va trace (OpenTelemetry), Sentry (xato), Pulse/Telescope (lokal/ichki). `php artisan pail` — real vaqtda logni terminalda ko'rish (lokal).",
    "",
    "### Qoidalar",
    "1. Strukturali log: xabar + kontekst massiv (satr yopishtirish emas).",
    "2. Har so'rov/job `request_id` bilan.",
    "3. Production'da `debug` o'chiq; sirlar yo'q.",
    "4. Alohida kanal muhim domen uchun (billing, audit)."
  ],
  "examples": [
    {
      "title": "Kanallar",
      "lang": "php",
      "note": "config/logging.php",
      "code": [
        "'default' => env('LOG_CHANNEL', 'stack'),",
        "'channels' => [",
        "    'stack' => ['driver' => 'stack', 'channels' => ['daily', 'stderr'], 'ignore_exceptions' => false],",
        "    'daily' => ['driver' => 'daily', 'path' => storage_path('logs/laravel.log'), 'level' => env('LOG_LEVEL', 'info'), 'days' => 14],",
        "    'stderr' => [",
        "        'driver' => 'monolog',",
        "        'level' => env('LOG_LEVEL', 'info'),",
        "        'handler' => Monolog\\Handler\\StreamHandler::class,",
        "        'formatter' => Monolog\\Formatter\\JsonFormatter::class,",
        "        'with' => ['stream' => 'php://stderr'],",
        "    ],",
        "    'billing' => ['driver' => 'daily', 'path' => storage_path('logs/billing.log'), 'days' => 90],",
        "],"
      ]
    },
    {
      "title": "Kontekst middleware",
      "lang": "php",
      "note": "Korrelyatsiya ID",
      "code": [
        "use Illuminate\\Support\\Facades\\Log;",
        "use Illuminate\\Support\\Str;",
        "",
        "public function handle(Request $request, Closure $next)",
        "{",
        "    $id = $request->header('X-Request-Id', (string) Str::uuid());",
        "    Log::shareContext(['request_id' => $id]);",
        "",
        "    return tap($next($request), fn ($response) => $response->headers->set('X-Request-Id', $id));",
        "}",
        "",
        "// ishlatish",
        "Log::channel('billing')->warning('To\\'lov rad etildi', ['order_id' => $order->id, 'reason' => $reason]);"
      ]
    }
  ],
  "pitfalls": [
    "Parol, token yoki karta ma'lumotini loglash: loglar ko'pincha ko'p odamga ochiq; maskalang yoki umuman yozmang.",
    "Production'da `LOG_LEVEL=debug`: hajm va disk, shuningdek sirlar sizishi.",
    "Konteynerda faqat `single`/`daily` fayl: konteyner o'chsa log yo'qoladi; `stderr` + yig'uvchi.",
    "`Log::error($e)` o'rniga `Log::error($e->getMessage())`: stack trace yo'qoladi.",
    "`daily` da `days` ni belgilamaslik: disk to'ladi (default 14 kun, lekin tekshiring).",
    "Request ID siz mikroservis loglari: bitta so'rovni ketma-ket kuzatib bo'lmaydi."
  ]
});
