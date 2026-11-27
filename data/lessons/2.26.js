/* Chuqur dars: 2.26. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.26", {
  "lesson": [
    "### Tuzilma",
    "```",
    "acme/audit-log",
    "├─ composer.json",
    "├─ src/AuditLogServiceProvider.php",
    "├─ config/audit-log.php",
    "├─ database/migrations/",
    "├─ routes/ resources/views/ lang/",
    "└─ tests/ (Orchestra Testbench)",
    "```",
    "`composer.json`: `\"autoload\": {\"psr-4\": {\"Acme\\\\AuditLog\\\\\": \"src/\"}}`, `\"extra\": {\"laravel\": {\"providers\": [\"Acme\\\\AuditLog\\\\AuditLogServiceProvider\"], \"aliases\": {...}}}` — foydalanuvchi `composer require` qilgach provider **o'zi** ulanadi.",
    "",
    "### Provider",
    "- `register()`: `$this->mergeConfigFrom(__DIR__.'/../config/audit-log.php', 'audit-log');` (foydalanuvchi config'i bilan birlashadi), binding.",
    "- `boot()`: `loadMigrationsFrom(...)`, `loadRoutesFrom(...)`, `loadViewsFrom(..., 'audit-log')`, `loadTranslationsFrom(...)`, `publishes([...config => config_path(...)], 'audit-log-config')`, `publishesMigrations(...)` (Laravel 11+/12: migratsiyalarni sanalab nashr qiladi), `commands([...])` (faqat `runningInConsole()` da).",
    "- Foydalanuvchi: `php artisan vendor:publish --tag=audit-log-config`.",
    "- Yordam: `spatie/laravel-package-tools` (`PackageServiceProvider` — `name()`, `hasConfigFile()`, `hasMigration()`, `hasCommand()`): kamroq qo'lda kod.",
    "",
    "### Versiya mosligi",
    "`\"require\": {\"php\": \"^8.2\", \"illuminate/support\": \"^11.0|^12.0|^13.0\"}`: faqat sinab ko'rilgan versiyalar. SemVer: bug fix = patch, yangi imkoniyat = minor, breaking = major. Laravel major'lari yiliga chiqadi (2.28): CI matritsasi (PHP × Laravel) shart. `composer.json` da `\"require-dev\": {\"orchestra/testbench\": \"^9|^10|^11\"}`.",
    "",
    "### Testlash",
    "Orchestra Testbench Laravel muhitini paket ichida beradi: `abstract class TestCase extends Orchestra\\Testbench\\TestCase { protected function getPackageProviders($app) { return [AuditLogServiceProvider::class]; } }`, `defineEnvironment($app)` da DB/config; `defineDatabaseMigrations()` bilan migratsiya. `vendor/bin/testbench` buyruqlari.",
    "",
    "### Taqsimlash",
    "Packagist'ga (`composer.json` + git teg `v1.0.0`) yoki private (Satis, GitLab Package Registry, Composer `repositories`). README, CHANGELOG, litsenziya, GitHub Actions matritsasi.",
    "",
    "### Qoidalar",
    "1. Paket global holatni o'zgartirmaydi; sozlanadigan (config) va nashr qilinadigan (publish).",
    "2. Foydalanuvchi loyihasidagi nomlar bilan to'qnashmaslik uchun nom/prefiks (`audit_logs`, `audit-log::`).",
    "3. Public API (yagona `Facade`/servis) ni kichik va barqaror saqlang.",
    "4. CI: PHP va Laravel versiyalari matritsasi."
  ],
  "examples": [
    {
      "title": "Provider",
      "lang": "php",
      "note": "Paket Service Provider",
      "code": [
        "namespace Acme\\AuditLog;",
        "",
        "use Illuminate\\Support\\ServiceProvider;",
        "",
        "class AuditLogServiceProvider extends ServiceProvider",
        "{",
        "    public function register(): void",
        "    {",
        "        $this->mergeConfigFrom(__DIR__.'/../config/audit-log.php', 'audit-log');",
        "        $this->app->singleton(AuditLogger::class);",
        "    }",
        "",
        "    public function boot(): void",
        "    {",
        "        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');",
        "",
        "        if ($this->app->runningInConsole()) {",
        "            $this->publishes([__DIR__.'/../config/audit-log.php' => config_path('audit-log.php')], 'audit-log-config');",
        "            $this->commands([Console\\PruneAuditLogs::class]);",
        "        }",
        "    }",
        "}"
      ]
    },
    {
      "title": "composer.json va Testbench",
      "lang": "json",
      "note": "Auto-discovery",
      "code": [
        "{",
        "  \"name\": \"acme/audit-log\",",
        "  \"require\": { \"php\": \"^8.2\", \"illuminate/support\": \"^11.0|^12.0|^13.0\" },",
        "  \"require-dev\": { \"orchestra/testbench\": \"^9.0|^10.0|^11.0\", \"phpunit/phpunit\": \"^11.0\" },",
        "  \"autoload\": { \"psr-4\": { \"Acme\\\\AuditLog\\\\\": \"src/\" } },",
        "  \"extra\": { \"laravel\": { \"providers\": [\"Acme\\\\AuditLog\\\\AuditLogServiceProvider\"] } }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`mergeConfigFrom` o'rniga config'ni to'liq nusxalash: foydalanuvchi o'zgartirmagan kalitlar yangi versiyada yo'qoladi.",
    "Constraint'ni juda keng (`illuminate/support: *`) yozish: noma'lum Laravel versiyasida jimgina buziladi; sinalgan versiyalar.",
    "Paketda `env()` chaqirish: `config:cache` dan keyin `null`; faqat `config()` (2.10).",
    "Buyruq va nashrlarni `runningInConsole()` tekshiruvisiz yuklash: HTTP so'rovda ortiqcha ish.",
    "Paket jadval/route nomlarini umumiy qoldirish (`logs`): foydalanuvchi ilovasi bilan to'qnashadi; prefiks.",
    "CI'da faqat bitta Laravel versiyasi bilan sinash: boshqa major'da ishlamay qoladi."
  ]
});
