import gsap from "gsap";

/**
 * Pointer layer — one writer for everything the cursor touches:
 *  · the cursor itself: a single emerald pixel (plus a label where a link has one)
 *  · the pixel trail: tiny cells shed behind the pointer that drift up-and-right
 *    and shrink out, the way the mark's own pixels dissolve
 *  · magnetic controls
 */

export function initCursor({ onMove } = {}) {
  const root = document.documentElement;
  const coarse = root.classList.contains("is-touch");
  const reduced = root.classList.contains("reduced-motion");

  // The field still wants touch positions (the particles part under a finger).
  const forward = (e) => onMove?.(e.clientX, e.clientY);
  window.addEventListener("pointermove", forward, { passive: true });
  window.addEventListener("pointerdown", forward, { passive: true });

  if (coarse) return;

  root.classList.add("has-cursor");
  const el = document.querySelector(".cursor");
  const dot = el.querySelector(".cursor__dot");
  const label = el.querySelector(".cursor__label");
  el.style.opacity = "0"; // nothing at 0,0 until the pointer has actually been seen

  const raw = { x: -100, y: -100 };
  let seen = false;
  let target = null;
  const trail = createTrail(document.getElementById("lattice"), reduced);

  window.addEventListener(
    "pointermove",
    (e) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      if (!seen) {
        seen = true;
        el.style.opacity = "1";
      }
      trail.move(raw.x, raw.y);
    },
    { passive: true }
  );

  const setTarget = (t) => {
    target = t;
    const text = t?.dataset.cursor;
    el.classList.toggle("has-label", !!text);
    el.classList.toggle("is-hover", !!t);
    if (text) label.textContent = text;
  };
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("[data-cursor]");
    if (t !== target) setTarget(t);
  });
  document.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest?.("[data-cursor]")) setTarget(null);
  });
  document.addEventListener("pointerleave", () => (el.style.opacity = "0"));
  document.addEventListener("pointerenter", () => seen && (el.style.opacity = "1"));

  gsap.ticker.add((time, deltaMs) => {
    if (!seen) return;
    dot.style.transform = `translate3d(${raw.x}px, ${raw.y}px, 0)`;
    label.style.left = `${raw.x}px`;
    label.style.top = `${raw.y}px`;
    trail.frame(Math.min(deltaMs, 50) / 1000);
  });

  if (!reduced) initMagnetic();
}

/* ───────────────────────────── pixel trail ───────────────────────────── */

function createTrail(canvas, reduced) {
  const ctx = canvas.getContext("2d");
  let dpr = 1,
    w = 0,
    h = 0;
  const bits = [];
  let last = null;
  let inks = [];

  const readInks = () => {
    const cs = getComputedStyle(document.documentElement);
    inks = [cs.getPropertyValue("--emerald").trim(), cs.getPropertyValue("--blue").trim(), cs.getPropertyValue("--ink").trim()];
  };
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
  };
  resize();
  readInks();
  window.addEventListener("resize", resize);
  new MutationObserver(readInks).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  return {
    move(x, y) {
      if (reduced) return;
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        // shed roughly one pixel per 14px travelled
        const n = Math.min(6, Math.floor(dist / 14));
        for (let i = 0; i < n; i++) {
          const t = Math.random();
          const r = Math.random();
          bits.push({
            x: last.x + (x - last.x) * t + (Math.random() - 0.5) * 6,
            y: last.y + (y - last.y) * t + (Math.random() - 0.5) * 6,
            vx: 10 + Math.random() * 26,
            vy: -(10 + Math.random() * 26),
            s: 2 + Math.random() * 3.5,
            life: 1,
            c: r < 0.45 ? 0 : r < 0.85 ? 1 : 2,
          });
        }
        if (bits.length > 160) bits.splice(0, bits.length - 160);
      }
      last = { x, y };
    },
    frame(dt) {
      if (!bits.length) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        b.life -= dt * 1.4;
        if (b.life <= 0) {
          bits.splice(i, 1);
          continue;
        }
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const s = b.s * b.life;
        ctx.globalAlpha = b.life * (b.c === 2 ? 0.35 : 0.7);
        ctx.fillStyle = inks[b.c];
        ctx.fillRect(b.x - s / 2, b.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      if (!bits.length) ctx.clearRect(0, 0, w, h);
    },
  };
}

/* ───────────────────────────── magnetic ───────────────────────────── */

function initMagnetic() {
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
    });
    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}
