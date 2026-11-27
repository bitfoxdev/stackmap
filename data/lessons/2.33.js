/* Chuqur dars: 2.33. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.33", {
  "lesson": [
    "### Asoslar",
    "`resources/views/greeting.blade.php` fayli `view('greeting', ['name' => 'Ali'])` yoki `return view(...)` bilan chiqariladi. Blade kompilyatsiya qilingan PHP'ni `storage/framework/views` ga keshlaydi: o'zgargan shablon avtomatik qayta kompilyatsiya qilinadi; deploy'da `php artisan view:cache`, tozalash uchun `view:clear`.",
    "",
    "### Chiqarish va xavfsizlik",
    "- `{{ $name }}` — `htmlspecialchars` orqali **escape** qilinadi (XSS himoyasi).",
    "- `{!! $html !!}` — xom chiqish; **faqat** ishonchli (o'zingiz tozalagan) HTML uchun.",
    "- `@{{ name }}` — Blade'ni chetlab o'tib JS freymvorklar (Vue/Alpine) uchun saqlaydi; ko'p qator uchun `@verbatim ... @endverbatim`.",
    "- JS'ga ma'lumot: `@json($data)` (xavfsiz), `Js::from($data)` — `JSON.parse('...')` ko'rinishida.",
    "- Escape'siz xom JSON `{!! json_encode($x) !!}` — `</script>` kiritilganda xavfli: `@json` ishlating.",
    "",
    "### Direktivalar",
    "- Shartlar: `@if / @elseif / @else`, `@unless`, `@isset`, `@empty`, `@auth`, `@guest`, `@production`, `@env('local')`, `@can('update', $post)` / `@cannot`.",
    "- Tsikllar: `@foreach`, `@forelse ... @empty ... @endforelse`, `@for`, `@while`; `$loop` (`first`, `last`, `index`, `iteration`, `count`, `remaining`, `parent`); `@continue`, `@break`.",
    "- Atributlar: `@class(['p-4', 'bg-red' => $error])`, `@style`, `@checked`, `@selected`, `@disabled`, `@required`, `@readonly`.",
    "- Forma: `@csrf` (token), `@method('PUT')` (HTML forma faqat GET/POST), `@error('email') ... {{ $message }} @enderror`, `old('email')`.",
    "- Boshqa: `@include('partials.nav', ['x' => 1])`, `@includeIf`, `@includeWhen`, `@each`, `@once`, `@php ... @endphp`, `{{-- izoh --}}` (HTML'da ko'rinmaydi), `@dd`.",
    "",
    "### Ma'lumotni tayyorlash",
    "Shablonda murakkab hisob-kitob va so'rov yozmang: controller/View Composer/ViewModel'da tayyorlang. Shablonda faqat chiqarish va oddiy shart. **N+1**: `@foreach ($posts as $post) {{ $post->author->name }}` — `with('author')` bilan oldindan yuklang (`Model::preventLazyLoading()` rivojlanishda xatoni ushlaydi).",
    "",
    "### Qoidalar",
    "1. Foydalanuvchi ma'lumotini har doim `{{ }}` bilan chiqaring.",
    "2. `@csrf` ni har bir POST/PUT/PATCH/DELETE formaga qo'ying.",
    "3. Shablonda DB so'rovi yo'q; ma'lumot controller'dan keladi.",
    "4. Takrorlanuvchi qismlarni komponentga (2.34) ajrating."
  ],
  "examples": [
    {
      "title": "Ro'yxat va forma",
      "lang": "blade",
      "note": "@forelse, $loop, @can, @csrf, @error",
      "code": [
        "<table>",
        "@forelse ($users as $user)",
        "    <tr @class(['bg-gray-50' => $loop->even])>",
        "        <td>{{ $loop->iteration }}</td>",
        "        <td>{{ $user->name }}</td>",
        "        <td>",
        "            @can('update', $user)",
        "                <a href=\"{{ route('users.edit', $user) }}\">Tahrirlash</a>",
        "            @endcan",
        "        </td>",
        "    </tr>",
        "@empty",
        "    <tr><td colspan=\"3\">Foydalanuvchi yo'q</td></tr>",
        "@endforelse",
        "</table>",
        "",
        "<form method=\"POST\" action=\"{{ route('users.update', $user) }}\">",
        "    @csrf",
        "    @method('PUT')",
        "    <input name=\"email\" value=\"{{ old('email', $user->email) }}\" @class(['border-red' => $errors->has('email')])>",
        "    @error('email')",
        "        <p class=\"error\">{{ $message }}</p>",
        "    @enderror",
        "    <button>Saqlash</button>",
        "</form>"
      ]
    },
    {
      "title": "JS'ga ma'lumot va escape testi",
      "lang": "php",
      "note": "@json va XSS'ni isbotlash",
      "code": [
        "// shablonda: <script>const cfg = @json($config);</script>",
        "",
        "public function test_user_input_is_escaped(): void",
        "{",
        "    $user = User::factory()->create(['name' => '<script>alert(1)</script>']);",
        "",
        "    $this->actingAs($user)->get('/profile')",
        "        ->assertDontSee('<script>alert(1)</script>', false)",
        "        ->assertSee('&lt;script&gt;', false);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Foydalanuvchi kiritgan matnni `{!! !!}` bilan chiqarish: to'g'ridan-to'g'ri XSS. Faqat o'zingiz tozalagan HTML uchun.",
    "Xom `{!! json_encode($x) !!}` ni `<script>` ichida ishlatish `</script>` kiritilganda sahifani buzadi: `@json` yoki `Js::from`.",
    "Formada `@csrf` ni unutish: 419 (Page Expired) xatosi. `@method('PUT')` ni unutish: PUT o'rniga POST ketadi.",
    "Shablon ichida `User::where(...)->get()` kabi so'rov yozish va `@foreach` ichida lazy relation: N+1.",
    "Vue/Alpine `{{ }}` sintaksisi Blade tomonidan yeb qo'yiladi: `@{{ }}` yoki `@verbatim`.",
    "Deploy'dan keyin eski keshlangan shablon: `view:clear` (yoki `optimize:clear`) ni deploy skriptiga qo'shing."
  ]
});
