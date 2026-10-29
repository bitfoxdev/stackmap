/* Chuqur dars: 74.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.16", {
  "lesson": [
    "### Mutation testing",
    "Mutation testing **testlarning o'zi qanchalik sifatli** ekanini tekshiradi. Qamrov \"kod ishga tushdimi\" deydi; mutation testing esa \"kodni buzsam, testlar sezadimi\" deb so'raydi.",
    "",
    "### Qanday ishlaydi",
    "Vosita (PHP'da **Infection**) kodga atayin mayda xatolar, ya'ni **mutatsiyalar** kiritadi:",
    "- `>` ni `>=` ga almashtirish;",
    "- `true` ni `false` ga;",
    "- `+` ni `-` ga;",
    "- metod chaqiruvini olib tashlash;",
    "- `&&` ni `||` ga.",
    "",
    "Har mutatsiyadan keyin testlar ishga tushadi:",
    "- Biror test **yiqilsa**: mutant \"o'ldirildi\" (yaxshi, testlar xatoni sezdi).",
    "- Barcha testlar **yashil** qolsa: mutant \"tirik qoldi\" (yomon, testlar bu xatoni sezmaydi).",
    "",
    "### Metrika",
    "- **MSI** (Mutation Score Indicator): o'ldirilgan mutantlar ulushi.",
    "- **Covered MSI**: faqat testlar qamragan kod ichidagi ulush.",
    "",
    "### Tirik mutantlar nimani bildiradi",
    "Tirik mutant odatda zaif yoki yetishmayotgan assertion'ni ko'rsatadi. Masalan, `>` o'rniga `>=` qilinganda test yiqilmasa, chegara (off-by-one) holati tekshirilmagan. Bu qamrov hisobotida ko'rinmaydigan bo'shliqlar.",
    "",
    "### Amaliyot",
    "Mutation testing sekin (har mutant uchun testlar yuradi), shuning uchun:",
    "- faqat **muhim domen kodi** va o'zgargan fayllarda ishga tushiring;",
    "- CI'da `--git-diff-filter` bilan faqat o'zgargan kodga;",
    "- `--threads` bilan parallel;",
    "- minimal MSI chegarasini belgilang (`--min-msi=70`).",
    "",
    "### Ortiqcha ishtiyoq",
    "100% MSI ga intilish samarasiz. Ba'zi mutantlar ekvivalent (xatti-harakatni o'zgartirmaydi). Mantiqli hududlarda ishlating, hamma joyda emas."
  ],
  "examples": [
    {
      "title": "Mutant tirik qolgan holat",
      "lang": "php",
      "code": [
        "// kod",
        "public function isAdult(int $age): bool { return $age >= 18; }",
        "",
        "// test: chegarani tekshirmaydi",
        "it('detects adults', function () {",
        "    expect((new Person())->isAdult(30))->toBeTrue();",
        "    expect((new Person())->isAdult(10))->toBeFalse();",
        "});",
        "// Mutant: >= 18  ->  > 18  testlar yashil qoladi (18 yosh tekshirilmagan)",
        "",
        "// chegarani qo'shamiz -> mutant o'ladi",
        "it('treats exactly 18 as adult', fn () => expect((new Person())->isAdult(18))->toBeTrue());"
      ],
      "note": "Tirik mutant yetishmayotgan chegaraviy testni ko'rsatdi."
    },
    {
      "title": "Infection ishga tushirish",
      "lang": "bash",
      "code": [
        "composer require --dev infection/infection",
        "vendor/bin/infection --threads=4 --min-msi=70 --min-covered-msi=85",
        "vendor/bin/infection --git-diff-filter=AM --git-diff-base=origin/main   # faqat o'zgargan kod"
      ],
      "note": "Diff filtri CI vaqtini keskin kamaytiradi."
    }
  ],
  "pitfalls": [
    "Butun kodbazada mutation testing yuritish: juda sekin. Muhim hududlar va o'zgargan kodga cheklang.",
    "100% MSI ga intilish: ekvivalent mutantlar tufayli samarasiz.",
    "Mutation testingni qamrovdan oldin yuritish: testlar umuman qamramagan kod uchun ma'nosiz.",
    "Tirik mutantlarni e'tiborsiz qoldirish: ular aynan zaif assertion'larning ro'yxati."
  ]
});
