/* Chuqur dars: 35.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.4", {
  "lesson": [
    "### Protected Branches maqsadi va ahamiyati",
    "Har qanday professional loyihaning eng asosiy aktivi — uning barqaror kod bazasidir. **Protected Branches (Himoyalangan branchlar)** muhim tarmoqlarni (masalan `main`, `master`, `production`, `staging`) tasodifiy xatolar, ruxsatsiz o'zgarishlar va commitlar tarixini o'chirib yuborishdan himoyalaydi.",
    "",
    "### Asosiy cheklovlar",
    "Branch himoyalanganda GitLab quyidagi qat'iy qoidalarni o'rnatadi:",
    "- **Push taqiqi (Allowed to push)**: Standart ishlab chiquvchilar (Developer roli) ushbu branchga to'g'ridan-to'g'ri `git push` qila olmaydi. Katta korporativ tizimlarda esa hatto Maintainerlar uchun ham to'g'ridan-to'g'ri push taqiqlanadi (`Allowed to push: No one`). Kod faqat tekshirilgan Merge Request orqali kira oladi.",
    "- **Merge ruxsati (Allowed to merge)**: Kimlar tasdiqlangan MR ni birlashtira olishi belgilanadi (odatda faqat Maintainerlar yoki Team Lead).",
    "- **Force push qat'iy blokirovkasi**: Tarixni qayta yozuvchi `git push --force` amali xatoliklarni oldini olish uchun butunlay o'chirib qo'yiladi.",
    "- **Branch o'chirilishining taqiqlanishi**: Tasodifan asosiy branchni o'chirib yuborish xavfi yo'qoladi.",
    "",
    "### Wildcard himoya qoidalari",
    "Ko'p tarmoqli reliz strategiyalarida reliz branchlari oldindan yaratilmagan bo'lishi mumkin. GitLab wildcard naqshlarini qo'llab-quvvatlaydi: masalan, `release/*` yoki `v*` qoidasi kiritilsa, kelajakda ochiladigan barcha `release/1.0.0`, `release/2.1.0` kabi branchlar avtomatik ravishda to'liq himoyalangan maqomga ega bo'ladi.",
    "",
    "### Protected Environments bilan bog'liqlik",
    "Eng muhim xavfsizlik jihati: GitLab da **Protected CI/CD Variables** (masalan, production database paroli, AWS kalitlari) faqat va faqat Protected branch yoki Protected tag da ishga tushgan pipeline larga beriladi! Oddiy feature branchda ochilgan pipeline production sirlarini ko'ra olmaydi."
  ],
  "examples": [
    {
      "title": "Korporativ Protected Branches sozlamalari",
      "lang": "text",
      "code": [
        "Branch pattern: main",
        "  - Allowed to push: No one",
        "  - Allowed to merge: Maintainers",
        "  - Require approval from Code Owners: Yes",
        "",
        "Branch pattern: release/*",
        "  - Allowed to push: No one",
        "  - Allowed to merge: Maintainers",
        "  - Code Owners approval: Yes"
      ],
      "note": "Hech kim to'g'ridan-to'g'ri kod tiqolmaydi, faqat to'liq sinovdan o'tgan MR o'tadi."
    },
    {
      "title": "Himoyalangan branchga noqonuniy push natijasi",
      "lang": "bash",
      "code": [
        "$ git checkout main",
        "$ git commit -m \"hotfix in production\"",
        "$ git push origin main",
        "",
        "# GitLab rad javobi:",
        "remote: GitLab: You are not allowed to push code to protected branches on this project.",
        "To gitlab.acme.com:backend/api.git",
        " ! [remote rejected] main -> main (pre-receive hook declined)"
      ],
      "note": "Xatolik darhol server darajasida to'xtatiladi."
    }
  ],
  "pitfalls": [
    "Hotfix qilish bahonasida 'Allowed to push: Developers' qilib qo'yish: bu orqali butun xavfsizlik va CI tekshiruvlari aylanib o'tiladi.",
    "CI/CD da deploy qiluvchi maxfiy kalitlarni Protected deb belgilab, deploy jobini oddiy himoyalanmagan feature branchda ishga tushirishga urinish.",
    "Release wildcard qoidalarini kiritishni unutib, yangi release branchini himoyasiz qoldirish."
  ]
});
