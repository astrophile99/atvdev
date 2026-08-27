/* ==========================================================================
   atvdev v2 — case study generator
   Renders work/<slug>.html for every project in tools/projects.mjs.
   Run:  node tools/build.mjs
   ========================================================================== */

import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { projects } from './projects.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* Assets are served with a one-year immutable cache header, so every URL
   carries a hash of the actual CSS and JS. Change a stylesheet and the URL
   changes with it; leave it alone and the cache keeps working. */
const ASSET_V = (() => {
  const h = createHash('sha1');
  for (const f of readdirSync(resolve(root, 'assets/css')).sort()) {
    h.update(readFileSync(resolve(root, 'assets/css', f)));
  }
  for (const f of readdirSync(resolve(root, 'assets/js')).sort()) {
    h.update(readFileSync(resolve(root, 'assets/js', f)));
  }
  return h.digest('hex').slice(0, 8);
})();

const SITE = 'https://atvdev.studio';
const MAIL = 'hello@atvdev.studio';
const strip = (s) => String(s).replace(/<[^>]+>/g, '');

/* ---------- shared chrome ---------- */

const head = (p) => `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${p.name} — ${p.sector} — atvdev</title>
<meta name="description" content="${strip(p.tagline)}">
<meta name="theme-color" content="#FBF4E6">
<link rel="canonical" href="${SITE}/work/${p.slug}">

<meta property="og:type" content="article">
<meta property="og:title" content="${p.name} — atvdev">
<meta property="og:description" content="${strip(p.tagline)}">
<meta property="og:url" content="${SITE}/work/${p.slug}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="../assets/css/tokens.css?v=${ASSET_V}">
<link rel="stylesheet" href="../assets/css/base.css?v=${ASSET_V}">
<link rel="stylesheet" href="../assets/css/art.css?v=${ASSET_V}">
<link rel="stylesheet" href="../assets/css/sections.css?v=${ASSET_V}">
<link rel="stylesheet" href="../assets/css/case.css?v=${ASSET_V}">
<link rel="stylesheet" href="../assets/css/motion.css?v=${ASSET_V}">

<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');
try{if(localStorage.getItem('atvdev-theme')==='night'){document.documentElement.setAttribute('data-theme','night');document.documentElement.style.setProperty('--night','1');}}catch(e){}</script>
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>
</head>

<body class="case" style="--acc:${p.accent};--acc-ink:${p.accentInk}">

<div class="pre" role="status" aria-label="Loading">
  <div class="pre__in">
    <span class="pre__sun" aria-hidden="true"></span>
    <span class="pre__mark">${p.name}</span>
  </div>
</div>

<div class="wipe" aria-hidden="true"><span class="wipe__mark">atvdev<span class="dot">.</span></span></div>
<div class="grain" aria-hidden="true"></div>
<div class="prog" aria-hidden="true"></div>
<a class="skip" href="#main">Skip to content</a>

<header class="hdr">
  <div class="hdr__in">
    <a class="mark" href="../index.html" aria-label="atvdev home">atvdev<span class="dot">.</span></a>
    <nav class="nav" aria-label="Primary">
      <a href="../index.html#work" aria-current="page">Work</a>
      <a href="../index.html#capabilities">Capabilities</a>
      <a href="../studio.html">Studio</a>
      <a href="../index.html#contact">Contact</a>
    </nav>
    <div class="hdr__right">
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="menu" id="menu" aria-hidden="true">
  <ul class="menu__list">
    <li class="menu__item"><a class="menu__link" href="../index.html"><span class="num">01</span> Index</a></li>
    <li class="menu__item"><a class="menu__link" href="../index.html#work"><span class="num">02</span> Work</a></li>
    <li class="menu__item"><a class="menu__link" href="../index.html#capabilities"><span class="num">03</span> Capabilities</a></li>
    <li class="menu__item"><a class="menu__link" href="../studio.html"><span class="num">04</span> Studio</a></li>
    <li class="menu__item"><a class="menu__link" href="../index.html#contact"><span class="num">05</span> Contact</a></li>
  </ul>
  <div class="menu__foot">
    <div style="display:flex;flex-direction:column;gap:.4rem">
      <span class="tag">Say hello</span>
      <a class="ul-link" href="mailto:${MAIL}" style="font-size:1.1rem">${MAIL}</a>
    </div>
    <div style="display:flex;gap:1.5rem" class="tag">
      <a class="ul-link" href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
      <a class="ul-link" href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
      <a class="ul-link" href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</div>
`;

const footer = () => `
<footer class="ftr">
  <div class="shell">
    <div class="ftr__top" data-stagger>
      <div class="ftr__col">
        <h4>Studio</h4>
        <p>An independent design and build studio working from India with clients worldwide.</p>
      </div>
      <div class="ftr__col">
        <h4>Index</h4>
        <a class="ul-link" href="../index.html">Home</a>
        <a class="ul-link" href="../index.html#work">Work</a>
        <a class="ul-link" href="../studio.html">Studio</a>
        <a class="ul-link" href="../index.html#contact">Contact</a>
      </div>
      <div class="ftr__col">
        <h4>Selected work</h4>
        ${projects.map((x) => `<a class="ul-link" href="${x.slug}.html">${x.name}</a>`).join('\n        ')}
      </div>
      <div class="ftr__col">
        <h4>Contact</h4>
        <a class="ul-link" href="mailto:${MAIL}">${MAIL}</a>
        <a class="ul-link" href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
        <a class="ul-link" href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
        <a class="ul-link" href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <span class="ftr__word" aria-hidden="true">atvdev<span class="dot">.</span></span>
    <div class="ftr__base">
      <span>© <span data-year>2026</span> atvdev — all rights reserved</span>
      <span>Designed &amp; built in-house · <span data-clock>IST</span></span>
      <a class="to-top" href="#main">
        Back to top
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 11V1M2 5l4-4 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/></svg>
      </a>
    </div>
  </div>
</footer>

<script src="../assets/js/app.js?v=${ASSET_V}" defer></script>
</body>
</html>
`;

/* ---------- page ---------- */

const page = (p, next) => `${head(p)}
<main id="main">

  <section class="case-hero" data-hero>
    <div class="shell">
      <div class="case-hero__crumb">
        <a class="ul-link" href="../index.html#work">Work</a>
        <span>/</span><span>${p.index}</span><span>/</span><span>${p.name}</span>
        <span class="sw" aria-hidden="true"></span>
      </div>

      <div class="case-hero__row">
        <h1 class="case-title split" data-chars><span class="ln">${p.name}</span></h1>
        <span class="tag" data-rise>${p.sector} — ${p.year}</span>
      </div>

      <p class="case-hero__lede" data-rise style="--d:.1s">${p.tagline}</p>
      <p class="case-note" data-rise style="--d:.14s">Self-initiated concept — brand and brief invented to show scope</p>

      <dl class="case-meta" data-stagger>
        ${p.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n        ')}
      </dl>
    </div>
  </section>

  <div class="plate" data-clip>
    <span class="plate__frame">${p.art(p.slug + '-plate')}</span>
  </div>
  <div class="shell">
    <div class="plate__cap">
      <span>Fig. 01 — Art direction, ${p.name}</span>
      <span>${p.chips.join(' · ')}</span>
    </div>
  </div>

  <section class="band">
    <div class="shell">
      <div class="case-body">
        <div class="case-body__aside">
          <span class="tag" data-rise>The brief</span>
        </div>
        <div class="case-body__main">
          ${p.brief.map((t, i) => `<p${i === 0 ? ' class="first"' : ''} data-rise style="--d:.${i}s">${t}</p>`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>

  <section class="band--tight">
    <div class="shell">
      <blockquote class="pull" data-rise>${p.pull}</blockquote>
    </div>
  </section>

  <section class="band--tight">
    <div class="shell">
      <div class="case-body">
        <div class="case-body__aside">
          <span class="tag" data-rise>The approach</span>
        </div>
        <div class="case-body__main">
          ${p.approach.map((t, i) => `<p data-rise style="--d:.${i}s">${t}</p>`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="shell">
      <div class="sec-head">
        <span class="tag" data-rise>Palette</span>
        <p class="body-lg" data-rise style="max-width:34ch">The colour system underneath — four tones, no exceptions.</p>
      </div>
      <div class="swatches" data-stagger style="max-width:32rem">
        ${p.palette.map(([hex, name, role]) => `<div class="sw-row"><i style="background:${hex}"></i><span><b>${name}</b><em>${hex} — ${role}</em></span></div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="band--tight">
    <div class="shell">
      <div class="facts" data-stagger>
        ${p.facts.map(([n, h, t]) => `<div><span class="num">${n}</span><h4>${h}</h4><p>${t}</p></div>`).join('\n        ')}
      </div>
      <div class="case-body" style="margin-top:clamp(2.2rem,5vw,3.5rem)">
        <div class="case-body__aside"><span class="tag" data-rise>Build note</span></div>
        <div class="case-body__main"><p data-rise>${p.outcome}</p></div>
      </div>
    </div>
  </section>

  <div class="shell">
    <a class="next-pj" href="${next.slug}.html" data-cursor="NEXT" style="--acc:${next.accent};--acc-ink:${next.accentInk}">
      <span class="next-pj__lbl">Next project — ${next.index}</span>
      <span class="next-pj__row">
        <span class="next-pj__name">${next.name}</span>
        <span class="next-pj__thumb">${next.art(next.slug + '-next')}</span>
      </span>
    </a>
  </div>

</main>
${footer()}`;

/* ---------- write ---------- */

mkdirSync(resolve(root, 'work'), { recursive: true });

/* The three hand-written pages get the same stamp so a deploy can never
   serve them a year-old stylesheet under the immutable cache header. */
for (const f of ['index.html', 'studio.html', '404.html']) {
  const file = resolve(root, f);
  let html = readFileSync(file, 'utf8');
  const before = html;
  html = html.replace(
    /(href|src)="((?:\.\.\/|\/)?assets\/(?:css|js)\/[a-z.]+)(?:\?v=[a-f0-9]+)?"/g,
    (_m, attr, path) => `${attr}="${path}?v=${ASSET_V}"`
  );
  if (html !== before) {
    writeFileSync(file, html, 'utf8');
    console.log('stamped ' + f);
  }
}

projects.forEach((p, i) => {
  const next = projects[(i + 1) % projects.length];
  const out = resolve(root, 'work', `${p.slug}.html`);
  writeFileSync(out, page(p, next), 'utf8');
  console.log('wrote work/' + p.slug + '.html');
});

console.log('\n' + projects.length + ' case studies built. asset version ' + ASSET_V);
