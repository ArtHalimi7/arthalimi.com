import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE, Lines, Magnetic, Roll, Signature, Tag } from './ui/primitives';
import { useScrollTo } from './Nav';
import { useReady } from '../lib/ready';
import { FRAGS } from './hero/fragments';
import Scraps from './hero/Scraps';
import SystemWindow, { MODS } from './hero/SystemWindow';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (v, [a, b]) => clamp01((v - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const inCubic = (t) => t * t * t;
// a quick rise into `at` and a slower fall after it (lime flashes)
const pulse = (v, at, rise = 0.005, fall = 0.03) => (v < at ? clamp01(1 - (at - v) / rise) : clamp01(1 - (v - at) / fall));
const D2R = Math.PI / 180;
const n2 = (n) => String(n).padStart(2, '0');
const PILE_R = [-3, 2, -1.5, 3, -2, 1, -2.5, 2.5, -1, 1.5]; // phones: the waiting scraps sit in a loose pile

/*
 * The hero is a pinned story over a 400vh scroll track (progress p 0..1):
 *   intro     0.00–0.12  the headline, with the team's real "system" drifting around it: sheets, chats, sticky notes
 *   mess      0.09–0.31  "Right now, it runs on this." The scraps crowd the screen.
 *   map       0.29–0.44  a thin lime line sweeps down. Every scrap it touches straightens, takes a lime outline and is
 *                        sorted into one of two quiet columns at the sides (a pile on phones). Behind the line the new
 *                        system appears as an exploded 3D blueprint, centred on the screen.
 *   build     0.47–0.63  the scraps leave their columns one by one, bottom layer first, and land on their module,
 *                        which prints in.
 *   assemble  0.585–0.70 the layers snap down tier by tier and the system turns to face you as it docks on the right.
 *                        Light runs round the frame.
 *   system    0.64–1.00  it boots (counters, charts, synced), the promise lands and gets signed, and the app keeps
 *                        working by itself (see SystemWindow).
 * One handler (update) writes every style from p, so scrolling back plays it in reverse.
 */
const BEAT = {
  introOut: [0.04, 0.12],
  messIn: [0.09, 0.16],
  crowd: [0.08, 0.27],
  messOut: [0.27, 0.31],
  scan: [0.29, 0.44],
  shell: [0.43, 0.47],
  fly: { start: 0.47, step: 0.0125, dur: 0.05 },
  turn: [0.585, 0.7],
  drop: [[0.585, 0.635], [0.6, 0.65], [0.615, 0.665]],
  solid: [0.63, 0.69],
  sysIn: [0.645, 0.715],
  boot: [0.65, 0.75],
  online: [0.68, 0.8],
  sign: [0.71, 0.87],
  live: 0.74,
};
const fit = (lines, k = 0.47, cap = '7.5rem', min = '2.4rem') => `clamp(${min}, ${(100 / (k * Math.max(...lines.map((l) => l.length)))).toFixed(2)}cqw, ${cap})`;

/**
 * Where a point of the system (x, y relative to its centre, z above its base) ends up, before perspective, under the
 * plane's transform: translate3d(tx, ty, 0) rotateX(ax) rotateZ(az) scale3d(s, s, s). Mirrors the CSS exactly, so a
 * scrap given the same position and rotations sits precisely on its module.
 */
function project(st, x, y, z) {
  const X = x * st.s; const Y = y * st.s; const Z = z * st.s;
  const c1 = Math.cos(st.az * D2R); const s1 = Math.sin(st.az * D2R);
  const x1 = X * c1 - Y * s1; const y1 = X * s1 + Y * c1;
  const c2 = Math.cos(st.ax * D2R); const s2 = Math.sin(st.ax * D2R);
  return { x: x1 + st.tx, y: y1 * c2 - Z * s2 + st.ty, z: y1 * s2 + Z * c2 };
}
/** Layout position of el inside root, ignoring transforms. */
function offsetIn(el, root) {
  let x = 0; let y = 0; let n = el;
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { x, y };
}
/** The progress at which the scan line reaches screen height y. */
const scanAt = (y, H) => lerp(BEAT.scan[0], BEAT.scan[1], clamp01((y / H + 0.02) / 1.04));

/**
 * Writes a style only when it changes. The scroll handlers below run every frame and most values sit still for long
 * stretches; an unchanged write still restyles the element (and, for a custom property, everything inside it).
 */
function put(el, k, v) {
  if (!el) return;
  const c = el.__put || (el.__put = {});
  if (c[k] === v) return;
  c[k] = v;
  if (k.charCodeAt(0) === 45) el.style.setProperty(k, v);
  else el.style[k] = v;
}

/** Sets text only when it differs (rewriting the same text still invalidates layout). */
function text(el, v) {
  if (el && el.textContent !== v) el.textContent = v;
}

function show(el, o, y = 0) {
  if (!el) return;
  put(el, 'opacity', o.toFixed(3));
  put(el, 'transform', `translate3d(0, ${y.toFixed(1)}px, 0)`);
  put(el, 'visibility', o < 0.01 ? 'hidden' : 'visible');
  put(el, 'pointerEvents', o > 0.6 ? 'auto' : 'none');
}
function lines(els, v, [a, b]) {
  els.forEach((el, i) => {
    if (!el) return;
    const e = ease(ramp(v, [a + i * 0.025, b + i * 0.025]));
    put(el, 'transform', `translate3d(0, ${((1 - e) * 106).toFixed(1)}%, 0)`);
  });
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const go = useScrollTo();
  const ready = useReady();

  const track = useRef(null);
  const stage = useRef(null);
  const win = useRef(null);
  const plane = useRef(null);
  const layer = useRef(null);
  const glow = useRef(null);
  const sheen = useRef(null);
  const trace = useRef(null);
  const line = useRef(null);
  const count = useRef(null);
  const c0 = useRef(null);
  const c1 = useRef(null);
  const c2 = useRef(null);
  const c1Lines = useRef([]);
  const c2Lines = useRef([]);
  const frags = useRef([]);
  const mods = useRef({});
  const boot = useRef({});
  const geo = useRef(null);
  // the system works by itself while it's up and on screen. Told to the window directly (boot.current.setLive), so
  // switching it never re-renders the whole hero.
  const liveOn = useRef(false);
  const inView = useRef(true);
  const tellLive = () => boot.current.setLive?.(liveOn.current && inView.current);
  const sigP = useMotionValue(0);
  const { scrollYProgress: p } = useScroll({ target: track, offset: ['start start', 'end end'] });

  const h1a = t('hero.h1a');
  const h1b = t('hero.h1b');
  const mess = t('hero.messLines');
  const sys = t('hero.sysLines');
  const frag = t('hero.frag');
  const money = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const nums = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB');

  const reg = useCallback((key) => (el) => { mods.current[key] = el; }, []);

  const update = useCallback((v) => {
    const g = geo.current;
    if (!g) return;
    const { W, H, wide, k, O, ex, tierZ } = g;

    // copy
    const out0 = ease(ramp(v, BEAT.introOut));
    show(c0.current, 1 - out0, -out0 * 70);
    const in1 = ease(ramp(v, BEAT.messIn));
    const out1 = ease(ramp(v, BEAT.messOut));
    show(c1.current, in1 * (1 - out1), -out1 * 50);
    lines(c1Lines.current, v, BEAT.messIn);
    const in2 = ease(ramp(v, BEAT.sysIn));
    show(c2.current, in2, (1 - in2) * 30);
    lines(c2Lines.current, v, BEAT.sysIn);
    sigP.set(ramp(v, BEAT.sign));

    // the scan line, and the blueprint revealed behind it
    const s = ramp(v, BEAT.scan);
    const lineY = lerp(-0.02, 1.02, s) * H;
    if (line.current) {
      put(line.current, 'transform', `translate3d(0, ${lineY.toFixed(1)}px, 0)`);
      put(line.current, 'opacity', s > 0 && s < 1 ? '1' : '0');
    }
    if (win.current) put(win.current, 'clipPath', s >= 1 ? 'none' : `inset(-2000px -2000px ${Math.max(0, g.win.bottom - lineY).toFixed(1)}px -2000px)`);

    // the plane: an exploded blueprint that turns to face you as it assembles
    const E = 1 - ease(ramp(v, BEAT.turn));
    const st = { ax: ex.ax * E, az: ex.az * E, s: lerp(1, ex.s, E), tx: ex.tx * E, ty: ex.ty * E };
    if (plane.current) {
      put(plane.current, 'transform', E < 0.0005 ? 'none'
        : `translate3d(${st.tx.toFixed(2)}px, ${st.ty.toFixed(2)}px, 0) rotateX(${st.ax.toFixed(3)}deg) rotateZ(${st.az.toFixed(3)}deg) scale3d(${st.s.toFixed(4)}, ${st.s.toFixed(4)}, ${st.s.toFixed(4)})`);
    }
    const tierE = BEAT.drop.map((r) => 1 - inCubic(ramp(v, r))); // 1 floating .. 0 seated
    const zOf = (tier) => tierZ[tier] * tierE[tier];

    // the scraps: mapped by the line, sorted out of the way, then flown onto their module in 3D one by one
    const crowd = ease(ramp(v, BEAT.crowd));
    const fill = {};
    const flash = {};
    let touched = 0;
    FRAGS.forEach((f, i) => {
      const el = frags.current[i];
      if (!el) return;
      const A = wide ? f.a : f.m;
      const Bp = wide ? f.b : f.m;
      const x0 = (lerp(A.x, Bp.x, crowd) / 100) * W;
      const y0 = (lerp(A.y, Bp.y, crowd) / 100) * H;
      const r0 = lerp(A.r, Bp.r, crowd);
      const sc0 = (0.7 + 0.36 * f.z) * k * (1 + crowd * 0.07 * f.z);
      const Q = g.queue[i];
      const tCap = scanAt(y0, H);
      const cap = ease(ramp(v, [tCap - 0.008, tCap + 0.016])); // straightens, sharpens, takes the outline
      const sort = ease(ramp(v, [tCap + 0.004, tCap + 0.04])); // glides to its place in the queue
      if (v >= tCap) touched++;
      const go0 = Math.max(BEAT.fly.start + f.n * BEAT.fly.step, tCap + 0.045);
      const go1 = go0 + BEAT.fly.dur;
      const fly = ease(ramp(v, [go0, go1]));
      const waiting = sort * (1 - ramp(v, [go0 - 0.02, go0])); // dimmed while it waits, lit again on its turn
      const md = g.mods[f.to] ?? g.mods.orders;
      let x = lerp(x0, Q.x, sort); let y = lerp(y0, Q.y, sort); let z = 0; let rx = 0;
      let rz = lerp(r0 * (1 - cap), Q.r, sort); let sc = lerp(sc0, Q.s, sort);
      if (fly > 0 && md) {
        const T = project(st, md.cx, md.cy, zOf(md.tier));
        x = lerp(x, O.x + T.x, fly);
        y = lerp(y, O.y + T.y, fly);
        z = lerp(0, T.z, fly) + Math.sin(Math.PI * fly) * 160; // lifted toward you mid-flight, then set down
        rx = st.ax * fly;
        rz = lerp(rz, st.az, fly);
        sc = lerp(sc, (st.s * md.w) / g.frags[i].w, fly);
      }
      const op = lerp(1, 0.55, waiting) * (1 - ramp(fly, [0.7, 1]));
      const blur = (1 - f.z) * 2.4 * (1 - cap);
      put(el, 'transform', `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) translate(-50%, -50%) rotateX(${rx.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale3d(${sc.toFixed(4)}, ${sc.toFixed(4)}, ${sc.toFixed(4)})`);
      put(el, 'opacity', op.toFixed(3));
      put(el, 'visibility', op < 0.005 ? 'hidden' : 'visible');
      put(el, 'filter', blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : 'none');
      put(el, '--cap', (cap * lerp(1, 0.35, waiting) * (1 - ramp(fly, [0, 0.3]))).toFixed(3));
      put(el, '--free', (1 - cap).toFixed(3));
      put(el, 'zIndex', String(fly > 0 ? 40 + f.n : sort > 0 ? 30 - f.n : Math.round(f.z * 10)));
      if (md) {
        fill[md.key] = Math.max(fill[md.key] ?? 0, ramp(v, [go1 - 0.006, go1 + 0.04]));
        flash[md.key] = Math.max(flash[md.key] ?? 0, pulse(v, go1));
      }
    });
    if (count.current) text(count.current, `${n2(touched)}/${n2(FRAGS.length)}`);

    // the modules: float, outline, print, seat
    let built = 0;
    const list = Object.values(g.mods);
    list.forEach((md) => {
      const el = mods.current[md.key];
      if (!el) return;
      const z = zOf(md.tier);
      const seat = BEAT.drop[md.tier][1];
      const fl = md.key === 'chrome' || fill[md.key] === undefined ? ramp(v, BEAT.shell) : fill[md.key];
      const wire = ease(ramp(v, [md.wireAt - 0.004, md.wireAt + 0.018])) * (1 - ramp(v, [seat - 0.02, seat]));
      if (fl >= 0.999) built++;
      put(el, 'transform', z > 0.05 ? `translateZ(${z.toFixed(2)}px)` : 'none');
      put(el, '--z', z.toFixed(2));
      put(el, '--wire', wire.toFixed(3));
      put(el, '--fill', fl.toFixed(4));
      put(el, '--pl', fl > 0.001 && fl < 0.999 ? '1' : '0');
      put(el, '--ex', tierE[md.tier].toFixed(3));
      put(el, '--zmax', tierZ[md.tier].toFixed(1));
      put(el, '--flash', Math.max(flash[md.key] ?? 0, pulse(v, seat, 0.004, 0.028) * 0.75).toFixed(3));
    });

    // the frame: blueprint → solid window, then the power-on moment
    const solid = ease(ramp(v, BEAT.solid));
    const bt = boot.current;
    if (bt.base) {
      put(bt.base, '--ex', E.toFixed(3));
      put(bt.base, '--solid', solid.toFixed(3));
    }
    if (bt.built) text(bt.built, `${built}/${list.length}`);
    const on = ramp(v, BEAT.online);
    if (glow.current) put(glow.current, 'opacity', (solid * (0.45 + 0.55 * Math.sin(Math.PI * Math.min(on * 1.6, 1)))).toFixed(3));
    if (sheen.current) {
      put(sheen.current, 'opacity', on > 0 && on < 1 ? '1' : '0');
      put(sheen.current.firstChild, 'transform', `translate3d(${lerp(-110, 310, ease(on)).toFixed(1)}%, 0, 0) skewX(-16deg)`);
    }
    if (trace.current) {
      put(trace.current, 'strokeDashoffset', (-on).toFixed(4));
      put(trace.current, 'opacity', Math.sin(Math.PI * on).toFixed(3));
    }

    // boot
    const b = ease(ramp(v, BEAT.boot));
    put(plane.current, '--b', b.toFixed(3));
    const d = bt.delta ?? { open: 0, rev: 0 };
    if (bt.rev) text(bt.rev, money.format(Math.round((51940 + d.rev) * b)));
    if (bt.open) text(bt.open, nums.format(Math.round((128 + d.open) * b)));
    if (bt.overdue) text(bt.overdue, nums.format(Math.round(14 * (1 - b))));
    if (bt.chart) put(bt.chart, 'strokeDashoffset', (1 - b).toFixed(3));
    const ui = t('hero.ui');
    if (bt.syncText) text(bt.syncText, b >= 0.999 ? ui.synced : ui.syncing);
    if (bt.sync) {
      put(bt.sync, 'color', b >= 0.999 ? '#C8FF2E' : '');
      put(bt.sync, 'backgroundColor', b >= 0.999 ? 'rgba(200,255,46,0.12)' : '');
    }

    // the system keeps working once it's up
    const lv = v >= BEAT.live;
    if (lv !== liveOn.current) { liveOn.current = lv; tellLive(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const measure = useCallback(() => {
    const st = stage.current;
    const w = win.current;
    const pl = plane.current;
    if (!st || !w || !pl) return;
    const sr = st.getBoundingClientRect();
    const wr = w.getBoundingClientRect(); // the box itself is never transformed (the plane inside it is)
    const wide = window.innerWidth >= 1024;
    const W = sr.width; const H = sr.height;
    const O = { x: wr.left - sr.left + wr.width / 2, y: wr.top - sr.top + wr.height / 2 };
    const P = wide ? Math.max(1900, wr.width * 2.7) : 1500;
    const k = wide ? Math.min(1.4, Math.max(0.8, H / 900)) : Math.min(0.85, Math.max(0.6, W / 520));
    const tierZ = (wide ? [0.09, 0.2, 0.33] : [0.06, 0.13, 0.21]).map((f) => f * wr.height);
    const pw = pl.offsetWidth; const ph = pl.offsetHeight;
    const found = {};
    Object.entries(mods.current).forEach(([key, el]) => {
      if (!el || !el.offsetWidth || !MODS[key]) return;
      const o = offsetIn(el, pl);
      const md = { key, tier: MODS[key].tier, w: el.offsetWidth, h: el.offsetHeight };
      md.cx = o.x + md.w / 2 - pw / 2;
      md.cy = o.y + md.h / 2 - ph / 2;
      found[key] = md;
    });

    // the exploded view: tilted back and turned, then sized to fit and centred on the screen while it's built
    const pts = [[-pw / 2, -ph / 2, 0], [pw / 2, -ph / 2, 0], [-pw / 2, ph / 2, 0], [pw / 2, ph / 2, 0]];
    Object.values(found).forEach((md) => {
      [-1, 1].forEach((sx) => [-1, 1].forEach((sy) => pts.push([md.cx + (sx * md.w) / 2, md.cy + (sy * md.h) / 2, tierZ[md.tier]])));
    });
    const box = (st) => {
      const bb = { l: Infinity, r: -Infinity, t: Infinity, b: -Infinity };
      pts.forEach(([x, y, z]) => {
        const q = project(st, x, y, z);
        const f = P / (P - q.z);
        const sx = O.x + q.x * f; const sy = O.y + q.y * f;
        bb.l = Math.min(bb.l, sx); bb.r = Math.max(bb.r, sx); bb.t = Math.min(bb.t, sy); bb.b = Math.max(bb.b, sy);
      });
      return bb;
    };
    const ex = wide ? { ax: 50, az: -30, s: 1, tx: 0, ty: 0 } : { ax: 44, az: -18, s: 1, tx: 0, ty: 0 };
    let bb = box(ex);
    ex.s = Math.min(0.95, (wide ? 0.54 * W : 0.94 * W) / (bb.r - bb.l), (wide ? 0.72 * (H - 90) : 0.52 * H) / (bb.b - bb.t));
    const aim = wide ? { x: W / 2, y: H / 2 + 36 } : { x: W / 2, y: H * 0.42 };
    for (let i = 0; i < 3; i++) {
      bb = box(ex);
      ex.tx += aim.x - (bb.l + bb.r) / 2;
      ex.ty += aim.y - (bb.t + bb.b) / 2;
    }
    bb = box(ex);
    Object.values(found).forEach((md) => {
      // its outline appears when the scan line reaches its top edge in the exploded view
      const top = project(ex, md.cx, md.cy - md.h / 2, tierZ[md.tier]);
      md.wireAt = scanAt(O.y + top.y * (P / (P - top.z)), H);
    });

    // where each mapped scrap waits: a column either side of the build, or a small pile under it on phones
    const queue = FRAGS.map((f, i) => {
      const fw = frags.current[i]?.offsetWidth || f.w;
      if (!wide) return { x: W / 2 + (f.n % 2 ? 4 : -4), y: Math.min(H * 0.86, bb.b + 70) + f.n * 3, r: PILE_R[f.n] ?? 0, s: 0.58 * k };
      const [side, j] = f.q;
      const gutter = side === 'l' ? bb.l : W - bb.r;
      return { x: side === 'l' ? gutter / 2 : W - gutter / 2, y: lerp(0.19, 0.81, j / 4) * H, r: 0, s: Math.min(0.72 * k, (gutter * 0.8) / fw) };
    });

    w.style.perspective = `${P}px`;
    if (layer.current) {
      layer.current.style.perspective = `${P}px`;
      layer.current.style.perspectiveOrigin = `${O.x.toFixed(1)}px ${O.y.toFixed(1)}px`;
    }
    geo.current = {
      W, H, wide, O, ex, tierZ, k, queue, mods: found,
      frags: FRAGS.map((f, i) => ({ w: frags.current[i]?.offsetWidth || f.w })),
      win: { bottom: wr.bottom - sr.top },
    };
    update(p.get());
  }, [p, update]);

  useMotionValueEvent(p, 'change', update);
  useEffect(() => {
    boot.current.repaint = () => update(p.get());
    boot.current.wantLive = () => liveOn.current && inView.current;
    measure();
    const raf = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, [measure, update, p]);

  // the live system only runs while the hero is on screen
  useEffect(() => {
    const el = track.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting; tellLive(); }, { rootMargin: '-10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // pointer parallax on the scraps (fine pointers only; scoped to their layer so nothing else restyles)
  const onMove = (e) => {
    const el = layer.current;
    if (!el || e.pointerType !== 'mouse') return;
    put(el, '--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(2));
    put(el, '--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(2));
  };

  const ctas = (
    <div className="flex flex-wrap items-center gap-3">
      <Magnetic>
        <button type="button" onClick={() => go('contact')} className="btn btn-lime 2xl:px-6 2xl:py-3.5 2xl:text-[16px]">
          <Roll>{t('hero.cta1')}</Roll> <ArrowUpRight className="h-4 w-4" />
        </button>
      </Magnetic>
      <button type="button" onClick={() => go('work')} className="btn btn-line 2xl:px-6 2xl:py-3.5 2xl:text-[16px]"><Roll>{t('hero.cta2')}</Roll></button>
    </div>
  );

  return (
    <section ref={track} id="top" className="relative h-[400vh]">
      <div ref={stage} onPointerMove={onMove} className={`sticky top-0 h-[100svh] overflow-hidden ${ready ? 'is-ready' : ''}`}>
        {/* the system */}
        <div data-nosnippet="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] flex items-end pb-[4svh] lg:items-center lg:pb-0 lg:pt-16">
          <div className="wrap lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div ref={win} style={{ clipPath: 'inset(0 0 100% 0)' }} className="relative h-[40svh] sm:h-[44svh] lg:col-span-7 lg:col-start-6 lg:h-[min(66svh,700px)]">
              <div ref={glow} className="sys-glow" />
              <div ref={plane} className="p3d absolute inset-0">
                <SystemWindow key={lang} ui={t('hero.ui')} reg={reg} boot={boot} money={money} />
              </div>
              <div ref={sheen} className="sys-sheen"><i /></div>
              <svg className="sys-trace" aria-hidden="true">
                <g ref={trace}>
                  <rect className="halo" x="0.75" y="0.75" rx="18" pathLength="1" />
                  <rect x="0.75" y="0.75" rx="18" pathLength="1" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* the scraps (positioned from here; their arrival, live mess and diagnosis live in hero/Scraps.jsx) */}
        <Scraps layer={layer} frags={frags} data={frag} words={t('hero.diag')} p={p} ready={ready} />

        {/* the scan line */}
        <div ref={line} data-nosnippet="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-0 opacity-0 will-change-transform">
          <div className="scan-core absolute inset-x-0 top-0 h-px" />
          <p className="wrap absolute inset-x-0 top-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-400">
            {t('hero.scan')} · <span ref={count} className="tabular-nums text-lime/80">00/{n2(FRAGS.length)}</span>
          </p>
        </div>

        {/* the copy: three beats in the same place */}
        <div className="pointer-events-none absolute inset-0 z-[4] flex items-start pt-28 lg:items-center lg:pt-16">
          <div className="wrap grid lg:grid-cols-12 lg:gap-x-8">
            <div ref={c0} className="[container-type:inline-size] [grid-area:1/1] lg:self-center lg:[grid-area:1/1/2/8]">
              <m.p key={`e-${lang}`} initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.1, duration: 1 }} className="flex items-center gap-3 text-[13px] text-ink-300 lg:text-[14px] 2xl:text-[15px]">
                <span className="h-px w-6 bg-lime" /> {t('hero.eyebrow')}
              </m.p>
              <h1 style={{ fontSize: fit([h1a, h1b], 0.47, '12rem', '2.6rem') }} className="mt-6 font-medium leading-[0.94] tracking-[-0.055em] lg:mt-9">
                <Lines key={`h-${lang}`} animate={ready} lines={[h1a, h1b]} lineClassName={['[text-wrap:balance]', 'text-ink-300 [text-wrap:balance]']} delay={0.15} />
              </h1>
              <m.div key={`s-${lang}`} initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.9, ease: EASE }}>
                <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-ink-200 sm:text-[18px] lg:mt-10 2xl:text-[20px]">{t('hero.sub')}</p>
                <div className="mt-7 lg:mt-11">{ctas}</div>
                <p className="mt-10 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400 lg:flex">
                  <span className="relative h-6 w-px overflow-hidden bg-paper/15"><span className="absolute inset-x-0 top-0 h-2 animate-[cue_1.8s_ease-in-out_infinite] bg-lime" /></span>
                  {t('hero.cue')}
                </p>
              </m.div>
            </div>

            <div ref={c1} style={{ opacity: 0, visibility: 'hidden' }} className="[container-type:inline-size] [grid-area:1/1] lg:self-center lg:[grid-area:1/1/2/6]">
              <Tag>{t('hero.messTag')}</Tag>
              <h2 style={{ fontSize: fit(Array.isArray(mess) ? mess : [''], 0.47, '7.5rem') }} className="mt-6 font-medium leading-[0.95] tracking-[-0.05em]">
                {Array.isArray(mess) && mess.map((l, i) => (
                  <span key={`${lang}-${i}`} className="block overflow-hidden pb-[0.07em]">
                    <span ref={(el) => { c1Lines.current[i] = el; }} className={`block will-change-transform ${i ? 'text-ink-300' : ''}`}>{l}</span>
                  </span>
                ))}
              </h2>
              <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-ink-200 sm:text-[18px] 2xl:text-[20px]">{t('hero.messBody')}</p>
            </div>

            <div ref={c2} style={{ opacity: 0, visibility: 'hidden' }} className="[container-type:inline-size] [grid-area:1/1] lg:self-center lg:[grid-area:1/1/2/6]">
              <Tag>{t('hero.sysTag')}</Tag>
              <h2 style={{ fontSize: fit(Array.isArray(sys) ? sys : [''], 0.56, '7rem') }} className="mt-6 whitespace-nowrap font-medium leading-[0.95] tracking-[-0.05em]">
                {Array.isArray(sys) && sys.map((l, i) => (
                  <span key={`${lang}-${i}`} className="block overflow-hidden pb-[0.07em]">
                    <span ref={(el) => { c2Lines.current[i] = el; }} className="block will-change-transform">{l}</span>
                  </span>
                ))}
              </h2>
              <p className="mt-2 font-serif text-[clamp(1.7rem,8.4cqw,4.6rem)] italic leading-[1.02] tracking-[-0.01em] text-ink-200 [text-wrap:balance]">{t('hero.sysAccent')}</p>
              <div className="mt-6 flex items-center gap-4 lg:mt-9">
                <Signature progress={sigP} className="h-auto w-[min(250px,58%)] text-lime lg:w-[min(320px,64%)]" />
              </div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-400">{t('hero.sign')}</p>
              <div className="mt-7 hidden sm:block lg:mt-9">{ctas}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
