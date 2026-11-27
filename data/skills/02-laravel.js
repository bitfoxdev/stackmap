/* 02 · Laravel
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  "id": 2,
  "slug": "laravel",
  "title": "Laravel",
  "group": "php-laravel",
  "description": "Laravel — PHP ekotizimidagi eng mashhur full-stack framework. Senior dasturchi undan nafaqat foydalanadi, balki **ichki mexanizmlarini** — so'rov hayotiy sikli, service container, provider'lar, facade'lar va event tizimini — chuqur tushunadi. Navbat va asinxron fon vazifalari (Queues & Background Jobs) esa alohida keng qamrovli mavzu bo'lgani sababli [Queues & Background Jobs](#/s/queues-and-background-jobs) hamda [Laravel Horizon](#/s/laravel-horizon) bo'limlarida maxsus yoritilgan.",
  "subskills": [
    {
      "id": "2.2",
      "title": "Application Structure",
      "description": [
        "Laravel loyiha tuzilmasi (11+ \"yupqa skelet\"): `app/` (kod), `bootstrap/` (`app.php`, `providers.php`, `cache/`), `config/`, `database/` (migrations, factories, seeders), `public/`, `resources/` (views, js, css, lang), `routes/` (`web.php`, `console.php`; `api.php` ixtiyoriy), `storage/`, `tests/`. Eski `Http/Kernel`, `Console/Kernel`, `Exceptions/Handler`, `RouteServiceProvider` yo'q. Senior uchun: kodni qatlamlash (Actions, Services, DTO) va papka konvensiyalari."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Yangi loyiha yarating (`laravel new`), `install:api` va `make:*` buyruqlari bilan papkalar qanday paydo bo'lishini kuzating, `app/Actions` va `app/DTO` kabi qatlam qo'shing, `bootstrap/providers.php` dagi provider ro'yxatini toping va `.gitignore` dagi nimalarni (vendor, .env, storage/*.key) tushuntiring.",
      "acceptanceCriteria": [
        "Har papkaning vazifasini biladi (app, bootstrap, config, database, routes, storage)",
        "Laravel 11+ da nima olib tashlanganini va yangi joyini biladi (`bootstrap/app.php`)",
        "`storage` yozish huquqi va `bootstrap/cache` ni biladi",
        "Kodni domen bo'yicha qatlamlashning variantlarini biladi"
      ],
      "prerequisites": [
        "2.1"
      ]
    },
    {
      "id": "2.10",
      "title": "Configuration va Environment Variables",
      "description": [
        "Konfiguratsiya: `.env` (muhitga xos sirlar va qiymatlar) → `config/*.php` (`env()` faqat shu yerda) → kodda `config('app.name')`. Production'da `config:cache` bilan hamma sozlama bitta faylga keshlanadi, shundan keyin `.env` o'qilmaydi. Senior uchun: sirlarni boshqarish, `.env` ni shifrlash, muhitga qarab xatti-harakat va `env()` tuzog'i."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`config/billing.php` yarating (`env()` bilan default'lar), kodda `config()` bilan o'qing, `config:cache` dan keyin `env()` ni to'g'ridan-to'g'ri chaqirgan joy buzilishini isbotlang va `env:encrypt` bilan `.env` ni shifrlang; testda `config(['billing.x' => 1])` bilan almashtiring.",
      "acceptanceCriteria": [
        "`env()` ni faqat `config/*.php` ichida ishlatish qoidasini va sababini biladi",
        "`config:cache`, `config:clear`, `optimize` ni biladi",
        "`app()->environment()`, `isProduction()`, `.env.testing` ni biladi",
        "`env:encrypt/decrypt` va sirlarni git'ga qo'ymaslik tamoyilini biladi"
      ],
      "prerequisites": [
        "2.2"
      ]
    },
    {
      "id": "2.18",
      "title": "Artisan Commands",
      "description": [
        "Artisan — Laravel'ning buyruq satri. `make:*`, `migrate`, `queue:work` kabi tayyor buyruqlardan tashqari **o'z buyruqlaringizni** yozasiz: import/eksport, tozalash, cron vazifalari, ma'muriy amallar. Yaxshi buyruq yupqa bo'ladi (mantiq Action/Service'da), to'g'ri exit code qaytaradi, interaktiv bo'lmagan rejimda ham ishlaydi va testlanadi."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "`users:import {file} {--dry-run} {--limit=100}` buyrug'ini yozing: fayl yo'q bo'lsa interaktiv so'rasin, progress bar ko'rsatsin, `--isolated` bilan bir vaqtda ikki marta ishlamasin va testda `expectsOutput` hamda `assertExitCode` bilan tekshirilsin.",
      "acceptanceCriteria": [
        "`$signature` sintaksisini (argument, option, array, default, shortcut) bexato yozadi",
        "Exit code'larning cron/CI uchun ahamiyatini va `$this->fail()` ni biladi",
        "`Isolatable` va `PromptsForMissingInput` nima qilishini tushuntira oladi",
        "Buyruqni Artisan test yordamchilari bilan testlay oladi"
      ],
      "prerequisites": [
        "2.8",
        "2.2"
      ]
    },
    {
      "id": "2.3",
      "title": "Routing va Route Model Binding",
      "description": [
        "Routing so'rovni controller/closure'ga yo'naltiradi. Laravel 11+ da route fayllari `bootstrap/app.php` (`withRouting`) orqali ulanadi; `routes/web.php` (session, CSRF) va `routes/api.php` (`php artisan install:api` bilan qo'shiladi, `/api` prefiksi, stateless) farqlanadi. Senior uchun: **route model binding** (implicit/explicit, scoped), nomli route, guruhlar, constraint, `route:cache` va \"closure route cache'lanmaydi\" tuzog'i."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`posts` va ichma-ich `posts.comments` resurs route'larini yozing: `scopeBindings()`, UUID constraint, `withTrashed()` bilan binding, nomli route, `Route::fallback`, va `route:list` hamda `route:cache` bilan tekshiring.",
      "acceptanceCriteria": [
        "`web` va `api` route farqini (middleware guruhi, prefiks, session) biladi",
        "Implicit, explicit va scoped binding hamda `withTrashed()` ni biladi",
        "Constraint (`whereNumber`, `whereUuid`, `whereIn`) va `Route::fallback` ni biladi",
        "`route:cache` closure bilan ishlamasligini va `route:list` ni biladi"
      ],
      "prerequisites": [
        "2.1"
      ]
    },
    {
      "id": "2.4",
      "title": "Middleware",
      "description": [
        "Middleware — so'rov controller'ga yetguncha (va javob qaytguncha) o'tadigan \"piyoz qatlamlari\": autentifikatsiya, rate limit, CORS, lokalizatsiya, loglash. Laravel 11+ da `app/Http/Kernel.php` yo'q: hammasi `bootstrap/app.php` dagi `->withMiddleware(function (Middleware $middleware) { ... })` da. Senior uchun: tartib, terminable middleware, parametrli middleware va global vs guruh farqi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`EnsureTenant` middleware yozing (parametrli: `tenant:required`), `bootstrap/app.php` da alias bering, `web` guruhiga `append` qiling, terminable qism bilan so'rov davomiyligini loglang va `Http::fake`siz feature test yozing.",
      "acceptanceCriteria": [
        "Before/after middleware farqini va `$next($request)` ni tushuntira oladi",
        "`append`, `prepend`, `alias`, `group`, `priority` ni `bootstrap/app.php` da ishlata oladi",
        "Parametrli middleware va `terminate()` ni biladi",
        "Middleware tartibi natijaga ta'sir qilishini biladi"
      ],
      "prerequisites": [
        "2.1"
      ]
    },
    {
      "id": "2.5",
      "title": "Controllers va Resource Controllers",
      "description": [
        "Controller HTTP so'rovni qabul qilib, Action/Service'ga topshiradi va javob qaytaradi: **yupqa** bo'lishi kerak. Resource controller 7 ta standart metod beradi (`index, create, store, show, edit, update, destroy`), API variantida `create/edit` yo'q. Laravel 11+ da `Controller` bazaviy klassi bo'sh (middleware/`authorize` yordamchilari olib tashlangan): middleware route'da yoki `HasMiddleware` interfeysi bilan beriladi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`PostController` ni `apiResource` + `--invokable` `PublishPostController` bilan yozing: DI bilan `PublishPost` Action'ni oling, `HasMiddleware` bilan middleware bering, Form Request + API Resource ishlating va controller 15 qatordan oshmasligini ta'minlang.",
      "acceptanceCriteria": [
        "Resource va API resource route'larini (`Route::resource/apiResource`, `only/except`) biladi",
        "Invokable (single-action) controller va `HasMiddleware` ni biladi",
        "Constructor va method injection farqini biladi",
        "Controller'ni yupqa saqlab, mantiqni Action/Service'ga ajratadi"
      ],
      "prerequisites": [
        "2.3",
        "mvc-architecture"
      ]
    },
    {
      "id": "2.11",
      "title": "Request va Response Lifecycle",
      "description": [
        "Request va Response — so'rov (`Illuminate\\Http\\Request`: Symfony ustida) va javob (view, JSON, redirect, fayl, stream). Bilish kerak: kiruvchi ma'lumotni o'qish (`input`, `query`, `json`, `file`), so'rov turini aniqlash (`expectsJson`), JSON/status javoblar, cookie, sarlavha, redirect va flash. Senior uchun: kirishni **ishonchsiz** deb ko'rish, `$request->all()` xavfi va ishonchli proksi (`TrustProxies`)."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "JSON API endpoint yozing: `Request` dan faqat kerakli maydonlarni oling (`only`/`validated`), `201` + `Location` sarlavhali JSON javob, `stream`/`streamDownload` bilan katta CSV eksport va `redirect()->back()->with()` flash xabar; HTTP testlari bilan tekshiring.",
      "acceptanceCriteria": [
        "`input`, `query`, `json`, `file`, `has/filled`, `boolean`, `integer`, `only/except` ni farqlaydi",
        "JSON/redirect/download/stream javoblarini va status kodlarini to'g'ri ishlatadi",
        "`expectsJson`, `wantsJson`, `is()`, `ip()`, `user()` ni biladi",
        "`TrustProxies`, `Accept` sarlavhasi va content negotiation'ni biladi"
      ],
      "prerequisites": [
        "2.1"
      ]
    },
    {
      "id": "2.12",
      "title": "Validation",
      "description": [
        "Validation — kiruvchi ma'lumotni qoidalar bilan tekshirish. Xato bo'lsa veb'da avtomatik redirect + `$errors` + `old()`, JSON so'rovda **422** va xatolar massivi qaytadi. Asosiy yo'l: `$request->validate()` yoki Form Request (2.13). Senior uchun: shartli qoidalar, massiv/wildcard, `Rule` obyektlari, `validated()` bilan mass assignment himoyasi va `after` hook'lar."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Buyurtma yaratish endpoint'i uchun qoidalarni yozing: ichki massiv (`items.*.product_id`), `Rule::unique()->ignore()`, shartli `required_if`, `Password::min(8)->mixedCase()`, fayl turi/hajmi va faqat `validated()` ni saqlang; 422 javobini test qiling.",
      "acceptanceCriteria": [
        "`validate()` xatti-harakatini (web redirect vs JSON 422) biladi",
        "Massiv/wildcard va shartli qoidalarni (`required_if`, `exclude_if`, `sometimes`, `nullable`) yoza oladi",
        "`Rule::unique/exists/in/enum` va `Password`/`File` qoidalarini biladi",
        "`validated()`/`safe()` bilan faqat tekshirilgan ma'lumotni ishlatadi"
      ],
      "prerequisites": [
        "2.11"
      ]
    },
    {
      "id": "2.13",
      "title": "Form Requests",
      "description": [
        "Form Request — validatsiya va ruxsatni controller'dan alohida klassga olib chiqadi: `authorize()` (kim qila oladi), `rules()` (nima to'g'ri), `messages()`/`attributes()`, `prepareForValidation()` va `after()`. Controller yupqa qoladi: `store(StorePostRequest $request)` chaqirilishidan oldin so'rov allaqachon tekshirilgan bo'ladi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`UpdatePostRequest` yozing: `authorize()` da policy tekshiruvi, `rules()` da `Rule::unique()->ignore($this->post)`, `prepareForValidation()` da slug normalizatsiyasi, `after()` hook va `validated()` bilan Action'ga uzating; ruxsatsiz foydalanuvchi uchun 403 va noto'g'ri ma'lumot uchun 422 testlarini yozing.",
      "acceptanceCriteria": [
        "`authorize()` va `rules()` vazifasini ajratadi (403 vs 422)",
        "`prepareForValidation`, `passedValidation`, `after()` ni biladi",
        "Route parametrlariga `$this->route('post')` yoki modelga murojaat qila oladi",
        "`validated()`/`safe()` ni Action/Service'ga uzatadi"
      ],
      "prerequisites": [
        "2.12",
        "2.15"
      ]
    },
    {
      "id": "2.33",
      "title": "Blade: shablonlar, direktivalar va xavfsizlik",
      "description": [
        "Blade — Laravel'ning shablon dvigateli: oddiy PHP'ga kompilyatsiya qilinadi va keshlanadi. Asosiysi: `{{ }}` avtomatik **escape** qiladi (XSS himoyasi), `{!! !!}` esa xom chiqaradi. Direktivalar (`@if`, `@foreach`, `@auth`, `@can`, `@include`, `@csrf`, `@method`) shablonni qisqa va o'qiladigan qiladi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Foydalanuvchilar ro'yxati sahifasini Blade bilan yozing: `@forelse`, `$loop`, `@can`, forma uchun `@csrf @method('PUT')`, `@error`, `@json` bilan JS'ga ma'lumot uzatish; foydalanuvchi kiritgan matn escape qilinishini test bilan isbotlang.",
      "acceptanceCriteria": [
        "`{{ }}` va `{!! !!}` farqini hamda XSS xavfini tushuntira oladi",
        "`@forelse`, `$loop`, `@isset/@empty`, `@auth/@guest`, `@can`, `@error` ni ishlata oladi",
        "Forma uchun `@csrf` va `@method` ni biladi",
        "Shablonlar keshi (`view:cache`, `view:clear`) va `@json` ni biladi"
      ],
      "prerequisites": [
        "2.3",
        "2.5"
      ]
    },
    {
      "id": "2.34",
      "title": "Blade komponentlar, layout va Vite",
      "description": [
        "Zamonaviy Blade layout'i `@extends/@section` emas, **komponentlar** (`<x-layout>`, `<x-button>`) ustiga qurilgan: props, slot'lar, attribute merging va anonim komponentlar. Frontend resurslari **Vite** orqali (`@vite`) ulanadi. Takrorlanuvchi UI'ni komponentga ajratish va to'g'ri asset build — senior darajadagi tartib."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`<x-layouts.app>` layout, `<x-alert type=\"error\">` komponent (props, slot, attribute merging) va `@vite(['resources/css/app.css','resources/js/app.js'])` bilan sahifa yig'ing; deploy'da `npm run build` ni jarayonga qo'shing.",
      "acceptanceCriteria": [
        "Anonim va klass-asoslangan komponent farqini biladi",
        "`@props`, `$slot`, nomli slot, `$attributes->merge()` ni ishlata oladi",
        "`@extends/@section` (eski) va komponent layout farqini biladi",
        "Vite dev server va production build farqini, `public/hot` ni biladi"
      ],
      "prerequisites": [
        "2.33"
      ]
    },
    {
      "id": "2.32",
      "title": "Laravel Session Management va Web Authentication",
      "description": [
        "Laravel'da an'anaviy web-ilovalar holati (state) **Session** va **Web Guard** orqali boshqariladi.",
        "",
        "**Session Drayverlari va Konfiguratsiya (`config/session.php`)**:",
        "- `file`: standart lokal drayver (ko'p serverli yuklamada mos emas).",
        "- `database`: sessiyalarni jadvalda saqlash (foydalanuvchi faolligini kuzatish uchun qulay).",
        "- `redis`: yuqori yuklamali production ilovalar uchun eng tez va tavsiya etiladigan drayver.",
        "- `cookie`: sessiyani shifrlangan cookie ichida saqlash (hajm 4KB bilan cheklangan).",
        "",
        "**Session amallari va Flash Data**:",
        "- `session()->put('key', $value)`, `session()->get('key', $default)`.",
        "- **Flash ma'lumotlar**: faqat bitta keyingi HTTP so'rov uchun yashaydigan ma'lumotlar (`session()->flash('status', 'Saqlandi!')`, `reflash()`, `keep()`) — redirect'lardan keyin xabarlar ko'rsatish asosi.",
        "",
        "**Web Authentication va Guards (`config/auth.php`)**:",
        "- `Auth::attempt($credentials, $remember)`: parolni bcrypt/Argon2 bilan tekshirib, sessiya ID'ni yangilaydi (`session()->regenerate()`).",
        "- `Remember Me`: xavfsiz tasodifiy token (`remember_token`) orqali sessiya muddati tugasa ham foydalanuvchini avtomatik tizimga kiritish.",
        "- **AuthenticateSession Middleware**: xavfsizlik uchun eng muhim vosita — `Auth::logoutOtherDevices($password)` chaqirilganda, foydalanuvchining boshqa barcha kompyuter va telefonlardagi sessiyalarini bekor qiladi.",
        "",
        "```php",
        "// Login va xavfsiz sessiya boshqaruvi",
        "if (Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {",
        "    $request->session()->regenerate(); // session fixation oldini oladi",
        "    return redirect()->intended('/dashboard');",
        "}",
        "",
        "// Boshqa qurilmalardan chiqarish",
        "Auth::logoutOtherDevices($request->input('password'));",
        "```"
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Redis drayverida ishlovchi, flash xabarlar bilan boyitilgan login/logout tizimi yozing; `logoutOtherDevices` orqali boshqa sessiyalarni o'chirishni testlang.",
      "acceptanceCriteria": [
        "Session drayverlari (file, database, redis) farqini va klaster serverlarda nima uchun redis kerakligini tushuntira oladi",
        "Flash data va doimiy sessiya ma'lumotlari farqini biladi",
        "`session()->regenerate()` ning Session Fixation hujumidan himoyadagi rolini tushunadi",
        "`AuthenticateSession` middleware qanday ishlashini biladi"
      ],
      "prerequisites": [
        "2.4",
        "20.2",
        "51.14"
      ]
    },
    {
      "id": "2.37",
      "title": "Migrations va Schema Builder",
      "description": [
        "Migratsiya — DB sxemasini kodda versiyalash: har bir o'zgarish alohida fayl, `up()`/`down()` (yoki faqat `up()`), `migrate`/`rollback` bilan boshqariladi. Senior uchun: **zero-downtime** o'zgarishlar (katta jadvalga ustun qo'shish, indeksni `CONCURRENTLY` yaratish), foreign key, `squash`, va migratsiyani xavfsiz deploy qilish."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "`orders` jadvali uchun migratsiya yozing (foreign key, indeks, enum uchun string), keyin ishlab turgan katta jadvalga NOT NULL ustunni xavfsiz qo'shish rejasini (nullable → backfill → constraint) yozing va `migrate:status`/`--pretend` bilan tekshiring.",
      "acceptanceCriteria": [
        "`Schema::create/table`, ustun turlari, modifikatorlar va indekslarni biladi",
        "`foreignId()->constrained()->cascadeOnDelete()` va `onDelete` farqlarini biladi",
        "Katta jadvalda xavfsiz (qulfsiz) sxema o'zgartirish tartibini biladi",
        "`migrate`, `rollback`, `migrate:fresh`, `--pretend`, `schema:dump` buyruqlarini biladi"
      ],
      "prerequisites": [
        "16.1",
        "2.18"
      ]
    },
    {
      "id": "2.35",
      "title": "Enums Laravel'da (Eloquent cast, Validation, Routing)",
      "description": [
        "PHP 8.1 backed enum Laravel'da hamma qatlamda ishlaydi: Eloquent **cast**, `Rule::enum` validatsiya, route model binding, collection cast va migratsiya. Enum \"magic string\" va \"magic number\"larni yo'qotadi, holatni tip bilan himoya qiladi va biznes mantiqni (`label()`, `canTransitionTo()`) holatning o'ziga yaqin saqlaydi."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`OrderStatus` backed enum yarating (label va `canTransitionTo` bilan), `Order` modelida cast qiling, `Rule::enum` bilan validatsiya qiling, route'da enum parametr ishlating va noto'g'ri o'tishni test bilan ushlang.",
      "acceptanceCriteria": [
        "Backed enum'ni Eloquent'da cast qilishni va `null`/noto'g'ri qiymat xatti-harakatini biladi",
        "`Rule::enum()->only()/except()` bilan validatsiya yozadi",
        "Route'da enum parametr (implicit binding) noto'g'ri qiymatda 404 berishini biladi",
        "Enum ichiga `label()` va holat o'tish qoidalarini joylashtira oladi"
      ],
      "prerequisites": [
        "1.17",
        "13.1",
        "2.12"
      ]
    },
    {
      "id": "2.24",
      "title": "Pagination",
      "description": [
        "Uch xil paginator: `paginate()` (umumiy son bilan, `COUNT(*)` so'rovi), `simplePaginate()` (faqat oldingi/keyingi) va `cursorPaginate()` (cursor asosida, `OFFSET` siz — katta jadvallarda barqaror tez).",
        "",
        "Katta jadvallarda `OFFSET 100000` sekin, chunki DB shuncha qatorni o'qib tashlaydi. API'da cursor pagination, admin panellarda `paginate()` odatiy tanlov. `withQueryString()` filtr parametrlarini saqlaydi.",
        "",
        "```php",
        "$orders = Order::query()",
        "    ->where('status', 'paid')",
        "    ->orderByDesc('id')",
        "    ->cursorPaginate(50);",
        "```"
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "1 mln qatorli jadvalda `paginate` va `cursorPaginate` ni EXPLAIN va vaqt bo'yicha solishtiring.",
      "acceptanceCriteria": [
        "Offset pagination'ning katta sahifalardagi muammosini tushuntira oladi",
        "Cursor pagination uchun unikal tartiblash ustuni kerakligini biladi"
      ],
      "prerequisites": [
        "16.11"
      ]
    },
    {
      "id": "2.25",
      "title": "API Resources",
      "description": [
        "API Resource — model va JSON javob o'rtasidagi transformatsiya qatlami. U ichki DB strukturasini tashqi shartnomadan ajratadi: ustun nomi o'zgarsa ham API o'zgarmaydi. `whenLoaded()` (N+1 siz relation), `when()` (shartli maydon), `mergeWhen()`, `additional()` va `ResourceCollection`.",
        "",
        "Resource ichida so'rov yubormang — relation'larni controller'da eager load qiling. Maxfiy maydonlar (parol hash, ichki flag'lar) hech qachon `toArray()` ga tushmasligi kerak.",
        "",
        "```php",
        "final class OrderResource extends JsonResource",
        "{",
        "    public function toArray(Request $request): array",
        "    {",
        "        return [",
        "            'id'     => $this->id,",
        "            'total'  => $this->total_in_tiyin / 100,",
        "            'status' => $this->status->value,",
        "            'items'  => OrderItemResource::collection($this->whenLoaded('items')),",
        "        ];",
        "    }",
        "}",
        "```"
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Mavjud endpoint'ni `$model->toArray()` dan API Resource'ga o'tkazing va javob shartnomasini test bilan qotiring.",
      "acceptanceCriteria": [
        "`whenLoaded` N+1 ni qanday oldini olishini biladi",
        "Resource'ni API versiyalash bilan bog'lay oladi"
      ],
      "prerequisites": [
        "13.11",
        "18.17"
      ]
    },
    {
      "id": "2.6",
      "title": "Service Container",
      "description": [
        "Service Container — Laravel'ning IoC konteyneri: klass bog'liqliklarini **avtomatik** (reflection orqali) hal qiladi va `bind`/`singleton`/`scoped` bilan interfeysni implementatsiyaga bog'laydi. Hamma narsa (Request, Cache, DB, Facade) shu orqali keladi. Senior uchun: lifecycle (transient/singleton/scoped), contextual binding, tagging, `resolving` hodisalari, Octane'da singleton xavfi va testda `instance()`/`mock`."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "`PaymentGateway` interfeysini `StripeGateway` ga bog'lang (`bind`), konfiguratsiya talab qiladigan klassni `singleton` qiling, `when()->needs()->give()` bilan kontekstli binding yozing, `app()->make` o'rniga constructor injection ishlating va testda mock bilan almashtiring.",
      "acceptanceCriteria": [
        "`bind`, `singleton`, `scoped`, `instance` farqini va lifecycle'ini biladi",
        "Avto-resolution (reflection) va primitive parametr uchun contextual binding'ni biladi",
        "Interfeys → implementatsiya bog'lash va test uchun almashtirishni biladi",
        "Octane/queue worker'da singleton holat sizishi xavfini biladi"
      ],
      "prerequisites": [
        "1.18",
        "2.8"
      ]
    },
    {
      "id": "2.7",
      "title": "Service Providers",
      "description": [
        "Service Provider — ilova va paketlarni \"yuklash\" (bootstrap) joyi: container binding'lari (`register`) va hodisa, route, view, policy kabi sozlamalar (`boot`). Laravel 11+ da `bootstrap/providers.php` provider ro'yxatini saqlaydi; standart bitta `AppServiceProvider`. Senior uchun: `register` vs `boot` qoidasi, deferred provider, paket auto-discovery va provider'ni og'irlashtirmaslik."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "`PaymentServiceProvider` yarating: `register()` da binding, `boot()` da `Gate::policy`/`Route::bind`/morph map; `bootstrap/providers.php` ga qo'shing; `php artisan about` va `provider:list`-ga o'xshash tekshiruv bilan yuklanganini isbotlang.",
      "acceptanceCriteria": [
        "`register()` va `boot()` farqini va nega `register` da boshqa servis ishlatib bo'lmasligini biladi",
        "`bootstrap/providers.php` va `make:provider` ni biladi",
        "Deferred provider va paket auto-discovery'ni biladi",
        "Provider'ga og'ir ish (so'rov, tarmoq) qo'ymaslik qoidasini biladi"
      ],
      "prerequisites": [
        "2.6"
      ]
    },
    {
      "id": "2.8",
      "title": "Dependency Injection",
      "description": [
        "Dependency Injection — klass o'ziga kerakli narsalarni **tashqaridan** oladi (o'zi yaratmaydi). Laravel'da constructor/method injection container orqali avtomatik. Natija: bog'liqlik ko'rinadi, almashtirish va mock qilish oson. Senior uchun: interfeysga bog'lanish, constructor ko'payib ketishi (SRP belgisi), \"service locator\" anti-pattern'i va DI'da qiymat obyektlari."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "`new StripeClient()` ni to'g'ridan-to'g'ri chaqiruvchi servisni DI'ga o'tkazing: interfeys + constructor injection + provider binding; unit test (mock) va constructor 5+ parametrga yetsa nima qilishni ko'rsating.",
      "acceptanceCriteria": [
        "Constructor, method va property injection farqini biladi",
        "DI va Service Locator (`app()`) farqini biladi",
        "Interfeysga bog'lanish orqali testlashni osonlashtira oladi",
        "Katta constructor'ni SRP belgisi sifatida taniydi"
      ],
      "prerequisites": [
        "2.6",
        "4.5"
      ]
    },
    {
      "id": "2.9",
      "title": "Facades",
      "description": [
        "Facade — container'dagi servisga \"statik ko'rinishli\" interfeys (`Cache::get()`, `Log::info()`). Aslida statik emas: `__callStatic` orqali container'dan obyektni olib metodini chaqiradi. Qulay va ixcham, lekin yashirin bog'liqlik hosil qiladi. Senior uchun: facade vs DI tanlovi, `Facade::fake()`/`shouldReceive` bilan test, real-time facade, va \"class creep\" xavfi."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Bitta servisda `Cache::get` ni facade'dan constructor injection (`CacheRepository`) ga o'tkazing, ikkala variantni ham testlang (`Cache::shouldReceive` va mock) va `Storage::fake`/`Mail::fake` qaysi mexanizmga tayanishini tushuntiring.",
      "acceptanceCriteria": [
        "Facade qanday ishlashini (`getFacadeAccessor`, `__callStatic`, container) tushuntira oladi",
        "Facade va DI'ni solishtirib tanlay oladi",
        "`Facade::fake()`, `shouldReceive`, `spy` bilan testlaydi",
        "Real-time facade (`Facades\\...`) ni biladi"
      ],
      "prerequisites": [
        "1.20",
        "2.6"
      ]
    },
    {
      "id": "2.1",
      "title": "Laravel Request Lifecycle",
      "description": [
        "So'rov Laravel'da bitta kirish nuqtasidan (`public/index.php`) o'tadi: autoload → `bootstrap/app.php` (container va sozlama) → HTTP kernel → global middleware → router → route middleware → controller → javob teskari tartibda chiqadi → `terminate`. Hayot sikli xatoni qayerda izlashni (provider, middleware, controller) va nega `register` ichida boshqa servisni ishlatib bo'lmasligini tushuntiradi. Laravel 11+ da skelet yupqa: sozlash `bootstrap/app.php` da."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Bitta so'rovni kuzating: global middleware, route middleware va controller'ga `Log::info` qo'ying, `terminate()` qo'shing va log tartibini (before → controller → after → terminate) chiqaring; `provider.register` ichida `auth()->user()` nega ishlamasligini isbotlang.",
      "acceptanceCriteria": [
        "So'rovning `index.php` dan javobgacha yo'lini ketma-ket aytib bera oladi",
        "`register` va `boot`, global va route middleware, `terminate` o'rnini biladi",
        "Laravel 11+ da `bootstrap/app.php` va `bootstrap/providers.php` rolini biladi",
        "`route:list`, `about`, `optimize` yordamida muhitni tekshira oladi"
      ],
      "prerequisites": [
        "2.6",
        "2.7"
      ]
    },
    {
      "id": "2.14",
      "title": "Authorization",
      "description": [
        "Authorization — \"kim nima qila oladi\" (autentifikatsiya, ya'ni \"kim ekan\", dan alohida). Laravel'da uch qatlam: **Gate** (umumiy qoida), **Policy** (model uchun, 2.15) va **middleware/route** darajasidagi tekshiruv. Rol/ruxsat modeli (RBAC) uchun odatda `spatie/laravel-permission` yoki o'z `abilities` jadvali; token ruxsatlari uchun Sanctum abilities."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Oddiy RBAC dizayn qiling: `roles`, `permissions` jadvallari, `Gate::before` bilan superadmin, `can:` middleware, API tokenlarda abilities (`tokenCan`); IDOR'ni test bilan ushlang (A foydalanuvchi B resursiga kira olmasligi).",
      "acceptanceCriteria": [
        "Authentication va Authorization farqini hamda 401 vs 403 ni biladi",
        "Gate/Policy/middleware qaysi holatda ishlatilishini ajrata oladi",
        "IDOR (Insecure Direct Object Reference) xavfini va unga qarshi chorani biladi",
        "Rol-asosli va ruxsat-asosli modelni solishtira oladi"
      ],
      "prerequisites": [
        "2.15",
        "20.1"
      ]
    },
    {
      "id": "2.15",
      "title": "Policies va Gates",
      "description": [
        "Gate — closure ko'rinishidagi umumiy ruxsat qoidasi; Policy — bitta model uchun ruxsatlar klassi (`view`, `create`, `update`, `delete`, `restore`, `forceDelete`). Laravel 11+ da `Post` → `PostPolicy` **avtomatik topiladi** (ro'yxatga olish shart emas). Tekshirish joylari: `Gate::allows`, `$user->can`, `@can`, `->middleware('can:update,post')`, Form Request `authorize()`. Senior uchun: `before()`, `Response::deny()`, guest foydalanuvchi, va \"yashirin\" 404."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "`PostPolicy` yozing (`update` faqat egasi yoki admin; `before()` da superadmin), `Response::denyAsNotFound()` bilan boshqa tenant resursini yashiring, route'da `can:` middleware, Blade'da `@can` ishlating va policy'ni unit test bilan qoplang.",
      "acceptanceCriteria": [
        "Gate va Policy farqini hamda auto-discovery'ni biladi",
        "`before/after`, `Response::allow/deny/denyAsNotFound` ni biladi",
        "Guest uchun `?User $user` va 403 vs 404 qarorini asoslay oladi",
        "Policy'ni controller, middleware, Blade va Form Request'dan ishlata oladi"
      ],
      "prerequisites": [
        "2.14"
      ]
    },
    {
      "id": "2.16",
      "title": "Error Handling va Exception Reporting",
      "description": [
        "Laravel 11+ da xatolar `bootstrap/app.php` dagi `->withExceptions(function (Exceptions $exceptions) { ... })` da boshqariladi (eski `Handler.php` yo'q). Ikki vazifa: **report** (log/Sentry'ga yuborish) va **render** (foydalanuvchiga javob). Senior uchun: nimani report qilmaslik (`dontReport`), `throttle`, kontekst qo'shish, maxsus exception klasslari va API'da yagona xato formati."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "`DomainException` hosilalari uchun `report` (Sentry + kontekst) va `render` (JSON `{code, message}` + to'g'ri status) ni `withExceptions` da sozlang, `ModelNotFoundException` ni 404 JSON'ga o'giring, `dontReport` bilan shovqinni kamaytiring va testda tekshiring.",
      "acceptanceCriteria": [
        "`withExceptions`, `report()`, `render()`, `dontReport()`, `throttle()` ni biladi",
        "Maxsus exception'ga `report`/`render` metodi qo'sha oladi",
        "API xatolarini yagona formatga keltira oladi (`shouldRenderJsonWhen`)",
        "Production'da xato tafsilotini oshkor qilmaslik qoidasini biladi"
      ],
      "prerequisites": [
        "1.15"
      ]
    },
    {
      "id": "2.17",
      "title": "Laravel Logging",
      "description": [
        "Laravel logging Monolog ustida **kanallar** (`single`, `daily`, `stack`, `slack`, `stderr`, `syslog`, `papertrail`) tizimi. Production'da konteynerda `stderr` + JSON, `daily` + saqlash muddati, `stack` bilan bir nechta kanalga. Senior uchun: kontekst (`Log::withContext`), korrelyatsiya ID, sirlarni loglamaslik, log darajalari va `Log::build` bilan dinamik kanal."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`stack` (daily + stderr JSON) sozlang, `Log::withContext(['request_id' => ...])` ni middleware'da qo'ying, xato logiga PII/parol tushmasligini tekshiring (`$dontFlash`, maskalash) va `Log::channel('billing')` alohida kanal yarating.",
      "acceptanceCriteria": [
        "Kanal, `stack`, `daily` (`days`) va `LOG_CHANNEL` ni biladi",
        "Log darajalarini (debug…emergency) to'g'ri tanlaydi",
        "`withContext`/`shareContext` bilan so'rov korrelyatsiyasini qo'sha oladi",
        "Sirlar/PII loglanmasligi qoidasini biladi"
      ],
      "prerequisites": [
        "8.2",
        "logging-and-monitoring"
      ]
    },
    {
      "id": "2.38",
      "title": "Cache API: remember, tags, atomic lock",
      "description": [
        "Laravel Cache yagona API ustida turli driverlar (redis, memcached, database, file, array) bilan ishlaydi. Asosiy vositalar: `Cache::remember`, `rememberForever`, `Cache::flexible` (stale-while-revalidate), teglar, `Cache::lock` (atomik qulf) va `increment`. Strategiyalar (invalidatsiya, stampede) 54.x darsida; bu yerda Laravel API'si."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "Og'ir hisobot so'rovini `Cache::remember` bilan keshlang, yozilganda kalitni `Cache::forget` bilan tozalang, `Cache::lock` bilan bir vaqtda ikki marta hisoblashni oldini oling va `Cache::fake`siz, `array` driver bilan test yozing.",
      "acceptanceCriteria": [
        "`get/put/remember/forget/pull/add/increment` ni biladi",
        "Teglar qaysi driverlarda ishlashini va `flush` xavfini biladi",
        "`Cache::lock` bilan stampede va race condition'ni oldini oladi",
        "`Cache::flexible` nima qilishini biladi"
      ],
      "prerequisites": [
        "2.10",
        "54.1"
      ]
    },
    {
      "id": "2.20",
      "title": "Events va Listeners",
      "description": [
        "Events/Listeners — \"nimadir sodir bo'ldi\" (`OrderPlaced`) hodisasi va unga javob beradigan tinglovchilar. Bog'liqlikni kamaytiradi: buyurtma kodi email, analitika, inventory'ni bilmaydi. Laravel 11+ da listener'lar `handle(Event $e)` type-hint bo'yicha **avtomatik topiladi**. Senior uchun: queued listener, `afterCommit`, `ShouldDispatchAfterCommit`, model events/Observer, `Event::fake` va \"event orqali mantiq yashirinishi\" xavfi."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`OrderPlaced` event va 2 ta listener (`SendReceipt` queued, `ReserveStock` sinxron) yozing; `ShouldDispatchAfterCommit` bilan tranzaksiya tugagach ishlating; `Event::fake([OrderPlaced::class])` bilan test qiling va listener xatosi buyurtmani buzmasligini (queue) isbotlang.",
      "acceptanceCriteria": [
        "Event, Listener, Subscriber va Observer farqini biladi",
        "Listener auto-discovery va `ShouldQueue`, `afterCommit` ni biladi",
        "`Event::fake`, `assertDispatched`, `assertListening` bilan testlay oladi",
        "Sinxron va queued listener xatti-harakatini (xato, transaction) farqlay oladi"
      ],
      "prerequisites": [
        "2.6",
        "46.3"
      ]
    },
    {
      "id": "2.21",
      "title": "Notifications (mail, database, broadcast, Slack, SMS)",
      "description": [
        "Notification — bitta xabarni **bir nechta kanal** (mail, database, broadcast, Slack, SMS) orqali yuborish mexanizmi. `via()` kanallarni tanlaydi, `toMail()`/`toArray()` har kanal uchun ko'rinishni beradi. Email shablon va biriktirma mexanikasi 2.36 darsida. Senior uchun: queue, `afterCommit`, foydalanuvchi sozlamasiga qarab kanal tanlash, `NotificationFailed` hodisasi va testlash."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`InvoicePaid` notification yozing: `via()` foydalanuvchi sozlamasiga qarab `mail` va `database` ni tanlasin, `ShouldQueue` + `afterCommit`, `Notification::fake()` bilan test, o'qilmaganlarni `unreadNotifications` bilan chiqaring.",
      "acceptanceCriteria": [
        "Notification va Mailable farqini (kanal vs xat) tushuntira oladi",
        "`via()`, `toMail()`, `toArray()` va `Notifiable` ni biladi",
        "`ShouldQueue`, `afterCommit`, `shouldSend()` ni biladi",
        "`Notification::fake()` va `assertSentTo` bilan testlay oladi"
      ],
      "prerequisites": [
        "2.20",
        "2.36"
      ]
    },
    {
      "id": "2.36",
      "title": "Laravel Mail: Mailable, Attachment va Blade/Markdown shablonlar",
      "description": [
        "Email yuborish Laravel'da `Mailable` klassi orqali: konvert (`envelope`), kontent (`content`: Blade yoki Markdown) va biriktirmalar (`attachments`) alohida metodlarda. Senior uchun muhim: queue orqali yuborish, tranzaksiyadan keyin (`afterCommit`), `Mail::fake()` bilan testlash, staging'da \"adashgan\" xatlarni oldini olish va katta fayllarni to'g'ri biriktirish."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`InvoicePaid` mailable yozing: Markdown shablon, Storage'dagi PDF'ni `Attachment::fromStorageDisk` bilan biriktirish, `ShouldQueue` va `afterCommit`; `Mail::fake()` bilan yuborilganini va biriktirma nomini tekshiring; staging'da `Mail::alwaysTo` qo'llang.",
      "acceptanceCriteria": [
        "Mailable'ning `envelope`/`content`/`attachments` metodlarini to'g'ri ishlatadi",
        "`Attachment::fromPath/fromStorage/fromData` farqini va `as()`/`withMime()` ni biladi",
        "Blade va Markdown shablon farqini, komponentlarni (`x-mail::message`) biladi",
        "Queue + `afterCommit` + `Mail::fake()` testlashni biladi"
      ],
      "prerequisites": [
        "2.8",
        "2.22",
        "2.18",
        "46.1"
      ]
    },
    {
      "id": "2.22",
      "title": "Filesystem va Storage",
      "description": [
        "Storage — fayl tizimi abstraksiyasi (Flysystem): `local`, `public`, `s3` (va S3-mos), `sftp`, `ftp`. Bir xil API (`put`, `get`, `delete`, `url`, `temporaryUrl`, `download`) turli disklarda. Senior uchun: `public` va `local` disk farqi, `storage:link`, **imzolangan (temporary) URL**, katta fayl yuklash (stream, presigned upload), fayl turini tekshirish va xavfsizlik."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Foydalanuvchi hujjatlari uchun private `s3` diskdan foydalaning: `putFile` bilan yuklash (UUID nomi), `temporaryUrl` bilan 10 daqiqalik yuklab olish havolasi, `Storage::fake('s3')` bilan test va fayl turi/hajmi validatsiyasi.",
      "acceptanceCriteria": [
        "`local`, `public`, `s3` disklarining farqini va `storage:link` ni biladi",
        "`put/putFile/putFileAs`, `get`, `exists`, `delete`, `download`, `temporaryUrl` ni ishlata oladi",
        "Yuklangan fayllarni xavfsiz saqlash (nom, tur, joy) qoidalarini biladi",
        "`Storage::fake` bilan testlay oladi"
      ],
      "prerequisites": [
        "51.12"
      ]
    },
    {
      "id": "2.23",
      "title": "Localization",
      "description": [
        "Tarjimalar `lang/{locale}/*.php` (kalit asosida) yoki `lang/{locale}.json` (matn asosida) fayllarida. `__('messages.welcome', ['name' => $n])`, `trans_choice()` (ko'plik), `App::setLocale()`, validatsiya xabarlari tarjimasi.",
        "",
        "Locale'ni URL prefiks, foydalanuvchi sozlamasi yoki `Accept-Language` dan aniqlash odatda middleware'da bajariladi. Sana/raqam formatlash uchun Carbon locale va PHP `intl` (`NumberFormatter`). Model ma'lumotlarini tarjima qilish uchun `spatie/laravel-translatable`.",
        "",
        "```php",
        "// lang/uz/orders.php",
        "return ['created' => ':count ta buyurtma yaratildi'];",
        "__('orders.created', ['count' => 3]);",
        "```"
      ],
      "priority": "optional",
      "level": "Junior",
      "practicalTask": "Ilovaga uz/ru/en tillarini qo'shing: middleware, tarjima fayllari va til almashtirgich.",
      "acceptanceCriteria": [
        "Kalit va JSON tarjima farqini biladi",
        "Queue job'larda locale saqlanishini (`HasLocalePreference`) tushunadi"
      ],
      "prerequisites": [
        "2.4"
      ]
    },
    {
      "id": "2.19",
      "title": "Task Scheduling",
      "description": [
        "Laravel Scheduler serverda **bitta** cron yozuvi bilan ishlaydi: har daqiqa `schedule:run` chaqiriladi va u qaysi vazifa shu daqiqada ishga tushishi kerakligini o'zi hal qiladi. Jadval kod ichida (`routes/console.php`) yoziladi, shuning uchun git'da versiyalanadi, review qilinadi va testlanadi. Senior uchun muhim jihatlar: bir nechta server (`onOneServer`), overlap'ni oldini olish, DST/timezone tuzoqlari, deploy'dan keyingi `schedule:interrupt` va monitoring."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "`reports:daily` buyrug'ini har kuni 02:00 da, `Heartbeat` job'ini har 5 daqiqada ishga tushiring; ikkita serverda faqat bittasida ishlashini (`onOneServer`) va overlap bo'lmasligini isbotlang, natijani healthcheck URL'ga yuboring.",
      "acceptanceCriteria": [
        "Nega serverda faqat bitta cron yozuvi kerakligini va `schedule:run` nima qilishini tushuntira oladi",
        "`withoutOverlapping` va `onOneServer` farqini hamda ularga kerak cache driver talablarini biladi",
        "`schedule:list`, `schedule:work`, `schedule:interrupt`, `schedule:clear-cache` buyruqlarini qachon ishlatishni biladi",
        "DST va timezone tufayli vazifa ikki marta yoki umuman ishlamay qolish xavfini biladi"
      ],
      "prerequisites": [
        "2.18",
        "2.10",
        "46.1"
      ]
    },
    {
      "id": "2.30",
      "title": "Laravel HTTP Client (Http Facade)",
      "description": [
        "Laravel HTTP Client (`Illuminate\\Support\\Facades\\Http`) — Guzzle ustiga qurilgan, o'ta ifodali va testlash oson bo'lgan HTTP mijozi. Tashqi to'lov tizimlari (Payme, Click, Stripe) va uchinchi tomon API'lari bilan ishlashning asosiy vositasi.",
        "",
        "**Asosiy imkoniyatlar**:",
        "- **Timeout va Retry**: `Http::timeout(5)->retry(3, 100, throw: false)` — tarmoqdagi qisqa uzilishlarda avtomatik qayta urinish.",
        "- **Xatolarni tutish**: `Http::throw()` (4xx/5xx javobda avtomatik `RequestException` otadi).",
        "- **Parallel so'rovlar (`Http::pool`)**: bir vaqtning o'zida bir nechta mustaqil tashqi API'ga asinxron so'rov yuborib, kutish vaqtini 2-3 barobarga qisqartiradi.",
        "- **Testlash**: `Http::fake([...])` orqali tashqi tarmoqqa chiqmasdan aniq mock javoblarni qaytarish va so'rov yuborilganini `Http::assertSent()` bilan tasdiqlash.",
        "",
        "```php",
        "// Parallel so'rovlar (Pool)",
        "$responses = Http::pool(fn (Pool $pool) => [",
        "    $pool->as('currency')->timeout(3)->get('https://cbu.uz/oz/arkhiv-kursov-valyut/json/'),",
        "    $pool->as('weather')->timeout(3)->get('https://api.weather.com/v1/tashkent'),",
        "]);",
        "$rate = $responses['currency']->json()[0]['Rate'];",
        "",
        "// Testda mock qilish",
        "Http::fake(['cbu.uz/*' => Http::response([['Rate' => '12800']], 200)]);",
        "```"
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Tashqi to'lov API client'ini yozing: retry, timeout, custom header'lar bilan boyiting va uni `Http::fake()` yordamida to'liq Feature test bilan qoplang.",
      "acceptanceCriteria": [
        "Nima uchun tashqi so'rovlarda `timeout()` va `retry()` shart ekanini biladi",
        "`Http::pool()` orqali parallel asinxron so'rovlar yuborishni biladi",
        "Feature testlarda `Http::fake()` bilan tashqi API'larni mock qila oladi"
      ],
      "prerequisites": [
        "2.9",
        "18.1"
      ]
    },
    {
      "id": "2.29",
      "title": "Broadcasting, WebSockets va Laravel Reverb",
      "description": [
        "WebSockets an'anaviy HTTP polling o'rniga ikki tomonlama doimiy aloqa (full-duplex) yaratadi. Laravel'da hodisalarni real-time tarqatish uchun event'ga `ShouldBroadcast` yoki `ShouldBroadcastNow` interfeysi qo'shiladi.",
        "",
        "**Kanallar turlari**:",
        "- `Channel`: hamma uchun ochiq ommaviy kanal (masalan, yangiliklar tasmasi).",
        "- `PrivateChannel`: faqat avtorizatsiyadan o'tgan foydalanuvchilar (`routes/channels.php` da huquq tekshiriladi).",
        "- `PresenceChannel`: xonada hozir kimlar borligini ko'rsatish va \"foydalanuvchi yozmoqda...\" kabi holatlarni uzatish.",
        "",
        "**Laravel Reverb**: Laravel 11 da chiqarilgan, PHP asosidagi juda tez, birinchi partiyaviy WebSocket server. Pusher yoki Soketi kabi tashqi xizmatlarsiz, millionlab ulanishlarni o'z serveringizda bepul boshqarish imkonini beradi. Frontendda esa `laravel-echo` va `pusher-js` orqali tinglanadi.",
        "",
        "```php",
        "// Event e'loni",
        "final class OrderStatusUpdated implements ShouldBroadcast",
        "{",
        "    use Dispatchable, InteractsWithSockets, SerializesModels;",
        "    public function __construct(public Order $order) {}",
        "    public function broadcastOn(): array",
        "    {",
        "        return [new PrivateChannel(\"orders.{$this->order->user_id}\")];",
        "    }",
        "}",
        "",
        "// routes/channels.php da avtorizatsiya",
        "Broadcast::channel('orders.{userId}', function (User $user, int $userId): bool {",
        "    return (int) $user->id === $userId;",
        "});",
        "```"
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Laravel Reverb orqali buyurtma holati o'zgarganda faqat buyurtma egasining brauzeriga real-time xabar yuboruvchi Private Channel yozing va testlang.",
      "acceptanceCriteria": [
        "Public, Private va Presence channel farqlarini hamda `routes/channels.php` dagi avtorizatsiyani tushuntira oladi",
        "`ShouldBroadcast` (queue orqali) va `ShouldBroadcastNow` ning navbatga bog'liqligini biladi",
        "Laravel Reverb serverini ishga tushirish va Echo bilan ulash amaliyotiga ega"
      ],
      "prerequisites": [
        "2.20",
        "46.3"
      ]
    },
    {
      "id": "2.31",
      "title": "Concurrency va Application Context (Laravel 11+)",
      "description": [
        "Zamonaviy yuqori yuklamali ilovalarda bitta so'rov ichida parallel hisoblash va taqsimlangan log yuritish zarurati paydo bo'ladi.",
        "",
        "**Concurrency (`Illuminate\\Support\\Facades\\Concurrency`)**:",
        "Laravel 11 da kiritilgan imkoniyat bo'lib, bitta HTTP so'rov yoki artisan buyruq ichida bir nechta vazifani parallel fonda bajaradi (`Concurrency::run([fn() => ..., fn() => ...])`). Fork (CLI) yoki Process drayverlari orqali bir necha mustaqil hisob-kitobni bir vaqtda bajarib, umumiy javob vaqtini minimallashtiradi.",
        "",
        "**Application Context (`Illuminate\\Support\\Facades\\Context`)**:",
        "So'rov boshlanganda yozilgan metadata ma'lumotlarini (masalan, `trace_id`, `user_id`, `tenant_id`) butun so'rov hayotiy siklida saqlaydi va eng muhimi — ularni **navbatdagi Job'larga avtomatik o'tkazadi** hamda barcha loglarga biriktiradi. Bu tarqoq xatolarni (distributed tracing) qidirishda bebahodir.",
        "",
        "```php",
        "// Context o'rnatish (masalan, middleware'da)",
        "Context::add('trace_id', (string) Str::uuid());",
        "Log::info('Buyurtma yaratilmoqda'); // log faylda trace_id avtomatik chiqadi",
        "",
        "// Concurrency — parallel hisoblash",
        "[$ordersCount, $totalRevenue] = Concurrency::run([",
        "    fn () => Order::where('status', 'paid')->count(),",
        "    fn () => Order::where('status', 'paid')->sum('total'),",
        "]);",
        "```"
      ],
      "priority": "important",
      "level": "Senior",
      "practicalTask": "Dashboard sahifasidagi 2 ta og'ir mustaqil statistikani `Concurrency::run()` bilan parallel hisoblang va kiruvchi `X-Trace-Id` ni `Context` orqali barcha loglarga ulab chiqing.",
      "acceptanceCriteria": [
        "Concurrency qachon Queue o'rnini bosa olmasligini (faqat bitta request doirasida ishlashini) tushuntira oladi",
        "`Context` ma'lumotlari qanday qilib Queue joblariga avtomatik o'tishini biladi",
        "Loglarda `trace_id` orqali tarqoq nosozliklarni tezkor qidirish mexanizmini tushunadi"
      ],
      "prerequisites": [
        "2.1",
        "2.17",
        "46.1"
      ]
    },
    {
      "id": "2.41",
      "title": "Deployment va Optimizatsiya (optimize, Octane, queue reload)",
      "description": [
        "Laravel'ni production'ga chiqarish: `composer install --no-dev`, `php artisan optimize` (config/route/view/event kesh), migratsiya, queue worker'larni qayta ishga tushirish (`reload`/`queue:restart`), `schedule:interrupt`, maintenance rejimi va zero-downtime deploy. Senior uchun: kesh bilan `env()` tuzog'i, OPcache, Octane va deploy tartibi."
      ],
      "priority": "important",
      "level": "Senior",
      "practicalTask": "Zero-downtime deploy skriptini yozing: `composer install --no-dev --optimize-autoloader`, `npm run build`, `migrate --force`, `optimize`, `queue:restart`, `schedule:interrupt`, health-check va rollback rejasi.",
      "acceptanceCriteria": [
        "`optimize` nimani keshlashini va `env()` tuzog'ini biladi",
        "Deploy tartibini (build → migrate → switch → restart) to'g'ri qura oladi",
        "Queue worker, schedule va Octane'ni deploy'dan keyin qayta ishga tushirishni biladi",
        "Maintenance rejimi va health endpoint'ni biladi"
      ],
      "prerequisites": [
        "2.10",
        "2.19",
        "2.37",
        "52.1"
      ]
    },
    {
      "id": "2.26",
      "title": "Laravel Package Development",
      "description": [
        "Paket — qayta ishlatiladigan funksionallik: o'z `composer.json`, PSR-4 autoload, service provider (`extra.laravel.providers` orqali auto-discovery), config (`mergeConfigFrom`, `publishes`), migratsiya, route, view va command'lar.",
        "",
        "Sifatli paket: semver, aniq Laravel/PHP versiya cheklovlari, Orchestra Testbench bilan testlar, CI matrix, CHANGELOG. `spatie/laravel-package-tools` boilerplate'ni qisqartiradi. Ichki (private) paketlar uchun Satis/Private Packagist yoki VCS repository.",
        "",
        "```json",
        "\"extra\": {",
        "    \"laravel\": { \"providers\": [\"Acme\\\\Payme\\\\PaymeServiceProvider\"] }",
        "}",
        "```"
      ],
      "priority": "optional",
      "level": "Senior",
      "practicalTask": "Kichik to'lov integratsiyasini alohida paketga ajrating, Testbench testlari va publish qilinadigan config bilan.",
      "acceptanceCriteria": [
        "Auto-discovery va publishable resurslar mexanizmini biladi",
        "Paketni Testbench bilan izolyatsiyada testlay oladi"
      ],
      "prerequisites": [
        "2.7",
        "composer"
      ]
    },
    {
      "id": "2.27",
      "title": "Framework Internals va Service Resolution",
      "description": [
        "`make()` chaqirilganda container: alias'larni hal qiladi → kontekstual binding'ni tekshiradi → binding bo'lsa closure'ni chaqiradi, bo'lmasa Reflection bilan constructor parametrlarini rekursiv resolve qiladi → `resolving`/`afterResolving` callback'larini ishga tushiradi → singleton bo'lsa `instances` ga saqlaydi.",
        "",
        "Bu bilim aylanma bog'liqliklarni (circular dependency), \"Target is not instantiable\" xatolarini va Octane'dagi holat oqishini tushunish uchun kerak. Laravel manba kodini o'qish (`Illuminate\\Container\\Container`) — eng yaxshi o'qituvchi.",
        "",
        "```php",
        "$this->app->afterResolving(Mailer::class, function (Mailer $m) {",
        "    $m->alwaysReplyTo('support@example.uz');",
        "});",
        "```"
      ],
      "priority": "optional",
      "level": "Senior",
      "practicalTask": "`Container::make()` ning soddalashtirilgan nusxasini yozing: binding, singleton va autowiring bilan.",
      "acceptanceCriteria": [
        "\"Target [X] is not instantiable\" xatosining sababini aniqlay oladi",
        "Resolving callback'lar qachon chaqirilishini biladi"
      ],
      "prerequisites": [
        "2.6",
        "1.18"
      ]
    },
    {
      "id": "2.28",
      "title": "Laravel Version Upgrades",
      "description": [
        "Laravel har yili major versiya chiqaradi; har birining bug-fix va security support muddati bor. Upgrade jarayoni: rasmiy upgrade guide → `composer.json` cheklovlarini yangilash → paketlar mosligini tekshirish (`composer why-not laravel/framework 12.0`) → Laravel Shift yoki Rector → test to'plami → staging.",
        "",
        "Yaxshi amaliyot: bir versiyadan sakramaslik, deprecation'larni oldindan tuzatish, upgrade'ni alohida PR'da funksional o'zgarishlarsiz qilish, kuchli test qamrovi. Eskirgan versiyada qolish — xavfsizlik va texnik qarz xavfi.",
        "",
        "```bash",
        "composer why-not laravel/framework \"^12.0\"",
        "composer require laravel/framework:^12.0 -W",
        "php artisan test",
        "```"
      ],
      "priority": "important",
      "level": "Senior",
      "practicalTask": "Loyihani keyingi Laravel versiyasiga upgrade qilish rejasini (risklar, paketlar, testlar) tuzing.",
      "acceptanceCriteria": [
        "Laravel support siyosatini biladi",
        "Upgrade'ni funksional o'zgarishlardan ajratish zarurligini tushunadi"
      ],
      "prerequisites": [
        "7.16",
        "1.26"
      ]
    }
  ]
});
