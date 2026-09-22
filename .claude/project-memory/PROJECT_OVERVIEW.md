# Project Overview — Swanson Carpet & Upholstery Cleaning

## What this is
A static marketing website for a small carpet and upholstery cleaning business in Bluffton, SC. No framework, no build step, no package.json. Pure HTML/CSS/JS.

## Client
**Swanson Carpet & Upholstery Cleaning** — residential and commercial cleaning services, Lowcountry/Bluffton SC area.

## Purpose
Marketing site with service listings, Calendly booking embed, FAQ, reviews, and contact info.

## Key files

| File | Role |
|---|---|
| `index.html` | Entire single-page site (nav, hero, services, booking, about, FAQ, contact, footer) |
| `css/styles.css` | All styles. Design tokens in `:root` at top of file. |
| `js/app.js` | Vanilla JS: sticky header, mobile nav, scroll-spy, fade-in animations, FAQ accordion |
| `cancellation-policy.html` | Standalone policy page |
| `privacy-policy.html` | Standalone policy page |
| `server.js` | Local dev server (Node.js, no deps) |

## Images / Assets

| File | Use |
|---|---|
| `images/logo.png` | **Official client logo — use this file, do not edit it** |
| `images/logo.svg` | Old/alternative logo (currently unused in HTML) |
| `images/heather.jpg` | Unintegrated photo (owner or staff, TBD) |

## Design tokens (css/styles.css `:root`)
- Coastal Teal: `#4A9B8E`
- Navy: `#1B3A4B`
- Muted Gold: `#C9A84C`
- Cream/Beige background

## Run locally
```
node server.js
# → http://localhost:3456
```

## Layout sizing (as of 2026-06-07)
- Desktop nav height: `160px`
- Mobile nav height: `110px` (≤768px)
- These values must stay in sync with `.announcement-bar { top: }` and `.hero { padding-top: }`
