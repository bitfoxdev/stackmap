/* Chuqur dars: 35.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.9", {
  "lesson": [
    "### GitLab Container Registry arxitekturasi",
    "Zamonaviy DevOps amaliyotida ilovalarni serverlarga yetkazib berishning eng qulay va barqaror usuli — Docker konteynerlaridir. GitLab platformasida har bir loyiha va guruh uchun o'rnatilgan **GitLab Container Registry** mavjud bo'lib, u tashqi registrlarga (Docker Hub, AWS ECR) ehtiyoj qoldirmaydi.",
    "",
    "### Asosiy ustunliklar va integratsiya",
    "- **Loyiha bilan to'liq integratsiya**: Alohida server sozlash yoki yangi hisob ochish shart emas; repozitoriyga kirish huquqi bor xodimlar konteyner registriga ham mos ravishda kira oladi.",
    "- **CI/CD dagi o'rnatilgan avtorizatsiya**: CI pipeline davomida hech qanday shaxsiy login/parol kiritish talab qilinmaydi. GitLab avtomatik tarzda `$CI_REGISTRY_USER` va bir martalik `$CI_JOB_TOKEN` ni taqdim etadi.",
    "- **Xavfsizlik skanerlash bilan bog'liqlik**: Yuklangan har bir Docker image avtomatik ravishda zaifliklarga (Container Scanning) tekshirilishi mumkin.",
    "",
    "### Imidjlarni to'g'ri nomlash va taglash strategiyasi",
    "GitLab Container Registry'da imidj manzili odatda `$CI_REGISTRY_IMAGE` o'zgaruvchisida saqlanadi (`registry.gitlab.com/company/project`).",
    "Sanoat standarti bo'yicha taglash strategiyasi:",
    "1. **Commit SHA (`$CI_COMMIT_SHA`)**: Eng muhim tag! Har bir build o'zgarmas (immutable) bo'lishi kerak. Production deployda faqat commit SHA ishlatiladi.",
    "2. **Semver versiya (`v1.2.0`)**: Reliz taglari uchun.",
    "3. **Latest**: Faqat lokal sinovlar yoki keyingi buildlar uchun kesh sifatida ishlatiladi.",
    "",
    "### Cleanup Policy (Tozalash siyosati)",
    "Har kuni yuzlab Docker buildlar bo'ladigan jamoalarda server diski bir necha oyda to'lib qoladi. GitLab sozlamalaridagi **Cleanup policy for tags** mexanizmi eski, foydalanilmayotgan oraliq taglarni avtomatik o'chirib, faqat so'nggi N ta asosiy versiyani saqlab qoladi."
  ],
  "examples": [
    {
      "title": "GitLab CI da Docker image build va push qilish",
      "lang": "yaml",
      "code": [
        "build_image:",
        "  stage: build",
        "  image: docker:24.0",
        "  services:",
        "    - docker:24.0-dind",
        "  before_script:",
        "    - docker login -u $CI_REGISTRY_USER -p $CI_JOB_TOKEN $CI_REGISTRY",
        "  script:",
        "    - docker pull $CI_REGISTRY_IMAGE:latest || true",
        "    - docker build --cache-from $CI_REGISTRY_IMAGE:latest -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA -t $CI_REGISTRY_IMAGE:latest .",
        "    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA",
        "    - docker push $CI_REGISTRY_IMAGE:latest"
      ],
      "note": "Keshdan foydalanish build vaqtini 5 barobar tezlashtiradi."
    },
    {
      "title": "Serverda GitLab Container Registry dan tortib olish",
      "lang": "bash",
      "code": [
        "# Production serverda deploy token orqali kirish",
        "echo \"$DEPLOY_TOKEN\" | docker login registry.gitlab.acme.com -u gitlab+deploy-token-1 --password-stdin",
        "",
        "# Aniq commit SHA bilan imidjni yuklash",
        "docker pull registry.gitlab.acme.com/backend/billing-api:a1b2c3d4",
        "docker-compose up -d"
      ],
      "note": "Deploy token faqat o'qish (read_registry) huquqiga ega bo'lishi xavfsizlik talabidir."
    }
  ],
  "pitfalls": [
    "Productionga 'latest' tagini deploy qilish: qaysi versiya ishlayotganini aniqlab bo'lmaydi va rollback qilish imkonsizlashadi.",
    "Cleanup policy sozlanmasligi oqibatida serverning qattiq diski to'lib, butun GitLab serverining to'xtab qolishi.",
    "Docker in Docker (dind) xizmatini yoqishni unutib, 'Cannot connect to the Docker daemon' xatosini olish."
  ]
});
