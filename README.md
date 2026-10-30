# Shri Siddh Hotel — Homepage

A single-page luxury hotel homepage built with **Next.js 15** and **React 19**, with no UI libraries. All styling is plain CSS and all animations are hand-written.

## Features

- Sticky header that turns solid on scroll, with a mobile menu
- Hero with slow zoom, word-by-word headline animation and a booking bar (date pickers, guests picker, availability check)
- Room cards with a cursor-following "View" badge
- Parallax "Everything You Need" services band
- Video section that opens a full-screen slideshow tour
- Facilities grid, auto-playing draggable reviews carousel
- Masonry gallery with a keyboard-friendly lightbox
- Journal cards, social links, newsletter form with validation
- Scroll-reveal animations, scroll progress bar, back-to-top button
- Responsive down to mobile; respects `prefers-reduced-motion`

The booking and newsletter forms are front-end only; they don't send data anywhere.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Customising

- **Content** (rooms, prices, services, reviews, gallery, blog posts, footer links): `lib/data.ts`
- **Styles and animations**: `app/globals.css`
- **Sections**: `components/Hero.tsx` and `components/Sections.tsx`
- **Hero and footer images**: `public/hero-hotel.webp`, `public/footer-skyline.png`

Other photos are loaded from [Unsplash](https://unsplash.com) under the Unsplash License. Reviews, address, phone numbers and prices are placeholder content.

## License

[MIT](LICENSE). Free to use, copy, modify and distribute.
