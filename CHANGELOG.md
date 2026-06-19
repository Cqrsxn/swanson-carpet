# Swanson Cleaning — Changelog

All meaningful changes to the website, in reverse chronological order.

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
