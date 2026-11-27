/* Chuqur dars: 2.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.2", {
  "lesson": [
    "### Asosiy papkalar",
    "- `app/` — kod: `Models`, `Http/Controllers`, `Http/Middleware`, `Http/Requests`, `Http/Resources`, `Providers`, `Policies`, `Jobs`, `Mail`, `Notifications`, `Console/Commands`, `Enums` (`make:*` buyruqlari kerak bo'lganda papka yaratadi).",
    "- `bootstrap/` — `app.php` (sozlash markazi), `providers.php` (provider ro'yxati), `cache/` (framework keshi, yozish huquqi kerak).",
    "- `config/` — sozlamalar; Laravel 11+ da faqat asosiylari bor, qolganini `php artisan config:publish` bilan nashr qilasiz.",
    "- `database/` — `migrations/`, `factories/`, `seeders/`, `database.sqlite` (default SQLite, 11+).",
    "- `public/` — **yagona veb-ildiz**: `index.php`, `build/` (Vite), `storage` symlink. Veb-server faqat shu papkani ochishi kerak.",
    "- `resources/` — `views/` (Blade), `js`, `css`, `lang/` (`lang:publish`).",
    "- `routes/` — `web.php`, `console.php`; `api.php` va `channels.php` kerak bo'lganda (`install:api`, `install:broadcasting`).",
    "- `storage/` — `app/` (fayllar), `framework/` (cache, sessions, views), `logs/`. Veb-server foydalanuvchisiga yozish huquqi shart.",
    "- `tests/` — `Feature/`, `Unit/`.",
    "",
    "### Laravel 11+ da nima o'zgardi",
    "`Http/Kernel`, `Console/Kernel`, `Exceptions/Handler`, `RouteServiceProvider` yo'q; hammasi `bootstrap/app.php` (2.1). Middleware klasslari skeletda yo'q (framework ichida), kerak bo'lsa `make:middleware`. Skelet kichik: ortiqcha faylsiz.",
    "",
    "### Git va xavfsizlik",
    "`.env`, `/vendor`, `/node_modules`, `/public/build`, `/public/storage`, `/storage/*.key` git'da yo'q (`.gitignore`). `.env.example` git'da. `APP_KEY` generatsiyasi: `php artisan key:generate`.",
    "",
    "### Qatlamlash",
    "Standart MVC tez to'ladi. Variantlar (loyiha hajmiga qarab):",
    "- **Actions** (`app/Actions/CreateOrder.php`, bitta `handle()`): eng yengil, \"controller yupqa\" uchun yetarli.",
    "- **Services** (`app/Services`): tashqi integratsiya yoki bir nechta amal.",
    "- **DTO/Value Object** (`app/DTO`, `readonly` klass): qatlamlar orasida ma'lumot.",
    "- **Domain/modullar** (`app/Domain/Orders/...` yoki `Modules/`): katta loyiha; `bootstrap/app.php` da `withCommands` va provider bilan ulanadi.",
    "Kamida modellarda Eloquent logikasini (scope, cast) saqlang; \"Repository\" ni faqat haqiqiy ehtiyoj bo'lsa qo'shing (Eloquent allaqachon repository).",
    "",
    "### Qoidalar",
    "1. Framework strukturasiga qarshi chiqmang; qatlamlarni qo'shing, almashtirmang.",
    "2. Qatlamlar bir yo'nalishda: Controller → Action/Service → Model (teskarisi yo'q).",
    "3. `public/` dan boshqa narsa veb'ga ochiq emas.",
    "4. Papkalarni mavzu bo'yicha (domen) guruhlang, yetarlicha katta bo'lganda."
  ],
  "examples": [
    {
      "title": "Action qatlami",
      "lang": "php",
      "note": "app/Actions/CreateOrder.php",
      "code": [
        "namespace App\\Actions;",
        "",
        "use App\\DTO\\NewOrder;",
        "use App\\Models\\{Order, User};",
        "use Illuminate\\Support\\Facades\\DB;",
        "",
        "class CreateOrder",
        "{",
        "    public function handle(User $user, NewOrder $data): Order",
        "    {",
        "        return DB::transaction(function () use ($user, $data) {",
        "            $order = $user->orders()->create(['total' => $data->total]);",
        "            $order->items()->createMany($data->items);",
        "",
        "            return $order;",
        "        });",
        "    }",
        "}"
      ]
    },
    {
      "title": "Loyiha buyruqlari",
      "lang": "bash",
      "note": "Skelet va qatlam",
      "code": [
        "laravel new shop                         # yoki: composer create-project laravel/laravel shop",
        "php artisan install:api                  # routes/api.php + Sanctum",
        "php artisan make:model Order -mfs        # model + migration + factory + seeder",
        "php artisan make:class Actions/CreateOrder   # ixtiyoriy klass",
        "php artisan config:publish cors          # kerakli config'ni nashr qilish"
      ]
    }
  ],
  "pitfalls": [
    "Veb-server ildizini loyiha ildiziga (`public/` emas) qo'yish: `.env` va kod URL orqali ochiladi.",
    "`storage/` va `bootstrap/cache` ga yozish huquqi yo'q: 500 xatosi (log/session/view yozilmaydi).",
    "`.env` ni git'ga qo'yish: sirlar tarixda qoladi.",
    "Hamma narsani `app/Http/Controllers` va Model'ga yig'ish: tez og'irlashadi; Action/Service qatlami.",
    "Eski qo'llanma bo'yicha `Kernel.php`/`Handler.php` qidirish: Laravel 11+ da yo'q.",
    "Eloquent ustiga keraksiz Repository qatlami: ikkilangan abstraksiya, ko'p kod."
  ]
});
