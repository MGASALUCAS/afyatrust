# AfyaTrust

Health protection for everyday Tanzanians - a clean, trustworthy, single-page
membership website built with **Next.js (App Router)** and **Tailwind CSS**.

> Health Without Financial Shock.

## Tech

- Next.js 14 (App Router, JavaScript)
- Tailwind CSS 3
- Inter + Manrope (via `next/font`)
- Zero external UI libraries - all components and icons are hand-built

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Scripts

| Command         | Action                          |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Run the production build        |

## Structure

```
app/
  layout.js        Fonts, metadata, root layout
  page.js          Page composition
  globals.css      Tailwind layers + brand button styles
components/        Navbar, Hero, HowItWorks, Packages, WhyAfyaTrust, Trust, Contact, Footer, Icons
lib/content.js    All copy, packages, stats - single source of truth
tailwind.config.js  Brand palette (Teal / Sage / Gold)
```

## Brand

| Token     | Value     |
| --------- | --------- |
| Teal      | `#006D77` |
| Sage      | `#83C5BE` |
| Gold      | `#FFB703` |
| Charcoal  | `#1A1A1A` |
| Surface   | `#FFFFFF` |

Edit content in [`lib/content.js`](lib/content.js) - packages, WhatsApp number,
member stories and stats all live there.
