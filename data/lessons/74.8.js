/* Chuqur dars: 74.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.8", {
  "lesson": [
    "### Smoke testlar",
    "Smoke test (tutun testi) — deploy'dan keyin ilovaning eng asosiy hayotiy tizimlari ishlayotganini **soniyalar ichida** tekshiradigan yengil testlar to'plami. Nomi elektronikadan: qurilmani yoqqanda tutun chiqmasa, asosiy ish bajarildi.",
    "",
    "### Nimani tekshiradi",
    "- Bosh sahifa ochiladi (`200 OK`).",
    "- Login sahifasi mavjud.",
    "- Health endpoint (`/up` Laravel 11 da standart yoki o'zingizniki).",
    "- DB, Redis va navbatga ulanish.",
    "- Muhim konfiguratsiya (kalitlar, APP_KEY) mavjud.",
    "- Eng muhim bitta foydalanuvchi oqimi (login qilish).",
    "",
    "### Qayerda ishlaydi",
    "Smoke testlar **productionga yaqin** yoki haqiqiy muhitda, deploy'dan darhol keyin ishga tushadi. Ular to'liq test to'plami emas: tez va faqat kritik narsani tekshiradi.",
    "",
    "### Natija bo'yicha qaror",
    "Smoke test yiqilsa, yangi reliz **darhol orqaga qaytariladi** (rollback) yoki trafik yangi versiyaga yo'naltirilmaydi (blue-green, canary). Bu yarim ishlaydigan relizni foydalanuvchilar ko'rishidan oldin ushlaydi.",
    "",
    "### Health check bilan farqi",
    "Health check — doimiy monitoring uchun (\"jarayon tirikmi\"). Smoke test — deploy paytidagi tekshiruv (\"asosiy oqimlar ishlaydimi\"). Ikkalasi bir-birini to'ldiradi.",
    "",
    "### Yozish qoidalari",
    "- Tez (umumiy bir necha soniya).",
    "- Mutlaqo **o'qish** xarakterida yoki xavfsiz test ma'lumoti bilan: productionga haqiqiy ma'lumot yozmang.",
    "- Barqaror: tasodifan yiqilgan smoke test yolg'on rollback keltiradi."
  ],
  "examples": [
    {
      "title": "Smoke test skripti",
      "lang": "bash",
      "code": [
        "#!/usr/bin/env bash",
        "set -e",
        "BASE=\"https://staging.example.uz\"",
        "curl -fsS \"$BASE/up\"              > /dev/null   # health",
        "curl -fsS -o /dev/null \"$BASE/\"   # bosh sahifa",
        "curl -fsS -o /dev/null \"$BASE/login\"",
        "echo \"smoke OK\""
      ],
      "note": "set -e va curl -f xato holatida chiqish kodini nolga teng bo'lmagan qiladi, CI shuni rollback signali sifatida ishlatadi."
    },
    {
      "title": "Pest bilan smoke guruhi",
      "lang": "php",
      "code": [
        "it('home page loads', fn () => $this->get('/')->assertOk())->group('smoke');",
        "",
        "it('login page loads', fn () => $this->get('/login')->assertOk())->group('smoke');",
        "",
        "it('database and cache are reachable', function () {",
        "    expect(DB::select('select 1'))->not->toBeEmpty();",
        "    Cache::put('smoke', 1, 5);",
        "    expect(Cache::get('smoke'))->toBe(1);",
        "})->group('smoke');",
        "",
        "// php artisan test --group=smoke"
      ],
      "note": "Guruh bo'yicha faqat tezkor tekshiruvlar ishga tushiriladi."
    }
  ],
  "pitfalls": [
    "Smoke testga juda ko'p tekshiruv qo'shish: u sekinlashadi va smoke bo'lmay qoladi.",
    "Productionga haqiqiy ma'lumot yozadigan smoke test: foydalanuvchi ma'lumotiga ta'sir qiladi.",
    "Beqaror smoke test: yolg'on rollbacklar jamoani charchatadi.",
    "Yiqilganda nima qilishni belgilamaslik: test bor, lekin rollback jarayoni yo'q."
  ]
});
