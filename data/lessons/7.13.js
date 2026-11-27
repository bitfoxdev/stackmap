/* Chuqur dars: 7.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.13", {
  "lesson": [
    "### Nima qiladi",
    "Packagist (yoki sozlangan repository) dagi security advisory ma'lumotlari bilan paketlaringiz versiyalarini solishtiradi; abandoned paketlarni ko'rsatadi. Docs ta'rifi: policy'larga (advisory, abandoned, malware va boshqalar) nisbatan tekshiradi. **Tranzitiv** paketlar ham tekshiriladi.",
    "",
    "### Buyruq",
    "```bash",
    "composer audit                       # o'rnatilgan vendor/ bo'yicha",
    "composer audit --locked              # lock bo'yicha (vendor/ shart emas: CI)",
    "composer audit --format=json         # table (default), plain, json, summary",
    "composer audit --no-dev --direct     # faqat production, faqat direct",
    "composer audit --abandoned=fail      # ignore | report | fail",
    "composer audit --ignore-severity=low",
    "```",
    "Exit code: `0` — muammo yo'q; `1` — policy topilmasi yoki kerakli paketlar yo'qligi tufayli xato. `install/update/require` ham advisory haqida xabar beradi (`--audit`, `--no-audit`, `COMPOSER_NO_AUDIT=1`).",
    "",
    "### Sozlash",
    "- Eski: `config.audit`: `ignore` (advisory ID'lari), `ignore-severity`, `abandoned` (`report`/`fail`/`ignore`), `block-insecure` (default `true`), `block-abandoned`, `ignore-unreachable`.",
    "- Yangi docs: **`config.policy`** `audit` o'rnini bosadi: `policy.advisories.{block,audit,ignore-id,ignore-severity}`, `policy.abandoned.{block,audit,ignore}`, `policy.malware.*`, `policy.ignore-unreachable`; `policy: false` yoki `COMPOSER_POLICY=0` — enforcement'ni o'chiradi (audit faqat ogohlantiradi, exit 0). **CI'da bu jimgina \"yashil\" qiladi: tekshiring.** Qaysi tizim sizning Composer versiyangizda ishlashini `composer --version` va docs bilan tasdiqlang.",
    "- Ignore faqat **sabab va muddat** bilan (izoh + issue havola); doimiy ignore — qarz.",
    "- Docs ogohlantirishi: advisory `dev-*` versiyalarni bloklamaydi (audit hisobotida ko'rsatilishi mumkin).",
    "",
    "### Qo'shimcha",
    "Dependabot/Renovate (avtomatik PR), `roave/security-advisories` (zaif versiya o'rnatilishiga `conflict` bilan to'sqinlik), OSV/Snyk skanerlari, SBOM. Audit — **ma'lum** zaifliklar; o'z kodingizdagi xato, konfiguratsiya va 0-day uchun emas.",
    "",
    "### Jarayon",
    "1. CI: har PR va **jadval bo'yicha** (zaiflik keyin ham chiqishi mumkin) `composer audit --locked`.",
    "2. Topilma: yangilash → yumshatish → vaqtinchalik ignore (sabab + muddat).",
    "3. Production lock'ini ham muntazam skanerlang.",
    "4. Abandoned'ni almashtirish rejasiga qo'ying (7.3).",
    "",
    "### Qoidalar",
    "1. CI'da audit majburiy, exit code buildni to'xtatsin.",
    "2. `policy:false`/`COMPOSER_POLICY=0` ni CI'da ishlatmang.",
    "3. Ignore — muddatli va izohli.",
    "4. Audit ni yangilash bilan birga (7.16)."
  ],
  "examples": [
    {
      "title": "CI",
      "lang": "yaml",
      "note": "GitLab CI",
      "code": [
        "security:audit:",
        "  stage: test",
        "  script:",
        "    - composer install --no-interaction --prefer-dist",
        "    - composer audit --locked --format=json | tee audit.json",
        "  artifacts:",
        "    when: always",
        "    paths: [audit.json]",
        "  allow_failure: false"
      ]
    },
    {
      "title": "Sozlama",
      "lang": "json",
      "note": "config.audit (eski) misoli",
      "code": [
        "{",
        "  \"config\": {",
        "    \"audit\": {",
        "      \"abandoned\": \"report\",",
        "      \"ignore\": { \"PKSA-xxxx-yyyy\": \"Faqat dev muhit; muddat: 2026-12-31, issue #123\" }",
        "    }",
        "  }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`--locked`siz CI'da `vendor/` bo'lmasa audit boshqa narsani tekshiradi yoki xato beradi: CI uchun `--locked`.",
    "`policy: false` / `COMPOSER_POLICY=0`: audit faqat ogohlantiradi va exit 0: pipeline \"yashil\" bo'lib zaiflik o'tib ketadi.",
    "Ignore'ni sababsiz va muddatsiz qo'shish: doimiy qarzga aylanadi.",
    "Auditni faqat PR'da ishlatish: yangi zaiflik e'lon qilingach hech narsa tekshirmaydi; jadvalli job.",
    "Audit \"0 topilma\"ni \"xavfsiz\" deb o'qish: faqat ma'lum zaifliklarni ko'radi.",
    "Tranzitiv zaiflikni \"mening paketim emas\" deb e'tiborsiz qoldirish."
  ]
});
