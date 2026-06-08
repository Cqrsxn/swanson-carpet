# Reviews Section Guide

## Where the code lives

| What | File | Location |
|---|---|---|
| Section HTML | `swanson-carpet/index.html` | Search for `id="reviews"` |
| Review data | `swanson-carpet/js/app.js` | `const REVIEWS = [...]` near the top |
| Section styles | `swanson-carpet/css/styles.css` | Search for `REVIEWS / TESTIMONIALS` |

---

## How to add a new review

Open `js/app.js` and find the `REVIEWS` array at the top. Add a new object following this structure:

```js
{
  name: 'First Name L.',
  location: 'City, SC',
  rating: 5,
  text: 'The review text goes here. Write it exactly as you want it to appear on the site.',
},
```

Paste it anywhere inside the array brackets `[...]`. Save the file and refresh the browser.

### Copy-paste template

```
name: 'First Name L.',
location: 'City, SC',
rating: 5,
text: 'Review text here.',
```

### Example

```js
{
  name: 'Jennifer K.',
  location: 'Bluffton, SC',
  rating: 5,
  text: 'Heather was so thorough and the carpets looked brand new when she was done. We will definitely be using Swanson Cleaning again.',
},
```

---

## Review data structure

Each review must have all four fields:

| Field | Type | Notes |
|---|---|---|
| `name` | String | First name and last initial with period. Example: `'Heather S.'` |
| `location` | String | City and state. Example: `'Bluffton, SC'` |
| `rating` | Number | Use `5` for all reviews. Only 5-star reviews should be displayed. |
| `text` | String | The review text. No quotation marks inside the string (the card adds them). Use `\'` if you must include an apostrophe. |

---

## How the animation works

- The `REVIEWS` array renders into the `.reviews-track` div inside `.reviews-marquee`.
- JavaScript duplicates all cards automatically so the scroll loops with no gaps.
- The CSS animation (`reviews-ltr`) scrolls the track from left to right at a slow, smooth pace.
- Hovering over the reviews section pauses the animation so visitors can read the cards.
- Users with reduced motion enabled (accessibility preference) see the cards as a static wrapped grid instead of an animated carousel. JavaScript detects this and skips the duplication step.

---

## How many reviews before it feels crowded

- **Minimum: 3 reviews.** Fewer than 3 shows too much blank space in the track on wide screens.
- **Sweet spot: 5 to 8 reviews.** Enough variety to feel trustworthy without overwhelming.
- **Maximum: 12 reviews.** Beyond that, the track becomes very long and the loop takes too long to complete.

At 5 reviews (the current default), visitors see 3 to 4 cards at once on desktop, which is ideal.

---

## Adding more reviews does not break the animation

The JavaScript automatically duplicates however many cards are in the `REVIEWS` array. You do not need to touch the HTML or CSS when adding reviews.

---

## Security note

This reviews section is **display only**. Visitors cannot submit reviews through the website. There is no form, no input, no database, and no admin panel.

**How to collect real reviews:** After a cleaning appointment, send customers a follow-up message or email with a direct link to your Google Business Profile review page. Do not offer discounts or incentives for reviews, as this can violate Google's review policies.

Do not add a public review submission form to this website. Handling user-submitted content requires input validation, spam filtering, and a moderation workflow that this static site does not have.
