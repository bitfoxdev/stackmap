/* Chuqur dars: 7.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.3", {
  "lesson": [
    "### Direct vs transitive",
    "**Direct** — `composer.json` da o'zingiz yozgan; **transitive** — ularning bog'liqliklari (lock'da ko'rinadi). Xavfsizlik zaifligi tranzitiv paketda ham sizga tegishli. Foydalanilmaydigan direct paket — keraksiz xavf.",
    "",
    "### Buyruqlar",
    "- `composer show` — o'rnatilganlar; `show -t` (tree), `show vendor/pkg` (tafsilot), `show --platform`.",
    "- `composer why vendor/pkg` — kim bu paketga bog'liq (`-r` rekursiv, `-t` daraxt); `composer why-not vendor/pkg 3.*` — nega ma'lum versiya o'rnatilmayapti (bloklovchi paketlar, PHP cheklovi ham).",
    "- `composer outdated` (`show -lo` ning qisqasi): `--direct` (faqat o'zingiznikilar), `--minor-only`, `--patch-only`, `--strict` (eskirgan bo'lsa non-zero exit: CI uchun).",
    "- `composer remove vendor/pkg` — `composer.json` dan olib, o'chiradi; `remove --unused` — endi hech kim bog'liq bo'lmagan paketlarni olib tashlaydi.",
    "- `composer require vendor/pkg` — qo'shadi va lock'ni yangilaydi (`--dev`).",
    "",
    "### Paket tanlash mezonlari",
    "1. **Faollik**: oxirgi release, ochiq issue/PR, qo'llab-quvvatlanadigan PHP versiyalari.",
    "2. **Xavfsizlik**: `composer audit` tarixi, advisory'lar (7.13), maintainer soni.",
    "3. **Litsenziya**: loyihaga mos (MIT/BSD odatda; GPL/AGPL ehtiyot bo'ling).",
    "4. **Hajm va tranzitiv og'irlik**: ko'p bog'liqlik keltiradimi?",
    "5. **Alternativ**: 20 qatorlik kodni paket o'rniga o'zingiz yozish mumkinmi? Yoki framework'da allaqachon bormi (Laravel yordamchilari, 2.40)?",
    "6. **Barqarorlik**: SemVer'ga rioya (7.4), `1.0+`, changelog.",
    "",
    "### Tartib",
    "- Yangi paket qo'shishdan oldin jamoada kelishing; `abandoned` belgisi bor paketni tanlamang (`composer audit` ko'rsatadi).",
    "- Muntazam: `composer outdated --direct`, `composer audit`, `remove --unused`.",
    "- `composer why-not` bilan yangilash bloklovchilarini oldindan toping (Laravel upgrade, 2.28).",
    "",
    "### Qoidalar",
    "1. Har paket uchun \"nega kerak\" javobi bo'lsin.",
    "2. Direct bog'liqliklarni minimal saqlang.",
    "3. Abandoned/yo'qolgan paketlarni tezda almashtiring.",
    "4. Paket qo'shishni PR'da asoslang (litsenziya, hajm)."
  ],
  "examples": [
    {
      "title": "Bog'liqliklarni tekshirish",
      "lang": "bash",
      "note": "why, why-not, outdated",
      "code": [
        "composer why monolog/monolog                 # kim bog'liq",
        "composer why-not laravel/framework 13.*      # nima to'sqinlik qilyapti",
        "composer show -t laravel/framework | head    # daraxt",
        "composer outdated --direct",
        "composer remove --unused                     # keraksizlarni olib tashlash"
      ]
    },
    {
      "title": "Paket qo'shish",
      "lang": "bash",
      "note": "Ongli qo'shish",
      "code": [
        "composer require spatie/laravel-permission",
        "composer why spatie/laravel-permission       # tranzitiv nimalar keldi",
        "composer audit"
      ]
    }
  ],
  "pitfalls": [
    "Kichik vazifa uchun katta paket qo'shish: yuzlab tranzitiv bog'liqlik va xavf yuzasi.",
    "Abandoned paketni ishlatishda davom etish: yangilanish va xavfsizlik tuzatishi yo'q.",
    "Litsenziyani tekshirmaslik: GPL/AGPL paket tijoriy loyihaga huquqiy muammo.",
    "Tranzitiv zaiflikni \"mening paketim emas\" deb e'tiborsiz qoldirish: ilova uchun hammasi sizniki.",
    "`outdated` ni faqat qo'lda ko'rish: Dependabot/Renovate yoki CI'da `outdated --strict` bilan avtomatlashtiring.",
    "Bir xil funksiyani bajaradigan ikkita paketni saqlash: xarajat va chalkashlik."
  ]
});
