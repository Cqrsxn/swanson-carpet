# Changelog

---

## 2026-06-23 — Added two new customer reviews

### Summary
Added Isabel Hahn and Jessica Hensel reviews to the reviews data array. Both appear on the homepage scrollable preview cards and the full Reviews page.

### Files changed
- `js/reviews-data.js` — only file changed

### What changed
Added two new entries to the `REVIEWS` array:
- `{ id: 'isabel-hahn', name: 'Isabel Hahn', rating: 5, ... }` — carpet/rug/stairs + emergency late-night cat accident response
- `{ id: 'jessica-hensel', name: 'Jessica Hensel', rating: 5, ... }` — white couch upholstery cleaning

### Deep links
- `reviews.html#review-isabel-hahn`
- `reviews.html#review-jessica-hensel`

### No fake/placeholder reviews removed
Only Lori's real review existed; nothing was removed.

---

## 2026-06-07 — Logo placement and sizing

### Summary
Added the client logo image (`images/logo.png`) to the header and footer. Resized it significantly after initial placement was too small.

### Files changed
- `index.html`
- `css/styles.css`

### What changed in index.html
1. **Header nav**: Added `<img src="images/logo.png" class="nav-logo-badge">` inside `.nav-logo` anchor, before the text spans.
2. **Footer brand**: Changed `<img src="images/logo.svg">` → `<img src="images/logo.png">`.

### What changed in css/styles.css

**Logo badge styles (`.nav-logo-badge` / `.footer-logo-badge`):**
- Removed `border-radius: 50%` (was creating a circular crop placeholder look)
- Removed `filter: brightness(0) invert(1) opacity(0.85)` from footer badge (was recoloring the SVG placeholder)
- Removed fixed `width` values; now uses `width: auto`
- Added `object-fit: contain`
- Header logo: `height: 48px` → `140px`
- Footer logo: `height: 44px` → `160px`

**Nav and layout (desktop) — cascading update required by taller logo:**
- `.nav` height: `68px` → `160px`
- `.announcement-bar` top: `68px` → `160px`
- `.hero` padding-top: `68px` → `160px`

**Nav and layout (mobile ≤768px):**
- `.nav` height: `60px` → `110px`
- `.nav-logo-badge` height: `100px` (new mobile override)
- `.nav-links` top: `60px` → `110px`
- `.announcement-bar` top: `60px` → `110px`
- `.hero` padding-top: `60px` → `110px`

### Visual sections affected
- Header/navigation bar (taller, logo now visible)
- Footer brand area (logo now visible)
- Announcement bar position (adjusted to track new header height)
- Hero section top padding (adjusted to track new header height)

### Tested
- Not yet tested in browser this session. Visual check pending.

### Needs review
- Logo sizing may need tweaking — `logo.png` may have internal whitespace padding that makes the mark appear smaller than the container size suggests.
- `images/heather.jpg` is in the folder but not integrated into the site yet.
- All changes are unstaged and uncommitted.
