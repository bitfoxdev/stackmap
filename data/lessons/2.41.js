/* Chuqur dars: 2.41. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.41", {
  "lesson": [
    "### Deploy tartibi",
    "1. Kod yetkazish (git/artefakt), `composer install --no-dev --optimize-autoloader` (`require-dev` production'da yo'q).",
    "2. Frontend: `npm ci && npm run build` (CI'da afzal).",
    "3. `php artisan migrate --force` (eski kod ham yangi sxemada ishlashi shart: 2.37).",
    "4. `php artisan optimize` — config, events, routes, views keshini bitta buyruqda yaratadi. Alohida: `config:cache`, `route:cache`, `view:cache`, `event:cache`. Tozalash: `optimize:clear`.",
    "5. Joriy versiyaga o'tish (symlink almashtirish) — **zero-downtime**.",
    "6. Jarayonlarni qayta ishga tushirish: `php artisan reload` (Laravel 13 docs: queue worker, Octane, Reverb va boshqalarga bitta buyruq), yoki alohida `queue:restart`, `schedule:interrupt`, `octane:reload`; `horizon:terminate`.",
    "7. Health-check: Laravel 11+ `/up` endpoint (`->withRouting(health: '/up')`) yuklama balansirga.",
    "",
    "### `env()` tuzog'i",
    "`config:cache` dan keyin `.env` o'qilmaydi: `env()` faqat `config/*.php` ichida chaqiriladi, ilova kodida `config('app.x')` ishlatiladi. Aks holda production'da `null` keladi.",
    "",
    "### Maintenance rejimi",
    "`php artisan down --secret=token --retry=60 --refresh=15`; `up`. Rejim vaqtida job va schedule to'xtaydi (schedule uchun `evenInMaintenanceMode`). Zero-downtime deploy'da maintenance kerak emas.",
    "",
    "### Tezlik",
    "- OPcache yoqilgan, `opcache.validate_timestamps=0` + deploy'da reset.",
    "- `composer dump-autoload --optimize` (yoki `--classmap-authoritative`).",
    "- Octane (Swoole/RoadRunner/FrankenPHP): ilova xotirada qoladi: global holat sizib o'tadi, singleton'larni tekshiring; har deploy'da `octane:reload`.",
    "- Queue worker xotirada eski kodni ushlab turadi: deploy'dan keyin `queue:restart` (yoki `reload`) majburiy.",
    "- `php artisan about` — muhit holatini ko'rsatadi; `model:show` — model sxemasi.",
    "",
    "### Xavfsizlik chek-listi",
    "`APP_DEBUG=false`, `APP_ENV=production`, kuchli `APP_KEY` (deploy'lar orasida o'zgarmasin: shifrlangan ma'lumot o'qilmay qoladi), HTTPS va `TrustProxies`, `.env` git'da yo'q, `storage` va `bootstrap/cache` yozish huquqi.",
    "",
    "### Qoidalar",
    "1. Deploy idempotent va avtomatik (skript/CI), qo'lda emas.",
    "2. Har deploy'dan keyin queue/schedule/Octane qayta ishga tushsin.",
    "3. Migratsiya orqaga qaytarmasdan, oldinga yo'naltirilgan; rollback rejasi oldindan tayyor.",
    "4. `optimize` dan keyin `env()` ishlatilmagan bo'lsin."
  ],
  "examples": [
    {
      "title": "Deploy skripti",
      "lang": "bash",
      "note": "Zero-downtime tartib (soddalashtirilgan)",
      "code": [
        "set -euo pipefail",
        "cd /var/www/releases/$RELEASE",
        "",
        "composer install --no-dev --optimize-autoloader --no-interaction",
        "npm ci && npm run build",
        "",
        "php artisan migrate --force",
        "php artisan optimize",
        "",
        "ln -sfn /var/www/releases/$RELEASE /var/www/current   # atomik almashtirish",
        "",
        "php artisan reload          # queue, Octane, Reverb",
        "php artisan schedule:interrupt",
        "curl -fsS https://app.example.com/up || { echo \"health fail\"; exit 1; }"
      ]
    }
  ],
  "pitfalls": [
    "`config:cache` dan keyin ilova kodida `env('X')` chaqirish: production'da `null` qaytadi; faqat `config/*.php` ichida `env()`.",
    "Deploy'dan keyin `queue:restart` qilmaslik: worker eski kod bilan ishlaydi (yangi job klass/xossasi topilmaydi).",
    "`composer install` ni `--no-dev`siz production'da ishlatish: dev paketlar (Telescope, Faker) production'ga tushadi.",
    "`APP_KEY` ni deploy'lar orasida o'zgartirish: shifrlangan ustunlar va cookie/session o'qilmay qoladi.",
    "Migratsiyani yangi kod bilan bir vaqtda sinxron o'zgartirish: eski kod yangi sxemada yiqiladi (expand → contract).",
    "Octane'da request'lararo global/static holat: ma'lumot foydalanuvchilar o'rtasida sizib o'tadi."
  ]
});
