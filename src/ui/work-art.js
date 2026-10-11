/**
 * Preview plates for the work index, drawn as SVG so they stay crisp at any size
 * and share the page's inks. Swap any of these for a real screenshot by putting
 * an <img> in the row's data-preview slot instead (see work.js).
 */

const C = {
  bg: "#0a0d0c",
  bg2: "#0f1312",
  line: "rgba(238,240,235,0.12)",
  line2: "rgba(238,240,235,0.22)",
  ink: "#eef0eb",
  mute: "rgba(238,240,235,0.55)",
  sub: "rgba(238,240,235,0.3)",
  em: "#19c37d",
  bl: "#2f6bff",
};
const mono = `font-family="JetBrains Mono, monospace" letter-spacing="0.06em"`;
const sans = `font-family="Archivo, sans-serif"`;

const wrap = (body, id) => `
<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.em}" stop-opacity="0.38"/>
      <stop offset="1" stop-color="${C.em}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="h-${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="${C.line}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="480" height="300" fill="${C.bg}"/>
  ${body}
</svg>`;

function dashboard() {
  const bars = [38, 52, 44, 61, 49, 70, 58, 77, 66, 84, 73, 92];
  const pts = [[0, 62], [30, 58], [60, 64], [90, 50], [120, 54], [150, 40], [180, 44], [210, 30], [240, 34], [270, 20]];
  const path = pts.map((p, i) => `${i ? "L" : "M"}${190 + p[0]} ${70 + p[1]}`).join(" ");
  return wrap(`
  <rect x="0" y="0" width="92" height="300" fill="${C.bg2}"/>
  <line x1="92" y1="0" x2="92" y2="300" stroke="${C.line}"/>
  <rect x="16" y="18" width="14" height="14" fill="${C.em}"/>
  <text x="36" y="29" ${mono} font-size="8" fill="${C.ink}">LEDGERLINE</text>
  ${["Overview", "Accounts", "Cashflow", "Reports", "Team"].map((t, i) => `
    ${i === 0 ? `<rect x="10" y="${54 + i * 22}" width="72" height="18" fill="rgba(25,195,125,0.12)"/>` : ""}
    <text x="18" y="${66 + i * 22}" ${mono} font-size="7" fill="${i === 0 ? C.em : C.mute}">${t.toUpperCase()}</text>`).join("")}
  <text x="108" y="30" ${sans} font-size="15" font-weight="600" fill="${C.ink}" style="font-stretch:118%">Q3 Overview</text>
  <text x="400" y="29" ${mono} font-size="7" fill="${C.sub}">FY 2026</text>
  ${[["REVENUE", "₹4.82Cr", "+12.4%"], ["BURN", "₹38.1L", "−3.2%"], ["RUNWAY", "22 mo", "+2"]].map(([k, v, d], i) => `
    <rect x="${108 + i * 122}" y="44" width="112" height="0" />
    <text x="${108 + i * 122}" y="56" ${mono} font-size="6.5" fill="${C.sub}">${k}</text>
    <text x="${108 + i * 122}" y="76" ${sans} font-size="17" font-weight="600" fill="${C.ink}" style="font-stretch:112%">${v}</text>
    <text x="${180 + i * 122}" y="76" ${mono} font-size="7" fill="${i === 1 ? C.bl : C.em}">${d}</text>`).join("")}
  <line x1="108" y1="90" x2="464" y2="90" stroke="${C.line}"/>
  <path d="${path} L460 160 L190 160 Z" fill="url(#g-d)" transform="translate(0,0)"/>
  <path d="${path}" fill="none" stroke="${C.em}" stroke-width="1.5"/>
  ${bars.map((b, i) => `<rect x="${110 + i * 6.2}" y="${160 - b * 0.6}" width="3.6" height="${b * 0.6}" fill="${i === 11 ? C.bl : C.line2}"/>`).join("")}
  <line x1="108" y1="160" x2="464" y2="160" stroke="${C.line}"/>
  ${[0, 1, 2, 3, 4].map((r) => `
    <line x1="108" y1="${186 + r * 22}" x2="464" y2="${186 + r * 22}" stroke="${C.line}"/>
    <text x="108" y="${200 + r * 22}" ${mono} font-size="6.5" fill="${C.mute}">INV-2026-00${41 + r}</text>
    <text x="230" y="${200 + r * 22}" ${mono} font-size="6.5" fill="${C.sub}">${["Acme Retail", "Kavya Foods", "Orbit Ops", "Northfield", "Tempo Labs"][r].toUpperCase()}</text>
    <rect x="350" y="${193 + r * 22}" width="${[30, 22, 36, 18, 28][r]}" height="8" fill="${r === 2 ? C.bl : "rgba(25,195,125,0.5)"}"/>
    <text x="464" y="${200 + r * 22}" text-anchor="end" ${mono} font-size="6.5" fill="${C.ink}">${["1,50,450", "86,200", "2,40,000", "64,900", "1,12,300"][r]}</text>`).join("")}
  `.replace("url(#g-d)", "url(#g-dash)"), "dash");
}

function portfolio() {
  return wrap(`
  <text x="24" y="34" ${mono} font-size="7" fill="${C.mute}">KAYA STUDIO — ARCHITECTURE</text>
  <text x="456" y="34" text-anchor="end" ${mono} font-size="7" fill="${C.sub}">INDEX  ·  PRACTICE  ·  CONTACT</text>
  <text x="22" y="116" ${sans} font-size="72" font-weight="600" letter-spacing="-3" fill="${C.ink}" style="font-stretch:125%">Kaya</text>
  <text x="24" y="140" ${mono} font-size="7" fill="${C.sub}">HOUSES, LIBRARIES & QUIET ROOMS — SINCE 2014</text>
  <rect x="270" y="52" width="186" height="120" fill="url(#h-port)"/>
  <rect x="270" y="52" width="186" height="120" fill="none" stroke="${C.line2}"/>
  <path d="M290 160 L290 104 L340 78 L390 104 L390 160 Z" fill="${C.bg}" stroke="${C.ink}" stroke-width="1"/>
  <rect x="352" y="120" width="22" height="40" fill="none" stroke="${C.em}"/>
  <line x1="290" y1="160" x2="440" y2="160" stroke="${C.ink}"/>
  <rect x="404" y="128" width="28" height="32" fill="none" stroke="${C.line2}"/>
  ${[0, 1, 2, 3].map((i) => `
    <rect x="${24 + i * 110}" y="186" width="98" height="${i % 2 ? 72 : 90}" fill="${i === 1 ? "rgba(47,107,255,0.18)" : C.bg2}" stroke="${C.line}"/>
    <line x1="${32 + i * 110}" y1="${i % 2 ? 246 : 264}" x2="${86 + i * 110}" y2="${i % 2 ? 210 : 214}" stroke="${C.line2}"/>
    <text x="${24 + i * 110}" y="290" ${mono} font-size="6" fill="${C.sub}">0${i + 1} — ${["CASA LUZ", "STONE LIBRARY", "HILL HOUSE", "COURTYARD"][i]}</text>`).join("")}
  `, "port");
}

function website() {
  return wrap(`
  <line x1="0" y1="40" x2="480" y2="40" stroke="${C.line}"/>
  <text x="24" y="25" ${sans} font-size="11" font-weight="700" fill="${C.ink}" style="font-stretch:125%">NORTHFIELD</text>
  <text x="456" y="25" text-anchor="end" ${mono} font-size="7" fill="${C.mute}">SHOP  ·  STORY  ·  BAG (2)</text>
  <text x="24" y="96" ${sans} font-size="38" font-weight="600" letter-spacing="-1.5" fill="${C.ink}" style="font-stretch:118%">Made to</text>
  <text x="24" y="134" ${sans} font-size="38" font-weight="600" letter-spacing="-1.5" fill="${C.em}" style="font-stretch:118%">outlast you.</text>
  <text x="24" y="160" ${mono} font-size="7" fill="${C.mute}">WAXED CANVAS · FULL-GRAIN LEATHER · LIFETIME REPAIRS</text>
  <rect x="24" y="178" width="96" height="26" fill="${C.em}"/>
  <text x="34" y="194" ${mono} font-size="7" fill="${C.bg}">SHOP THE RANGE →</text>
  <rect x="128" y="178" width="78" height="26" fill="none" stroke="${C.line2}"/>
  <text x="138" y="194" ${mono} font-size="7" fill="${C.ink}">OUR STORY</text>
  <rect x="268" y="56" width="188" height="170" fill="${C.bg2}" stroke="${C.line}"/>
  <circle cx="362" cy="140" r="58" fill="none" stroke="${C.line2}"/>
  <path d="M322 168 L326 116 Q362 92 398 116 L402 168 Z" fill="rgba(25,195,125,0.18)" stroke="${C.em}"/>
  <path d="M344 116 Q362 84 380 116" fill="none" stroke="${C.ink}"/>
  <text x="278" y="216" ${mono} font-size="6.5" fill="${C.mute}">FIELD TOTE 02</text>
  <text x="446" y="216" text-anchor="end" ${mono} font-size="6.5" fill="${C.ink}">₹ 7,400</text>
  <line x1="0" y1="246" x2="480" y2="246" stroke="${C.line}"/>
  ${["FREE SHIPPING OVER ₹3K", "10-YEAR WARRANTY", "MADE IN JAIPUR"].map((t, i) => `<text x="${24 + i * 160}" y="276" ${mono} font-size="6.5" fill="${C.sub}">${t}</text>`).join("")}
  `, "web");
}

function platform() {
  const nodes = [[120, 120], [190, 84], [250, 150], [320, 100], [380, 170], [210, 220], [300, 230]];
  const edges = [[0, 1], [1, 3], [3, 4], [0, 2], [2, 5], [2, 4], [5, 6], [6, 4]];
  return wrap(`
  <rect x="0" y="0" width="480" height="300" fill="url(#h-plat)" opacity="0.5"/>
  <rect x="0" y="0" width="480" height="34" fill="${C.bg}"/>
  <line x1="0" y1="34" x2="480" y2="34" stroke="${C.line}"/>
  <text x="18" y="21" ${mono} font-size="8" fill="${C.ink}">ORBIT OPS</text>
  <text x="96" y="21" ${mono} font-size="7" fill="${C.sub}">LIVE · 148 VEHICLES · 12 DEPOTS</text>
  <circle cx="452" cy="18" r="3" fill="${C.em}"/>
  ${edges.map(([a, b], i) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${i % 3 === 0 ? C.em : C.line2}" stroke-width="${i % 3 === 0 ? 1.4 : 1}" ${i % 3 === 0 ? "" : 'stroke-dasharray="3 3"'}/>`).join("")}
  ${nodes.map(([x, y], i) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${C.bg}" stroke="${i === 2 ? C.bl : C.ink}"/>${i === 2 ? `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="none" stroke="${C.bl}" stroke-opacity="0.5"/>` : ""}`).join("")}
  <rect x="320" y="46" width="146" height="242" fill="${C.bg}" stroke="${C.line}"/>
  <text x="332" y="64" ${mono} font-size="7" fill="${C.mute}">DISPATCH QUEUE</text>
  ${[0, 1, 2, 3, 4, 5].map((r) => `
    <line x1="332" y1="${76 + r * 34}" x2="454" y2="${76 + r * 34}" stroke="${C.line}"/>
    <text x="332" y="${92 + r * 34}" ${mono} font-size="7" fill="${C.ink}">MH-12-${4410 + r * 37}</text>
    <text x="332" y="${102 + r * 34}" ${mono} font-size="6" fill="${C.sub}">${["PUNE → NASHIK", "PUNE → MUMBAI", "SATARA → PUNE", "PUNE → SOLAPUR", "NAGAR → PUNE", "PUNE → GOA"][r]}</text>
    <rect x="${420}" y="${85 + r * 34}" width="34" height="10" fill="${r === 1 ? "rgba(47,107,255,0.3)" : "rgba(25,195,125,0.2)"}"/>
    <text x="437" y="${92.5 + r * 34}" text-anchor="middle" ${mono} font-size="5.5" fill="${r === 1 ? C.bl : C.em}">${r === 1 ? "DELAY" : "ON TIME"}</text>`).join("")}
  `, "plat");
}

function app() {
  const phone = (x, y, inner) => `
    <rect x="${x}" y="${y}" width="128" height="256" rx="18" fill="${C.bg2}" stroke="${C.line2}"/>
    <rect x="${x + 48}" y="${y + 8}" width="32" height="8" rx="4" fill="${C.bg}"/>
    ${inner}`;
  const ring = (cx, cy, r, p) => {
    const a = Math.PI * 2 * p - Math.PI / 2;
    const x = cx + Math.cos(a) * r,
      y = cy + Math.sin(a) * r;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.line}" stroke-width="6"/>
      <path d="M${cx} ${cy - r} A${r} ${r} 0 ${p > 0.5 ? 1 : 0} 1 ${x} ${y}" fill="none" stroke="${C.em}" stroke-width="6"/>`;
  };
  return wrap(`
  <text x="24" y="40" ${sans} font-size="30" font-weight="600" letter-spacing="-1" fill="${C.ink}" style="font-stretch:125%">Tempo</text>
  <text x="24" y="58" ${mono} font-size="7" fill="${C.mute}">HABITS & TRAINING · iOS / ANDROID</text>
  ${phone(170, 28, `
    <text x="184" y="64" ${mono} font-size="6.5" fill="${C.sub}">TODAY · TUE</text>
    ${ring(234, 112, 34, 0.72)}
    <text x="234" y="116" text-anchor="middle" ${sans} font-size="16" font-weight="600" fill="${C.ink}">72%</text>
    ${[0, 1, 2].map((i) => `<rect x="182" y="${168 + i * 26}" width="104" height="20" fill="${C.bg}" stroke="${C.line}"/>
      <rect x="188" y="${174 + i * 26}" width="8" height="8" fill="${i === 0 ? C.em : i === 1 ? C.bl : "none"}" stroke="${C.line2}"/>
      <text x="202" y="${181 + i * 26}" ${mono} font-size="6" fill="${C.mute}">${["MOBILITY 10 MIN", "RUN 5 KM", "READ 20 PAGES"][i]}</text>`).join("")}
  `)}
  ${phone(316, 52, `
    <text x="330" y="88" ${mono} font-size="6.5" fill="${C.sub}">THIS WEEK</text>
    ${[40, 62, 30, 74, 58, 88, 66].map((h, i) => `<rect x="${332 + i * 14}" y="${200 - h}" width="8" height="${h}" fill="${i === 5 ? C.em : C.line2}"/>`).join("")}
    <line x1="328" y1="200" x2="432" y2="200" stroke="${C.line}"/>
    <text x="330" y="222" ${sans} font-size="14" font-weight="600" fill="${C.ink}">5 day streak</text>
    <text x="330" y="236" ${mono} font-size="6" fill="${C.bl}">BEST: 21 DAYS</text>
  `)}
  `, "app");
}

const ART = { dashboard, portfolio, website, platform, app };
export const workArt = (kind) => (ART[kind] ? ART[kind]() : "");
