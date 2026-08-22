/* ==========================================================================
   atvdev — project data
   Single source of truth for the six case studies.
   Edit here, then run:  node tools/build.mjs
   ========================================================================== */

/* ---------- artwork -------------------------------------------------------
   `art(id)` returns the composition markup. `id` keeps SVG defs unique when
   the same artwork appears twice on one page (plate + next-project thumb).
   -------------------------------------------------------------------------- */

const artKobu = () => `
<div class="art art-kobu">
  <div class="k-glow"></div>
  <div class="k-glow2"></div>
  <div class="k-enso"></div>
  <div class="k-enso2"></div>
  <div class="k-title a-disp">KŌBU<small>Izakaya · Est. 2019</small></div>
  <div class="k-vert"><span>Charcoal · Sake · Smoke</span><span>Six rooms</span></div>
  <div class="k-card">
    <div class="k-row"><span>Binchō-tan skewers</span><i>480</i></div>
    <div class="k-line"></div>
    <div class="k-row"><span>Yuzu highball</span><i>390</i></div>
    <div class="k-line"></div>
    <div class="k-row"><span>Table for two — 20:30</span><i>Book</i></div>
  </div>
  <div class="k-top a-mono"><span>Hospitality</span><span>Bengaluru</span></div>
  <div class="k-bot a-mono">Reserve →</div>
  <div class="art__noise"></div>
  <div class="art__vig"></div>
</div>`;

const artVertex = () => `
<div class="art art-vertex">
  <div class="v-lines"></div>
  <div class="v-wash"></div>
  <div class="v-perf"></div>
  <div class="v-head">
    <span class="v-word">VERTEX</span>
    <span class="v-kicker">Treasury statement &mdash; Nov 2025</span>
  </div>
  <div class="v-ref a-mono">Ref. VT-4471<br>Multi-entity</div>
  <div class="v-ledger">
    <div class="v-lrow"><span>IN&mdash;01 Mumbai</span><b>1,84,20,000</b></div>
    <div class="v-lrow"><span>SG&mdash;02 Singapore</span><b>1,12,40,000</b></div>
    <div class="v-lrow"><span>UK&mdash;03 London</span><b>96,80,000</b></div>
    <div class="v-lrow neg"><span>Payables</span><b>(92,40,000)</b></div>
    <div class="v-lrow tot"><span>Net position</span><b>4,82,10,000</b></div>
  </div>
  <div class="v-plot-cap a-mono">Cash &middot; 30 days</div>
  <div class="v-plot">
    <svg viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
      <polyline points="0,82 20,74 40,79 60,58 80,64 100,44 120,50 140,28 160,34 180,18 200,10"
                stroke="#1B3A63" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                vector-effect="non-scaling-stroke"/>
      <polyline points="0,90 20,88 40,89 60,84 80,86 100,80 120,82 140,76 160,78 180,72 200,70"
                stroke="#B3301C" stroke-width="1.2" stroke-dasharray="4 3" stroke-linecap="round"
                vector-effect="non-scaling-stroke" opacity=".7"/>
    </svg>
  </div>
  <div class="v-stamp"><span>Cleared<br>14 Nov</span></div>
  <div class="v-foot a-mono">Four currencies &middot; reconciled daily &middot; SOC 2</div>
  <div class="art__noise"></div>
</div>`;

const artSolene = (id) => `
<div class="art art-solene">
  <div class="s-wash"></div>
  <div class="s-circle"></div>
  <div class="s-ring" aria-hidden="true">
    <svg viewBox="0 0 100 100">
      <defs><path id="solRing${id}" d="M50,50 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0"></path></defs>
      <text><textPath href="#solRing${id}" startOffset="0">Barrier serum · 30ml · fragrance free · made in small batches · </textPath></text>
    </svg>
  </div>
  <div class="s-bottle">
    <span class="s-cap"></span>
    <span class="s-band"><b>Solène</b><i>No. 01 — Barrier</i></span>
  </div>
  <div class="s-lock">
    <span class="s-name">Solène</span>
    <span class="s-sub">Skin, without the theatre</span>
    <span class="s-buy">Add to bag <i>— ₹2,400</i></span>
  </div>
  <div class="s-swatch">
    <b style="background:#E8DCC6"></b><b style="background:#C47A3E"></b><b style="background:#2C3729"></b>
  </div>
  <div class="s-top a-mono">Beauty commerce</div>
  <div class="art__noise"></div>
</div>`;

const artMeridian = () => `
<div class="art art-meridian">
  <div class="m-grid"></div>
  <div class="m-num">04</div>
  <div class="m-name">Meridian<small>Architects — since 1998</small></div>
  <div class="m-plan" aria-hidden="true">
    <svg viewBox="0 0 200 150" fill="none" stroke="#1A1A18" stroke-width="1">
      <rect x="8" y="8" width="184" height="134" stroke-opacity=".85"/>
      <path d="M8 56h84M92 8v134M92 96h100M148 96v46M120 56h72" stroke-opacity=".55"/>
      <path d="M20 20h56v24H20z" stroke-opacity=".35"/>
      <path d="M104 20h74v26h-74z" stroke-opacity=".35"/>
      <path d="M104 108h32v24h-32z" stroke-opacity=".35"/>
      <circle cx="46" cy="112" r="18" stroke-opacity=".4"/>
      <path d="M8 8 40 40M192 142 160 110" stroke-opacity=".22"/>
    </svg>
  </div>
  <div class="m-elev">
    <i style="--h:34%"></i><i style="--h:62%"></i><i style="--h:48%"></i>
    <i style="--h:92%"></i><i style="--h:56%"></i><i style="--h:72%"></i>
  </div>
  <div class="m-meas"><span>18 400 mm</span></div>
  <div class="m-cross m-c1"></div>
  <div class="m-cross m-c2"></div>
  <div class="m-tag a-mono">Plan · Section<br>Sheet 04 / 12</div>
  <div class="art__noise"></div>
</div>`;

const artPulse = () => `
<div class="art art-pulse">
  <div class="p-glow"></div>
  <div class="p-glow2"></div>
  <div class="p-kicker a-mono">Health &amp; fitness — iOS / Android</div>
  <div class="p-word">Every<b>rep</b>counts</div>
  <div class="p-phone">
    <span class="p-notch"></span>
    <div class="p-top"><span>Today</span><span>Week 12</span></div>
    <div class="p-ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(242,242,240,.12)" stroke-width="7"/>
        <circle cx="50" cy="50" r="41" fill="none" stroke="#FF5A47" stroke-width="7"
                stroke-linecap="round" stroke-dasharray="257.6" stroke-dashoffset="62"/>
      </svg>
      <div><b>76%</b><i>Day goal</i></div>
    </div>
    <div class="p-stats">
      <div><b>412</b><i>kcal</i></div>
      <div><b>38</b><i>min</i></div>
      <div><b>9</b><i>streak</i></div>
    </div>
    <div class="p-wave">
      <svg viewBox="0 0 120 30" fill="none" preserveAspectRatio="none">
        <polyline points="0,22 8,22 12,8 16,26 20,15 26,15 30,22 38,22 42,4 46,28 50,16 58,16 62,22 70,22 74,9 78,25 82,15 92,15 96,21 108,21 112,11 120,18"
                  stroke="#FF5A47" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="p-cta">Start session</div>
  </div>
  <div class="p-foot a-mono">Habit engine · Apple Health · Wear OS</div>
  <div class="art__noise"></div>
</div>`;

const casBand = `<div>
  <span>Three stages</span><span>·</span><span>48 artists</span><span>·</span>
  <span>Two nights</span><span>·</span><span>Tickets live</span><span>·</span>
  <span>Three stages</span><span>·</span><span>48 artists</span><span>·</span>
  <span>Two nights</span><span>·</span><span>Tickets live</span><span>·</span>
</div>`;

const artCassette = () => `
<div class="art art-cassette">
  <div class="c-half"></div>
  <div class="c-blob"></div>
  <div class="c-tape"></div>
  <div class="c-reel c-r1"></div>
  <div class="c-reel c-r2"></div>
  <div class="c-stack a-disp"><b>CASSETTE</b><b>CASSETTE</b><b>CASSETTE</b></div>
  <div class="c-band">${casBand}${casBand.replace('<div>', '<div aria-hidden="true">')}</div>
  <div class="c-top a-mono">Music &amp; culture</div>
  <div class="c-bot a-mono">Vol. 07</div>
  <div class="c-date a-mono">Nov 14–15 · Goa</div>
  <div class="art__noise"></div>
</div>`;

/* ---------- projects ---------------------------------------------------- */

export const projects = [
  {
    slug: 'kobu',
    name: 'Kōbu',
    index: '01',
    sector: 'Hospitality',
    year: '2025',
    accent: '#C45A38',
    accentOn: '#FFF3EC',
    accentInk: '#A8482A',
    art: artKobu,
    tagline: 'Six izakaya rooms under one roof, and a website built to smell like charcoal.',
    cardDesc: 'Six izakaya rooms under one roof. A site built to smell like charcoal — dark, slow, tactile — with a reservation flow that takes four taps.',
    meta: [
      ['Client', 'Kōbu Hospitality Group'],
      ['Sector', 'Restaurants &amp; bars'],
      ['Scope', 'Brand site, reservations, CMS'],
      ['Stack', 'Astro, Sanity, Vercel']
    ],
    chips: ['Hospitality', 'Brand site', 'Reservations'],
    brief: [
      'Kōbu runs six izakaya rooms across Bengaluru, each with its own chef, its own menu and its own crowd. What they shared was a booking page that looked like a spreadsheet and a brand that evaporated the moment you left the room.',
      'The ask was blunt: make the website feel like walking in at nine on a Friday. Low light, charcoal smoke, someone laughing two tables over. Then let people book a table without thinking about it.'
    ],
    approach: [
      'We built the whole site on a near-black stock and let one warm terracotta do all the talking. Type is set large and slow. Photography sits full-bleed with a soft vignette so the eye lands where the room is warmest, and nothing on the page competes with it.',
      'Each of the six rooms gets its own chapter with its own accent temperature — the same system, tuned six ways. The reservation flow lives in a persistent rail rather than a separate page, so you can browse the menu, change your mind about the room, and still be four taps from a confirmed table.'
    ],
    pull: 'A restaurant site is not a brochure. It is the <em class="em-serif">doorway</em> — and the door should feel heavy.',
    facts: [
      ['01', 'Six rooms, one system', 'A single design system with six accent temperatures, so each room reads as itself without a rebuild.'],
      ['02', 'Four taps to a table', 'Reservations run in a persistent rail — pick room, size, date, time. No page reloads, no dead ends.'],
      ['03', 'Editors in the kitchen', 'Menus change weekly. Managers update prices and sold-out items from a phone in under a minute.']
    ],
    palette: [
      ['#16110E', 'Charcoal', 'Base surface'],
      ['#C45A38', 'Ember', 'Primary accent'],
      ['#E9DCC6', 'Rice paper', 'Type on dark'],
      ['#5E6A4C', 'Shiso', 'Secondary accent']
    ],
    faces: [
      { name: 'Bricolage Grotesque', role: 'Display', glyph: 'Six rooms, one fire', sample: 'Set at 96pt optical size with tight tracking. Used only for room names and section openers — never below 28px.' },
      { name: 'JetBrains Mono', role: 'Detail &amp; menu', glyph: '20:30 · Table for two', sample: 'Prices, times and room numbers. Tabular figures keep every menu column aligned without a table element in sight.' }
    ],
    mocks: [
      {
        cap: 'Room index — desktop',
        url: 'kobu.co / rooms',
        vars: '--m-bg:#16110E;--m-fg:#E9DCC6;--m-acc:#C45A38;',
        body: `<div class="mv">
          <div class="mv-nav"><b>KŌBU</b><ul><li>Rooms</li><li>Menu</li><li>Story</li></ul><span class="cta">Reserve</span></div>
          <div class="mv-h">Six rooms,<br><em>one</em> fire.</div>
          <div class="mv-sub">Charcoal, sake and a room that stays loud until one. Pick where you are eating tonight.</div>
          <div class="mv-cols">
            <div class="mv-tile"><span class="sc sc-lantern"><i></i><i></i><i></i><i></i></span><span>Room 01 · Indiranagar</span><b>The Long Counter</b></div>
            <div class="mv-tile"><span class="sc sc-embers"><i></i><i></i><i></i><i></i><i></i></span><span>Room 02 · Koramangala</span><b>Ebisu</b></div>
            <div class="mv-tile"><span class="sc sc-counter"><i></i><i></i><i></i><i></i><i></i><i></i></span><span>Room 03 · Jayanagar</span><b>Smoke &amp; Salt</b></div>
          </div>
        </div>`
      },
      {
        cap: 'Reservation rail',
        url: 'Booking',
        vars: '--m-bg:#1D1613;--m-fg:#E9DCC6;--m-acc:#C45A38;',
        app: true,
        body: `<div class="ph">
          <div class="ph-top"><span>Reserve</span><span>Step 3/4</span></div>
          <div class="ph-h">Table<br>for two</div>
          <div class="ph-card">
            <div class="ph-bars"><i style="--h:30%"></i><i style="--h:55%"></i><i class="on" style="--h:100%"></i><i style="--h:70%"></i><i style="--h:45%"></i></div>
            <div class="mv-row" style="border:0;padding:0;font-size:3.4cqw"><span>Fri 14 Nov</span><em>20:30</em></div>
          </div>
          <div class="ph-cta">Confirm booking</div>
        </div>`
      }
    ],
    outcome: 'The site ships as a static Astro build with the reservation rail hydrated on demand — the menu pages weigh less than a single stock photograph, which matters when half the traffic arrives on 4G outside the restaurant.'
  },

  {
    slug: 'vertex',
    name: 'Vertex',
    index: '02',
    sector: 'Fintech',
    year: '2025',
    accent: '#1B3A63',
    accentOn: '#FFFFFF',
    accentInk: '#1B3A63',
    art: artVertex,
    tagline: 'A treasury console for people who read numbers for a living — and the site that earns the demo call.',
    cardDesc: 'A treasury console for people who read numbers for a living. Dense, fast, and legible at 6am — plus the marketing site that has to earn the demo call.',
    meta: [
      ['Client', 'Vertex Treasury'],
      ['Sector', 'B2B fintech'],
      ['Scope', 'Design system, product UI, marketing site'],
      ['Stack', 'Next.js, TypeScript, Radix, Vercel']
    ],
    chips: ['Fintech', 'Product marketing', 'Design system'],
    brief: [
      'Vertex gives finance teams one view of cash across a dozen entities and four currencies. The product worked. The interface had been assembled a feature at a time and read like a settings page that had grown teeth.',
      'Two problems, one project: give the product a design system that can absorb the next three years of features, and build a marketing site that convinces a CFO to book thirty minutes.'
    ],
    approach: [
      'We threw away the dark-navy-and-neon dashboard in week one. Every competitor looked identical, and none of them looked like something a finance director would trust with forty crore. The reference we landed on is the thing the software actually replaces — the printed treasury statement. Salmon stock, ruled rows, tabular figures, a correction column in red, a stamp in the corner.',
      'Density is a feature here. Finance people want more numbers per screen, not fewer, so the scale is compact and every figure is tabular. Colour is rationed to two: ultramarine for structure and positive movement, correction red for anything negative. Nothing else is permitted to be coloured, which is why a single red bracket reads across a room.',
      'The design system ships as tokens first: eleven spacing steps, four surface elevations, a type ramp with tabular variants, and semantic colour that flips cleanly to a light theme. Components are Radix primitives wearing Vertex clothes, so keyboard behaviour and focus management came for free and stayed correct.',
      'The marketing site borrows the product surface directly. The hero is a real, interactive fragment of the console rather than a screenshot — the fastest way to prove the thing is quick is to let someone touch it.'
    ],
    pull: 'Every treasury product on earth is navy with a mint chart. We made this one look like <em class="em-serif">paper</em> — and finance directors recognised it immediately.',
    facts: [
      ['01', 'Statement, not dashboard', 'Salmon stock, ruled rows and bracketed negatives — the visual language finance already reads fluently.'],
      ['02', 'Tabular by default', 'Every figure in the product uses tabular numerals, so columns stop shivering as data refreshes.'],
      ['03', 'Two colours, rationed', 'Ultramarine for structure and positive, correction red for negative. Nothing else is allowed to carry colour.']
    ],
    palette: [
      ['#F4DCC7', 'Statement', 'Page stock'],
      ['#17120E', 'Ledger ink', 'Figures &amp; rules'],
      ['#1B3A63', 'Ultramarine', 'Structure &amp; positive'],
      ['#B3301C', 'Correction red', 'Negative &amp; alerts']
    ],
    faces: [
      { name: 'Inter Tight', role: 'Interface', glyph: '₹4,82,00,000', sample: 'Compact metrics, tabular figures locked on. Chosen because it stays legible at 12px on a dense table, which is where this product lives.' },
      { name: 'JetBrains Mono', role: 'Ledger &amp; keys', glyph: '(92,40,000)', sample: 'Entity codes, balances and keyboard shortcuts. Negatives are set in brackets rather than with a minus sign, exactly as they appear on the statement this product replaces.' }
    ],
    mocks: [
      {
        cap: 'Treasury console \u2014 positions',
        url: 'app.vertex.finance / positions',
        vars: '--m-bg:#F4DCC7;--m-fg:#17120E;--m-acc:#1B3A63;--m-soft:rgba(23,18,14,.07);--m-line:rgba(23,18,14,.22);',
        body: `<div class="mv mv--dash">
          <div class="mv-side">
            <b>Vertex</b>
            <u class="on">Positions</u><u>Cash</u><u>FX</u><u>Payables</u><u>Reports</u>
          </div>
          <div class="mv-main">
            <div class="mv-kpis">
              <div class="mv-kpi"><span>Net position</span><b>4,82,10,000</b><i>+12.4%</i></div>
              <div class="mv-kpi"><span>Runway</span><b>19 mo</b><i>+2 mo</i></div>
              <div class="mv-kpi"><span>Entities</span><b>12</b><i>4 currencies</i></div>
            </div>
            <div class="mv-ledger">
              <div class="mv-lrow"><span>IN\u201401 Mumbai</span><em>INR</em><b>1,84,20,000</b></div>
              <div class="mv-lrow"><span>SG\u201402 Singapore</span><em>SGD</em><b>1,12,40,000</b></div>
              <div class="mv-lrow"><span>UK\u201403 London</span><em>GBP</em><b>96,80,000</b></div>
              <div class="mv-lrow neg"><span>Payables \u2014 Nov</span><em>MIX</em><b>(92,40,000)</b></div>
              <div class="mv-lrow tot"><span>Net position</span><em></em><b>4,82,10,000</b></div>
            </div>
          </div>
        </div>`
      },
      {
        cap: 'Marketing \u2014 pricing',
        url: 'vertex.finance / pricing',
        vars: '--m-bg:#EFD5BE;--m-fg:#17120E;--m-acc:#1B3A63;--m-soft:rgba(23,18,14,.07);--m-line:rgba(23,18,14,.22);',
        body: `<div class="mv">
          <div class="mv-nav"><b>Vertex</b><ul><li>Product</li><li>Pricing</li></ul><span class="cta">Book demo</span></div>
          <div class="mv-h">Priced per<br><em>entity.</em></div>
          <div class="mv-row"><span>Starter \u2014 up to 3 entities</span><em class="k">24,000/mo</em></div>
          <div class="mv-row"><span>Growth \u2014 up to 12 entities</span><em class="k">68,000/mo</em></div>
          <div class="mv-row"><span>Enterprise \u2014 unlimited</span><em>Talk to us</em></div>
        </div>`
      }
    ],
    outcome: 'Shipped as a shared token package consumed by both the Next.js marketing site and the product app, so a colour or spacing change lands in both surfaces from one pull request.'
  },

  {
    slug: 'solene',
    name: 'Solène',
    index: '03',
    sector: 'Beauty',
    year: '2024',
    accent: '#2C3729',
    accentOn: '#EFE6D8',
    accentInk: '#2C3729',
    art: artSolene,
    tagline: 'A skincare storefront that sells restraint — and checks out in under thirty seconds.',
    cardDesc: 'A skincare storefront that sells restraint. Big quiet type, honest ingredient tables, and a checkout that gets out of the way in under thirty seconds.',
    meta: [
      ['Client', 'Solène Skin'],
      ['Sector', 'Beauty &amp; e-commerce'],
      ['Scope', 'Identity, storefront, conversion'],
      ['Stack', 'Shopify Hydrogen, Stripe']
    ],
    chips: ['Beauty', 'Shopify', 'Art direction'],
    brief: [
      'Four products, no filler, no claims the lab could not back. Solène wanted to launch into a category that shouts, by not shouting — which is easy to say in a brand deck and very hard to hold on a product page where every competitor is running a countdown timer.',
      'The commercial requirement was equally plain: a first-time visitor should be able to understand what a product does, decide, and pay, without ever meeting a pop-up.'
    ],
    approach: [
      'The art direction is apothecary rather than clinical — sand paper stock, a deep herbal green, one amber accent for anything transactional. Product photography sits inside generous circular crops so bottles read as objects, not as assets on a white void.',
      'Every product page leads with the ingredient table. Full INCI list, percentages where they matter, and a plain-language line under each active explaining what it actually does. It tests better than any amount of marketing copy, because the audience arrives already sceptical.',
      'Checkout is where restraint pays. One page, express wallets at the top, no account required, no upsell interstitial. The bag is a slide-over that never loses your place in the catalogue.'
    ],
    pull: 'The category shouts. We found the volume knob and turned it <em class="em-serif">down</em> — which turned out to be the loudest thing on the shelf.',
    facts: [
      ['01', 'Ingredients first', 'Full INCI, percentages on actives, plain-language explanations. The most-scrolled block on every product page.'],
      ['02', 'No interruptions', 'Zero pop-ups, zero countdowns. Express wallets sit at the top of a single-page checkout.'],
      ['03', 'Photography as object', 'Circular crops and warm shadow work make four SKUs feel like a collection rather than a catalogue.']
    ],
    palette: [
      ['#EFE6D8', 'Sand', 'Page stock'],
      ['#2C3729', 'Apothecary', 'Type &amp; buttons'],
      ['#C47A3E', 'Amber', 'Price &amp; transaction'],
      ['#FBF7F0', 'Chalk', 'Cards &amp; labels']
    ],
    faces: [
      { name: 'Instrument Serif', role: 'Product names', glyph: 'Solène — No. 01', sample: 'Italic, set large, used only for product names and the single line of poetry each page is allowed. Restraint is a type decision as much as a colour one.' },
      { name: 'Inter Tight', role: 'Body &amp; ingredients', glyph: 'Niacinamide 4%', sample: 'The ingredient table is the hardest-working type on the site: dense, scannable, and readable at 14px on a phone in bad light.' }
    ],
    mocks: [
      {
        cap: 'Collection — desktop',
        url: 'solene.co / shop',
        vars: '--m-bg:#EFE6D8;--m-fg:#2C3729;--m-acc:#C47A3E;--m-soft:rgba(44,55,41,.09);--m-line:rgba(44,55,41,.16);',
        body: `<div class="mv">
          <div class="mv-nav"><b>Solène</b><ul><li>Shop</li><li>Ritual</li><li>Journal</li></ul><span class="cta">Bag (2)</span></div>
          <div class="mv-h">Skin, without<br>the <em>theatre.</em></div>
          <div class="mv-cols">
            <div class="mv-tile mv-tile--tall mv-tile--light"><span class="sc sc-prod"><i></i><i></i><i></i><i></i></span><span>No. 01 · Barrier</span><b>Serum</b><span class="price">₹2,400</span></div>
            <div class="mv-tile mv-tile--tall mv-tile--light"><span class="sc sc-prod sc-prod--tube"><i></i><i></i><i></i><i></i></span><span>No. 02 · Morning</span><b>Fluid SPF 40</b><span class="price">₹2,100</span></div>
            <div class="mv-tile mv-tile--tall mv-tile--light"><span class="sc sc-prod sc-prod--jar"><i></i><i></i><i></i><i></i></span><span>No. 03 · Night</span><b>Repair Balm</b><span class="price">₹2,800</span></div>
          </div>
        </div>`
      },
      {
        cap: 'Product — ingredients',
        url: 'Product page',
        vars: '--m-bg:#FBF7F0;--m-fg:#2C3729;--m-acc:#C47A3E;--m-soft:rgba(44,55,41,.08);--m-line:rgba(44,55,41,.15);',
        app: true,
        body: `<div class="ph">
          <div class="ph-top"><span>No. 01</span><span>30ml</span></div>
          <div class="ph-h">Barrier<br>Serum</div>
          <div class="ph-card">
            <div class="mv-row" style="border:0;padding:0 0 2cqw;font-size:3.2cqw"><span>Niacinamide</span><em>4%</em></div>
            <div class="mv-row" style="padding:2cqw 0;font-size:3.2cqw"><span>Panthenol</span><em>2%</em></div>
            <div class="mv-row" style="padding:2cqw 0 0;font-size:3.2cqw"><span>Ceramide NP</span><em>0.4%</em></div>
          </div>
          <div class="ph-cta">Add to bag — ₹2,400</div>
        </div>`
      }
    ],
    outcome: 'Built on Hydrogen so the catalogue renders on the edge and the bag stays client-side. The whole storefront ships without a single third-party pop-up script, which is both a brand decision and a performance one.'
  },

  {
    slug: 'meridian',
    name: 'Meridian',
    index: '04',
    sector: 'Architecture',
    year: '2024',
    accent: '#575550',
    accentOn: '#E5E3DD',
    accentInk: '#575550',
    art: artMeridian,
    tagline: 'Twenty-six years of a practice, indexed like a library and typeset like a monograph.',
    cardDesc: 'A practice archive where the drawings do the talking. Twenty-six years of projects, indexed like a library and typeset like a monograph.',
    meta: [
      ['Client', 'Meridian Architects'],
      ['Sector', 'Architecture'],
      ['Scope', 'Editorial design, build, CMS'],
      ['Stack', 'Next.js, Payload, Cloudflare']
    ],
    chips: ['Architecture', 'Editorial', 'Headless CMS'],
    brief: [
      'Meridian had two hundred and forty projects, four thousand drawings, and a website that showed twelve of them in a carousel. The archive was the practice — and it was invisible.',
      'The brief was to build something closer to a reference library than a portfolio: browsable by year, typology, material and scale, with the drawings treated as primary documents rather than decoration.'
    ],
    approach: [
      'Everything is drawn on a visible grid. Hairline rules, drafting crosses at the corners, measurement bars under the plates — the furniture of a technical drawing, used as the interface furniture. It signals what the practice does before you read a word.',
      'Colour is almost entirely absent. Concrete grey, ink, and a warm neutral for hover states. When every project photograph is doing something different, the frame around them has to shut up completely.',
      'The index is the centrepiece: a filterable table of all two hundred and forty projects that stays fast because it renders on the server and filters in the URL. It is shareable, bookmarkable, and works with the back button — which is not a small thing for an archive people cite.'
    ],
    pull: 'For a practice this old, the archive <em class="em-serif">is</em> the argument. Our job was to get out of its way and hold the ruler straight.',
    facts: [
      ['01', 'A real index', 'All 240 projects, filterable by year, typology, material and scale — every filter state lives in the URL.'],
      ['02', 'Drawings as documents', 'Deep-zoom plates with pan and scale bars, so a section drawing survives being looked at properly.'],
      ['03', 'Structured for decades', 'A Payload content model built around drawings, not pages, so the archive keeps growing without a redesign.']
    ],
    palette: [
      ['#E5E3DD', 'Concrete', 'Page stock'],
      ['#1A1A18', 'Graphite', 'Type &amp; rules'],
      ['#575550', 'Slate', 'Secondary &amp; hover'],
      ['#B6B2A7', 'Dust', 'Disabled &amp; grid']
    ],
    faces: [
      { name: 'Bricolage Grotesque', role: 'Project titles', glyph: 'House at Panchgani', sample: 'Wide optical size, minimal tracking. Project titles are the only place the site raises its voice, and it never goes above three lines.' },
      { name: 'JetBrains Mono', role: 'Drawing captions', glyph: 'Sheet 04/12 · 1:200', sample: 'Sheet numbers, scales, dimensions and material codes — set exactly as they appear on the practice drawings themselves.' }
    ],
    mocks: [
      {
        cap: 'Project index — filterable',
        url: 'meridian.co.in / index',
        vars: '--m-bg:#E5E3DD;--m-fg:#1A1A18;--m-acc:#575550;--m-soft:rgba(26,26,24,.08);--m-line:rgba(26,26,24,.18);',
        body: `<div class="mv">
          <div class="mv-nav"><b>Meridian</b><ul><li>Index</li><li>Practice</li><li>Awards</li></ul><span>240 projects</span></div>
          <div class="mv-h">The <em>index.</em></div>
          <div class="mv-cols">
            <div class="mv-tile mv-tile--light"><span class="sc sc-mass"><i></i><i></i><i></i><i></i><i></i></span><span>2021 · Residential</span><b>Panchgani</b></div>
            <div class="mv-tile mv-tile--light"><span class="sc sc-mass sc-mass--b"><i></i><i></i><i></i><i></i><i></i></span><span>2019 · Civic</span><b>Kadamba</b></div>
            <div class="mv-tile mv-tile--light"><span class="sc sc-mass sc-mass--c"><i></i><i></i><i></i><i></i><i></i></span><span>2017 · Reuse</span><b>Foundry Lane</b></div>
          </div>
          <div class="mv-row"><span>House at Panchgani</span><em>2021 · Residential</em></div>
          <div class="mv-row"><span>Kadamba Library Extension</span><em>2019 · Civic</em></div>
          <div class="mv-row"><span>Foundry Lane Studios</span><em>2017 · Adaptive reuse</em></div>
        </div>`
      },
      {
        cap: 'Plate — deep zoom',
        url: 'Drawing viewer',
        vars: '--m-bg:#DCDAD3;--m-fg:#1A1A18;--m-acc:#575550;--m-soft:rgba(26,26,24,.1);--m-line:rgba(26,26,24,.2);',
        body: `<div class="mv">
          <div class="mv-nav" style="border:0"><span>Sheet 04 / 12</span><span>1:200</span></div>
          <div class="mv-tile mv-tile--wide" style="align-items:center;justify-content:center">
            <svg viewBox="0 0 200 100" fill="none" stroke="currentColor" stroke-width=".8" style="width:78%;opacity:.5">
              <rect x="6" y="6" width="188" height="88"/>
              <path d="M6 40h88M94 6v88M94 68h100M150 68v26M120 40h74"/>
              <circle cx="44" cy="72" r="14"/>
            </svg>
          </div>
          <div class="mv-row"><span>Ground floor plan</span><em>Reinforced concrete, local basalt</em></div>
        </div>`
      }
    ],
    outcome: 'The index renders on the server and filters through the URL, so a partner can send a colleague a link to “all civic work in basalt since 2010” and it opens exactly that.'
  },

  {
    slug: 'pulse',
    name: 'Pulse',
    index: '05',
    sector: 'Health',
    year: '2025',
    accent: '#E8452B',
    accentOn: '#150705',
    accentInk: '#C0301A',
    art: artPulse,
    pairRev: true,
    tagline: 'Habit tracking that feels like momentum instead of homework.',
    cardDesc: 'Habit tracking that feels like momentum, not homework. A product site and app surface built around one number the user actually cares about.',
    meta: [
      ['Client', 'Pulse'],
      ['Sector', 'Health &amp; fitness'],
      ['Scope', 'Product UI, motion, marketing site'],
      ['Stack', 'React Native, Next.js, Expo']
    ],
    chips: ['Health', 'Product design', 'Motion'],
    brief: [
      'Fitness apps fail in week three. The graphs are honest, the streak breaks, and the user quietly stops opening the thing. Pulse wanted an interface that survived a missed day.',
      'We were brought in to design the daily surface — the screen someone sees eleven times a week — and the marketing site that has to convert people who have already abandoned two competitors.'
    ],
    approach: [
      'One number, enormous, above everything else. Not steps, not calories, not seven competing rings — a single day-goal percentage that recalculates against what you actually did this week rather than an idealised schedule. Miss Tuesday and Wednesday adjusts. The app never scolds.',
      'Motion carries the meaning. The ring fills with an ease that decelerates rather than snapping, the waveform draws left to right as the session records, and the streak counter counts up rather than appearing. It costs eleven kilobytes of animation code and it is the entire reason the screen feels alive.',
      'On the marketing side we resisted the urge to show fifteen features. The page is one long argument for the day-goal number, with the app surface shown at real size on real device frames, because that is what the customer is actually buying.'
    ],
    pull: 'The graph was never the product. The reason to <em class="em-serif">open it tomorrow</em> was the product.',
    facts: [
      ['01', 'One number, not seven', 'A single adaptive day-goal replaces the usual wall of competing metrics and rings.'],
      ['02', 'Forgiving by design', 'Targets rebalance across the week, so a missed day changes the plan instead of breaking a streak.'],
      ['03', 'Motion with a job', 'Every transition maps to a state change — nothing animates purely because it can.']
    ],
    palette: [
      ['#0A0A0C', 'Void', 'App surface'],
      ['#E8452B', 'Pulse', 'Progress &amp; action'],
      ['#F2F2F0', 'Bone', 'Primary type'],
      ['#785AFF', 'Recovery', 'Rest &amp; sleep states']
    ],
    faces: [
      { name: 'Bricolage Grotesque', role: 'Metrics', glyph: '76%', sample: 'The day-goal number is set at 11% of screen width. It is the largest element in the product by a wide margin, and deliberately so.' },
      { name: 'JetBrains Mono', role: 'Labels &amp; units', glyph: 'KCAL · MIN · STREAK', sample: 'Units and timestamps in uppercase mono at 10px. Small, quiet, and never competing with the number they describe.' }
    ],
    mocks: [
      {
        cap: 'Daily surface — iOS',
        url: 'Today',
        vars: '--m-bg:#0A0A0C;--m-fg:#F2F2F0;--m-acc:#E8452B;',
        app: true,
        body: `<div class="ph">
          <div class="ph-top"><span>Today</span><span>Week 12</span></div>
          <div class="ph-h">76%</div>
          <div class="ph-card">
            <div class="ph-bars">
              <i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:30%"></i>
              <i class="on" style="--h:100%"></i><i style="--h:55%"></i><i style="--h:20%"></i><i style="--h:45%"></i>
            </div>
            <div class="mv-row" style="border:0;padding:0;font-size:3.2cqw"><span>Day goal</span><em>412 kcal · 38 min</em></div>
          </div>
          <div class="ph-cta">Start session</div>
        </div>`
      },
      {
        cap: 'Marketing — the argument',
        url: 'pulse.fit',
        vars: '--m-bg:#0F0F12;--m-fg:#F2F2F0;--m-acc:#E8452B;',
        body: `<div class="mv">
          <div class="mv-nav"><b>Pulse</b><ul><li>Features</li><li>Pricing</li></ul><span class="cta">Get the app</span></div>
          <div class="mv-h">One number.<br><em>Every</em> day.</div>
          <div class="mv-sub">No rings to close, no streak to protect. A daily target that moves with your week instead of against it.</div>
          <div class="mv-cols--4 mv-cols">
            <div class="mv-tile mv-tile--sq"><span class="sc sc-glyph"><i></i><i></i></span><b>Adaptive</b></div>
            <div class="mv-tile mv-tile--sq"><span class="sc sc-glyph sc-glyph--b"><i></i><i></i></span><b>Offline</b></div>
            <div class="mv-tile mv-tile--sq"><span class="sc sc-glyph sc-glyph--c"><i></i><i></i></span><b>Health sync</b></div>
            <div class="mv-tile mv-tile--sq"><span class="sc sc-glyph sc-glyph--d"><i></i><i></i></span><b>No ads</b></div>
          </div>
        </div>`
      }
    ],
    outcome: 'The product surface and the marketing site share one token package and one motion spec, so the animation you see on the landing page is the animation that ships in the app.'
  },

  {
    slug: 'cassette',
    name: 'Cassette',
    index: '06',
    sector: 'Culture',
    year: '2025',
    accent: '#8A9E12',
    accentOn: '#120C21',
    accentInk: '#5C6A0B',
    art: artCassette,
    tagline: 'A festival platform built to be screenshotted — and to survive ten thousand people hitting refresh.',
    cardDesc: 'A festival platform built to be screenshotted. Kinetic type, a lineup that reads like a poster, and a ticket flow that survives ten thousand people hitting refresh at once.',
    meta: [
      ['Client', 'Cassette Festival'],
      ['Sector', 'Music &amp; culture'],
      ['Scope', 'Identity, platform, ticketing'],
      ['Stack', 'Next.js, Edge functions, Stripe']
    ],
    chips: ['Culture', 'Festival platform', 'Ticketing'],
    brief: [
      'Two nights, three stages, forty-eight artists, and a single sales window that decides whether the whole thing happens. Cassette needed a site that looked like the poster people would tattoo on themselves, and infrastructure that would not fall over at 10:00 on announcement day.',
      'Those two goals usually fight each other. Kinetic, layered, type-heavy design is exactly the sort of thing that turns into four megabytes of JavaScript and a queue page.'
    ],
    approach: [
      'The identity is built from one move: the wordmark, printed three times in violet, magenta and acid, offset by a few millimetres like a misregistered risograph. It scales from a favicon to a stage banner and it survives being screenshotted at any crop, which is how ninety per cent of people will actually encounter it.',
      'The lineup page is the product. Artists are set as a single continuous typographic block that reflows by billing rather than a grid of cards — closer to a printed poster than a directory. Hovering pulls a set time and stage without moving anything else on the page.',
      'Ticketing is deliberately dull underneath the noise. Inventory is held at the edge, the sales page is fully static until the drop, and the checkout is a Stripe-hosted flow. The visual risk sits entirely in the layer that cannot break the transaction.'
    ],
    pull: 'Make the poster people screenshot. Then make absolutely sure the <em class="em-serif">checkout</em> is the boring part.',
    facts: [
      ['01', 'Misregistered wordmark', 'Three offset impressions in violet, magenta and acid — one idea that works at 16px and at six metres.'],
      ['02', 'Lineup as poster', 'Artists set as a continuous typographic block ordered by billing, not a grid of identical cards.'],
      ['03', 'Boring where it counts', 'Static sales pages, edge-held inventory and hosted checkout — the loud layer cannot break the transaction.']
    ],
    palette: [
      ['#120C21', 'Midnight', 'Page stock'],
      ['#E4FF3D', 'Acid', 'Primary accent'],
      ['#FF4FA3', 'Magenta', 'Second impression'],
      ['#6B4BFF', 'Violet', 'Third impression']
    ],
    faces: [
      { name: 'Bricolage Grotesque', role: 'Wordmark &amp; lineup', glyph: 'CASSETTE', sample: 'Condensed to 78% width and stacked three times with a few millimetres of offset. The whole identity is one typographic gesture repeated.' },
      { name: 'JetBrains Mono', role: 'Set times &amp; tickets', glyph: '22:40 · STAGE 02', sample: 'Set times, stage numbers and ticket tiers. The only quiet type in the system, which is what makes the loud type readable.' }
    ],
    mocks: [
      {
        cap: 'Lineup — desktop',
        url: 'cassette.fm / lineup',
        vars: '--m-bg:#120C21;--m-fg:#F1ECFF;--m-acc:#E4FF3D;',
        body: `<div class="mv">
          <div class="mv-nav"><b>CASSETTE</b><ul><li>Lineup</li><li>Stages</li><li>Info</li></ul><span class="cta">Tickets</span></div>
          <div class="mv-h">Nov 14–15<br><em>Goa.</em></div>
          <div class="mv-cols">
            <div class="mv-tile"><span class="sc sc-face"><i></i><i></i><i></i><i></i></span><span>22:40 · Stage 01</span><b>Kohra</b></div>
            <div class="mv-tile"><span class="sc sc-face sc-face--b"><i></i><i></i><i></i><i></i></span><span>21:10 · Stage 02</span><b>Lifafa</b></div>
            <div class="mv-tile"><span class="sc sc-face sc-face--c"><i></i><i></i><i></i><i></i></span><span>23:50 · Stage 03</span><b>Begum</b></div>
          </div>
          <div class="mv-row"><span>Sulk Station · Peter Cat · Kohra</span><em>Stage 01</em></div>
          <div class="mv-row"><span>Lifafa · Tarun Balani · MALFNKTION</span><em>Stage 02</em></div>
          <div class="mv-row"><span>Begum · Aswekeepsearching</span><em class="k">Stage 03</em></div>
        </div>`
      },
      {
        cap: 'Ticket tiers',
        url: 'cassette.fm / tickets',
        vars: '--m-bg:#1A1230;--m-fg:#F1ECFF;--m-acc:#E4FF3D;',
        body: `<div class="mv">
          <div class="mv-h" style="font-size:6cqw">Tickets</div>
          <div class="mv-row"><span>Phase 1 — two day</span><em class="k">Sold out</em></div>
          <div class="mv-row"><span>Phase 2 — two day</span><em class="k">₹6,500</em></div>
          <div class="mv-row"><span>Saturday only</span><em class="k">₹3,800</em></div>
          <div class="mv-row"><span>Camping add-on</span><em>₹1,200</em></div>
        </div>`
      }
    ],
    outcome: 'The lineup and info pages are fully static and served from the edge; only the ticket availability call is dynamic. Announcement day traffic hits a CDN, not an origin server.'
  }
];

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
