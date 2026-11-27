/* Chuqur dars: 2.38. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.38", {
  "lesson": [
    "### Asosiy API",
    "- `Cache::get('k', default)`, `put('k', $v, $seconds|$ttl)`, `add` (faqat yo'q bo'lsa), `forever`, `forget`, `pull` (olib o'chiradi), `has`.",
    "- `Cache::remember('k', 3600, fn () => expensive())` — bo'lmasa hisoblab saqlaydi; `rememberForever`.",
    "- `Cache::increment('hits')`, `decrement` — atomik hisoblagich (Redis'da haqiqiy atomik).",
    "- `Cache::many([...])`, `putMany([...])`.",
    "- `Cache::store('redis')->get(...)` — aniq driver. Default `CACHE_STORE` (`.env`; eski nomi `CACHE_DRIVER`).",
    "- Kalitga prefiks: `config/cache.php` `prefix` (bir Redis'da bir nechta ilova).",
    "- `Cache::flexible('k', [300, 900], fn () => ...)` — Laravel 11.x+: 300 s gacha yangi, 300–900 s oralig'ida eski qiymatni qaytaradi va **fonda** yangilaydi (stale-while-revalidate).",
    "- `Cache::touch('k', 3600)` (Laravel 13) — qiymatni o'zgartirmay TTL'ni uzaytiradi.",
    "",
    "### Teglar",
    "`Cache::tags(['users', 'reports'])->put(...)`, `Cache::tags('users')->flush()`. Faqat `redis`, `memcached`, `array` driverlarida (file/database'da yo'q). Teglar bilan o'qishda ham xuddi shu teglar ro'yxatini berish shart. `Cache::flush()` butun store'ni tozalaydi (prefiksga qaramasdan!): umumiy Redis'da boshqa ilovalar kalitini ham o'chiradi.",
    "",
    "### Atomik qulf",
    "`Cache::lock('report:1', 10)->get(fn () => ...)` — qulf olinsa bajaradi, aks holda `false`. `->block(5)` — 5 s kutadi (`LockTimeoutException`). Qulfni boshqa jarayondan bo'shatish: `Cache::restoreLock('name', $owner)`. Qulfli driver: redis, memcached, database, dynamodb, file, array. Ko'p server uchun umumiy store shart.",
    "",
    "### Stampede",
    "Mashhur kalit tugaganda ko'p so'rov birdan hisoblashni boshlaydi. Yechimlar: `Cache::flexible`, qulf bilan bitta jarayon hisoblasin, TTL'ga tasodifiy jitter qo'shish.",
    "",
    "### Testlash",
    "Testda `CACHE_STORE=array` (phpunit.xml); `Cache::shouldReceive` o'rniga haqiqiy array store bilan natijani tekshiring. `Cache::spy()` kerak bo'lsa.",
    "",
    "### Qoidalar",
    "1. Kalitni markazlashtiring (`CacheKey::userReport($id)`), satrni tarqatmang.",
    "2. Yozishda tegishli kalitni `forget` qiling; TTL — himoya to'ri, asosiy invalidatsiya emas.",
    "3. Keshlangan qiymat serializatsiya qilinadi: Eloquent modelni emas, massiv/DTO saqlang.",
    "4. `flush()` ni production'da ishlatmang."
  ],
  "examples": [
    {
      "title": "Remember, forget va qulf",
      "lang": "php",
      "note": "Hisobotni bir marta hisoblash",
      "code": [
        "use Illuminate\\Support\\Facades\\Cache;",
        "",
        "public function report(int $shopId): array",
        "{",
        "    return Cache::remember(\"report:shop:{$shopId}\", now()->addMinutes(15), function () use ($shopId) {",
        "        return Cache::lock(\"report:build:{$shopId}\", 30)->block(10, fn () => $this->build($shopId));",
        "    });",
        "}",
        "",
        "public function onOrderPlaced(int $shopId): void",
        "{",
        "    Cache::forget(\"report:shop:{$shopId}\");",
        "}",
        "",
        "// Stale-while-revalidate",
        "$stats = Cache::flexible('dashboard:stats', [60, 300], fn () => $this->heavyStats());"
      ]
    }
  ],
  "pitfalls": [
    "`file`/`database` driverda `Cache::tags()` ishlamaydi (xato): redis yoki memcached kerak.",
    "`Cache::flush()` butun store'ni (boshqa ilovalarning kalitlarini ham) o'chiradi: tag yoki aniq `forget` ishlating.",
    "Eloquent model/obyektni keshlash: klass o'zgarsa eski serializatsiya `__PHP_Incomplete_Class` beradi; massiv/DTO saqlang.",
    "`remember` ichida qulfsiz og'ir hisob: kalit tugaganda stampede; qulf yoki `flexible`.",
    "`Cache::lock` ni `file` driver bilan ko'p serverda ishlatish: har server o'z qulfini ko'radi (race condition).",
    "Testda haqiqiy Redis'ga yozish: `CACHE_STORE=array` qo'ying."
  ]
});
