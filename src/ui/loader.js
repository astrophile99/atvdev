import gsap from "gsap";
import { MARK_PIXELS } from "../scene/shapes.js";

/**
 * Loader — asset-backed with a holding ceiling (house rule A).
 *
 * The count crawls toward 92 while fonts load and the field compiles, and only
 * runs to 100 once the field has drawn a real frame. The mark fills like a gauge
 * and its dissolve cells light in order, bottom-left to top-right.
 *
 * The exit is the mark's own gesture at screen scale: the plate breaks into
 * lattice cells that go out in a diagonal wave. The gate flips at the START of
 * that wave, so the page assembles through it, not after it.
 */

const MIN_VISIBLE = 1400;
const HARD_CAP = 6500;
const STATUS = [
  [0, "Calibrating field"],
  [22, "Sampling mark"],
  [48, "Placing particles"],
  [74, "Aligning grid"],
  [96, "Ready"],
];

export function runLoader({ isReady, onGate, onDone, particles }) {
  const root = document.documentElement;
  const el = document.getElementById("loader");
  const reduced = root.classList.contains("reduced-motion");
  const plate = el.querySelector(".loader__plate");
  const countEl = el.querySelector("[data-loader-count]");
  const statusEl = el.querySelector("[data-loader-status]");
  const ruleFill = el.querySelector(".loader__rule-fill");
  const clip = el.querySelector(".loader__clip");
  const pxGroup = el.querySelector(".loader__px");

  // Dissolve cells, ordered from the stroke outward.
  const NS = "http://www.w3.org/2000/svg";
  const pxRects = MARK_PIXELS.map(([x, y, s]) => {
    const r = document.createElementNS(NS, "rect");
    r.setAttribute("x", x);
    r.setAttribute("y", y);
    r.setAttribute("width", s);
    r.setAttribute("height", s);
    pxGroup.appendChild(r);
    return { r, d: x - 150 + (48 - y) };
  }).sort((a, b) => a.d - b.d);

  const t0 = performance.now();
  let v = 0;
  let last = t0;
  let statusIdx = -1;
  let finished = false;

  const paint = () => {
    const p = v / 100;
    countEl.textContent = String(Math.floor(v)).padStart(3, "0");
    ruleFill.style.transform = `scaleX(${p})`;
    const hgt = 150 * Math.min(1, p * 1.08);
    clip.setAttribute("y", 120 - hgt);
    clip.setAttribute("height", hgt);
    const lit = Math.floor(Math.max(0, (p - 0.55) / 0.42) * pxRects.length);
    pxRects.forEach((o, i) => o.r.classList.toggle("on", i < lit));
    const next = STATUS.reduce((acc, s, i) => (v >= s[0] ? i : acc), 0);
    if (next !== statusIdx) {
      statusIdx = next;
      statusEl.textContent = STATUS[next][1];
    }
  };

  if (particles) {
    const label = STATUS.find((s) => s[1] === "Placing particles");
    if (label) label[1] = `Placing ${particles.toLocaleString("en-IN")} particles`;
  }

  const tick = (now) => {
    if (finished) return;
    // rAF's timestamp can predate the performance.now() we started from.
    // Wall-clock based so a slow first few frames can't stretch the count.
    const dt = Math.max(0, Math.min((now - last) / 1000, 0.25));
    last = now;
    const elapsed = now - t0;
    const ready = (isReady() && elapsed > MIN_VISIBLE) || elapsed > HARD_CAP;
    if (ready && v >= 99.4) v = 100;
    else {
      const ceiling = ready ? 100 : 92;
      v += (ceiling - v) * Math.min(1, (ready ? 6 : 1.5) * dt);
    }
    v = Math.min(100, Math.max(0, v));
    paint();
    if (v >= 100) {
      finished = true;
      exit();
      return;
    }
    requestAnimationFrame(tick);
  };

  const exit = () => {
    onGate();
    if (reduced) {
      el.remove();
      onDone();
      return;
    }
    const tl = gsap.timeline();
    tl.to(el.querySelectorAll(".loader__meta, .loader__count, .loader__rule"), { opacity: 0, duration: 0.35, ease: "power2.out" }, 0);
    tl.to(el.querySelector(".loader__mark"), { opacity: 0, scale: 1.04, duration: 0.45, ease: "power2.out" }, 0.05);
    tl.add(() => cellWipe(el, plate, () => {
      el.remove();
      onDone();
    }), 0.12);
  };

  // Dev-only: ?skip jumps straight past the loader while iterating on sections.
  if (import.meta.env.DEV && new URLSearchParams(location.search).has("skip")) {
    finished = true;
    onGate();
    el.remove();
    onDone();
    return;
  }

  if (reduced) {
    v = 100;
    paint();
    // Give the field one frame, then go.
    requestAnimationFrame(() => requestAnimationFrame(() => { finished = true; exit(); }));
  } else {
    requestAnimationFrame(tick);
  }
}

/** Replace the plate with lattice cells and let them go out in a diagonal wave. */
function cellWipe(host, plate, done) {
  const canvas = host.querySelector(".loader__cells");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth,
    h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const base = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cell")) || 24;
  const size = base * 2;
  const cols = Math.ceil(w / size) + 1,
    rows = Math.ceil(h / size) + 1;
  const cells = [];
  const span = cols + rows;
  const cs = getComputedStyle(document.documentElement);
  const ground = cs.getPropertyValue("--bg").trim() || "#050706";
  const inkA = cs.getPropertyValue("--emerald").trim();
  const inkB = cs.getPropertyValue("--blue").trim();
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      // bottom-left first, drifting up-right — the direction the mark dissolves
      const diag = (i + (rows - 1 - j)) / span;
      cells.push({ x: i * size, y: j * size, t: diag * 0.75 + Math.random() * 0.22 });
    }

  // Cover first, then drop the plate — never a frame with neither.
  ctx.fillStyle = ground;
  ctx.fillRect(0, 0, w, h);
  plate.style.display = "none";
  const DUR = 1050; // ms for the whole wave
  const LIFE = 0.24; // fraction of DUR a single cell takes to go out
  const start = performance.now();

  const frame = (now) => {
    const t = (now - start) / DUR;
    ctx.clearRect(0, 0, w, h);
    let alive = 0;
    for (const c of cells) {
      const k = (t - c.t) / LIFE;
      if (k >= 1) continue;
      alive++;
      const s = k <= 0 ? size : size * (1 - k * k);
      const o = (size - s) / 2;
      ctx.fillStyle = ground;
      ctx.fillRect(c.x + o, c.y + o, s, s);
      if (k > 0 && k < 0.6 && Math.random() < 0.04) {
        ctx.fillStyle = Math.random() < 0.5 ? inkA : inkB;
        ctx.fillRect(c.x + o, c.y + o, s, s);
      }
    }
    if (alive > 0) requestAnimationFrame(frame);
    else done();
  };
  requestAnimationFrame(frame);
}
