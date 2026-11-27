/* Chuqur dars: 7.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.5", {
  "lesson": [
    "### Sintaksis (docs)",
    "| Yozuv | Ma'nosi |",
    "|---|---|",
    "| `1.0.2` | aniq versiya |",
    "| `>=1.0 <2.0`, `!=1.5` | diapazon; bo'shliq/vergul = **VA**, `\\|\\|` = **YOKI** (VA kuchliroq bog'laydi) |",
    "| `1.0 - 2.0` | `>=1.0.0 <2.1` (to'liq bo'lmagan yuqori chegara wildcard bo'ladi); `1.0.0 - 2.1.0` = `>=1.0.0 <=2.1.0` |",
    "| `1.0.*` | `>=1.0 <1.1` |",
    "| `~1.2` | `>=1.2 <2.0.0` |",
    "| `~1.2.3` | `>=1.2.3 <1.3.0` |",
    "| `^1.2.3` | `>=1.2.3 <2.0.0` |",
    "| `^0.3` | `>=0.3.0 <0.4.0` |",
    "| `^0.0.3` | `>=0.0.3 <0.0.4` |",
    "`~1` `~1.0` bilan bir xil. **Tilde** oxirgi ko'rsatilgan raqamning oshishiga ruxsat beradi; **caret** MAJOR'ni qotiradi (SemVer bo'yicha); `0.x` da esa minor'ni qotiradi.",
    "",
    "### Stability",
    "Tartib: dev, alpha, beta, RC, stable. `minimum-stability` (root, default `stable`) qaysi tag'lar hisobga olinishini belgilaydi; `prefer-stable: true` imkon bo'lsa stable'ni afzal ko'radi. Bitta paket uchun: `\"vendor/pkg\": \"^2.0@beta\"` (`@dev`). Branch: `dev-feature-x`; versiya-nomli branch: `1.x-dev`. Aniq commit: `dev-main#abc1234` (faqat root).",
    "",
    "### Qaysi uslub",
    "- **Kutubxona**: `^` (docs tavsiya qiladi) va **kenglik**: bog'liqliklarni keng qamrang (`^1.2|^2.0`), toki ilovalar bilan to'qnashmasin. Eng past versiyani haqiqatan sinalgan qiymat qiling.",
    "- **Ilova**: `^` + `composer.lock`; aniq versiyani lock pin qiladi. Qattiq `1.2.3` yozish kerak emas.",
    "- `composer bump` — `composer.json` ning pastki chegarasini o'rnatilgan versiyaga ko'taradi (docs: kutubxonada ko'r-ko'rona ishlatmang; `--dev-only` xavfsizroq).",
    "- Bo'sh chegara (`*`, `>=1.0`) — kutilmagan major tushadi, ehtiyot.",
    "- Platform: `\"php\": \"^8.2\"`; `config.platform` — resolver'ni boshqa PHP versiyasi deb o'ylashga majbur qiladi.",
    "",
    "### Tekshirish",
    "`composer why-not vendor/pkg 3.*`, `composer show -a vendor/pkg`, `composer require vendor/pkg:^2.1 --dry-run`.",
    "",
    "### Qoidalar",
    "1. Ilova: `^`; kutubxona: keng `^` diapazon.",
    "2. `*`/`>=` (yuqoridan ochiq) ishlatmang.",
    "3. `minimum-stability: stable`; istisno uchun paket-darajali `@beta`.",
    "4. Cheklovni qo'lda emas, `composer require` bilan yozdiring."
  ],
  "examples": [
    {
      "title": "Cheklovlar",
      "lang": "json",
      "note": "require bo'limi",
      "code": [
        "{",
        "  \"require\": {",
        "    \"php\": \"^8.2\",",
        "    \"laravel/framework\": \"^12.0\",",
        "    \"monolog/monolog\": \"^3.0\",",
        "    \"vendor/legacy\": \"~1.2.3\",",
        "    \"vendor/either\": \"^1.0 || ^2.0\",",
        "    \"vendor/beta-tool\": \"^2.0@beta\"",
        "  }",
        "}"
      ]
    },
    {
      "title": "Nomuvofiqlik tashxisi",
      "lang": "bash",
      "note": "why-not va dry-run",
      "code": [
        "composer why-not vendor/pkg 3.0.0              # kim va nima to'sqinlik qilyapti",
        "composer require vendor/pkg:^3.0 --dry-run     # o'zgarishsiz sinash",
        "composer bump --dev-only --dry-run             # faqat dev bog'liqliklar chegarasi"
      ]
    }
  ],
  "pitfalls": [
    "`^0.3` ni `0.x` hammasini qamraydi deb o'ylash: u faqat `0.3.x`.",
    "`~1.2` va `~1.2.3` ni bir xil deb o'ylash: birinchisi `<2.0`, ikkinchisi `<1.3`.",
    "Yuqoridan ochiq (`*`, `>=1.0`): kutilmagan major keladi va ilova buziladi.",
    "`minimum-stability: dev` ni butun loyihada yoqish: beqaror paketlar tushadi; paket-darajali `@dev`.",
    "Kutubxonada ortiqcha tor cheklov (`1.2.3`): ilovalarda to'qnashuv (7.12).",
    "`composer bump` ni kutubxonada ko'r-ko'rona ishlatish: pastki chegarani keraksiz ko'taradi va moslikni toraytiradi."
  ]
});
