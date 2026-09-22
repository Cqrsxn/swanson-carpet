# Swanson Cleaning — Standing Decisions

Decisions made during the life of this project. Read before editing anything.

---

## Nav Height Coupling

**Decision:** Nav height, announcement bar `top`, and hero `padding-top` are tightly coupled. They must always be changed together.

| CSS Property | Desktop | Mobile (≤768px) |
|---|---|---|
| `.nav { height }` | `160px` | `110px` |
| `.announcement-bar { top }` | `160px` | `110px` |
| `.hero { padding-top }` | `160px` | `110px` |

**Why:** The nav is fixed. The announcement bar sits directly below it. The hero content starts below both. If only one value changes, sections overlap or create a gap.

**How to apply:** Any time a request involves the nav, logo size, or hero — check all three values and update all three.

---

## Logo: PNG Not SVG

**Decision:** The site uses `images/logo.png` everywhere. `logo.svg` remains in the repo but is not referenced.

**Why:** The PNG was committed in session 2026-06-08 to fix a GitHub Pages 404. The SVG was used in the footer previously but had a filter applied (`brightness(0) invert(1)`) to appear white — that filter was removed when switching to PNG.

**How to apply:** If the logo ever needs updating, replace `logo.png`. Do not re-introduce `logo.svg` without removing the PNG references first.

---

## Logo Sizing

**Decision:** Nav logo: `height: 140px` desktop / `100px` mobile. Footer logo: `height: 160px`. Both use `width: auto` and `object-fit: contain`.

**Why:** The PNG has significant internal whitespace. The heights were increased to make the logo visually fill the nav.

**How to apply:** If the logo looks too small or too large, adjust height values only — do not change width or add `object-fit: cover`.

---

## Calendly Booking Section — Removed

**Decision:** The Calendly inline widget and the "Book an Appointment" section (`id="booking"`) were removed 2026-07-31 at Heather's request. All "Book Now" CTAs across the site (nav, hero, service cards, sticky mobile bar, footer) now link to `tel:2073374841` instead of scrolling to `#booking`.

**Why:** Heather no longer wants a self-serve calendar; she wants people to call/text her directly. Fully deleted rather than commented out — removal is reversible via git history (`git log -- index.html`) if she wants it back later.

**How to apply:** Do not re-add a Calendly embed or a `#booking` section without Carson/Heather explicitly asking. If it comes back, restore from git history rather than rebuilding from scratch.

---

## Google Analytics — One Instance Only

**Decision:** GA tag `G-XKCBFEEG4J` is included once in `<head>`, after the stylesheet link (lines 17–25 of `index.html`).

**Why:** Duplicate GA tags inflate analytics data.

**How to apply:** Never add a second GA block. If the tag ID changes, find and replace the existing one.

---

## Do Not Touch Image Files

**Decision:** Never modify, re-export, rename, or delete image files in `images/` without Carson explicitly requesting it.

**Why:** Image files took deliberate effort to get right (Heather's photo, logo PNG). Accidental overwrite loses that work.

---

## Do Not Commit Internal Tooling

**Decision:** `.claude/` and `.impeccable/` are never committed to git.

**Why:** These are local tool configuration directories that don't belong in the site repo.

---

## Multi-Page Architecture (supersedes "Single-Page Architecture" below)

**Decision:** As of 2026-08-05, the site is a multi-page static site at Carson's request. `index.html` is now a trimmed homepage (hero, trust bar, emergency banner, services teaser grid, why-choose-us, before/after, finished results, reviews preview, service areas, footer). Services, About, and FAQ each moved off the homepage into their own pages:

- `services.html` — hub page listing all 9 services
- `carpet-cleaning.html`, `upholstery-cleaning.html`, `area-rug-cleaning.html`, `mattress-cleaning.html`, `move-in-move-out-cleaning.html`, `short-term-rental-cleaning.html`, `emergency-stain-cleanup.html`, `pet-odor-removal.html`, `commercial-cleaning.html` — one page per service (icon, short explanation, Call/Text buttons)
- `about.html` — Heather's bio + photo rotator (moved verbatim from the old `#about` section)
- `faq.html` — the FAQ accordion (moved verbatim from the old `#faq` section)
- `contact.html` — Netlify Forms contact form (see "Contact Form" decision below) + `contact-success.html` thank-you page

Every full-nav page shares identical header/nav/footer/sticky-CTA markup (no build step — plain duplicated HTML, matching the pre-existing pattern used by `reviews.html`/`privacy-policy.html`). Nav active-state is now driven by `<body data-nav="...">` read in `js/app.js`, not scroll position — see `.nav-link` logic in `initNav`-equivalent code near the top of `app.js`.

**Why:** Carson explicitly asked for this restructure (2026-08-05) — wanted each service to have its own page with a dedicated explanation + Call/Text CTA, and About/FAQ off the single scrolling homepage.

**How to apply:** New pages should copy the header/footer block verbatim from an existing full-nav page (e.g. `contact.html`), not from `reviews.html` (that one intentionally uses the lighter "Back to Home" nav for secondary/legal pages — keep that distinction). Include the Google Analytics snippet on every new full-nav page (it's now needed since these are real separate URLs, not anchors).

## Contact Form (Netlify Forms)

**Decision:** `contact.html` uses a native Netlify Forms setup (`data-netlify="true"`, `name="contact"`, honeypot field), posting to `contact-success.html`. No custom backend.

**Why:** Site is Netlify-hosted already; Netlify Forms needs zero backend code and works with plain static HTML deploys.

**How to apply:** Netlify auto-detects the form on deploy. **Carson still needs to do one manual step in the Netlify dashboard** (Site settings → Forms → Form notifications → Add notification → Email notification) to route submissions to `heather.razin@yahoo.com` — this cannot be done from code/CLI.

---

## Single-Page Architecture (superseded — see above)

**Decision (historical, 2026-06-10, no longer in effect):** The site was a single-page application (with two separate policy pages). All primary content lived in `index.html`. Kept here for history; do not follow this rule anymore.

---

*Last updated: 2026-08-05*
