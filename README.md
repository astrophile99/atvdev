# atvdev — studio site

A static, dependency-free portfolio site for **atvdev**, an independent design
and build studio. No framework, no build step required to deploy, no runtime
JavaScript libraries. Nine pages, four stylesheets, one script.

---

## Before you go live — 6 edits

These are the only placeholders in the codebase. Everything else is finished.

| # | What | Current value | Where |
|---|------|---------------|-------|
| 1 | **Email address** | `hello@atvdev.studio` | every `.html`, plus `MAIL` in `tools/build.mjs` |
| 2 | **Social links** | generic `instagram.com` / `linkedin.com` / `github.com` | every `.html`, plus `tools/build.mjs` |
| 3 | **Domain** | `https://atvdev.studio` | `<link rel=canonical>`, OG tags, `sitemap.xml`, `robots.txt`, `SITE` in `tools/build.mjs` |
| 4 | **Pricing** | `From ₹—` | `index.html`, Engagements section |
| 5 | **Availability** | `Available for Q4 · two project slots` | `index.html`, the `<textPath>` inside `.hero__orb` |
| 6 | **Founded year** | `2023` | `index.html` hero meta, `studio.html` |

Fastest way to do 1–3 across the whole site:

```bash
cd "D:/WEB Projects/atvdev" && grep -rl "atvdev.studio" --include=*.html --include=*.mjs --include=*.txt --include=*.xml .
```

Then run your find-and-replace, and rebuild the case studies with `npm run build`.

---

## About the six projects

The six case studies are **self-initiated concept work**, not client
engagements. Each one is labelled honestly in two places:

- a `Concept` chip on the home page project cards
- a `Self-initiated concept — brand and brief invented to show scope` note in
  each case study hero

When real client work replaces a concept piece, remove both:

- the `<span class="chip chip--concept">Concept</span>` in `index.html`
- the `<p class="case-note">…</p>` block in `tools/build.mjs`, then rebuild

Do not simply delete the labels while keeping the invented brands and briefs —
that turns demonstration work into a false claim about clients you have had.

---

## Structure

```
index.html            Home — hero, manifesto, 6 projects, capabilities,
                      process, engagements, contact
studio.html           About the studio — principles, bio, fit, FAQ
404.html              Not found
work/*.html           Six case studies (GENERATED — do not edit by hand)

assets/css/core.css   Design tokens, reset, type, header, menu, cursor,
                      marquee, footer, preloader
assets/css/home.css   Home + studio page sections
assets/css/case.css   Case study layout, interface mockups, scenes
assets/css/art.css    The six bespoke project artworks
assets/css/motion.css The motion layer (load it LAST, it wins the cascade)
assets/js/app.js      All interaction (no dependencies)

tools/projects.mjs    ← Single source of truth for the case studies
tools/build.mjs       Renders work/*.html from that data
tools/check.mjs       Link + anchor integrity checker
```

### Editing a case study

Never edit `work/*.html` directly — it is overwritten. Edit
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

Then open `http://localhost:4321`. Any static server works; there is nothing
to compile.

---

## Deploying

The repository **is** the site — no build command, no output directory.

**Vercel** — import the folder, framework preset `Other`, build command empty,
output directory `./`. `vercel.json` already sets long-lived caching on
`/assets/*` and basic security headers.

**Netlify / Cloudflare Pages / GitHub Pages** — publish directory `./`. All of
them serve `404.html` automatically.

If you point a custom domain at it, update the six placeholders above first so
canonical URLs and the sitemap are correct.

---

## The contact form

`index.html` has no backend. By default the form opens the visitor's mail
client with the brief pre-filled — this works everywhere with zero setup.

To collect submissions properly instead, add an endpoint (Formspree, Basin,
Web3Forms, or your own):

```html
<form class="cta__form" data-form data-endpoint="https://formspree.io/f/XXXX" novalidate>
```

`app.js` posts `FormData` to that URL and shows an inline status message. No
other change is needed.

---

## Design notes

- **Type** — Bricolage Grotesque (display), Instrument Serif italic (emphasis),
  Inter Tight (body), JetBrains Mono (labels and data). Google Fonts, four
  families, variable where available.
- **Colour** — warm bone paper `#EFE9DE`, ink `#111010`, one flame accent
  `#DE3F1F`. Every project carries its own accent plus a darkened
  `--acc-ink` variant used for text, so accent-coloured type stays readable.
- **Artwork** — all six project compositions are hand-built in CSS and inline
  SVG. There are no image files at all, which is why the whole site is CSS and
  JS and nothing else. Everything scales with container query units, so the
  same artwork holds at 380px and at 1600px.
- **Hero field** — the dot lattice in `heroField()` (`app.js`) covers the whole
  hero, reacts to the pointer, and gathers into a ring around the availability
  orb on the right. It reads the orb's real box, so moving the orb in CSS moves
  the ring with it.
- **Interface mockups** on the case studies share one skeleton
  (`.mv-*` in `case.css`) driven by per-project CSS variables, with a container
  query that scales small type up when a mockup is rendered narrow.
- **Scenes** (`.sc-*` in `case.css`) are the imagery inside those mockups —
  lantern-lit rooms, product renders on sand, building massing, artist
  portraits, feature glyphs. Each is layered gradients plus a few placed shapes,
  so a screen reads as a real page rather than a wireframe. Add one by dropping
  `<span class="sc sc-name"><i></i>…</span>` into a `.mv-tile`; the legibility
  scrim only appears on tiles that carry a scene.
- **Vertex** deliberately avoids the navy-and-mint SaaS default. It is set as a
  printed treasury statement — salmon stock, ruled rows, tabular figures,
  bracketed negatives, a red stamp — because that is the artefact the product
  replaces.

## Motion architecture

Two tiers, on purpose:

1. **IntersectionObserver + class toggles** for entrances. Works everywhere.
2. **Native CSS scroll-driven animations** (`animation-timeline: view()`) for
   the continuous, scrubbed effects. They run off the main thread, so parallax
   and scale stay locked to the scrollbar at no rAF cost. Where the browser
   does not support them the page simply sits still; nothing breaks.

**One scroll listener.** `hub` in `app.js` owns the only `scroll` listener and
the only rAF loop. Everything scroll-driven subscribes to it, so there is one
layout read per frame instead of three competing schedulers. The loop sleeps
once velocity settles. It publishes `--sv` on `:root`, which CSS uses to lean
the artwork and speed up marquees while the page is moving.

**Two traps worth knowing about**, both hit during the build:

- Never put the reveal `clip-path` on the element the observer is watching.
  `clip-path: inset(0 0 100%)` collapses the intersection rect to zero, so the
  observer never fires and the element stays hidden forever. The clip goes on
  the child: `[data-clip] > *`.
- `[data-rise]` sets a transform, so it will silently overwrite any positioning
  transform on the same element. The hero orb is centred with
  `translateY(-50%)` and therefore uses `data-fade`, not `data-rise`.

**Primitives** (add them as attributes, no JS required):

| Attribute | Effect |
|---|---|
| `data-rise` | blur + lift entrance |
| `data-fade` | opacity only, safe on positioned elements |
| `data-clip` | wipe reveal, applied to the child |
| `data-stagger` | children assemble in sequence via `--i` |
| `data-chars` | on a `.split` heading, animates per character |
| `data-weigh` | scrubs variable-font weight and tracking on scroll |
| `data-par="0.16"` | scroll parallax |

**Asset cache busting.** `/assets/*` is served `immutable` for a year, so every
asset URL carries `?v=<hash>` derived from the actual CSS and JS contents.
`node tools/build.mjs` recomputes it and stamps all nine pages. Run the build
after any CSS or JS change or returning visitors will keep the old files.

---

## Known gap: photography

There is still no photograph anywhere on the site. Every visual is hand-built
CSS and SVG. That is a deliberate flex for a developer portfolio, but two
places genuinely want a real image:

1. **The founder portrait** on `studio.html`. The frame is built and ready;
   drop in `assets/img/atharva.jpg` and uncomment the `<img>` already sitting
   in `.bio__portrait`. A real face is the highest-trust element on a
   founder-led studio site and a monogram is not a substitute.
2. **Real client work**, once the concept projects are replaced.

---

## Accessibility and robustness

Verified during the build, not assumed:

- **Contrast** — every text node on all nine pages meets WCAG AA (4.5:1 body,
  3:1 large). This is why accents have separate display and text values.
- **No JavaScript** — an inline `<head>` script sets `.js` before paint;
  reveal animations only arm when that class is present, so a visitor without
  JavaScript gets the complete page rather than a blank one. Accordions render
  open, the preloader never shows.
- **Reduced motion** — `prefers-reduced-motion` disables the grain, marquees,
  cursor, parallax, split-text, the preloader counter, the page transition,
  the scrubbed effects and the pinned horizontal section (which falls back to
  a plain vertical stack, as it also does below 860px).
- **Touch** — small typographic links get a real hit area under
  `(pointer: coarse)`; desktop layout is untouched.
- **No horizontal overflow** at 375, 768 and 1440px on every page.
- Keyboard: skip link, visible focus rings, Escape closes the menu, the
  accordion is real buttons with `aria-expanded`.

The custom cursor, magnetic buttons and the hero's reactive dot field are all
disabled on coarse pointers and under reduced-motion.
