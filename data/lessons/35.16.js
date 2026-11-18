/* Chuqur dars: 35.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.16", {
  "lesson": [
    "### Merge Request Approval Rules nima uchun zarur",
    "Korporativ darajadagi dasturiy ta'minotda bitta dasturchining o'zi kod yozib, o'zi uni tasdiqlab productionga chiqarishi jiddiy xavfsizlik va moliyaviy xatarlarni keltirib chiqaradi. **Merge Request Approval Rules (Tasdiqlash qoidalari)** kod bazasiga kiritilayotgan har bir o'zgarish mustaqil mutaxassislar nazoratidan o'tishini kafolatlaydi.",
    "",
    "### Qoidalar turlari va moslashuvchanlik",
    "- **Minimal tasdiqlar soni (Approvals required)**: MR ni merge qilish uchun kamida nechta tasdiq (masalan, 2 ta) kerakligini belgilaydi.",
    "- **Guruhlar bo'yicha qoidalar**: Muayyan soha mutaxassislarining majburiy tasdig'i. Masalan: har qanday MR da umumiy 2 ta dasturchi tasdig'i yetarli, lekin agar `app/Http/Middleware/VerifyCsrfToken.php` yoki to'lov kodlari o'zgarsa, alohida \"Security Team\" guruhining tasdig'i shart.",
    "- **Code Owners integratsiyasi**: `CODEOWNERS` faylida ko'rsatilgan mas'ul shaxslarning majburiy roziligi talab qilinishi mumkin.",
    "",
    "### Qat'iy xavfsizlik cheklovlari",
    "Haqiqiy xavfsizlik uchun quyidagi sozlamalar yoqilishi shart:",
    "1. **Prevent approval by author**: Kod muallifi o'zining shaxsiy Merge Requestiga o'zi tasdiq bera olmaydi.",
    "2. **Prevent approval by committers**: MR ga commit qo'shgan boshqa ishtirokchilar ham tasdiqlovchi bo'la olmaydi.",
    "3. **Reset approvals on push (Eng muhim!)**: Dasturchi kodni 2 kishiga ko'rsatib, tasdiq olgach, so'nggi daqiqada yangi commit bilan xavfli kod qo'shib yuborishi mumkin. Bu sozlama yoqilganda har bir yangi push qilingan commitda barcha avvalgi tasdiqlar bekor qilinadi va qayta review talab etiladi.",
    "4. **Prevent editing approval rules in MR**: Dasturchilar MR ichida qoidalarni o'zlari o'zgartira olmasligi kerak."
  ],
  "examples": [
    {
      "title": "Korporativ Approval qoidalari arxitekturasi",
      "lang": "text",
      "code": [
        "Target branch: main",
        "",
        "Rule 1: Peer Review",
        "  - Approvals required: 2",
        "  - Members: Developers",
        "",
        "Rule 2: Security & Architecture",
        "  - Approvals required: 1",
        "  - Members: security-leads, tech-leads",
        "",
        "Settings:",
        "  [x] Prevent approval by author",
        "  [x] Remove all approvals when commits are added to the source branch"
      ],
      "note": "Jami 3 ta tasdiq (2 ta tengdosh + 1 ta xavfsizlik yetakchisi) talab etiladi."
    },
    {
      "title": "CODEOWNERS fayli orqali nozik modullarni himoyalash",
      "lang": "text",
      "code": [
        "# Standart barcha fayllar",
        "* @backend-team",
        "",
        "# To'lov tizimlari va xavfsizlik kodlari",
        "/app/Services/Payment/ @lead-architect @security-team",
        "/config/auth.php @security-team",
        "/.gitlab-ci.yml @devops-team"
      ],
      "note": "Ushbu yo'llardagi fayllar o'zgarsa, tizim tegishli egalarining tasdig'ini majburiy qiladi."
    }
  ],
  "pitfalls": [
    "'Reset approvals on push' sozlamasini yoqmaslik: tekshirilgan MR ga oxirgi daqiqada xato yoki tekshirilmagan kod qo'shilib ketishi.",
    "Tasdiqlovchi sifatida aniq bitta odamni belgilab qo'yish: u ta'tilda yoki kasal bo'lsa butun jamoaning deploy jarayoni to'xtab qoladi (har doim guruh belgilang).",
    "Muallifga o'z kodini tasdiqlashiga ruxsat berish: tekshiruvning ma'nosini yo'qotadi."
  ]
});
