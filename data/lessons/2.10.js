/* Chuqur dars: 2.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.10", {
  "lesson": [
    "### Qatlamlar",
    "1. `.env` — muhitga xos qiymat (DB parol, API kalit). **Git'ga qo'shilmaydi**; `.env.example` qo'shiladi.",
    "2. `config/*.php` — `'key' => env('PAYMENT_KEY', 'default')`.",
    "3. Kod — `config('services.payment.key')`, nuqta bilan chuqurlik; `config(['a.b' => 1])` — runtime'da (faqat shu so'rov).",
    "Xavfsiz default: `config('x', 'fallback')` ikkinchi argument.",
    "",
    "### `env()` qoidasi",
    "`env()` faqat `config/*.php` ichida. `config:cache` dan keyin `.env` fayli **yuklanmaydi**, shuning uchun ilova kodidagi `env('X')` `null` qaytaradi. Production'da shu eng ko'p uchraydigan xato.",
    "",
    "### Kesh",
    "`php artisan config:cache` (yoki `optimize`) — deploy'da (2.41); `config:clear`; o'zgargan `.env` keshdan keyin ta'sir qilmaydi. `php artisan config:show database` (qiymatni ko'rish), `env` buyrug'i muhit nomini beradi.",
    "",
    "### Muhit",
    "`APP_ENV=production|staging|local|testing`. `app()->environment('local', 'staging')`, `app()->isProduction()`, `@production` (Blade). Test: `.env.testing` yoki `phpunit.xml` `<env>`. Muhitga qarab \"if\" yozish o'rniga **konfiguratsiyani** o'zgartiring (mailer, queue driver, log kanali).",
    "",
    "### Sirlar",
    "- `.env` shifrlash: `php artisan env:encrypt` (`--key=...`) → `.env.encrypted` git'ga kirishi mumkin; `env:decrypt` deploy'da (kalit CI secret'da).",
    "- Boshqarish: CI/CD secret, Vault, AWS/GCP Secrets Manager; loglarda va xato xabarlarida sirlar chiqmasin.",
    "- `config/app.php` dagi `key` (`APP_KEY`) o'zgarmasin (shifrlash/session, 2.41); `previous_keys` bilan almashtirish mumkin.",
    "- `APP_DEBUG=false` production'da: aks holda stack trace va `.env` qiymatlari sahifada ko'rinadi.",
    "",
    "### Custom config",
    "`php artisan config:publish` (Laravel 11+: mavjud config'ni nashr qiladi), o'z fayl `config/billing.php` avtomatik yuklanadi. Package config'ini `mergeConfigFrom` bilan (2.26).",
    "",
    "### Qoidalar",
    "1. Kodda `env()` yo'q: faqat `config()`.",
    "2. `.env.example` har doim yangilangan.",
    "3. Sirlar git'da va logda yo'q.",
    "4. Muhit tekshiruvlarini kamaytiring: konfiguratsiya o'zgarsin, kod emas."
  ],
  "examples": [
    {
      "title": "Config va ishlatish",
      "lang": "php",
      "note": "env faqat config'da",
      "code": [
        "// config/billing.php",
        "return [",
        "    'currency' => env('BILLING_CURRENCY', 'UZS'),",
        "    'gateway'  => [",
        "        'key'    => env('BILLING_KEY'),",
        "        'secret' => env('BILLING_SECRET'),",
        "        'url'    => env('BILLING_URL', 'https://api.example.com'),",
        "    ],",
        "];",
        "",
        "// kodda",
        "$key = config('billing.gateway.key');",
        "$cur = config('billing.currency', 'UZS');",
        "",
        "// testda",
        "config(['billing.currency' => 'USD']);"
      ]
    },
    {
      "title": "Tuzoq va buyruqlar",
      "lang": "bash",
      "note": "config:cache dan keyin env()",
      "code": [
        "# ❌ app/Services/Pay.php ichida: env('BILLING_KEY')  -> config:cache dan keyin null",
        "php artisan config:cache",
        "php artisan config:show billing",
        "php artisan env:encrypt --key=base64:...      # .env.encrypted",
        "php artisan env:decrypt --key=...             # deploy'da",
        "php artisan config:clear"
      ]
    }
  ],
  "pitfalls": [
    "Ilova kodida `env('X')` chaqirish: `config:cache` dan keyin `null` qaytadi va to'lov/email production'da jimgina buziladi.",
    "`.env` ni git'ga commit qilish: sirlar tarixda qoladi (o'chirgandan keyin ham); kalitlarni almashtirish kerak bo'ladi.",
    "`.env` o'zgargach `config:clear` qilmaslik: eski qiymat ishlaydi.",
    "`APP_DEBUG=true` production'da: xato sahifasi sirlarni ko'rsatadi.",
    "`config()` bilan runtime'da qiymat o'zgartirib, uni queue worker/Octane'da boshqa so'rovlarga \"sizib\" ketishini hisobga olmaslik.",
    "Testda `.env` ning production qiymatlari bilan ishlash: `.env.testing` yoki `phpunit.xml` dan foydalaning."
  ]
});
