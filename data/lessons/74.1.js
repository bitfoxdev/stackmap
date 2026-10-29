/* Chuqur dars: 74.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.1", {
  "lesson": [
    "### Test piramidasi",
    "Test piramidasi — turli testlar nisbatini ko'rsatuvchi model. Asosda **ko'p** tez va arzon unit testlar, o'rtada **o'rtacha** miqdordagi integratsion va feature testlar, cho'qqida **kam** sekin va qimmat end-to-end (E2E) testlar turadi.",
    "",
    "### Nima uchun shunday",
    "Har testning narxi va qiymati bor:",
    "- **Unit**: millisekund, barqaror, xatoni aniq joyga ko'rsatadi. Lekin qismlarning birgalikdagi ishini ko'rmaydi.",
    "- **Integratsion/feature**: sekundning ulushi, haqiqiy DB va stek bilan ishlaydi. Ishonch yuqori, narx o'rtacha.",
    "- **E2E**: soniyalar, brauzer va butun tizim. Eng haqiqiy, lekin sekin, mo'rt va yiqilganda sababini topish qiyin.",
    "",
    "Piramida qimmat va sekin testlarni kam, arzon va tezlarni ko'p qilishni tavsiya qiladi.",
    "",
    "### Anti-pattern: muzqaymoq konusi",
    "Teskari holat: ko'p E2E (qo'lda yoki brauzer orqali), kam unit. CI soatlab ishlaydi, testlar tasodifan yiqiladi, dasturchilar ularga ishonmaydi. Bu ko'pincha mavjud ilovaga testlar keyinroq qo'shilganda ro'y beradi.",
    "",
    "### Laravel'da",
    "Laravel feature testlari tez va ifodali bo'lgani uchun \"piramida\" ba'zan **olmos**ga o'xshaydi: unit kam, feature ko'p. Bu ham maqbul, agar testlar tez va barqaror bo'lsa. Muhimi — nisbat: E2E kam, qolgani tez.",
    "",
    "### Praktik qoida",
    "Xatoni **eng quyi** qatlamda ushlang: hisob-kitob xatosi unit testda, SQL xatosi integratsion testda, oqim xatosi feature testda. Yuqori qatlam faqat quyi sinay olmaydigan narsani (integratsiya, brauzer) tekshirsin."
  ],
  "examples": [
    {
      "title": "Qatlamlar va nisbat",
      "lang": "text",
      "code": [
        "E2E (Dusk/Playwright)     ~ 5-10 ta   kritik foydalanuvchi yo'llari",
        "Integratsion / Feature    ~ yuzlab    endpoint, DB, navbat, xato yo'llari",
        "Unit                      ~ minglab   hisob-kitob, qoidalar, value object"
      ],
      "note": "Raqamlar mo'ljal, qoida emas: asosiysi yuqoriga ko'tarilgan sari testlar kamayadi."
    },
    {
      "title": "Xatoni quyi qatlamda ushlash",
      "lang": "php",
      "code": [
        "// Unit: qoida",
        "it('rounds the tax half up', fn () => expect(Tax::of(Money::uzs(10_050), 12)->amount())->toEqual(Money::uzs(1_206)));",
        "",
        "// Feature: ulanish",
        "it('shows the tax on the invoice', function () {",
        "    $this->actingAs($user)->getJson(\"/api/invoices/{$invoice->id}\")",
        "        ->assertJsonPath('data.tax', 1_206);",
        "});",
        "",
        "// E2E: faqat brauzerda ko'rinadigan narsa (bitta kritik yo'l)"
      ],
      "note": "Qoida unit'da, uning ulanishi feature'da tekshiriladi, E2E ularni takrorlamaydi."
    }
  ],
  "pitfalls": [
    "Hamma narsani E2E bilan testlash: CI sekin, testlar mo'rt, xato joyini topish qiyin (muzqaymoq konusi).",
    "Faqat unit testlar bilan cheklanish: qismlar to'g'ri, lekin birgalikda ishlamaydi.",
    "Nisbatni o'lchamaslik: qaysi qatlamda nechta test borligini bilmay, ular beixtiyor teskari bo'lib qoladi.",
    "Bir xil xatti-harakatni uchala qatlamda ham takrorlash: xarajat ortadi, qiymat oshmaydi."
  ]
});
