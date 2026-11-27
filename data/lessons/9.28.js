/* Chuqur dars: 9.28. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.28", {
  "lesson": [
    "### Taqqoslash va mantiq",
    "`=`, `<>` (`!=`), `<`, `>`, `<=`, `>=`. NULL bilan `=` ishlamaydi: `IS NULL` / `IS NOT NULL` (9.10). Ustuvorlik: `NOT` > `AND` > `OR`. Shubhada qavs qo'ying:",
    "```sql",
    "WHERE status = 'paid' AND (country = 'UZ' OR country = 'KZ')",
    "```",
    "",
    "### BETWEEN",
    "`x BETWEEN a AND b` = `x >= a AND x <= b` (ikkala chegara **kiradi**). Vaqtli ustunda `BETWEEN '2026-01-01' AND '2026-01-31'` 31-yanvar kunining faqat `00:00:00` ini oladi; to'g'risi `>= '2026-01-01' AND < '2026-02-01'`.",
    "",
    "### LIKE",
    "`%` — istalgan miqdordagi belgi, `_` — bitta belgi. `LIKE 'ab%'` indeksdan foydalana oladi (prefiks), `LIKE '%ab'` va `'%ab%'` — **yo'q** (full scan); to'liq matn qidiruv uchun `FULLTEXT`/Scout. Maxsus belgini qochirish: `LIKE '50\\%' ESCAPE '\\\\'`. Registrga sezgirlik collation'ga bog'liq (MySQL'da odatda sezgir emas; PostgreSQL'da `LIKE` sezgir, `ILIKE` emas).",
    "",
    "### IN",
    "`WHERE id IN (1, 2, 3)` yoki subquery bilan. Qisqa ro'yxat uchun qulay; juda uzun ro'yxat o'rniga `JOIN`.",
    "",
    "### ANY / ALL",
    "Subquery natijasi bilan taqqoslash:",
    "- `x > ANY (subq)` — kamida bitta qiymatdan katta (`= ANY` ≡ `IN`).",
    "- `x > ALL (subq)` — hammasidan katta (`<> ALL` ≡ `NOT IN`).",
    "`ALL` bo'sh to'plamda **true** qaytaradi. MySQL'da ANY/ALL faqat subquery bilan ishlaydi (qiymatlar ro'yxati bilan emas).",
    "",
    "### EXISTS",
    "`EXISTS (subquery)` — kamida bitta qator bor-yo'qligi (true/false), qiymat qaytarmaydi, birinchi topilganda to'xtaydi.",
    "```sql",
    "SELECT * FROM users u",
    "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'paid');",
    "```",
    "",
    "### NOT IN va NULL tuzog'i",
    "`x NOT IN (1, 2, NULL)` hech qachon true bo'lmaydi (NULL noma'lum natija beradi) — natija **bo'sh**. Subquery NULL qaytarishi mumkin bo'lsa `NOT EXISTS` yoki `WHERE col IS NOT NULL` ishlating.",
    "",
    "### Laravel",
    "`whereBetween`, `whereIn`, `where('name','like','ab%')`, `whereExists`/`whereHas`, `whereNotIn`.",
    "",
    "### Qoidalar",
    "1. `AND`/`OR` aralash bo'lsa qavs.",
    "2. Sana oralig'i uchun yarim ochiq `>= ... <` shakli.",
    "3. `NOT IN` o'rniga `NOT EXISTS`.",
    "4. Boshida `%` bo'lgan `LIKE` katta jadvalda ishlatilmaydi."
  ],
  "examples": [
    {
      "title": "Filtrlar",
      "lang": "sql",
      "note": "Keng ko'lamli",
      "code": [
        "SELECT * FROM orders",
        "WHERE created_at >= '2026-01-01' AND created_at < '2026-02-01'   -- BETWEEN o'rniga",
        "  AND status IN ('paid', 'shipped')",
        "  AND (number LIKE 'UZ-%' OR country = 'UZ');"
      ]
    },
    {
      "title": "ANY ALL EXISTS",
      "lang": "sql",
      "note": "Subquery bilan",
      "code": [
        "SELECT * FROM products WHERE price > ALL (SELECT price FROM products WHERE category_id = 5);",
        "SELECT * FROM products WHERE price > ANY (SELECT price FROM products WHERE category_id = 5);",
        "",
        "-- NOT IN tuzog'i va to'g'ri yo'l",
        "SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM blocks);          -- user_id NULL bo'lsa natija bo'sh",
        "SELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM blocks b WHERE b.user_id = u.id);"
      ]
    }
  ],
  "pitfalls": [
    "`AND`/`OR`ni qavssiz aralashtirish: kutilmagan natija (AND kuchliroq).",
    "`NOT IN (subquery)` da NULL: natija bo'sh bo'lib qoladi.",
    "Sana ustunida `BETWEEN` bilan kun oxirini yo'qotish (`23:59:59` dan keyingi vaqt).",
    "`LIKE '%x%'` ni katta jadvalda indeks umidida ishlatish: full scan.",
    "Ustunga funksiya qo'llash (`WHERE DATE(created_at) = ...`): indeks ishlamaydi.",
    "`= NULL` yozish (`IS NULL` kerak)."
  ]
});
