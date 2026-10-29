/* Chuqur dars: 33.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.13", {
  "lesson": [
    "### .gitignore",
    "`.gitignore` Git **kuzatmasligi** kerak bo'lgan fayllar ro'yxati. Repozitoriyga tegishli bo'lmagan va har kimda farq qiladigan narsalar kirmasligi kerak.",
    "",
    "### Nimalar chiqarib tashlanadi",
    "- **Bog'liqliklar**: `vendor/`, `node_modules/` (ular `composer.lock`, `package-lock.json` dan tiklanadi).",
    "- **Maxfiy va muhit**: `.env`, `storage/*.key`, kalitlar, sertifikatlar.",
    "- **Kesh va log**: `storage/logs`, `bootstrap/cache`.",
    "- **Build natijalari**: `public/build`, `public/hot`.",
    "- **IDE va OS fayllari**: `.idea/`, `.vscode/`, `.DS_Store`. Ularni global `~/.gitignore_global` ga qo'yish yaxshiroq (loyiha faylini ifloslantirmaydi).",
    "",
    "Laravel standart `.gitignore` bilan keladi.",
    "",
    "### Muhim nuance: allaqachon kuzatilayotgan fayl",
    "Fayl **allaqachon commit qilingan** bo'lsa, uni `.gitignore` ga qo'shish kuzatishni to'xtatmaydi. Avval indeksdan chiqaring: `git rm --cached <fayl>` (faylning o'zi diskda qoladi), keyin commit qiling.",
    "",
    "### Tasodifan commit qilingan maxfiy ma'lumot",
    "Eng xavfli holat. Faylni o'chirish **yetmaydi**: u tarixda qoladi va repozitoriyga kirish huquqi bor har kim, shuningdek remote'dan klon qilgan har kim ko'ra oladi. To'g'ri tartib:",
    "1. Kalitni/parolni **darhol almashtiring** (revoke). Bu eng muhim qadam.",
    "2. Tarixdan tozalash: `git filter-repo` (alohida o'rnatiladigan vosita) bilan.",
    "3. Hamma bilan kelishib force push va qayta klon.",
    "",
    "### Tekshirish",
    "`git check-ignore -v <yo'l>` qaysi qoida faylni e'tiborsiz qoldirayotganini ko'rsatadi. `git status --ignored` e'tiborsiz fayllarni ko'rsatadi.",
    "",
    "### .env.example",
    "Haqiqiy `.env` ignore qilinadi, lekin namuna `.env.example` (qiymatsiz yoki soxta qiymatlar bilan) repozitoriyga kiradi, shunda yangi odam sozlashni biladi."
  ],
  "examples": [
    {
      "title": "Kuzatilayotgan faylni ignore qilish",
      "lang": "bash",
      "code": [
        "git rm --cached .env                 # kuzatishdan chiqarish (fayl diskda qoladi)",
        "echo \".env\" >> .gitignore",
        "git commit -am \"chore: stop tracking .env\"",
        "git check-ignore -v storage/logs/laravel.log   # qaysi qoida ushlab turibdi"
      ],
      "note": "Faqat .gitignore ga yozish yetmaydi, avval rm --cached kerak."
    },
    {
      "title": "Maxfiy fayl commit bo'lib ketganda",
      "lang": "bash",
      "code": [
        "# 1) Kalitni DARHOL almashtiring (revoke / rotate)",
        "# 2) Tarixdan olib tashlash (git filter-repo ni alohida o'rnatish kerak)",
        "git filter-repo --path secrets.json --invert-paths",
        "# 3) Remote'ni yangilash va jamoani xabardor qilish",
        "git push --force --all"
      ],
      "note": "Kalitni almashtirmasdan tarixni tozalash yetarli emas: u allaqachon sizib chiqqan bo'lishi mumkin."
    }
  ],
  "pitfalls": [
    "`.gitignore` ga qo'shib, fayl hamon kuzatilayotganini sezmaslik: `git rm --cached` kerak.",
    "Maxfiy kalitni faqat keyingi commit'da o'chirish: u tarixda qoladi, kalitni almashtirish shart.",
    "`vendor/` yoki `node_modules` ni commit qilish: repozitoriy kattalashadi, lock fayldan tiklash mumkin.",
    "`.env.example` yo'qligi: yangi dasturchi qanday sozlamalar kerakligini bilmaydi."
  ]
});
