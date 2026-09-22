# Swanson Cleaning — Project Overview

**Agency:** Handran Development
**Client:** Heather Swanson (Swanson Carpet & Upholstery Cleaning)
**Project:** Business website
**Status:** Live

---

## Project Summary

Heather Swanson is a sole-proprietor carpet, upholstery, rug, and mattress cleaning business serving Bluffton SC and the greater Lowcountry. Handran Development built and maintains her website.

The site's job: establish trust fast, present Heather's services clearly, and convert visitors into a direct call or text.

---

## Key Contact

- **Client:** Heather Swanson
- **Client phone:** 207-337-4841
- **GitHub repo:** https://github.com/Cqrsxn/swanson-carpet
- **Live site:** https://cqrsxn.github.io/swanson-carpet/ (GitHub Pages, auto-deploys from `main` on every push)
- **Local dev:** `node server.js` → http://localhost:3456

---

## File Map

**As of 2026-08-05 this is a multi-page site** — see "Multi-Page Architecture" in `DECISIONS.md`.

| File/Folder | Purpose |
|---|---|
| `index.html` | Trimmed homepage (hero, trust bar, emergency, services teaser, why-us, before/after, finished results, reviews preview, service areas, footer) |
| `services.html` | Services hub — links to all 9 service pages |
| `carpet-cleaning.html`, `upholstery-cleaning.html`, `area-rug-cleaning.html`, `mattress-cleaning.html`, `move-in-move-out-cleaning.html`, `short-term-rental-cleaning.html`, `emergency-stain-cleanup.html`, `pet-odor-removal.html`, `commercial-cleaning.html` | Individual service pages (explanation + Call/Text CTA) |
| `about.html` | Heather's bio + photo rotator |
| `faq.html` | FAQ accordion |
| `contact.html` / `contact-success.html` | Netlify Forms contact form + thank-you page |
| `reviews.html` | Full reviews list (lighter nav — "Back to Home" pattern) |
| `cancellation-policy.html` | Cancellation policy (linked from footer, lighter nav) |
| `privacy-policy.html` | Privacy policy (linked from footer, lighter nav) |
| `css/styles.css` | All styles — design tokens at top of `:root` |
| `js/app.js` | Vanilla JS — nav (data-nav active state), animations, FAQ accordion, about rotator, scroll |
| `images/` | All site images (logo, Heather photo, action shots, etc.) |
| `server.js` | Local Node.js dev server |

---

## Design System

Full design reference is in `DESIGN.md`. Key tokens:

| Token | Value | Use |
|---|---|---|
| `--teal` | `#4A9B8E` | Primary buttons, icons, active states |
| `--navy` | `#1B3A4B` | Section titles, nav, headings |
| `--navy-dark` | `#112433` | Footer background |
| `--cream` | `#FAF7F2` | Alternate section backgrounds |
| `--gold` | `#C9A84C` | Stars, accents |
| Font (heads) | Playfair Display | Serif headings |
| Font (body) | Inter | All body and UI text |

---

## Third-Party Integrations

| Integration | Detail |
|---|---|
| Google Analytics | `G-XKCBFEEG4J` — tag in `<head>` |
| Google Fonts | Playfair Display + Inter — loaded in `<head>` |
| Local Business Schema | JSON-LD in `<head>` |

---

## Section Order (index.html, as of 2026-08-05)

1. Nav (fixed, blur on scroll)
2. Hero (photo collage + gradient tint, title + tagline, CTAs — no badge pill, no scroll hint)
3. Trust Bar (credentials strip)
4. Emergency (red gradient)
5. Services teaser (card grid — each card links to its own service page)
6. Why Us (navy background, compact 2-col on mobile)
7. Before/After (beige)
8. Finished Results
9. Testimonials/Reviews (preview + link to `reviews.html`)
10. Service Areas
11. Footer + Mobile sticky CTA

About and FAQ are no longer on the homepage — see `about.html` / `faq.html`.

---

## Standing Rules — Do Not Break These

- **Nav height coupling:** If `.nav { height }` changes, also update `.announcement-bar { top }`, `.hero { padding-top }`, and all mobile overrides. See `DECISIONS.md`.
- **Never modify image files.** `images/logo.png`, `images/heather.jpg`, etc. are final.
- **Do not commit `.claude/` or `.impeccable/`** — these are local tooling directories.
- **Do not add photography as a Handran Development service** anywhere in this project.
- **Do not re-add a Calendly embed, booking section, or "Book Now" language** without Carson/Heather explicitly asking (Calendly removed 2026-07-31; "Book Now" nav/CTA language removed 2026-08-05 in favor of Call/Text/Contact).
- **Netlify dashboard notification for the contact form is a manual, one-time step** — Carson needs to set it, it can't be done from code.
- **Always `git status` before editing** — never assume working tree is clean.

---

*Managed by Handran Development · Last updated: 2026-08-05*
