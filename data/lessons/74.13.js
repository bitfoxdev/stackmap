/* Chuqur dars: 74.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.13", {
  "lesson": [
    "### Flaky testlar",
    "Flaky test — kod o'zgarmasa ham gohida o'tib, gohida yiqiladigan test. U eng zararli test turlaridan: jamoani qizil natijaga ko'niktiradi va haqiqiy xatoni \"yana tasodifiy yiqildi\" deb e'tiborsiz qoldiradi. Natijada testlarga ishonch yo'qoladi.",
    "",
    "### Odatiy sabablar",
    "- **Vaqtga bog'liqlik**: `now()` bilan solishtirish, kun oxiri yoki yarim tunda yiqilish. Yechim: `travelTo()`, `freezeTime()`, `Carbon::setTestNow()`.",
    "- **Tartiblanmagan so'rovlar**: `orderBy`siz \"birinchi\" elementni olish. Natija tasodifiy.",
    "- **Tasodifiy ma'lumot**: Faker qiymati ba'zan chegaraga tushadi (juda uzun nom, noyob qiymat to'qnashuvi).",
    "- **Asinxron kutish**: tugallanmagan navbat yoki brauzer animatsiyasi uchun qat'iy `sleep`.",
    "- **Umumiy resurslar**: parallel testlarda bir xil Redis kaliti, fayl nomi, port.",
    "- **Test tartibiga bog'liqlik**: oldingi test holat qoldiradi.",
    "- **Tashqi servis**: tarmoq, sandbox beqarorligi.",
    "",
    "### Aniqlash",
    "- `--order-by=random` (yoki Pest `--order-by=random`): tartibga bog'liqlikni ochadi.",
    "- Shubhali testni ko'p marta ketma-ket yurgizish.",
    "- CI'da yiqilish statistikasi: qaysi test tez-tez yiqiladi.",
    "",
    "### Tuzatish",
    "Sababni toping va yo'q qiling: vaqtni qotiring, tartibni belgilang, tasodifiy qiymatni aniq qiling, kutishni shartli qiling. Qayta ishga tushirish (retry) bilan yashirish — vaqtinchalik chora, u haqiqiy poyga holatini yashiradi.",
    "",
    "### Karantin",
    "Tuzatib bo'lmasa, testni karantinga oling (alohida guruh, asosiy to'plamdan tashqari) va muddatli vazifa bering. Flaky testni indamay qoldirish yomon odat."
  ],
  "examples": [
    {
      "title": "Vaqtni qotirish",
      "lang": "php",
      "code": [
        "// ❌ yarim tunda yiqiladi",
        "it('marks the trial as expired after 14 days', function () {",
        "    $user = User::factory()->create(['created_at' => now()->subDays(14)]);",
        "    expect($user->trialExpired())->toBeTrue();",
        "});",
        "",
        "// ✅ vaqt qotirilgan",
        "it('marks the trial as expired after 14 days', function () {",
        "    $this->freezeTime();",
        "    $user = User::factory()->create(['created_at' => now()->subDays(14)]);",
        "",
        "    expect($user->trialExpired())->toBeTrue();",
        "",
        "    $this->travel(-1)->minutes();",
        "    expect($user->trialExpired())->toBeFalse();",
        "});"
      ],
      "note": "freezeTime() soatni to'xtatadi, shuning uchun test har doim bir xil."
    },
    {
      "title": "Aniq tartib",
      "lang": "php",
      "code": [
        "// ❌ birinchi element tartibsiz",
        "$latest = Order::first();",
        "",
        "// ✅ aniq saralash",
        "$latest = Order::orderByDesc('created_at')->orderByDesc('id')->first();",
        "",
        "// tartibga bog'liqlikni topish",
        "// php artisan test --order-by=random"
      ],
      "note": "Teng qiymatlar uchun ikkilamchi kalit (id) tartibni barqaror qiladi."
    }
  ],
  "pitfalls": [
    "Yiqilgan testni qayta ishga tushirib o'tkazib yuborish: haqiqiy poyga holati yoki izolyatsiya xatosi yashirinadi.",
    "Qat'iy `sleep()` bilan kutish: sekin va baribir beqaror. Shartli kutishdan foydalaning.",
    "Vaqtni qotirmaslik: test faqat ma'lum soatlarda yoki sana chegarasida yiqiladi.",
    "Flaky testni karantinga olib, unutib yuborish: u butunlay yo'qolib, himoyasiz joy qoladi."
  ]
});
