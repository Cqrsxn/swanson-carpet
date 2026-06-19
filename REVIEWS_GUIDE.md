# Reviews Section Guide

> **Updated 2026-06-19.** The reviews system was reworked. All fake/placeholder
> reviews were removed, review data now lives in **one shared file**, the homepage
> no longer auto-slides, and there is a dedicated **Reviews page**. This guide
> reflects the current setup.

## How it works at a glance

- **Review data** lives in `js/reviews-data.js` — the **single source of truth**.
  Both the homepage and the Reviews page read from this one file.
- **Homepage** (`index.html`) shows **clickable preview cards** in a horizontal,
  user-controlled scroller. Long reviews are shortened to a preview with a
  "Read full review →" cue.
- **Reviews page** (`reviews.html`) shows the **full text** of every review.
- Clicking a homepage card opens `reviews.html` and jumps to that specific
  review via a deep link (`reviews.html#review-<id>`).

You only ever edit `js/reviews-data.js` to add, change, or remove a review.
You do not need to touch `index.html`, `reviews.html`, `app.js`, or the CSS.

---

## Where the code lives

| What | File | Location |
|---|---|---|
| **Review data (edit this)** | `js/reviews-data.js` | `const REVIEWS = [...]` near the top |
| Homepage preview cards | `js/app.js` | `buildReviewPreviewCard()` / `initReviews()` |
| Homepage section HTML | `index.html` | Search for `id="reviews"` (`.reviews-scroller`) |
| Reviews page | `reviews.html` | Whole page; renders full cards from `REVIEWS` |
| Section styles | `css/styles.css` | Search for `REVIEWS / TESTIMONIALS` |

---

## How to add a new review

Open `js/reviews-data.js` and find the `REVIEWS` array at the top. Add a new
object following this structure:

```js
{
  id: 'first-name',          // unique slug — used for the deep link
  name: 'First Name',
  location: 'Bluffton, SC',  // optional — leave as '' to hide it
  rating: 5,
  text: `The review text goes here. Write it exactly as you want it to appear.`,
},
```

Paste it anywhere inside the array brackets `[...]`. Save the file and refresh
the browser. Both the homepage and the Reviews page update automatically.

### Copy-paste template

```js
{
  id: 'unique-slug',
  name: 'First Name',
  location: 'City, SC',
  rating: 5,
  text: `Review text here.`,
},
```

### Example

```js
{
  id: 'jennifer-k',
  name: 'Jennifer K.',
  location: 'Bluffton, SC',
  rating: 5,
  text: `Heather was so thorough and the carpets looked brand new when she was done. We will definitely be using Swanson Cleaning again.`,
},
```

---

## Review data structure

Each review uses these fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | String | **Yes** | A unique slug (lowercase, hyphens). This becomes the deep-link anchor: `reviews.html#review-<id>`. Every review needs a **different** `id`. Example: `'lori'`. |
| `name` | String | Yes | The reviewer's name as it should appear. Example: `'Lori'` or `'Jennifer K.'` |
| `location` | String | No | City and state. Leave as `''` (empty) to hide the location line. Example: `'Bluffton, SC'` |
| `rating` | Number | Yes | Use `5`. Only 5-star reviews should be displayed. |
| `text` | String | Yes | The review text. See the note below on long reviews and paragraph breaks. |

### Writing the `text` (long reviews + paragraph breaks)

- **Use backticks** (`` ` ``) around the text, not single quotes. A backtick
  template string lets you include apostrophes, em-dashes, ellipses, and line
  breaks without escaping anything.
- **Paragraph breaks are supported.** Press Enter to create a blank line between
  paragraphs inside the backticks. The Reviews page preserves these breaks; the
  homepage preview flattens them into a short single-line snippet automatically.
- **Long reviews are fine.** The homepage shows only a short preview (about the
  first 200 characters) followed by "Read full review →". The full text shows on
  `reviews.html`. There is no length limit.

Example of a long, multi-paragraph review:

```js
{
  id: 'lori',
  name: 'Lori',
  location: '',
  rating: 5,
  text: `First paragraph of the review goes here and can be as long as needed.

Second paragraph after a blank line. The Reviews page keeps this break.

Third paragraph. Absolutely worth every penny!`,
},
```

---

## How the homepage scroller works

- The `REVIEWS` array renders into the `.reviews-track` div inside
  `.reviews-scroller` (see `initReviews()` in `js/app.js`).
- **There is no automatic animation.** The cards do **not** slide on their own.
  The visitor scrolls or swipes through them manually. Scroll-snap gives a
  smooth, premium feel.
- Each card is a link. Clicking it opens `reviews.html` and jumps to that
  review's full text via `reviews.html#review-<id>`.
- Long reviews are truncated to a preview with a "Read full review →" cue.
  Short reviews show in full with a "Read on Reviews page →" cue.

---

## How the Reviews page works

- `reviews.html` is a standalone page that matches the site's branding (same
  nav, hero, fonts, colors, and footer).
- It reads the same `REVIEWS` array from `js/reviews-data.js` and renders the
  **full** text of every review, with paragraph breaks preserved.
- Each full card has the id `review-<id>`, so deep links from the homepage land
  on and highlight the right review.
- The page includes a clear "← Back to Home" button and a booking CTA.

---

## How many reviews to show

- **Minimum: 1.** A single real review is fine — the scroller and Reviews page
  both handle one card cleanly. (As of 2026-06-19 the site has exactly one real
  review: Lori's.)
- **Sweet spot: 5 to 8.** Enough variety to feel trustworthy without overwhelming.
- **Maximum: about 12.** Beyond that the homepage scroller gets very long.

Only add **real** reviews. Do not re-introduce placeholder/fake reviews.

---

## Security note

This reviews section is **display only**. Visitors cannot submit reviews through
the website. There is no form, no input, no database, and no admin panel.

**How to collect real reviews:** After a cleaning appointment, send customers a
follow-up message or email with a direct link to your Google Business Profile
review page. Do not offer discounts or incentives for reviews, as this can
violate Google's review policies.

Do not add a public review submission form to this website. Handling
user-submitted content requires input validation, spam filtering, and a
moderation workflow that this static site does not have.
