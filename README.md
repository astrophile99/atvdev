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
                      marquee, reveals, footer, preloader
assets/css/home.css   Home + studio page sections
assets/css/case.css   Case study layout, interface mockups, specimens
assets/css/art.css    The six bespoke project artworks
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

## Accessibility and robustness

Verified during the build, not assumed:

- **Contrast** — every text node on all nine pages meets WCAG AA (4.5:1 body,
  3:1 large). This is why accents have separate display and text values.
- **No JavaScript** — an inline `<head>` script sets `.js` before paint;
  reveal animations only arm when that class is present, so a visitor without
  JavaScript gets the complete page rather than a blank one. Accordions render
  open, the preloader never shows.
- **Reduced motion** — `prefers-reduced-motion` disables the grain, marquees,
  cursor, parallax, split-text and the preloader counter.
- **Touch** — small typographic links get a real hit area under
  `(pointer: coarse)`; desktop layout is untouched.
- **No horizontal overflow** at 375, 768 and 1440px on every page.
- Keyboard: skip link, visible focus rings, Escape closes the menu, the
  accordion is real buttons with `aria-expanded`.

The custom cursor, magnetic buttons and the hero's reactive dot field are all
disabled on coarse pointers and under reduced-motion.
