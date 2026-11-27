/* Chuqur dars: 1.47. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.47", {
  "lesson": [
    "### Ko'p qatorli izoh",
    "`/*` bilan boshlanib `*/` bilan tugaydi; oraliqdagi hamma narsa izoh:",
    "",
    "```php",
    "/*",
    "   Bu bir necha qatorli",
    "   izoh.",
    "*/",
    "```",
    "",
    "### Ichma-ich izoh yo'q",
    "`/* ... /* ichki */ ... */` ishlamaydi: birinchi `*/` izohni tugatadi, qolgani kod bo'lib qoladi va parse error beradi. Katta kod blokini o'chirmoqchi bo'lsangiz ichida `/* */` bo'lmasligiga ishonch hosil qiling yoki qatorlarni `//` bilan o'chiring (IDE: Ctrl+/).",
    "",
    "### DocBlock",
    "`/** ... */` — hujjat izohi. IDE, PHPStan, Reflection ishlatadi:",
    "```php",
    "/**",
    " * Ikki sonni qo'shadi.",
    " *",
    " * @param int $a Birinchi son",
    " * @param int $b Ikkinchi son",
    " * @return int",
    " */",
    "```",
    "`@param`, `@return`, `@throws`, `@var`, `@deprecated`, `@see`. Zamonaviy PHP'da tiplar kodning o'zida yoziladi, docblock esa **generics** (`@param list<User> $users`) va izoh uchun qoladi.",
    "",
    "### Izoh turlari bir joyda",
    "| Belgi | Tur | Eslatma |",
    "|---|---|---|",
    "| `// ...` | bir qatorli | qator oxirigacha |",
    "| `# ...` | bir qatorli | `#[` — attribute |",
    "| `/* ... */` | blok | ichma-ich bo'lmaydi |",
    "| `/** ... */` | docblock | Reflection/IDE/PHPStan o'qiydi |",
    "",
    "### DocBlock teglari",
    "- `@param tip $nom tavsif`, `@return tip tavsif`",
    "- `@throws ExceptionTuri`",
    "- `@var tip` (o'zgaruvchi/property uchun)",
    "- `@deprecated sabab`, `@see`, `@link`",
    "- `@template T` va `@param class-string<T>` (generics, PHPStan/Psalm)",
    "- `@property`, `@method` (magic a'zolarni hujjatlash)",
    "Tip qo'shimcha: `list<int>`, `array<string, User>`, `non-empty-string`, `positive-int`.",
    "",
    "### Fayl va klass sarlavhasi",
    "Klass ustiga qisqa tavsif:",
    "```php",
    "/**",
    " * Buyurtma narxini soliq va chegirma bilan hisoblaydi.",
    " */",
    "final class PriceCalculator {}",
    "```",
    "",
    "### Statik tahlil bilan",
    "PHPStan docblock tiplarini tekshiradi: `@return list<User>` yozib, `array` qaytarsangiz va elementlar `User` bo'lmasa xato beradi. Bu kodning \"hujjati\" tekshiriladigan bo'ladi."
  ],
  "examples": [
    {
      "title": "DocBlock",
      "lang": "php",
      "code": [
        "<?php",
        "/**",
        " * Mahsulot narxiga chegirma qo'llaydi.",
        " *",
        " * @param int   $price   Narx (tiyin)",
        " * @param float $percent Chegirma foizi (0-100)",
        " * @return int  Yangi narx",
        " * @throws InvalidArgumentException foiz oralig'idan tashqarida bo'lsa",
        " */",
        "function discount(int $price, float $percent): int",
        "{",
        "    if ($percent < 0 || $percent > 100) {",
        "        throw new InvalidArgumentException('Foiz 0..100 bo\\'lsin');",
        "    }",
        "    return (int) round($price * (1 - $percent / 100));",
        "}"
      ]
    },
    {
      "title": "Generics docblock",
      "lang": "php",
      "code": [
        "<?php",
        "/** @param list<User> $users */",
        "function names(array $users): array",
        "{",
        "    return array_map(fn (User $u) => $u->name, $users);",
        "}"
      ],
      "note": "PHP o'zi massiv elementlarini tekshirmaydi; docblock statik tahlil (PHPStan) uchun."
    },
    {
      "title": "Magic a'zolar docblock",
      "lang": "php",
      "code": [
        "<?php",
        "/**",
        " * @property int $id",
        " * @property string $email",
        " * @method static self find(int $id)",
        " */",
        "class Model { public function __get($n) { /* ... */ } }"
      ]
    }
  ],
  "pitfalls": [
    "`/* */` ichida ikkinchi `/* */` bo'lsa, birinchi `*/` izohni uzadi va parse error chiqadi.",
    "DocBlock tiplari kodning haqiqiy tiplaridan farq qilsa PHPStan xato beradi: sinxron saqlang.",
    "Hamma funksiyaga majburiy docblock yozish shovqin: tip e'loni yetarli joyda yozmang."
  ]
});
