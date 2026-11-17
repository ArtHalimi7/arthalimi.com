import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from 'ogl';
import { introA, introB, introFill, introMix, introOn, introScale, introX, introY, limeAmt, textReady } from '../lib/store';

/*
 * One fixed point cloud behind the whole page. Five shapes share the same points:
 *   0 sphere (with a lime scan ring)   1 scattered clusters   2 ring   3 waving field   4 cube lattice
 * Sections opt in with data-shape (and optional data-x / data-mx / data-my / data-scale / data-alpha).
 * As the page scrolls the cloud morphs between the shapes of the sections around the middle of the screen.
 * Inside the lime section (limeAmt) the points turn black.
 */

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec3 aChaos;
  attribute vec3 aTorus;
  attribute vec3 aPlane;
  attribute vec3 aCube;
  attribute vec3 aText;
  attribute float seed;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uA;
  uniform float uB;
  uniform float uMix;
  uniform float uRot;
  uniform vec2 uMouse;
  uniform vec3 uShift;
  uniform float uScale;
  uniform float uInk;
  uniform float uAlpha;
  uniform float uDpr;
  uniform float uDist;
  uniform float uFill;
  uniform float uTextHalfW;
  varying float vLime;
  varying float vAlpha;

  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i), f), dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                   mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
               mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                   mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
  }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }

  vec3 shape(float i) {
    if (i < 0.5) {
      vec3 s = position;
      float n = noise(s * 1.35 + vec3(0.0, uTime * 0.16, uTime * 0.1));
      return s + normalize(s) * n * 0.16;
    }
    if (i < 1.5) {
      return aChaos + vec3(sin(uTime * 0.31 + seed * 31.0), cos(uTime * 0.27 + seed * 23.0), sin(uTime * 0.23 + seed * 13.0)) * 0.07;
    }
    if (i < 2.5) {
      return rotX(1.1) * (aTorus + normalize(aTorus) * noise(aTorus * 2.0 + uTime * 0.2) * 0.06);
    }
    if (i < 3.5) {
      vec3 p = aPlane;
      p.y = sin(p.x * 1.7 + uTime * 0.9) * 0.16 + cos(p.z * 2.1 + uTime * 0.7) * 0.13 + noise(vec3(p.xz * 1.2, uTime * 0.25)) * 0.12;
      return rotX(0.42) * p;
    }
    if (i < 4.5) return aCube;
    return aText + vec3(sin(uTime * 0.7 + seed * 40.0), cos(uTime * 0.6 + seed * 30.0), 0.0) * 0.006;
  }

  void main() {
    float t = clamp(uMix * 1.6 - seed * 0.6, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(shape(uA), shape(uB), t);
    float wText = (uA > 4.5 ? 1.0 - t : 0.0) + (uB > 4.5 ? t : 0.0);
    float spin = 1.0 - wText;
    p = rotX((-uMouse.y * 0.18 + 0.08) * (1.0 - wText * 0.7)) * rotY(uRot * spin + uMouse.x * 0.25 * (1.0 - wText * 0.7)) * p;
    p = p * uScale + uShift;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float w0 = (uA < 0.5 ? 1.0 - t : 0.0) + (uB < 0.5 ? t : 0.0);
    float scan = smoothstep(0.08, 0.0, abs(position.y - sin(uTime * 0.55) * 1.2)) * w0;
    float spark = step(0.986, seed) * (0.5 + 0.5 * sin(uTime * 1.8 + seed * 50.0));
    // the wordmark fills with lime from left to right as the page loads
    float tx = aText.x / uTextHalfW * 0.5 + 0.5;
    float filled = step(tx, uFill) * wText;
    float edge = smoothstep(0.035, 0.0, abs(tx - uFill)) * wText * step(0.001, uFill) * step(uFill, 0.999);
    vLime = max(max(scan, spark * (1.0 - wText)), max(filled * 0.9, edge)) * (1.0 - uInk);
    float depth = clamp((-mv.z - (uDist - 1.8)) / 2.6, 0.0, 1.0);
    vAlpha = mix(1.0, 0.32, depth) * uAlpha * mix(1.0, 0.8 + filled * 0.5 + edge * 0.6, wText);
    gl_PointSize = (2.6 + scan * 3.0 + spark * 1.5 * (1.0 - wText) + uInk * 0.8 + edge * 2.6 + wText * (0.7 + filled * 0.5)) * uDpr * ((uDist - 1.0) / -mv.z);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uInk;
  varying float vLime;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = pow(smoothstep(0.5, 0.0, d), 1.3);
    vec3 base = mix(vec3(0.949, 0.949, 0.933), vec3(0.04, 0.04, 0.04), uInk);
    vec3 col = mix(base, vec3(0.784, 1.0, 0.18), vLime);
    float a = clamp(soft * vAlpha * (0.9 + vLime * 0.6 + uInk * 0.4), 0.0, 1.0);
    gl_FragColor = vec4(col * a, a);
  }
`;

function gauss() {
  let u = 0; let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function build(count) {
  const sphere = new Float32Array(count * 3);
  const chaos = new Float32Array(count * 3);
  const torus = new Float32Array(count * 3);
  const plane = new Float32Array(count * 3);
  const cube = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const islands = [[-1.6, 0.8, -0.3], [1.7, 0.3, -0.6], [0.1, -1.0, 0.2]];
  const cols = Math.ceil(Math.sqrt(count * 1.7));
  const rows = Math.ceil(count / cols);
  const edge = Math.ceil(Math.sqrt(count / 6));
  for (let i = 0; i < count; i++) {
    const k = i * 3;
    // sphere
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 1.15 * (1 + (Math.random() - 0.5) * 0.03);
    sphere[k] = Math.cos(th) * r * R; sphere[k + 1] = y * R; sphere[k + 2] = Math.sin(th) * r * R;
    // scattered clusters
    if (Math.random() < 0.8) {
      const c = islands[(Math.random() * islands.length) | 0];
      chaos[k] = c[0] + gauss() * 0.42; chaos[k + 1] = c[1] + gauss() * 0.3; chaos[k + 2] = c[2] + gauss() * 0.32;
    } else {
      chaos[k] = (Math.random() - 0.5) * 6.5; chaos[k + 1] = (Math.random() - 0.5) * 3.4; chaos[k + 2] = (Math.random() - 0.5) * 2.2;
    }
    // ring
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI * 2;
    const tr = 0.36 * Math.sqrt(Math.random());
    torus[k] = (1.05 + tr * Math.cos(b)) * Math.cos(a); torus[k + 1] = tr * Math.sin(b); torus[k + 2] = (1.05 + tr * Math.cos(b)) * Math.sin(a);
    // field
    const cx = i % cols; const cz = (i / cols) | 0;
    plane[k] = (cx / (cols - 1) - 0.5) * 6.4; plane[k + 1] = 0; plane[k + 2] = (cz / Math.max(1, rows - 1) - 0.5) * 3.6;
    // cube lattice (points on the faces, snapped to a grid)
    const face = i % 6; const j = (i / 6) | 0;
    const u = ((j % edge) / (edge - 1) - 0.5) * 1.8; const v = ((((j / edge) | 0) % edge) / (edge - 1) - 0.5) * 1.8;
    const h = 0.9 * (face % 2 ? 1 : -1);
    const ax = (face / 2) | 0;
    if (ax === 0) { cube[k] = h; cube[k + 1] = u; cube[k + 2] = v; }
    else if (ax === 1) { cube[k] = u; cube[k + 1] = h; cube[k + 2] = v; }
    else { cube[k] = u; cube[k + 1] = v; cube[k + 2] = h; }
    seed[i] = Math.random();
  }
  return { sphere, chaos, torus, plane, cube, seed };
}

const TEXT_W = 4.9; // world units the wordmark spans at scale 1

/** Points sampled from the real wordmark, drawn with the site font on a hidden canvas. */
async function sampleText(count) {
  try { await document.fonts.load('600 220px "Geist Variable"'); } catch { /* fall back to whatever is loaded */ }
  const W = 1500; const H = 300;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d', { willReadFrequently: true });
  if (!g) return null;
  g.fillStyle = '#fff';
  g.font = '600 220px "Geist Variable", system-ui, sans-serif';
  if ('letterSpacing' in g) g.letterSpacing = '-10px';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('ART HALIMI', W / 2, H / 2 + 10);
  const px = g.getImageData(0, 0, W, H).data;
  const pts = [];
  let minX = W; let maxX = 0; let minY = H; let maxY = 0;
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
    if (px[(y * W + x) * 4 + 3] > 140) { pts.push(x, y); if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
  }
  if (!pts.length) return null;
  const n = pts.length / 2;
  const sc = TEXT_W / Math.max(1, maxX - minX);
  const cx = (minX + maxX) / 2; const cy = (minY + maxY) / 2;
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const j = ((Math.random() * n) | 0) * 2;
    out[i * 3] = (pts[j] - cx + (Math.random() - 0.5) * 2) * sc;
    out[i * 3 + 1] = -(pts[j + 1] - cy + (Math.random() - 0.5) * 2) * sc;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  return out;
}

const smooth = (x) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

const FOV = 35;
const SHAPE_SPAN = 2.6; // on-screen diameter of the sphere at scale 1, in world units (radius + noise + perspective)

/**
 * view: the world-space size of the screen at z = 0.
 * On wide screens a section can hold a [data-scene-slot] element: the shape is then centred on that box and sized to
 * fill it, so it follows the layout instead of fixed world offsets (which drift toward the centre on wide screens).
 * The slot's position is taken relative to its section, so the shape stays put while the section scrolls.
 */
function readAnchors(wide, view) {
  const V = window.innerHeight;
  const cw = document.documentElement.clientWidth;
  return [...document.querySelectorAll('[data-shape]')].map((el) => {
    const r = el.getBoundingClientRect();
    const d = el.dataset;
    const a = {
      center: r.top + Math.min(r.height, V * 1.2) / 2,
      shape: Number(d.shape),
      x: Number(wide ? d.x ?? 0 : d.mx ?? 0),
      y: Number(wide ? d.y ?? 0 : d.my ?? 0),
      scale: Number(wide ? d.scale ?? 1 : d.mscale ?? d.scale ?? 1),
      alpha: Number(wide ? d.alpha ?? 1 : d.malpha ?? d.alpha ?? 1),
    };
    const slot = wide ? el.querySelector('[data-scene-slot]') : null;
    const s = slot?.getBoundingClientRect();
    if (s && s.width > 0 && s.height > 0) {
      const ux = view.w / cw; // world units per CSS pixel
      const uy = view.h / V;
      a.x = (s.left + s.width / 2 - cw / 2) * ux;
      a.y = -(s.top - r.top + s.height / 2 - V / 2) * uy;
      a.scale = (Math.min(s.width, s.height) * uy) / SHAPE_SPAN;
    }
    return a;
  }).sort((a, b) => a.center - b.center);
}

export default function Scene() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);

    let renderer;
    try {
      renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'high-performance' });
    } catch {
      return undefined;
    }
    const { gl } = renderer;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    el.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: FOV });
    const scene = new Transform();
    const d = build(small ? 8000 : 14000);
    const geometry = new Geometry(gl, {
      position: { size: 3, data: d.sphere },
      aChaos: { size: 3, data: d.chaos },
      aTorus: { size: 3, data: d.torus },
      aPlane: { size: 3, data: d.plane },
      aCube: { size: 3, data: d.cube },
      aText: { size: 3, data: new Float32Array(d.seed.length * 3) },
      seed: { size: 1, data: d.seed },
    });
    const uniforms = {
      uTime: { value: 0 }, uA: { value: 0 }, uB: { value: 0 }, uMix: { value: 0 }, uRot: { value: 0 },
      uMouse: { value: [0, 0] }, uShift: { value: [0, 0, 0] }, uScale: { value: 1 }, uInk: { value: 0 },
      uAlpha: { value: 1 }, uDpr: { value: dpr }, uDist: { value: 6.4 }, uFill: { value: 0 }, uTextHalfW: { value: TEXT_W / 2 },
    };
    const program = new Program(gl, { vertex, fragment, transparent: true, depthTest: false, uniforms });
    program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    new Mesh(gl, { mode: gl.POINTS, geometry, program }).setParent(scene);

    sampleText(d.seed.length).then((arr) => {
      if (!arr) return;
      geometry.attributes.aText.data = arr;
      geometry.attributes.aText.needsUpdate = true;
      textReady.set(1);
    });

    let wide = true;
    const view = { w: 1, h: 1 };
    const resize = () => {
      const w = window.innerWidth; const h = window.innerHeight;
      wide = w >= 1024;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
      const dist = wide ? 6.4 : 9.4;
      camera.position.set(0, 0, dist);
      uniforms.uDist.value = dist;
      view.h = 2 * dist * Math.tan((FOV * Math.PI) / 360);
      view.w = view.h * (w / h);
    };
    resize();
    window.addEventListener('resize', resize);

    const target = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // eased values so jumps (anchor links, fast scrolls) still glide
    const cur = { x: 0, y: 0, scale: 1, alpha: 1, ink: 0 };
    let raf = 0;
    let last = performance.now();
    let time = 0;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) time += dt;

      const anchors = readAnchors(wide, view);
      const mid = window.innerHeight / 2;
      let A = anchors[0]; let B = anchors[0]; let f = 0;
      if (anchors.length) {
        if (mid <= anchors[0].center) { A = B = anchors[0]; }
        else if (mid >= anchors[anchors.length - 1].center) { A = B = anchors[anchors.length - 1]; }
        else {
          for (let i = 0; i < anchors.length - 1; i++) {
            if (mid >= anchors[i].center && mid <= anchors[i + 1].center) {
              A = anchors[i]; B = anchors[i + 1];
              f = smooth(((mid - A.center) / (B.center - A.center) - 0.18) / 0.64);
              break;
            }
          }
        }
      }
      const k = reduced ? 1 : 1 - Math.pow(0.0025, dt);
      if (introOn.get() > 0.5) {
        // loader: small, centred, cycling through the shapes the loader picks
        uniforms.uA.value = introA.get();
        uniforms.uB.value = introB.get();
        uniforms.uMix.value = introMix.get();
        const kf = reduced ? 1 : 1 - Math.pow(0.00005, dt);
        cur.x += (introX.get() - cur.x) * kf;
        cur.y += (introY.get() - cur.y) * kf;
        cur.scale += (introScale.get() - cur.scale) * kf;
        cur.alpha += (1 - cur.alpha) * kf;
        uniforms.uFill.value = introFill.get();
      } else if (A) {
        uniforms.uA.value = A.shape;
        uniforms.uB.value = B.shape;
        uniforms.uMix.value = A.shape === B.shape ? 0 : f;
        const k2 = reduced ? 1 : 1 - Math.pow(0.02, dt);
        cur.x += (lerp(A.x, B.x, f) - cur.x) * k2;
        cur.y += (lerp(A.y, B.y, f) - cur.y) * k2;
        cur.scale += (lerp(A.scale, B.scale, f) - cur.scale) * k2;
        cur.alpha += (lerp(A.alpha, B.alpha, f) - cur.alpha) * k2;
      }
      cur.ink += (limeAmt.get() - cur.ink) * (reduced ? 1 : 1 - Math.pow(0.0005, dt));
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      uniforms.uTime.value = time;
      uniforms.uRot.value = time * 0.08;
      uniforms.uMouse.value = [mouse.x, mouse.y];
      uniforms.uShift.value = [cur.x, cur.y, 0];
      uniforms.uScale.value = cur.scale;
      uniforms.uAlpha.value = cur.alpha;
      uniforms.uInk.value = cur.ink;
      renderer.render({ scene, camera });
    };
    raf = requestAnimationFrame(frame);
    el.classList.add('!opacity-100');

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-500" />;
}
