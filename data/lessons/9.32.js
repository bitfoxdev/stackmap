/* Chuqur dars: 9.32. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.32", {
  "lesson": [
    "### Asosiy buyruqlar",
    "```sql",
    "START TRANSACTION;          -- yoki BEGIN",
    "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
    "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
    "COMMIT;                     -- qat'iylashtirish",
    "-- yoki ROLLBACK;           -- hammasini bekor qilish",
    "```",
    "MySQL'da `autocommit` default **yoqiq**: har bitta buyruq alohida tranzaksiya. `START TRANSACTION` uni to'xtatib turadi. DDL, `LOCK TABLES` kabilar implicit commit qiladi (9.25).",
    "",
    "### SAVEPOINT",
    "```sql",
    "START TRANSACTION;",
    "INSERT INTO orders (user_id, total) VALUES (1, 100);",
    "SAVEPOINT after_order;",
    "INSERT INTO order_items (order_id, sku) VALUES (LAST_INSERT_ID(), 'X');   -- xato bo'ldi",
    "ROLLBACK TO SAVEPOINT after_order;      -- faqat item bekor, order qoladi",
    "COMMIT;                                  -- order saqlandi",
    "RELEASE SAVEPOINT after_order;           -- nuqtani olib tashlash (COMMIT/ROLLBACK ham tozalaydi)",
    "```",
    "`ROLLBACK TO SAVEPOINT` tranzaksiyani **yopmaydi** va undan keyingi savepoint'lar yo'qoladi. InnoDB'da qatorlar bo'yicha lock'lar savepoint'dan keyin olinganlari qaytishi mumkin (aniq xatti-harakat uchun docs).",
    "",
    "### Laravel",
    "`DB::transaction()` ichida yana `DB::transaction()` chaqirilsa Laravel `SAVEPOINT trans2` yuboradi; ichki xato faqat ichki nuqtagacha qaytaradi. Ichki exception tashqarida ushlansa tashqi tranzaksiya davom etadi, ushlanmasa — hammasi qaytadi. `DB::afterCommit` va `afterCommit` job'lari (2.x) commit'dan keyin ishlaydi.",
    "",
    "### Xavflar",
    "- Uzoq tranzaksiya: lock'larni ushlaydi, MVCC \"undo\" o'sadi, replikatsiya kechikadi; tashqi API chaqirmang.",
    "- Tranzaksiya ichida foydalanuvchi kutilmasin (interaktiv).",
    "- Deadlock (9.18) da butun tranzaksiya qaytadi: qayta urinish (`attempts`).",
    "- Isolation level (9.17) natijaga ta'sir qiladi.",
    "",
    "### Qoidalar",
    "1. Tranzaksiya qisqa va faqat bir mantiqiy ish uchun.",
    "2. Qisman xatoni qayta ishlash kerak bo'lsa `SAVEPOINT`.",
    "3. DDL'ni tranzaksiyaga aralashtirmang (MySQL).",
    "4. Tranzaksiyadan keyingi yon ta'sirlarni (email, job) `afterCommit` bilan yuboring."
  ],
  "examples": [
    {
      "title": "SAVEPOINT",
      "lang": "sql",
      "note": "Qisman qaytarish",
      "code": [
        "START TRANSACTION;",
        "INSERT INTO orders (user_id, total) VALUES (1, 100);",
        "SAVEPOINT s1;",
        "INSERT INTO audit_logs (action) VALUES ('try-bonus');",
        "ROLLBACK TO SAVEPOINT s1;     -- audit yozuvi bekor",
        "COMMIT;                        -- orders qoldi"
      ]
    },
    {
      "title": "Laravel ichma-ich",
      "lang": "php",
      "note": "Savepoint ostida",
      "code": [
        "DB::transaction(function () {",
        "    $order = Order::create([...]);",
        "    try {",
        "        DB::transaction(function () use ($order) {   // SAVEPOINT trans2",
        "            $order->items()->create([...]);",
        "        });",
        "    } catch (Throwable $e) {",
        "        report($e);                                    // faqat ichki qism qaytdi",
        "    }",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "`ROLLBACK TO SAVEPOINT`dan keyin tranzaksiya tugadi deb o'ylash: u ochiq, `COMMIT` kerak.",
    "`autocommit=1` da `COMMIT` kerak emas deb tranzaksiyaning boshlanmaganini unutish.",
    "Tranzaksiya ichida tashqi HTTP/email: uzoq lock va qaytarib bo'lmas yon ta'sir.",
    "DDL'ni savepoint/tranzaksiya ichida bajarib, qaytariladi deb kutish (MySQL).",
    "Ichki exception'ni yutib, tashqi tranzaksiyani buzilgan holatda `COMMIT` qilish.",
    "Deadlock'da qayta urinishsiz qoldirish."
  ]
});
