# Swanson Cleaning — Changelog

All meaningful changes to the website, in reverse chronological order.

---

## 2026-08-05

### Multi-page restructure: Services/About/FAQ/Contact as their own pages, hero rewrite, Book Now removed
- **What:**
  - **Multi-page conversion** — Split the single-page site into a real multi-page static site. `index.html` is now a trimmed homepage; Services, About, and FAQ moved off it entirely into their own pages: `services.html` (hub linking to all 9 services), one page per service (`carpet-cleaning.html`, `upholstery-cleaning.html`, `area-rug-cleaning.html`, `mattress-cleaning.html`, `move-in-move-out-cleaning.html`, `short-term-rental-cleaning.html`, `emergency-stain-cleanup.html`, `pet-odor-removal.html`, `commercial-cleaning.html`), `about.html`, `faq.html`. Each service page has the icon, a short explanation, and Call/Text buttons. All new pages share identical nav/footer/sticky-CTA markup with the homepage (same pattern already used by `reviews.html`).
  - **Hero rewrite** — H1 is now the business name ("Swanson Carpet & Upholstery Cleaning"), with the old headline ("Fresh, Professional Carpet & Upholstery Cleaning in Bluffton, SC") demoted to a `.hero-tagline` line underneath. Removed the "Serving Bluffton & the Lowcountry" badge pill (`.hero-badge`), removed the `.hero-sub` blurb paragraph, and removed the down-scroll arrow (`.hero-scroll-hint`). Corresponding dead CSS (`.hero-badge`, `.badge-dot`, `@keyframes pulse`, `.hero-scroll-hint`, `@keyframes float`) deleted.
  - **"Book Now" removed everywhere** — nav link, header CTA button (now "Contact Us" → `contact.html`), hero CTA (now "Call Heather Now"), reviews-section CTA, footer quick link. Nothing labeled "Book" remains; everything routes to Call, Text, or the new Contact page.
  - **New Contact page** (`contact.html` + `contact-success.html`) — Netlify Forms contact form (Name, Phone, Email, Service dropdown, Message, honeypot spam field), posting to a thank-you page. **Carson still needs to add an email notification to `heather.razin@yahoo.com` in the Netlify dashboard** (Site settings → Forms → Form notifications) — that step can't be done from code.
  - **Why Choose Us cards** — desktop unchanged; on mobile switched from a single full-width stacked column to a compact 2-column grid with smaller padding/font.
  - **`js/app.js`** — replaced the scroll-position nav highlighting (which relied on `#about`/`#faq`/`#services` sections that no longer exist on `index.html`) with a `<body data-nav="...">` attribute read on every page, matched against each nav link's own `data-nav`. Also null-guarded the footer-year line so it doesn't throw on pages missing that element.
  - Added Google Analytics + the SEO meta boilerplate to every new page (previously only `index.html` had it — these are now real indexable URLs, not anchors, so they need their own tracking/meta).
- **Why:** Carson asked for each service to have its own page with an explanation and Call/Text button, About/FAQ off the scrolling homepage, the hero simplified (name-first, no badge/scroll-hint), and booking replaced entirely by a proper contact form.
- **Files:** `index.html`, `css/styles.css`, `js/app.js`, `CHANGELOG.md`, `DECISIONS.md`, `PROJECT_OVERVIEW.md`, and 14 new HTML files (`services.html`, 9 service pages, `about.html`, `faq.html`, `contact.html`, `contact-success.html`)
- **Commit:** pushed to `main`

---

### Hero photo collage + rotating/clickable About gallery
- **What:**
  - Carson supplied 8 new phone photos of Heather actively cleaning (vacuuming, steam-extracting upholstery, working the extractor machine). Auto-oriented, resized (bound to 1600px), and compressed to WebP with ImageMagick (~65–155KB each): `hero-action-1..4.webp` and `about-action-1..4.webp`.
  - **Hero:** added a `.hero-collage` layer (4-image grid, `object-fit: cover`, no stretching) behind the existing gradient. Changed `.hero-bg`'s gradient from solid hex colors to `rgba()` so the brand teal/navy tint sits on top of the photos instead of hiding them — photos are visible but softly tinted, text stays legible. On mobile (`≤768px`) the grid switches from 4 columns to a 2×2 layout so tiles aren't sliced too thin.
  - **About section:** replaced the single static `heather.jpg` photo with a rotating gallery (`#aboutRotator`) — `heather.jpg` plus the 4 `about-action-*.webp` photos, cross-fading every 5s, with click-through prev/next arrows and dot indicators. Pauses on hover, resumes on mouse-leave. New `initAboutRotator()` in `js/app.js`; new `.rotator-*` CSS rules in `styles.css`. The existing "Owner-Operated" badge card and photo frame styling/shadow were left untouched.
  - Did not modify `images/heather.jpg` itself — kept it as slide 1 of the rotator per the "never modify existing images" rule.
- **Why:** Carson provided real action shots of Heather at work and wanted the hero to feel more alive/photographic and the About section to showcase more of her in action, browsable by the visitor.
- **Files:** `index.html`, `css/styles.css`, `js/app.js`, `images/hero-action-1.webp`, `images/hero-action-2.webp`, `images/hero-action-3.webp`, `images/hero-action-4.webp`, `images/about-action-1.webp`, `images/about-action-2.webp`, `images/about-action-3.webp`, `images/about-action-4.webp`
- **Commit:** _not committed — pending Carson's review_

### Follow-up: 2 more About rotator photos + small square service cards on mobile
- **What:**
  - Carson sent 2 more photos (same source files already used for `hero-action-1.webp`/`hero-action-4.webp` — reused those existing WebP files rather than duplicating). Added as slide 6 and 7 in the About rotator (`#aboutRotator` now has 7 slides / 7 dots — `rotator.js` logic is slide-count-agnostic, no JS changes needed).
  - Rebuilt `.service-card` for mobile (`≤768px`): grid went from 1 full-width column to a 3-per-row grid of square tiles (`aspect-ratio: 1/1`), each showing just the icon + title, centered. Description paragraph and "Book This Service →" CTA text are hidden on mobile (card is still a `tel:` link, so tapping still calls). Icon/title/badge sizes reduced to fit.
- **Files:** `index.html`, `css/styles.css`
- **Commit:** _not committed — pending Carson's review_

---

## 2026-07-31

### Removed the Calendly booking calendar
- **What:**
  - Deleted the "Book an Appointment" section (`id="booking"`) and its Calendly inline widget/script from `index.html` at Heather's request.
  - Repointed every "Book Now" / "Book an Appointment" / "Book This Service" / "Book Your Cleaning" link across `index.html` and `reviews.html` (nav, header CTA, hero, service cards, reviews CTA, footer quick links — ~14 spots) from `#booking` to `tel:2073374841`, so they now call Heather directly instead of scrolling to a section that no longer exists.
  - Removed the redundant third "Book" button from the sticky mobile CTA bar (it would have duplicated the adjacent "Call" button); the bar now shows Call + Text.
  - Removed the now-dead `.booking-section`, `.calendly-wrapper`, and `.sticky-book` CSS rules, and the `border-right` separator on `.sticky-text` that was only needed with a third button.
  - Removed `'booking'` from the scroll-spy `sections` array in `js/app.js` and updated stale comments referencing Calendly.
  - Rewrote the "Information We Collect" / "How We Use Your Information" / "Your Choices" sections of `privacy-policy.html` and removed the "Use of Calendly" and "Third-Party Services" sections, since the site no longer collects any information via a booking tool — booking now happens by phone/text off-site. Bumped the policy's effective date to July 31, 2026.
- **Why:** Heather no longer wants a self-serve calendar on the site; she wants people to call or text her directly to book.
- **Files:** `index.html`, `reviews.html`, `privacy-policy.html`, `css/styles.css`, `js/app.js`, `DECISIONS.md`
- **Note:** Fully deleted rather than commented out. It's reversible via git history if Heather wants it back later — see updated `DECISIONS.md`.
- **Commit:** `9e5bda6` — pushed to `main`

---

## 2026-07-01

### Added real Before/After photos and a new Finished Results gallery
- **What:**
  - Carson supplied 7 new phone photos in `images/` (2 before/after pairs + 3 finished-result shots). Auto-oriented, resized, and compressed them to WebP with ImageMagick, cutting total size from ~46MB to ~1.2MB.
  - Filled in 2 of the 3 existing "Photo Coming Soon" placeholder cards in the **See the Difference** (before/after) section with the real photo pairs: `before-after-1-before/after.webp` (area rug deep clean) and `before-after-2-before/after.webp` (stain removal). Third card left as-is since there's no third pair yet.
  - Added a new **Finished Results** section (`.finished-section` / `.finished-grid`) directly after the before/after section, showcasing `finished-product-1/2/3.webp` in a responsive 3→2→1 column card gallery.
  - All new images use `loading="lazy"`, descriptive SEO alt text, and explicit width/height attributes.
- **Why:** Client added real work photos and wanted them showcased professionally instead of the placeholder state.
- **Files:** `index.html`, `css/styles.css`, `images/before-after-1-before.webp`, `images/before-after-1-after.webp`, `images/before-after-2-before.webp`, `images/before-after-2-after.webp`, `images/finished-product-1.webp`, `images/finished-product-2.webp`, `images/finished-product-3.webp`
- **Note:** Original uncompressed source photos (`carpet before.jpeg`, `carpet after.jpeg`, `circlestainbefore.jpeg`, `circlestainafter.jpeg`, `no-b&a-justcleanedcarpet*.jpeg`) were left untouched in `images/` — only new optimized copies were created and referenced on the page.
- **Commit:** _not committed — pending Carson's review_

---

## 2026-06-19

### Reworked the reviews system — real review + manual scroll + dedicated page
- **What:**
  - Removed all 5 fake/placeholder reviews (Heather S., Tristen S., Sarah M., Amanda R., Lauren T.).
  - Added Lori's real review (the only review currently on the site).
  - Moved review data out of `js/app.js` into a new shared file, `js/reviews-data.js`, which is now the **single source of truth** for both the homepage and the Reviews page.
  - Replaced the auto-sliding left-to-right marquee with a **user-controlled horizontal scroller** (scroll-snap, smooth scrolling, styled scrollbar). Cards no longer move on their own.
  - Homepage now shows **clickable preview cards** — long reviews are truncated to a short preview with a "Read full review →" cue. Each card links to `reviews.html#review-<id>`.
  - Created a dedicated **`reviews.html`** page (matches site branding) that renders the full review text with paragraph breaks, the reviewer name, a back-to-home button, and a booking CTA. Deep links scroll to and highlight the targeted review.
- **Why:** Client wanted only real reviews shown, manual (not auto-sliding) scrolling, and long reviews readable on a dedicated page without cluttering the homepage.
- **Files:** `js/reviews-data.js` (new), `reviews.html` (new), `js/app.js`, `index.html`, `css/styles.css`
- **Docs:** Updated `REVIEWS_GUIDE.md` to document the new shared-data workflow.
- **Commit:** _not committed — pending Carson's review_

---

## 2026-06-10

### Updated Calendly embed URL
- **What:** Changed Calendly `data-url` from `https://calendly.com/heather-razin/30min?background_color=0e8a53&primary_color=149d5e` to `https://calendly.com/heather-razin`
- **Why:** Previous URL was invalid/not resolving. Client confirmed the correct link.
- **File:** `index.html` (line ~200)
- **Commit:** `8b24a63`

### Added Google Analytics
- **What:** Installed GA tag `G-XKCBFEEG4J` in `<head>` of `index.html`
- **Why:** Client requested analytics tracking
- **File:** `index.html` (lines 17–25)
- **Commit:** `8b530f9`

### Updated Calendly to Heather's calendar (first pass)
- **What:** Changed Calendly `data-url` from `https://calendly.com/carsonhandran/30min` (placeholder) to Heather's Calendly link
- **Why:** Old embed pointed to Carson's personal calendar — wrong calendar for the client site
- **File:** `index.html`
- **Commit:** `8b530f9`

### Moved to HANDRAN-DEVELOPMENT client system
- **What:** Project folder moved from `CLAUDECODE-JOBS/swanson-carpet/` to `HANDRAN-DEVELOPMENT/03-CLIENTS/Swanson-Cleaning/`
- **Why:** Organizing client work under the Handran Development business system
- **Files:** All project files (move preserved `.git` history)

---

## 2026-06-08

### Added shutdown documentation
- **What:** Created `CLAUDE_SESSION_NOTES/2026-06-08-swanson-carpet-shutdown.md`
- **Commit:** `752a4ee`

### Added reviews section + logo update
- **What:** Shipped reviews/testimonials section; committed `logo.png` to fix GitHub Pages 404
- **Files:** `index.html`, `css/styles.css`, `images/logo.png`
- **Commit:** `e86f29a`

### Added Heather owner photo
- **What:** Committed `images/heather.jpg` (existed locally, never tracked in git — caused 404 on live site)
- **File:** `images/heather.jpg`
- **Commit:** `088e9f3`

### Reviews section + mobile nav improvements (prior session)
- **What:** Reviews section HTML/CSS/JS, mobile nav improvements, `REVIEWS_GUIDE.md`
- **Files:** `index.html`, `css/styles.css`, `js/app.js`, `REVIEWS_GUIDE.md`
- **Commit:** `63c627e`

---

## Earlier Sessions

### Major UI overhaul
- Accessibility fixes, layout improvements, Impeccable initialization
- **Commit:** `62b07da`

---

*Maintained by Handran Development*
