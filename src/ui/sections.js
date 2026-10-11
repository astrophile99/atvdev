import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLines, splitWords, scramble } from "./text.js";
import { workArt } from "./work-art.js";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => document.documentElement.classList.contains("reduced-motion");
const touch = () => document.documentElement.classList.contains("is-touch");

/* ───────────────────────────── split headings ───────────────────────────── */

/**
 * Every [data-split] heading is split into lines up front (behind the loader).
 * Lines rise out of their masks while the Archivo width axis opens from its
 * narrowest cut to the display width — type that expands into place.
 */
export function prepareSplits() {
  document.querySelectorAll("[data-split]").forEach((el) => {
    const finalW = parseFloat(getComputedStyle(el).fontStretch) || 118;
    el.dataset.w = finalW;
    const inners = splitLines(el);
    if (!reduced()) gsap.set(inners, { yPercent: 108, "--w": 62 });
    else gsap.set(inners, { "--w": finalW });
    el._inners = inners;
  });
}

export function revealSplit(el, { delay = 0, stagger = 0.1, duration = 1.25 } = {}) {
  if (!el._inners || el._revealed) return;
  el._revealed = true;
  if (reduced()) return;
  return gsap.to(el._inners, {
    yPercent: 0,
    "--w": parseFloat(el.dataset.w),
    duration,
    stagger,
    delay,
    ease: "expo.out",
  });
}

export function initSplitReveals() {
  document.querySelectorAll("[data-split]:not([data-split='hero'])").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => revealSplit(el),
    });
  });
}

/** After a width change the measured lines are stale: rebuild them at rest. */
export function resplit() {
  document.querySelectorAll("[data-split]").forEach((el) => {
    const inners = splitLines(el);
    const w = parseFloat(el.dataset.w);
    if (el._revealed || reduced()) gsap.set(inners, { yPercent: 0, "--w": w });
    else gsap.set(inners, { yPercent: 108, "--w": 62 });
    el._inners = inners;
  });
}

/* ───────────────────────────── scramble labels ───────────────────────────── */

export function initScrambles() {
  document.querySelectorAll("[data-scramble]").forEach((el) => {
    if (el.closest("[data-gate]")) return; // gated ones run with the gate
    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => scramble(el, { duration: 650 }),
    });
  });
}

/* ───────────────────────────── gate (hero entrance) ───────────────────────────── */

export function gateTimeline() {
  const tl = gsap.timeline({ paused: true });
  const header = document.querySelector(".site-header");
  if (reduced()) {
    tl.set("[data-gate]", { opacity: 1 });
    tl.set(".hero__guides .guide", { scale: 1 });
    tl.set(".hero__guides .reticle", { opacity: 1 });
    tl.set(header, { "--hl": 1 });
    return tl;
  }
  tl.set("[data-gate]", { opacity: 1 }, 0);
  tl.from(header.children, { y: -14, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" }, 0.1);
  tl.fromTo(".site-header", { "--hl": 0 }, { "--hl": 1, duration: 1.4, ease: "expo.inOut" }, 0);
  tl.to(".hero__guides .guide--h", { scaleX: 1, duration: 1.6, ease: "expo.inOut" }, 0.05);
  tl.to(".hero__guides .guide--v", { scaleY: 1, duration: 1.6, ease: "expo.inOut" }, 0.15);
  tl.to(".hero__guides .reticle", { opacity: 1, duration: 0.4 }, 1.0);
  tl.add(() => {
    document.querySelectorAll("[data-split='hero']").forEach((el, i) => revealSplit(el, { delay: i * 0.16, duration: 1.5 }));
  }, 0.12);
  tl.add(() => {
    document.querySelectorAll("[data-gate] [data-scramble]").forEach((el, i) => scramble(el, { duration: 800, delay: i * 90 }));
  }, 0.35);
  // fromTo, not from: gated elements are held at opacity 0 by CSS, so a `from`
  // would capture 0 as its destination.
  tl.fromTo(".hero__kicker", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, 0.3);
  tl.fromTo(".hero__hud", { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.1 }, 0.3);
  tl.fromTo(".hero__intro > *", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.09, ease: "expo.out" }, 0.55);
  tl.fromTo(".status-card", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, 0.7);
  tl.fromTo(".hero__scroll", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.1);
  return tl;
}

/* ───────────────────────────── hero on scroll ───────────────────────────── */

export function initHeroScroll() {
  const pct = document.querySelector("[data-scroll-pct]");
  const fill = document.querySelector(".hero__scroll-fill");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (pct) pct.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
      if (fill) fill.style.transform = `scaleX(${self.progress})`;
    },
  });
  if (reduced()) return;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  tl.to(".hero__word--l", { xPercent: -14, opacity: 0.0, ease: "none" }, 0);
  tl.to(".hero__word--r", { xPercent: 14, opacity: 0.0, ease: "none" }, 0);
  tl.to(".hero__guides, .hero__hud, .hero__kicker", { opacity: 0, ease: "none" }, 0);
  tl.to(".hero__base", { y: -60, opacity: 0, ease: "none" }, 0);
}

/* ───────────────────────────── header ───────────────────────────── */

export function initHeader() {
  const header = document.querySelector(".site-header");
  // Driven by position, not trigger activity — at the very bottom a trigger ending
  // at "max" reports inactive, which would drop the header's backdrop.
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => header.classList.toggle("is-scrolled", self.scroll() > 40),
  });
}

/* ───────────────────────────── statement ───────────────────────────── */

export function initStatement() {
  const el = document.querySelector("[data-fill]");
  if (!el) return;
  const words = splitWords(el);
  const keyFrom = words.findIndex((w, i) => w.textContent === "exactly" && words[i + 1]?.textContent === "what");
  if (keyFrom > -1) words.slice(keyFrom).forEach((w) => (w.dataset.key = "1"));
  if (reduced()) {
    words.forEach((w) => {
      w.style.opacity = 1;
      if (w.dataset.key) w.classList.add("is-key");
    });
    return;
  }
  ScrollTrigger.create({
    trigger: el,
    start: "top 78%",
    end: "bottom 52%",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress * words.length;
      words.forEach((w, i) => {
        const v = Math.min(1, Math.max(0, p - i));
        w.style.opacity = 0.16 + v * 0.84;
        if (w.dataset.key) w.classList.toggle("is-key", v > 0.6);
      });
    },
  });
}

/* ───────────────────────────── capabilities (pinned) ───────────────────────────── */

export const CAP_FORMS = ["browser", "dashboard", "portfolio", "platform", "apps"];
const CAP_LABELS = ["browser.frame", "dashboard.grid", "portfolio.wall", "platform.stack", "app.pair"];

export function initCaps(onIndex) {
  const section = document.querySelector(".caps");
  const items = [...section.querySelectorAll(".cap")];
  const num = section.querySelector("[data-caps-num]");
  const form = section.querySelector("[data-caps-form]");
  const rail = section.querySelector(".caps__rail-fill");
  let active = 0;

  const setActive = (i) => {
    if (i === active) return;
    const dir = i > active ? 1 : -1;
    items[active].classList.remove("is-active");
    items[i].classList.add("is-active");
    active = i;
    onIndex?.(i);
    if (!reduced()) {
      gsap.fromTo(num, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(items[i].querySelectorAll(".cap__text, .tags li"), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: "expo.out" });
    }
    num.textContent = String(i + 1).padStart(2, "0");
    scramble(form, { final: CAP_LABELS[i], duration: 420 });
  };

  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + capsLength(),
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      rail.style.transform = `scaleY(${self.progress})`;
      setActive(Math.min(4, Math.floor(self.progress * 5 * 0.9999)));
    },
  });

  // Let a click on a title jump to its stage.
  items.forEach((it, i) =>
    it.querySelector(".cap__title").addEventListener("click", () => {
      window.__lenis?.scrollTo(st.start + (st.end - st.start) * ((i + 0.5) / 5), { duration: 1.2 });
    })
  );
  return st;
}

export const capsLength = () => window.innerHeight * (window.innerWidth < 760 ? 3.6 : 4.2);

/* ───────────────────────────── work index ───────────────────────────── */

export function initWork() {
  const rows = [...document.querySelectorAll(".work-row")];
  const preview = document.querySelector(".work__preview");
  const inner = preview.querySelector(".work__preview-inner");
  const tag = preview.querySelector(".work__preview-tag");

  // Inline thumbs for touch screens; the floating plate for pointers.
  if (touch()) {
    rows.forEach((row) => {
      const t = document.createElement("div");
      t.className = "work-row__thumb";
      t.innerHTML = workArt(row.dataset.preview);
      row.querySelector(".work-row__link").prepend(t);
    });
    preview.remove();
    return;
  }

  const cache = {};
  const art = (k) => (cache[k] ??= workArt(k));
  const pos = { x: 0, y: 0, tx: 0, ty: 0, r: 0 };
  let visible = false;
  let current = null;

  const show = (row) => {
    if (current !== row.dataset.preview) {
      current = row.dataset.preview;
      inner.innerHTML = art(current);
      tag.textContent = row.querySelector(".work-row__name").textContent + " — " + row.querySelector(".work-row__kind").textContent;
      if (visible && !reduced()) gsap.fromTo(inner, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "expo.out" });
    }
    if (!visible) {
      visible = true;
      gsap.to(preview, { clipPath: "inset(0% 0 0% 0)", duration: reduced() ? 0 : 0.6, ease: "expo.out" });
    }
  };
  const hide = () => {
    visible = false;
    gsap.to(preview, { clipPath: "inset(50% 0 50% 0)", duration: reduced() ? 0 : 0.45, ease: "expo.inOut" });
  };

  rows.forEach((row) => row.addEventListener("pointerenter", () => show(row)));
  document.querySelector(".work__list").addEventListener("pointerleave", hide);

  window.addEventListener(
    "pointermove",
    (e) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
    },
    { passive: true }
  );
  gsap.ticker.add((t, d) => {
    if (!visible && Math.abs(pos.tx - pos.x) < 0.5) return;
    const k = 1 - Math.pow(1 - 0.12, (d / 1000) * 60);
    const vx = (pos.tx - pos.x) * k;
    pos.x += vx;
    pos.y += (pos.ty - pos.y) * k;
    pos.r += (gsap.utils.clamp(-8, 8, vx * 0.25) - pos.r) * 0.1;
    const w = preview.offsetWidth,
      h = preview.offsetHeight;
    const x = Math.min(window.innerWidth - w - 16, pos.x + 28);
    const y = Math.min(window.innerHeight - h - 40, Math.max(16, pos.y - h / 2));
    preview.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${pos.r}deg)`;
  });
  // Scrolling away should take the plate with it.
  ScrollTrigger.create({ trigger: ".work__list", start: "top bottom", end: "bottom top", onLeave: hide, onLeaveBack: hide });

  if (!reduced()) {
    gsap.from(rows, {
      scrollTrigger: { trigger: ".work__list", start: "top 85%", once: true },
      y: 40,
      opacity: 0,
      duration: 1.1,
      stagger: 0.08,
      ease: "expo.out",
    });
  }
}

/* ───────────────────────────── gantt ───────────────────────────── */

export function initGantt() {
  const section = document.querySelector(".process");
  const gantt = section.querySelector(".gantt");
  const rows = [...gantt.querySelectorAll(".gantt__row")];
  const now = gantt.querySelector(".gantt__now");
  const week = gantt.querySelector("[data-week]");
  const readout = section.querySelector("[data-phase]");
  const firstTrack = gantt.querySelector(".gantt__track");
  const phases = rows.map((row) => {
    const cs = getComputedStyle(row);
    return {
      row,
      bar: row.querySelector(".gantt__bar"),
      from: parseFloat(cs.getPropertyValue("--from")) / 10,
      to: parseFloat(cs.getPropertyValue("--to")) / 10,
      text: `${row.querySelector("strong").textContent} — ${row.querySelector(".gantt__note").textContent.replace(/^./, (c) => c.toLowerCase())}`,
    };
  });

  if (reduced()) {
    gsap.set(now, { opacity: 0 });
    return;
  }
  gsap.set(phases.map((p) => p.bar), { scaleX: 0 });
  gantt.classList.add("is-live");

  let active = -1;
  const setActive = (i) => {
    if (i === active) return;
    active = i;
    phases.forEach((p, k) => p.row.classList.toggle("is-active", k === i));
    readout.textContent = phases[i].text;
    gsap.fromTo(readout, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
  };

  const place = (p) => {
    const tr = firstTrack.getBoundingClientRect();
    const gr = gantt.getBoundingClientRect();
    now.style.transform = `translateX(${tr.left - gr.left + tr.width * p}px)`;
    week.textContent = String(Math.min(10, Math.floor(p * 10) + 1)).padStart(2, "0");
    phases.forEach((ph) => {
      const local = gsap.utils.clamp(0, 1, (p - ph.from) / Math.max(0.0001, ph.to - ph.from));
      ph.bar.style.transform = `scaleX(${local})`;
    });
    // The phase "now" is the latest one that has started.
    let idx = 0;
    phases.forEach((ph, k) => p >= ph.from - 0.001 && (idx = k));
    setActive(idx);
  };

  // The page holds still while the week marker travels the whole schedule.
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + window.innerHeight * (window.innerWidth < 760 ? 1.4 : 1.6),
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: 0.4,
    onUpdate: (self) => place(self.progress),
    onRefresh: (self) => place(self.progress),
  });
}

/* ───────────────────────────── budgets ───────────────────────────── */

export function initBudgets() {
  const list = document.querySelector(".budgets");
  const counters = list.querySelectorAll("[data-count]");
  const meters = list.querySelectorAll(".budget__meter span");
  const aa = list.querySelector("[data-scramble-final]");
  if (reduced()) {
    counters.forEach((c) => (c.textContent = Number(c.dataset.count).toFixed(+c.dataset.decimals)));
    gsap.set(meters, { scaleX: 1 });
    return;
  }
  ScrollTrigger.create({
    trigger: list,
    start: "top 80%",
    once: true,
    onEnter: () => {
      counters.forEach((c, i) => {
        const o = { v: parseFloat(c.dataset.from ?? 0) };
        gsap.to(o, {
          v: parseFloat(c.dataset.count),
          duration: 1.8,
          delay: i * 0.08,
          ease: "expo.out",
          onUpdate: () => (c.textContent = o.v.toFixed(+c.dataset.decimals)),
        });
      });
      gsap.to(meters, { scaleX: 1, duration: 1.6, stagger: 0.08, ease: "expo.inOut" });
      if (aa) scramble(aa, { final: "AA", duration: 900, delay: 250 });
      gsap.from(list.querySelectorAll(".budget"), { opacity: 0, y: 24, duration: 1, stagger: 0.07, ease: "expo.out" });
    },
  });
}

/* ───────────────────────────── footer wordmark ───────────────────────────── */

export function initFooter() {
  const letters = document.querySelectorAll(".wordmark__l");
  if (reduced()) return;
  gsap.set(letters, { yPercent: 110 });
  ScrollTrigger.create({
    trigger: ".site-footer__mark",
    start: "top 95%",
    once: true,
    onEnter: () => gsap.to(letters, { yPercent: 0, duration: 1.4, stagger: 0.06, ease: "expo.out" }),
  });
}

/* ───────────────────────────── clock ───────────────────────────── */

export function initClock() {
  const els = document.querySelectorAll("[data-clock]");
  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const tick = () => {
    const t = fmt.format(new Date());
    els.forEach((el) => (el.textContent = t));
  };
  tick();
  setInterval(tick, 1000);
}

/* ───────────────────────────── copy ───────────────────────────── */

export function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const label = btn.querySelector(".copy__label");
    const original = label.textContent;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        scramble(label, { final: "Copied to clipboard", duration: 420 });
      } catch {
        scramble(label, { final: "Select & copy above", duration: 420 });
      }
      clearTimeout(btn._t);
      btn._t = setTimeout(() => scramble(label, { final: original, duration: 420 }), 2200);
    });
  });
}

/* ───────────────────────────── mobile menu ───────────────────────────── */

export function initMenu(lenis) {
  const root = document.documentElement;
  const btn = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  const canvas = menu.querySelector(".menu__cells");
  const links = menu.querySelectorAll(".menu__nav a");
  const foot = menu.querySelector(".menu__foot");
  const ctx = canvas.getContext("2d");
  const state = { p: 0 };
  let cells = [];
  let open = false;

  const layout = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth,
      h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const size = 40;
    cells = [];
    const cols = Math.ceil(w / size),
      rows = Math.ceil(h / size);
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) cells.push({ x: i * size, y: j * size, s: size, t: ((cols - i) + j) / (cols + rows) * 0.7 + Math.random() * 0.25 });
  };
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    for (const c of cells) {
      const k = gsap.utils.clamp(0, 1, (state.p - c.t) / 0.2);
      if (k <= 0) continue;
      const s = c.s * k;
      ctx.fillRect(c.x + (c.s - s) / 2, c.y + (c.s - s) / 2, s, s);
    }
  };

  const toggle = (force) => {
    open = force ?? !open;
    btn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    root.classList.toggle("menu-open", open);
    if (open) {
      layout();
      menu.style.visibility = "visible";
      lenis?.stop();
      gsap.to(state, { p: 1.2, duration: reduced() ? 0 : 0.7, ease: "power2.out", onUpdate: draw });
      gsap.to(links, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, delay: 0.25, ease: "expo.out" });
      gsap.to(foot, { opacity: 1, duration: 0.6, delay: 0.5 });
    } else {
      lenis?.start();
      gsap.to([...links, foot], { opacity: 0, y: (i, t) => (t === foot ? 0 : 16), duration: 0.3, ease: "power2.in" });
      gsap.to(state, {
        p: 0,
        duration: reduced() ? 0 : 0.55,
        delay: 0.1,
        ease: "power2.in",
        onUpdate: draw,
        onComplete: () => (menu.style.visibility = "hidden"),
      });
    }
  };

  btn.addEventListener("click", () => toggle());
  links.forEach((a) => a.addEventListener("click", () => toggle(false)));
  window.addEventListener("keydown", (e) => e.key === "Escape" && open && toggle(false));
  return { close: () => open && toggle(false) };
}
