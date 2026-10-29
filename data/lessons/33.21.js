/* Chuqur dars: 33.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.21", {
  "lesson": [
    "### Tipik muammolar va yechimlar",
    "Git'da xatolar tez-tez uchraydi va ko'pchiligi tiklanadigan. Asosiysi — vahimaga tushmay, holatni tushunib, kerakli buyruqni tanlash.",
    "",
    "### Muammolar jadvali",
    "- **Noto'g'ri branch'ga commit**: `git switch -c correct` (commit'lar yangi branch'ga tushadi), keyin eski branch'da `git reset --hard origin/<branch>` (push qilinmagan bo'lsa).",
    "- **Oxirgi commit xabari yoki fayli xato**: `git commit --amend` (push'dan oldin).",
    "- **Push rad etildi** (remote oldinda): `git pull --rebase origin main`, keyin push.",
    "- **Detached HEAD** (branch'siz commit'da): ishni saqlash uchun `git switch -c new-branch`.",
    "- **Katta fayl tasodifan commit qilingan**: `git filter-repo` bilan tarixdan olib tashlash, keyin Git LFS.",
    "- **Maxfiy kalit push qilingan**: kalitni **darhol almashtiring (revoke)**, keyin tarixni tozalang.",
    "- **Line ending muammolari**: `.gitattributes` (`* text=auto eol=lf`) va `core.autocrlf`.",
    "- **Sekin repozitoriy**: `git gc`, `git maintenance start`, shallow clone (`--depth 1`), partial clone.",
    "- **\"Yo'qolgan\" ish**: `git reflog` (33.17).",
    "- **Konflikt**: 33.10.",
    "",
    "### Tashxis buyruqlari",
    "Har qanday xavfli amaldan oldin: `git status`, `git log --oneline --graph -10`, `git diff`. Qaysi branch'da, qanday holatdasiz va nima o'zgargan ekanini bilmasdan buyruq ishlatmang.",
    "",
    "### Xavfsizlik to'ri",
    "Xavfli buyruqdan (`reset --hard`, `rebase`, `filter-repo`) oldin zaxira: `git branch backup-before-fix`. Muammo chiqsa, zaxiradan qaytarasiz. `git stash` yoki WIP commit ham himoya.",
    "",
    "### Maxfiy ma'lumot sizishi",
    "Eng jiddiy: kalit remote'ga chiqqan. **Birinchi ish — kalitni bekor qilish**, tarixni tozalash ikkinchi. Chunki kimdir allaqachon klon qilgan yoki bot skanerlagan bo'lishi mumkin.",
    "",
    "### Mustaqil qaror",
    "Tushunmagan buyruqni internetdan ko'chirib ishlatmang. Avval `git <buyruq> --help` va quruq sinov (`--dry-run`, zaxira branch) bilan tekshiring."
  ],
  "examples": [
    {
      "title": "Noto'g'ri branch va push rad etilishi",
      "lang": "bash",
      "code": [
        "# commit main'ga tushib qoldi (hali push qilinmagan)",
        "git switch -c feature/refund          # commit'lar yangi branch'ga",
        "git switch main",
        "git reset --hard origin/main          # main'ni remote holatiga qaytarish",
        "",
        "# push rad etildi",
        "git pull --rebase origin main",
        "git push"
      ],
      "note": "Avval branch yaratib commit'ni saqlang, keyin eski joyni tozalang."
    },
    {
      "title": "Xavfsizlik to'ri bilan katta tozalash",
      "lang": "bash",
      "code": [
        "git branch backup-before-fix            # zaxira",
        "git filter-repo --path secrets.json --invert-paths",
        "# muammo bo'lsa: git reset --hard backup-before-fix",
        "git reflog                               # oxirgi chora"
      ],
      "note": "Zaxira branch tarix qayta yozishdan oldingi holatni saqlaydi."
    }
  ],
  "pitfalls": [
    "Muammoni tushunmasdan internetdan topilgan buyruqni ishlatish: holat yomonlashishi mumkin.",
    "Maxfiy kalit sizsa, avval tarixni tozalash va kalitni almashtirmaslik: kalit allaqachon sizib chiqqan.",
    "Zaxirasiz `reset --hard` yoki `filter-repo`: xatoda qaytish yo'li qolmaydi.",
    "Detached HEAD'da commit qilib, branch yaratmasdan boshqa joyga o'tish: commit'lar faqat reflog'da qoladi."
  ]
});
