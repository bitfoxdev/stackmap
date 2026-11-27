/* Chuqur dars: 7.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.4", {
  "lesson": [
    "### Qoida",
    "- **MAJOR** (`2.0.0`): orqaga mos kelmaydigan (breaking) o'zgarish.",
    "- **MINOR** (`1.3.0`): orqaga mos yangi imkoniyat.",
    "- **PATCH** (`1.3.1`): orqaga mos xato tuzatish.",
    "Pre-release: `1.0.0-alpha.1`, `-beta`, `-RC1`; stability tartibi: `dev < alpha < beta < RC < stable`. Teg `v1.1-BETA` — beta; qo'shimchasiz teg — stable. Versiya tegidagi `v` prefiksi Composer'da ahamiyatsiz.",
    "",
    "### 0.x va 1.0",
    "`0.y.z` — \"ishlab chiqish\": har minor breaking bo'lishi mumkin. Composer'da `^0.3` faqat `0.3.x` (`>=0.3.0 <0.4.0`), `^0.0.3` esa faqat `0.0.3`. 1.0 — public API barqaror va'dasi.",
    "",
    "### Composer va SemVer",
    "`^1.2.3` = `>=1.2.3 <2.0.0` — \"orqaga mos hamma yangilash\". Bu SemVer'ga ishonishga tayanadi. Haqiqatda:",
    "- Minor/patch'da ham xato yoki nozik breaking o'zgarish bo'lishi mumkin (public API ta'rifi nozik).",
    "- Tranzitiv paket nosozligi sizga ta'sir qiladi.",
    "Shuning uchun `composer.lock` (7.2), avtomatlashtirilgan testlar va yangilashni bosqichma-bosqich qilish kerak.",
    "",
    "### Sizning paketingiz uchun",
    "Public API (sinf, metod, config, hodisa) nima ekanini hujjatlashtiring; changelog (Keep a Changelog) yuriting; breaking o'zgarishni faqat major'da; deprecated → bir major kutish → olib tashlash; git teglari `v1.2.3`; `branch-alias` (`dev-main` → `1.x-dev`) faqat kerak bo'lsa.",
    "",
    "### Laravel major'lari",
    "Laravel yiliga bitta major chiqaradi; ilova major'ini ko'tarish — alohida loyiha (2.28). Paketlarda `illuminate/*` constraint'larini sinalgan major'larga cheklang.",
    "",
    "### Qoidalar",
    "1. SemVer'ga ishoning, lekin tekshiring (lock + test).",
    "2. `0.x` paketga tayanishda ehtiyot: aniq minor'ga bog'lang.",
    "3. O'z paketingizda breaking o'zgarishni major'da.",
    "4. Pre-release'larni production'da ishlatmang."
  ],
  "examples": [
    {
      "title": "Versiyalar",
      "lang": "text",
      "note": "Qaysi o'zgarish qaysi raqam",
      "code": [
        "1.4.2 -> 1.4.3  patch: null pointer xatosi tuzatildi",
        "1.4.3 -> 1.5.0  minor: yangi ixtiyoriy parametr qo'shildi",
        "1.5.0 -> 2.0.0  major: metod imzosi o'zgardi (breaking)",
        "0.3.1 -> 0.4.0  0.x: minor ham breaking bo'lishi mumkin"
      ]
    },
    {
      "title": "Composer bilan tekshirish",
      "lang": "bash",
      "note": "Mavjud versiyalar",
      "code": [
        "composer show -a monolog/monolog            # barcha versiyalar",
        "composer show monolog/monolog | grep versions",
        "composer outdated --minor-only --direct     # faqat orqaga mos yangilashlar"
      ]
    }
  ],
  "pitfalls": [
    "SemVer'ga so'zsiz ishonib testsiz `update` qilish: minor/patch'da ham regressiya chiqadi.",
    "`0.x` paketga `^0.3` ga o'xshash cheklovning keng ekanini deb o'ylash: u faqat `0.3.x`; yangilanish uchun qo'lda ko'tarish kerak.",
    "O'z paketingizda breaking o'zgarishni minor/patch'da chiqarish: foydalanuvchilar `^` bilan avtomatik buzadi.",
    "Pre-release (`-beta`) ni production'da ishlatish.",
    "Public API ni hujjatlashtirmaslik: nima breaking ekani noaniq bo'ladi.",
    "`dev-main` ga bog'lanib yurish: versiya yo'q, takrorlab bo'lmaydi."
  ]
});
