# HANDOFF — Swanson Cleaning site

**This file is committed to git on purpose.** The other planning docs in this folder
(`NEXT_SESSION_BRIEF.md`, `DECISIONS.md`, `PROJECT_OVERVIEW.md`, `README.md`, `SESSION_LOGS/`)
are deliberately **never committed** — they only exist on the machine that wrote them.
So this is the one file that actually travels between Carson's Windows PC and his Mac.
If you learn something on one machine that the other machine needs, put it here and commit it.

Last updated: **2026-08-18** (Windows session)

---

## Read this before editing anything

1. `git fetch origin && git status` — **always**. Carson works on this repo from two machines
   (Windows PC and Mac) and has had real merge conflicts here before. Check for divergence
   before you start, not just before you push.
2. Read this file, then `DECISIONS.md` if it exists on your machine.
3. The site is plain HTML/CSS/JS. **No build step, no framework, no React.** Every page is a
   standalone `.html` file with duplicated header/footer markup.

---

## Where it lives

| | |
|---|---|
| Repo | https://github.com/Cqrsxn/swanson-carpet (branch `main`) |
| Live site | https://swansoncleaning.com |
| Hosting | Netlify — **auto-deploys on every push to `main`** (~1–2 min) |
| Local dev | `node server.js` → http://localhost:3456 |

GitHub Pages is *also* enabled on the repo but is **not** what the domain uses. Don't verify
deploys against `cqrsxn.github.io` — check `swansoncleaning.com`.

---

## ⚠️ Cache-busting: the thing that will waste your time

`css/styles.css` and `images/hero-action-5.webp` are referenced with `?v=N` query strings:

```html
<link rel="stylesheet" href="css/styles.css?v=10" />
<img src="images/hero-action-5.webp?v=4" ...>
```

**If you change the CSS or replace that image, bump the number in every page that references it.**
Otherwise browsers — phones especially — keep serving the cached copy and your edit looks like it
did nothing. This burned a whole round of edits on 2026-08-18: the files on disk were correct the
entire time, but the phone kept rendering the old cached versions.

Bump them all at once:

```bash
# from the project root
node -e "const fs=require('fs');fs.readdirSync('.').filter(f=>f.endsWith('.html')).forEach(f=>{const c=fs.readFileSync(f,'utf8');const u=c.replace('styles.css?v=10','styles.css?v=11');if(u!==c)fs.writeFileSync(f,u)})"
```

---

## ⚠️ The hero collage vs. the fixed header (mobile)

`.header` is `position: fixed`, **111px tall and opaque**. `.hero-collage` is `position: absolute; inset: 0`,
so on mobile it starts *underneath* the header. Anything in the top ~111px of the top-row photos is
invisible — hidden behind the nav bar, not cropped.

Current mobile rules (in the `@media (max-width: 768px)` block):

```css
.hero { min-height: 100vh; min-height: 100svh; padding-top: 110px; }
.hero-collage { grid-template-columns: repeat(2,1fr); grid-template-rows: repeat(2,1fr); top: 110px; }
.hero-collage img:nth-child(1) { object-position: center top; }   /* Heather's face photo */
.hero-collage img:nth-child(2) { object-position: 35% center; }
```

- `top: 110px` keeps the photos clear of the header.
- `min-height: 100svh` (full-height hero on mobile) is what keeps the centred hero text from riding
  up over the top photo row on short screens. Don't drop it back to `90vh` without re-checking the
  face/text overlap.
- **`object-position` cannot rescue a badly framed photo.** It only chooses which part of an
  already-cropped image to show; it can't reveal anything above the image's own top edge. If a
  subject is in the wrong place, re-crop the source file instead of fighting with percentages.

### How to actually test mobile

Chrome's window-resize tooling did **not** give a real mobile viewport in this setup
(`window.innerWidth` stayed at 2400 no matter what). What works: load the page in an iframe of a
fixed CSS width — the iframe gets a genuine viewport and the media queries apply.

```html
<!-- temporary file at project root, delete when done -->
<iframe src="/index.html" style="width:390px;height:844px;border:0"></iframe>
```

Then measure real geometry instead of eyeballing a scaled screenshot:

```js
const d = document.querySelector('iframe').contentDocument;
const cell = d.querySelector('.hero-collage img').getBoundingClientRect();
const hdr  = d.querySelector('.header').getBoundingClientRect();
const h1   = d.querySelector('.hero-headline').getBoundingClientRect();
// Heather's face occupies ~16.3%–33.6% of hero-action-5.webp's height
const faceTop = cell.top + 0.163 * cell.height;
const faceBot = cell.top + 0.336 * cell.height;
({ clearsHeader: faceTop > hdr.bottom, clearsText: faceBot < h1.top });
```

Verified clear at **390x844**, **430x932**, **360x800**. Desktop unaffected.

**Known limitation:** at **375x667** (iPhone SE/8) the headline still overlaps her face. That
viewport is too short for the hero's content — the trust row already collided with the bottom
curve there before any of this. Fixing it means shrinking the hero type/buttons on very short
screens. Ask Carson before doing that.

---

## Standing rules

- **Never modify** `images/logo.png` or `images/heather.jpg`.
- **Never commit** `.claude/` or `.impeccable/`.
- Nav height (160px desktop / 110px mobile) is coupled to `.hero`/`.page-hero` `padding-top`
  **and** to `.hero-collage { top }` on mobile. Change them together and re-check both breakpoints.
- No Calendly embed, `#booking` section, or "Book Now" language unless Carson/Heather explicitly ask.
- New pages: copy the header/footer from a full-nav page (e.g. `contact.html`), **not** from
  `reviews.html` — that one intentionally uses a lighter "Back to Home" nav for secondary pages.
- Don't commit or push unless Carson asks.

---

## Open items

- **Netlify form notification (needs Carson, not code):** Netlify dashboard → Site settings →
  Forms → Form notifications → add email notification to `heather.razin@yahoo.com`. Until then
  contact-form submissions land in the Netlify dashboard and nobody gets emailed.
- `375x667` hero text/face overlap — see above.
- `images/hero-action-1.webp` and `hero-action-3.webp` are no longer referenced anywhere
  (superseded on 2026-08-18). Left in the repo intentionally; delete only if Carson says so.
- Untracked full-size source photos sit in `images/` (`carpet before.jpeg`, `circlestain*.jpeg`,
  `no-b&a-justcleanedcarpet*.jpeg`). Superseded by their `.webp` derivatives. Left alone.
- `privacy-policy.html` doesn't disclose Google Analytics (`G-XKCBFEEG4J`). Pre-existing gap.
