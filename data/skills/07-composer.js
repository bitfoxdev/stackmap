/* 07 · Composer
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  "id": 7,
  "slug": "composer",
  "title": "Composer",
  "group": "php-laravel",
  "description": "Composer — PHP'ning dependency manager'i va autoloader generatori. Har bir Laravel loyihasi unga tayanadi. Senior darajada versiya cheklovlarini to'g'ri yozish, lock faylni boshqarish, konfliktlarni hal qilish, xavfsizlik auditi va takrorlanadigan (reproducible) build'larni ta'minlash talab qilinadi.",
  "subskills": [
    {
      "id": "7.1",
      "title": "`composer.json`",
      "description": [
        "`composer.json` — loyihaning bog'liqliklar, autoload, skriptlar va sozlamalar manifesti. Ikki rol: **ilova** (root, `type: project`) va **kutubxona** (`type: library`, Packagist'ga chiqariladi). Root-only maydonlar (`require-dev`, `minimum-stability`, `repositories`, `config`, `scripts`) faqat ildiz paketda ishlaydi, bog'liqlikda e'tiborga olinmaydi."
      ],
      "priority": "core",
      "level": "Foundation",
      "practicalTask": "Laravel loyihasining `composer.json` ini o'qib har bir bo'limini tushuntiring; kutubxona uchun yangi `composer.json` yarating (`name`, `type`, `require` php va ext, `autoload.psr-4`, `autoload-dev`, `config.sort-packages`) va `composer validate --strict` bilan tekshiring.",
      "acceptanceCriteria": [
        "`name`, `type`, `require`, `require-dev`, `autoload`, `autoload-dev`, `scripts`, `config`, `extra` vazifasini biladi",
        "Root-only va umumiy maydonlar farqini biladi",
        "`conflict`, `replace`, `provide`, `suggest` nimaga ishlatilishini biladi",
        "`composer validate --strict` bilan fayl sifatini tekshira oladi"
      ],
      "prerequisites": []
    },
    {
      "id": "7.2",
      "title": "`composer.lock`",
      "description": [
        "`composer.lock` — `composer update` natijasi: har bir paket (tranzitiv ham) va uning **aniq** versiyasi, manbasi va hash'lari. Maqsadi: har muhitda (lokal, CI, production) bir xil versiyalar. Lock'siz `install` — versiyalar tasodifiy yangilanishi. Docs: hamma uchun, jumladan CI va production uchun bir xil versiyalar; kutubxona ham lock'ni commit qilishi mumkin."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`composer.lock` ni oching: `packages`, `packages-dev`, `content-hash`, `platform`; `install` va `update` farqini namoyish eting; lock'ni git'da yangilash/PR review qoidasini yozing; `composer update --lock` va `composer validate` bilan \"lock eskirgan\" holatini ushlang.",
      "acceptanceCriteria": [
        "Lock fayli nimani saqlashini va `content-hash` rolini biladi",
        "`install` (lock bo'yicha) va `update` (lock'ni yangilaydi) farqini biladi",
        "Lock'ni commit qilish sababini va merge-konfliktni hal qilishni biladi",
        "Lock eskirganda nima bo'lishini biladi"
      ],
      "prerequisites": [
        "7.1"
      ]
    },
    {
      "id": "7.3",
      "title": "Dependency Management",
      "description": [
        "Dependency management — loyiha nimaga tayanishini nazorat qilish: to'g'ridan-to'g'ri (direct) va tranzitiv (indirect) bog'liqliklar, `composer why/why-not`, `show`, `outdated`. Har bir qo'shilgan paket — texnik qarz va xavf yuzasi (xavfsizlik, litsenziya, qo'llab-quvvatlash). Senior uchun: paket tanlash mezonlari, kerakmas bog'liqliklarni olib tashlash va \"nega bu paket bor?\" savoliga javob."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Loyihada `composer why`, `why-not`, `show --tree`, `outdated --direct` va `remove --unused` bilan bog'liqliklar xaritasini chiqaring; bitta paketni tanlash mezonlari (faol, litsenziya, versiya, xavfsizlik) bo'yicha baholang va keraksiz paketni olib tashlang.",
      "acceptanceCriteria": [
        "Direct va tranzitiv bog'liqlikni ajratadi",
        "`why`, `why-not`, `show --tree`, `outdated`, `remove --unused` buyruqlarini biladi",
        "Paket tanlash mezonlarini (litsenziya, qo'llab-quvvatlash, xavfsizlik) biladi",
        "Tranzitiv xavf va \"bog'liqlik og'irligi\"ni baholay oladi"
      ],
      "prerequisites": [
        "7.1"
      ]
    },
    {
      "id": "7.4",
      "title": "Semantic Versioning",
      "description": [
        "Semantic Versioning (SemVer) — `MAJOR.MINOR.PATCH`: breaking o'zgarish → major, orqaga mos yangi imkoniyat → minor, xato tuzatish → patch. Composer cheklovlari (`^`, `~`) shu shartnomaga tayanadi. Ammo SemVer — va'da, kafolat emas: minor'da ham regressiya bo'lishi mumkin, shuning uchun lock va testlar kerak. `0.x` versiyalar — beqaror (har minor breaking bo'lishi mumkin)."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Bir kutubxonaning changelog'idan breaking/minor/patch o'zgarishlarni ajrating; `^1.2.3`, `^0.3`, `~1.2`, `~1.2.3` qaysi versiyalarni qamrab olishini yozing va `composer show -a vendor/pkg` bilan tekshiring; o'z paketingiz uchun versiya siyosatini tuzing.",
      "acceptanceCriteria": [
        "MAJOR.MINOR.PATCH ma'nosini va qaysi o'zgarish qaysi raqamni oshirishini biladi",
        "`0.x` versiyalarning alohida xatti-harakatini biladi",
        "Pre-release (alpha/beta/RC) va stability tushunchasini biladi",
        "SemVer va'da ekanini, lock/test zarurligini tushunadi"
      ],
      "prerequisites": []
    },
    {
      "id": "7.5",
      "title": "Version Constraints",
      "description": [
        "Version constraints — qaysi versiyalarni qabul qilishni belgilaydi. Docs ro'yxati: aniq (`1.0.2`), diapazon (`>=1.0 <2.0`, `||`), tire (`1.0 - 2.0`), wildcard (`1.0.*`), tilde (`~1.2`), caret (`^1.2.3`). Kutubxonalar uchun `^` tavsiya etiladi. Ilovada ham `^` odatiy; qattiq cheklash o'rniga lock bilan pin qilinadi."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`^1.2.3`, `^0.3`, `^0.0.3`, `~1.2`, `~1.2.3`, `1.0 - 2.0`, `1.0.*`, `>=1.0 <1.5 || ^2.0` ning aniq diapazonini jadvalda yozing; `composer require` yordamida yozilgan cheklovni tushuntiring va `composer why-not` bilan nomuvofiqlikni toping.",
      "acceptanceCriteria": [
        "`^`, `~`, wildcard, tire, diapazon va `||` ning aniq ma'nosini biladi",
        "`0.x` uchun `^` ning qisqarishini biladi",
        "`minimum-stability`, `prefer-stable` va `@dev` flaglarini biladi",
        "Kutubxona va ilova uchun cheklov uslubini ajratadi"
      ],
      "prerequisites": [
        "7.4"
      ]
    },
    {
      "id": "7.6",
      "title": "PSR-4 Autoloading",
      "description": [
        "Autoloading — `require` yozmasdan klasslarni nomi bo'yicha yuklash: `vendor/autoload.php`. **PSR-4**: namespace prefiksi katalogga bog'lanadi (`App\\\\` → `app/`), qolgan namespace yo'l bo'ladi, fayl nomi = klass nomi (katta-kichik harf muhim!). Production uchun autoloader optimallashtiriladi (classmap, authoritative, APCu). Windows'da yozilgan, Linux'da ishlamaydigan \"case-sensitive\" xato — eng ko'p uchraydigan tuzoq."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "`composer.json` da PSR-4 xaritasini yozing (`App\\\\ => app/`, `Tests\\\\ => tests/` autoload-dev), `composer dump-autoload -o` va `--strict-psr` bilan mapping xatolarini toping, `classmap-authoritative` ni production'da yoqing va Windows → Linux case-sensitive xatosini takrorlab ko'ring.",
      "acceptanceCriteria": [
        "PSR-4 qoidasini (prefiks → katalog, fayl nomi = klass nomi) biladi",
        "`classmap`, `files`, `psr-0`, `exclude-from-classmap` ni biladi",
        "`dump-autoload -o/-a`, `--apcu`, `--strict-psr` ni biladi va qachon kerakligini biladi",
        "Case-sensitivity va namespace/yo'l nomuvofiqligi xatolarini topa oladi"
      ],
      "prerequisites": [
        "1.10"
      ]
    },
    {
      "id": "7.7",
      "title": "Package Installation va Removal",
      "description": [
        "Paketni o'rnatish va olib tashlash: `composer require`, `remove`, `update`, `reinstall`. Har buyruq `composer.json`, `composer.lock` va `vendor/` ni birga yangilaydi. Muhim variantlar: `--dev`, `--no-update`, `--with-all-dependencies (-W)`, `--dry-run`, `--minimal-changes`. Noto'g'ri `update` butun daraxtni siljitadi: shuning uchun ismli (aniq paket) yangilash va `--dry-run` odat bo'lsin."
      ],
      "priority": "important",
      "level": "Foundation",
      "practicalTask": "Yangi paketni `require --dry-run` bilan sinab, keyin o'rnating; `require --dev`, `remove`, `update vendor/pkg -W`, `update --lock`, `reinstall` buyruqlarini ishlating; bitta paketni yangilaganda lock diff'ida faqat kerakli paketlar o'zgarganini tekshiring.",
      "acceptanceCriteria": [
        "`require`, `remove`, `update`, `reinstall`, `install` farqini biladi",
        "`--dev`, `--no-update`, `-w/-W`, `--dry-run`, `--minimal-changes` ni biladi",
        "Ismli `update` va to'liq `update` xavfini biladi",
        "Lock diff'ini tekshirib yangilash natijasini baholaydi"
      ],
      "prerequisites": [
        "7.1"
      ]
    },
    {
      "id": "7.8",
      "title": "`require` va `require-dev`",
      "description": [
        "`require` — ilovaning runtime'da kerak bo'lgan bog'liqliklari (production'da o'rnatiladi); `require-dev` — faqat ishlab chiqish va test (`--no-dev` o'tkazib yuboradi). `require-dev` root-only: boshqa paket sizning `require-dev` ingizni o'rnatmaydi. Noto'g'ri bo'linish — production'ga ortiqcha kod (xavf, hajm) yoki aksincha runtime'da \"class not found\"."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Loyihadagi paketlarni `require` va `require-dev` ga to'g'ri taqsimlang (Faker, Telescope, Debugbar, Pail va h.k.); `composer install --no-dev` va `dump-autoload --no-dev` bilan production simulyatsiyasi qilib `class not found` xatolarini toping.",
      "acceptanceCriteria": [
        "`require` va `require-dev` farqini va `--no-dev` ta'sirini biladi",
        "Paketni qaysi bo'limga qo'yishni asoslay oladi (runtime vs dev)",
        "`autoload-dev` va `--no-dev` autoload'ga ta'sirini biladi",
        "Dev paketga production kodidan bog'lanish xatosini tushunadi"
      ],
      "prerequisites": [
        "7.1"
      ]
    },
    {
      "id": "7.9",
      "title": "Composer Scripts",
      "description": [
        "Composer scripts — `composer.json` dagi `scripts` bo'limi: hodisalarga (`post-install-cmd`, `post-autoload-dump`...) ulanadigan yoki `composer <nom>` bilan chaqiriladigan buyruqlar. Turlari: PHP callback, shell buyruq, `@php`/`@composer`/`@putenv`, boshqa skriptga havola (`@nom`). **Faqat root paketning** skriptlari ishlaydi. Xavfsizlik: skript va plugin — kod bajarish, shuning uchun `allow-plugins` va ishonchsiz paket."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "`scripts` da `test`, `lint`, `ci` (boshqa skriptlarni zanjirlaydi), `post-autoload-dump` (`@php artisan package:discover`) yozing; `scripts-descriptions` qo'shing; `--no-scripts` bilan nima o'zgarishini tekshiring; plugin `allow-plugins` ro'yxatini ko'rib chiqing.",
      "acceptanceCriteria": [
        "Asosiy event nomlarini (`post-install-cmd`, `post-update-cmd`, `post-autoload-dump`, ...) biladi",
        "Skript turlarini (callback, shell, `@php`, `@composer`, `@name`, `@putenv`) biladi",
        "Maxsus buyruq (`composer test`), `scripts-descriptions`, `--no-scripts` ni biladi",
        "Skript/plugin xavfsizligini (`allow-plugins`, faqat root skriptlari) biladi"
      ],
      "prerequisites": [
        "7.1"
      ]
    },
    {
      "id": "7.10",
      "title": "Private Packages",
      "description": [
        "Private packages — korporativ yoki yopiq kodni Composer paketi sifatida tarqatish. Variantlar: `vcs` repository (GitHub/GitLab/Bitbucket private repo), `path` (lokal/monorepo, symlink), `composer` (Satis, Private Packagist, GitLab/GitHub Packages, Artifactory), `artifact` (zip fayllar). Kirish: `auth.json`, `COMPOSER_AUTH`, `http-basic`, `github-oauth`, `gitlab-token`. Senior uchun: kreditlarni xavfsiz saqlash (git'ga emas), CI'da token va versiya teglari."
      ],
      "priority": "optional",
      "level": "Middle",
      "practicalTask": "Private GitLab repo'sini `vcs` repository sifatida ulang; lokal rivojlanish uchun `path` repository (symlink) qo'shing; CI'da `COMPOSER_AUTH` bilan token bering va `auth.json` git'ga tushmasligini ta'minlang; teg `v1.0.0` bilan versiya chiqaring.",
      "acceptanceCriteria": [
        "`vcs`, `path`, `composer`, `artifact` repository turlarini biladi",
        "Autentifikatsiyani (`auth.json`, `COMPOSER_AUTH`, `http-basic`, token) xavfsiz sozlay oladi",
        "Repository tartibi (birinchi mos kelgan g'olib) va `canonical`/`only` kabi xavfsizlik ta'sirini biladi",
        "Versiya manbalari (git teg/branch) va private registry variantlarini biladi"
      ],
      "prerequisites": [
        "7.1",
        "35.11"
      ]
    },
    {
      "id": "7.11",
      "title": "Packagist",
      "description": [
        "Packagist — Composer'ning default ommaviy paket ro'yxati (packagist.org). U kodni saqlamaydi: faqat metadata (nom, versiyalar, bog'liqliklar) va VCS (GitHub/GitLab) repo'ga havola; Composer paketni to'g'ridan-to'g'ri o'sha manbadan yuklaydi. Paket nashr qilish: repo URL'ini ro'yxatdan o'tkazish + teg qo'yish + webhook. Iste'molchi sifatida: paket sifati va ishonchliligini baholash muhim (zararli/typosquat paketlar)."
      ],
      "priority": "important",
      "level": "Junior",
      "practicalTask": "Packagist'da paket sahifasini ko'rib chiqing (versiyalar, bog'liqliklar, abandoned belgisi, advisory'lar, yuklab olishlar) va `composer show -a`/`composer search` bilan solishtiring; o'z paketingizni Packagist'ga qo'shish tartibini (repo, teg, webhook) yozing va typosquatting'dan himoya choralarini sanang.",
      "acceptanceCriteria": [
        "Packagist nima saqlashini (metadata) va kodni qayerdan olishini biladi",
        "Paket nashr qilish tartibini (repo URL, `composer.json` `name`, teglar, webhook) biladi",
        "Paket sahifasidan sifat ko'rsatkichlarini (faollik, advisory, abandoned) o'qiy oladi",
        "Typosquatting va zararli paket xavfini biladi"
      ],
      "prerequisites": [
        "7.3"
      ]
    },
    {
      "id": "7.12",
      "title": "Dependency Conflict Resolution",
      "description": [
        "Dependency conflict — Composer resolver (SAT) hamma cheklovni qondiradigan versiyalar to'plamini topa olmaganda xato beradi (\"Your requirements could not be resolved to an installable set of packages\"). Sababi: ikki paket bir bog'liqlikning mos kelmaydigan versiyalarini talab qiladi, PHP/ext versiyasi, `conflict`/`replace`, `minimum-stability`. Tashxis: `why`, `why-not`, xato matnini o'qish. Yechim: yangilash, cheklovni kengaytirish, almashtirish, fork — oxirgi chora sifatida `--ignore-platform-req`."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Sun'iy konflikt yarating (ikki paket `monolog` ning turli major'larini talab qiladi) va `composer why-not`, `composer why`, `composer update -W`, `composer require --dry-run` bilan hal qiling; PHP versiyasi to'sqinlik qilganda `config.platform` va `--ignore-platform-req` farqini tushuntiring.",
      "acceptanceCriteria": [
        "Konflikt xato xabarini o'qib, sababni topa oladi",
        "`why`, `why-not`, `-W`, `--dry-run`, `prohibits/depends` ni ishlata oladi",
        "`--ignore-platform-req(s)` va `config.platform` xavfini biladi",
        "`conflict`, `replace`, `provide`, `minimum-stability` ning ta'sirini biladi"
      ],
      "prerequisites": [
        "7.5"
      ]
    },
    {
      "id": "7.13",
      "title": "Security Audit",
      "description": [
        "`composer audit` — o'rnatilgan (yoki lock'dagi) paketlarni **ma'lum zaifliklar** (security advisories), **abandoned** va (yangi docs bo'yicha) boshqa policy qoidalar bo'yicha tekshiradi. Exit code: `0` — muammo yo'q, `1` — policy bo'yicha topilma. Composer 2.4+ da audit buyrug'i bor; yangi versiyalarda `install/update` ham zaif versiyalarni bloklashi mumkin va sozlamalar `config.policy` ga ko'chirilmoqda (eski `config.audit` deprecated). Audit — faqat **ma'lum** zaifliklarni topadi."
      ],
      "priority": "core",
      "level": "Middle",
      "practicalTask": "CI'ga `composer audit --locked` qo'shing (xato bo'lsa build yiqilsin), `--format=json` bilan natijani hisobotga yozing, `ignore` qoidasini sabab va muddat bilan sozlang, abandoned paket siyosatini (`report`/`fail`) belgilang va Dependabot/Renovate bilan to'ldiring.",
      "acceptanceCriteria": [
        "`composer audit` ning nima tekshirishini (advisory, abandoned) va exit code'larini biladi",
        "`--locked`, `--format`, `--no-dev`, `--abandoned`, `--direct` variantlarini biladi",
        "`config.audit`/`config.policy` orqali ignore va abandoned siyosatini sozlay oladi",
        "Audit chegaralarini (faqat ma'lum zaiflik) va to'ldiruvchi vositalarni biladi"
      ],
      "prerequisites": [
        "51.20"
      ]
    },
    {
      "id": "7.14",
      "title": "Reproducible Builds",
      "description": [
        "Reproducible build — bir xil kirishdan (kod + lock) har safar bir xil `vendor/` olish. Composer docs: lock bilan `install` takrorlanuvchi natija beradi (autoloader fayllari ham, vaqt belgilaridan tashqari). Qo'shimcha omillar: Composer versiyasi, PHP versiyasi/kengaytmalar, `COMPOSER_*` sozlamalar, tarmoq (dist URL), `autoloader-suffix` (lock'ning `content-hash` iga bog'liq). Maqsad: \"bir marta build — hamma muhitga deploy\" (build artefaktini ilgari surish)."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Dockerfile'da multi-stage build yozing: `composer:2` image (versiyani qotirib), `composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction` va `composer check-platform-reqs`; ikki marta build qilib `vendor/` hash'larini solishtiring; artefaktni staging → production'ga o'zgartirmay ko'chirish tartibini yozing.",
      "acceptanceCriteria": [
        "Reproducibility omillarini (lock, Composer/PHP versiyasi, platform) biladi",
        "`install` (lock) va `update` farqi, `--prefer-dist`, `--no-dev`, `-o`/`-a` ni biladi",
        "`config.platform`, `check-platform-reqs`, `platform_check.php` rolini biladi",
        "\"Bir marta build, hamma joyga deploy\" tamoyilini tushuntira oladi"
      ],
      "prerequisites": [
        "7.2",
        "36.13"
      ]
    },
    {
      "id": "7.15",
      "title": "Production Dependencies (`--no-dev`)",
      "description": [
        "Production bog'liqliklari — `composer install --no-dev` (dev paketlarsiz), autoloader optimallashtirish, platform tekshiruvi va deploy tartibi. Asosiy qoida: production'da `install` (lock bo'yicha), `update` emas; dev paketlar yo'q; `-o` yoki `-a`; Laravel'da `optimize` (2.41) bilan birga. Noto'g'ri sozlama: dev paketlar (Debugbar, Faker, test) production'da qoladi yoki `autoload-dev` yo'qligidan xato."
      ],
      "priority": "core",
      "level": "Junior",
      "practicalTask": "Production build skriptini yozing: `composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction`, `check-platform-reqs`, Laravel `optimize`, va `composer show` bilan dev paket qolmaganini tekshiring; `classmap-authoritative` ni sinab ko'ring.",
      "acceptanceCriteria": [
        "`--no-dev`, `--optimize-autoloader`, `--classmap-authoritative`, `--apcu-autoloader` ni biladi",
        "`COMPOSER_NO_DEV`, `COMPOSER_NO_INTERACTION` kabi env'larni biladi",
        "Dev paket qolmaganini tekshira oladi",
        "Deploy tartibini (install → optimize → restart) biladi"
      ],
      "prerequisites": [
        "7.8"
      ]
    },
    {
      "id": "7.16",
      "title": "Dependency Update Strategy",
      "description": [
        "Dependency update strategy — bog'liqliklarni muntazam, kichik va xavfsiz yangilash tartibi. \"Hech qachon yangilamaslik\" xavfsizlik qarzini, \"hammasini birdan yangilash\" regressiyani keltiradi. Yo'l: avtomatik PR (Dependabot/Renovate), patch/minor muntazam, major — rejali; har yangilashda testlar + `composer audit`; ba'zi jamoalar yangi chiqqan versiyani bir necha kun kutadi (supply-chain xavfini kamaytirish; yangi Composer docs'da `policy.cooldown` sozlamasi ham bor)."
      ],
      "priority": "important",
      "level": "Middle",
      "practicalTask": "Renovate/Dependabot konfiguratsiyasini yozing (patch/minor guruhlab, major alohida, dev bog'liqliklar alohida), `composer outdated --direct --strict` ni CI'ga qo'shing, haftalik yangilash jarayonini va major (Laravel) rejasini hujjatlashtiring.",
      "acceptanceCriteria": [
        "Patch/minor/major yangilash tartibini va xavfini biladi",
        "`outdated`, `update`, `bump`, `--minimal-changes`, `--dry-run` ni biladi",
        "Dependabot/Renovate ni sozlay oladi va guruhlashni biladi",
        "Yangilashni testlar, audit va bosqichli deploy bilan himoyalaydi"
      ],
      "prerequisites": [
        "7.13",
        "7.5"
      ]
    }
  ]
});
