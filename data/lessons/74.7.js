/* Chuqur dars: 74.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.7", {
  "lesson": [
    "### Regressiya testlari",
    "Regressiya testi — productionda yoki ishlab chiqish paytida topilgan nosozlik qaytib kelmasligini kafolatlaydigan test. Har bug aslida \"testda yo'q holat\" belgisi: regressiya testi shu bo'shliqni yopadi.",
    "",
    "### Oltin qoida",
    "Bugni tuzatishdan **oldin** uni aynan takrorlaydigan yiqiladigan (qizil) test yozing. Keyin kodni tuzating: test yashil bo'ladi. Natijada:",
    "- Bugni haqiqatan tushunganingiz isbotlanadi.",
    "- Tuzatish ishlayotgani tasdiqlanadi.",
    "- Bug loyiha umri davomida takrorlanmaydi.",
    "",
    "### Yaxshi regressiya testi",
    "- **Minimal ma'lumot** bilan aynan buzuq holatni qayta yaratadi.",
    "- Nomi yoki izohida **bug raqami** va qisqa tavsif turadi (keyinchalik nima uchun bu test borligi ma'lum bo'ladi).",
    "- Eng quyi mumkin bo'lgan qatlamda yoziladi: unit bo'lsa unit, aks holda feature.",
    "",
    "### Qayerda yoziladi",
    "Ko'pchilik bugni quyi qatlamda ushlash mumkin (masalan, noto'g'ri hisoblash — unit). Lekin ba'zan bug qatlamlar o'rtasidagi ulanishda bo'ladi, unda integratsion yoki feature test kerak. Eng arzon, lekin bugni ushlay oladigan darajani tanlang.",
    "",
    "### Test va tuzatish birga",
    "Test va tuzatish bitta commit yoki PR'da bo'lsin. Shunda tarixda bug va uning himoyasi birga ko'rinadi.",
    "",
    "### Regressiyalar to'plami",
    "Vaqt o'tib regressiya testlari ilovaning \"og'riqli joylari\" xaritasiga aylanadi: qayerda ko'p xato bo'lgani ko'rinadi. Bu refactoring va yangi xususiyatlar uchun ishonch beradi."
  ],
  "examples": [
    {
      "title": "Bug uchun test",
      "lang": "php",
      "code": [
        "// Bug #1287: kabisa yilida yillik obuna muddati noto'g'ri hisoblangan",
        "it('extends a yearly subscription from Feb 29 to Feb 28', function () {",
        "    $subscription = Subscription::startingAt('2024-02-29', period: 'yearly');",
        "",
        "    expect($subscription->endsAt()->toDateString())->toBe('2025-02-28');",
        "});"
      ],
      "note": "Avval qizil bo'ladi, tuzatishdan keyin yashil."
    },
    {
      "title": "Ish tartibi",
      "lang": "text",
      "code": [
        "1. Bug xabari -> qayta yaratish",
        "2. Yiqiladigan test  -> RED",
        "3. Minimal tuzatish  -> GREEN",
        "4. Barcha testlar yashil -> commit (test + tuzatish birga)"
      ],
      "note": "Bug ikki marta takrorlanmaydi."
    }
  ],
  "pitfalls": [
    "Bugni test yozmasdan tuzatish: u keyin yana qaytib, vaqt oladi.",
    "Test bug'ni haqiqatan takrorlamasligi: tuzatishdan oldin ham yashil bo'ladi, ya'ni foydasiz.",
    "Regressiya testini juda yuqori qatlamda yozish: sekin va mo'rt, aslida unit yetarli edi.",
    "Testda bug raqami va tavsifini qoldirmaslik: keyin nima uchun borligi noma'lum, o'chirib yuboriladi."
  ]
});
