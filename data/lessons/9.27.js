/* Chuqur dars: 9.27. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.27", {
  "lesson": [
    "### Asosiy shakllar",
    "```sql",
    "ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL AFTER email;",
    "ALTER TABLE users DROP COLUMN phone;",
    "ALTER TABLE users MODIFY COLUMN name VARCHAR(255) NOT NULL;     -- MySQL",
    "-- PostgreSQL: ALTER TABLE users ALTER COLUMN name TYPE VARCHAR(255);",
    "",
    "ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);",
    "ALTER TABLE orders ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id);",
    "ALTER TABLE orders ADD CONSTRAINT ck_total CHECK (total >= 0);  -- MySQL 8.0.16+ da amalda",
    "ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'new';",
    "ALTER TABLE orders DROP FOREIGN KEY fk_orders_user;             -- MySQL",
    "ALTER TABLE users DROP INDEX uq_users_email;",
    "```",
    "MySQL'da `CHECK` 8.0.16 gacha sintaksis qabul qilinsa ham **bajarilmagan**. Constraint'ni o'chirish MySQL'da turiga qarab (`DROP FOREIGN KEY`, `DROP INDEX`, `DROP CHECK`; yangi versiyalarda umumiy `DROP CONSTRAINT`); versiyangizni tekshiring.",
    "",
    "### Constraint turlari (9.11–9.13)",
    "`PRIMARY KEY`, `UNIQUE`, `NOT NULL`, `FOREIGN KEY`, `CHECK`, `DEFAULT`. Mavjud ma'lumot constraint'ga zid bo'lsa (`NOT NULL` ga NULL qatorlar bor) `ALTER` xato beradi — avval ma'lumotni to'g'rilang.",
    "",
    "### Katta jadvalda xavf",
    "`ALTER` metadata lock oladi va uzoq tranzaksiya orqasida navbatda tursa, boshqa so'rovlarni ham bloklaydi. MySQL (InnoDB) algoritmlari:",
    "- `ALGORITHM=INSTANT` (8.0.12+): faqat metadata, ko'p `ADD COLUMN` hollarida.",
    "- `INPLACE`: jadvalni to'liq nusxalamaydi, ko'pincha DML ruxsat (`LOCK=NONE`).",
    "- `COPY`: jadvalni qayta yaratadi, uzoq va yozuvni bloklaydi.",
    "Aniq yozing: `ALTER TABLE ... ALGORITHM=INPLACE, LOCK=NONE;` — mumkin bo'lmasa xato beradi (jim qimmat variantga o'tmaydi). Juda katta jadvallar uchun `pt-online-schema-change`/`gh-ost`.",
    "",
    "### Xavfsiz NOT NULL qo'shish",
    "1. `ADD COLUMN x ... NULL`.",
    "2. Kod yangi ustunni yoza boshlaydi; eski qatorlarni **bo'laklab** to'ldiring.",
    "3. `MODIFY x ... NOT NULL` (yoki `DEFAULT` bilan).",
    "Bu (ikki bosqichli deploy) zero-downtime uchun.",
    "",
    "### Laravel",
    "`Schema::table(...)` migration'lari; `->nullable()->change()`, indeks qo'shish. Production'da katta jadval migration'ini ish vaqtidan tashqarida va alohida deploy qadami sifatida.",
    "",
    "### Qoidalar",
    "1. Katta jadvalda avval staging'da vaqtni o'lchang.",
    "2. `ALGORITHM`/`LOCK` ni aniq ko'rsating.",
    "3. `NOT NULL`ni bosqichma-bosqich qo'shing.",
    "4. Migration'ni orqaga qaytarish rejasi (`down`) bo'lsin."
  ],
  "examples": [
    {
      "title": "Xavfsiz ketma-ketlik",
      "lang": "sql",
      "note": "Ustun qo'shish va to'ldirish",
      "code": [
        "ALTER TABLE users ADD COLUMN country_code CHAR(2) NULL, ALGORITHM=INSTANT;",
        "-- ilova yangi ustunni yoza boshlaydi, eski qatorlar bo'lak-bo'lak:",
        "UPDATE users SET country_code = 'UZ' WHERE country_code IS NULL AND id BETWEEN 1 AND 10000;",
        "-- hammasi to'lgach:",
        "ALTER TABLE users MODIFY country_code CHAR(2) NOT NULL DEFAULT 'UZ';"
      ]
    },
    {
      "title": "Constraint",
      "lang": "sql",
      "note": "Qo'shish va o'chirish",
      "code": [
        "ALTER TABLE orders ADD CONSTRAINT ck_orders_total CHECK (total >= 0);",
        "ALTER TABLE orders ADD UNIQUE INDEX uq_orders_number (number);",
        "ALTER TABLE orders DROP INDEX uq_orders_number;"
      ]
    }
  ],
  "pitfalls": [
    "Katta jadvalda `ALTER`ni sinamay ish vaqtida ishga tushirish: uzoq lock.",
    "Uzoq tranzaksiya ochiq turganda `ALTER` navbatda turib hamma so'rovni bloklaydi (metadata lock).",
    "Mavjud NULL'li ustunga bevosita `NOT NULL` qo'yish: xato.",
    "Tur qisqartirish (`VARCHAR(255)` → `VARCHAR(50)`): ma'lumot kesiladi yoki xato.",
    "MySQL 8.0.16 dan oldin `CHECK` bajarilmasligini bilmaslik.",
    "`DROP COLUMN`ni kod hali ishlatayotgan paytda bajarish: deploy tartibi (avval kod, keyin DDL)."
  ]
});
