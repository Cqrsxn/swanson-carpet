# Design & Workflow Decisions

---

## Logo handling (established 2026-06-07)

**Rule: Use `images/logo.png` exactly as provided. Never edit the image file.**

- Do not recreate, recolor, crop, compress, trace, or convert the logo.
- Do not apply CSS filters, masks, borders, shadows, or overlays to it.
- Do not convert it to SVG or any other format.
- Only use HTML `<img>` + CSS `height`/`width`/`object-fit` to control display size.
- Always use `object-fit: contain` so the full logo stays visible and proportional.
- Use `width: auto` (not a fixed pixel width) to preserve the logo's natural aspect ratio.

**Why:** The client provided the exact logo. Any modification — even visual-only CSS transforms — could alter how the brand appears and is not authorized.

---

## Logo file preference (established 2026-06-07)

**Use `images/logo.png`, not `images/logo.svg`.**

`logo.svg` appears to be an old or blank placeholder that was committed earlier. `logo.png` is the actual client-supplied raster logo.

---

## Nav height must stay in sync (established 2026-06-07)

Three CSS values are tightly coupled to the nav/header height and must be updated together whenever the nav height changes:

| Value | Desktop | Mobile (≤768px) |
|---|---|---|
| `.nav { height }` | 160px | 110px |
| `.announcement-bar { top }` | 160px | 110px |
| `.hero { padding-top }` | 160px | 110px |
| `.nav-links { top }` (mobile only) | — | 110px |

If the logo size or nav height changes in the future, update all four values in both breakpoints.

---

## Small targeted tasks — scope discipline

When a task says "only change X", do not refactor, restyle, or improve adjacent code. Make the minimum change needed. If a dependent structural value (like nav height) must change as a side effect, do it but be transparent about it.

---

## Git / commits

Do not commit or push unless explicitly asked. Changes stay as working-tree modifications until the user commits.
