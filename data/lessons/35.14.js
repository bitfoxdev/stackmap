/* Chuqur dars: 35.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.14", {
  "lesson": [
    "### GitLab Security Scanning va DevSecOps",
    "An'anaviy yondashuvda xavfsizlik tekshiruvlari loyiha to'liq ishlab chiqilib, productionga chiqishidan bir necha kun oldin o'tkazilardi. Bu 'kechki' xatolarni tuzatish juda qimmatga tushadi. GitLab **DevSecOps** tamoyiliga asoslangan bo'lib, xavfsizlik tekshiruvlarini dasturchining har bir commitiga (Shift Left Security) olib keladi.",
    "",
    "### Asosiy xavfsizlik skanerlari",
    "- **SAST (Static Application Security Testing)**: Kodni ishga tushirmasdan, statik tahlil orqali xavfli joylarni (SQL Injection, XSS, zaif funksiyalar) aniqlaydi. PHP uchun Semgrep va boshqa analizatorlar ishlatiladi.",
    "- **Secret Detection**: Kod ichida bexosdan qolib ketgan parollar, AWS kalitlari, Stripe tokenlari yoki shaxsiy sertifikatlarni qidiradi va commit qilinishini to'xtatadi.",
    "- **Dependency Scanning**: `composer.lock` yoki `package-lock.json` fayllarini tekshirib, foydalanilayotgan tashqi paketlarda ma'lum bo'lgan zaifliklar (CVE) bor-yo'qligini xabar qiladi.",
    "- **Container Scanning**: Qurilgan Docker imidj ichidagi operatsion tizim (Debian/Alpine paketlari) xavfsizlik xatolarini tekshiradi.",
    "- **DAST (Dynamic Application Security Testing)**: Ishlab turgan test ilovasiga tashqi tomondan xakerlik hujumlarini simulyatsiya qiladi.",
    "",
    "### Merge Request dagi Xavfsizlik Widgeti",
    "Eng ajoyib jihati — skaner natijalari alohida PDF hisobot bo'lib emas, bevosita Merge Request oynasida widget ko'rinishida chiqadi. Dasturchi kodni merge qilishdan oldin o'zi kiritgan zaiflikni ko'radi va darhol tuzatadi."
  ],
  "examples": [
    {
      "title": ".gitlab-ci.yml ga rasmiy xavfsizlik shablonlarini ulash",
      "lang": "yaml",
      "code": [
        "include:",
        "  - template: 'Security/SAST.gitlab-ci.yml'",
        "  - template: 'Security/Secret-Detection.gitlab-ci.yml'",
        "  - template: 'Security/Dependency-Scanning.gitlab-ci.yml'",
        "",
        "# Kerak bo'lsa sozlamalarni o'zgartirish",
        "variables:",
        "  SAST_EXCLUDED_PATHS: 'spec, test, tests, tests/'",
        "  SECRET_DETECTION_HISTORIC_SCAN: 'false'"
      ],
      "note": "GitLab ning tayyor shablonlari avtomatik stage larni ochadi va skanerlarni boshqaradi."
    },
    {
      "title": "Secret Detection tomonidan xatolik tutilishi",
      "lang": "text",
      "code": [
        "[CRITICAL] AWS Access Key ID detected in config/services.php:14",
        "Confidence: High",
        "Action: Revoke key immediately and rotate secrets."
      ],
      "note": "Xatolik darhol ko'rsatilib, sir fosh bo'lishining oldi olinadi."
    }
  ],
  "pitfalls": [
    "Barcha skanerlarni birdan yoqib yuborib, CI pipeline vaqtini 1 soatga cho'zib yuborish (kichikdan boshlab optimallashtirish zarur).",
    "False positive (yolg'on xavf) larni to'g'ri baholamasdan, skanerlarni butunlay o'chirib qo'yish.",
    "Dependency scanning xabarlarini e'tiborsiz qoldirib, eskirgan va teshik tashqi kutubxonalarni yillab yangilamaslik."
  ]
});
