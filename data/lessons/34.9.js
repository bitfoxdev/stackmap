/* Chuqur dars: 34.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("34.9", {
  "lesson": [
    "### Environment'lar",
    "Environment (`staging`, `production`) — deploy maqsadi, va unga bog'langan sozlamalar, secret'lar va himoya qoidalari. Workflow job'i `environment: production` deb ko'rsatsa, shu environment'ning qoidalari qo'llanadi.",
    "",
    "### Himoya qoidalari",
    "- **Required reviewers**: deploy ishga tushishidan oldin belgilangan odamlar **qo'lda tasdiqlashi** shart.",
    "- **Wait timer**: ishga tushishdan oldin kutish vaqti.",
    "- **Deployment branches and tags**: faqat ma'lum branch yoki tag'lardan (masalan, `main`, `v*`) deploy qilish mumkin.",
    "- **Environment secret va variable'lar**: faqat shu environment'ga tegishli.",
    "",
    "### Nima beradi",
    "- **Production himoyasi**: tasdiqsiz ishga tushmaydi.",
    "- **Secret izolyatsiyasi**: production kalitlari faqat production job'iga beriladi, test job'lari ko'rmaydi.",
    "- **Deploy tarixi**: qaysi commit qachon va kim tasdiqlab chiqarilgani ko'rinadi (Deployments).",
    "- **Environment URL**: PR yoki deploy sahifasida havola.",
    "",
    "### Odatiy pipeline",
    "`test` job'i o'tadi, `deploy-staging` (avtomatik), `deploy-production` (`needs: deploy-staging`, `environment: production`, qo'lda tasdiq). Bu \"progressive delivery\": avval staging'da sinab, keyin ongli ravishda production.",
    "",
    "### Eslatma",
    "Private repozitoriylarda environment'ning ba'zi himoya imkoniyatlari (required reviewers) tarifga bog'liq (Pro/Team/Enterprise), public repoda hammasi bepul.",
    "",
    "### Rollback",
    "Deploy tarixi oldingi muvaffaqiyatli versiyani topishni osonlashtiradi. Rollback uchun workflow `workflow_dispatch` bilan ma'lum SHA yoki tag'ni qayta deploy qilishi mumkin."
  ],
  "examples": [
    {
      "title": "Production environment bilan job",
      "lang": "yaml",
      "code": [
        "deploy-production:",
        "  needs: deploy-staging",
        "  runs-on: ubuntu-latest",
        "  environment:",
        "    name: production",
        "    url: https://app.example.uz",
        "  steps:",
        "    - uses: actions/checkout@v4",
        "    - run: ./deploy.sh production",
        "      env:",
        "        DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}   # production environment secret'i"
      ],
      "note": "Qo'lda tasdiq bo'lmaguncha job boshlanmaydi."
    },
    {
      "title": "Qo'lda rollback",
      "lang": "yaml",
      "code": [
        "on:",
        "  workflow_dispatch:",
        "    inputs:",
        "      ref:",
        "        description: Deploy qilinadigan tag yoki SHA",
        "        required: true",
        "",
        "jobs:",
        "  rollback:",
        "    runs-on: ubuntu-latest",
        "    environment: production",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "        with: { ref: ${{ inputs.ref }} }",
        "      - run: ./deploy.sh production"
      ],
      "note": "Rollback ham himoyalangan environment orqali o'tadi."
    }
  ],
  "pitfalls": [
    "Production deploy'ni tasdiqsiz avtomatik qoldirish (muhim tizimlarda): xato relizlar darhol chiqadi.",
    "Production secret'ini environment'siz saqlash: test job'lari ham ko'rishi mumkin.",
    "Deploy branch cheklovini qo'ymaslik: istalgan branch production'ga chiqishi mumkin.",
    "Rollback jarayonini oldindan tayyorlamaslik: muammo paytida qo'lda va shoshib bajariladi."
  ]
});
