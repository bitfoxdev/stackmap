/* Chuqur dars: 33.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.5", {
  "lesson": [
    "### Merge nima",
    "Merge ikki tarixni birlashtiradi. Qanday natija chiqishi branch'lar holatiga bog'liq.",
    "",
    "### Uch xil natija",
    "- **Fast-forward**: maqsad branch (`main`) feature branch yaratilgandan beri o'zgarmagan bo'lsa, Git shunchaki ko'rsatkichni oldinga suradi. Merge commit yaratilmaydi, tarix chiziqli.",
    "- **Three-way merge**: ikkala branch o'zgargan bo'lsa, Git umumiy ajdod va ikki uchi asosida **merge commit** yaratadi (ikkita ota'li).",
    "- **Squash merge**: branch'dagi barcha commit'lar **bitta** yangi commit'ga siqiladi. `main` tarixi toza, lekin branch ichidagi alohida commit'lar yo'qoladi va branch merge qilingan deb ko'rinmaydi.",
    "",
    "### --no-ff",
    "`git merge --no-ff` fast-forward mumkin bo'lsa ham merge commit yaratadi. Shunda feature chegarasi tarixda ko'rinadi va butun feature'ni bitta revert bilan bekor qilish mumkin.",
    "",
    "### PR merge usullari",
    "Platforma (GitHub, GitLab) uch usulni beradi, jamoa bittasini tanlaydi:",
    "- **Merge commit**: to'liq tarix saqlanadi, lekin graf shovqinli bo'lishi mumkin.",
    "- **Squash and merge**: bir PR, bir commit. Toza `main`, revert oson. Ko'pchilik jamoalar tanlovi.",
    "- **Rebase and merge**: commit'lar `main` oxiriga chiziqli qo'yiladi, merge commit yo'q.",
    "",
    "### Tanlash mezoni",
    "Tarixning o'qilishi va revert qulayligi muhim bo'lsa squash. Commit'lar sifatli va har biri mustaqil ma'noga ega bo'lsa merge commit yoki rebase merge. Squash'dan keyin branch'ni o'chirib, qayta ishlatmang.",
    "",
    "### Konfliktda",
    "Merge to'xtasa, konfliktni hal qilib, `git add` va `git merge --continue` qiling. Bekor qilish: `git merge --abort`."
  ],
  "examples": [
    {
      "title": "Merge variantlari",
      "lang": "bash",
      "code": [
        "git switch main",
        "git merge --ff-only feature/small-fix        # faqat fast-forward bo'lsa, aks holda rad etadi",
        "git merge --no-ff feature/refunds            # har doim merge commit",
        "git merge --squash feature/refunds && git commit -m \"feat(refund): add refund endpoint\""
      ],
      "note": "--ff-only kutilmagan merge commit'dan himoya qiladi."
    },
    {
      "title": "Merge'ni bekor qilish",
      "lang": "bash",
      "code": [
        "git merge feature/refunds     # konflikt chiqdi",
        "git merge --abort              # merge boshlanmagan holatga qaytish",
        "git log --oneline --graph -10  # natijani ko'rish"
      ],
      "note": "--abort faqat merge tugamagan paytda ishlaydi."
    }
  ],
  "pitfalls": [
    "Squash merge'dan keyin eski branch'dan ish davom ettirish: Git uni merge qilingan deb bilmaydi, konfliktlar chiqadi.",
    "Squash'ni commit'lari mustaqil ma'noga ega katta PR uchun ishlatish: foydali tarix yo'qoladi.",
    "Fast-forward'ni kutib, `main` allaqachon o'zgargan bo'lsa, kutilmagan merge commit olish.",
    "Konfliktni o'ylamasdan \"ours/theirs\" bilan yopish: bir tomonning ishi jimgina yo'qoladi."
  ]
});
