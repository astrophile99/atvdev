/* ==========================================================================
   atvdev — interaction layer
   No dependencies. Native scrolling, rAF-driven motion, reduced-motion aware.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;

  root.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ----------------------------------------------------------------------
     Scroll hub
     One scroll listener and one rAF loop for the whole page. Everything
     scroll-driven subscribes here instead of adding its own listener, so
     there is exactly one layout read per frame and effects stay in sync.
     The loop sleeps once velocity settles rather than running forever.
     ---------------------------------------------------------------------- */
  var hub = (function () {
    var subs = [];
    var last = window.scrollY;
    var vel = 0;
    var running = false;
    var idle = 0;
    var max = 1;

    function measure() {
      max = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight);
    }

    function frame() {
      var y = window.scrollY;
      var delta = y - last;
      last = y;
      vel += (delta - vel) * 0.18;
      if (Math.abs(vel) < 0.04) vel = 0;

      var state = {
        y: y,
        vel: vel,
        max: max,
        progress: clamp(y / max, 0, 1),
        vh: window.innerHeight
      };
      for (var i = 0; i < subs.length; i++) subs[i](state);

      if (Math.abs(vel) > 0.04) { idle = 0; requestAnimationFrame(frame); }
      else if (idle < 4) { idle++; requestAnimationFrame(frame); }
      else { running = false; }
    }

    function kick() {
      idle = 0;
      if (running) return;
      running = true;
      requestAnimationFrame(frame);
    }

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', function () { measure(); kick(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); kick(); });
    measure();

    return { add: function (fn) { subs.push(fn); kick(); }, kick: kick, measure: measure };
  })();

  /* ----------------------------------------------------------------------
     1. Preloader
     ---------------------------------------------------------------------- */
  function preloader() {
    var pre = $('.pre');
    if (!pre) { body.classList.add('loaded'); return; }

    var out = $('.pre__count', pre);
    var bar = $('.pre__bar', pre);
    var pct = 0;
    var done = false;
    var settled = false;

    window.addEventListener('load', function () { settled = true; });
    setTimeout(function () { settled = true; }, 2600);

    function tick() {
      var ceiling = settled ? 100 : 92;
      pct += Math.max(0.6, (ceiling - pct) * 0.055);
      if (pct > ceiling) pct = ceiling;
      if (out) out.textContent = String(Math.floor(pct)).padStart(3, '0');
      if (bar) bar.style.setProperty('--p', pct / 100);

      if (pct >= 99.4 && !done) {
        done = true;
        if (out) out.textContent = '100';
        setTimeout(finish, 260);
        return;
      }
      requestAnimationFrame(tick);
    }

    function finish() {
      if (body.classList.contains('loaded')) return;
      done = true;
      body.classList.add('loaded');
      body.classList.add('intro');
      setTimeout(function () {
        pre.remove();
        body.classList.remove('intro');
      }, 1400);
    }

    if (reduced) { if (out) out.textContent = '100'; finish(); return; }

    // Failsafe: rAF is throttled in background tabs, so never let the
    // curtain trap the page. 4s and it lifts regardless.
    setTimeout(finish, 4000);
    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------------------
     2. Split text into animatable words
     ---------------------------------------------------------------------- */
  function splitLines() {
    $$('.split').forEach(function (el) {
      $$('.ln', el).forEach(function (line) {
        var nodes = Array.prototype.slice.call(line.childNodes);
        var frag = doc.createDocumentFragment();

        nodes.forEach(function (node) {
          if (node.nodeType === 3) {
            var parts = node.textContent.split(/(\s+)/);
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(doc.createTextNode(' ')); return; }
              var w = doc.createElement('span');
              w.className = 'wd';
              w.textContent = p;
              frag.appendChild(w);
            });
          } else if (node.nodeType === 1) {
            var wrap = doc.createElement('span');
            wrap.className = 'wd';
            wrap.appendChild(node.cloneNode(true));
            frag.appendChild(wrap);
          }
        });

        line.textContent = '';
        line.appendChild(frag);
      });

      // Character layer, only where it is worth the span count.
      if (el.hasAttribute('data-chars')) {
        $$('.wd', el).forEach(function (w) {
          var text = w.textContent;
          var inner = w.firstElementChild;              // e.g. a nested <em>
          var host = inner || w;
          var t = host.textContent;
          host.textContent = '';
          for (var c = 0; c < t.length; c++) {
            var ch = doc.createElement('span');
            ch.className = 'ch';
            ch.textContent = t[c];
            host.appendChild(ch);
          }
          if (!text) return;
        });
        $$('.ch', el).forEach(function (c, i) {
          c.style.setProperty('--wd', (i * 0.018).toFixed(3) + 's');
        });
      } else {
        $$('.wd', el).forEach(function (w, i) {
          w.style.setProperty('--wd', (i * 0.075).toFixed(3) + 's');
        });
      }

      // Drop the compositor layers once the reveal has played out.
      el.addEventListener('transitionend', function once(ev) {
        if (ev.propertyName !== 'transform') return;
        $$('.wd, .ch', el).forEach(function (n) { n.style.willChange = 'auto'; });
        el.removeEventListener('transitionend', once);
      });
    });
  }

  /* ----------------------------------------------------------------------
     3. Reveals
     ---------------------------------------------------------------------- */
  var revealSel = '[data-rise], [data-fade], [data-clip], [data-stagger], .split';
  var heroSel = '[data-hero] [data-rise], [data-hero] [data-fade], ' +
                '[data-hero] [data-clip], [data-hero] [data-stagger], [data-hero] .split';

  function revealNow() {
    $$(heroSel).forEach(function (el, i) {
      setTimeout(function () { el.classList.add('in'); }, 120 + i * 85);
    });
  }

  function reveals() {
    var items = $$(revealSel);
    if (!('IntersectionObserver' in window) || reduced) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    items.forEach(function (el) {
      if (el.closest('[data-hero]') || el.hasAttribute('data-hero')) return;
      io.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     4. Header behaviour + scroll progress
     ---------------------------------------------------------------------- */
  function headerAndProgress() {
    var hdr = $('.hdr');
    var prog = $('.prog');
    var last = window.scrollY;

    function frame(s) {
      var y = s.y;

      if (prog) prog.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')';

      if (hdr) {
        hdr.classList.toggle('is-stuck', y > 24);
        if (!body.classList.contains('menu-open')) {
          hdr.classList.toggle('is-hidden', y > last && y > 320);
        }
      }
      last = y;
    }

    hub.add(frame);
  }

  /* ----------------------------------------------------------------------
     5. Menu overlay
     ---------------------------------------------------------------------- */
  function menu() {
    var btn = $('.burger');
    var panel = $('.menu');
    if (!btn || !panel) return;

    function set(open) {
      body.classList.toggle('menu-open', open);
      body.classList.toggle('is-locked', open);
      btn.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
    }

    btn.addEventListener('click', function () {
      set(!body.classList.contains('menu-open'));
    });
    $$('a', panel).forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) set(false);
    });
  }

  /* ----------------------------------------------------------------------
     6. Custom cursor
     ---------------------------------------------------------------------- */
  function cursor() {
    if (!finePointer || reduced) return;

    var ring = doc.createElement('div');
    ring.className = 'cur';
    var label = doc.createElement('span');
    label.className = 'cur__label';
    ring.appendChild(label);

    var dot = doc.createElement('div');
    dot.className = 'cur-dot';
    body.appendChild(ring);
    body.appendChild(dot);

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var rx = tx, ry = ty;

    doc.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!body.classList.contains('cursor-ready')) body.classList.add('cursor-ready');
    }, { passive: true });

    doc.addEventListener('mouseleave', function () { body.classList.remove('cursor-ready'); });
    doc.addEventListener('mouseenter', function () { body.classList.add('cursor-ready'); });

    (function loop() {
      rx = lerp(rx, tx, 0.16);
      ry = lerp(ry, ty, 0.16);
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      dot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
      requestAnimationFrame(loop);
    })();

    doc.addEventListener('mouseover', function (e) {
      var view = e.target.closest('[data-cursor]');
      if (view) {
        label.textContent = view.getAttribute('data-cursor') || 'View';
        body.classList.add('cur-view');
        body.classList.remove('cur-link');
        return;
      }
      var link = e.target.closest('a, button, input, textarea, select, [role="button"]');
      body.classList.remove('cur-view');
      body.classList.toggle('cur-link', !!link);
    });
  }

  /* ----------------------------------------------------------------------
     7. Magnetic elements
     ---------------------------------------------------------------------- */
  function magnets() {
    if (!finePointer || reduced) return;
    $$('[data-magnet]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnet')) || 0.4;
      var raf = null, cx = 0, cy = 0, tx2 = 0, ty2 = 0;

      function run() {
        cx = lerp(cx, tx2, 0.18);
        cy = lerp(cy, ty2, 0.18);
        el.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
        if (Math.abs(cx - tx2) > 0.1 || Math.abs(cy - ty2) > 0.1) {
          raf = requestAnimationFrame(run);
        } else { raf = null; }
      }
      function kick() { if (!raf) raf = requestAnimationFrame(run); }

      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        tx2 = (e.clientX - (r.left + r.width / 2)) * strength;
        ty2 = (e.clientY - (r.top + r.height / 2)) * strength;
        kick();
      });
      el.addEventListener('mouseleave', function () { tx2 = 0; ty2 = 0; kick(); });
    });
  }

  /* ----------------------------------------------------------------------
     8. Parallax  ·  data-par="0.1"
     ---------------------------------------------------------------------- */
  function parallax() {
    var items = $$('[data-par]');
    if (!items.length || reduced) return;

    hub.add(function (s) {
      var vh = s.vh;
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        var r = el.getBoundingClientRect();
        if (r.bottom < -240 || r.top > vh + 240) continue;
        var amt = parseFloat(el.getAttribute('data-par')) || 0.08;
        var off = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (-off * amt * 100).toFixed(2) + 'px,0)';
      }
    });
  }

  /* ----------------------------------------------------------------------
     9. Manifesto — word-by-word illumination
     ---------------------------------------------------------------------- */
  function litText() {
    var host = $('[data-lit]');
    if (!host) return;

    var raw = host.textContent.replace(/\s+/g, ' ').trim();
    var html = host.innerHTML;
    var words = [];

    // rebuild preserving inline <em> markup
    var tmp = doc.createElement('div');
    tmp.innerHTML = html;
    var frag = doc.createDocumentFragment();

    (function walk(src, target) {
      Array.prototype.slice.call(src.childNodes).forEach(function (node) {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { target.appendChild(doc.createTextNode(' ')); return; }
            var s = doc.createElement('span');
            s.className = 'w';
            s.textContent = p;
            target.appendChild(s);
            words.push(s);
          });
        } else if (node.nodeType === 1) {
          var s2 = doc.createElement('span');
          s2.className = 'w';
          s2.appendChild(node.cloneNode(true));
          target.appendChild(s2);
          words.push(s2);
        }
      });
    })(tmp, frag);

    host.textContent = '';
    host.appendChild(frag);
    if (!raw) return;

    if (reduced) { words.forEach(function (w) { w.classList.add('lit'); }); return; }

    var litUpto = -1;
    hub.add(function (s) {
      var r = host.getBoundingClientRect();
      var start = s.vh * 0.86;
      var end = s.vh * 0.24;
      var span = r.height + (start - end);
      var p = clamp((start - r.top) / span, 0, 1);
      var upto = Math.round(p * words.length * 1.12);
      if (upto === litUpto) return;          // only touch the DOM when it changes
      litUpto = upto;
      for (var i = 0; i < words.length; i++) {
        words[i].classList.toggle('lit', i < upto);
      }
    });
  }

  /* ----------------------------------------------------------------------
     10. Hero field  ·  reactive dot lattice
     ---------------------------------------------------------------------- */
  function heroField() {
    var cv = $('.hero__field');
    if (!cv || reduced) return;

    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var orbEl = $('.hero__orb');
    var w = 0, h = 0, pts = [];
    var mx = -9999, my = -9999;
    var t = 0;
    var gap = 32;
    var orb = { x: -9999, y: -9999, r: 0 };
    var live = false;

    function build() {
      var r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      if (!w || !h) return;

      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gap = w < 700 ? 24 : w < 1200 ? 28 : 32;
      pts = [];
      for (var y = gap * 0.5; y < h; y += gap) {
        for (var x = gap * 0.5; x < w; x += gap) {
          pts.push({ x: x, y: y, ox: x, oy: y });
        }
      }

      // The lattice organises itself around the orb, so read the orb's real
      // box rather than guessing at a position.
      if (orbEl && getComputedStyle(orbEl).display !== 'none') {
        var o = orbEl.getBoundingClientRect();
        orb.x = o.left - r.left + o.width / 2;
        orb.y = o.top - r.top + o.height / 2;
        orb.r = o.width / 2;
      } else {
        orb.r = 0;
        orb.x = orb.y = -9999;
      }
    }

    window.addEventListener('mousemove', function (e) {
      var r = cv.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    }, { passive: true });
    window.addEventListener('mouseout', function () { mx = -9999; my = -9999; });

    function draw() {
      if (!live) return;
      if (!w || !h) { requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);
      t += 0.006;

      var R = 190;
      var ringR = orb.r * 0.995;

      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];

        var wave = Math.sin((p.ox * 0.012) + t) * Math.cos((p.oy * 0.014) - t * 0.8);
        var tx = p.ox + wave * 3.2;
        var ty = p.oy + wave * 2.4;

        // ---- orb field: dots inside brighten, dots on the rim gather ----
        var lens = 0, rim = 0;
        if (orb.r > 0) {
          var ox = tx - orb.x, oy = ty - orb.y;
          var od = Math.sqrt(ox * ox + oy * oy) || 1;
          if (od < orb.r * 1.16) {
            lens = Math.max(0, 1 - od / orb.r);
            // slow pulse travelling out from the centre
            lens *= 0.62 + 0.38 * Math.sin(od * 0.045 - t * 2.6);
            lens = Math.max(0, lens);

            var toRim = Math.abs(od - ringR);
            if (toRim < gap * 1.15) {
              rim = 1 - toRim / (gap * 1.15);
              // pull the dot gently onto the ring so a circle reads out of the grid
              tx += (ox / od) * (ringR - od) * rim * 0.62;
              ty += (oy / od) * (ringR - od) * rim * 0.62;
            }
          }
        }

        // ---- cursor repulsion ----
        var dx = tx - mx, dy = ty - my;
        var d = Math.sqrt(dx * dx + dy * dy);
        var near = 0;
        if (d < R) {
          near = 1 - d / R;
          var push = near * near * 30;
          tx += (dx / (d || 1)) * push;
          ty += (dy / (d || 1)) * push;
        }

        p.x = lerp(p.x, tx, 0.12);
        p.y = lerp(p.y, ty, 0.12);

        var rad = 0.8 + near * 1.9 + lens * 1.5 + rim * 1.5;
        var alpha = 0.14 + near * 0.5 + lens * 0.34 + rim * 0.4 + Math.abs(wave) * 0.05;
        var hot = Math.max(near > 0.45 ? near : 0, rim * 0.9, lens * 0.55);

        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, 6.2832);
        ctx.fillStyle = hot > 0.4
          ? 'rgba(222,63,31,' + Math.min(0.92, alpha + 0.18).toFixed(3) + ')'
          : 'rgba(17,16,16,' + Math.min(0.6, alpha).toFixed(3) + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    // Painting ~1200 points every frame while the hero is scrolled far
    // off-screen is pure waste. Run only while it is actually visible.
    function start() { if (!live) { live = true; requestAnimationFrame(draw); } }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting && document.visibilityState === 'visible';
        if (vis) start(); else live = false;
      }, { threshold: 0 }).observe(cv);
    } else { start(); }

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' &&
          cv.getBoundingClientRect().bottom > 0) start();
      else live = false;
    });

    build();
    window.addEventListener('resize', build);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    start();
  }

  /* ----------------------------------------------------------------------
     10b. Mockup tilt — the screens lean towards the pointer
     ---------------------------------------------------------------------- */
  function mockTilt() {
    if (!finePointer || reduced) return;
    $$('.mock').forEach(function (m) {
      var win = $('.mock__win', m);
      if (!win) return;
      var raf = null, tx = 0, ty = 0, cx = 0, cy = 0;

      function run() {
        cx = lerp(cx, tx, 0.2);
        cy = lerp(cy, ty, 0.2);
        win.style.setProperty('--ry', cx.toFixed(2) + 'deg');
        win.style.setProperty('--rx', cy.toFixed(2) + 'deg');
        if (Math.abs(cx - tx) > 0.02 || Math.abs(cy - ty) > 0.02) {
          raf = requestAnimationFrame(run);
        } else { raf = null; }
      }
      function kick() { if (!raf) raf = requestAnimationFrame(run); }

      m.addEventListener('mousemove', function (e) {
        var r = m.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 13;
        ty = ((e.clientY - r.top) / r.height - 0.5) * -9;
        kick();
      });
      m.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
    });
  }

  /* ----------------------------------------------------------------------
     10c. Scroll velocity signal
     Publishes a damped velocity on :root so CSS can lean type and speed up
     marquees while the page is moving. Purely expressive, so it is dropped
     entirely under reduced motion.
     ---------------------------------------------------------------------- */
  function velocity() {
    if (reduced) return;
    var prev = 0;
    hub.add(function (s) {
      var v = clamp(s.vel * 0.09, -4.2, 4.2);
      if (Math.abs(v - prev) < 0.02) return;
      prev = v;
      root.style.setProperty('--sv', v.toFixed(2));
      root.style.setProperty('--sv-abs', Math.abs(v).toFixed(2));
    });
  }

  /* ----------------------------------------------------------------------
     10d. Page transition
     Purpose: prevents the white flash between a paper page and an ink one,
     and keeps continuity across a real page load. Same-origin document
     links only, and never for modified clicks or in-page anchors.
     ---------------------------------------------------------------------- */
  function pageTransition() {
    if (reduced) return;
    var wipe = $('.wipe');
    if (!wipe) return;

    // Lift the cover off the incoming page.
    body.classList.add('wipe-in');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { body.classList.add('wipe-lift'); });
    });
    setTimeout(function () {
      body.classList.remove('wipe-in', 'wipe-lift');
    }, 900);

    doc.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (!/^(\/|\.|[a-zA-Z0-9_-]+\.html)/.test(href)) return;   // same-site documents only

      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;               // same page

      e.preventDefault();
      body.classList.remove('wipe-in', 'wipe-lift');
      body.classList.add('wipe-out');
      setTimeout(function () { location.href = a.href; }, 560);
    });

    // Returning via the back button must not land on a covered page.
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) body.classList.remove('wipe-out', 'wipe-in', 'wipe-lift');
    });
  }

  /* ----------------------------------------------------------------------
     10e. Stagger index
     Writes --i on the children of [data-stagger] so CSS can cascade a delay
     without a rule per child.
     ---------------------------------------------------------------------- */
  function staggerIndex() {
    $$('[data-stagger]').forEach(function (host) {
      Array.prototype.forEach.call(host.children, function (child, i) {
        child.style.setProperty('--i', i);
      });
    });
  }

  /* ----------------------------------------------------------------------
     10f. Pinned horizontal section
     Purpose: storytelling. The section holds the viewport while its own
     timeline plays sideways, so six ideas get read one at a time instead of
     fading in as a grid. Section height is derived from the real track
     width, and the whole thing is skipped on narrow screens where the CSS
     falls back to a vertical stack.
     ---------------------------------------------------------------------- */
  function hSection() {
    var sec = $('[data-hsec]');
    if (!sec || reduced) return;
    var pin = $('.hsec__pin', sec);
    var track = $('[data-htrack]', sec);
    var rail = $('.hsec__rail i', sec);
    if (!pin || !track) return;

    var distance = 0;
    var active = false;

    function measure() {
      // The CSS drops the pin below this width; keep JS out of the way too.
      active = window.matchMedia('(min-width: 861px)').matches;
      if (!active) {
        sec.style.height = '';
        track.style.transform = '';
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(track).paddingInlineStart || 0));
      sec.style.height = (window.innerHeight + distance) + 'px';
    }

    hub.add(function (st) {
      if (!active || !distance) return;
      var top = sec.getBoundingClientRect().top;
      var p = clamp(-top / distance, 0, 1);
      track.style.transform = 'translate3d(' + (-p * distance).toFixed(1) + 'px,0,0)';
      if (rail) rail.style.setProperty('--hp', p.toFixed(4));
    });

    measure();
    window.addEventListener('resize', function () { measure(); hub.measure(); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { measure(); hub.measure(); });
  }

  /* ----------------------------------------------------------------------
     11. Capability accordion
     ---------------------------------------------------------------------- */
  function accordion() {
    var caps = $$('.cap');
    if (!caps.length) return;

    function contentHeight(cap) {
      var inner = $('.cap__panel > div', cap);
      return inner ? inner.offsetHeight : 0;
    }

    function set(cap, open) {
      var panel = $('.cap__panel', cap);
      var btn = $('.cap__btn', cap);
      cap.setAttribute('aria-expanded', String(open));
      if (btn) btn.setAttribute('aria-expanded', String(open));
      if (panel) panel.style.height = open ? contentHeight(cap) + 'px' : '0px';
    }

    caps.forEach(function (cap) {
      var btn = $('.cap__btn', cap);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var open = cap.getAttribute('aria-expanded') === 'true';
        caps.forEach(function (other) { if (other !== cap) set(other, false); });
        set(cap, !open);
      });
    });

    window.addEventListener('resize', function () {
      caps.forEach(function (cap) {
        if (cap.getAttribute('aria-expanded') !== 'true') return;
        var panel = $('.cap__panel', cap);
        if (panel) panel.style.height = contentHeight(cap) + 'px';
      });
    });
  }

  /* ----------------------------------------------------------------------
     12. Clock (IST) + year
     ---------------------------------------------------------------------- */
  function clock() {
    var outs = $$('[data-clock]');
    if (!outs.length) return;
    function tick() {
      var s = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
      outs.forEach(function (o) { o.textContent = s + ' IST'; });
    }
    tick();
    setInterval(tick, 15000);
  }

  function year() {
    var y = String(new Date().getFullYear());
    $$('[data-year]').forEach(function (o) { o.textContent = y; });
  }

  /* ----------------------------------------------------------------------
     13. Copy to clipboard
     ---------------------------------------------------------------------- */
  function copy() {
    $$('[data-copy]').forEach(function (btn) {
      var original = btn.querySelector('.copy-label');
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy');
        var write = navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard.writeText(val)
          : Promise.reject();

        write.then(function () {
          if (!original) return;
          var was = original.textContent;
          original.textContent = 'Copied';
          setTimeout(function () { original.textContent = was; }, 1800);
        }).catch(function () {
          window.prompt('Copy this address', val);
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     14. Form
     ---------------------------------------------------------------------- */
  function form() {
    var f = $('[data-form]');
    if (!f) return;

    $$('.field input, .field textarea', f).forEach(function (i) {
      var wrap = i.closest('.field');
      var sync = function () { wrap.classList.toggle('has-val', !!i.value.trim()); };
      i.addEventListener('input', sync);
      i.addEventListener('blur', sync);
      sync();
    });

    var status = $('.form__status', f);

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(f);
      var endpoint = f.getAttribute('data-endpoint');

      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }

      if (endpoint) {
        if (status) status.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('bad');
            if (status) status.textContent = 'Received. You will hear back within one working day.';
            f.reset();
            $$('.field', f).forEach(function (w) { w.classList.remove('has-val'); });
          })
          .catch(function () {
            if (status) status.textContent = 'Something broke. Email hello@atvdev.studio instead.';
          });
        return;
      }

      // No endpoint configured — fall back to the visitor's mail client.
      var to = f.getAttribute('data-mailto') || 'hello@atvdev.studio';
      var lines = [
        'Name: ' + (data.get('name') || ''),
        'Company: ' + (data.get('company') || ''),
        'Budget: ' + (data.get('budget') || ''),
        '',
        (data.get('brief') || '')
      ].join('\n');

      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('New project — ' + (data.get('name') || 'enquiry')) +
        '&body=' + encodeURIComponent(lines);

      window.location.href = href;
      if (status) status.textContent = 'Opening your mail app…';
    });
  }

  /* ----------------------------------------------------------------------
     15. Marquee duplication (seamless loop)
     ---------------------------------------------------------------------- */
  function marquees() {
    $$('.mq').forEach(function (mq) {
      var row = $('.mq__row', mq);
      if (!row || row.dataset.cloned) return;
      row.dataset.cloned = '1';
      var clone = row.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      mq.appendChild(clone);
    });
  }

  /* ----------------------------------------------------------------------
     16. Work-index hover accent
     ---------------------------------------------------------------------- */
  function projectHover() {
    $$('[data-accent]').forEach(function (el) {
      el.style.setProperty('--pj-accent', el.getAttribute('data-accent'));
      var on = el.getAttribute('data-on-accent');
      if (on) el.style.setProperty('--pj-on-accent', on);
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function init() {
    // The hero reveal is tied to fonts and layout, never to the load curtain.
    if (doc.fonts && doc.fonts.ready) {
      doc.fonts.ready.then(function () { setTimeout(revealNow, 60); });
    } else {
      setTimeout(revealNow, 120);
    }

    marquees();
    splitLines();
    projectHover();
    reveals();
    headerAndProgress();
    menu();
    cursor();
    magnets();
    parallax();
    litText();
    heroField();
    velocity();
    hSection();
    staggerIndex();
    pageTransition();
    mockTilt();
    accordion();
    clock();
    year();
    copy();
    form();
    preloader();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
