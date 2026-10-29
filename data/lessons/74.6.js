/* Chuqur dars: 74.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("74.6", {
  "lesson": [
    "### End-to-End testlar",
    "E2E testlar haqiqiy brauzerda haqiqiy foydalanuvchi harakatlarini taqlid qiladi: tugmani bosish, formani to'ldirish, JavaScript bilan dinamik o'zgarish. Ular butun stekni (frontend, backend, DB) birga sinaydi.",
    "",
    "### Vositalar",
    "- **Laravel Dusk**: PHP'da yoziladi, Chrome'ni boshqaradi, Laravel bilan chuqur integratsiya.",
    "- **Playwright**: ko'p brauzer (Chromium, Firefox, WebKit), tez va barqaror, JS/TS yoki Python.",
    "- **Cypress**: JS ekotizimida mashhur, interaktiv debug.",
    "",
    "### Qachon kerak",
    "E2E faqat boshqa testlar sina olmaydigan narsa uchun: brauzer va JS bilan birga ishlaydigan **eng muhim biznes yo'llari** (ro'yxatdan o'tish, savatga qo'shib to'lov sahifasigacha borish). Hammasini E2E bilan qoplash piramidani buzadi.",
    "",
    "### Nega kam",
    "E2E sekin (soniyalar), mo'rt (UI o'zgarishi, vaqt kutish), yiqilganda sababni topish qiyin va muhit talab qiladi (brauzer, ma'lumot). Shuning uchun ularning soni oz, lekin har biri qimmatli bo'lishi kerak.",
    "",
    "### Barqarorlik qoidalari",
    "- Selektorlar uchun **barqaror atribut** ishlating (`data-testid`), CSS klasslari yoki matn emas.",
    "- Qat'iy `sleep` o'rniga **aniq kutish** (element paydo bo'lguncha).",
    "- Har test mustaqil: o'z ma'lumotini yaratsin, boshqasiga tayanmasin.",
    "- Tashqi servislarni (to'lov) test muhitida sandbox yoki fake bilan almashtiring.",
    "",
    "### Diagnostika",
    "Yiqilganda skrinshot va video saqlang (Dusk va Playwright buni beradi). CI'da shu artefaktlar nosozlikni tushunishda hal qiluvchi."
  ],
  "examples": [
    {
      "title": "Dusk bilan kritik yo'l",
      "lang": "php",
      "code": [
        "public function test_a_customer_can_buy_a_product(): void",
        "{",
        "    $this->browse(function (Browser $browser) {",
        "        $browser->loginAs(User::factory()->create())",
        "            ->visit('/products/sneakers')",
        "            ->press('@add-to-cart')",
        "            ->waitForText('Savatda 1 ta mahsulot')",
        "            ->visit('/checkout')",
        "            ->type('@phone', '+998901234567')",
        "            ->press('@pay')",
        "            ->waitForRoute('orders.thanks')",
        "            ->assertSee('Buyurtma qabul qilindi');",
        "    });",
        "}"
      ],
      "note": "@ selektorlar data-dusk atributlariga bog'liq, kutish aniq."
    },
    {
      "title": "Playwright testi",
      "lang": "js",
      "code": [
        "import { test, expect } from '@playwright/test';",
        "",
        "test('guest can sign up', async ({ page }) => {",
        "  await page.goto('/register');",
        "  await page.getByTestId('email').fill('a@ex.uz');",
        "  await page.getByTestId('password').fill('secret-pass');",
        "  await page.getByRole('button', { name: 'Ro\\'yxatdan o\\'tish' }).click();",
        "  await expect(page).toHaveURL('/dashboard');",
        "});"
      ],
      "note": "Kutish avtomatik, selektorlar rol va testid orqali."
    }
  ],
  "pitfalls": [
    "Hamma narsani E2E bilan qoplash: sekin va mo'rt to'plam, CI soatlab ishlaydi.",
    "Qat'iy `sleep()` ishlatish: sekin va baribir tasodifan yiqiladi. Aniq kutishdan foydalaning.",
    "CSS klass yoki matnga bog'langan selektorlar: dizayn o'zgarishi testlarni sindiradi.",
    "Yiqilgan E2E uchun skrinshot va log saqlamaslik: nosozlikni qayta yaratib bo'lmaydi."
  ]
});
