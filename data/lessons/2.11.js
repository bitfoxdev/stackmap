/* Chuqur dars: 2.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.11", {
  "lesson": [
    "### Kiruvchi ma'lumot",
    "- `$request->input('a.b', default)` — query, form va JSON tanasidan; `query('a')` — faqat query string; `post('a')` — faqat tana; `json('a')` — JSON tanasi.",
    "- `all()`, `only([...])`, `except([...])`, `collect('items')`, `string('name')`, `integer('page', 1)`, `boolean('flag')`, `date('d')`, `enum('s', Status::class)`.",
    "- `has('a')` (kalit bor), `filled('a')` (bor va bo'sh emas), `missing`, `whenHas`, `whenFilled`.",
    "- Fayl: `file('doc')`, `hasFile`, `allFiles`; `store`, `getClientOriginalName` (ishonchsiz), `getSize`.",
    "- **Ishonchsiz**: hamma kirish — hujum vektori. `all()` ni model'ga bermang (mass assignment); `validated()` (2.12).",
    "",
    "### So'rov haqida",
    "`method()`, `isMethod('post')`, `path()`, `is('admin/*')`, `url()`, `fullUrl()`, `ip()`, `header('X-Id')`, `bearerToken()`, `userAgent()`, `user()`, `expectsJson()` (JSON kutadi), `wantsJson()`, `isJson()`, `acceptsJson()`, `secure()`. Content negotiation: API klientlari `Accept: application/json` yuborishi shart (validatsiya 422 vs redirect, 2.12).",
    "",
    "### Javoblar",
    "- `return 'matn'` / massiv / model → avtomatik (massiv/Eloquent → JSON). Aniq: `response()->json($data, 201, ['Location' => $url])`.",
    "- `view('a', $data)`, `response()->view(...)`.",
    "- `redirect('/x')`, `to_route('name')`, `back()`, `redirect()->away($url)` (tashqi), `->with('status', '...')` (flash), `->withInput()`, `->withErrors()`.",
    "- `response()->noContent()` (204), `abort(404)`, `abort_if`, `abort_unless`.",
    "- Fayl: `download($path, 'name')`, `file($path)` (brauzerda), `Storage::download`.",
    "- **Stream**: `response()->stream(fn () => ..., 200, $headers)`, `streamDownload(fn () => ..., 'a.csv')` — katta ma'lumotni xotiraga yuklamay yuborish.",
    "- Cookie: `->cookie('name', 'v', $minutes)` (Laravel shifrlaydi), `Cookie::queue`; `withoutCookie`.",
    "- Sarlavha: `->header('X', 'y')`, `->withHeaders([...])`. Cache sarlavhalari: `cache.headers` middleware.",
    "",
    "### Proksi va IP",
    "Load balancer/Nginx ortida `ip()` va `secure()` to'g'ri ishlashi uchun `trustProxies(at: '*')` yoki aniq IP (`bootstrap/app.php`, 2.4). Aks holda barcha so'rovlar balancer IP'sidan ko'rinadi (rate limit buziladi) va `https` aniqlanmaydi.",
    "",
    "### Qoidalar",
    "1. Kirishni validatsiya qiling, so'ng `validated()` ni ishlating.",
    "2. API'ga to'g'ri status kod (201, 204, 422, 404...).",
    "3. Katta fayl/ro'yxat — stream; massivni xotirada yig'ib yubormang.",
    "4. Tashqi redirect'da manzilni ro'yxat bilan tekshiring (open redirect)."
  ],
  "examples": [
    {
      "title": "JSON va stream",
      "lang": "php",
      "note": "201, Location, CSV eksport",
      "code": [
        "public function store(StorePostRequest $request, CreatePost $create)",
        "{",
        "    $post = $create->handle($request->user(), $request->validated());",
        "",
        "    return response()->json(new PostResource($post), 201, ['Location' => route('posts.show', $post)]);",
        "}",
        "",
        "public function export(): StreamedResponse",
        "{",
        "    return response()->streamDownload(function () {",
        "        $out = fopen('php://output', 'w');",
        "        fputcsv($out, ['id', 'email']);",
        "        User::query()->select('id', 'email')->lazyById(1000)->each(fn ($u) => fputcsv($out, [$u->id, $u->email]));",
        "        fclose($out);",
        "    }, 'users.csv', ['Content-Type' => 'text/csv']);",
        "}"
      ]
    },
    {
      "title": "Kirish va flash",
      "lang": "php",
      "note": "Xavfsiz o'qish, redirect",
      "code": [
        "public function update(Request $request, Post $post)",
        "{",
        "    $title = $request->string('title')->trim();            // Stringable",
        "    $page  = $request->integer('page', 1);",
        "    $when  = $request->date('publish_at');",
        "",
        "    $request->whenFilled('tags', fn (array $tags) => $post->tags()->sync($tags));",
        "",
        "    return redirect()->route('posts.show', $post)->with('status', 'Saqlandi');",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`Model::create($request->all())`: mass assignment va ruxsatsiz maydon; `validated()`.",
    "JSON mijoz `Accept: application/json` yubormasa validatsiya xatosi 422 emas, redirect (HTML) bo'ladi.",
    "Katta natijani `get()` bilan massivga yig'ib `response()->json`: OOM; `lazyById` + stream.",
    "`getClientOriginalName()`/`getClientMimeType()` ga ishonish: mijoz bergan; xavfsizlik uchun kontent bo'yicha tekshiring.",
    "`TrustProxies`ni sozlamaslik: `ip()` hamma uchun balancer IP, `secure()` false, rate limit va `url()` buziladi.",
    "`redirect($request->input('next'))`: open redirect; faqat ichki yo'llarga yo'naltiring."
  ]
});
