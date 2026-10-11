/**
 * Text engines.
 *
 * splitLines — one engine per designed line: words are measured at their final
 * width, grouped into lines, and each line gets its own clipped mask so a reveal
 * can never re-wrap the paragraph mid-flight.
 *
 * scramble — mono labels resolve out of noise, left to right. Monospace makes
 * this safe: nothing reflows while characters are substituted.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]{}#%+=*";

export function splitLines(el) {
  if (!el.dataset.src) el.dataset.src = el.innerHTML;
  el.innerHTML = el.dataset.src;

  // Wrap words (keep &nbsp; joins and inline tags intact as single words)
  const words = [];
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        // Split on breaking whitespace only — &nbsp; keeps its words together.
        const parts = child.textContent.split(/([ \t\n\r]+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^[ \t\n\r]+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
          } else {
            const s = document.createElement("span");
            s.className = "word";
            s.style.display = "inline-block";
            s.textContent = part;
            frag.appendChild(s);
            words.push(s);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) {
        if (child.classList.contains("word")) return;
        child.style.display = "inline-block";
        child.classList.add("word");
        words.push(child);
      }
    });
  };
  walk(el);

  // Group by measured top
  const lines = [];
  let lastTop = null;
  words.forEach((w) => {
    const top = Math.round(w.offsetTop);
    if (lastTop === null || Math.abs(top - lastTop) > 4) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1].push(w);
  });

  el.innerHTML = "";
  const inners = lines.map((group) => {
    const line = document.createElement("span");
    line.className = "line";
    const inner = document.createElement("span");
    inner.className = "line__inner";
    group.forEach((w, i) => {
      inner.appendChild(w);
      if (i < group.length - 1) inner.appendChild(document.createTextNode(" "));
    });
    line.appendChild(inner);
    el.appendChild(line);
    return inner;
  });
  el.classList.add("is-split");
  return inners;
}

/** Wrap every word for per-word effects (no line masks). */
export function splitWords(el) {
  const text = el.textContent.trim().replace(/\s+/g, " ");
  el.textContent = "";
  return text.split(" ").map((word, i, arr) => {
    const s = document.createElement("span");
    s.className = "w";
    s.textContent = word;
    el.appendChild(s);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    return s;
  });
}

export function scramble(el, { duration = 700, delay = 0, final } = {}) {
  const target = final ?? el.dataset.final ?? el.textContent;
  el.dataset.final = target;
  if (document.documentElement.classList.contains("reduced-motion")) {
    el.textContent = target;
    return;
  }
  const chars = [...target];
  const start = performance.now() + delay;
  let raf;
  const tick = (now) => {
    const t = Math.max(0, (now - start) / duration);
    const resolved = Math.floor(t * chars.length * 1.15);
    let out = "";
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (ch === " " || ch === " " || i < resolved) out += ch;
      else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    // Same length every frame — mono means nothing around it moves.
    el.textContent = out;
    if (t < 1.1) raf = requestAnimationFrame(tick);
    else el.textContent = target;
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
