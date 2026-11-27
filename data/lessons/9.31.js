/* Chuqur dars: 9.31. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.31", {
  "lesson": [
    "### Reyting funksiyalari",
    "Teng qiymatlarda farq (`ORDER BY score DESC`, ballar 90, 90, 80):",
    "| Funksiya | Natija | Izoh |",
    "|---|---|---|",
    "| `ROW_NUMBER()` | 1, 2, 3 | har doim noyob |",
    "| `RANK()` | 1, 1, 3 | teng — bir xil o'rin, keyin **bo'shliq** |",
    "| `DENSE_RANK()` | 1, 1, 2 | bo'shliqsiz |",
    "| `PERCENT_RANK()` | 0, 0, 1 | `(rank-1)/(qatorlar-1)`, 0..1 |",
    "| `NTILE(n)` | 1..n | qatorlarni n teng guruhga bo'ladi (hajmi ko'pi bilan 1 ga farq) |",
    "",
    "`ROW_NUMBER` bilan teng qiymatlarda tartib **aniq emas**: noyob tartib uchun `ORDER BY` ga `id` qo'shing.",
    "",
    "### Qiymat funksiyalari",
    "- `LAG(col, n, default)` — n qator oldingi; `LEAD(col, n, default)` — keyingi. Birinchi/oxirgi qatorda `default` (yo'q bo'lsa NULL).",
    "- `FIRST_VALUE(col)`, `LAST_VALUE(col)`, `NTH_VALUE(col, n)` — frame ichidagi qator.",
    "```sql",
    "SELECT month, revenue,",
    "  revenue - LAG(revenue) OVER w AS diff,",
    "  ROUND(100 * (revenue - LAG(revenue) OVER w) / LAG(revenue) OVER w, 1) AS growth_pct",
    "FROM monthly_revenue",
    "WINDOW w AS (ORDER BY month);",
    "```",
    "`WINDOW w AS (...)` nomlangan window takrorni kamaytiradi.",
    "",
    "### LAST_VALUE frame tuzog'i",
    "`ORDER BY` bor bo'lsa default frame `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`: `LAST_VALUE` joriy qatorning o'zini qaytaradi. To'g'risi:",
    "```sql",
    "LAST_VALUE(x) OVER (ORDER BY d ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)",
    "```",
    "`NTH_VALUE` ham frame'ga bog'liq.",
    "",
    "### Top-N har guruhda",
    "```sql",
    "WITH r AS (",
    "  SELECT p.*, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rnk FROM products p",
    ")",
    "SELECT * FROM r WHERE rnk <= 3;      -- WHERE ichida window ishlamaydi: CTE",
    "```",
    "",
    "### Qoidalar",
    "1. Top-N uchun `ROW_NUMBER` (aniq N) yoki `DENSE_RANK` (teng qiymatlar bilan).",
    "2. `LAG/LEAD` da `default` bering.",
    "3. `LAST_VALUE` da frame'ni yozing.",
    "4. `PARTITION BY`/`ORDER BY` ustunlariga indeks."
  ],
  "examples": [
    {
      "title": "Reyting yonma-yon",
      "lang": "sql",
      "note": "Teng qiymatlar bilan",
      "code": [
        "SELECT name, score,",
        "  ROW_NUMBER()  OVER w AS rn,",
        "  RANK()        OVER w AS rnk,",
        "  DENSE_RANK()  OVER w AS dense,",
        "  PERCENT_RANK() OVER w AS pct,",
        "  NTILE(4)      OVER w AS quartile",
        "FROM students",
        "WINDOW w AS (ORDER BY score DESC, id);"
      ]
    },
    {
      "title": "Oldingi qiymat",
      "lang": "sql",
      "note": "Oyma-oy farq",
      "code": [
        "SELECT user_id, created_at, total,",
        "  LAG(total, 1, 0)  OVER (PARTITION BY user_id ORDER BY created_at) AS prev_total,",
        "  LEAD(created_at)  OVER (PARTITION BY user_id ORDER BY created_at) AS next_order_at",
        "FROM orders;"
      ]
    }
  ],
  "pitfalls": [
    "`RANK`ni \"qatorlar ketma-ketligi\" deb o'ylash: teng qiymatda bo'shliq qoladi (`DENSE_RANK` kerak).",
    "`ROW_NUMBER` da `ORDER BY` noyob emas: teng qatorlarda natija har safar boshqacha.",
    "`LAST_VALUE`ni frame'siz ishlatish: joriy qatorni qaytaradi.",
    "Window natijasini `WHERE` da ishlatish: CTE/subquery.",
    "`LAG`da `PARTITION BY` ni unutish: boshqa foydalanuvchining qatori aralashadi.",
    "Katta partitsiyada indekssiz saralash: xotira/disk sarfi."
  ]
});
