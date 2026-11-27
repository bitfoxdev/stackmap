/* Chuqur dars: 2.23. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.23", {
  "lesson": [
    "### Fayllar",
    "Laravel 11+ da `lang/` papkasi yo'q: `php artisan lang:publish`. Ikki usul:",
    "- **PHP massivlar**: `lang/uz/messages.php` → `__('messages.welcome')` (kalit guruhli).",
    "- **JSON**: `lang/uz.json` → `{\"Welcome\": \"Xush kelibsiz\"}` → `__('Welcome')` (satrning o'zi kalit). Ko'p matnli ilovada qulay.",
    "Validatsiya: `lang/uz/validation.php` (`lang:publish` dan keyin).",
    "",
    "### Ishlatish",
    "`__('messages.welcome')`, `trans('...')`, Blade: `{{ __('...') }}`, `@lang('...')`. Parametr: `__('Salom, :name', ['name' => $u->name])` (`:Name` bosh harf, `:NAME` katta). Ko'plik: `trans_choice('{0} Hech narsa|{1} :count ta|[2,*] :count ta', $n)` (`Lang::choice`); O'zbek/rus tillarida ko'plik shakllari ko'p, qoidani to'g'ri belgilang.",
    "Topilmasa kalitning o'zi qaytadi: kalit yo'q ekanini sezish uchun testda tekshiring.",
    "",
    "### Til tanlash",
    "`config/app.php`: `locale`, `fallback_locale` (topilmasa shu til), `faker_locale`. Runtime: `app()->setLocale('uz')` (shu so'rov), `App::currentLocale()`, `App::isLocale('uz')`. **Middleware**: foydalanuvchi sozlamasi (DB) → `session`/cookie → `Accept-Language` (`$request->getPreferredLanguage(['uz','ru','en'])`) → default. Faqat ruxsat etilgan tillar ro'yxatidan oling (kirish ishonchsiz). Queue job va Notification/Mail uchun til alohida: `->locale('uz')` yoki `HasLocalePreference`; job ichida request tili yo'q.",
    "",
    "### Sana, raqam, valyuta",
    "`Carbon::setLocale('uz')` (`app()->setLocale` o'zi ham qiladi), `$date->translatedFormat('d F Y')`, `Number::currency(1000, 'UZS', 'uz')`, `Number::format(...)` (`Illuminate\\Support\\Number`, `intl` kengaytmasi kerak). Vaqt mintaqasi — alohida masala (UTC saqlash, ko'rsatishda foydalanuvchiniki).",
    "",
    "### API",
    "Javob matnlarini (xato xabarlari) tarjima qiling, lekin mashina-o'qiladigan `code` ni o'zgartirmang (2.16).",
    "",
    "### Qoidalar",
    "1. Bitta usulni tanlang (JSON yoki guruhli) va izchil ishlating.",
    "2. Matnni kodga yopishtirmang; hamma foydalanuvchi matni `__()` orqali.",
    "3. Til ro'yxati qat'iy (whitelist).",
    "4. Yangi kalit qo'shilganda barcha tillarga qo'shing (test yoki paket bilan tekshiring)."
  ],
  "examples": [
    {
      "title": "Til tanlash middleware",
      "lang": "php",
      "note": "SetLocale",
      "code": [
        "namespace App\\Http\\Middleware;",
        "",
        "use Closure;",
        "use Illuminate\\Http\\Request;",
        "use Illuminate\\Support\\Facades\\App;",
        "",
        "class SetLocale",
        "{",
        "    private const SUPPORTED = ['uz', 'ru', 'en'];",
        "",
        "    public function handle(Request $request, Closure $next)",
        "    {",
        "        $locale = $request->user()?->locale",
        "            ?? $request->getPreferredLanguage(self::SUPPORTED)",
        "            ?? config('app.locale');",
        "",
        "        App::setLocale(in_array($locale, self::SUPPORTED, true) ? $locale : config('app.fallback_locale'));",
        "",
        "        return $next($request);",
        "    }",
        "}"
      ]
    },
    {
      "title": "JSON va ko'plik",
      "lang": "php",
      "note": "lang/uz.json, trans_choice",
      "code": [
        "// lang/uz.json",
        "// { \"Welcome, :name\": \"Xush kelibsiz, :name\", \":count items\": \"{0} Mahsulot yo'q|{1} 1 ta mahsulot|[2,*] :count ta mahsulot\" }",
        "",
        "echo __('Welcome, :name', ['name' => $user->name]);",
        "echo trans_choice(':count items', $cart->count());",
        "echo now()->translatedFormat('d F Y');"
      ]
    }
  ],
  "pitfalls": [
    "Foydalanuvchi bergan `locale` ni tekshirmasdan `setLocale` ga berish: kutilmagan fayl yo'li/xato; whitelist.",
    "Queue/Mail/Notification'da so'rov tilini kutish: job'da request yo'q, til `default`; `->locale()` yoki `HasLocalePreference`.",
    "Tarjima kaliti yo'q bo'lsa kalitning o'zi chiqishi: UI'da `messages.welcome` ko'rinadi; testda tekshiring.",
    "Ko'plik qoidasini (`trans_choice`) faqat 2 shakl bilan yozish: rus/o'zbek tilida noto'g'ri grammatika.",
    "`Carbon::setLocale` ni chaqirmay sana formatlash: ingliz tilida chiqadi.",
    "Matnni HTML/kod ichiga yopishtirib qo'yish: keyin tarjima qilib bo'lmaydi."
  ]
});
