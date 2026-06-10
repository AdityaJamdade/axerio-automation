# Axerio Automation — Codebase Audit

**Scope:** Full static site (`index.html`, `presets.html`, `onboarding.html`, `legal/`, `css/`, `js/`, `palettes/`, assets, SEO files).
**Stack:** Vanilla HTML/CSS/JS, Three.js (CDN), config-driven content, deployed on GitHub Pages.
**Date:** 10 June 2026

The architecture is sound for this scale — a config-driven vanilla static site is the right call; no need for a framework. The issues below are about dead weight, a few correctness/consistency bugs, performance on mobile, and accessibility/security hardening. Nothing here is a rewrite; it's cleanup and tightening.

---

## Priority 1 — Fix now (high impact, low effort)

### 1.1 Dead `palettes/` folder — ~150 KB of unused CSS
The six files `palettes/palette-a.css` … `palette-f.css` (totalling ~150 KB, with `palette-b/d/e/f` at ~1,040 lines each) are **not referenced by any HTML, CSS, or JS file** in the repo. `palette-d`, `palette-e`, and `palette-f` differ by only ~53 lines from each other — near-duplicates. This is the single biggest cleanup win.

**Action:** Delete the `palettes/` folder, or if it's a staging area for future work, move it out of the deployed branch. It currently ships nothing but adds repo weight and confusion.

### 1.2 `formspreeId` is dead config — code, config, and README disagree
`js/config.js` sets `form.formspreeId: "xnjrzrlo"` and the README documents a full Formspree setup flow. But `js/main.js` `wireForm()` never reads `formspreeId` — it POSTs to the Render backend (`/api/wedding/contact`) and falls back to `mailto:`. Three sources describe three different behaviours.

**Action:** Pick one path. Since the Render backend is the live one, remove the `formspreeId` field and the Formspree section of the README (or wire Formspree in as the documented fallback). Leaving contradictory config invites a future editor to "fix" the wrong thing.

### 1.3 Reveal-on-scroll content vanishes if JS fails
Every major section uses `.reveal` (opacity 0 until `IntersectionObserver` adds `.visible`). There is no `<noscript>` fallback and no CSS fallback. If `main.js` errors, is blocked, or three.js fails to load and throws before init, **the page renders blank**. The hero, stats, and process content are also injected by JS (`populateSite`), so a single JS failure takes down most of the page.

**Action:** Add a `<noscript>` rule (or an `@media (scripting: none)`) that sets `.reveal { opacity: 1; transform: none; }`, and wrap the three.js block in a `try/catch` so a WebGL failure never blocks `populateSite()`.

### 1.4 `observeRevealElements()` runs twice
It's called inside `populateSite()` (line 167) and again directly in `DOMContentLoaded` (line 348). Harmless today (it re-observes the same nodes) but wasteful and a sign the init flow drifted.

**Action:** Remove one of the two calls.

---

## Priority 2 — Performance

### 2.1 Three.js loads render-blocking and runs an O(N²) loop every frame
`three.min.js` (~600 KB) is a synchronous `<script>` in `<head>` with no `defer`/`async`, so it **blocks first paint**. The animation loop then compares every node against every other node each frame: `N=140` → ~9,700 distance checks per frame (the inner `for j = i+1` loop), 60 times a second. On mid/low-end phones this causes jank and battery drain.

**Actions:**
- Add `defer` to the three.js and `config.js`/`main.js` tags (or load three.js with `async` and init on its `onload`).
- Gate the whole background on capability: skip it on `(hover: none)` / small viewports and honour `prefers-reduced-motion` (currently only the *hero* effects respect reduced-motion, not the canvas).
- Reduce `N`, lower the connection threshold, or only recompute lines every 2–3 frames.

### 2.2 Add Subresource Integrity (SRI) to the CDN script
`three.min.js` is pulled from cdnjs with no `integrity`/`crossorigin` hash. A compromised CDN response would execute with full page privileges — a real supply-chain risk on a site that takes form submissions.

**Action:** Add `integrity="sha384-…"` and `crossorigin="anonymous"`, or self-host a pinned copy in `assets/`.

### 2.3 Favicon is a 59 KB PNG
`assets/logo-3.0-zoomed-in-removebg.png` (59 KB) is used as both the favicon and the OG image. As a favicon it's ~30× larger than it needs to be and is fetched on every page.

**Action:** Generate a small `favicon.ico` (or 32×32 PNG, <5 KB) for `rel="icon"`; keep the large PNG only for `og:image`.

### 2.4 No build / minification step
`presets.js` (31 KB), `main.css` (25 KB), and the HTML ship unminified. Not critical at this size, but a one-line build (e.g. `esbuild`/`terser` + `cssnano`) would cut payload 40–60% with zero code changes.

### 2.5 Images have no dimensions and no lazy-loading
The two `<img>` logos have no `width`/`height` attributes (causes layout shift / CLS) and nothing uses `loading="lazy"`. Minor here because there are few images, but cheap to fix and good hygiene.

---

## Priority 3 — Accessibility

- **Hamburger button** has `aria-label` but no `aria-expanded` state, and the mobile menu isn't toggled with `aria-hidden` / focus management. Screen-reader users can't tell if the menu is open.
- **Decorative canvas** (`#bg-canvas`) and emoji icons (💍 ⚡ 🎨 ✉️ etc.) are exposed to assistive tech. Add `aria-hidden="true"` to the canvas and wrap decorative emoji in `<span aria-hidden="true">`.
- **Colour contrast:** muted greys like `#94a3b8` (cookie banner text) and `#9FB6D0` on dark backgrounds are borderline against WCAG AA (4.5:1). Worth a contrast check on body/secondary text.
- **Keyboard:** the preview modal traps `Escape` (good) but doesn't trap focus inside the modal or restore focus on close.
- Form labels are correctly associated — good. Keep that pattern.

A quick Lighthouse / axe pass would surface the exact contrast failures.

---

## Priority 4 — Maintainability & best practices

### 4.1 Inline styles and inline event handlers
The cookie banner in `index.html` is ~60 lines of inline `style="…"` plus `onmouseover`/`onmouseout`/`onclick` attributes; `presets.html` has 5 inline handlers, `index.html` has 11. This is hard to maintain, duplicates values that exist in CSS, and **blocks adding a Content-Security-Policy** (inline JS/CSS require `unsafe-inline`).

**Action:** Move the banner styles into `css/main.css` and bind its buttons in `main.js` (the handlers already exist as `cookieAccept`/`cookieDecline`). Then you can ship a meaningful CSP `<meta>`.

### 4.2 `innerHTML` string-building
`main.js` and `presets.js` build markup via string concatenation with config/preset values interpolated directly. Safe today because all data is author-controlled, but the moment any value becomes user- or URL-derived it's an XSS vector. The `presetParam` from the query string is already echoed into the message field (as a value, so lower risk) — keep an eye on that pattern.

**Action:** No urgent change; just standardise on `textContent` for any value that could ever come from outside, and keep `innerHTML` for static templates only.

### 4.3 Redundant data in `presets.js`
Many presets share byte-identical palettes (e.g. `darkElegance`, `midnightGold`, `boldMidnight`, `roseAndStone`'s dark variants all use the same `#0D1526` set). The data could be normalised to a small set of named palettes referenced by key, shrinking the file and preventing drift when a colour changes.

### 4.4 SEO / housekeeping
- `sitemap.xml` lists only `/` and `/presets.html` with static `lastmod` dates. Fine (onboarding is correctly `noindex`), but the dates will go stale — consider generating them at build time.
- Structured data (JSON-LD Organization + WebSite) is well done. The `SearchAction` points at `/?s=` which the site doesn't actually implement — drop it unless you add search.
- `theme-color`, canonical, OG, and Twitter tags are all present and correct. Good.

---

## What's already good

- Clean config-driven content model (`config.js` as the single edit surface) — genuinely nice for a non-technical owner.
- Sensible separation of concerns across `main.js` / `presets.js` / config.
- Proper semantic sections, real `<label>`/`<input>` associations, `prefers-reduced-motion` respected in hero effects, `passive` scroll listener.
- Solid SEO meta + JSON-LD, `robots.txt`, sitemap, canonical, per-page `noindex` on onboarding.
- Backend selection by hostname (local vs prod) is a clean touch.

---

## Suggested order of work

1. Delete `palettes/` folder (1.1) and resolve the Formspree contradiction (1.2). *(~10 min, big clarity win)*
2. Add `.reveal` no-JS fallback + try/catch around three.js (1.3), drop the double observer call (1.4). *(prevents blank-page failure)*
3. `defer` scripts + gate/optimize the canvas (2.1), add SRI (2.2), shrink the favicon (2.3). *(mobile performance + security)*
4. Accessibility pass with Lighthouse/axe (Priority 3).
5. De-inline the cookie banner and add a CSP (4.1).

Items 1–3 are an afternoon and cover ~90% of the real-world impact.
