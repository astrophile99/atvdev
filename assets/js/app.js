/* ==========================================================================
   atvdev v2 — core interaction engine
   No dependencies. One scroll listener, one rAF loop, everything else
   subscribes. Reduced-motion and coarse-pointer aware throughout.
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
     Scroll hub — one listener, one rAF loop, everything scroll-driven
     subscribes here. Publishes --sv (signed velocity) on :root for CSS.
     ---------------------------------------------------------------------- */
  var hub = (function () {
    var subs = [];
    var last = window.scrollY;
    var vel = 0;
    var running = false;
    var idle = 0;
    var max = 1;

    function measure() { max = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight); }

    function frame() {
      var y = window.scrollY;
      var delta = y - last;
      last = y;
      vel += (delta - vel) * 0.18;
      if (Math.abs(vel) < 0.04) vel = 0;

      var state = { y: y, vel: vel, max: max, progress: clamp(y / max, 0, 1), vh: window.innerHeight };
      for (var i = 0; i < subs.length; i++) subs[i](state);

      if (Math.abs(vel) > 0.04) { idle = 0; requestAnimationFrame(frame); }
      else if (idle < 4) { idle++; requestAnimationFrame(frame); }
      else { running = false; }
    }
    function kick() { idle = 0; if (!running) { running = true; requestAnimationFrame(frame); } }

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', function () { measure(); kick(); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { measure(); kick(); });
    measure();

    return { add: function (fn) { subs.push(fn); kick(); }, kick: kick, measure: measure };
  })();

  /* ----------------------------------------------------------------------
     Velocity signal on :root — CSS leans artwork / speeds marquees on it.
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
     Preloader — short, real. Waits on fonts + a minimum dwell so the sun
     pulse reads as intentional rather than a flash.
     ---------------------------------------------------------------------- */
  function preloader() {
    var pre = $('.pre');
    if (!pre) { body.classList.add('loaded'); revealNow(); return; }
    if (reduced) { body.classList.add('loaded'); revealNow(); return; }

    var minDwell = new Promise(function (res) { setTimeout(res, 900); });
    var fontsReady = (doc.fonts && doc.fonts.ready) ? doc.fonts.ready : Promise.resolve();
    Promise.all([minDwell, fontsReady]).then(finish, finish);
    setTimeout(finish, 3200); // failsafe

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      body.classList.add('loaded');
      setTimeout(function () { if (pre.parentNode) pre.remove(); }, 1100);
      revealNow();
    }
  }

  /* ----------------------------------------------------------------------
     Split text — word layer always, character layer on [data-chars].
     ---------------------------------------------------------------------- */
  function splitLines() {
    $$('.split').forEach(function (el) {
      $$('.ln', el).forEach(function (line) {
        var nodes = Array.prototype.slice.call(line.childNodes);
        var frag = doc.createDocumentFragment();
        nodes.forEach(function (node) {
          if (node.nodeType === 3) {
            node.textContent.split(/(\s+)/).forEach(function (p) {
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

      if (el.hasAttribute('data-chars')) {
        $$('.wd', el).forEach(function (w) {
          var inner = w.firstElementChild;
          var host = inner || w;
          var t = host.textContent;
          host.textContent = '';
          for (var c = 0; c < t.length; c++) {
            var ch = doc.createElement('span');
            ch.className = 'ch';
            ch.textContent = t[c];
            host.appendChild(ch);
          }
        });
        $$('.ch', el).forEach(function (c, i) { c.style.setProperty('--wd', (i * 0.016).toFixed(3) + 's'); });
      } else {
        $$('.wd', el).forEach(function (w, i) { w.style.setProperty('--wd', (i * 0.07).toFixed(3) + 's'); });
      }

      el.addEventListener('transitionend', function once(ev) {
        if (ev.propertyName !== 'transform') return;
        $$('.wd, .ch', el).forEach(function (n) { n.style.willChange = 'auto'; });
        el.removeEventListener('transitionend', once);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Scramble text — data-scramble: resolves from random glyphs into the
     real string on reveal. Cheap, no dependency.
     ---------------------------------------------------------------------- */
  var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  function scrambleInto(el, final, duration) {
    if (reduced) { el.textContent = final; return; }
    var frame = 0;
    var total = Math.round((duration || 700) / 33);
    var resolved = 0;
    (function tick() {
      frame++;
      resolved = Math.floor((frame / total) * final.length);
      var out = '';
      for (var i = 0; i < final.length; i++) {
        if (final[i] === ' ') { out += ' '; continue; }
        out += i < resolved ? final[i] : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      el.textContent = out;
      if (frame < total) requestAnimationFrame(tick); else el.textContent = final;
    })();
  }
  function scrambleText() {
    var items = $$('[data-scramble]');
    if (!items.length) return;
    items.forEach(function (el) { el.dataset.final = el.textContent; });
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { scrambleInto(el, el.dataset.final); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        scrambleInto(e.target, e.target.dataset.final, 800);
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------------------
     Reveals — IntersectionObserver + class toggle. Hero content reveals on
     load (revealNow), everything else on scroll.
     ---------------------------------------------------------------------- */
  var revealSel = '[data-rise], [data-fade], [data-clip], [data-stagger], .split';
  var heroSel = '[data-hero] [data-rise], [data-hero] [data-fade], [data-hero] [data-clip], ' +
                '[data-hero] [data-stagger], [data-hero] .split';

  function revealNow() {
    $$(heroSel).forEach(function (el, i) { setTimeout(function () { el.classList.add('in'); }, 90 + i * 80); });
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
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    items.forEach(function (el) {
      if (el.closest('[data-hero]') || el.hasAttribute('data-hero')) return;
      io.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     Word-by-word illumination — a paragraph lights up as it crosses the
     viewport. Diffs against the last lit count so it only touches the DOM
     on an actual change, not every frame.
     ---------------------------------------------------------------------- */
  function litText() {
    $$('[data-lit]').forEach(function (host) {
      var raw = host.textContent.replace(/\s+/g, ' ').trim();
      if (!raw) return;
      var tmp = doc.createElement('div');
      tmp.innerHTML = host.innerHTML;
      var frag = doc.createDocumentFragment();
      var words = [];
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

      if (reduced) { words.forEach(function (w) { w.classList.add('lit'); }); return; }

      var litUpto = -1;
      hub.add(function (s) {
        var r = host.getBoundingClientRect();
        var start = s.vh * 0.85;
        var end = s.vh * 0.25;
        var span = r.height + (start - end);
        var p = clamp((start - r.top) / span, 0, 1);
        var upto = Math.round(p * words.length * 1.1);
        if (upto === litUpto) return;
        litUpto = upto;
        for (var i = 0; i < words.length; i++) words[i].classList.toggle('lit', i < upto);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Work rail — highlights the current card in the sticky stack.
     IntersectionObserver is occlusion-blind: once a sticky card is pinned at
     top:0 it stays geometrically "100% intersecting" even after a later
     sibling has visually covered it, so threshold-crossing never fires a
     clean "this one left" event. Deriving the active index directly from
     scroll position against each card's own document slot is exact instead.
     ---------------------------------------------------------------------- */
  function workRail() {
    var cards = $$('.wcard');
    var rail = $$('.work__rail a');
    var stack = $('.work__stack');
    if (!cards.length || !rail.length || !stack) return;
    var tops = [];
    function measure() {
      // Measuring the sticky cards themselves is unsafe: once one is
      // engaged, its rect.top clamps to 0 and no longer reflects where it
      // actually sits in the document. .work__stack is a plain block
      // element (never sticky), so its own top is always truthful — every
      // card's slot start is then just an arithmetic offset from it.
      var stackTop = stack.getBoundingClientRect().top + window.scrollY;
      var cardH = cards[0].getBoundingClientRect().height || window.innerHeight;
      tops = cards.map(function (_, i) { return stackTop + i * cardH; });
    }
    measure();
    window.addEventListener('resize', measure);

    var lastActive = -1;
    hub.add(function (s) {
      var active = 0;
      for (var i = 0; i < tops.length; i++) { if (s.y >= tops[i] - 4) active = i; }
      if (active === lastActive) return;
      lastActive = active;
      rail.forEach(function (a, ri) { a.classList.toggle('is-active', ri === active); });
    });
  }

  /* ----------------------------------------------------------------------
     Pinned horizontal section — the section holds the viewport while its
     own track drags sideways. Height is derived from the real track width;
     CSS drops the pin below 861px, so JS matches that and gets out of the
     way rather than fighting the stylesheet.
     ---------------------------------------------------------------------- */
  function hSections() {
    $$('[data-hsec]').forEach(function (sec) {
      if (reduced) return;
      var pin = $('.hsec__pin', sec);
      var track = $('[data-htrack]', sec);
      var rail = $('.hsec__rail i', sec);
      if (!pin || !track) return;

      var distance = 0;
      var active = false;

      function measure() {
        active = window.matchMedia('(min-width: 861px)').matches;
        if (!active) { sec.style.height = ''; track.style.transform = ''; return; }
        var pad = parseFloat(getComputedStyle(track).paddingInlineStart || 0);
        distance = Math.max(0, track.scrollWidth - window.innerWidth + pad);
        sec.style.height = (window.innerHeight + distance) + 'px';
      }

      hub.add(function () {
        if (!active || !distance) return;
        var top = sec.getBoundingClientRect().top;
        var p = clamp(-top / distance, 0, 1);
        track.style.transform = 'translate3d(' + (-p * distance).toFixed(1) + 'px,0,0)';
        if (rail) rail.style.setProperty('--hp', p.toFixed(4));
      });

      measure();
      window.addEventListener('resize', function () { measure(); hub.measure(); });
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { measure(); hub.measure(); });
    });
  }

  /* ----------------------------------------------------------------------
     Ignite — the closing signature. A burst of spark spans from the click
     point, self-removing once their animation ends. Purely decorative, so
     it's skipped entirely under reduced motion via the CSS itself.
     ---------------------------------------------------------------------- */
  function ignite() {
    var targets = $$('[data-ignite]');
    if (!targets.length || reduced) return;
    var COLORS = ['#DE3F1F', '#F0A828', '#FF7A5E'];

    targets.forEach(function (host) {
      host.addEventListener('click', function (e) {
        var r = host.getBoundingClientRect();
        var x = (e.clientX != null ? e.clientX - r.left : r.width / 2);
        var y = (e.clientY != null ? e.clientY - r.top : r.height / 2);
        var n = 14;
        for (var i = 0; i < n; i++) {
          var s = doc.createElement('span');
          s.className = 'ignite__spark';
          var angle = (Math.PI * 2 * i) / n + Math.random() * 0.4;
          var dist = 40 + Math.random() * 70;
          s.style.setProperty('--x', x + 'px');
          s.style.setProperty('--y', y + 'px');
          s.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(1) + 'px');
          s.style.setProperty('--dy', (Math.sin(angle) * dist).toFixed(1) + 'px');
          s.style.setProperty('--c', COLORS[i % COLORS.length]);
          s.style.setProperty('--dur', (0.55 + Math.random() * 0.35).toFixed(2) + 's');
          s.style.setProperty('--delay', (Math.random() * 0.08).toFixed(2) + 's');
          host.appendChild(s);
          (function (el) { el.addEventListener('animationend', function () { el.remove(); }); })(s);
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Header + progress
     ---------------------------------------------------------------------- */
  function headerAndProgress() {
    var hdr = $('.hdr');
    var prog = $('.prog');
    var last = window.scrollY;
    hub.add(function (s) {
      var y = s.y;
      if (prog) prog.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')';
      if (hdr) {
        hdr.classList.toggle('is-stuck', y > 24);
        if (!body.classList.contains('menu-open')) hdr.classList.toggle('is-hidden', y > last && y > 320);
      }
      last = y;
    });
  }

  /* ----------------------------------------------------------------------
     Menu overlay
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
    btn.addEventListener('click', function () { set(!body.classList.contains('menu-open')); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) set(false); });
  }

  /* ----------------------------------------------------------------------
     Custom cursor with contextual labels.
     Any element with [data-cursor="LABEL TEXT"] shows that label; plain
     links/buttons get the smaller "link" ring; everything else is a dot.
     ---------------------------------------------------------------------- */
  function cursor() {
    if (!finePointer || reduced) return;
    var ring = doc.createElement('div'); ring.className = 'cur';
    var label = doc.createElement('span'); label.className = 'cur__label';
    ring.appendChild(label);
    var dot = doc.createElement('div'); dot.className = 'cur-dot';
    body.appendChild(ring); body.appendChild(dot);

    var tx = innerWidth / 2, ty = innerHeight / 2, rx = tx, ry = ty;
    doc.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!body.classList.contains('cursor-ready')) body.classList.add('cursor-ready');
    }, { passive: true });
    doc.addEventListener('mouseleave', function () { body.classList.remove('cursor-ready'); });
    doc.addEventListener('mouseenter', function () { body.classList.add('cursor-ready'); });

    (function loop() {
      var t = body.classList.contains('cur-label') ? 0.26 : 0.16;
      rx = lerp(rx, tx, t); ry = lerp(ry, ty, t);
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      dot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
      requestAnimationFrame(loop);
    })();

    doc.addEventListener('mouseover', function (e) {
      var labelled = e.target.closest('[data-cursor]');
      if (labelled) {
        label.textContent = labelled.getAttribute('data-cursor') || '';
        body.classList.add('cur-label');
        body.classList.remove('cur-link');
        return;
      }
      var link = e.target.closest('a, button, input, textarea, select, [role="button"]');
      body.classList.remove('cur-label');
      body.classList.toggle('cur-link', !!link);
    });
  }

  /* ----------------------------------------------------------------------
     Magnetic elements
     ---------------------------------------------------------------------- */
  function magnets() {
    if (!finePointer || reduced) return;
    $$('[data-magnet]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnet')) || 0.4;
      var raf = null, cx = 0, cy = 0, tx = 0, ty = 0;
      function run() {
        cx = lerp(cx, tx, 0.2); cy = lerp(cy, ty, 0.2);
        el.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
        if (Math.abs(cx - tx) > 0.1 || Math.abs(cy - ty) > 0.1) raf = requestAnimationFrame(run); else raf = null;
      }
      function kick() { if (!raf) raf = requestAnimationFrame(run); }
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * strength;
        ty = (e.clientY - (r.top + r.height / 2)) * strength;
        kick();
      });
      el.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
    });
  }

  /* ----------------------------------------------------------------------
     Page transition — same-origin document links only.
     ---------------------------------------------------------------------- */
  function pageTransition() {
    if (reduced) return;
    var wipe = $('.wipe');
    if (!wipe) return;

    body.classList.add('wipe-in');
    requestAnimationFrame(function () { requestAnimationFrame(function () { body.classList.add('wipe-lift'); }); });
    setTimeout(function () { body.classList.remove('wipe-in', 'wipe-lift'); }, 900);

    doc.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (!/^(\/|\.|[a-zA-Z0-9_-]+\.html)/.test(href)) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      e.preventDefault();
      body.classList.remove('wipe-in', 'wipe-lift');
      body.classList.add('wipe-out');
      setTimeout(function () { location.href = a.href; }, 520);
    });

    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) body.classList.remove('wipe-out', 'wipe-in', 'wipe-lift');
    });
  }

  /* ----------------------------------------------------------------------
     Stagger index — writes --i on children of [data-stagger].
     ---------------------------------------------------------------------- */
  function staggerIndex() {
    $$('[data-stagger]').forEach(function (host) {
      Array.prototype.forEach.call(host.children, function (child, i) { child.style.setProperty('--i', i); });
    });
  }

  /* ----------------------------------------------------------------------
     Marquee duplication (seamless loop)
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
     Accordion — measured height, works everywhere.
     ---------------------------------------------------------------------- */
  function accordion() {
    var groups = $$('[data-accordion]');
    if (!groups.length) return;
    groups.forEach(function (group) {
      var items = $$('.acc-item', group);
      function contentHeight(item) { var inner = $('.acc-panel > div', item); return inner ? inner.offsetHeight : 0; }
      function set(item, open) {
        var panel = $('.acc-panel', item);
        var btn = $('.acc-btn', item);
        item.setAttribute('aria-expanded', String(open));
        if (btn) btn.setAttribute('aria-expanded', String(open));
        if (panel) panel.style.height = open ? contentHeight(item) + 'px' : '0px';
      }
      items.forEach(function (item) {
        var btn = $('.acc-btn', item);
        if (!btn) return;
        btn.addEventListener('click', function () {
          var open = item.getAttribute('aria-expanded') === 'true';
          items.forEach(function (o) { if (o !== item) set(o, false); });
          set(item, !open);
        });
      });
      window.addEventListener('resize', function () {
        items.forEach(function (item) {
          if (item.getAttribute('aria-expanded') !== 'true') return;
          var panel = $('.acc-panel', item);
          if (panel) panel.style.height = contentHeight(item) + 'px';
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     Clock / year / copy-to-clipboard / form
     ---------------------------------------------------------------------- */
  function clock() {
    var outs = $$('[data-clock]');
    if (!outs.length) return;
    function tick() {
      var s = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
      outs.forEach(function (o) { o.textContent = s + ' IST'; });
    }
    tick(); setInterval(tick, 15000);
  }
  function year() { var y = String(new Date().getFullYear()); $$('[data-year]').forEach(function (o) { o.textContent = y; }); }

  function copy() {
    $$('[data-copy]').forEach(function (btn) {
      var original = btn.querySelector('.copy-label');
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy');
        var write = navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(val) : Promise.reject();
        write.then(function () {
          if (!original) return;
          var was = original.textContent;
          original.textContent = 'Copied';
          setTimeout(function () { original.textContent = was; }, 1800);
        }).catch(function () { window.prompt('Copy this address', val); });
      });
    });
  }

  function form() {
    var f = $('[data-form]');
    if (!f) return;
    $$('.field input, .field textarea', f).forEach(function (i) {
      var wrap = i.closest('.field');
      var sync = function () { wrap.classList.toggle('has-val', !!i.value.trim()); };
      i.addEventListener('input', sync); i.addEventListener('blur', sync); sync();
    });
    var status = $('.form__status', f);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(f);
      var endpoint = f.getAttribute('data-endpoint');
      if (!f.checkValidity()) { f.reportValidity(); return; }
      if (endpoint) {
        if (status) status.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error('bad'); if (status) status.textContent = 'Received. You will hear back within one working day.'; f.reset(); $$('.field', f).forEach(function (w) { w.classList.remove('has-val'); }); })
          .catch(function () { if (status) status.textContent = 'Something broke. Email hello@atvdev.studio instead.'; });
        return;
      }
      var to = f.getAttribute('data-mailto') || 'hello@atvdev.studio';
      var lines = ['Name: ' + (data.get('name') || ''), 'Company: ' + (data.get('company') || ''), 'Budget: ' + (data.get('budget') || ''), '', (data.get('brief') || '')].join('\n');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('New project — ' + (data.get('name') || 'enquiry')) + '&body=' + encodeURIComponent(lines);
      if (status) status.textContent = 'Opening your mail app…';
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  window.atvdev = window.atvdev || {};
  window.atvdev.hub = hub;
  window.atvdev.reduced = reduced;
  window.atvdev.finePointer = finePointer;
  window.atvdev.$ = $; window.atvdev.$$ = $$;
  window.atvdev.clamp = clamp; window.atvdev.lerp = lerp;

  function init() {
    marquees();
    splitLines();
    scrambleText();
    litText();
    workRail();
    hSections();
    ignite();
    reveals();
    headerAndProgress();
    menu();
    cursor();
    magnets();
    velocity();
    staggerIndex();
    pageTransition();
    accordion();
    clock();
    year();
    copy();
    form();
    preloader();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})();
