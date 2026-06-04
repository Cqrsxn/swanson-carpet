# Design

## Theme

Coastal Lowcountry warmth. Deep navy backgrounds anchor the page; teal is the primary action color; cream and beige fill content sections for breathing room; muted gold is used sparingly for accents and star ratings. The overall feel is polished but personal — not corporate.

## Color Palette

| Token | Hex | Use |
|---|---|---|
| `--teal` | `#4A9B8E` | Primary buttons, active states, icons, section labels |
| `--teal-light` | `#6DB8AD` | Hover states, borders on dark backgrounds |
| `--teal-dark` | `#2C6E64` | Button hover background, active nav text |
| `--teal-bg` | `#E8F5F3` | Teal-tinted surface (CTAs, focus rings bg, badges) |
| `--navy` | `#1B3A4B` | Section titles, nav text, card headings |
| `--navy-dark` | `#112433` | Footer background |
| `--cream` | `#FAF7F2` | Alternate section backgrounds (about, booking) |
| `--beige` | `#F0EBE1` | FAQ section, before/after section |
| `--beige-dark` | `#E4DDD1` | Borders, dividers |
| `--gold` | `#C9A84C` | Star ratings, booking step complete state |
| `--gold-light` | `#E8C96A` | Hero accent text, why-section labels |
| `--gold-pale` | `#FBF4E2` | Gold-tinted surface hover |
| `--red-accent` | `#C0392B` | Emergency section, service-card highlight, required field marker |
| `--text-dark` | `#1A2B35` | Body text |
| `--text-med` | `#4A5568` | Secondary text, card descriptions |
| `--text-light` | `#718096` | Metadata, placeholders, muted labels |

**Hero gradient:** `linear-gradient(135deg, #1B3A4B 0%, #2C6E64 45%, #1B4B5A 75%, #112433 100%)`

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Headings (`--font-head`) | Playfair Display, serif fallback | 700 | `clamp(1.75rem, 4vw, 2.4rem)` for section titles |
| Hero headline | Playfair Display | 700 | `clamp(2rem, 5.5vw, 3.5rem)` |
| Body (`--font-body`) | Inter, system-sans fallback | 400/500 | `1rem` base, `0.9rem` cards |
| Section label (overline) | Inter | 600 | `0.75rem`, `letter-spacing: 0.12em`, uppercase |
| Nav links | Inter | 500 | `0.9rem` |
| Buttons | Inter | 600 | `0.95rem` (default), `1.05rem` (lg), `0.85rem` (sm) |

Loaded from Google Fonts via `<link>` in `<head>`. Line height: `1.65` body, `1.25` headings.

## Spacing & Layout

- **Max content width:** `1200px` (`.container`)
- **Section vertical padding:** `88px 0` desktop, `60px 0` at ≤768px
- **Container horizontal padding:** `24px`
- **Grid gaps:** `22–24px` for card grids
- **Section intro max-width:** `640px`, centered

## Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `6px` | Nav links, badges, form fields |
| `--radius-md` | `12px` | Service icons, form inputs, FAQ items |
| `--radius-lg` | `20px` | Service cards, why-cards, testimonial cards |
| `--radius-xl` | `28px` | Hero photo placeholder, booking wrapper, services CTA block |
| `50px` (pill) | — | All buttons, hero badge, nav phone, hero phone badge |

## Shadows

| Token | Use |
|---|---|
| `--shadow-sm` | Subtle card depth (before/after, FAQ hover) |
| `--shadow-md` | Scrolled header, card hover states |
| `--shadow-lg` | About badge card, booking wrapper, hero phone badge |
| `--shadow-teal` | `0 8px 24px rgba(74,155,142,0.25)` — primary button default shadow |

## Buttons

Five variants, all pill-shaped (`border-radius: 50px`), inline-flex with 8px icon gap. All have `translateY(-2px)` on hover.

| Class | Background | Text |
|---|---|---|
| `.btn-primary` | `--teal` | white |
| `.btn-outline-light` | transparent | white (for dark backgrounds) |
| `.btn-ghost` | transparent | `--teal` |
| `.btn-white` | white | `--red-accent` (emergency use) |
| `.btn-outline-white` | transparent | white (footer/dark) |

Sizes: `.btn-lg` (`15px 32px`), default (`12px 24px`), `.btn-sm` (`8px 18px`).

## Animations

- **Fade-in / fade-up:** Progressive enhancement. Content is fully visible by default; `body.js-loaded` enables `opacity: 0 → 1` + `translateY(28px) → 0` via IntersectionObserver. Grid children stagger at 80ms intervals.
- **Fallback:** All `.fade-in` elements forced visible after 1200ms.
- **Transition default:** `0.22s cubic-bezier(0.4, 0, 0.2, 1)` (`--transition`)
- **Hero badge pulse:** `@keyframes pulse` — gold dot breathes at 2s interval
- **Scroll hint bounce:** `@keyframes bounce` — 8px vertical at 2s

## Section Backgrounds (in page order)

Hero (navy gradient) → Trust bar (cream) → Services (white) → About (cream) → Why Us (navy) → Before/After (beige) → Emergency (red gradient) → Booking (cream) → Testimonials (white) → FAQ (beige) → Service Areas (white) → Footer (navy-dark)

The white/cream/beige alternation creates visual rhythm without color noise.

## Key Components

**Service cards** — white background, `--radius-lg`, `1px beige-dark` border. Teal top-bar (`3px` gradient) reveals on hover via `scaleX(0 → 1)`. Hover: `translateY(-5px)`, `--shadow-lg`. Emergency variant uses red instead of teal.

**Why cards** — on navy background, `rgba(white, 0.05)` fill, white text, teal-light large decorative number (50% opacity). Hover: slightly brighter fill.

**FAQ accordion** — max-height animation (`0 → 300px`), open state adds teal-light border and rotates arrow 180°.

**Sticky mobile CTA** — fixed bottom bar, hidden above 768px. Three equal columns: Call (teal), Text (navy), Book (gold).

**Navigation** — fixed, `backdrop-filter: blur(12px)`, adds `--shadow-md` on scroll. Mobile: full-width dropdown slides down from header.

## Responsive Breakpoints

| Breakpoint | Key changes |
|---|---|
| ≤1024px | Services/before-after → 2-col; about → single col; footer → 2-col |
| ≤768px | Nav → hamburger; services/why/testimonials → 1-col; sticky mobile CTA appears; body gets `padding-bottom: 60px` |
| ≤480px | Hero headline → `1.8rem`; trust dividers hidden; calendar gap tightened |
