/* Chuqur dars: 2.24. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.24", {
  "lesson": [
    "### Uch usul",
    "- `Post::paginate(15)` — `SELECT ... LIMIT 15 OFFSET n` **va** `SELECT COUNT(*)`: sahifa raqamlari, jami son. Katta jadvalda COUNT va chuqur OFFSET sekin.",
    "- `simplePaginate(15)` — COUNT yo'q (+1 qator o'qib \"keyingi bor-yo'q\"ni aniqlaydi): faqat \"Oldingi/Keyingi\".",
    "- `cursorPaginate(15)` — `WHERE (created_at, id) < (...) ORDER BY ... LIMIT 15` (**keyset**): OFFSET yo'q, chuqur sahifada ham tez, sahifalash orasida yozuv qo'shilsa ham qatorlar takrorlanmaydi/yo'qolmaydi. Kamchilik: sahifa raqamiga sakrab bo'lmaydi, jami son yo'q; tartib kalitlari **noyob** va indeksli bo'lishi shart.",
    "",
    "### Ishlatish",
    "`$posts = Post::with('author')->latest('id')->paginate(20)->withQueryString();` (filtr query'sini saqlaydi); Blade: `{{ $posts->links() }}` (stil: `Paginator::useBootstrapFive()` yoki Tailwind default; `vendor:publish --tag=laravel-pagination`). Sahifa nomi: `->paginate(15, ['*'], 'page_x')`. Qo'lda massivdan: `new LengthAwarePaginator($items, $total, $perPage, $page)`.",
    "",
    "### JSON/API",
    "Paginator'ni qaytarsangiz yoki `PostResource::collection($paginator)` — `{\"data\": [...], \"links\": {first,last,prev,next}, \"meta\": {current_page, per_page, total, path, ...}}`; cursor uchun `meta.next_cursor`, `prev_cursor`, `links.next`. Resurs bilan (2.25) javob formati barqaror bo'ladi.",
    "",
    "### Tartib va tezlik",
    "- OFFSET qiymati ortgan sari DB uni **o'qib tashlaydi**: `OFFSET 1 000 000` sekin. Katta jadvalda cursor yoki \"last id\" (`where id < ?`).",
    "- Tartib noyob bo'lmasa (`order by created_at`, bir xil vaqtlar) qatorlar sahifalar orasida takrorlanishi/yo'qolishi mumkin: ikkinchi tartib kaliti (`id`) qo'shing.",
    "- COUNT og'ir bo'lsa: `simplePaginate`/`cursorPaginate`, yoki taxminiy son (kesh, `pg_class.reltuples`).",
    "- `per_page` ni foydalanuvchi bergan bo'lsa **chegarala** (`min($request->integer('per_page', 15), 100)`), aks holda 1 mln qator so'raladi.",
    "- Eager load (`with`) N+1 ni oldini oladi (Eloquent, 13.x).",
    "",
    "### Qoidalar",
    "1. Katta/cheksiz ro'yxat — `cursorPaginate`.",
    "2. Tartib noyob va indeksli.",
    "3. `per_page` yuqori chegarali.",
    "4. UI'da jami son shart bo'lmasa COUNT dan voz keching."
  ],
  "examples": [
    {
      "title": "Paginate va cursor",
      "lang": "php",
      "note": "Controller",
      "code": [
        "public function index(Request $request)",
        "{",
        "    $perPage = min($request->integer('per_page', 20), 100);",
        "",
        "    // Sahifa raqamlari kerak (admin panel)",
        "    $posts = Post::with('author')->latest('id')->paginate($perPage)->withQueryString();",
        "",
        "    // Cheksiz ro'yxat/API (katta jadval)",
        "    $feed = Post::with('author')->orderByDesc('created_at')->orderByDesc('id')->cursorPaginate($perPage);",
        "",
        "    return PostResource::collection($feed);",
        "}"
      ]
    },
    {
      "title": "Blade",
      "lang": "blade",
      "note": "links va qo'lda paginator",
      "code": [
        "@foreach ($posts as $post)",
        "    <x-post-card :post=\"$post\" />",
        "@endforeach",
        "",
        "{{ $posts->links() }}          {{-- paginate/simplePaginate/cursorPaginate bilan ishlaydi --}}",
        "",
        "<p>{{ $posts->firstItem() }}–{{ $posts->lastItem() }} / {{ $posts->total() }}</p>"
      ]
    }
  ],
  "pitfalls": [
    "Katta jadvalda `paginate()` ning `COUNT(*)` va chuqur `OFFSET` ni ishlatish: so'rov sekinlashadi; cursor yoki `simplePaginate`.",
    "`cursorPaginate` da noyob bo'lmagan tartib kaliti (faqat `created_at`): qatorlar takrorlanadi/yo'qoladi; `id` qo'shing.",
    "Tartibsiz `paginate()`: DB tartib kafolatlamaydi, sahifalar orasida qatorlar aralashadi.",
    "`withQueryString()` siz filtrlangan ro'yxatda sahifa o'tkazish: filtr yo'qoladi.",
    "`per_page` ni cheklamaslik: `?per_page=1000000` serverni to'ldiradi.",
    "Ro'yxatda eager load qilmaslik (N+1): har qator uchun qo'shimcha so'rov."
  ]
});
