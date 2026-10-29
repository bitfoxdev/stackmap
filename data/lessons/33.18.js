/* Chuqur dars: 33.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("33.18", {
  "lesson": [
    "### Git hook'lar",
    "Hook — Git ma'lum hodisalarda avtomatik ishga tushiradigan skript. Ular `.git/hooks` papkasida turadi. Maqsad: xatoni commit yoki push'dan oldin, ya'ni eng erta bosqichda ushlash.",
    "",
    "### Asosiy hook'lar",
    "- `pre-commit`: commit'dan oldin. Pint (kod uslubi), PHPStan, tez testlar, maxfiy ma'lumot tekshiruvi.",
    "- `commit-msg`: xabarni tekshiradi (Conventional Commits formati).",
    "- `pre-push`: push'dan oldin. Testlar to'plami (yengilroq).",
    "- `pre-receive` / `update` (server tomonida): qoidalarni majburlaydi (force push taqiqi, format).",
    "",
    "### Hook'larni jamoa bilan bo'lishish",
    "`.git/hooks` **versiyalanmaydi**, ya'ni klon qilganda yo'q. Usullar:",
    "- `git config core.hooksPath .githooks`: hook'lar repozitoriy ichidagi papkada, versiyalanadi.",
    "- **Husky** (JS), **CaptainHook**, **GrumPHP** yoki `pre-commit` freymvorki: o'rnatish va boshqarishni soddalashtiradi.",
    "",
    "### Hook'lar tez bo'lishi kerak",
    "Sekin hook (bir necha daqiqa) dasturchini `git commit --no-verify` bilan uni chetlab o'tishga undaydi. `pre-commit` da faqat **o'zgargan fayllar** ustida ishlang (`pint --dirty`), og'ir tekshiruvlarni `pre-push` yoki CI'ga qoldiring.",
    "",
    "### Hook'lar CI o'rnini bosmaydi",
    "Hook ixtiyoriy: uni o'chirib qo'yish yoki chetlab o'tish mumkin. Majburiy kafolat faqat server tomonida (CI, branch protection) bo'ladi. Hook — **erta fikr-mulohaza** uchun qulaylik, himoya chizig'i emas.",
    "",
    "### Xavfsizlik",
    "Boshqa odamning repozitoriysini klon qilganda uning hook'lari avtomatik ishlamaydi (xavfsizlik uchun), lekin `core.hooksPath` ni o'zingiz ulasangiz, o'sha skriptlarni ishonib bajarasiz. Notanish repozitoriyning hook'larini avval o'qing."
  ],
  "examples": [
    {
      "title": "Versiyalangan hook'lar",
      "lang": "bash",
      "code": [
        "mkdir -p .githooks",
        "git config core.hooksPath .githooks",
        "",
        "cat > .githooks/pre-commit <<'EOF'",
        "#!/usr/bin/env bash",
        "vendor/bin/pint --dirty --test || exit 1",
        "vendor/bin/phpstan analyse --no-progress --memory-limit=1G || exit 1",
        "EOF",
        "chmod +x .githooks/pre-commit"
      ],
      "note": "core.hooksPath bir marta sozlanadi, hook fayllari repozitoriy bilan birga yuriladi."
    },
    {
      "title": "commit-msg: format tekshiruvi",
      "lang": "bash",
      "code": [
        "# .githooks/commit-msg",
        "#!/usr/bin/env bash",
        "if ! grep -qE '^(feat|fix|refactor|docs|test|chore|perf)(\\([a-z0-9-]+\\))?!?: .{3,}' \"$1\"; then",
        "  echo \"Xabar Conventional Commits formatida bo'lsin: feat(scope): sarlavha\" >&2",
        "  exit 1",
        "fi"
      ],
      "note": "$1 — commit xabari fayli. Nolga teng bo'lmagan chiqish kodi commit'ni to'xtatadi."
    }
  ],
  "pitfalls": [
    "Hook'larni versiyalamaslik: `.git/hooks` klon bilan o'tmaydi, jamoada faqat ayrim odamlarda ishlaydi.",
    "Sekin hook: dasturchilar `--no-verify` bilan o'tkazib yuboradi va uning ma'nosi yo'qoladi.",
    "Hook'ni yagona himoya deb bilish: CI va branch protection majburiy kafolat beradi.",
    "Hook'da butun repozitoriyni tekshirish: faqat o'zgargan fayllar ustida ishlang."
  ]
});
