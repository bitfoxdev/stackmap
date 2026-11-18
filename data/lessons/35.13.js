/* Chuqur dars: 35.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.13", {
  "lesson": [
    "### GitLab Package Registry nima uchun kerak",
    "Katta korxonalarda turli mikroxizmatlar va loyihalar o'rtasida umumiy kodlarni (masalan: to'lov tizimlari SDK si, ichki autentifikatsiya middleware lari, DTO lar) qayta ishlatish zarurati tug'iladi. Ushbu kodlarni nusxalab yurish (copy-paste) texnik qarzdorlikni oshiradi. Ommaviy registry larga (Packagist, npm) joylash esa tijorat sirlarini fosh qiladi.",
    "",
    "**GitLab Package Registry** — xususiy korporativ paketlar ombori bo'lib, quyidagi texnologiyalarni qo'llab-quvvatlaydi:",
    "- **Composer** (PHP / Laravel paketlari)",
    "- **npm** (Frontend / Node.js kutubxonalari)",
    "- **Maven / Gradle** (Java / Kotlin)",
    "- **PyPI** (Python) va Generic (istalgan binary fayllar).",
    "",
    "### Composer paketlarini GitLab da saqlash",
    "Laravel va PHP da ichki paketni chiqarish uchun GitLab API orqali maxsus endpointdan foydalaniladi:",
    "`https://gitlab.acme.com/api/v4/projects/<project_id>/packages/composer`.",
    "",
    "Iste'molchi loyiha o'zining `composer.json` faylida ushbu guruh yoki loyiha registry manzilini e'lon qiladi. Avtorizatsiya esa dasturchining shaxsiy paroli bilan emas, balki maxsus **Deploy Token** yoki CI/CD token orqali xavfsiz ta'minlanadi.",
    "",
    "### CI/CD orqali nashr qilish",
    "Paket repozitoriyasiga yangi reliz tagi (`v1.2.0`) qo'yilganda, CI pipeline avtomatik tarzda GitLab Package Registry ga yangi versiyani ro'yxatdan o'tkazadi."
  ],
  "examples": [
    {
      "title": "composer.json ga xususiy GitLab Package Registry ni ulash",
      "lang": "json",
      "code": [
        "{",
        "  \"repositories\": [",
        "    {",
        "      \"type\": \"composer\",",
        "      \"url\": \"https://gitlab.acme.com/api/v4/group/15/-/packages/composer/\"",
        "    }",
        "  ],",
        "  \"require\": {",
        "    \"acme/shared-billing-sdk\": \"^1.2\"",
        "  }",
        "}"
      ],
      "note": "15-raqamli guruhdagi barcha ichki paketlar Packagist kabi yuklab olinadi."
    },
    {
      "title": "auth.json da token orqali xavfsiz ulanish",
      "lang": "json",
      "code": [
        "{",
        "  \"gitlab-token\": {",
        "    \"gitlab.acme.com\": \"glpat-xxxxxxxxxxxxxxxxxxxx\"",
        "  }",
        "}"
      ],
      "note": "auth.json gitga qo'shilmaydi (.gitignore qilinadi) yoki CI o'zgaruvchisi orqali inyekt qilinadi."
    }
  ],
  "pitfalls": [
    "Xususiy paketlarni git commit orqali loyihaga to'g'ridan-to'g'ri tashlab ketish: yangilanishlarni kuzatishni imkonsiz qiladi.",
    "Shaxsiy xodimning paroli yoki tokenini auth.json ga yozib jamoaga tarqatish (xodim ishdan ketsa barcha buildlar to'xtaydi; maxsus Deploy Token ishlating).",
    "Paketlarda orqaga moslikni (backward compatibility) buzuvchi o'zgarishlar kiritilganda semver qoidalariga rioya qilmaslik."
  ]
});
