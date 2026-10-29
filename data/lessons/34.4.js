/* Chuqur dars: 34.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.4", {
  "lesson": [
    "### GitHub'da code review",
    "Review — kodni merge'dan oldin ikkinchi ko'z bilan tekshirish. GitHub buning uchun qulay interfeys beradi.",
    "",
    "### Interfeys imkoniyatlari",
    "- **Qatorga izoh**: istalgan qator yoki bir nechta qator tanlab.",
    "- **Suggestion bloki**: aniq tuzatishni taklif qiladi, muallif bir bosishda commit qiladi.",
    "- **Review holatlari**: *Comment* (xulosasiz), *Approve* (tasdiq), *Request changes* (o'zgartirish talab qilinadi, merge'ni bloklaydi).",
    "- **\"Viewed\" belgisi**: ko'rib chiqilgan fayllarni belgilash.",
    "- **Conversation'larni hal qilish** (resolve).",
    "- **CODEOWNERS** orqali mas'ullar avtomatik so'raladi.",
    "",
    "### Samarali review tamoyillari",
    "- **Kontekst**: PR tavsifi va tiketni o'qing, maqsadni tushuning.",
    "- **Avtomatlashtirish**: uslub, format, oddiy xatolar CI va statik tahlil zimmasida. Reviewer **mantiq, dizayn, xavfsizlik va testlarga** e'tibor beradi.",
    "- **Aniq izoh**: nima muammo va nega (sabab bilan), imkon bo'lsa taklif.",
    "- `nit:` prefiksi: kichik, majburiy bo'lmagan takliflar uchun, muallif shoshmasin.",
    "- **Tez javob**: masalan, 1 ish kunida. Kutish eng katta sekinlashtirish.",
    "- Yaxshi narsani ham aytish.",
    "",
    "### Nimaga qarash kerak",
    "Mantiq to'g'riligi, chekka holatlar, xato holatlari, xavfsizlik (ruxsat tekshiruvi, kirishni tekshirish), testlar yetarliligi, ishlash (N+1), orqaga moslik, migratsiya xavfsizligi, o'qilishi.",
    "",
    "### Review madaniyati",
    "Izoh kodga, odamga emas. \"Sen xato qilding\" emas, \"bu holatda X bo'lishi mumkin\". Muallif ham izohni shaxsiy hujum deb qabul qilmaydi. Kelishmovchilikda qisqa qo'ng'iroq yoki qaror qabul qiluvchi."
  ],
  "examples": [
    {
      "title": "Suggestion bloki bilan taklif",
      "lang": "markdown",
      "code": [
        "IDOR xavfi: boshqa foydalanuvchining buyurtmasini ID bilan ochish mumkin.",
        "Egasi bo'yicha cheklab qidiring:",
        "",
        "```suggestion",
        "$order = $request->user()->orders()->findOrFail($id);",
        "```"
      ],
      "note": "Muallif \"Commit suggestion\" bilan o'zgarishni bir bosishda qabul qiladi."
    },
    {
      "title": "Izoh yozish tamoyili",
      "lang": "text",
      "code": [
        "Yomon:  \"Buni o'zgartir.\"",
        "Yaxshi: \"Bu yerda findOrFail($id) har qanday foydalanuvchi buyurtmasini qaytaradi (IDOR).",
        "         $request->user()->orders()->findOrFail($id) ishlatsak, ruxsat avtomatik tekshiriladi.\"",
        "nit:    \"nit: o'zgaruvchi nomi $o aniqroq bo'lsa yaxshi (masalan, $order).\""
      ],
      "note": "Sabab va taklif izohni foydali qiladi."
    }
  ],
  "pitfalls": [
    "Review'ni qo'lda uslub tekshiruviga sarflash: formatni Pint va statik tahlilga topshiring.",
    "Izohda sababni aytmaslik (\"o'zgartir\"): muallif nega ekanini tushunmaydi.",
    "Kunlab javob bermaslik: PR eskiradi va konfliktlar ko'payadi.",
    "Hammasiga \"Request changes\" berish: kichik taklifni majburiy talabdan ajratmaslik jamoani charchatadi."
  ]
});
