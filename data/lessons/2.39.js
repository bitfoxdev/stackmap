/* Chuqur dars: 2.39. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.39", {
  "lesson": [
    "### Hash (parollar)",
    "`Hash::make($password)` — har chaqiruvda boshqa natija (tuz ichida). Tekshirish: `Hash::check($plain, $hash)`. Driver: `config/hashing.php` (`bcrypt` default, `argon2id`, `argon`); `rounds`/`memory`/`time` — qiymat oshgani sari sekinroq va xavfsizroq. Foydalanuvchi kirganda `Hash::needsRehash($hash)` true bo'lsa (sozlama kuchaytirilgan) parolni qayta hash qiling. Eloquent'da `'password' => 'hashed'` cast avtomatik hash qiladi. Hash'ni **qaytarib bo'lmaydi**; parol tiklash — yangisini o'rnatish. Parolni `md5`/`sha1` bilan hash qilmang.",
    "",
    "### Crypt (shifrlash)",
    "`Crypt::encryptString($v)` / `decryptString($c)` — `APP_KEY` bilan shifrlaydi va imzolaydi (o'zgartirilsa `DecryptException`). Eloquent: `'token' => 'encrypted'` cast (ustun matn/`text`), `encrypted:array`, `encrypted:object`. Maxfiy ma'lumot (API token, TIN) uchun. **Cheklov**: shifrlangan ustun bo'yicha `WHERE`/indeks qidirish ishlamaydi.",
    "- `APP_KEY` yo'qolsa shifrlangan ma'lumot qaytarib bo'lmaydi: zaxira nusxasini xavfsiz saqlang.",
    "- Kalit almashtirish: `APP_PREVIOUS_KEYS=\"oldkey1,oldkey2\"` — eski kalit bilan shifrlangan ma'lumot hali o'qiladi, yangisi yangi kalit bilan yoziladi; ma'lumotni qayta shifrlang va keyin eski kalitni olib tashlang.",
    "- `php artisan key:generate` mavjud ilovada ma'lumotni buzadi (production'da ehtiyot).",
    "",
    "### Imzolangan URL",
    "```php",
    "URL::signedRoute('unsubscribe', ['user' => 1]);",
    "URL::temporarySignedRoute('verify', now()->addMinutes(30), ['id' => $user->id]);",
    "```",
    "Route'da `->middleware('signed')` (yoki `signed:relative`): imzo noto'g'ri bo'lsa 403 (`InvalidSignatureException`). Qo'lda: `$request->hasValidSignature()`, `hasValidRelativeSignature()`. Foyda: login'siz \"obuna bekor qilish\", email tasdiqlash, vaqtinchalik yuklab olish. Imzo `APP_KEY` ga bog'liq. Imzolangan URL **kim ochishidan qat'i nazar** ishlaydi: shaxsga bog'liq amalda qo'shimcha tekshiruv qo'ying; qayta ishlatilmasligi kerak bo'lsa (bir martalik) holatni saqlang.",
    "",
    "### Qoidalar",
    "1. Parol — `Hash`; qaytarib o'qiladigan sir — `Crypt`/`encrypted` cast; ochiq havola — signed URL.",
    "2. `APP_KEY` ni sir saqlang, almashtirishda `previous_keys`.",
    "3. Hash sozlamasini vaqt o'tgan sari kuchaytiring va `needsRehash` ishlating.",
    "4. Signed URL muddati qisqa va bir martalik bo'lishi kerak bo'lsa holat bilan."
  ],
  "examples": [
    {
      "title": "Parol va shifrlangan ustun",
      "lang": "php",
      "note": "hashed va encrypted cast",
      "code": [
        "use Illuminate\\Support\\Facades\\Hash;",
        "",
        "class User extends Authenticatable",
        "{",
        "    protected function casts(): array",
        "    {",
        "        return ['password' => 'hashed', 'api_token' => 'encrypted'];",
        "    }",
        "}",
        "",
        "if (Hash::check($request->password, $user->password)) {",
        "    if (Hash::needsRehash($user->password)) {",
        "        $user->update(['password' => $request->password]);   // 'hashed' cast qayta hash qiladi",
        "    }",
        "}"
      ]
    },
    {
      "title": "Imzolangan havola",
      "lang": "php",
      "note": "temporarySignedRoute + signed middleware",
      "code": [
        "use Illuminate\\Support\\Facades\\URL;",
        "",
        "$link = URL::temporarySignedRoute('files.download', now()->addMinutes(15), ['file' => $file->id]);",
        "",
        "Route::get('/files/{file}/download', [FileController::class, 'download'])",
        "    ->middleware('signed')",
        "    ->name('files.download');"
      ]
    }
  ],
  "pitfalls": [
    "Parolni `Crypt` bilan shifrlash: shifrlangan parol qaytarib o'qiladi (kalit sizsa hammasi ochiladi); parol uchun faqat `Hash`.",
    "`APP_KEY` ni yo'qotish yoki production'da `key:generate` qilish: shifrlangan ustunlar va imzolangan havolalar yaroqsiz bo'ladi.",
    "Shifrlangan ustun bo'yicha qidirish yoki indekslash: mumkin emas; qidiruv kerak bo'lsa alohida hash (blind index) saqlang.",
    "Imzolangan URL'ni uzoq muddatli qilib shaxsga bog'liq amal uchun ishlatish: havola kimga tushsa o'sha foydalanadi.",
    "`Hash::needsRehash` tekshirmasdan eski, past `rounds` li hash'lar bilan qolish.",
    "`md5`/`sha1` bilan parol hash qilish yoki `==` bilan hash taqqoslash: `Hash::check` yoki `hash_equals`."
  ]
});
