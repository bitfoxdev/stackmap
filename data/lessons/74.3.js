/* Chuqur dars: 74.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.3", {
  "lesson": [
    "### Integratsion testlar",
    "Integratsion test ilovaning bir necha qismi bir-biri bilan yoki tashqi tizim bilan (DB, Redis, Elasticsearch, fayl tizimi) birga to'g'ri ishlashini tekshiradi. Unit testlar yashirgan xatolar shu yerda chiqadi.",
    "",
    "### Nimani ushlaydi",
    "- **SQL xatolari**: noto'g'ri so'rov, ustun nomi, DB'ga xos sintaksis.",
    "- **Ulanish va konfiguratsiya**: noto'g'ri driver, prefiks, timeout.",
    "- **Tranzaksiya va constraint**: rollback, unique, foreign key.",
    "- **Serializatsiya**: obyektning cache yoki navbatda to'g'ri saqlanishi.",
    "- **Migratsiya va model nomuvofiqligi**.",
    "",
    "### Haqiqiy muhit",
    "Production bilan bir xil engine va versiyadagi **haqiqiy test DB** ishlatiladi: Docker konteyneri, CI service container yoki Testcontainers. SQLite bilan MySQL/PostgreSQL'ni almashtirish haqiqiy farqlarni yashiradi.",
    "",
    "### Chegara tanlash",
    "Integratsion testlar adapter chegarasida yoziladi: repository va DB, cache servisi va Redis. Ularni tor saqlang: butun ilova emas, faqat shu qism. Yiqilganda sabab aniq bo'ladi.",
    "",
    "### Tezlik va izolyatsiya",
    "Integratsion testlar unit'dan sekin, shuning uchun ularni alohida suite yoki guruhga ajrating va CI'da alohida bosqichda ishga tushiring. Izolyatsiya: har testdan keyin holat tozalanadi (tranzaksiya rollback, `flushdb`).",
    "",
    "### Tashqi servislar",
    "O'zingiz boshqarmaydigan servislar (to'lov, SMS) integratsion testda fake qilinadi, lekin adapter kam sonli sandbox testlari bilan tasdiqlanadi."
  ],
  "examples": [
    {
      "title": "Repository integratsion testi",
      "lang": "php",
      "code": [
        "uses(RefreshDatabase::class);",
        "",
        "it('finds overdue invoices ordered by due date', function () {",
        "    $late  = Invoice::factory()->unpaid()->create(['due_at' => now()->subDays(10)]);",
        "    $later = Invoice::factory()->unpaid()->create(['due_at' => now()->subDay()]);",
        "    Invoice::factory()->paid()->create(['due_at' => now()->subDays(30)]);",
        "",
        "    $ids = app(InvoiceRepository::class)->overdue()->pluck('id')->all();",
        "",
        "    expect($ids)->toBe([$late->id, $later->id]);",
        "});"
      ],
      "note": "Haqiqiy DB bilan so'rov va saralash tekshiriladi."
    },
    {
      "title": "Testcontainers o'rniga compose",
      "lang": "bash",
      "code": [
        "docker compose -f docker-compose.test.yml up -d --wait",
        "php artisan test --testsuite=Integration",
        "docker compose -f docker-compose.test.yml down -v"
      ],
      "note": "Servislar ko'tariladi, testlar yuradi, keyin tozalanadi."
    }
  ],
  "pitfalls": [
    "Testda SQLite, productionda MySQL: JSON, collation va constraint farqlari xatoni yashiradi.",
    "Integratsion testlarni butun ilova ustidan yozish: yiqilganda sabab topish qiyin.",
    "Holatni tozalamaslik: keyingi test oldingisining ma'lumotini ko'rib, tasodifan yiqiladi.",
    "Barcha integratsion testlarni unit bilan bitta bosqichda yurgizish: tez signal kechikadi."
  ]
});
