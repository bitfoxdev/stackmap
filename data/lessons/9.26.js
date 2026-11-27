/* Chuqur dars: 9.26. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.26", {
  "lesson": [
    "### CREATE",
    "```sql",
    "CREATE DATABASE shop CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;",
    "CREATE TABLE IF NOT EXISTS orders (",
    "  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,",
    "  user_id BIGINT UNSIGNED NOT NULL,",
    "  total DECIMAL(12,2) NOT NULL DEFAULT 0,",
    "  status VARCHAR(20) NOT NULL DEFAULT 'new',",
    "  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,",
    "  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)",
    ");",
    "CREATE VIEW paid_orders AS SELECT * FROM orders WHERE status = 'paid';",
    "```",
    "Pul uchun `DECIMAL` (float emas). `CREATE TABLE b LIKE a` tuzilmani nusxalaydi, `CREATE TABLE b AS SELECT ...` — natijadan jadval (indeks/constraint'lar ko'chmaydi).",
    "",
    "### DELETE vs TRUNCATE vs DROP",
    "| | `DELETE` | `TRUNCATE` | `DROP` |",
    "|---|---|---|---|",
    "| Guruh | DML | DDL | DDL |",
    "| `WHERE` | bor | yo'q | yo'q |",
    "| Tuzilma | qoladi | qoladi | **o'chadi** |",
    "| Tezlik | sekin (qator-qator, log) | tez (jadvalni qayta yaratadi) | tez |",
    "| `AUTO_INCREMENT` | davom etadi | **0 dan** | — |",
    "| Tranzaksiya (MySQL) | qaytariladi | implicit commit, **qaytmaydi** | qaytmaydi |",
    "| Trigger | ishlaydi | ishlamaydi | — |",
    "| FK bog'liqlik | tekshiradi | FK bilan havola qilingan jadvalga xato | havola bo'lsa xato |",
    "",
    "PostgreSQL'da `TRUNCATE` tranzaksiyali, `TRUNCATE ... CASCADE` bog'liq jadvallarni ham bo'shatadi (ehtiyot bo'ling).",
    "",
    "### IF [NOT] EXISTS",
    "`DROP TABLE IF EXISTS t` skript/migration'larni qayta ishlatiladigan qiladi. FK tomonidan havola qilingan jadvalni `DROP` qilish xato beradi (tartib: avval bola jadval).",
    "",
    "### Laravel",
    "Migration'lar: `Schema::create`, `dropIfExists`, `Schema::disableForeignKeyConstraints()`. Test bazani tozalashda `TRUNCATE` + FK check'ni vaqtincha o'chirish (`SET FOREIGN_KEY_CHECKS=0`) faqat test/lokal.",
    "",
    "### Qoidalar",
    "1. Production'da `DROP`/`TRUNCATE` faqat zaxira + ruxsatdan keyin.",
    "2. Hamma qatorni o'chirish uchun `TRUNCATE`, bir qismi uchun `DELETE ... WHERE`.",
    "3. FK borligida tartibga rioya qiling."
  ],
  "examples": [
    {
      "title": "DELETE yoki TRUNCATE",
      "lang": "sql",
      "note": "Farqni sinash",
      "code": [
        "DELETE FROM logs;            -- sekin, qaytariladi, AUTO_INCREMENT davom etadi",
        "TRUNCATE TABLE logs;         -- tez, commit, AUTO_INCREMENT 1 dan",
        "",
        "DROP TABLE IF EXISTS tmp_import;",
        "CREATE TABLE tmp_import LIKE orders;      -- tuzilma nusxasi"
      ]
    },
    {
      "title": "View",
      "lang": "sql",
      "note": "Murakkab so'rovni nomlash",
      "code": [
        "CREATE OR REPLACE VIEW user_totals AS",
        "SELECT user_id, COUNT(*) AS orders_count, SUM(total) AS spent",
        "FROM orders GROUP BY user_id;",
        "SELECT * FROM user_totals WHERE spent > 1000;"
      ]
    }
  ],
  "pitfalls": [
    "`TRUNCATE`ni tranzaksiyada qaytariladi deb o'ylash (MySQL): commit qiladi.",
    "`DELETE FROM t` ni `WHERE`siz yozib qo'yish: hamma qator o'chadi (dev'da `--safe-updates`).",
    "`DROP DATABASE`/`DROP TABLE`ni production'da zaxirasiz bajarish.",
    "`FLOAT`/`DOUBLE`ni pul uchun ishlatish: `DECIMAL`.",
    "`CREATE TABLE ... AS SELECT` indeks/constraint'lar ko'chadi deb o'ylash.",
    "`utf8` (3 baytli) ishlatish: `utf8mb4` kerak (emoji)."
  ]
});
