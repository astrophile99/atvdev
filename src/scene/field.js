import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  Euler,
  MathUtils,
  Matrix3,
  Matrix4,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Sphere,
  Vector3,
  WebGLRenderer,
} from "three";
import { buildForms } from "./shapes.js";

/**
 * The ATV field — one Points object, eight states, one canvas behind the page.
 *
 * Technique lifted from GetLayers' Helion logo-particle-field (rasterise a mark,
 * scatter → assemble with a per-particle stagger) and extended: every particle
 * carries a target for each form, the vertex shader picks the two it is moving
 * between, and the page's scroll drives a single damped "path position" that
 * says which two those are. Particles are drawn as tiny squares — the logo's
 * pixel dissolve, at field scale.
 *
 * States: 0 dust · 1 logo · 2 browser · 3 dashboard · 4 portfolio · 5 platform
 *         6 apps · 7 lattice
 */

export const STATE = { dust: 0, logo: 1, browser: 2, dashboard: 3, portfolio: 4, platform: 5, apps: 6, lattice: 7 };

const vertexShader = /* glsl */ `
  attribute vec3 aT0; attribute vec3 aT1; attribute vec3 aT2; attribute vec3 aT3;
  attribute vec3 aT4; attribute vec3 aT5; attribute vec3 aT6;
  attribute vec4 aC0; attribute vec4 aC1;
  attribute vec4 aRand;

  uniform float uFrom; uniform float uTo; uniform float uMix;
  uniform float uScaleA; uniform float uScaleB;
  uniform vec3 uOffA; uniform vec3 uOffB;
  uniform float uAlphaA; uniform float uAlphaB;
  uniform float uDriftA; uniform float uDriftB;
  uniform mat3 uRot;
  uniform float uTime; uniform float uIntro; uniform float uTurb;
  uniform vec3 uMouse; uniform float uMouseR; uniform float uMouseF;
  uniform float uPointSize; uniform float uDpr;
  uniform vec3 uInk0; uniform vec3 uInk1; uniform vec3 uInk2;
  uniform float uIvoryK; uniform float uAlphaK;

  varying vec3 vColor;
  varying float vAlpha;

  #define PI 3.14159265

  vec3 formPos(float i) {
    if (i < 0.5) return position;
    if (i < 1.5) return aT0;
    if (i < 2.5) return aT1;
    if (i < 3.5) return aT2;
    if (i < 4.5) return aT3;
    if (i < 5.5) return aT4;
    if (i < 6.5) return aT5;
    return aT6;
  }
  float formCol(float i) {
    if (i < 0.5) return aC0.x;
    if (i < 1.5) return aC0.y;
    if (i < 2.5) return aC0.z;
    if (i < 3.5) return aC0.w;
    if (i < 4.5) return aC1.x;
    if (i < 5.5) return aC1.y;
    if (i < 6.5) return aC1.z;
    return aC1.w;
  }
  vec3 ink(float c) {
    // the neutral ink is held back a touch so the two brand inks carry the form
    if (c < 0.5) return uInk0 * uIvoryK;
    if (c < 1.5) return uInk1;
    return uInk2;
  }
  // A cheap divergence-free-ish swirl — enough to make a morph read as a flow.
  vec3 swirl(vec3 p, float t) {
    return vec3(
      sin(p.y * 2.1 + t) + sin(p.z * 1.7 - t * 0.7),
      sin(p.z * 2.3 - t * 0.8) + sin(p.x * 1.9 + t * 0.6),
      sin(p.x * 2.0 + t * 0.9) + sin(p.y * 1.6 - t)
    ) * 0.5;
  }

  void main() {
    float seed = aRand.x;

    // Per-particle stagger: the form builds along a wave instead of snapping.
    float e = smoothstep(0.0, 1.0, clamp(uMix * 1.5 - seed * 0.5, 0.0, 1.0));

    vec3 a = uRot * (formPos(uFrom) * uScaleA) + uOffA;
    vec3 b = uRot * (formPos(uTo) * uScaleB) + uOffB;
    vec3 p = mix(a, b, e);

    // Mid-flight turbulence — zero at both ends of a morph.
    float tb = sin(e * PI) * uTurb;
    p += swirl(p * 0.45 + seed * 6.0, uTime * 0.6) * tb;

    // Idle life: a breath for the forms, a slow current for the dust.
    float drift = mix(uDriftA, uDriftB, e);
    p += vec3(
      sin(uTime * 0.31 + seed * 40.0),
      cos(uTime * 0.27 + seed * 31.0),
      sin(uTime * 0.23 + seed * 17.0)
    ) * drift;

    // Intro: everything begins as a far, wide spray and is pulled home.
    float ei = smoothstep(0.0, 1.0, clamp(uIntro * 1.6 - seed * 0.6, 0.0, 1.0));
    vec3 spray = position * vec3(3.4, 2.6, 1.6) + vec3(0.0, 0.0, 2.5 + aRand.z * 4.0);
    p = mix(spray, p, ei);

    // Pointer: a small, tight parting around the cursor.
    vec2 d = p.xy - uMouse.xy;
    float dist = length(d);
    float f = (1.0 - smoothstep(0.0, uMouseR, dist)) * uMouseF;
    p.xy += (d / max(dist, 1e-3)) * f * uMouseR * 0.45;
    p.z += f * uMouseR * 0.5;

    vec4 mv = viewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float sz = aRand.y * uPointSize * uDpr * (10.0 / -mv.z);
    gl_PointSize = clamp(sz, 1.0, 8.0 * uDpr);

    vColor = mix(ink(formCol(uFrom)), ink(formCol(uTo)), e);

    float tw = 0.7 + 0.3 * sin(uTime * (1.2 + aRand.w * 1.6) + seed * 60.0);
    vAlpha = tw * mix(uAlphaA, uAlphaB, e) * ei * uAlphaK;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    // Square pixels with a soft edge — the dissolve cell, not a glow sprite.
    vec2 c = abs(gl_PointCoord - 0.5);
    float m = max(c.x, c.y);
    float a = vAlpha * (1.0 - smoothstep(0.42, 0.5, m));
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

export class Field {
  constructor(canvas, { count, reduced = false, mobile = false }) {
    this.canvas = canvas;
    this.reduced = reduced;
    this.mobile = mobile;
    this.count = count;

    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    this.renderer.setClearColor(0x000000, 0);
    this.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.75 : 2);
    this.renderer.setPixelRatio(this.dpr);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.set(0, 0, 10);

    const { forms, dust } = buildForms(count);
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(dust.pos, 3));
    const order = ["logo", "browser", "dashboard", "portfolio", "platform", "apps", "lattice"];
    order.forEach((k, i) => g.setAttribute(`aT${i}`, new BufferAttribute(forms[k].pos, 3)));

    const c0 = new Float32Array(count * 4);
    const c1 = new Float32Array(count * 4);
    const rnd = new Float32Array(count * 4);
    const cols = [dust.col, ...order.map((k) => forms[k].col)];
    for (let i = 0; i < count; i++) {
      for (let k = 0; k < 4; k++) {
        c0[i * 4 + k] = cols[k][i];
        c1[i * 4 + k] = cols[k + 4][i];
      }
      rnd[i * 4] = Math.random();
      // size: fine, even grain — only a rare cell a little heavier
      const s = Math.random();
      rnd[i * 4 + 1] = 0.8 + s * s * s * s * 0.9;
      rnd[i * 4 + 2] = Math.random();
      rnd[i * 4 + 3] = Math.random();
    }
    g.setAttribute("aC0", new BufferAttribute(c0, 4));
    g.setAttribute("aC1", new BufferAttribute(c1, 4));
    g.setAttribute("aRand", new BufferAttribute(rnd, 4));
    g.boundingSphere = new Sphere(new Vector3(), 100);

    this.uniforms = {
      uFrom: { value: 1 },
      uTo: { value: 1 },
      uMix: { value: 0 },
      uScaleA: { value: 1 },
      uScaleB: { value: 1 },
      uOffA: { value: new Vector3() },
      uOffB: { value: new Vector3() },
      uAlphaA: { value: 1 },
      uAlphaB: { value: 1 },
      uDriftA: { value: 0.01 },
      uDriftB: { value: 0.01 },
      uRot: { value: new Matrix3() },
      uTime: { value: 0 },
      uIntro: { value: reduced ? 1 : 0 },
      uTurb: { value: reduced ? 0 : 0.55 },
      uMouse: { value: new Vector3(999, 999, 0) },
      uMouseR: { value: 1.1 },
      uMouseF: { value: 0 },
      uPointSize: { value: mobile ? 1.55 : 1.6 },
      uDpr: { value: this.dpr },
      uInk0: { value: new Color("#eef0eb") },
      uInk1: { value: new Color("#19c37d") },
      uInk2: { value: new Color("#2f6bff") },
      uIvoryK: { value: 0.78 },
      uAlphaK: { value: 1 },
    };

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: CustomBlending,
      blendEquation: AddEquation,
      // Premultiplied additive: overlapping cells brighten, the ground stays black.
      blendSrc: OneFactor,
      blendDst: OneFactor,
    });

    this.points = new Points(g, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);

    // Scroll-path state
    this.track = []; // [{ y, key }]
    this.path = 0; // damped
    this.pathTarget = 0;
    this.resolveState = null; // (key) => params

    // Pointer
    this.pointer = { x: 0, y: 0, nx: 0, ny: 0, active: false };
    this.mouseF = 0;
    this.rot = { x: 0, y: 0 };
    this._rotM = new Matrix4();
    this._euler = new Euler();

    this.time = 0;
    this.drawn = false;
    this.resize();
  }

  /* ───────── viewport ───────── */

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const visH = 2 * Math.tan(MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    this.view = { w, h, visH, visW: visH * this.camera.aspect, mobile: w < 760 };
  }

  /** px → world on the z=0 plane */
  toWorld(px, py) {
    return [(px / this.view.w - 0.5) * this.view.visW, -(py / this.view.h - 0.5) * this.view.visH];
  }

  setPointer(px, py) {
    this.pointer.x = px;
    this.pointer.y = py;
    this.pointer.nx = (px / this.view.w) * 2 - 1;
    this.pointer.ny = -((py / this.view.h) * 2 - 1);
    this.pointer.active = true;
  }

  /* ───────── scroll path ───────── */

  setTrack(track, resolveState) {
    this.track = track;
    this.resolveState = resolveState;
  }

  /** scrollY → fractional index into the track */
  pathAt(scrollY) {
    const t = this.track;
    if (!t.length) return 0;
    if (scrollY <= t[0].y) return 0;
    for (let i = 0; i < t.length - 1; i++) {
      const a = t[i],
        b = t[i + 1];
      if (scrollY <= b.y) {
        const span = Math.max(1, b.y - a.y);
        return i + (scrollY - a.y) / span;
      }
    }
    return t.length - 1;
  }

  setScroll(scrollY, immediate = false) {
    this.pathTarget = this.pathAt(scrollY);
    if (immediate || this.reduced) this.path = this.pathTarget;
  }

  /* ───────── frame ───────── */

  render(dt, intro) {
    this.time += this.reduced ? 0 : dt;
    const u = this.uniforms;
    u.uTime.value = this.time;
    if (intro !== undefined) u.uIntro.value = intro;

    // One frame-rate-independent damp gives the whole field its weight.
    const k = 1 - Math.exp(-3.2 * Math.min(dt, 0.1));
    this.path += (this.pathTarget - this.path) * (this.reduced ? 1 : k);

    const t = this.track;
    if (t.length && this.resolveState) {
      const i0 = Math.max(0, Math.min(t.length - 1, Math.floor(this.path)));
      const i1 = Math.min(t.length - 1, i0 + 1);
      const mix = this.path - i0;
      const A = this.resolveState(t[i0].key, this.view);
      const B = this.resolveState(t[i1].key, this.view);
      u.uFrom.value = A.form;
      u.uTo.value = B.form;
      // Same state on both ends = a hold; collapse the mix so no particle travels.
      u.uMix.value = A.key === B.key ? 0 : mix;
      u.uScaleA.value = A.scale;
      u.uScaleB.value = B.scale;
      u.uOffA.value.set(A.x, A.y, A.z || 0);
      u.uOffB.value.set(B.x, B.y, B.z || 0);
      u.uAlphaA.value = A.alpha;
      u.uAlphaB.value = B.alpha;
      u.uDriftA.value = A.drift;
      u.uDriftB.value = B.drift;
      this._tilt = A.tilt + (B.tilt - A.tilt) * mix;
    }

    // Cursor tilt, eased; and a slow idle sway so a still page is never dead.
    const tilt = this._tilt ?? 1;
    const idle = this.reduced ? 0 : Math.sin(this.time * 0.35) * 0.05;
    const ty = (this.pointer.active ? this.pointer.nx * 0.32 : 0) * tilt + idle;
    const tx = (this.pointer.active ? -this.pointer.ny * 0.18 : 0) * tilt;
    const kr = this.reduced ? 1 : 1 - Math.exp(-4 * Math.min(dt, 0.1));
    this.rot.x += (tx - this.rot.x) * kr;
    this.rot.y += (ty - this.rot.y) * kr;
    this._euler.set(this.rot.x, this.rot.y, 0);
    this._rotM.makeRotationFromEuler(this._euler);
    u.uRot.value.setFromMatrix4(this._rotM);

    // Pointer force fades in when the cursor moves, out when it rests.
    if (this.pointer.active && !this.reduced) {
      const [wx, wy] = this.toWorld(this.pointer.x, this.pointer.y);
      u.uMouse.value.set(wx, wy, 0);
      this.mouseF += (1 - this.mouseF) * (1 - Math.exp(-6 * dt));
    }
    u.uMouseF.value = this.mouseF;
    u.uMouseR.value = this.view.visH * 0.05;

    this.renderer.render(this.scene, this.camera);
    this.drawn = true;
  }

  /**
   * Light: dark ink on paper, normal (premultiplied) blending — additive light
   * would vanish into white. Dark: the original additive glow.
   */
  setTheme(theme) {
    const u = this.uniforms;
    const light = theme === "light";
    u.uInk0.value.set(light ? "#0a0e0d" : "#eef0eb");
    u.uInk1.value.set(light ? "#0e9a60" : "#19c37d");
    u.uInk2.value.set(light ? "#2f6bff" : "#2f6bff");
    u.uIvoryK.value = light ? 1 : 0.78;
    u.uAlphaK.value = light ? 0.92 : 1;
    this.material.blendDst = light ? OneMinusSrcAlphaFactor : OneFactor;
    this.material.needsUpdate = true;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
