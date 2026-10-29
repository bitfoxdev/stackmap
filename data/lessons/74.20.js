/* Chuqur dars: 74.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.20", {
  "lesson": [
    "### Sifat darvozalari",
    "Quality gate — kod production'ga o'tishi uchun bajarishi **shart** bo'lgan mezonlar to'plami. Ular avtomatik ishlaydi va buzilsa, reliz to'xtaydi. Maqsad: sifat odamlarning xotirjamligiga emas, avtomatik qoidaga tayansin.",
    "",
    "### Odatiy mezonlar",
    "- **Barcha testlar yashil** (unit, feature, integratsion).",
    "- **Minimal test qamrovi** (masalan, 80%), yoki yangi kod uchun diff coverage.",
    "- **Statik tahlil**: PHPStan/Larastan xatosiz (belgilangan daraja, masalan 8).",
    "- **Kod uslubi**: Pint (`--test`) yoki PHP-CS-Fixer.",
    "- **Xavfsizlik**: `composer audit` (zaif bog'liqliklar), yuqori darajadagi zaiflik yo'q.",
    "- **Mutation score** (muhim hududlar uchun).",
    "- **Kod ko'rib chiqish**: kamida bitta tasdiq.",
    "",
    "### Qaerda majburlanadi",
    "- **CI**: har PR'da barcha tekshiruvlar.",
    "- **Branch protection**: required status checks, merge'ni bloklaydi.",
    "- **Deploy konveyeri**: staging smoke testlari o'tmasa, production'ga o'tkazilmaydi.",
    "",
    "### Realistik chegaralar",
    "Juda qattiq chegaralar (100% qamrov) jamoani samarasiz ishga undaydi, juda yumshoqlari esa foydasiz. Hozirgi holatdan boshlab, **tushib ketmasligi** (ratchet) ni ta'minlang: chegara asta-sekin oshiriladi. Eski kod uchun baseline (PHPStan baseline) bilan boshlab, yangi kodga qattiq talab qo'ying.",
    "",
    "### Istisnolar",
    "Favqulodda vaziyatda (production'dagi kritik nosozlik) darvozani chetlab o'tish mumkin bo'lishi kerak, lekin ruxsat bilan, hujjatlangan va keyin tuzatiladigan tarzda. Cheksiz istisno darvozani ma'nosiz qiladi.",
    "",
    "### Natijani ko'rinadigan qilish",
    "Dashboard, PR'dagi izoh yoki badge: jamoa sifat holatini bir qarashda ko'rsin. Darvoza yiqilganda xabar aniq sabab va tuzatish yo'lini ko'rsatsin."
  ],
  "examples": [
    {
      "title": "Barcha darvozalar bitta scriptda",
      "lang": "bash",
      "code": [
        "#!/usr/bin/env bash",
        "set -e",
        "vendor/bin/pint --test                          # kod uslubi",
        "vendor/bin/phpstan analyse --memory-limit=1G    # statik tahlil (level phpstan.neon da)",
        "composer audit                                   # zaif bog'liqliklar",
        "php artisan test --parallel --coverage --min=80  # testlar va qamrov"
      ],
      "note": "Birortasi yiqilsa, set -e butun skriptni to'xtatadi va CI qizil bo'ladi."
    },
    {
      "title": "CI'da ketma-ket bosqichlar",
      "lang": "yaml",
      "code": [
        "jobs:",
        "  lint:        { runs-on: ubuntu-latest, steps: [ ... pint --test, phpstan ... ] }",
        "  tests:",
        "    needs: lint",
        "    runs-on: ubuntu-latest",
        "    steps: [ ... php artisan test --parallel --coverage --min=80 ... ]",
        "  security:",
        "    runs-on: ubuntu-latest",
        "    steps: [ ... composer audit ... ]",
        "  deploy:",
        "    needs: [lint, tests, security]",
        "    if: github.ref == 'refs/heads/main'",
        "    steps: [ ... ]"
      ],
      "note": "Deploy faqat barcha darvozalar o'tgandan keyin ishga tushadi."
    }
  ],
  "pitfalls": [
    "Darvozani majburlamaslik (faqat tavsiya): qoida birinchi shoshilinch ishda tashlab ketiladi.",
    "Juda qattiq chegara (masalan, 100% qamrov): jamoa ma'nosiz testlar yozadi.",
    "Eski kod uchun baseline'siz qattiq statik tahlil: yuzlab xato bir kunda chiqib, jamoa darvozani o'chiradi.",
    "Cheksiz istisnolar: \"bu safar o'tkazib yuborsak bo'ladi\" odatga aylanib, darvoza ma'nosini yo'qotadi."
  ]
});
