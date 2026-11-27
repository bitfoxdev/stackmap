/* Chuqur dars: 2.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.12", {
  "lesson": [
    "### Asoslar",
    "```php",
    "$data = $request->validate([",
    "    'title' => ['required', 'string', 'max:255'],",
    "    'email' => ['required', 'email:rfc,dns', 'unique:users,email'],",
    "]);",
    "```",
    "Xatoda: oddiy so'rovda oldingi sahifaga redirect (xatolar `$errors` da, qiymatlar `old()` da); `Accept: application/json` yoki AJAX'da **422** + `{\"message\", \"errors\": {...}}`. Muvaffaqiyatda **faqat tekshirilgan maydonlar** qaytadi: `$request->validated()` yoki `$request->safe()->only([...])`/`except([...])`. Hech qachon `$request->all()` ni `create()` ga bermang.",
    "",
    "### Qoida yozish",
    "- Massiv sintaksisi (`['required', 'max:5']`) o'qilishi va `Rule` obyektlari uchun afzal; `'required|max:5'` ham ishlaydi, lekin regex ichida `|` muammo beradi.",
    "- `bail` — birinchi xatoda to'xtaydi; `nullable` — `null` ga ruxsat; `sometimes` — maydon bor bo'lsagina; `present`, `filled`, `prohibited`, `prohibited_if`.",
    "- Shartli: `required_if:type,card`, `required_unless`, `required_with`, `required_without`, `exclude_if` (maydonni natijadan chiqaradi), `Rule::requiredIf(fn () => ...)`, `Rule::when(...)`.",
    "- Massiv: `'items' => ['required', 'array', 'min:1']`, `'items.*.product_id' => ['required', 'exists:products,id']`, `'items.*.qty' => ['integer', 'min:1']`. Xato kaliti `items.0.qty` ko'rinishida.",
    "- Raqam/matn turi: `string`, `integer`, `numeric`, `boolean`, `date`, `date_format:Y-m-d`, `after:today`, `in:a,b`, `regex:`, `uuid`, `json`, `confirmed` (`password_confirmation`).",
    "- `Rule::unique('users')->ignore($user->id)` (yangilashda o'zini hisobga olmaslik), `Rule::exists('posts', 'id')->where(...)`, `Rule::in([...])`, `Rule::enum(Status::class)` (2.35).",
    "- Parol: `Password::min(8)->mixedCase()->numbers()->uncompromised()`.",
    "- Fayl: `File::types(['pdf', 'png'])->max(2048)` yoki `'file|mimes:pdf|max:2048'`; `image`, `dimensions`. MIME'ga ishoning, kengaytmaga emas.",
    "",
    "### Boshqa usullar",
    "- Qo'lda: `Validator::make($data, $rules)->validate()`; `->after(fn ($v) => ...)` — murakkab, ko'p maydonli tekshiruv.",
    "- Maxsus qoida: `php artisan make:rule Uppercase` (`ValidationRule` interfeysi, `validate($attr, $value, $fail)`); yengil holat uchun closure qoida.",
    "- Xato guruhi: `validateWithBag('post', ...)` (bir sahifada ikki forma).",
    "- Xabar: `messages()`/`attributes()` (Form Request'da) yoki `lang/*/validation.php` (2.23).",
    "- `stopOnFirstFailure()` — birinchi xatodan to'xtaydi.",
    "",
    "### Xavfsizlik",
    "Validatsiya — **sintaksis va biznes-kirish** tekshiruvi, avtorizatsiya emas (2.14). `exists` qoidasi foydalanuvchi ko'ra olmaydigan id'ni ham \"mavjud\" deb topadi: `Rule::exists(...)->where('user_id', auth()->id())` bilan toraytiring.",
    "",
    "### Qoidalar",
    "1. Faqat `validated()` ni saqlang.",
    "2. Murakkab qoidalar Form Request'da (2.13).",
    "3. Massivlarda hajm limitini (`max:100`) qo'ying.",
    "4. Xato matnlari foydalanuvchiga tushunarli bo'lsin (lokalizatsiya)."
  ],
  "examples": [
    {
      "title": "Buyurtma qoidalari",
      "lang": "php",
      "note": "Massiv, shartli, unique ignore",
      "code": [
        "use Illuminate\\Validation\\Rule;",
        "use Illuminate\\Validation\\Rules\\Password;",
        "",
        "$data = $request->validate([",
        "    'email'            => ['required', 'email', Rule::unique('users', 'email')->ignore($request->user()->id)],",
        "    'password'         => ['nullable', 'confirmed', Password::min(8)->mixedCase()->numbers()],",
        "    'payment_type'     => ['required', Rule::enum(PaymentType::class)],",
        "    'card_token'       => ['required_if:payment_type,card', 'prohibited_unless:payment_type,card'],",
        "    'items'            => ['required', 'array', 'min:1', 'max:100'],",
        "    'items.*.product_id' => ['required', Rule::exists('products', 'id')->where('active', true)],",
        "    'items.*.qty'      => ['required', 'integer', 'between:1,50'],",
        "    'avatar'           => ['nullable', File::image()->max(2048)],",
        "]);",
        "",
        "Order::create($data);   // faqat tekshirilgan maydonlar"
      ]
    },
    {
      "title": "Murakkab tekshiruv va test",
      "lang": "php",
      "note": "after hook, 422",
      "code": [
        "$validator = Validator::make($request->all(), ['from' => 'required|date', 'to' => 'required|date']);",
        "$validator->after(function ($v) {",
        "    if ($v->errors()->isEmpty() && $v->getData()['to'] < $v->getData()['from']) {",
        "        $v->errors()->add('to', \"Tugash sanasi boshlanishdan keyin bo'lishi kerak\");",
        "    }",
        "});",
        "$validator->validate();",
        "",
        "public function test_missing_items_returns_422(): void",
        "{",
        "    $this->actingAs(User::factory()->create())",
        "        ->postJson('/orders', ['items' => []])",
        "        ->assertUnprocessable()",
        "        ->assertJsonValidationErrors(['items']);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`Order::create($request->all())`: validatsiyadan o'tmagan maydonlar (masalan `is_admin`) ham yoziladi; faqat `validated()`.",
    "`unique` qoidasini yangilashda `ignore()` siz yozish: foydalanuvchi o'z emailini saqlay olmaydi.",
    "`exists:users,id` ni egalik tekshiruvisiz ishlatish: boshqa foydalanuvchi resursiga havola berish mumkin; `where` bilan toraytiring.",
    "`'a|b'` satr sintaksisida regex ichida `|` yoki `,`: qoida buziladi; massiv sintaksisi.",
    "JSON so'rovda `Accept: application/json` yo'q bo'lsa 422 o'rniga redirect keladi (API mijozlari uchun).",
    "`max:2048` fayl uchun KB; satr uchun belgi soni: turi bo'yicha farq qiladi.",
    "Massiv uchun `max` qo'ymaslik: katta payload bilan server band qilinadi (DoS)."
  ]
});
