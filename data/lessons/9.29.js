/* Chuqur dars: 9.29. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.29", {
  "lesson": [
    "### Sintaksis (MySQL 8)",
    "```sql",
    "CREATE USER 'app'@'10.0.%' IDENTIFIED BY '********';",
    "GRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'app'@'10.0.%';",
    "GRANT SELECT ON shop.orders TO 'report'@'%';",
    "GRANT SELECT (id, status) ON shop.orders TO 'support'@'%';      -- ustun darajasida",
    "REVOKE DELETE ON shop.* FROM 'app'@'10.0.%';",
    "SHOW GRANTS FOR 'app'@'10.0.%';",
    "DROP USER 'old'@'%';",
    "```",
    "MySQL 8 da `GRANT` foydalanuvchi **yaratmaydi**: avval `CREATE USER`. Foydalanuvchi `'ism'@'host'` juftligi bilan aniqlanadi. `GRANT`/`REVOKE` ni ishlatsangiz `FLUSH PRIVILEGES` kerak emas (jadvalni qo'lda o'zgartirsangiz kerak).",
    "",
    "### Daraja",
    "Global (`*.*`), baza (`shop.*`), jadval (`shop.orders`), ustun, protsedura. Imkon qadar tor daraja.",
    "",
    "### Rollar (MySQL 8.0)",
    "```sql",
    "CREATE ROLE 'reader';",
    "GRANT SELECT ON shop.* TO 'reader';",
    "GRANT 'reader' TO 'analyst'@'%';",
    "SET DEFAULT ROLE 'reader' TO 'analyst'@'%';",
    "```",
    "PostgreSQL'da: `GRANT ... TO role`, sxema uchun `GRANT USAGE ON SCHEMA`, standart ruxsatlar `ALTER DEFAULT PRIVILEGES`.",
    "",
    "### Eng kam huquq",
    "- **app**: DML kerakli jadvallarda. `DROP`, `ALTER`, `CREATE`, `GRANT OPTION`, `FILE`, `SUPER` yo'q.",
    "- **migrator**: DDL (deploy vaqtida).",
    "- **report/read replica**: faqat `SELECT`.",
    "- `root`/`ALL PRIVILEGES` ni ilovada ishlatmang: SQL injection (9.22) dan zarar katta bo'ladi.",
    "",
    "### Laravel",
    "`config/database.php` da `read`/`write` ulanishlari yoki alohida `reporting` connection; migration'lar alohida `DB_USERNAME` bilan (CI'da).",
    "",
    "### Qoidalar",
    "1. Har servis — alohida hisob.",
    "2. `ALL PRIVILEGES`/`root` ilovaga berilmaydi.",
    "3. Parollar maxfiy menejerda; hostni cheklang (`'app'@'10.0.%'`).",
    "4. Huquqlarni vaqti-vaqti bilan audit qiling (`SHOW GRANTS`)."
  ],
  "examples": [
    {
      "title": "Hisoblar",
      "lang": "sql",
      "note": "Uch rol",
      "code": [
        "CREATE USER 'app'@'10.0.%'      IDENTIFIED BY '********';",
        "CREATE USER 'migrator'@'10.0.%' IDENTIFIED BY '********';",
        "CREATE USER 'report'@'%'        IDENTIFIED BY '********';",
        "",
        "GRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'app'@'10.0.%';",
        "GRANT ALL ON shop.* TO 'migrator'@'10.0.%';",
        "GRANT SELECT ON shop.* TO 'report'@'%';"
      ]
    },
    {
      "title": "Tekshirish",
      "lang": "sql",
      "note": "Ruxsatni ko'rish va qaytarish",
      "code": [
        "SHOW GRANTS FOR 'app'@'10.0.%';",
        "REVOKE INSERT, UPDATE, DELETE ON shop.audit_logs FROM 'app'@'10.0.%';"
      ]
    }
  ],
  "pitfalls": [
    "Ilovani `root` bilan ulash: SQL injection butun serverga yetadi.",
    "`GRANT ALL ... WITH GRANT OPTION` ni oddiy hisobga berish.",
    "`'user'@'%'` (har qanday host) ni keraksiz ishlatish.",
    "Parolni kodda/repoda saqlash.",
    "MySQL 8 da `GRANT ... IDENTIFIED BY` bilan foydalanuvchi yaratmoqchi bo'lish (xato).",
    "`REVOKE` dan keyin darrov kuchga kirishini kutish: MySQL'da global huquq o'zgarishi yangi ulanishlarda, baza darajasi keyingi `USE` dan keyin ko'rinadi (mavjud ulanishni uzib tekshiring)."
  ]
});
