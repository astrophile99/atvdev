# ATVDEV — studio site

Vite + vanilla JS, three.js, GSAP (ScrollTrigger), Lenis. No framework, deploys as static files.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/ (upload anywhere: Vercel, Netlify, Cloudflare Pages, S3)
```

## How it's put together

| File | What it does |
| --- | --- |
| `index.html` | All content and copy, section by section |
| `src/styles/main.css` | Tokens, layout, responsive rules |
| `src/scene/shapes.js` | The particle forms: the logo (rasterised from the mark) plus browser, dashboard, portfolio, platform, apps, lattice |
| `src/scene/field.js` | The WebGL particle field — morphs between forms, reacts to the cursor |
| `src/main.js` | Boot, smooth scroll, and **where each form sits on screen per section** (`resolveState`, `buildTrack`) |
| `src/ui/loader.js` | Count-up loader and the pixel-dissolve exit |
| `src/ui/cursor.js` | Pixel cursor, pixel trail, magnetic buttons |
| `src/ui/sections.js` | Every scroll animation (pinned capabilities, work preview, gantt, counters…) |
| `src/ui/work-art.js` | The SVG preview plates for the work index |

## Themes

Light is the default; the switch in the header flips to dark and remembers the choice (`localStorage` key `atv-theme`). All colours are tokens at the top of `src/styles/main.css` under `[data-theme="light"]` / `[data-theme="dark"]`. The particle inks follow in `Field.setTheme()` (`src/scene/field.js`).

## Replace before launch

- **Work rows** (`index.html`, `#work`): Ledgerline, Kaya Studio, Northfield, Orbit Ops and Tempo are placeholders, and so is their preview art in `src/ui/work-art.js`. Swap in real projects. To use a screenshot, return an `<img>` string from `workArt()`.
- **Social links** in the footer point to `#`.
- **Studio facts** such as "Accepting new projects", "Within one working day" and "Typically two weeks out" — keep only what's true.

## Dev-only helpers

These are stripped from production builds:

- `?skip` skips the loader.
- `?y=1234` opens the page parked at a scroll position.
