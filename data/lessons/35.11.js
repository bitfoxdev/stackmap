/* Chuqur dars: 35.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.11", {
  "lesson": [
    "### GitLab Deployments va Release nazorati",
    "Deploy — bu muhandislik mehnatining yakuniy natijasini foydalanuvchiga yetkazish jarayonidir. GitLab platformasida **Deployments** oddiygina skript bajarish emas; u to'liq audit, versiyalar tarixi va zudlik bilan avariyaviy qaytish (Rollback) mexanizmlari bilan ta'minlangan yaxlit tizimdir.",
    "",
    "### Zudlik bilan Rollback (Qaytarish)",
    "Agar productionga chiqqan yangi versiyada jiddiy xatolik (bug) aniqlansa, yangi kod yozib kutib o'tirishga vaqt yo'q. GitLab Environments dashboardida har bir deploy yozuvi saqlanadi. Oldingi barqaror versiya yonidagi **Re-deploy** tugmasi bosilishi bilanoq, GitLab o'sha eski barqaror Docker imidj yoki commitni qayta deploy qiladi.",
    "",
    "### Deploy Freeze (Deployni muzlatish)",
    "Katta korxonalarda ma'lum paytlarda deploy qilish qat'iyan taqiqlanadi: masalan, Black Friday savdolari, bank oylik hisobot davrlari yoki bayram kunlari. **Deploy Freeze** sozlamasi orqali cron-jadval asosida (masalan, har juma soat 18:00 dan dushanba 09:00 gacha) barcha deploy pipeline lari bloklanadi.",
    "",
    "### Resource Groups (Resurslar poygasini oldini olish)",
    "Agar ikki dasturchi bir necha daqiqa farq bilan main ga kod qo'shsa, ikkita deploy jobi bir vaqtda ishga tushib, bitta serverga parallel yozishni boshlashi mumkin. Natijada ilova ishlamay qoladi. GitLab da `resource_group: production` kiritilsa, GitLab bir vaqtda faqat bitta deploy ishlashini kafolatlaydi, keyingisi esa navbatda intizom bilan kutadi."
  ],
  "examples": [
    {
      "title": "Resource Group va Manual tasdiq bilan deploy",
      "lang": "yaml",
      "code": [
        "deploy_production:",
        "  stage: deploy",
        "  resource_group: production",
        "  environment:",
        "    name: production",
        "    url: https://api.acme.com",
        "  script:",
        "    - ansible-playbook -i hosts deploy.yml --extra-vars \"release_version=$CI_COMMIT_SHORT_SHA\"",
        "  rules:",
        "    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH",
        "      when: manual"
      ],
      "note": "resource_group: production poyga holatini (race condition) butunlay yo'qotadi."
    },
    {
      "title": "GitLab API orqali Deploy Freeze sozlash",
      "lang": "bash",
      "code": [
        "# Juma kechasidan dushanba ertalabgacha deployni taqiqlash",
        "curl --request POST --header \"PRIVATE-TOKEN: $GITLAB_TOKEN\" \\",
        "     \"https://gitlab.acme.com/api/v4/projects/42/freeze_periods\" \\",
        "     --form \"freeze_start=0 18 * * 5\" \\",
        "     --form \"freeze_end=0 9 * * 1\" \\",
        "     --form \"cron_timezone=Asia/Tashkent\""
      ],
      "note": "Muzlatilgan davrda dasturchilar tasodifan tizimni buzib qo'ya olmaydi."
    }
  ],
  "pitfalls": [
    "Resource group ishlatmaslik oqibatida bir vaqtda 2 ta deploy to'qnashib, ma'lumotlar bazasi migratsiyalarini buzib qo'yishi.",
    "Rollback mexanizmini oldindan tekshirib ko'rmaslik: xatolik sodir bo'lganda tezkor qaytish imkonsiz bo'lib qolishi.",
    "Juma kuni kechqurun (Friday deploy) yangi tizimni deploy qilib, dam olish kunlarida nosozliklar bilan kurashish."
  ]
});
