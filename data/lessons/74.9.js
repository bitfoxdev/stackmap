/* Chuqur dars: 74.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.9", {
  "lesson": [
    "### Contract testlari",
    "Contract test ikki servis (mikroservislar yoki tashqi API va uning iste'molchisi) o'rtasidagi **kelishilgan ma'lumot almashish formatini** mustaqil tekshiradi. Maqsad: bir servis o'zgarsa, boshqasi jim buzilmasin.",
    "",
    "### Muammo",
    "Servis A servis B'dan ma'lum javobni kutadi. B jamoasi maydon nomini o'zgartiradi, A jamoasi bilmaydi, productionda A sinadi. Odatiy yechim (hamma servisni birga ko'tarib E2E qilish) sekin va murakkab.",
    "",
    "### Consumer-Driven Contract",
    "Pact kabi vositalarda **iste'molchi** o'zi nimaga tayanishini yozadi:",
    "1. Iste'molchi (A) kutayotgan so'rov va javobni **kontrakt** sifatida yozadi (iste'molchi testi mock server ustida ishlaydi).",
    "2. Kontrakt fayli (pact) ta'minotchiga (B) beriladi.",
    "3. Ta'minotchi (B) o'z CI'sida kontraktni haqiqiy kodiga qarshi tekshiradi (provider verification).",
    "",
    "Shunday qilib B kontraktni buzuvchi o'zgarish qilsa, B'ning o'z CI'sida yiqiladi, A bilan birga ko'tarish kerak emas.",
    "",
    "### Afzalliklari",
    "- Servislar mustaqil tekshiriladi, tez.",
    "- Buzuvchi o'zgarishlar deploy'dan oldin topiladi.",
    "- Iste'molchi talablari aniq hujjatlanadi.",
    "",
    "### PHP'da",
    "`pact-foundation/pact-php` kutubxonasi. Oddiyroq variant: JSON sxema (JSON Schema, OpenAPI) bilan javob formatini tekshirish.",
    "",
    "### Qachon kerak",
    "Mikroservislar, ommaviy API iste'molchilari, mobil ilova va backend o'rtasida. Monolit va bitta jamoa uchun odatda ortiqcha: feature testlar yetarli."
  ],
  "examples": [
    {
      "title": "Kontrakt g'oyasi",
      "lang": "text",
      "code": [
        "Iste'molchi (A) testi  -> pact fayli: \"GET /api/users/1 -> 200 {id:int, email:string}\"",
        "Ta'minotchi (B) CI      -> pact faylini haqiqiy API'ga qarshi tekshiradi",
        "B maydon nomini o'zgartirsa -> B'ning CI'sida yiqiladi, productionda emas"
      ],
      "note": "Kontrakt iste'molchining ehtiyojidan yoziladi."
    },
    {
      "title": "JSON sxema bilan oddiy variant",
      "lang": "php",
      "code": [
        "it('keeps the user payload contract', function () {",
        "    $response = $this->actingAs($admin)->getJson(\"/api/users/{$user->id}\")->assertOk();",
        "",
        "    expect($response->json('data'))",
        "        ->toHaveKeys(['id', 'email', 'name'])",
        "        ->and($response->json('data.id'))->toBeInt()",
        "        ->and($response->json('data.email'))->toBeString();",
        "});"
      ],
      "note": "Pact bo'lmasa ham, tuzilma va tip tekshiruvi shartnomani himoya qiladi."
    }
  ],
  "pitfalls": [
    "Monolitda Pact o'rnatish: murakkablik foydadan ko'p, feature testlar yetarli.",
    "Kontraktni ta'minotchi yozishi: iste'molchi haqiqiy ehtiyojlari aks etmaydi.",
    "Kontraktni ortiqcha qattiq qilish: iste'molchi ishlatmaydigan maydonlarni ham talab qilsa, har o'zgarish buzuvchi bo'ladi.",
    "Provider verification'ni CI'ga qo'shmaslik: kontrakt bor, lekin hech kim tekshirmaydi."
  ]
});
