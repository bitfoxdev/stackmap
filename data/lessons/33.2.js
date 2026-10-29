/* Chuqur dars: 33.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.2", {
  "lesson": [
    "### Uch hudud",
    "Git'da o'zgarish uch joydan o'tadi:",
    "- **Working tree**: diskdagi fayllaringiz, tahrir qilinadigan joy.",
    "- **Staging area (index)**: keyingi commit'ga **tayyorlangan** o'zgarishlar.",
    "- **Repository**: commit qilingan tarix.",
    "",
    "### Asosiy buyruqlar",
    "- `git add <fayl>`: o'zgarishni staging'ga qo'yadi.",
    "- `git commit`: staging'dagini commit qiladi.",
    "- `git restore <fayl>`: working tree'dagi o'zgarishni **bekor qiladi** (qaytarib bo'lmaydi, ehtiyot bo'ling).",
    "- `git restore --staged <fayl>`: staging'dan chiqaradi, o'zgarish fayldа qoladi.",
    "- `git status -sb`: qisqa holat.",
    "",
    "### Nima uchun staging kerak",
    "Staging commit'ni **ongli yig'ish** imkonini beradi. Bitta ishda bir nechta mantiqiy o'zgarish qilgan bo'lsangiz, ularni alohida commit qilasiz. Shunda tarix toza va review oson.",
    "",
    "### add -p",
    "`git add -p` faylni bo'laklarga (hunk) bo'lib, har birini `y` (qo'shish), `n` (o'tkazish), `s` (yanada bo'lish), `e` (qo'lda tahrir) deb tanlashga imkon beradi. Bitta faylda ikki xil o'zgarishni alohida commit qilishning eng yaxshi yo'li.",
    "",
    "### Diff turlari",
    "- `git diff`: working tree va staging farqi (hali add qilinmaganlar).",
    "- `git diff --staged` (yoki `--cached`): staging va oxirgi commit farqi, ya'ni commit'ga nima kiradi.",
    "- `git diff HEAD`: working tree va oxirgi commit farqi.",
    "",
    "Commit qilishdan oldin `git diff --staged` ni o'qish yomon commit'ning (tasodifiy debug qatori, maxfiy qiymat) oldini oladi."
  ],
  "examples": [
    {
      "title": "Faylning bir qismini commit qilish",
      "lang": "bash",
      "code": [
        "git status -sb",
        "git add -p app/Services/Billing.php     # faqat kerakli bo'laklarni tanlang",
        "git diff --staged                       # commit'ga nima kirishini tekshiring",
        "git commit -m \"refactor(billing): extract fee calculation\""
      ],
      "note": "Boshqa o'zgarishlar working tree'da qoladi va keyingi commit'ga ketadi."
    },
    {
      "title": "Bekor qilish",
      "lang": "bash",
      "code": [
        "git restore --staged app/Models/Order.php   # staging'dan chiqarish (o'zgarish qoladi)",
        "git restore app/Models/Order.php            # o'zgarishni butunlay tashlash (XAVFLI)",
        "git restore --source=HEAD~2 README.md       # faylni 2 commit oldingi holatga qaytarish"
      ],
      "note": "`restore` working tree'ni o'zgartiradi, shuning uchun avval status va diffni ko'ring."
    }
  ],
  "pitfalls": [
    "`git add .` ni ko'zdan kechirmay ishlatish: debug fayl yoki `.env` tasodifan commit'ga kiradi.",
    "`git restore <fayl>` ni o'ylamasdan bajarish: saqlanmagan o'zgarish qaytmaydi.",
    "Staging'ni ishlatmay doim `commit -a` qilish: mantiqiy bo'lingan commit'lar o'rniga katta aralash commit chiqadi.",
    "`git diff` ni staging'dan keyin chaqirib, bo'sh natijadan hayron bo'lish: staging'dagi uchun `--staged` kerak."
  ]
});
