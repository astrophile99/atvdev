/* ==========================================================================
   atvdev v2 — hero control panel
   Purpose: the visitor re-art-directs the page in real time, so the studio
   demonstrates "we build interfaces" by handing them one in the first five
   seconds. Every dial writes a CSS custom property; the palette and motion
   respond via color-mix() and animation-duration formulas already wired in
   tokens.css / sections.css — this file only reads input and writes vars.
   Sound is synthesized live (Web Audio), off by default, and never required
   to understand the panel.
   ========================================================================== */
(function () {
  'use strict';
  if (!window.atvdev) return;

  var doc = document;
  var root = doc.documentElement;
  var $ = window.atvdev.$;
  var $$ = window.atvdev.$$;
  var clamp = window.atvdev.clamp;

  var panel = $('.panel');
  if (!panel) return;

  /* ---------- live palette mix ----------
     Resolved in JS rather than a nested CSS color-mix()/calc() chain — that
     approach parsed fine but proved unreliable to recompute across rapid
     dial changes in testing. This is the site's centerpiece interaction, so
     it gets the boring, deterministic implementation: interpolate RGB by
     hand and write the resolved colour straight into --paper-live. */
  var PALETTE = {
    day:   [251, 244, 230],   // #FBF4E6
    night: [30, 25, 18]       // #1E1912
  };
  var AMBER = [240, 168, 40]; // #F0A828
  var SKY   = [111, 183, 222]; // #6FB7DE

  function mixRgb(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t)
    ];
  }

  var state = { warmth: 0, night: false };
  function applyRetune() {
    var base = state.night ? PALETTE.night : PALETTE.day;
    var mixed = base;
    if (state.warmth > 0) mixed = mixRgb(base, AMBER, state.warmth * 0.22);
    else if (state.warmth < 0) mixed = mixRgb(base, SKY, -state.warmth * 0.24);
    root.style.setProperty('--paper-live', 'rgb(' + mixed[0] + ' ' + mixed[1] + ' ' + mixed[2] + ')');
  }
  applyRetune(); // resting state, before any interaction

  /* ---------- tiny synth, built lazily on first real interaction ---------- */
  var ctx = null;
  var soundOn = false;
  function ensureCtx() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    return ctx;
  }
  function tick(freq, vol) {
    if (!soundOn) return;
    var c = ensureCtx();
    if (!c) return;
    if (c.state === 'suspended') c.resume();
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq || 660;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(c.destination);
    var t = c.currentTime;
    gain.gain.linearRampToValueAtTime(vol || 0.05, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  /* ---------- warmth ---------- */
  var warmthInput = $('[data-dial="warmth"]', panel);
  if (warmthInput) {
    var lastNotch = 0;
    warmthInput.addEventListener('input', function () {
      var v = parseFloat(warmthInput.value);
      root.style.setProperty('--warmth', v.toFixed(3));
      state.warmth = v;
      applyRetune();
      var notch = Math.round(v * 8);
      if (notch !== lastNotch) { tick(520 + notch * 22, 0.035); lastNotch = notch; }
    });
  }

  /* ---------- energy (knob) ---------- */
  var energyInput = $('[data-dial="energy"]', panel);
  var knobDial = $('.knob__dial', panel);
  if (energyInput) {
    var applyEnergy = function (fromUser) {
      var v = clamp(parseFloat(energyInput.value), 0, 1);
      root.style.setProperty('--energy', v.toFixed(3));
      if (knobDial) knobDial.style.transform = 'translateX(-50%) rotate(' + (v * 260 - 130).toFixed(1) + 'deg)';
      if (fromUser) tick(380 + v * 500, 0.03);
    };
    energyInput.addEventListener('input', function () { applyEnergy(true); });
    applyEnergy(false);
  }

  /* ---------- night toggle ---------- */
  var nightBtn = $('[data-dial-toggle="night"]', panel);
  if (nightBtn) {
    nightBtn.addEventListener('click', function () {
      var on = nightBtn.getAttribute('aria-pressed') === 'true';
      var next = !on;
      nightBtn.setAttribute('aria-pressed', String(next));
      root.setAttribute('data-theme', next ? 'night' : 'day');
      root.style.setProperty('--night', next ? '1' : '0');
      state.night = next;
      applyRetune();
      tick(next ? 300 : 700, 0.045);
      try { localStorage.setItem('atvdev-theme', next ? 'night' : 'day'); } catch (e) {}
    });
  }

  /* ---------- sound toggle ---------- */
  var soundBtn = $('[data-dial-sound]', panel);
  if (soundBtn) {
    soundBtn.addEventListener('click', function () {
      soundOn = !soundOn;
      soundBtn.setAttribute('aria-pressed', String(soundOn));
      if (soundOn) { ensureCtx(); tick(660, 0.05); }
    });
  }

  /* ---------- restore a returning visitor's night preference ---------- */
  try {
    var saved = localStorage.getItem('atvdev-theme');
    if (saved === 'night') {
      root.setAttribute('data-theme', 'night');
      root.style.setProperty('--night', '1');
      if (nightBtn) nightBtn.setAttribute('aria-pressed', 'true');
      state.night = true;
      applyRetune();
    }
  } catch (e) {}
})();
