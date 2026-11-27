/* Chuqur dars: 1.48. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.48", {
  "lesson": [
    "### Vaqt funksiyalari",
    "- `time()` — Unix timestamp (1970-01-01 UTC dan beri soniyalar).",
    "- `date($format, $timestamp = time())` — formatlangan sana.",
    "- `mktime(h, i, s, m, d, Y)` — timestamp yaratadi.",
    "- `strtotime('tomorrow 10:00')` — matndan timestamp.",
    "- `checkdate(m, d, Y)` — sana mavjudligini tekshiradi.",
    "- `date_default_timezone_set('Asia/Tashkent')`, `date_default_timezone_get()`.",
    "",
    "### Timezone",
    "Server vaqti sizning vaqtingiz bo'lmasligi mumkin: `date.timezone` ni sozlang. Bazada UTC saqlab, ko'rsatishda lokal zonaga o'giring.",
    "",
    "### strtotime nuanslari",
    "`strtotime('+1 week 2 days')`, `strtotime('last day of next month')`. Noaniq matn `false` qaytaradi: tekshiring. `01/02/2025` (amerika) va `01-02-2025` (yevropa) turlicha o'qiladi.",
    "",
    "### Sana farqi",
    "`$a = new DateTime('2025-01-01'); $b = new DateTime('2025-03-15'); $a->diff($b)->days` — kunlar farqi.",
    "",
    "### Muhim format harflari jadvali",
    "| Harf | Ma'nosi | Misol |",
    "|---|---|---|",
    "| `d` / `j` | kun (2 raqam / nolsiz) | 05 / 5 |",
    "| `m` / `n` | oy raqami (2 raqam / nolsiz) | 03 / 3 |",
    "| `M` / `F` | oy nomi (qisqa / to'liq) | Mar / March |",
    "| `Y` / `y` | yil | 2025 / 25 |",
    "| `H` / `h` | soat (24 / 12) | 14 / 02 |",
    "| `i` | daqiqa | 07 |",
    "| `s` | soniya | 09 |",
    "| `D` / `l` | hafta kuni (qisqa / to'liq) | Mon / Monday |",
    "| `N` | hafta kuni raqami (1=Dushanba) | 1 |",
    "| `t` | oydagi kunlar soni | 31 |",
    "| `L` | kabisa yilmi | 1/0 |",
    "| `c` | ISO 8601 | 2025-03-05T14:07:09+05:00 |",
    "Hafta kunlari va oy nomlari **inglizcha** chiqadi; o'zbekcha uchun massiv yoki `IntlDateFormatter`.",
    "",
    "### mktime va checkdate",
    "`mktime(14, 30, 0, 12, 25, 2025)` — 25-dekabr 14:30 timestamp'i (soat, daqiqa, soniya, oy, kun, yil). `checkdate(2, 29, 2024)` kabisa yilda `true`.",
    "",
    "### Mikrovaqt va o'lchash",
    "`microtime(true)` — soniya kasr bilan (kod tezligini o'lchash), `hrtime(true)` — yuqori aniqlikdagi nanosoniyalar. Vaqtni o'lchashda `time()` yetarli emas.",
    "",
    "### DateTime afzalligi",
    "Murakkab hisob (oy qo'shish, farq, zonalar) uchun `DateTimeImmutable`: `->modify('+1 day')`, `->diff($b)`, `->format()`. Funksional `date()` oddiy chiqarish uchun."
  ],
  "examples": [
    {
      "title": "Sana va vaqt",
      "lang": "php",
      "code": [
        "<?php",
        "date_default_timezone_set('Asia/Tashkent');",
        "echo date('Y-m-d H:i:s');                    // 2025-06-01 14:30:00",
        "echo date('l, d F Y', strtotime('tomorrow')); // ertangi kun",
        "echo date('D', mktime(0, 0, 0, 12, 25, 2025)); // 25-dekabr hafta kuni",
        "var_dump(checkdate(2, 30, 2025));            // false"
      ]
    },
    {
      "title": "Sana farqi",
      "lang": "php",
      "code": [
        "<?php",
        "$a = new DateTimeImmutable('2025-01-01');",
        "$b = new DateTimeImmutable('2025-03-15');",
        "echo $a->diff($b)->days;        // 73",
        "echo $b->format('d.m.Y');       // 15.03.2025"
      ]
    },
    {
      "title": "Kun hisoblash",
      "lang": "php",
      "code": [
        "<?php",
        "$tug = new DateTimeImmutable('2000-08-15');",
        "$bugun = new DateTimeImmutable('today');",
        "echo 'Yosh: ', $tug->diff($bugun)->y, \"\\n\";",
        "",
        "$kelasi = $tug->setDate((int) $bugun->format('Y'), 8, 15);",
        "if ($kelasi < $bugun) { $kelasi = $kelasi->modify('+1 year'); }",
        "echo 'Qolgan kun: ', $bugun->diff($kelasi)->days;"
      ]
    }
  ],
  "pitfalls": [
    "`date('m')` oy, `date('i')` daqiqa: `Y-m-d H:i:s` formatini yodlab oling, `m` bilan `i` ni almashtirmang.",
    "`strtotime()` noto'g'ri matnda `false` qaytaradi va `date()` `1970-01-01` chiqaradi: tekshiring.",
    "Oyga `+1 month` qo'shish oy oxirida kutilmagan natija beradi (31-yanvar + 1 oy = mart)."
  ]
});
