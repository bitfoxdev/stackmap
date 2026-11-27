/* Chuqur dars: 2.31. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.31", {
  "lesson": [
    "### Concurrency",
    "```php",
    "[$users, $orders, $revenue] = Concurrency::run([",
    "    fn () => User::count(),",
    "    fn () => Order::where('status', 'paid')->count(),",
    "    fn () => Payment::sum('amount'),",
    "]);",
    "```",
    "Closure'lar **alohida PHP jarayonlarida** bajariladi (default `process` driver: yashirin `artisan invoke-serialized-closure`), natijalar tartib bilan qaytadi. Driverlar: `process` (default), `fork` (`spatie/fork`, tezroq, faqat CLI), `sync` (testlar uchun: ketma-ket). `Concurrency::driver('fork')->run(...)`. `Concurrency::defer([...])` — HTTP javob yuborilgandan **keyin** ishga tushadi (fire-and-forget).",
    "**Cheklovlar**: closure va natija serializatsiya qilinadi (resurs/ulanish/`$this` bilan ehtiyotkorlik), har closure'da alohida DB ulanishi (tranzaksiya ulashilmaydi), jarayon boshlash ~ms narxi. Foyda: **mustaqil, IO-bound** ishlar (bir nechta so'rov/HTTP). Tez, yengil ishlarda sekinlashtiradi.",
    "Katta/uzoq ish uchun queue (2.19, 46.x): Concurrency so'rov ichida qisqa parallellik uchun.",
    "",
    "### Context",
    "```php",
    "Context::add('request_id', $id);          // log va queue job'larga avtomatik qo'shiladi",
    "Context::add(['tenant' => 5]);",
    "Context::get('request_id');  Context::has(...);  Context::forget(...);",
    "Context::addHidden('token', $t);          // log'ga chiqmaydi, job'ga uzatiladi",
    "Context::push('breadcrumbs', 'step 1');   // stack",
    "```",
    "Middleware'da qo'yiladi (2.4). Log yozuvlarining `context` qismiga avtomatik tushadi; **queue job** dispatch qilinganda kontekst job'ga seriyalanadi va worker'da tiklanadi: bitta so'rovdan boshlanib job'gacha **korrelyatsiya**. `Context::dehydrating`/`hydrated` — uzatishni sozlash. Kontekstga maxfiy ma'lumot qo'ymang (hidden bo'lsa ham job payload'ida saqlanadi).",
    "",
    "### Qoidalar",
    "1. Parallellik o'lchang: ketma-ket vs parallel vaqtini solishtiring.",
    "2. Concurrency closure'lari mustaqil va yon ta'sirsiz bo'lsin.",
    "3. `request_id`/`tenant_id` ni Context'ga qo'ying — log va job'larda avtomatik.",
    "4. Uzoq/ishonchli ish — queue."
  ],
  "examples": [
    {
      "title": "Parallel dashboard",
      "lang": "php",
      "note": "Concurrency::run",
      "code": [
        "use Illuminate\\Support\\Facades\\Concurrency;",
        "",
        "public function stats(): array",
        "{",
        "    [$users, $orders, $revenue] = Concurrency::run([",
        "        fn () => DB::table('users')->count(),",
        "        fn () => DB::table('orders')->where('status', 'paid')->count(),",
        "        fn () => (int) DB::table('payments')->sum('amount'),",
        "    ]);",
        "",
        "    Concurrency::defer(fn () => Metric::increment('dashboard.viewed'));   // javobdan keyin",
        "",
        "    return compact('users', 'orders', 'revenue');",
        "}"
      ]
    },
    {
      "title": "Context middleware",
      "lang": "php",
      "note": "Job'ga uzatiladi",
      "code": [
        "use Illuminate\\Support\\Facades\\Context;",
        "use Illuminate\\Support\\Str;",
        "",
        "public function handle(Request $request, Closure $next)",
        "{",
        "    Context::add('request_id', $request->header('X-Request-Id', (string) Str::uuid()));",
        "    Context::add('user_id', $request->user()?->id);",
        "",
        "    return $next($request);",
        "}",
        "",
        "// keyin: ProcessOrder::dispatch($order);  -> job log'larida ham request_id va user_id bor"
      ]
    }
  ],
  "pitfalls": [
    "Tez/yengil closure'larni parallel qilish: jarayon yaratish narxi ketma-ketdan ham sekin.",
    "Closure'larda ulashilgan holat yoki tranzaksiyaga tayanish: har biri alohida jarayon, alohida DB ulanish.",
    "Closure ichida resurs (fayl handle, ulanish) yoki `$this` ni uzatish: serializatsiya xatosi; kerakli id/qiymatni bering.",
    "`fork` driverni HTTP so'rovda ishlatish: faqat CLI; web uchun `process`.",
    "Context'ga maxfiy ma'lumot qo'yish: job payload va loglarga tushishi mumkin.",
    "Concurrency'ni uzoq vazifa uchun ishlatish: so'rov timeout'iga uriladi; queue."
  ]
});
