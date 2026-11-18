/* Chuqur dars: 35.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.10", {
  "lesson": [
    "### GitLab Environments va Review Apps imkoniyatlari",
    "Dasturiy ta'minotni ishlab chiqishda kod shunchaki repozitoriyda turmaydi; u turli xil server muhitlarida (`development`, `staging`, `production`) ishga tushadi. GitLab **Environments** vositasi har bir muhitning holatini, hozirda qaysi versiya ishlayotganini va o'tmishdagi deploylar tarixini vizual boshqarish imkonini beradi.",
    "",
    "### Review Apps: Dinamik test muhitlari",
    "GitLab Environments ning eng hayratlanarli xususiyatlaridan biri — **Review Apps** dir. Har bir yangi ochilgan Merge Request uchun alohida dinamik muhit yaratiladi (masalan, `review/feature-102-refund`).",
    "- Dasturchi kod yozadi va MR ochadi.",
    "- GitLab CI/CD avtomatik tarzda alohida subdomainda vaqtinchalik test serverini yoki Docker konteynerini ko'taradi.",
    "- Mahsulot menejeri, dizayner yoki tester havolani ochib, kod productionga chiqmasdan oldin yangi funksiyani real interfeysda ko'rib chiqadi.",
    "- MR merge qilinganda yoki yopilganda, `on_stop` harakati orqali ushbu vaqtinchalik server avtomatik o'chirib tashlanadi.",
    "",
    "### Protected Environments",
    "Xavfsizlik va audit talablariga muvofiq, `production` muhitiga kimlar deploy qila olishini qat'iy cheklash mumkin. Masalan, oddiy dasturchilar faqat `staging` ga deploy qila oladi; `production` ga esa faqat Team Lead yoki Release Manager ruxsati bilan o'tkaziladi."
  ],
  "examples": [
    {
      "title": "Dinamik Review App va Auto-Stop sozlamasi",
      "lang": "yaml",
      "code": [
        "deploy_review:",
        "  stage: deploy",
        "  script:",
        "    - deploy_review_app.sh $CI_ENVIRONMENT_SLUG",
        "  environment:",
        "    name: review/$CI_COMMIT_REF_SLUG",
        "    url: https://$CI_ENVIRONMENT_SLUG.dev.acme.com",
        "    on_stop: stop_review",
        "  rules:",
        "    - if: $CI_MERGE_REQUEST_IID",
        "",
        "stop_review:",
        "  stage: deploy",
        "  variables:",
        "    GIT_STRATEGY: none",
        "  script:",
        "    - destroy_review_app.sh $CI_ENVIRONMENT_SLUG",
        "  environment:",
        "    name: review/$CI_COMMIT_REF_SLUG",
        "    action: stop",
        "  rules:",
        "    - if: $CI_MERGE_REQUEST_IID",
        "      when: manual"
      ],
      "note": "MR yopilganda stop_review avtomatik chaqirilib, server resurslari tozalanadi."
    },
    {
      "title": "Production muhiti deklaratsiyasi",
      "lang": "yaml",
      "code": [
        "deploy_prod:",
        "  stage: deploy",
        "  script:",
        "    - ./deploy.sh production",
        "  environment:",
        "    name: production",
        "    url: https://app.acme.com",
        "  rules:",
        "    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH",
        "      when: manual"
      ],
      "note": "Productionga deploy faqat bosh branchdan va qo'lda (manual) tasdiqlash orqali amalga oshadi."
    }
  ],
  "pitfalls": [
    "`on_stop` amalini to'g'ri sozlamaslik: yuzlab MR lar yopilgandan keyin ham test serverlari o'chmay, hisob-kitob xarajatlarini oshirib yuborishi.",
    "Review app larda production ma'lumotlar bazasining nusxasini maxfiylashtirmasdan (anonymize qilmasdan) ishlatish.",
    "Protected environment sozlanmagani sababli, ixtiyoriy xodim yanglishib productionga xom kodni deploy qilib qo'yishi."
  ]
});
