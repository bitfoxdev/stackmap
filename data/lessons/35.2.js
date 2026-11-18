/* Chuqur dars: 35.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.2", {
  "lesson": [
    "### Merge Request (MR) arxitekturasi",
    "GitLab da **Merge Request (MR)** — GitHub dagi Pull Request ning to'liq analogi bo'lib, o'zgarishlarni asosiy branchga xavfsiz birlashtirish, kodni jamoaviy ko'rib chiqish va avtomatlashtirilgan pipeline natijalarini kuzatish markazidir.",
    "",
    "MR shunchaki diff (kod farqlari) emas, balki to'laqonli hamkorlik vositasidir. Unda **Draft MR** (ish hali tugallanmaganini bildirish va bexosdan merge qilinishini taqiqlash), **Assignee** (ishni amalga oshiruvchi mas'ul) va **Reviewer** (kodni tekshiruvchi mutaxassislar), shuningdek **Milestone** va **Labels** qat'iy ajratilgan.",
    "",
    "### Avtomatlashtirilgan merge va Merge Trains",
    "Katta jamoalarda ko'p uchraydigan muammo: dasturchi MR ni tasdiqlatadi, lekin pipeline tugashini kutib o'tirishga vaqti bo'lmaydi. GitLab da **Auto-Merge (Merge when pipeline succeeds)** mexanizmi mavjud: barcha tekshiruvlar (testlar, linter, xavfsizlik) muvaffaqiyatli yakunlanishi bilanoq, GitLab mustaqil ravishda merge amalini bajaradi va kerak bo'lsa ishchi branchni o'chiradi.",
    "",
    "Yuqori yuklamali va o'nlab dasturchilar ishlaydigan jamoalarda (GitLab Premium) **Merge Trains** ishlatiladi. Agar bir vaqtda 5 ta MR navbatga tursa, har bir MR oldingi MR larning ehtimoliy natijasi ustiga qurilib sinovdan o'tadi. Natijada main branch barqarorligi 100% kafolatlanadi.",
    "",
    "### Merge strategiyalari",
    "Loyiha sozlamalarida jamoa merge uslubini belgilashi mumkin:",
    "- **Merge Commit**: Tarixda alohida merge tuguni saqlanadi.",
    "- **Squash and Merge**: Feature branchdagi 20 ta oraliq commit bitta toza commitga siqilib, main ga o'tadi (tavsiya etiladi).",
    "- **Fast-Forward Merge**: Commitlar tarixi mutlaqo to'g'ri chiziqli bo'lishini talab qiladi; agar main ilgarilab ketgan bo'lsa, avval rebase qilish talab etiladi."
  ],
  "examples": [
    {
      "title": "glab orqali Draft MR ochish va auto-merge yoqish",
      "lang": "bash",
      "code": [
        "# Yangi o'zgarishlar bilan Draft MR yaratish va tegishli issuelarni bog'lash",
        "glab mr create --draft --title \"feat(billing): add Payme webhook handler\" \\",
        "  --description \"Closes #104. Implements idempotent webhook processing.\" \\",
        "  --reviewer lead_dev --assignee @me",
        "",
        "# Ish bitgach draft maqomini olib tashlash va avtomatik merge yoqish",
        "glab mr update 42 --ready",
        "glab mr merge 42 --auto-merge --squash --remove-source-branch"
      ],
      "note": "Closes #104 kaliti MR merge bo'lganda 104-sonli issuni avtomatik yopadi."
    },
    {
      "title": "Merge Request parametrlarini sozlash",
      "lang": "text",
      "code": [
        "Merge method: Fast-forward merge",
        "Squash commits when merging: Encourage (or Require)",
        "Delete source branch after merge: Checked",
        "Pipelines must succeed: Checked",
        "All threads must be resolved: Checked"
      ],
      "note": "Ushbu sozlamalar toza git tarixi va yuqori kod sifatini kafolatlaydi."
    }
  ],
  "pitfalls": [
    "Auto-merge yoqilgan paytda beqaror (flaky) testlarni e'tiborsiz qoldirish: yiqilgan test tufayli muhim reliz merge bo'lmay qolib ketadi.",
    "Squash qilmasdan 40 ta \"wip\", \"fix typo\" kabi iflos commitlarni main branchiga quyish: git log tahlilini imkonsiz qiladi.",
    "Fast-forward merge talab qilinganda, dasturchilar rebase qilish o'rniga teskari merge commit qilib chalkashlik keltirib chiqarishi."
  ]
});
