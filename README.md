# ATVDEV — studio site (v3)

The website for **ATVDEV**, an independent design and engineering studio in Pune, India. We build websites, dashboards, portfolios, platforms and apps.

A GPU particle field builds the ATVDEV mark from about 32,000 pixel-squares. As you scroll, those particles reshape into the studio's five disciplines: a browser, a dashboard, a portfolio wall, a platform stack and a pair of phones. Every heading expands along Archivo's width axis as it appears. The site has light (default) and dark themes, works on phones, and respects `prefers-reduced-motion`.

**Stack:** Vite · vanilla JS · three.js · GSAP (ScrollTrigger) · Lenis. No framework; the build is plain static files.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
```

## Deploy

`npm run build` writes a static site to `dist/`, which you can upload anywhere:

- **Vercel:** detects Vite automatically. The build command is `npm run build` and the output directory is `dist`.
- **Netlify / Cloudflare Pages:** use the same build command and output directory.

Node 18 or newer is needed for the build.

## Page structure

| # | Section | What happens |
| --- | --- | --- |
| — | Loader | A count fills the mark; it exits through a diagonal pixel-dissolve wipe |
| 01 | Hero | "Every pixel, accounted for." on either side of the particle mark, with an instrument readout in the corners |
| 02 | Studio | A statement whose words fill in as you scroll |
| 03 | Capabilities | Pinned; the particles morph through five forms, one per discipline |
| 04 | Work | Project index with a preview that follows the cursor (inline thumbnails on touch screens) |
| 05 | Process | Pinned; a 10-week schedule fills in as a week marker sweeps across it |
| 06 | Standards | Performance budgets with counters, and a ticker of the stack |
| 07 | Contact | The mark re-forms on arrival, then disperses as you keep scrolling |
| — | Footer | Full-width wordmark, local Pune time |

## How it's put together

| File | What it does |
| --- | --- |
| `index.html` | All content and copy, section by section |
| `src/styles/main.css` | Theme tokens, layout, responsive rules |
| `src/scene/shapes.js` | The particle forms: the logo (rasterised from the mark) plus browser, dashboard, portfolio, platform, apps, lattice |
| `src/scene/field.js` | The WebGL particle field — morphs between forms, reacts to the cursor, switches inks per theme |
| `src/main.js` | Boot, smooth scroll, the theme switch, and **where each form sits on screen per section** (`resolveState`, `buildTrack`) |
| `src/ui/loader.js` | Count-up loader and the pixel-dissolve exit |
| `src/ui/cursor.js` | Pixel cursor, pixel trail, magnetic buttons |
| `src/ui/sections.js` | Every scroll animation (pinned capabilities and schedule, work preview, counters…) |
| `src/ui/work-art.js` | The SVG preview plates for the work index |
| `brand/` | Source logo files and brand tokens |
| `getlayers.json` | Design-system record from the GetLayers build (committed style, compositions used) |

## Themes

Light is the default. The switch in the header changes to dark and remembers the visitor's choice in `localStorage` under the key `atv-theme`. All colours are tokens at the top of `src/styles/main.css`, under `[data-theme="light"]` and `[data-theme="dark"]`. The particle colours follow in `Field.setTheme()` in `src/scene/field.js`.

## Replace before launch

- **Work rows** (`index.html`, `#work`): Ledgerline, Kaya Studio, Northfield, Orbit Ops and Tempo are placeholders, and so is their preview art in `src/ui/work-art.js`. Swap in real projects. To use a screenshot, return an `<img>` string from `workArt()`.
- **Social links** in the footer still point to `#`.
- **Studio facts** such as "Accepting new projects", "Within one working day" and "Typically two weeks out": keep only what's true.

## Dev-only helpers

These are stripped from production builds:

- `?skip` skips the loader.
- `?y=1234` opens the page at a set scroll position.

## History

- **v3** (current): particle-field studio site, Vite + three.js.
- **v2**: on the [`v2-art-direction`](../../tree/v2-art-direction) branch.
- **Earlier static build**: in the history of `main` before v3.
