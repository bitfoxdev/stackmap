/* Chuqur dars: 1.41. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.41", {
  "lesson": [
    "### Versiyalarni qo'llab-quvvatlash",
    "8.5 (2025-11-20) — faol 2027-12-31, xavfsizlik 2029-12-31 gacha; 8.4 — faol 2026-12-31, xavfsizlik 2028-12-31; 8.3 — xavfsizlik 2027-12-31; 8.2 — 2026-12-31 (tez orada EOL); 8.1 EOL. 8.6 (2026-11-19) — faol 2028-12-31, xavfsizlik 2030-12-31 gacha. Production uchun odatda 8.4 yoki 8.5; 8.6 ga kutubxonalar (Laravel, paketlar) rasman qo'llab-quvvatlagach o'ting.",
    "",
    "### Upgrade",
    "1. `composer why-not php 8.4`.",
    "2. CI matritsasi.",
    "3. Rector: `->withPhpSets(php84: true)`.",
    "4. PHPStan + log'dagi deprecation'larni yo'q qiling.",
    "5. Implicit nullable'larni aniq `?T` ga o'tkazing.",
    "",
    "### PHP 8.4 batafsil",
    "- **Property hooks, asymmetric visibility** (1.34).",
    "- **Lazy objects:** `ReflectionClass::newLazyGhost/newLazyProxy`, `isUninitializedLazyObject`, `initializeLazyObject` — ORM, DI container (Symfony/Laravel keyingi versiyalarda foydalanadi).",
    "- `new` qavssiz zanjir: `new Foo()->bar()`.",
    "- **Yangi array funksiyalar:** `array_find`, `array_find_key`, `array_any`, `array_all`.",
    "- `#[\\Deprecated]` atributi: o'z funksiyalaringizni deprecated qilish.",
    "- **Yangi DOM:** `Dom\\HTMLDocument::createFromString()`, CSS selector (`querySelector`), HTML5 parser.",
    "- **BCMath:** `BcMath\\Number` obyekti, `bcfloor/bcceil/bcround/bcdivmod`.",
    "- **mbstring:** `mb_trim`, `mb_ltrim/rtrim`, `mb_ucfirst/lcfirst`.",
    "- `round()` `RoundingMode` enum, `intdiv` o'zgarmagan; `fpow`.",
    "- **PDO driver-spetsifik subclasses:** `Pdo\\Mysql`, `Pdo\\Pgsql`, `Pdo\\Sqlite`.",
    "- **Deprecated:** implicit nullable, `E_STRICT`, `session.sid_*`, GET/POST sessiya parametrlari, `lcg_value`, `_` nomli klass;",
    "- **OPcache:** JIT yangi IR-asosli arxitektura; `opcache.jit` default `disable`.",
    "",
    "### PHP 8.5 batafsil",
    "- **Pipe operatori:** `$x |> f(...) |> g(...)` — chap qiymat o'ng callable'ning birinchi argumenti; callable bir argumentli bo'lishi shart.",
    "- **URI kengaytmasi:** `Uri\\Rfc3986\\Uri`, `Uri\\WhatWg\\Url` — URL parse/normalize/resolve.",
    "- `clone($obj, ['prop' => $v])`.",
    "- `#[\\NoDiscard]`: qaytarilgan qiymat e'tiborsiz qolsa ogohlantirish; `(void)` cast bilan ataylab tashlash.",
    "- `array_first/array_last`.",
    "- **Closure/first-class callable konstanta ifodalarda**, attribute'larda ham.",
    "- `Persistent cURL share handles`, fatal xatolarda stack trace (`fatal_error_backtraces` ini).",
    "- **Deprecated:** backtick operatori, `__sleep/__wakeup` (`__serialize` ni ishlating), cast nomlari (`(boolean)`, `(integer)`, `(double)`, `(binary)`), va boshqalar (to'liq ro'yxat: php.net/migration85).",
    "",
    "### PHP 8.6 batafsil (2026-11-19)",
    "- **Partial function application:** `?` o'rniga keyin beriladigan argument: `$f = version_compare(?, '8.6', '>=');` — qolgan argumentlarni qabul qiluvchi `Closure` qaytaradi.",
    "- **`clamp($v, $min, $max)`:** qiymatni oraliqqa tushiradi (`clamp(-10, 0, 100)` → `0`). Yangi `\\Time\\Duration` (nanosekund aniqlikdagi o'tgan vaqt) va `SortDirection` enum.",
    "- **Readonly property'ga default qiymat** berish mumkin (readonly class ichida ham).",
    "- **Stream xatolari:** `StreamErrorMode::Exception` va `StreamException`; `Io\\Poll` — epoll/kqueue asosidagi I/O multiplexing.",
    "- **Reflection:** `ReflectionParameter::getDocComment()`, `ReflectionProperty::isReadable()/isWritable()`; `#[\\Override]` endi konstanta va enum case'larda ham ishlaydi.",
    "- **Deprecated:** `finally` ichida `return`, `is_double/is_long/is_integer/doubleval`, `spl_object_hash()` (→ `spl_object_id()`), mbstring regex (`mb_ereg`, `mb_split`...), `define()` ning 3-argumenti, obyektni `array_walk()` ga berish.",
    "- **BC break:** sessiya default'lari xavfsizroq (`use_strict_mode`, `cookie_httponly` yoqiq, `samesite=Lax`); `trim()` endi `\\f` ni ham olib tashlaydi; `fclose/file_put_contents/copy` flush xatosida `false` qaytaradi; ko'p funksiya noto'g'ri qiymatda `ValueError` tashlaydi.",
    "Manba: php.net/releases/8.6/en.php.",
    "",
    "### Versiya tanlash",
    "- **Yangi loyiha:** 8.5 (8.6 yangi chiqdi: avval paketlar mosligini tekshiring), `composer.json`: `\"php\": \"^8.4\"`.",
    "- **Mavjud:** faol qo'llab-quvvatlanayotganga ko'chish (8.2 dan kam bo'lmagan).",
    "- **EOL:** 8.1 va past: xavfsizlik tuzatishi yo'q.",
    "",
    "### Foydali havolalar",
    "php.net/releases/8.4/en.php, php.net/releases/8.5/en.php, php.net/migration84, php.net/supported-versions, wiki.php.net/rfc."
  ],
  "examples": [
    {
      "title": "8.4 yangiliklar",
      "lang": "php",
      "code": [
        "$user = new User()->activate();                 // qavs kerak emas",
        "$admin = array_find($users, fn($u) => $u->isAdmin());",
        "",
        "echo mb_trim(\"  Oʻzbek  \");                     // \"Oʻzbek\"",
        "echo round(2.5, 0, RoundingMode::HalfEven);     // 2",
        "",
        "final class Legacy",
        "{",
        "    #[\\Deprecated('newMethod() ishlating', since: '2.0')]",
        "    public function old(): void {}",
        "}"
      ]
    },
    {
      "title": "8.5: pipe va clone with",
      "lang": "php",
      "code": [
        "$slug = ' PHP 8.5 '",
        "    |> trim(...)",
        "    |> strtolower(...)",
        "    |> (fn($s) => str_replace(' ', '-', $s));   // \"php-8.5\"",
        "",
        "final readonly class Point { public function __construct(public int $x, public int $y) {} }",
        "$p2 = clone($p, ['x' => 10]);                    // with-er",
        "",
        "$last = array_last($events);"
      ]
    },
    {
      "title": "Implicit nullable tuzatish",
      "lang": "php",
      "code": [
        "// 8.4 da deprecated",
        "function f(string $x = null) {}",
        "",
        "// to'g'ri",
        "function f(?string $x = null) {}"
      ]
    },
    {
      "title": "Lazy ghost va #[Deprecated]",
      "lang": "php",
      "code": [
        "final class Heavy { public function __construct(public array $data) { sleep(1); } }",
        "",
        "$ghost = (new ReflectionClass(Heavy::class))->newLazyGhost(function (Heavy $h) {",
        "    $h->__construct(loadData());",
        "});",
        "// birinchi $ghost->data murojaatida ishga tushadi",
        "",
        "#[\\Deprecated(message: 'newApi() dan foydalaning', since: '3.0')]",
        "function oldApi(): void {}"
      ]
    },
    {
      "title": "array_first, array_last, pipe",
      "lang": "php",
      "code": [
        "$words = ['php', 'laravel', 'vue'];",
        "echo array_first($words), array_last($words);       // php vue",
        "$r = 'Salom Dunyo' |> strtolower(...) |> (fn($s) => str_replace(' ', '-', $s));"
      ]
    }
  ],
  "pitfalls": [
    "Yangi sintaksis (hooks, pipe) eski PHP'da parse error beradi: kutubxonada `composer.json` `php` talabini ko'taring.",
    "Implicit nullable deprecation'lari ko'p paketlarda chiqadi; ularni PHPStan/Rector bilan tuzating.",
    "`|>` oddiy funksiya zanjirini soddalashtiradi, lekin chuqur mantiqni o'qib bo'lmas qiladi; ortiqcha ishlatmang.",
    "Beta/RC versiyani productionda ishlatmang; faqat 'Active support'dagi versiyalar xavfsizlik tuzatishini oladi.",
    "Pipe `|>` bir argumentli callable talab qiladi; ko'p argumentli uchun closure/partial.",
    "`#[\\NoDiscard]` qiymatni tashlasangiz ogohlantiradi: `(void) f();` bilan ataylab tashlang."
  ]
});
