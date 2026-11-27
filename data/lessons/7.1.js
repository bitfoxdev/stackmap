/* Chuqur dars: 7.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.1", {
  "lesson": [
    "### Asosiy maydonlar",
    "- `name` — `vendor/project` (kichik harf). Nashr qilinadigan paket uchun majburiy. `description`, `license`, `authors`, `keywords`, `homepage`.",
    "- `type` — default `library`; `project` (ilova), `metapackage` (faqat bog'liqliklar), `composer-plugin`. Laravel ilovasi `project`.",
    "- `require` — ishlash uchun kerakli paketlar. **Platform** talablari ham shu yerda: `\"php\": \"^8.2\"`, `\"ext-mbstring\": \"*\"`, `\"ext-pdo\": \"*\"`.",
    "- `require-dev` — faqat ishlab chiqish (test, linter); root-only; `--no-dev` o'tkazib yuboradi.",
    "- `autoload` / `autoload-dev` — PSR-4 xaritasi, `classmap`, `files`, `exclude-from-classmap` (6-mavzu). `autoload-dev` — test namespace'lari.",
    "",
    "### Boshqaruv maydonlari",
    "- `conflict` — shu paket bilan birga o'rnatilmasligi kerak bo'lgan versiyalar (`\"symfony/symfony\": \"<5.4\"`).",
    "- `replace` — boshqa paketning o'rnini bosadi (fork, split paket; `self.version`).",
    "- `provide` — virtual paket (interfeys implementatsiyasi: `psr/log-implementation`).",
    "- `suggest` — ixtiyoriy, matnli maslahat (versiya cheklovi emas).",
    "- `minimum-stability` (default `stable`), `prefer-stable` — root-only.",
    "- `repositories` — qo'shimcha manba (`vcs`, `path`, `composer`, `package`, `artifact`); tartib muhim, Packagist oxirida.",
    "- `config` — root-only sozlamalar (`sort-packages`, `optimize-autoloader`, `allow-plugins`, `platform`).",
    "- `scripts`, `scripts-descriptions`, `extra`, `bin`, `abandoned`.",
    "",
    "### Laravel loyiha misoli",
    "`require`: `php`, `laravel/framework`, `laravel/tinker`; `require-dev`: `phpunit/phpunit`, `fakerphp/faker`, `mockery/mockery`; `autoload`: `App\\\\ => app/`, `Database\\\\Factories\\\\`, `Database\\\\Seeders\\\\`; `autoload-dev`: `Tests\\\\ => tests/`; `scripts`: `post-autoload-dump`, `post-update-cmd` (publish) va `dev`; `config`: `optimize-autoloader`, `preferred-install: dist`, `sort-packages`, `allow-plugins`; `minimum-stability: stable`, `prefer-stable: true`.",
    "",
    "### Sifat",
    "`composer validate --strict` — sintaksis, majburiy maydonlar va ogohlantirishlarni (`lock` eskirgan) xato sifatida tekshiradi (CI'da). `composer config` komandasi fayl maydonlarini xavfsiz tahrirlaydi.",
    "",
    "### Qoidalar",
    "1. Ilovada platform talabini (`php`, `ext-*`) aniq yozing: noto'g'ri muhitda erta xato.",
    "2. Faqat haqiqatan ishlatiladigan paketni `require` ga; test/linter — `require-dev`.",
    "3. `sort-packages` yoqing (diff'lar tartibli).",
    "4. Qo'lda tahrir o'rniga `composer require/remove/config` ishlating, so'ng `lock` yangilanadi."
  ],
  "examples": [
    {
      "title": "Kutubxona composer.json",
      "lang": "json",
      "note": "Minimal, to'g'ri tuzilgan",
      "code": [
        "{",
        "  \"name\": \"acme/audit-log\",",
        "  \"description\": \"Audit log for Laravel\",",
        "  \"type\": \"library\",",
        "  \"license\": \"MIT\",",
        "  \"require\": {",
        "    \"php\": \"^8.2\",",
        "    \"ext-json\": \"*\",",
        "    \"illuminate/support\": \"^11.0|^12.0\"",
        "  },",
        "  \"require-dev\": { \"phpunit/phpunit\": \"^11.0\" },",
        "  \"autoload\": { \"psr-4\": { \"Acme\\\\AuditLog\\\\\": \"src/\" } },",
        "  \"autoload-dev\": { \"psr-4\": { \"Acme\\\\AuditLog\\\\Tests\\\\\": \"tests/\" } },",
        "  \"config\": { \"sort-packages\": true },",
        "  \"minimum-stability\": \"stable\"",
        "}"
      ]
    },
    {
      "title": "Tekshirish",
      "lang": "bash",
      "note": "CI uchun",
      "code": [
        "composer validate --strict          # composer.json va lock to'g'riligi",
        "composer config sort-packages true",
        "composer show --platform            # mavjud platform paketlari (php, ext-*)"
      ]
    }
  ],
  "pitfalls": [
    "Test/linter paketlarini `require` ga yozish: production'ga tushadi (`--no-dev` ularni tashlamaydi).",
    "`php`/`ext-*` talablarini yozmaslik: kerakli kengaytma yo'q muhitda ilova runtime'da yiqiladi.",
    "`minimum-stability: dev` ni ilovada yoqib qo'yish: beqaror paketlar tushadi; kerak bo'lsa bitta paketga `@dev` flag.",
    "`composer.json` ni qo'lda tahrirlab `lock` ni yangilamaslik: `install` ogohlantiradi; `composer update --lock` yoki `require` ishlating.",
    "Kutubxonada `config`/`repositories` ga tayanish: bog'liqlikda ular e'tiborga olinmaydi (root-only).",
    "`suggest` ga majburiy narsani yozish: o'rnatilmaydi, faqat matn."
  ]
});
