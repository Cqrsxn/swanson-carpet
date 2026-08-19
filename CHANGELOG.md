# Swanson Cleaning — Changelog

All meaningful changes to the website, in reverse chronological order.

---

## 2026-08-18

### New hero photo of Heather + fixed it being hidden behind the nav on mobile
- **What:**
  - Heather sent a new photo (smiling straight at camera while extracting a couch) that she wanted used across the site. Cropped/compressed to `images/hero-action-5.webp` (900x1500) and swapped into the hero collage's first tile on `index.html` and the About rotator's last slide on `about.html`. `hero-action-1.webp` is no longer referenced (left in the repo, not deleted).
  - Replaced the hero collage's third tile (`hero-action-3.webp`, a wide overhead room shot where Heather is a small distant figure) with `about-action-3.webp`, where she's clearly the subject — Carson's call.
  - **The real mobile bug:** `.header` is `position: fixed`, 111px tall and opaque, and `.hero-collage` is `inset: 0` — so the top ~111px of the top-row photos sat *behind* the nav bar, hiding Heather's face. No amount of `object-position` could fix it (it can't reveal pixels above the image's own top edge). Fixed by starting the collage below the header on mobile (`.hero-collage { top: 110px }`).
  - **Second mobile bug:** with the photo grid corrected, the centred hero text then overlapped her face. On short viewports the 90vh hero squeezed the text upward into the top photo row. Fixed by making the mobile hero full-height (`min-height: 100svh`, with a `100vh` fallback), which lets the centred text sit below the top row.
  - Added `?v=N` cache-busting query strings to `css/styles.css` (all 18 pages) and to the `hero-action-5.webp` references. **Bump these whenever you change the CSS or replace that image** — without it, browsers (and phones especially) keep serving the stale copy and edits appear to do nothing.
  - `server.js` (local dev only, not deployed): added `.webp`/`.jpeg` MIME types — WebP images were being served as `text/plain` — and `Cache-Control: no-store` so local edits show up immediately.
- **Why:** Heather asked for the new photo site-wide; Carson then reported her head was cut off / covered by text on mobile.
- **Verified:** measured in Chrome at real mobile viewports (face top/bottom vs. header bottom and headline top) — clears at 390x844 (iPhone 14/15), 430x932 (Pro Max), and 360x800 (Android). Desktop (1440x900) unchanged: collage still starts at `top: 0` and the layout is untouched.
- **Known limitation:** at 375x667 (iPhone SE/8) the headline still overlaps her face. That viewport is too short for the hero's content — the trust row already collided with the bottom curve there *before* these changes. Fixing it means shrinking the hero type/buttons on very short screens, which is a real design change — not done without Carson's say-so.
- **Files:** all 18 `.html` pages (cache-bust), `index.html`, `about.html`, `css/styles.css`, `server.js`, `images/hero-action-5.webp` (new), `HANDOFF.md` (new)

---

## 2026-08-05

### Fixed link-preview image (no og:image existed on any page)
- **What:** Carson noticed that texting/sharing the site link showed a random, unrelated photo (a cleaned rug) instead of anything intentional. Cause: no page had an `og:image` meta tag at all, so link-preview crawlers (iMessage, social apps) fell back to grabbing whatever image they found first on the page. Added `og:image` (Carson's chosen smiling photo of Heather with her equipment, cropped/compressed to `images/og-image.jpg`, 800x1200), plus `og:url`, `og:title`, `og:description`, `og:image:width/height/alt`, and `twitter:card`/`twitter:image` to every page's `<head>` — same image site-wide for consistent branding whichever page gets shared.
- **Why:** Carson's own link previews as broken/embarrassing when shared; this was a pre-existing gap that predated the multi-page split, just never noticed until now.
- **Files:** all 18 `.html` pages, `images/og-image.jpg` (new)
- **Note:** Apple/iMessage and some social platforms cache link previews aggressively — if the old broken preview still shows up right after deploy, it may take a bit for the cache to refresh, or Carson can force a refresh by sharing to a fresh conversation.
- **Commit:** `f1a2d04`

---

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

## 2026-08-01

### Removed the Calendly booking calendar (completed cleanup + added email)
- **What:**
  - Deleted the "Book an Appointment" section (`id="booking"`) and its Calendly inline widget/script from `index.html` at Heather's request.
  - Repointed every "Book Now" / "Book an Appointment" / "Book This Service" / "Book Your Cleaning" CTA across `index.html` and `reviews.html` (nav, header button, hero, service cards, reviews CTA, footer quick links, sticky mobile bar) so both the link target *and* the label match: call/text CTAs now say "Call for a Free Quote," "Text About This Service," etc. instead of leaving stale "Book..." labels pointing at `tel:`/`sms:` links.
  - Added Heather's email (`heather.razin@yahoo.com`) as a contact method for the first time — footer contact column, sticky mobile bar (replaced the old "Book" button with "Email"), and both legal pages.
  - Removed the now-dead `.booking-section`, `.calendly-wrapper`, `.sticky-book` CSS rules, and the entire ~320-line "OLD CUSTOM CALENDAR (kept for reference, not used)" block (calendar grid, timeslot grid, booking form/steps/confirmation styles) that had been sitting unused in `css/styles.css` since before Calendly was even added.
  - Removed `'booking'` from the scroll-spy `sections` array in `js/app.js` and updated stale comments referencing Calendly.
  - Rewrote the "Information We Collect" / "How We Use Your Information" / "Your Choices" sections of `privacy-policy.html` and replaced "Use of Calendly" with a "Website Analytics" section (Google Analytics is still in use), since the site no longer collects any information via a booking tool.
- **Why:** Heather no longer wants a self-serve calendar on the site; a prior pass (2026-07-31) swapped the `#booking` links to `tel:` but left every button still labeled "Book Now"/"Book This Service" with no calendar behind it, and left the dead CSS in place. This pass finishes that cleanup and adds email as a real second contact channel per Carson's follow-up request.
- **Files:** `index.html`, `reviews.html`, `privacy-policy.html`, `cancellation-policy.html`, `css/styles.css`, `js/app.js`
- **Note:** Fully deleted rather than commented out. Reversible via git history if Heather wants a booking tool back later.

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
