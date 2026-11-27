/* Chuqur dars: 9.30. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.30", {
  "lesson": [
    "### Alias",
    "```sql",
    "SELECT u.name AS customer, SUM(o.total) AS spent",
    "FROM users AS u",
    "JOIN orders AS o ON o.user_id = u.id",
    "GROUP BY u.id, u.name;",
    "```",
    "`AS` ixtiyoriy, lekin yozish o'qishni oson qiladi. Bo'shliqli nom: MySQL'da backtick (`` `Jami summa` ``), standart/PostgreSQL'da `\"Jami summa\"`. Subquery `FROM` da bo'lsa alias **majburiy** (MySQL: \"Every derived table must have its own alias\").",
    "",
    "### Mantiqiy bajarilish tartibi",
    "1. `FROM` / `JOIN` — qatorlar manbai",
    "2. `WHERE` — qatorlarni filtrlash",
    "3. `GROUP BY` — guruhlash",
    "4. `HAVING` — guruhlarni filtrlash",
    "5. Window funksiyalar (9.6)",
    "6. `SELECT` — ifodalar va **alias**lar hosil bo'ladi",
    "7. `DISTINCT`",
    "8. `ORDER BY`",
    "9. `LIMIT`/`OFFSET`",
    "",
    "### Alias ko'rinishi",
    "- **`ORDER BY`** da ko'rinadi (SELECT'dan keyin bajariladi).",
    "- **`WHERE`** da **ko'rinmaydi** (SELECT'dan oldin). Ifodani takrorlang yoki subquery/CTE ishlating.",
    "- `GROUP BY`/`HAVING`: standartda ko'rinmaydi, lekin MySQL qo'shimcha sifatida ruxsat beradi — boshqa DBMS'ga ko'chirishda xato bo'ladi.",
    "- Window funksiya natijasi (alias) `WHERE` da ishlamaydi: CTE.",
    "",
    "### Self-join va ikki jadval",
    "Bir jadvalni o'zi bilan bog'lash alias'siz mumkin emas:",
    "```sql",
    "SELECT e.name AS employee, m.name AS manager",
    "FROM employees e LEFT JOIN employees m ON m.id = e.manager_id;",
    "```",
    "",
    "### Qoidalar",
    "1. Jadvalga qisqa mazmunli alias (`o`, `u`).",
    "2. Hisoblangan ustunga alias bering (API/Resource kalitlari bo'lib qoladi).",
    "3. `WHERE` da alias kerak bo'lsa CTE/subquery.",
    "4. Ustun nomi bilan to'qnashadigan alias (`count`, `order`) dan qoching."
  ],
  "examples": [
    {
      "title": "Alias ko'rinishi",
      "lang": "sql",
      "note": "WHERE va ORDER BY",
      "code": [
        "SELECT user_id, SUM(total) AS spent",
        "FROM orders",
        "WHERE status = 'paid'               -- spent bu yerda hali yo'q",
        "GROUP BY user_id",
        "HAVING SUM(total) > 1000            -- standartda aliasni emas, ifodani yozing",
        "ORDER BY spent DESC;                -- bu yerda alias ko'rinadi"
      ]
    },
    {
      "title": "CTE bilan",
      "lang": "sql",
      "note": "Alias bo'yicha filtr",
      "code": [
        "WITH t AS (SELECT user_id, SUM(total) AS spent FROM orders GROUP BY user_id)",
        "SELECT * FROM t WHERE spent > 1000;"
      ]
    }
  ],
  "pitfalls": [
    "`WHERE spent > 1000` yozish (alias hali mavjud emas): \"Unknown column\".",
    "`GROUP BY alias`ni MySQL'da ishlatib, boshqa DBMS'ga o'tganda sinish.",
    "Subquery `FROM` da aliassiz qoldirish.",
    "Alias nomi sifatida zaxira so'z (`order`, `group`) ni backtick'siz yozish.",
    "Jadval aliasini kiritib keyin to'liq nomni ishlatish (`orders.id` o'rniga `o.id`): xato.",
    "Bir xil ustun nomli ikki jadvalda aliassiz `id` yozish: \"ambiguous column\"."
  ]
});
