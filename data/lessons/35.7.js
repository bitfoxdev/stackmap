/* Chuqur dars: 35.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.7", {
  "lesson": [
    "### GitLab Runner arxitekturasi va ishlash modeli",
    "GitLab serverining o'zi (GitLab Coordinator) kodni tekshirish, testlarni o'tkazish yoki build qilish bilan shug'ullanmaydi. Bu vazifani alohida ajratilgan agentlar — **GitLab Runners** amalga oshiradi. Runner — bu alohida server, virtual mashina yoki Kubernetes klasterida ishlaydigan Go tilida yozilgan yengil dasturiy ta'minotdir.",
    "",
    "Muhim me'moriy jihat: Runnerlar **pull-model** asosida ishlaydi. Ular tashqi dunyodan portlarni ochishni talab qilmaydi; runner o'zi muntazam ravishda GitLab API ga so'rov yuborib, o'ziga mos yangi joblar bor-yo'qligini tekshiradi.",
    "",
    "### Runnerlarning darajalari",
    "- **Shared (Instance) Runners**: Butun GitLab instansiyasidagi barcha loyihalar uchun umumiy foydalanishga berilgan resurslar.",
    "- **Group Runners**: Muayyan bo'lim yoki guruhga xizmat qiladi, resurslar guruhdagi loyihalar o'rtasida taqsimlanadi.",
    "- **Project (Specific) Runners**: Faqat bitta nozik loyiha uchun ajratilgan (masalan, maxsus apparat ta'minoti, GPU yoki yopiq ichki tarmoqqa ulanish zarur bo'lganda).",
    "",
    "### Executor turlari",
    "Job buyruqlari qayerda bajarilishini belgilovchi mexanizm:",
    "- **Docker Executor**: Sanoat standarti! Har bir job uchun toza va izolyatsiyalangan Docker konteyneri ko'tariladi, job tugagach konteyner to'liq o'chiriladi. Hech qanday iz qolmaydi.",
    "- **Kubernetes Executor**: Katta korxonalarda qo'llaniladi; har bir job uchun K8s klasterida yangi Pod ochiladi va avtomatik masshtablanadi (autoscaling).",
    "- **Shell Executor**: Buyruqlarni to'g'ridan-to'g'ri xost server tizimida bajaradi. Xavfli hisoblanadi, faqat maxsus kompilatsiya vazifalarida qo'llaniladi.",
    "",
    "### Tags orqali yo'naltirish",
    "Agar loyihaga maxsus runner kerak bo'lsa (masalan Apple Silicon yoki yuqori xotirali server), `.gitlab-ci.yml` dagi jobga `tags: [high-memory, docker]` biriktiriladi. GitLab faqat shu teglar mavjud bo'lgan runnerni tanlaydi."
  ],
  "examples": [
    {
      "title": "config.toml — Docker Runner konfiguratsiyasi",
      "lang": "toml",
      "code": [
        "concurrent = 4",
        "check_interval = 5",
        "",
        "[[runners]]",
        "  name = \"hetzner-docker-runner-01\"",
        "  url = \"https://gitlab.acme.com\"",
        "  id = 12",
        "  token = \"glrt-xxxxxxxxxxxx\"",
        "  executor = \"docker\"",
        "  [runners.docker]",
        "    image = \"docker:24.0\"",
        "    privileged = false",
        "    volumes = [\"/cache\"]",
        "    shm_size = 2147483648"
      ],
      "note": "Bir vaqtda 4 ta parallel jobni xavfsiz konteynerlarda bajarish sozlamasi."
    },
    {
      "title": "Jobni teg orqali maxsus runnerga yo'naltirish",
      "lang": "yaml",
      "code": [
        "heavy_integration_test:",
        "  stage: test",
        "  tags:",
        "    - high-cpu",
        "    - docker",
        "  script:",
        "    - ./vendor/bin/pest --parallel --processes=8"
      ],
      "note": "Faqat 'high-cpu' tegli quvvatli runner ushbu vazifani qabul qiladi."
    }
  ],
  "pitfalls": [
    "Shell executor dan foydalanib, dasturchilarga serverning asosiy tizimida root huquqlari bilan amallar bajarishga yo'l ochib berish.",
    "Jobga mavjud bo'lmagan teg biriktirib qo'yish: natijada pipeline abadiy 'stuck' (kutish) holatida qolib ketadi.",
    "Docker executor da disk maydonini nazorat qilmaslik: eski konteyner qoldiqlari runner serverini to'ldirib, joblarni to'xtatib qo'yadi."
  ]
});
