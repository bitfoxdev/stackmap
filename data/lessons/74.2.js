/* Chuqur dars: 74.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.2", {
  "lesson": [
    "### Unit test nima",
    "Unit test bitta funksiya, metod yoki sinfni **tashqi olamdan ajratib** tekshiradi: DB, tarmoq, fayl tizimi, vaqt bilan aloqasiz. Bunday test millisekundlarda ishlaydi va bir xil kirish bilan har doim bir xil natija beradi.",
    "",
    "### Nimani unit testlash kerak",
    "- Sof biznes mantiq: narx, chegirma, soliq hisoblari.",
    "- Algoritmlar va ma'lumot o'zgartirishlar (parser, formatter).",
    "- Value object'lar: tenglik, validatsiya, o'zgarmaslik.",
    "- Holat mashinalari: ruxsat etilgan va taqiqlangan o'tishlar.",
    "",
    "### Izolyatsiya",
    "Test qilinayotgan sinf boshqa sinflarga tayansa, ularni **stub** (tayyor javob qaytaruvchi) yoki **fake** (soddalashtirilgan ishlaydigan nusxa) bilan almashtiring. Mock (chaqiruvlarni tekshiruvchi) kamroq ishlating: u implementatsiyaga bog'laydi.",
    "",
    "### Laravel'dagi nuqta",
    "Laravel'da `Tests\\TestCase` butun ilovani yuklaydi, bu sekinroq. Sof unit testlar uchun `PHPUnit\\Framework\\TestCase` (yoki Pest'da `tests/Unit` ichida framework'siz) ishlatish tezlikni oshiradi. Agar sinfingiz `Eloquent`, `config()` yoki facade'larga tayansa, u sof unit emas, integratsiyaga yaqin.",
    "",
    "### Yaxshi unit test belgisi",
    "Uni boshqa hech narsasiz, DB va `.env`siz ishga tushirish mumkin. Agar unit test uchun `RefreshDatabase` kerak bo'lsa, ehtimol bu unit emas yoki sinf juda ko'p narsaga bog'langan.",
    "",
    "### Chegaralar",
    "Unit test faqat mantiqni tekshiradi. Sinfning DB bilan to'g'ri ishlashi yoki controller'ga ulanishini integratsion va feature testlar tekshiradi."
  ],
  "examples": [
    {
      "title": "Sof unit test",
      "lang": "php",
      "code": [
        "// tests/Unit/DiscountTest.php: framework yuklanmaydi",
        "it('applies a percent discount and never below zero', function (int $total, int $percent, int $expected) {",
        "    expect((new Discount($percent))->apply(Money::uzs($total)))->toEqual(Money::uzs($expected));",
        "})->with([",
        "    'ten percent' => [100_000, 10, 90_000],",
        "    'full'        => [50_000, 100, 0],",
        "    'zero'        => [0, 20, 0],",
        "]);"
      ],
      "note": "Tashqi bog'liqlik yo'q, millisekundlarda ishlaydi."
    },
    {
      "title": "Stub bilan izolyatsiya",
      "lang": "php",
      "code": [
        "it('uses the exchange rate from the provider', function () {",
        "    $rates = new class implements RateProvider {",
        "        public function rate(string $pair): float { return 12_700.0; }",
        "    };",
        "",
        "    $converter = new CurrencyConverter($rates);",
        "",
        "    expect($converter->toUzs(Money::usd(10)))->toEqual(Money::uzs(127_000));",
        "});"
      ],
      "note": "Anonim sinf stub vazifasini bajaradi, tarmoqqa chiqilmaydi."
    }
  ],
  "pitfalls": [
    "Unit testda DB yoki HTTP ishlatish: u sekinlashadi va endi unit emas.",
    "Hamma narsani mock qilish: test implementatsiyani nusxalaydi va refactoring'da sinadi.",
    "Trivial kodni (getter) unit testlash: qiymat bermaydi.",
    "Laravel `TestCase`ni har unit testda ishlatish: butun ilova yuklanib, tezlik yo'qoladi."
  ]
});
