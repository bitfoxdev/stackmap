/* Chuqur dars: 2.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.22", {
  "lesson": [
    "### Disklar",
    "`config/filesystems.php`, `FILESYSTEM_DISK` (default `local`).",
    "- `local` — `storage/app/private` (Laravel 11+; avval `storage/app`): **ochiq emas**, faqat ilova orqali.",
    "- `public` — `storage/app/public`; `php artisan storage:link` `public/storage` ga symlink yaratadi: URL orqali ochiq. Maxfiy fayl uchun mos emas.",
    "- `s3` — `league/flysystem-aws-s3-v3` paketi kerak; `url()` (ochiq bucket) yoki `temporaryUrl()` (private).",
    "- Boshqa: `sftp`, `ftp`, `scoped`, `read-only` (o'rama disk).",
    "",
    "### API",
    "- Yozish: `Storage::put('a.txt', $content)`, `Storage::putFile('docs', $request->file('doc'))` (**avtomatik noyob nom**), `putFileAs('docs', $file, 'name.pdf')`, `append`, `prepend`, `copy`, `move`.",
    "- Disk tanlash: `Storage::disk('s3')->...`; `$request->file('doc')->store('docs', 's3')`.",
    "- O'qish: `get`, `exists`/`missing`, `size`, `lastModified`, `mimeType`, `files('dir')`, `allFiles`, `directories`.",
    "- Yuklab berish: `Storage::download('a.pdf', 'Nom.pdf')`, `response()->file($path)`, `Storage::response(...)`; katta fayl uchun **stream** (`readStream`, `streamDownload`), butun faylni xotiraga o'qimang.",
    "- O'chirish: `delete`, `deleteDirectory`.",
    "- Ruxsat: `Storage::setVisibility('a.jpg', 'public')`; `put($path, $c, 'public')`.",
    "- URL: `Storage::url($path)` (public/ochiq), `temporaryUrl($path, now()->addMinutes(10))` (s3/local imzolangan).",
    "- `Storage::temporaryUploadUrl(...)` (s3) — brauzer to'g'ridan-to'g'ri S3'ga yuklaydi (server yuklamaydi).",
    "",
    "### Xavfsizlik",
    "- Mijoz bergan nom/yo'lga ishonmang: `putFile` (o'zi nom beradi) yoki UUID; `../` (path traversal) va kengaytma bilan `shell.php` ni cheklang.",
    "- Turini **kontent bo'yicha** tekshiring (`mimes`/`File::types`, 2.12), kengaytma bo'yicha emas.",
    "- Foydalanuvchi fayllarini `public` diskka qo'ymang: `local`/`s3` private + imzolangan URL yoki auth qilingan controller orqali.",
    "- Yuklangan faylni veb-ildizdan ijro etib bo'lmasin (`public/` ichida `.php`).",
    "- Hajm limiti: `upload_max_filesize`, `post_max_size` (PHP) va `max:` qoidasi, nginx `client_max_body_size`.",
    "",
    "### Ko'p serverda",
    "`local` disk har serverda alohida: ko'p serverda umumiy disk (S3/NFS). Deploy symlink'ida `storage` papkasi releases orasida umumiy (shared) bo'lishi shart.",
    "",
    "### Test",
    "`Storage::fake('s3')`; `$file = UploadedFile::fake()->create('a.pdf', 100)`; `Storage::disk('s3')->assertExists(...)`, `assertMissing`.",
    "",
    "### Qoidalar",
    "1. Maxfiy fayl — private disk + vaqtinchalik URL.",
    "2. Nomni o'zingiz yarating (UUID); asl nomni DB'da saqlang.",
    "3. Katta fayl stream/presigned upload.",
    "4. Faylni model bilan bog'lang va o'chirishda diskdan ham o'chiring."
  ],
  "examples": [
    {
      "title": "Yuklash va vaqtinchalik havola",
      "lang": "php",
      "note": "putFile, temporaryUrl",
      "code": [
        "public function store(Request $request)",
        "{",
        "    $request->validate(['doc' => ['required', File::types(['pdf', 'png', 'jpg'])->max(5 * 1024)]]);",
        "",
        "    $path = $request->file('doc')->store(\"documents/{$request->user()->id}\", 's3');   // noyob nom",
        "",
        "    return Document::create([",
        "        'user_id' => $request->user()->id,",
        "        'path' => $path,",
        "        'original_name' => $request->file('doc')->getClientOriginalName(),",
        "    ]);",
        "}",
        "",
        "public function download(Document $document)",
        "{",
        "    Gate::authorize('view', $document);",
        "",
        "    return redirect(Storage::disk('s3')->temporaryUrl($document->path, now()->addMinutes(10)));",
        "}"
      ]
    },
    {
      "title": "Fake bilan test",
      "lang": "php",
      "note": "Storage::fake",
      "code": [
        "public function test_document_is_stored(): void",
        "{",
        "    Storage::fake('s3');",
        "",
        "    $this->actingAs($user = User::factory()->create())",
        "        ->post('/documents', ['doc' => UploadedFile::fake()->create('a.pdf', 100, 'application/pdf')])",
        "        ->assertCreated();",
        "",
        "    Storage::disk('s3')->assertExists(Document::first()->path);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Foydalanuvchi fayllarini `public` diskka yozish: URL'ni bilgan har kim yuklab oladi.",
    "Mijoz bergan fayl nomi/yo'lini ishlatish: path traversal va `.php` yuklash xavfi; `putFile`/UUID.",
    "Faqat kengaytmani tekshirish: `shell.php.jpg` yoki yolg'on MIME; kontent bo'yicha `mimes`/`File::types`.",
    "`Storage::get()` bilan katta faylni xotiraga o'qish: OOM; `readStream`/`download`.",
    "`storage:link` ni deploy'da unutish yoki releases orasida buzish: `public/storage` 404.",
    "Modelni o'chirib faylni diskdan o'chirmaslik: \"yetim\" fayllar to'planadi va xarajat oshadi."
  ]
});
