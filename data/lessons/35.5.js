/* Chuqur dars: 35.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("35.5", {
  "lesson": [
    "### GitLab Issues va Issue Boards arxitekturasi",
    "GitLab platformasidagi **Issues** — vazifalar, kamchiliklar (bug), g'oyalar va texnik qarzni boshqarish uchun o'rnatilgan tizimdir. Uchinchi tomon dasturlari (Jira, Trello) bilan integratsiya qilish mumkin bo'lsa-da, GitLab ning o'zida ishlash vazifaning kod, MR va CI/CD pipeline bilan bevosita bog'lanishini ta'minlaydi.",
    "",
    "### Muhim funksional imkoniyatlar",
    "- **Issue Templates**: `.gitlab/issue_templates/` papkasida maxsus markdown shablonlar (masalan `bug.md`, `feature.md`) yaratiladi. Foydalanuvchi yoki tester xatolik haqida xabar berganda, tizim ulardan qadamlar, kutilgan natija va loglarni aniq kiritishni talab qiladi.",
    "- **Scoped Labels (Ikkitalik teglar)**: GitLab ning eng qulay xususiyati bo'lib, `key::value` formatida ishlaydi (masalan, `priority::high`, `status::in_progress`, `type::bug`). Bitta obyektda bitta kalitdan faqat bitta qiymat bo'lishi mumkin: agar issue ga `status::done` qo'shilsa, avvalgi `status::in_progress` avtomatik o'chadi.",
    "- **Weight va Estimation**: Vazifaning qiyinchiligini baholash (Story points) va vaqt hisobi (`/estimate 4h`, `/spend 2h`).",
    "- **Milestones va Epics**: Muayyan sprint yoki versiya relizi doirasidagi vazifalarni birlashtirish.",
    "",
    "### Issue Boards (Kanban)",
    "Issue Board — jamoaning ish jarayonini vizualizatsiya qiluvchi doska. Har bir ustun muayyan label yoki mas'ul shaxsga bog'lanadi. Dasturchi kartochkani 'To Do' ustunidan 'In Progress' ustuniga surganida, GitLab tegishli scoped labelni avtomatik yangilaydi.",
    "",
    "### Quick Actions",
    "Izoh yozish maydonida maxsus slash-komandalar orqali vazifani tezkor boshqarish mumkin: `/assign @developer`, `/milestone %\"Sprint 12\"`, `/close`."
  ],
  "examples": [
    {
      "title": "Bug Report shabloni (.gitlab/issue_templates/bug.md)",
      "lang": "markdown",
      "code": [
        "## Muammo tavsifi",
        "Aniq va lo'nda tushuntiring.",
        "",
        "## Qayta takrorlash qadamlari",
        "1. POST /api/v1/orders so'rovini yuboring",
        "2. Payload ichida bo'sh massiv bering",
        "",
        "## Kutilgan natija",
        "422 Unprocessable Entity status kodi",
        "",
        "## Haqiqiy natija va xato logi",
        "500 Internal Server Error",
        "",
        "/label ~\"type::bug\" ~\"priority::high\""
      ],
      "note": "Shablon oxiridagi /label buyrug'i issue ochilishi bilan teglarni o'zi qo'yadi."
    },
    {
      "title": "Quick Actions buyruqlari bilan ishlash",
      "lang": "text",
      "code": [
        "/assign @nodir_dev",
        "/estimate 3d",
        "/spend 4h",
        "/milestone %\"Release 2.4\"",
        "/weight 5"
      ],
      "note": "Izoh qoldirishda bir vaqtning o'zida vazifa parametrlari o'zgaradi."
    }
  ],
  "pitfalls": [
    "Oddiy teglardan foydalanib, bitta issue da bir vaqtning o'zida 'doing' va 'done' teglari paydo bo'lishiga yo'l qo'yish: doimo scoped label (~'status::...') ishlating.",
    "Shablonlarsiz betartib issue ochish: dasturchilar xatolikni qayta takrorlash uchun kerakli ma'lumotlarni ololmay vaqt yo'qotadi.",
    "Issue ochib uni tegishli Merge Request bilan bog'lamaslik: natijada vazifa bajarilgan bo'lsa ham ochiq qolib ketaveradi."
  ]
});
