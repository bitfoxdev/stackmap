/* Chuqur dars: 2.34. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.34", {
  "lesson": [
    "### Komponentlar",
    "- **Anonim**: `resources/views/components/alert.blade.php` → `<x-alert />`. Papka ichida: `components/forms/input.blade.php` → `<x-forms.input />`.",
    "- **Klass-asoslangan**: `php artisan make:component Alert` — `app/View/Components/Alert.php` va shablon. Murakkab mantiq, DI kerak bo'lganda.",
    "- Anonim komponentda props: `@props(['type' => 'info', 'message'])`. `:type=\"$var\"` — PHP ifoda, `type=\"error\"` — satr. Kebab-case atribut (`user-id`) camelCase xossaga (`$userId`) aylanadi.",
    "- Slot: asosiy `{{ $slot }}`, nomli `<x-slot:title>Sarlavha</x-slot>` (yoki `<x-slot name=\"title\">`); `$title` sifatida ishlatiladi.",
    "- `{{ $attributes->merge(['class' => 'btn']) }}` — tashqaridan kelgan atributlarni birlashtiradi; `$attributes->class([...])`, `->only()`, `->except()`, `->whereStartsWith('wire:')`.",
    "- `@aware` — ota komponent props'ini ichkariga uzatadi. `$component`/dinamik komponent: `<x-dynamic-component :component=\"$name\" />`.",
    "",
    "### Layout",
    "Eski usul: `@extends('layouts.app')` + `@section('content')` + `@yield`. Zamonaviy: layout komponent (`<x-layouts.app>`, `{{ $slot }}`, `{{ $title ?? 'Bosh sahifa' }}`). `@stack('scripts')` / `@push('scripts')` — sahifa ichidan layout'ga skript/CSS qo'shish (`@pushOnce` takrorlanmaslik uchun).",
    "",
    "### Vite",
    "- `@vite(['resources/css/app.css', 'resources/js/app.js'])` head'da. Dev: `npm run dev` (HMR, `public/hot` fayli paydo bo'ladi); production: `npm run build` (`public/build` + manifest, fayl nomida hash).",
    "- `@viteReactRefresh` — React uchun. `Vite::useBuildDirectory`, `useScriptTagAttributes` — CSP nonce uchun.",
    "- **Deploy**: build serverda emas, CI'da qilib artefakt sifatida joylash tavsiya etiladi; `public/build` ni git'ga qo'shmang (yoki CI'da yarating).",
    "- Asset prefetch va `Vite::prefetch(concurrency: 3)` — sahifa yuklangandan keyin keyingi chunk'larni oldindan yuklaydi.",
    "",
    "### Qoidalar",
    "1. 3+ marta takrorlanadigan UI bo'lagi komponent bo'lsin.",
    "2. Mantiq kerak bo'lmasa — anonim komponent (kam ceremonial).",
    "3. Production'da `public/hot` fayli qolib ketmasin (aks holda sahifa dev server'ni qidiradi).",
    "4. `$attributes->merge` bilan class'larni birlashtiring, ustidan yozmang."
  ],
  "examples": [
    {
      "title": "Anonim komponent",
      "lang": "blade",
      "note": "props, slot, attribute merging",
      "code": [
        "{{-- resources/views/components/alert.blade.php --}}",
        "@props(['type' => 'info'])",
        "",
        "<div {{ $attributes->class([",
        "    'rounded p-4',",
        "    'bg-red-100' => $type === 'error',",
        "    'bg-blue-100' => $type === 'info',",
        "]) }}>",
        "    @isset($title)",
        "        <strong>{{ $title }}</strong>",
        "    @endisset",
        "    {{ $slot }}",
        "</div>",
        "",
        "{{-- ishlatish --}}",
        "<x-alert type=\"error\" class=\"mb-4\">",
        "    <x-slot:title>Xato</x-slot>",
        "    Saqlashda muammo chiqdi.",
        "</x-alert>"
      ]
    },
    {
      "title": "Layout komponent va Vite",
      "lang": "blade",
      "note": "@vite, @stack, $slot",
      "code": [
        "{{-- resources/views/components/layouts/app.blade.php --}}",
        "<!DOCTYPE html>",
        "<html lang=\"{{ str_replace('_', '-', app()->getLocale()) }}\">",
        "<head>",
        "    <title>{{ $title ?? config('app.name') }}</title>",
        "    @vite(['resources/css/app.css', 'resources/js/app.js'])",
        "    @stack('head')",
        "</head>",
        "<body>",
        "    <x-nav />",
        "    <main>{{ $slot }}</main>",
        "    @stack('scripts')",
        "</body>",
        "</html>",
        "",
        "{{-- sahifa --}}",
        "<x-layouts.app title=\"Profil\">",
        "    <h1>Profil</h1>",
        "    @push('scripts')",
        "        <script>console.log('profil')</script>",
        "    @endpush",
        "</x-layouts.app>"
      ]
    }
  ],
  "pitfalls": [
    "`:type=\"error\"` (ikki nuqta bilan) PHP ifoda deb o'qiladi va `error` konstanta qidiriladi: satr uchun ikki nuqtasiz yozing.",
    "Komponentda `$attributes` ni chiqarmaslik: tashqaridan berilgan `class`, `id`, `wire:` atributlari yo'qoladi.",
    "Production'ga `public/hot` fayli yetib borishi: sahifa resurslarni lokal Vite serveridan qidiradi va buziladi.",
    "`npm run build` ni deploy'da unutish: `Vite manifest not found` xatosi.",
    "Klass-asoslangan komponent konstruktoriga katta model/massiv uzatish: ortiqcha serializatsiya; komponentni yupqa saqlang.",
    "`@push` bilan bir xil skriptni bir necha komponentdan qo'shish: takrorlanadi; `@pushOnce` ishlating."
  ]
});
