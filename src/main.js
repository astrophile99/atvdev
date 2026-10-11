import "./styles/main.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Field, STATE } from "./scene/field.js";
import { runLoader } from "./ui/loader.js";
import { initCursor } from "./ui/cursor.js";
import {
  prepareSplits,
  initSplitReveals,
  resplit,
  initScrambles,
  gateTimeline,
  initHeroScroll,
  initHeader,
  initStatement,
  initCaps,
  CAP_FORMS,
  initWork,
  initGantt,
  initBudgets,
  initFooter,
  initClock,
  initCopy,
  initMenu,
} from "./ui/sections.js";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduced = root.classList.contains("reduced-motion");
const mobile = window.innerWidth < 760;

/* ───────────────────────────── smooth scroll ───────────────────────────── */

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.stop();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
}
window.scrollTo(0, 0);
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

/* ───────────────────────────── field ───────────────────────────── */

const cores = navigator.hardwareConcurrency || 4;
const COUNT = mobile ? 16000 : cores <= 4 ? 22000 : 32000;
let field = null;
try {
  field = new Field(document.getElementById("field"), { count: COUNT, reduced, mobile });
} catch (err) {
  console.warn("[atvdev] WebGL unavailable — static mark fallback.", err);
  root.classList.add("no-webgl");
  const img = document.createElement("img");
  img.src = "/brand/atvdev-mark.svg";
  img.alt = "";
  img.className = "hero__fallback";
  document.querySelector(".hero__guides")?.appendChild(img);
}
if (import.meta.env.DEV) window.__field = field;
field?.setTheme(root.dataset.theme || "light");
document.querySelectorAll("[data-points]").forEach((el) => (el.textContent = COUNT.toLocaleString("en-US")));

/**
 * Where each named state sits on screen. Units are world units on the z=0 plane;
 * the view gives the visible width/height so every placement is proportional.
 */
const MARK_H = 1.17; // the mark's height in shape units (width is 2)
const FORM_H = 1.4;
function resolveState(key, v) {
  const { visW, visH, mobile: m } = v;
  switch (key) {
    case "logo": {
      const scale = m ? Math.min((0.74 * visW) / 2, (0.26 * visH) / MARK_H) : Math.min((0.29 * visH) / MARK_H, (0.27 * visW) / 2);
      return { key, form: STATE.logo, scale, x: -scale * 0.06, y: m ? 0.01 * visH : 0, alpha: 1, drift: 0.004, tilt: 1 };
    }
    case "dust":
      return { key, form: STATE.dust, scale: visH * 0.5, x: 0, y: 0, alpha: 0.13, drift: 0.09, tilt: 0.35 };
    case "lattice":
      return { key, form: STATE.lattice, scale: (1.25 * visW) / 4.16, x: 0, y: -0.5 * visH, alpha: 0.26, drift: 0.003, tilt: 0.3 };
    case "fade":
      return { key, form: STATE.dust, scale: visH * 0.5, x: 0, y: 0, alpha: 0.05, drift: 0.09, tilt: 0.35 };
    case "logoEnd": {
      // Parks in the empty upper-right of the contact frame, clear of the headline.
      const scale = m ? (0.3 * visW) / 2 : (0.16 * visH) / MARK_H;
      return { key, form: STATE.logo, scale, x: m ? 0.2 * visW : 0.33 * visW, y: m ? -0.4 * visH : 0.3 * visH, alpha: m ? 0.5 : 0.62, drift: 0.004, tilt: 1 };
    }
    default: {
      // capability forms
      const scale = m ? Math.min((0.86 * visW) / 2, (0.3 * visH) / FORM_H) : Math.min((0.4 * visW) / 2, (0.56 * visH) / FORM_H);
      return { key, form: STATE[key], scale, x: m ? 0 : 0.22 * visW, y: m ? 0.1 * visH : -0.03 * visH, alpha: 1, drift: 0.004, tilt: 1 };
    }
  }
}

/** Scroll positions → states. Recomputed on every ScrollTrigger refresh. */
function buildTrack(capsST) {
  const vh = window.innerHeight;
  const top = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  };
  const bottom = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().bottom + window.scrollY : 0;
  };
  const t = [];
  t.push({ y: 0, key: "logo" }, { y: vh * 0.15, key: "logo" });
  t.push({ y: top(".statement") - vh * 0.15, key: "dust" });

  const cs = capsST.start;
  const L = (capsST.end - capsST.start) / CAP_FORMS.length;
  t.push({ y: cs - vh * 0.55, key: "dust" });
  CAP_FORMS.forEach((k, i) => {
    const holdStart = i === 0 ? cs - vh * 0.08 : cs + i * L + L * 0.1;
    const holdEnd = cs + (i + 1) * L - L * 0.1;
    t.push({ y: holdStart, key: k }, { y: holdEnd, key: k });
  });
  const ce = capsST.end;
  t.push({ y: ce + vh * 0.35, key: "dust" });
  // The process timeline is text-dense, so the field stays quiet behind it; the
  // lattice floor only rises under the budgets, and the mark returns for contact.
  t.push({ y: top(".standards") - vh * 0.45, key: "dust" });
  t.push({ y: top(".standards") + vh * 0.1, key: "lattice" });
  t.push({ y: bottom(".standards") - vh * 0.75, key: "lattice" });
  // Contact: the mark is fully formed exactly when the section reaches the top of
  // the screen (where the Contact link lands), then disperses within one scroll.
  const ct = top(".contact");
  t.push({ y: ct - vh * 0.02, key: "logoEnd" });
  t.push({ y: ct + vh * 0.03, key: "logoEnd" });
  t.push({ y: ct + vh * 0.22, key: "fade" });
  // keep strictly increasing
  for (let i = 1; i < t.length; i++) if (t[i].y <= t[i - 1].y) t[i].y = t[i - 1].y + 1;
  return t;
}

/* ───────────────────────────── boot ───────────────────────────── */

const intro = { v: reduced ? 1 : 0 };
let fontsReady = false;
document.fonts.ready.then(() => (fontsReady = true));
// Fonts can hang on a bad network; the loader's hard cap covers that, this covers the splits.
setTimeout(() => (fontsReady = true), 3500);

initCursor({ onMove: (x, y) => field?.setPointer(x, y) });
initClock();
initCopy();
const menu = initMenu(lenis);
initTheme();

// Anchor links ride the smooth scroll.
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  const target = id === "#top" ? 0 : document.querySelector(id);
  if (target === null) return;
  e.preventDefault();
  menu.close();
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else window.scrollTo({ top: target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY });
});
document.querySelector("[data-to-top]")?.addEventListener("click", () => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo(0, 0)));

// FPS readout — measured, not decorative.
const fpsEl = document.querySelector("[data-fps]");
let frames = 0,
  fpsT = performance.now();

let started = false;
gsap.ticker.add((time, deltaMs) => {
  const dt = Math.min(deltaMs, 100) / 1000;
  if (field) {
    field.setScroll(lenis ? lenis.scroll : window.scrollY);
    field.render(dt, intro.v);
  }
  frames++;
  const now = performance.now();
  if (now - fpsT > 500) {
    if (fpsEl) fpsEl.textContent = String(Math.round((frames * 1000) / (now - fpsT)));
    frames = 0;
    fpsT = now;
  }
  if (!started) started = true;
});

const waitFonts = () => new Promise((res) => {
  const check = () => (fontsReady ? res() : setTimeout(check, 50));
  check();
});

waitFonts().then(() => {
  prepareSplits();
  initStatement();

  const capsST = initCaps();
  initHeroScroll();
  initHeader();
  initWork();
  initGantt();
  initBudgets();
  initFooter();
  initScrambles();
  initSplitReveals();

  const refreshTrack = () => field?.setTrack(buildTrack(capsST), resolveState);
  ScrollTrigger.addEventListener("refresh", refreshTrack);
  ScrollTrigger.refresh();
  refreshTrack();
  field?.setScroll(0, true);

  const gate = gateTimeline();

  runLoader({
    particles: field ? COUNT : 0,
    isReady: () => fontsReady && (!field || field.drawn),
    onGate: () => {
      root.classList.remove("is-loading");
      gate.play();
      if (!reduced) gsap.to(intro, { v: 1, duration: 2.8, ease: "power3.out" });
    },
    onDone: () => {
      lenis?.start();
      ScrollTrigger.refresh();
      // Dev-only: ?y=1234 parks the page at a scroll position (for screenshots).
      const y = import.meta.env.DEV && new URLSearchParams(location.search).get("y");
      if (y) {
        lenis ? lenis.scrollTo(+y, { immediate: true, force: true }) : window.scrollTo(0, +y);
        setTimeout(() => field && (field.path = field.pathTarget), 120);
      }
    },
  });

  // Width changes invalidate measured lines and the track.
  let lastW = window.innerWidth;
  let rt;
  window.addEventListener("resize", () => {
    field?.resize();
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        resplit();
      }
      ScrollTrigger.refresh();
    }, 200);
  });
});


/* ───────────────────────────── theme ───────────────────────────── */

/**
 * Light is the default; the choice persists. The switch is the loader's own
 * gesture: cells of the new ground sweep in on the diagonal, the theme flips
 * under full cover, and the cells go out again.
 */
function initTheme() {
  const btn = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-label]");
  const meta = document.querySelector('meta[name="theme-color"]');
  const GROUND = { light: "#f6f7f3", dark: "#050706" };

  const apply = (t) => {
    root.dataset.theme = t;
    field?.setTheme(t);
    label.textContent = t === "light" ? "Light" : "Dark";
    btn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
    meta?.setAttribute("content", GROUND[t]);
    try {
      localStorage.setItem("atv-theme", t);
    } catch {}
  };
  apply(root.dataset.theme === "dark" ? "dark" : "light");

  let busy = false;
  btn.addEventListener("click", () => {
    if (busy) return;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    if (reduced) return apply(next);
    busy = true;
    themeWipe(GROUND[next], () => apply(next), () => (busy = false));
  });
}

function themeWipe(color, atCover, done) {
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:110;pointer-events:none";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth,
    h = window.innerHeight;
  c.width = w * dpr;
  c.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const size = w < 760 ? 36 : 48;
  const cols = Math.ceil(w / size),
    rows = Math.ceil(h / size);
  const cells = [];
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) cells.push({ x: i * size, y: j * size, t: ((i + (rows - 1 - j)) / (cols + rows)) * 0.7 + Math.random() * 0.22 });

  const draw = (p, growing) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    for (const cell of cells) {
      let k = gsap.utils.clamp(0, 1, (p - cell.t) / 0.12);
      if (!growing) k = 1 - k;
      if (k <= 0) continue;
      const s = size * k;
      ctx.fillRect(cell.x + (size - s) / 2, cell.y + (size - s) / 2, s + 0.5, s + 0.5);
    }
  };
  const st = { p: 0 };
  gsap
    .timeline({ onComplete: () => (c.remove(), done()) })
    .to(st, { p: 1.05, duration: 0.55, ease: "power2.in", onUpdate: () => draw(st.p, true) })
    .add(() => {
      atCover();
      st.p = 0;
    })
    .to(st, { p: 1.05, duration: 0.6, ease: "power2.out", onUpdate: () => draw(st.p, false) }, "+=0.05");
}
