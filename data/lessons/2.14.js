/* Chuqur dars: 2.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.14", {
  "lesson": [
    "### 401 vs 403",
    "- **401 Unauthenticated** — kim ekanligi noma'lum (login kerak).",
    "- **403 Forbidden** — kim ekani ma'lum, lekin ruxsat yo'q. Resurs mavjudligini yashirish kerak bo'lsa **404** (2.15 `denyAsNotFound`).",
    "",
    "### Qatlamlar",
    "1. **Route middleware**: `auth`, `can:update,post`, `role:admin` (paket) — qo'pol, tez filtr.",
    "2. **Policy/Gate** (2.15): model darajasida aniq qoida; controller'da `Gate::authorize()`.",
    "3. **Query cheklovi**: ro'yxatda `->whereBelongsTo($user)` yoki global scope (multi-tenant `tenant_id`): ruxsatsiz ma'lumot umuman o'qilmasin.",
    "4. **Frontend** (`@can`) — faqat UX, xavfsizlik emas.",
    "",
    "### IDOR",
    "`/orders/123` ni `/orders/124` ga almashtirib begona buyurtmani ochish. Himoya: (a) policy/ownership tekshiruvi, (b) scoped binding (2.3), (c) query'ga `where('user_id', auth()->id())`. Ketma-ket id o'rniga UUID/ULID xavfsizlik emas, qo'shimcha qatlam xolos.",
    "",
    "### Rol va ruxsat",
    "- **Rol** (admin, editor) — oddiy, lekin qotib qoladi (\"editor lekin faqat o'z bo'limida\").",
    "- **Ruxsat** (permissions: `posts.update`) rollarga bog'lanadi; kodda **ruxsatni** tekshiring, rolni emas (`can('posts.update')`, `hasRole` emas).",
    "- `Gate::before(fn ($user) => $user->isSuperAdmin() ? true : null)` — superadmin.",
    "- Paket: `spatie/laravel-permission` (rol/ruxsat, kesh bilan, `@role`, middleware). Ruxsat keshi o'zgarganda `forgetCachedPermissions()`.",
    "",
    "### API tokenlar (Sanctum)",
    "`$user->createToken('mobile', ['orders:read'])`, tekshirish: `$request->user()->tokenCan('orders:read')`, middleware `abilities:orders:read`. Token abilities foydalanuvchi ruxsatidan **tor** bo'lishi kerak, kengaymaydi. Token muddati (`expiration`) va bekor qilish (`tokens()->delete()`).",
    "",
    "### Qoidalar",
    "1. Standart — taqiq; ruxsat aniq beriladi.",
    "2. Har bir yozuvchi endpoint (store/update/delete) policy bilan, har bir ro'yxat esa query cheklovi bilan.",
    "3. Ruxsat o'zgarishini audit qiling (kim kimga qaysi rolni berdi).",
    "4. Avtorizatsiya testlari: ega / begona / admin / guest."
  ],
  "examples": [
    {
      "title": "Ro'yxat query bilan, element policy bilan",
      "lang": "php",
      "note": "IDOR'ga qarshi",
      "code": [
        "// Ro'yxat: faqat o'zining buyurtmalari (policy har qatorni tekshirmaydi)",
        "public function index(Request $request)",
        "{",
        "    return OrderResource::collection(",
        "        Order::whereBelongsTo($request->user())->latest()->paginate(20)",
        "    );",
        "}",
        "",
        "// Bitta element: policy",
        "public function show(Order $order)",
        "{",
        "    Gate::authorize('view', $order);",
        "    return new OrderResource($order);",
        "}",
        "",
        "// OrderPolicy::view",
        "public function view(User $user, Order $order): bool",
        "{",
        "    return $user->id === $order->user_id || $user->can('orders.view-any');",
        "}"
      ]
    },
    {
      "title": "IDOR testi va Sanctum abilities",
      "lang": "php",
      "note": "Begona resurs va token ruxsati",
      "code": [
        "public function test_user_cannot_view_foreign_order(): void",
        "{",
        "    $order = Order::factory()->create();   // boshqa foydalanuvchiniki",
        "",
        "    $this->actingAs(User::factory()->create())",
        "        ->getJson(\"/api/orders/{$order->id}\")",
        "        ->assertForbidden();",
        "}",
        "",
        "public function test_token_without_ability_is_denied(): void",
        "{",
        "    Sanctum::actingAs(User::factory()->create(), ['orders:read']);",
        "",
        "    $this->postJson('/api/orders', [])->assertForbidden();   // 'orders:write' yo'q",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Faqat `@can` bilan tugmani yashirish va server tomonida tekshirmaslik: to'g'ridan-to'g'ri so'rov o'tib ketadi.",
    "Ro'yxatda hamma yozuvni olib keyin policy bilan filtrlash: sekin va noto'g'ri sahifalanadi; query darajasida cheklang.",
    "Kodda `hasRole('admin')` ga tayanish: rol o'zgarsa hamma joy buziladi; ruxsatni (`can`) tekshiring.",
    "UUID'ni \"xavfsizlik\" deb ownership tekshirmaslik: id oshkor bo'lsa begona resurs ochiladi.",
    "Sanctum token'ga `['*']` ruxsat berish: butun akkaunt kaliti; minimal abilities.",
    "Ruxsat keshini (spatie) yangilamaslik: rol o'zgargach eski ruxsat amal qiladi."
  ]
});
