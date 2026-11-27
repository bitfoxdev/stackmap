/* Chuqur dars: 1.26. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.26", {
  "lesson": [
    "### Qo'llab-quvvatlash va upgrade",
    "Faqat faol versiyalar xavfsizlik tuzatishini oladi: 8.1 EOL, 8.2 xavfsizlik 2026-12-31 gacha, 8.3 2027-12-31, 8.4 2028-12-31, 8.5 2029-12-31 gacha (aniq sanalar: php.net/supported-versions). Yangi loyiha uchun eng so'nggi barqaror versiya (8.4 yoki 8.5) tanlanadi.",
    "",
    "Upgrade tartibi:",
    "1. `composer.json` da `php` talabini va kutubxona mosligini tekshiring (`composer why-not php 8.4`).",
    "2. Testlarni yangi versiyada CI matritsasida yuriting.",
    "3. PHPStan darajasini oshiring, Rector (`PHP_83`/`PHP_84` set) bilan avtomatik o'zgartiring.",
    "4. Deprecation'larni log orqali kuzating (`E_DEPRECATED`) va tuzating.",
    "",
    "Eng yangi yangiliklar: 1.34 (Property Hooks), 1.41 (8.4 va 8.5), 1.40 (Fibers).",
    "",
    "### Versiya bo'yicha batafsil",
    "",
    "**PHP 8.0**",
    "- **Named arguments, constructor promotion, union types, mixed, static return.**",
    "- Attributes, match, nullsafe, throw expression, non-capturing catch (`catch (E)`), trailing comma parametrlarda.",
    "- `str_contains/starts_with/ends_with`, `get_debug_type`, `get_resource_id`, `WeakMap`, `Stringable`, `ValueError`, `fdiv`.",
    "- **Qat'iylik:** `\"abc\" == 0` false, saner numeric strings, ichki funksiyalar `TypeError`/`ValueError`, mavjud bo'lmagan massiv kaliti Warning, `@` fatal xatoni yashirmaydi.",
    "- **JIT** (OPcache ichida).",
    "- `private` metodlar voris uchun imzo tekshirilmaydi; abstract trait metodlari qat'iy tekshiriladi.",
    "",
    "**PHP 8.1**",
    "- Enums, readonly property, first-class callable `f(...)`, `new` initializer'da, pure intersection types, `never`, fibers, final class constants.",
    "- `array_is_list`, `fsync`, string-kalitli array unpacking, `0o17` sakkizlik, `$GLOBALS` cheklovlari, `Serializable` ogohlantirishi.",
    "- **Deprecated:** null → ichki skalyar parametr, `Serializable` faqat bo'lsa, float → int implicit kasr yo'qotilishi.",
    "",
    "**PHP 8.2**",
    "- readonly class, DNF types, `null/false/true` standalone, constants in traits, `Random` kengaytmasi, `#[SensitiveParameter]`, `AllowDynamicProperties`.",
    "- `mysqli::execute_query`, `ini_parse_quantity`, `memory_reset_peak_usage`.",
    "- **Deprecated:** dinamik property, `${var}` interpolatsiya, `utf8_encode/decode`.",
    "",
    "**PHP 8.3**",
    "- Typed class constants, dynamic class const fetch `Foo::{$n}`, `#[Override]`, `json_validate`, `Randomizer::getBytesFromString/getFloat`, `readonly` amend in `__clone`, anonymous readonly classes, negativ array indekslar uchun kalit qoidasi.",
    "- `mb_str_pad`, `str_increment/decrement`, `unserialize()` xatolarida yaxshiroq diagnostika, `gc_status()` kengaytirilgan, `Date*` aniq exception'lar.",
    "- **Deprecated:** `get_class()` argumentsiz, `assert_options`.",
    "",
    "### Backward compatibility (BC) break'lar",
    "Minor versiyalarda ham BC break bo'ladi (deprecation → ertaroq olib tashlanadi). Manba: php.net/migration84 (har versiya uchun \"Backward Incompatible Changes\", \"Deprecated features\" bo'limlari). Muhim naqsh: bugungi deprecation — ertangi xato (dinamik property 9.0 da)."
  ],
  "examples": [
    {
      "title": "8.0–8.3 aralash",
      "lang": "php",
      "code": [
        "enum Status: string { case Draft = 'draft'; case Live = 'live'; }",
        "",
        "final readonly class Post",
        "{",
        "    public function __construct(",
        "        public string $title,",
        "        public Status $status = Status::Draft,",
        "    ) {}",
        "}",
        "",
        "$post = new Post(title: 'Salom');",
        "$fn = strtoupper(...);",
        "echo match ($post->status) { Status::Live => 'ok', default => 'kutilmoqda' };"
      ]
    },
    {
      "title": "Typed constants va Override",
      "lang": "php",
      "code": [
        "class Base { public function run(): void {} }",
        "",
        "final class Impl extends Base",
        "{",
        "    public const string NAME = 'impl';          // 8.3",
        "",
        "    #[\\Override]",
        "    public function run(): void {}              // Base::run yo'q bo'lsa — xato",
        "}",
        "var_dump(json_validate('{\"a\":1}'));             // true"
      ]
    },
    {
      "title": "Rector bilan upgrade",
      "lang": "bash",
      "code": [
        "composer require --dev rector/rector",
        "vendor/bin/rector init",
        "# rector.php: ->withPhpSets(php84: true)",
        "vendor/bin/rector process app --dry-run"
      ]
    },
    {
      "title": "8.1–8.3 aralash",
      "lang": "php",
      "code": [
        "enum Level: int { case Low = 1; case High = 2; }",
        "",
        "final readonly class Config",
        "{",
        "    public const string ENV = 'prod';",
        "    public function __construct(public Level $level = Level::Low, public array $opts = []) {}",
        "",
        "    #[\\Override] public function __toString(): string { return \"{$this->level->name}\"; }",
        "}",
        "$c = new Config(opts: ['x' => 1]);",
        "$f = $c->__toString(...);",
        "echo json_validate('{\"a\":1}') ? 'ok' : 'xato';"
      ]
    }
  ],
  "pitfalls": [
    "Dinamik property (8.2 dan deprecated, 9.0 da xato) eski kodni sindiradi: klassda e'lon qiling yoki `#[\\AllowDynamicProperties]`.",
    "EOL versiyada qolish xavfsizlik tuzatishlarisiz ishlash degani; upgrade rejasini oldindan tuzing.",
    "Rector avtomatik o'zgartirishlarni diff bilan ko'rib chiqing: semantik farqlar bo'lishi mumkin (masalan `match` strict).",
    "Kutubxona `php` talabi sizning versiyangizdan past bo'lsa `composer update` bloklaydi; `composer why-not`."
  ]
});
