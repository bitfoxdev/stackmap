/* Chuqur dars: 35.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.8", {
  "lesson": [
    "### GitLab CI/CD Variables xavfsizligi va boshqaruvi",
    "Zamonaviy ilovalarni build qilish va deploy qilish jarayonida ma'lumotlar bazasi parollari, API kalitlari, SSH shaxsiy sertifikatlari kabi maxfiy ma'lumotlar (secrets) zarur bo'ladi. Ularni repozitoriy kodiga yozish eng xatarli xatodir. GitLab **CI/CD Variables** mexanizmi ushbu parametrlarni xavfsiz inyekt qilish imkonini beradi.",
    "",
    "### O'zgaruvchilarning turlari va xususiyatlari",
    "- **Protected Variables**: Faqat va faqat Protected branch (masalan `main`) yoki Protected tag doirasida ishga tushgan pipeline lar uchun mavjud bo'ladi. Oddiy dasturchi o'zining shaxsiy feature branchida pipeline ochib, bu maxfiy o'zgaruvchilarni o'g'irlay olmaydi.",
    "- **Masked Variables**: Pipeline loglarida (konsol chiqishida) ushbu o'zgaruvchining haqiqiy qiymati yashiriladi va o'rniga `[MASKED]` ko'rsatiladi. Bu tasodifan parollarning ommaviy loglarga chiqib ketishining oldini oladi.",
    "- **Type: Variable vs File**: Odatdagi matnli o'zgaruvchilardan tashqari `File` turi mavjud. Masalan, SSH Private Key yoki Google Service Account JSON faylini saqlashda juda qulay: GitLab ushbu tarkibni vaqtinchalik xavfsiz faylga yozadi va o'zgaruvchi sifatida o'sha faylning yo'lini (path) qaytaradi.",
    "- **Environment Scope**: Bitta kalitga turli muhitlar bo'yicha turli qiymatlar berish mumkin (masalan, `staging` uchun boshqa DB paroli, `production` uchun boshqa DB paroli).",
    "",
    "### Oldindan belgilangan (Predefined) o'zgaruvchilar",
    "GitLab har bir pipeline ichiga o'nlab foydali tizim o'zgaruvchilarini avtomatik inyekt qiladi: `$CI_COMMIT_SHA` (joriy commit heshi), `$CI_COMMIT_BRANCH` (branch nomi), `$CI_JOB_TOKEN` (boshqa GitLab API ga murojaat qilish uchun bir martalik xavfsiz token)."
  ],
  "examples": [
    {
      "title": "File tipidagi SSH kalitni CI jobida ishlatish",
      "lang": "yaml",
      "code": [
        "deploy_to_server:",
        "  stage: deploy",
        "  image: alpine:latest",
        "  before_script:",
        "    - apk add --no-cache openssh-client",
        "    - chmod 600 $SSH_PRIVATE_KEY",
        "  script:",
        "    - ssh -i $SSH_PRIVATE_KEY -o StrictHostKeyChecking=no deploy@$PROD_SERVER_IP \"cd /var/www/app && git pull && php artisan migrate --force\"",
        "  rules:",
        "    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH"
      ],
      "note": "$SSH_PRIVATE_KEY fayl yo'li bo'lib, xavfsiz vaqtinchalik xotirada saqlanadi."
    },
    {
      "title": "O'zgaruvchilarni dinamik belgilash",
      "lang": "yaml",
      "code": [
        "docker_build:",
        "  stage: build",
        "  script:",
        "    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .",
        "    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA $CI_REGISTRY_IMAGE:latest"
      ],
      "note": "Predefined o'zgaruvchilar orqali imidjlar har doim aniq versiyalanadi."
    }
  ],
  "pitfalls": [
    "O'zgaruvchini Protected qilib qo'yib, uni himoyalanmagan feature branchdagi pipeline da ishlatishga urinish (qiymat bo'sh bo'lib chiqadi).",
    "Masked qilinadigan satr ichida maxsus belgilar bo'lsa (regex talablariga mos kelmasa) maskalash ishlamay qolishi.",
    "Base64 kodlangan parolni 'echo $SECRET | base64 -d' qilib konsolga to'g'ridan-to'g'ri chiqarib, maskalashni aylanib o'tish."
  ]
});
