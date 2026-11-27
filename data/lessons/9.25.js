/* Chuqur dars: 9.25. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.25", {
  "lesson": [
    "### Guruhlar",
    "| Guruh | Maqsad | Buyruqlar |",
    "|---|---|---|",
    "| **DDL** | Tuzilma (sxema) | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |",
    "| **DML** | Ma'lumot | `SELECT`, `INSERT`, `UPDATE`, `DELETE` (`MERGE`/`UPSERT`) |",
    "| **DCL** | Ruxsat | `GRANT`, `REVOKE` |",
    "| **TCL** | Tranzaksiya | `START TRANSACTION`/`BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |",
    "",
    "### Nega muhim",
    "- **Tranzaksiya va DDL**: MySQL'da DDL buyruqlari **implicit commit** qiladi: ochiq tranzaksiya avtomatik tugaydi va `ROLLBACK` uni qaytara olmaydi. PostgreSQL'da DDL tranzaksiyali (migration'ni qaytarish mumkin). Shuning uchun MySQL'da migration yarim yo'lda to'xtasa, qo'lda tozalash kerak.",
    "- **Ruxsat**: ilova foydalanuvchisiga odatda faqat DML kerak, DDL emas (9.29).",
    "- **Laravel**: migration — DDL, Eloquent/Query Builder — DML, `DB::transaction` — TCL.",
    "",
    "### Sintaksis qatlamlari",
    "Standart SQL hamma DBMS'da bir xil emas: `AUTO_INCREMENT` (MySQL) va `GENERATED ... AS IDENTITY`/`SERIAL` (PostgreSQL), `MODIFY` (MySQL) va `ALTER COLUMN ... TYPE` (PostgreSQL). Dars standartni, MySQL farqini alohida ko'rsatadi.",
    "",
    "### Ketma-ketlik",
    "Odatiy ish: DDL (jadval) → DML (to'ldirish/so'rov) → TCL (atomiklik) → DCL (kim nimani qila oladi).",
    "",
    "### Qoidalar",
    "1. Buyruqni guruhi bilan eslang: u qaytariladimi yo'qmi shundan ma'lum bo'ladi.",
    "2. MySQL'da DDL'ni tranzaksiya ichiga qo'ymang: u commit qiladi.",
    "3. Ilova hisobiga DDL ruxsatini bermang (production)."
  ],
  "examples": [
    {
      "title": "Hammasi bir joyda",
      "lang": "sql",
      "note": "DDL, DML, TCL",
      "code": [
        "CREATE TABLE accounts (id BIGINT PRIMARY KEY AUTO_INCREMENT, owner VARCHAR(100) NOT NULL, balance DECIMAL(12,2) NOT NULL DEFAULT 0);  -- DDL",
        "",
        "START TRANSACTION;                                   -- TCL",
        "INSERT INTO accounts (owner, balance) VALUES ('Ali', 100);   -- DML",
        "UPDATE accounts SET balance = balance - 30 WHERE owner = 'Ali';",
        "ROLLBACK;                                            -- DML qaytarildi",
        "SELECT * FROM accounts;                              -- bo'sh"
      ]
    },
    {
      "title": "DDL implicit commit",
      "lang": "sql",
      "note": "MySQL'da ROLLBACK ishlamaydi",
      "code": [
        "START TRANSACTION;",
        "INSERT INTO accounts (owner) VALUES ('Vali');",
        "ALTER TABLE accounts ADD COLUMN note VARCHAR(50);    -- implicit COMMIT shu yerda",
        "ROLLBACK;                                            -- INSERT allaqachon commit bo'lgan"
      ]
    }
  ],
  "pitfalls": [
    "MySQL'da DDL'ni tranzaksiya ichida \"qaytarish mumkin\" deb o'ylash: DDL commit qiladi.",
    "Migration'ni production'da yarim yo'lda to'xtatib qo'yish: MySQL'da qisman o'zgarish qoladi.",
    "`TRUNCATE`ni DML deb o'ylash: u DDL, `DELETE` kabi qaytarilmaydi (MySQL).",
    "Dialekt farqini e'tiborsiz qoldirish (`MODIFY`, `AUTO_INCREMENT` boshqa DBMS'da ishlamaydi).",
    "Ilova foydalanuvchisiga DDL va `GRANT` huquqini berish.",
    "`SELECT`ni \"ma'lumot o'zgartirmaydi\" deb tranzaksiya/lock'dan tashqarida deb qarash (`FOR UPDATE` lock oladi)."
  ]
});
