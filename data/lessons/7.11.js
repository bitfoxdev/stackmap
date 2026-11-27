/* Chuqur dars: 7.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.11", {
  "lesson": [
    "### Qanday ishlaydi",
    "`composer require vendor/pkg` → Composer Packagist'dan `vendor/pkg` ning metadata'sini oladi, versiyani hal qiladi, so'ng `dist` (zip) yoki `source` (git) ni **asl manbadan** (GitHub va h.k.) yuklaydi. Packagist — katalog va metadata xizmati; default repository'lar ro'yxatida **oxirgi** (7.10 da tartib haqida).",
    "",
    "### Paket nashr qilish",
    "1. Ommaviy VCS repo (GitHub/GitLab/Bitbucket) va ildizda to'g'ri `composer.json` (`name: vendor/package`).",
    "2. packagist.org'da hisob → \"Submit\" → repo URL.",
    "3. **Webhook** (GitHub integratsiyasi) — yangi teg/commit avtomatik indekslanadi.",
    "4. Versiya = git **teg** (`v1.2.0`, SemVer); branch'lar `dev-main`. `version` maydonini `composer.json` ga yozmang.",
    "5. README, litsenziya, `.gitattributes` (`export-ignore` bilan dist arxividan testlarni chiqarish), CHANGELOG.",
    "6. `type`: `library`; `keywords`; `support` havolalari.",
    "",
    "### Sahifadan nimani o'qish",
    "Oxirgi release sanasi, versiyalar tarixi, `require` (tranzitiv og'irlik), litsenziya, **abandoned** belgisi (+ tavsiya etilgan almashtirish), security advisory'lar, yuklab olishlar (mashhurlik), GitHub yulduz/issue (faollik), maintainerlar soni.",
    "",
    "### Xavfsizlik",
    "- **Typosquatting**: `laravle/framework` kabi nomga o'xshash zararli paket; nomni diqqat bilan yozing, `composer require` chiqishini tekshiring.",
    "- **Dependency confusion**: ichki paket nomi ommaviyda band bo'lsa (7.10).",
    "- Paket skriptlari root'dagina ishlaydi, lekin **pluginlar** kod bajaradi: `allow-plugins` (7.9).",
    "- Maintainer akkaunti buzilishi (supply chain): lock va review bilan, `composer audit` (7.13); versiyalarni darrov emas, bir oz kutib ko'taring (7.16).",
    "- Packagist abandoned paketlarni belgilaydi; `composer audit` buni ko'rsatadi.",
    "",
    "### Qoidalar",
    "1. Paket tanlashda sahifani o'qing (faollik, advisory, abandoned).",
    "2. Nomni qayta tekshiring (typosquat).",
    "3. O'z paketingizda 2FA va teg-asosli nashr.",
    "4. Mirror/proxy (Artifactory) korporativ muhitda ommaviy trafikni kamaytiradi."
  ],
  "examples": [
    {
      "title": "Paket ma'lumotlari",
      "lang": "bash",
      "note": "Composer'da ko'rish",
      "code": [
        "composer search monolog",
        "composer show -a monolog/monolog        # versiyalar, bog'liqliklar",
        "composer show monolog/monolog           # o'rnatilgan tafsilot",
        "composer audit                          # advisory va abandoned"
      ]
    },
    {
      "title": "Nashr uchun composer.json",
      "lang": "json",
      "note": "Packagist'ga tayyor",
      "code": [
        "{",
        "  \"name\": \"acme/audit-log\",",
        "  \"description\": \"Audit log for Laravel apps\",",
        "  \"type\": \"library\",",
        "  \"license\": \"MIT\",",
        "  \"keywords\": [\"laravel\", \"audit\"],",
        "  \"support\": { \"issues\": \"https://github.com/acme/audit-log/issues\" },",
        "  \"require\": { \"php\": \"^8.2\" },",
        "  \"autoload\": { \"psr-4\": { \"Acme\\\\AuditLog\\\\\": \"src/\" } }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Paketni nomiga qarab ko'r-ko'rona o'rnatish (typosquat): imlo va sahifani tekshiring.",
    "Abandoned yoki yillardir yangilanmagan paketni tanlash.",
    "`composer.json` dagi `version` maydoni va git tegi nomuvofiq: Packagist xato beradi/chalkashlik.",
    "Webhook'siz nashr: yangi teg Packagist'da paydo bo'lmaydi (qo'lda yangilash kerak).",
    "Dist arxiviga test va rasmlarni qo'shib yuborish (`.gitattributes` `export-ignore`siz): og'ir paket.",
    "Ichki paket nomini ommaviy Packagist nomlari bilan to'qnashtirish (dependency confusion)."
  ]
});
