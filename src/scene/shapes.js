/**
 * Particle targets.
 *
 * Every form the field can take is described as a list of primitives (segments,
 * outlines, filled areas, rings, raster paths) in a shared unit space roughly
 * x ∈ [-1, 1], y ∈ [-0.7, 0.7]. Particles are distributed across primitives in
 * proportion to their "mass" (length or area × density), so a hairline and a
 * filled bar both read at the same visual density regardless of particle count.
 *
 * Colour is an index, not an RGB triple — 0 ivory, 1 emerald, 2 blue — so six
 * forms fit in two vec3 attributes. The shader resolves it against the inks.
 */

export const IVORY = 0;
export const EMERALD = 1;
export const BLUE = 2;

/* ───────────────────────────── rng ───────────────────────────── */

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ───────────────────────────── primitive builders ───────────────────────────── */

const seg = (ax, ay, bx, by, color = IVORY, o = {}) => ({ t: "seg", ax, ay, bx, by, az: o.z ?? 0, bz: o.bz ?? o.z ?? 0, color, d: o.d ?? 1, w: o.w ?? 0.0025 });
const rect = (x0, y0, x1, y1, color = IVORY, o = {}) => [
  seg(x0, y0, x1, y0, color, o),
  seg(x1, y0, x1, y1, color, o),
  seg(x1, y1, x0, y1, color, o),
  seg(x0, y1, x0, y0, color, o),
];
const fill = (x0, y0, x1, y1, color = IVORY, o = {}) => ({ t: "fill", x0, y0, x1, y1, z: o.z ?? 0, color, d: o.d ?? 1 });
const ring = (cx, cy, r, color = IVORY, o = {}) => ({ t: "arc", cx, cy, r, a0: o.a0 ?? 0, a1: o.a1 ?? Math.PI * 2, z: o.z ?? 0, color, d: o.d ?? 1, w: o.w ?? 0.003 });
const disc = (cx, cy, r, color = IVORY, o = {}) => ({ t: "disc", cx, cy, r, z: o.z ?? 0, color, d: o.d ?? 1 });

/** A rounded rectangle outline from segments + quarter arcs. */
function roundRect(x0, y0, x1, y1, r, color, o = {}) {
  const z = o.z ?? 0;
  return [
    seg(x0 + r, y0, x1 - r, y0, color, o),
    seg(x1, y0 + r, x1, y1 - r, color, o),
    seg(x1 - r, y1, x0 + r, y1, color, o),
    seg(x0, y1 - r, x0, y0 + r, color, o),
    ring(x1 - r, y0 + r, r, color, { ...o, z, a0: -Math.PI / 2, a1: 0 }),
    ring(x1 - r, y1 - r, r, color, { ...o, z, a0: 0, a1: Math.PI / 2 }),
    ring(x0 + r, y1 - r, r, color, { ...o, z, a0: Math.PI / 2, a1: Math.PI }),
    ring(x0 + r, y0 + r, r, color, { ...o, z, a0: Math.PI, a1: Math.PI * 1.5 }),
  ];
}

function mass(p) {
  switch (p.t) {
    case "seg":
      return Math.hypot(p.bx - p.ax, p.by - p.ay, p.bz - p.az) * p.d;
    case "fill":
      // Areas are cheaper per unit than lines — 1 unit² ≈ 9 units of hairline.
      return Math.abs((p.x1 - p.x0) * (p.y1 - p.y0)) * 9 * p.d;
    case "arc":
      return Math.abs(p.a1 - p.a0) * p.r * p.d;
    case "disc":
      return Math.PI * p.r * p.r * 9 * p.d;
    case "pts":
      return p.m;
    default:
      return 0;
  }
}

function samplePrim(p, rnd, out, i) {
  let x = 0,
    y = 0,
    z = 0;
  switch (p.t) {
    case "seg": {
      const t = rnd();
      const n = (rnd() - 0.5) * p.w;
      const dx = p.bx - p.ax,
        dy = p.by - p.ay;
      const len = Math.hypot(dx, dy) || 1;
      x = p.ax + dx * t + (-dy / len) * n;
      y = p.ay + dy * t + (dx / len) * n;
      z = p.az + (p.bz - p.az) * t;
      break;
    }
    case "fill":
      x = p.x0 + (p.x1 - p.x0) * rnd();
      y = p.y0 + (p.y1 - p.y0) * rnd();
      z = p.z;
      break;
    case "arc": {
      const a = p.a0 + (p.a1 - p.a0) * rnd();
      const r = p.r + (rnd() - 0.5) * p.w;
      x = p.cx + Math.cos(a) * r;
      y = p.cy + Math.sin(a) * r;
      z = p.z;
      break;
    }
    case "disc": {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * p.r;
      x = p.cx + Math.cos(a) * r;
      y = p.cy + Math.sin(a) * r;
      z = p.z;
      break;
    }
    case "pts": {
      const k = (rnd() * p.count) | 0;
      x = p.xy[k * 2] + (rnd() - 0.5) * p.jitter;
      y = p.xy[k * 2 + 1] + (rnd() - 0.5) * p.jitter;
      z = 0;
      out.col[i] = p.cols[k];
      out.pos[i * 3] = x;
      out.pos[i * 3 + 1] = y;
      out.pos[i * 3 + 2] = z;
      return;
    }
  }
  out.pos[i * 3] = x;
  out.pos[i * 3 + 1] = y;
  out.pos[i * 3 + 2] = z;
  out.col[i] = p.color;
}

/**
 * Distribute `n` particles over `prims` by mass. Returns { pos, col }.
 * `thickness` adds a little depth so a flat drawing reads as a slab when it turns.
 */
function distribute(prims, n, seed, { thickness = 0.012, transform } = {}) {
  const rnd = mulberry32(seed);
  const flat = prims.flat(Infinity);
  const cum = new Float64Array(flat.length);
  let total = 0;
  flat.forEach((p, k) => {
    total += mass(p);
    cum[k] = total;
  });
  const out = { pos: new Float32Array(n * 3), col: new Float32Array(n) };
  for (let i = 0; i < n; i++) {
    const r = rnd() * total;
    let lo = 0,
      hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    samplePrim(flat[lo], rnd, out, i);
    out.pos[i * 3 + 2] += (rnd() - 0.5) * thickness;
    if (transform) transform(out.pos, i);
  }
  return out;
}

/* ───────────────────────────── the logo (rasterised) ───────────────────────────── */

const MARK_GREEN = "M0 120L60 0H166L154 24H102L150 120H120L75 30L30 120Z";
const MARK_BLUE_STROKE = "M120 120H150L180 60H150Z";
/** The 23 dissolve cells, exactly as drawn in the mark. [x, y, size] in mark units. */
export const MARK_PIXELS = [
  [150, 48, 10], [162, 48, 10], [174, 48, 10], [162, 36, 10], [174, 36, 10], [187, 37, 8],
  [200, 38, 6], [164, 26, 6], [174, 24, 10], [187, 25, 8], [212, 26, 6], [176, 14, 6],
  [187, 13, 8], [200, 14, 6], [225, 15, 4], [188, 2, 6], [200, 2, 6], [213, 3, 4],
  [237.5, 3.5, 3], [201, -9, 4], [228.5, -8.5, 3], [249.5, -8.5, 3], [216.5, -20.5, 3],
  [241, -20, 2],
];
export const MARK_PATHS = { green: MARK_GREEN, blue: MARK_BLUE_STROKE };

/**
 * Rasterise the mark once and keep every lit pixel with its ink. The dissolve
 * cells are rasterised too, so they arrive as solid little squares of particles.
 */
function rasteriseMark() {
  const S = 4; // px per mark unit — finer raster, crisper contour
  const VB = { x: 0, y: -30, w: 256, h: 150 };
  const w = VB.w * S,
    h = VB.h * S;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.setTransform(S, 0, 0, S, -VB.x * S, -VB.y * S);
  ctx.fillStyle = "#00ff00";
  ctx.fill(new Path2D(MARK_GREEN));
  ctx.fillStyle = "#0000ff";
  ctx.fill(new Path2D(MARK_BLUE_STROKE));
  for (const [x, y, s] of MARK_PIXELS) ctx.fillRect(x, y, s, s);

  const data = ctx.getImageData(0, 0, w, h).data;
  const lit = (x, y) => x >= 0 && y >= 0 && x < w && y < h && data[(y * w + x) * 4 + 3] >= 128;
  // Contour pixels carry the drawing; the interior is a sparse speckle. That is
  // what keeps the mark reading as engineered line-work rather than a noisy fill.
  const edge = { xy: [], cols: [] };
  const body = { xy: [], cols: [] };
  // Unit space: mark is 256 wide → x ∈ [-1, 1]; keep aspect.
  const k = 2 / VB.w;
  const R = 1; // a one-pixel contour band: the sharpest edge the raster allows
  for (let py = 0; py < h; py += 1) {
    for (let px = 0; px < w; px += 1) {
      if (!lit(px, py)) continue;
      const o = (py * w + px) * 4;
      const mx = px / S + VB.x;
      const my = py / S + VB.y;
      const onEdge = !lit(px - R, py) || !lit(px + R, py) || !lit(px, py - R) || !lit(px, py + R);
      const dst = onEdge ? edge : body;
      dst.xy.push((mx - VB.w / 2) * k, -(my - (VB.y + VB.h / 2)) * k);
      dst.cols.push(data[o + 1] > data[o + 2] ? EMERALD : BLUE);
    }
  }
  const pts = (src, m) => ({ t: "pts", xy: Float32Array.from(src.xy), cols: Float32Array.from(src.cols), count: src.cols.length, jitter: k / S, m });
  return [pts(edge, 0.8), pts(body, 0.2)];
}

/* ───────────────────────────── the forms ───────────────────────────── */

function browser() {
  const p = [];
  p.push(roundRect(-1, -0.64, 1, 0.64, 0.035, IVORY, { d: 1.15 }));
  p.push(seg(-1, 0.5, 1, 0.5, IVORY, { d: 0.8 }));
  p.push(disc(-0.93, 0.57, 0.016, EMERALD), disc(-0.88, 0.57, 0.016, BLUE), disc(-0.83, 0.57, 0.016, IVORY));
  p.push(roundRect(-0.42, 0.545, 0.42, 0.6, 0.02, IVORY, { d: 0.5 }));
  // Nav
  p.push(fill(-0.9, 0.39, -0.8, 0.42, EMERALD, { d: 1.4 }));
  for (let i = 0; i < 4; i++) p.push(seg(0.36 + i * 0.13, 0.405, 0.45 + i * 0.13, 0.405, IVORY, { d: 0.7 }));
  // Headline blocks
  p.push(fill(-0.88, 0.16, -0.02, 0.25, IVORY, { d: 0.55 }));
  p.push(fill(-0.88, 0.03, -0.2, 0.12, IVORY, { d: 0.55 }));
  p.push(seg(-0.88, -0.06, -0.12, -0.06, IVORY, { d: 0.5 }), seg(-0.88, -0.11, -0.3, -0.11, IVORY, { d: 0.5 }));
  // CTA
  p.push(fill(-0.88, -0.3, -0.58, -0.2, EMERALD, { d: 1.1 }));
  p.push(rect(-0.53, -0.3, -0.27, -0.2, IVORY, { d: 0.6 }));
  // Media plate with a horizon and a sun
  p.push(rect(0.06, -0.32, 0.9, 0.3, BLUE, { d: 0.9 }));
  p.push(fill(0.06, -0.32, 0.9, 0.3, BLUE, { d: 0.12 }));
  p.push(seg(0.06, -0.12, 0.3, 0.06, BLUE), seg(0.3, 0.06, 0.48, -0.06, BLUE), seg(0.48, -0.06, 0.66, 0.12, BLUE), seg(0.66, 0.12, 0.9, -0.1, BLUE));
  p.push(ring(0.72, 0.19, 0.05, IVORY, { d: 0.8 }));
  // Cards row
  for (let i = 0; i < 3; i++) {
    const x0 = -0.88 + i * 0.6;
    p.push(rect(x0, -0.58, x0 + 0.52, -0.42, IVORY, { d: 0.45 }));
    p.push(seg(x0 + 0.04, -0.47, x0 + 0.3, -0.47, i === 1 ? EMERALD : IVORY, { d: 0.6 }));
  }
  return p;
}

function dashboard() {
  const p = [];
  p.push(roundRect(-1, -0.66, 1, 0.66, 0.03, IVORY, { d: 1.1 }));
  // Sidebar
  p.push(seg(-0.66, -0.66, -0.66, 0.66, IVORY, { d: 0.7 }));
  p.push(fill(-0.92, 0.5, -0.84, 0.57, EMERALD, { d: 1.4 }));
  for (let i = 0; i < 6; i++) {
    const y = 0.34 - i * 0.11;
    if (i === 1) p.push(fill(-0.93, y - 0.035, -0.7, y + 0.035, EMERALD, { d: 0.35 }));
    p.push(seg(-0.88, y, -0.74 - (i % 3) * 0.02, y, i === 1 ? EMERALD : IVORY, { d: 0.7 }));
  }
  // KPI tiles
  for (let i = 0; i < 3; i++) {
    const x0 = -0.58 + i * 0.52;
    p.push(rect(x0, 0.3, x0 + 0.46, 0.58, IVORY, { d: 0.55 }));
    p.push(seg(x0 + 0.04, 0.51, x0 + 0.18, 0.51, IVORY, { d: 0.5 }));
    p.push(fill(x0 + 0.04, 0.35, x0 + 0.04 + 0.16 + i * 0.05, 0.44, i === 0 ? EMERALD : IVORY, { d: 0.9 }));
    // sparkline
    const base = 0.38;
    for (let k = 0; k < 5; k++) {
      const a = x0 + 0.28 + k * 0.032;
      p.push(seg(a, base + Math.sin(k * 1.7 + i) * 0.04 + 0.04, a + 0.032, base + Math.sin((k + 1) * 1.7 + i) * 0.04 + 0.04, BLUE, { d: 0.9 }));
    }
  }
  // Bar chart
  const heights = [0.32, 0.46, 0.38, 0.55, 0.42, 0.6, 0.5, 0.68, 0.58, 0.74, 0.66, 0.82];
  const bx0 = -0.56,
    bw = 0.045,
    gap = 0.022,
    by0 = -0.58;
  p.push(seg(bx0 - 0.02, by0, bx0 + 12 * (bw + gap), by0, IVORY, { d: 0.7 }));
  heights.forEach((hgt, i) => {
    const x = bx0 + i * (bw + gap);
    p.push(fill(x, by0, x + bw, by0 + hgt * 0.7, i === 11 ? EMERALD : IVORY, { d: i === 11 ? 0.9 : 0.42 }));
  });
  // Trend line across the bars
  let prev = null;
  heights.forEach((hgt, i) => {
    const x = bx0 + i * (bw + gap) + bw / 2;
    const y = by0 + hgt * 0.7 + 0.07;
    if (prev) p.push(seg(prev[0], prev[1], x, y, BLUE, { d: 1.6, w: 0.008 }));
    p.push(disc(x, y, 0.012, BLUE, { d: 2 }));
    prev = [x, y];
  });
  // Donut
  p.push(ring(0.66, -0.2, 0.2, BLUE, { a0: 0, a1: Math.PI * 1.35, d: 1.6, w: 0.05 }));
  p.push(ring(0.66, -0.2, 0.2, EMERALD, { a0: Math.PI * 1.35, a1: Math.PI * 1.8, d: 1.6, w: 0.05 }));
  p.push(ring(0.66, -0.2, 0.2, IVORY, { a0: Math.PI * 1.8, a1: Math.PI * 2, d: 0.8, w: 0.05 }));
  p.push(seg(0.5, -0.52, 0.82, -0.52, IVORY, { d: 0.5 }), seg(0.5, -0.58, 0.72, -0.58, IVORY, { d: 0.5 }));
  return p;
}

function portfolio() {
  const p = [];
  // A floating masonry wall — each plate sits at its own depth.
  const plates = [
    [-1, 0.1, -0.42, 0.66, 0.14, BLUE, 0.16],
    [-1, -0.66, -0.42, 0.02, -0.05, IVORY, 0],
    [-0.36, 0.28, 0.24, 0.66, 0.0, IVORY, 0],
    [-0.36, -0.3, 0.24, 0.2, 0.22, EMERALD, 0.22],
    [-0.36, -0.66, 0.24, -0.38, -0.1, IVORY, 0],
    [0.3, -0.04, 1, 0.66, -0.12, IVORY, 0],
    [0.3, -0.66, 0.62, -0.12, 0.1, BLUE, 0.12],
    [0.68, -0.66, 1, -0.12, 0.04, IVORY, 0],
  ];
  for (const [x0, y0, x1, y1, z, c, fd] of plates) {
    p.push(rect(x0, y0, x1, y1, c === IVORY ? IVORY : c, { z, d: 0.9 }));
    if (fd) p.push(fill(x0, y0, x1, y1, c, { z, d: fd }));
    // caption line under each plate
    p.push(seg(x0, y0 - 0.035, x0 + (x1 - x0) * 0.4, y0 - 0.035, IVORY, { z, d: 0.35 }));
  }
  // Signature name across the big plate
  p.push(fill(0.36, 0.5, 0.8, 0.58, IVORY, { z: -0.12, d: 0.7 }));
  p.push(fill(0.36, 0.4, 0.62, 0.46, IVORY, { z: -0.12, d: 0.5 }));
  p.push(ring(0.85, 0.08, 0.07, EMERALD, { z: -0.12, d: 1.2 }));
  return p;
}

/** Three stacked layers — client, services, data — seen from an isometric angle. */
function platform() {
  const p = [];
  const layers = [
    { y: 0.48, c: EMERALD, nodes: [[-0.5, -0.3], [0.1, -0.45], [0.5, 0.2], [-0.2, 0.35]] },
    { y: 0.0, c: BLUE, nodes: [[-0.55, 0.1], [-0.05, -0.15], [0.45, -0.35], [0.35, 0.4], [-0.3, -0.5]] },
    { y: -0.48, c: IVORY, nodes: [[-0.35, 0.25], [0.2, 0.0], [0.55, -0.4], [-0.5, -0.35]] },
  ];
  // Build in a local frame where layers are horizontal planes (x, z) at height y.
  const local = [];
  // (x, height, depth) — isoRotate below reads them in that order.
  const L = (ax, ay, az, bx, by, bz, c, d = 1) => local.push({ t: "seg", ax, ay, az, bx, by, bz, color: c, d, w: 0.003 });
  for (const layer of layers) {
    const s = 0.78;
    // plane outline (x,z)
    L(-s, layer.y, -s, s, layer.y, -s, IVORY, 0.42);
    L(s, layer.y, -s, s, layer.y, s, IVORY, 0.42);
    L(s, layer.y, s, -s, layer.y, s, IVORY, 0.42);
    L(-s, layer.y, s, -s, layer.y, -s, IVORY, 0.42);
    // grid inside the plane
    for (let g = -2; g <= 2; g++) {
      const q = (g / 3) * s;
      L(q, layer.y, -s, q, layer.y, s, IVORY, 0.07);
      L(-s, layer.y, q, s, layer.y, q, IVORY, 0.07);
    }
    // nodes as small rings drawn in the plane
    for (const [nx, nz] of layer.nodes) {
      for (let a = 0; a < 6; a++) {
        const a0 = (a / 6) * Math.PI * 2,
          a1 = ((a + 1) / 6) * Math.PI * 2;
        const r = 0.07;
        L(nx + Math.cos(a0) * r, layer.y, nz + Math.sin(a0) * r, nx + Math.cos(a1) * r, layer.y, nz + Math.sin(a1) * r, layer.c, 3.2);
      }
    }
    // edges between consecutive nodes
    for (let k = 0; k < layer.nodes.length; k++) {
      const [ax, az] = layer.nodes[k];
      const [bx, bz] = layer.nodes[(k + 1) % layer.nodes.length];
      L(ax, layer.y, az, bx, layer.y, bz, layer.c, 0.9);
    }
  }
  // vertical connectors between layers
  const links = [
    [0, 0, 1, 0],
    [0, 1, 1, 1],
    [0, 2, 1, 3],
    [1, 1, 2, 1],
    [1, 2, 2, 2],
    [1, 4, 2, 3],
  ];
  for (const [la, na, lb, nb] of links) {
    const A = layers[la],
      B = layers[lb];
    const [ax, az] = A.nodes[na];
    const [bx, bz] = B.nodes[nb];
    L(ax, A.y, az, bx, B.y, bz, BLUE, 1.5);
  }
  p.push(local);
  return p;
}

function apps() {
  const p = [];
  // Primary phone
  const x0 = -0.52,
    x1 = 0.12,
    y0 = -0.68,
    y1 = 0.68;
  p.push(roundRect(x0, y0, x1, y1, 0.09, IVORY, { d: 1.3, z: 0.1 }));
  p.push(fill(-0.27, 0.6, -0.13, 0.635, IVORY, { z: 0.1, d: 1.2 }));
  // header
  p.push(fill(x0 + 0.06, 0.42, x0 + 0.34, 0.49, IVORY, { z: 0.1, d: 0.7 }));
  // progress ring
  p.push(ring(-0.2, 0.16, 0.17, IVORY, { z: 0.1, d: 0.35, w: 0.03 }));
  p.push(ring(-0.2, 0.16, 0.17, EMERALD, { z: 0.1, a0: Math.PI / 2, a1: Math.PI / 2 - Math.PI * 1.45, d: 1.8, w: 0.035 }));
  p.push(fill(-0.26, 0.13, -0.14, 0.19, IVORY, { z: 0.1, d: 0.9 }));
  // list rows
  for (let i = 0; i < 3; i++) {
    const y = -0.14 - i * 0.13;
    p.push(rect(x0 + 0.05, y - 0.05, x1 - 0.05, y + 0.05, IVORY, { z: 0.1, d: 0.45 }));
    p.push(fill(x0 + 0.08, y - 0.02, x0 + 0.12, y + 0.02, i === 0 ? EMERALD : BLUE, { z: 0.1, d: 1.6 }));
    p.push(seg(x0 + 0.16, y, x0 + 0.38, y, IVORY, { z: 0.1, d: 0.5 }));
  }
  // tab bar
  p.push(seg(x0, -0.56, x1, -0.56, IVORY, { z: 0.1, d: 0.6 }));
  for (let i = 0; i < 4; i++) p.push(disc(x0 + 0.1 + i * 0.147, -0.62, 0.016, i === 0 ? EMERALD : IVORY, { z: 0.1, d: 2 }));

  // Second phone, behind and to the right
  const z2 = -0.35;
  const u0 = 0.24,
    u1 = 0.84,
    v0 = -0.56,
    v1 = 0.74;
  p.push(roundRect(u0, v0, u1, v1, 0.085, BLUE, { d: 0.9, z: z2 }));
  p.push(fill(u0 + 0.05, 0.3, u1 - 0.05, 0.6, BLUE, { z: z2, d: 0.18 }));
  p.push(rect(u0 + 0.05, 0.3, u1 - 0.05, 0.6, BLUE, { z: z2, d: 0.6 }));
  // a chart in the second phone
  for (let i = 0; i < 7; i++) {
    const x = u0 + 0.08 + i * 0.07;
    const hgt = 0.08 + ((i * 37) % 11) / 40;
    p.push(fill(x, -0.2, x + 0.04, -0.2 + hgt, i === 6 ? EMERALD : IVORY, { z: z2, d: 0.5 }));
  }
  p.push(seg(u0 + 0.05, -0.32, u1 - 0.05, -0.32, IVORY, { z: z2, d: 0.4 }));
  p.push(seg(u0 + 0.05, -0.4, u1 - 0.2, -0.4, IVORY, { z: z2, d: 0.4 }));
  return p;
}

/** A precise lattice floor — intersections and rulings of a 12-unit grid. */
function lattice() {
  const p = [];
  const N = 16;
  const span = 2.6;
  for (let i = 0; i <= N; i++) {
    const q = -span / 2 + (i / N) * span;
    p.push(seg(q, -span / 2, q, span / 2, i % 4 === 0 ? BLUE : IVORY, { d: i % 4 === 0 ? 0.55 : 0.32 }));
    p.push(seg(-span / 2, q, span / 2, q, i % 4 === 0 ? BLUE : IVORY, { d: i % 4 === 0 ? 0.55 : 0.32 }));
  }
  for (let i = 0; i <= N; i++)
    for (let j = 0; j <= N; j++) {
      const x = -span / 2 + (i / N) * span;
      const y = -span / 2 + (j / N) * span;
      p.push(disc(x, y, 0.009, (i * 7 + j * 3) % 23 === 0 ? EMERALD : IVORY, { d: 1.8 }));
    }
  return p;
}

/* ───────────────────────────── public ───────────────────────────── */

export const FORMS = ["logo", "browser", "dashboard", "portfolio", "platform", "apps", "lattice"];

/**
 * Build every target buffer for `n` particles. Also returns `dust`, the free state
 * the field relaxes into between forms.
 */
export function buildForms(n) {
  const mark = rasteriseMark();
  const isoRotate = (pos, i) => {
    // local (x, y=height, z=depth) → iso view: rotate around Y by 45°, then X by 32°.
    const x = pos[i * 3],
      y = pos[i * 3 + 1],
      z = pos[i * 3 + 2];
    const cy = Math.cos(Math.PI / 4),
      sy = Math.sin(Math.PI / 4);
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const ax = 0.56;
    const cx = Math.cos(ax),
      sx = Math.sin(ax);
    const y2 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    pos[i * 3] = x1 * 1.05;
    pos[i * 3 + 1] = y2 * 1.05;
    pos[i * 3 + 2] = z2 * 0.6;
  };
  const floor = (pos, i) => {
    const x = pos[i * 3],
      y = pos[i * 3 + 1],
      z = pos[i * 3 + 2];
    const a = -1.3; // tip the lattice back into a floor
    pos[i * 3] = x * 1.6;
    pos[i * 3 + 1] = y * Math.cos(a) - z * Math.sin(a);
    pos[i * 3 + 2] = y * Math.sin(a) + z * Math.cos(a);
  };

  const forms = {
    logo: distribute(mark, n, 11, { thickness: 0.012 }),
    browser: distribute(browser(), n, 21),
    dashboard: distribute(dashboard(), n, 31),
    portfolio: distribute(portfolio(), n, 41, { thickness: 0.01 }),
    platform: distribute(platform(), n, 51, { thickness: 0.01, transform: isoRotate }),
    apps: distribute(apps(), n, 61),
    lattice: distribute(lattice(), n, 71, { thickness: 0.01, transform: floor }),
  };

  // Dust: a deep, sparse volume much wider than any viewport — most of the field
  // parks out of frame, so what's visible is a few motes, not a snowstorm.
  const rnd = mulberry32(99);
  const dust = { pos: new Float32Array(n * 3), col: new Float32Array(n) };
  for (let i = 0; i < n; i++) {
    dust.pos[i * 3] = (rnd() - 0.5) * 7.5;
    dust.pos[i * 3 + 1] = (rnd() - 0.5) * 5.0;
    dust.pos[i * 3 + 2] = -rnd() * 3.2 + 0.4;
    const c = rnd();
    dust.col[i] = c < 0.8 ? IVORY : c < 0.9 ? EMERALD : BLUE;
  }
  return { forms, dust };
}
