/* Chuqur dars: 1.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.19", {
  "lesson": [
    "### Anonymous class",
    "`new class(...) extends Base implements Contract { ... }` — nomsiz, bir martalik klass. Konstruktor argumentlari, extends va implements ishlaydi.",
    "",
    "### Cheklovlar",
    "- Serialize qilib bo'lmaydi.",
    "- Bir xil kod har safar bir klass; ko'p marta chaqirilsa (tsikl) klass bir marta yaratiladi, obyektlar esa har safar yangi.",
    "- Statik tahlil va IDE ularni yaxshi ko'rmaydi, takroriy ishlatishda nomli klass yozing.",
    "- Katta mantiq yozish — kod hidi.",
    "",
    "### Anonymous class tafsiloti",
    "- Sintaksis: `new class(...$ctorArgs) extends Parent implements I1, I2 { use T; ... }`.",
    "- Konstruktor argumentlari klass nomidan keyin; `readonly` (8.3), attribute ham mumkin.",
    "- Ichki nom: `class@anonymous` + NUL belgi + fayl:qator. `get_class()` natijasini log'ga yozishda NUL belgi chiqadi; `str_contains(get_class($o), 'class@anonymous')` bilan tekshiring.",
    "- Har bir anonymous klass **kodda bitta klass** (har chaqiruvda yangi emas), lekin ichki closure'lar bilan farq qilishi mumkin; bir xil joydan yaratilgan nusxalar bir klass.",
    "",
    "### Qayerda foydali",
    "- **Test double:** kichik fake/stub (`new class implements Mailer {}`).",
    "- **Adapter:** uchinchi tomon obyektini interface'ga moslash.",
    "- **Null Object**.",
    "- **Iteratorlar va DTO** juda kichik, bir joylik.",
    "- **Arrow shaklida plugin** (Laravel `Route::macro` o'rniga ba'zan).",
    "",
    "### Qachon yomon",
    "- Qayta ishlatish kerak (nomli klass).",
    "- Katta mantiq (testlash, o'qish qiyin).",
    "- Serialize/queue (mumkin emas).",
    "- Statik tahlil/IDE: `@var` kerak bo'lishi mumkin.",
    "- Doctrine/Eloquent model sifatida.",
    "",
    "### Closure bilan solishtirish",
    "Faqat bitta metod kerak bo'lsa closure yetarli. Bir nechta metod, holat va interface shart bo'lsa — anonymous class.",
    "",
    "### Mockery bilan aloqasi",
    "`Mockery::mock()` va PHPUnit `createMock()` ko'proq xususiyatga ega (chaqiruv sonini tekshirish); anonymous class esa \"qo'lda yozilgan fake\" — oddiy, deterministik, tushunarli."
  ],
  "examples": [
    {
      "title": "Test stub",
      "lang": "php",
      "code": [
        "$mailer = new class implements Mailer {",
        "    public array $sent = [];",
        "    public function send(string $to, string $body): void { $this->sent[] = $to; }",
        "};",
        "",
        "(new Welcome($mailer))->handle($user);",
        "assert($mailer->sent === ['ali@mail.uz']);"
      ]
    },
    {
      "title": "Konstruktor va extends",
      "lang": "php",
      "code": [
        "$logger = new class('app.log') extends BaseLogger implements Countable {",
        "    public function __construct(private string $file) {}",
        "    public function count(): int { return 0; }",
        "};",
        "echo str_contains(get_class($logger), 'class@anonymous') ? 'anon' : 'nomli';"
      ]
    },
    {
      "title": "Adapter",
      "lang": "php",
      "code": [
        "$logger = new class($monolog) implements LoggerInterface {",
        "    public function __construct(private \\Monolog\\Logger $m) {}",
        "    public function info(string $msg, array $ctx = []): void { $this->m->info($msg, $ctx); }",
        "};"
      ]
    },
    {
      "title": "Iterator",
      "lang": "php",
      "code": [
        "$evens = new class implements IteratorAggregate {",
        "    public function getIterator(): Generator { for ($i = 0; $i < 10; $i += 2) yield $i; }",
        "};",
        "foreach ($evens as $e) echo $e;"
      ]
    }
  ],
  "pitfalls": [
    "Anonymous class'ni `serialize` yoki queue'ga berib bo'lmaydi.",
    "Katta mantiqni anonymous klassga joylash testlash va o'qishni yomonlashtiradi.",
    "Anonymous class nomi fayl yo'liga bog'liq va NUL belgi bor: log/solishtirishda ehtiyot bo'ling.",
    "Statik tahlil anonymous class'ni to'liq tushunmasligi mumkin: interface bilan tiplang."
  ]
});
