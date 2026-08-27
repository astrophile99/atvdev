# atvdev — studio site (v2)

A static, dependency-free portfolio site for **atvdev**, an independent design
and build studio. This is a ground-up rebuild: warm/playful direction inspired
by `zainabkabira.com`, with an original signature interaction rather than a
copy of hers. No framework, no build step required to deploy, no runtime
JavaScript libraries.

**The core idea:** atvdev has no real client work yet, so it can't win by
showing photography or client logos the way most portfolio references do.
Instead **the website itself is the portfolio** — every visual is a hand-built,
interactive CSS/SVG scene, and the hero hands the visitor actual controls over
the page's own art direction in the first five seconds.

---

## Before you go live — 6 edits

These are the only placeholders in the codebase. Everything else is finished.

| # | What | Current value | Where |
|---|------|---------------|-------|
| 1 | **Email address** | `hello@atvdev.studio` | every `.html`, plus `MAIL` in `tools/build.mjs` |
| 2 | **Social links** | generic `instagram.com` / `linkedin.com` / `github.com` | every `.html` |
| 3 | **Domain** | `https://atvdev.studio` | `<link rel=canonical>`, OG tags, `sitemap.xml`, `robots.txt`, `SITE` in `tools/build.mjs` |
| 4 | **Budget options** | placeholder ₹ ranges | `index.html`, contact form |
| 5 | **Availability** | `Available for Q4 — two project slots` | `index.html`, hero tag |
| 6 | **Founded year** | `2023` | hero meta, studio meta |

Then rebuild the case studies: `npm run build`.

---

## About the six projects

The six case studies are **self-initiated concept work**, not client
engagements. Each is labelled honestly in two places:

- a `Concept` chip in the work stack on the home page
- a `Self-initiated concept — brand and brief invented to show scope` note in
  each case study hero

When real client work replaces a concept piece, remove both labels **and**
the invented brand/brief — don't keep the fake brand with just the disclaimer
removed, that's a false client claim.

---

## Structure

```
index.html            Home — hero (control panel), manifesto, work stack (6),
                      capabilities, process, voice, contact/ignite
studio.html           About — kinetic hero, statement, pinned principles,
                      founder, fit, FAQ, CTA
404.html              Not found
work/*.html           Six case studies (GENERATED — do not edit by hand)

assets/css/tokens.css  Design tokens — warm palette, day/night, live dials
assets/css/base.css    Reset, layout, type, header/menu/footer, cursor, preloader
assets/css/art.css     The six bespoke project artworks (ported, retoned)
assets/css/sections.css  Home + studio page section layouts
assets/css/case.css    Studio bio/fit + case-study monograph layout
assets/css/motion.css  Entrances + scroll-driven effects (load LAST)
assets/js/app.js       Core engine — scroll hub, reveals, cursor, transitions
assets/js/controls.js  The hero control panel (warmth/energy/night/sound)

tools/projects.mjs    ← Single source of truth for the case studies
tools/build.mjs       Renders work/*.html + stamps all pages with an asset hash
tools/check.mjs       Link + anchor integrity checker
```

### Editing a case study

Never edit `work/*.html` directly — it's overwritten. Edit
`tools/projects.mjs`, then:

```bash
npm run build
```

### Checking your links still work

```bash
node tools/check.mjs
```

---

## Local preview

```bash
python -m http.server 4321
```

Then open `http://localhost:4321`. Any static server works.

---

## Deploying

The repository **is** the site — no build command, no output directory.
`vercel.json` sets `framework: null` (skips any Next.js auto-detect),
long-lived caching on `/assets/*`, and basic security headers.

If you point a custom domain at it, update the six placeholders above first.

---

## The signature interaction — "Take the controls"

The hero isn't a static image with text over it — it's a small tactile panel
that **re-art-directs the whole page live**:

- **Warmth** slider shifts the paper colour toward amber or sky
- **Energy** knob speeds up every ambient animation (sky drift, LED pulse,
  marquees) via a CSS custom property multiplier
- **Night** toggle swaps the entire palette (persisted in `localStorage`) and
  flips text colours to their AA-safe dark-surface variants
- **Sound** toggle enables a tiny synthesized click (Web Audio, generated
  live — no audio file) on each dial change, off by default

The palette mix is deliberately computed in **JavaScript**, not CSS
`color-mix()` — a pure-CSS `color-mix(in srgb, ... calc(var(--x) * %) ...)`
chain was tried first and looked right in isolation, but proved unreliable to
recompute across rapid dial changes. `controls.js` interpolates RGB by hand
and writes a resolved `rgb()` into `--paper-live`; `tokens.css` falls back to
plain `--paper` when that property is unset, so a no-JS visitor and the
instant before `controls.js` boots both see the correct resting colour.

Closing signature: **"Click to ignite"** on the contact section — a burst of
flame-coloured spark spans from the click point (`ignite()` in `app.js`),
self-removing once their animation ends. Pure CSS keyframes, no canvas.

---

## Motion architecture

Two tiers:

1. **IntersectionObserver + class toggles** for entrances. Works everywhere.
2. **Native CSS scroll-driven animation** (`animation-timeline: view()`) for
   continuous scrubbed effects — runs off the main thread. Where unsupported
   the page simply sits still.

**One scroll listener.** `hub` in `app.js` owns the only `scroll` listener and
rAF loop; everything scroll-driven subscribes to it (header, the work-stack
rail highlight, word illumination, the pinned horizontal sections). It
publishes `--sv` (signed velocity) on `:root` for CSS to react to.

**The work section is a sticky-stack**, not a grid: six full-viewport cards,
each `position: sticky; top: 0`, later ones covering earlier ones as you
scroll. A side rail highlights which project is current, computed from
`.work__stack`'s own (non-sticky) position — never from the cards themselves,
because a sticky element's `getBoundingClientRect()` lies about its position
once it's engaged (clamps to 0 regardless of true document position). That
trap cost real debugging time; see the comment in `workRail()`.

**The process/principles sections are pinned horizontal pans** — the section
holds the viewport while a track of panels drags sideways
(`hSections()` in `app.js`). Height is derived from the real track width;
below 861px or under reduced motion it drops the pin and stacks vertically.

**Two traps worth knowing, both hit during this build:**

- `clip-path` for a reveal must go on the *child*, never the element an
  `IntersectionObserver` is watching. Clipping the observed element to zero
  collapses its intersection rect, so the observer never fires and the
  element stays hidden forever.
- Reading a `position: sticky` element's `getBoundingClientRect()` to compute
  "where does this sit in the document" only works before it has ever engaged
  sticky. Once engaged, its rect is clamped to the sticky offset. Measure a
  plain (non-sticky) ancestor and derive positions arithmetically instead.

---

## Accessibility

- **Contrast** — every text node on all nine pages, in both day and night
  themes, meets WCAG AA (4.5:1 body, 3:1 large). The flame accent has three
  variants (`--flame`, `--flame-txt`, `--flame-solid`) because the same hex
  fails AA in some of these contexts and passes in others.
- **No JavaScript** — an inline `<head>` script sets `.js` before paint;
  every hide-until-revealed rule is scoped to `.js` in the selector, so a
  visitor without JavaScript gets the complete page, not a blank one.
- **Reduced motion** — disables the sky drift, marquees, cursor, ignite
  sparks, the pinned horizontal sections (falls back to a vertical stack),
  and the page-transition curtain.
- **Touch** — the custom cursor and dial-hover states are gated to
  `(hover: hover) and (pointer: fine)`.
- Keyboard: skip link, visible focus rings, Escape closes the menu, the
  control panel's dials and toggles are real `<input type="range">` /
  `<button aria-pressed>` elements.

## Known gap: photography

There's still no photograph anywhere on the site — every visual is hand-built
CSS/SVG. That's a deliberate flex for a developer/studio portfolio without
real client work yet, but the founder portrait frame on `studio.html` is
built and ready: drop `assets/img/atharva.jpg` in and uncomment the `<img>`
already sitting in `.bio__portrait`.
