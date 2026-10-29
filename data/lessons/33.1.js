/* Chuqur dars: 33.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.1", {
  "lesson": [
    "### Repozitoriy nima",
    "Git repozitoriysi — loyiha ildizidagi `.git` papkasidagi **obyektlar bazasi**. U to'rt xil obyekt saqlaydi:",
    "- **blob**: fayl mazmuni (nomsiz).",
    "- **tree**: papka, ya'ni nomlar va blob/tree'lar ro'yxati.",
    "- **commit**: loyihaning snapshot'i (root tree), ota commit(lar), muallif, sana va xabar.",
    "- **tag**: commit'ga ism (annotated tag alohida obyekt).",
    "",
    "Har obyekt mazmunidan hisoblangan **SHA** bilan identifikatsiya qilinadi. Shuning uchun mazmun o'zgarsa, SHA ham o'zgaradi va tarixni jimgina buzib bo'lmaydi.",
    "",
    "### Commit grafi",
    "Commit'lar o'z ota commit'iga ishora qilib, yo'naltirilgan asiklik graf (DAG) hosil qiladi. Merge commit'ning ikkita ota'si bor. Tarix aslida shu grafning o'zi.",
    "",
    "### Branch va HEAD",
    "**Branch** — commit'ga ko'rsatkich (ref), xolos. Yangi branch yaratish arzon: bitta fayl yoziladi. **HEAD** — hozir qaysi branch (yoki commit)da turganingizni ko'rsatuvchi ko'rsatkich. Yangi commit qilganingizda joriy branch oldinga suriladi.",
    "",
    "### Snapshot, diff emas",
    "Git har commit'da to'liq snapshot saqlaydi (o'zgarmagan fayllar uchun mavjud blob'ga ishora qiladi). `git diff` farqni **hisoblab** ko'rsatadi. Bu branch almashtirishni tez qiladi.",
    "",
    "### Lokal va remote",
    "Lokal repozitoriy to'liq tarixga ega, shuning uchun ko'p amallar tarmoqsiz ishlaydi. `origin` — boshqa nusxa (remote). `git fetch` uning yangiliklarini oladi, `git push` o'zingiznikini yuboradi, `git clone` butun nusxani yaratadi."
  ],
  "examples": [
    {
      "title": "Tarixni ko'rish",
      "lang": "bash",
      "code": [
        "git log --oneline --graph --decorate --all   # graf, branch va tag'lar",
        "git remote -v                                 # remote'lar",
        "git cat-file -p HEAD                          # commit obyekti ichi: tree, parent, author"
      ],
      "note": "Commit'ning ichida tree va parent SHA'lari ko'rinadi."
    },
    {
      "title": "Obyektlarni qo'lda ko'rish",
      "lang": "bash",
      "code": [
        "git cat-file -t HEAD            # commit",
        "git cat-file -p HEAD^{tree}     # root tree: fayllar va papkalar",
        "git rev-parse HEAD              # joriy commit SHA",
        "git rev-parse --abbrev-ref HEAD # joriy branch nomi"
      ],
      "note": "Git ichida hamma narsa SHA bilan bog'langan obyektlar."
    }
  ],
  "pitfalls": [
    "Git diff saqlaydi deb o'ylash: u snapshot saqlaydi, diff esa hisoblanadi.",
    "Branch'ni \"papka\" deb tasavvur qilish: u shunchaki commit'ga ko'rsatkich, shuning uchun arzon.",
    "`.git` papkasini o'chirib yuborish: butun tarix yo'qoladi, remote bo'lmasa tiklab bo'lmaydi.",
    "Lokal va remote tarixni bir xil deb hisoblash: `git fetch` qilmasdan remote holati eskirgan bo'ladi."
  ]
});
