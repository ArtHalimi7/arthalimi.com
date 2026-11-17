import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE, Lines, Magnetic, Roll, Signature, Tag } from './ui/primitives';
import { useScrollTo } from './Nav';
import { useReady } from '../lib/ready';
import { FRAGS, Fragment } from './hero/fragments';
import SystemWindow from './hero/SystemWindow';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (v, [a, b]) => clamp01((v - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/*
 * The hero is a pinned story over a 340vh scroll track (progress p 0..1):
 *   intro  0.00–0.14  the headline, with the team's real "system" drifting around it: sheets, chats, sticky notes
 *   mess   0.11–0.38  "Right now, it runs on this." The scraps crowd the screen.
 *   scan   0.34–0.66  the lime scan line sweeps down. It prints the new system as it goes, and every scrap it touches
 *                     straightens and flies into the module that replaces it.
 *   system 0.60–1.00  the system boots (counters, chart, synced), the promise lands and gets signed.
 * One handler (update) writes every style from p, so scrolling back plays it in reverse.
 */
const BEAT = {
  introOut: [0.05, 0.14],
  messIn: [0.11, 0.19],
  crowd: [0.1, 0.3],
  messOut: [0.32, 0.38],
  scan: [0.34, 0.66],
  boot: [0.6, 0.74],
  sysIn: [0.63, 0.71],
  sign: [0.7, 0.88],
};
const fit = (lines, k = 0.47, cap = '7.5rem', min = '2.4rem') => `clamp(${min}, ${(100 / (k * Math.max(...lines.map((l) => l.length)))).toFixed(2)}cqw, ${cap})`;

function show(el, o, y = 0) {
  if (!el) return;
  el.style.opacity = o.toFixed(3);
  el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
  el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
  el.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
}
function lines(els, v, [a, b]) {
  els.forEach((el, i) => {
    if (!el) return;
    const e = ease(ramp(v, [a + i * 0.025, b + i * 0.025]));
    el.style.transform = `translate3d(0, ${((1 - e) * 106).toFixed(1)}%, 0)`;
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
    const { W, H, wide, k, targets } = g;

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

    // the scan line and the system it prints
    const s = ramp(v, BEAT.scan);
    const lineY = lerp(-0.02, 1.02, s) * H;
    if (line.current) {
      line.current.style.transform = `translate3d(0, ${lineY.toFixed(1)}px, 0)`;
      line.current.style.opacity = s > 0 && s < 1 ? '1' : '0';
    }
    if (win.current && g.win) {
      const cut = s >= 1 ? 0 : clamp01((g.win.bottom - lineY) / g.win.h) * 100;
      win.current.style.clipPath = `inset(0 0 ${cut.toFixed(2)}% 0)`;
    }

    // the scraps
    const crowd = ease(ramp(v, BEAT.crowd));
    const scanAt = (y) => lerp(BEAT.scan[0], BEAT.scan[1], clamp01(y / H));
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
      const tg = targets[f.to] ?? targets.orders ?? { x: W * 0.7, y: H * 0.6 };
      // touched when the line reaches it; it then flies in so it lands as the line prints its module
      const tTouch = scanAt(y0);
      const tLand = scanAt(tg.y);
      const go0 = Math.max(tTouch, tLand - 0.07);
      const go1 = Math.max(tTouch + 0.05, tLand + 0.015);
      const hit = ease(ramp(v, [tTouch - 0.012, tTouch + 0.02]));
      const fly = ease(ramp(v, [go0, go1]));
      if (v >= tTouch) touched++;
      const x = lerp(x0, tg.x, fly);
      const y = lerp(y0, tg.y, fly);
      const sc = lerp(sc0, 0.28 * k, fly);
      const rot = lerp(r0 * (1 - hit), 0, fly);
      const op = 1 - ramp(fly, [0.55, 1]);
      const blur = (1 - f.z) * 2.4 * (1 - hit);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity = op.toFixed(3);
      el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : 'none';
      el.style.setProperty('--hit', (hit * (1 - fly)).toFixed(3));
      el.style.zIndex = String(Math.round(f.z * 10) + (hit > 0 ? 20 : 0));
      const fl = clamp01(1 - Math.abs(v - go1) / 0.03);
      flash[f.to] = Math.max(flash[f.to] ?? 0, fl);
    });
    Object.entries(mods.current).forEach(([key, el]) => {
      if (el) el.style.boxShadow = flash[key] ? `0 0 0 1px rgba(200,255,46,${(flash[key] * 0.9).toFixed(2)}), 0 0 24px rgba(200,255,46,${(flash[key] * 0.25).toFixed(2)})` : '';
    });
    if (count.current) count.current.textContent = `${String(touched).padStart(2, '0')}/${String(FRAGS.length).padStart(2, '0')}`;

    // boot
    const b = ease(ramp(v, BEAT.boot));
    const bt = boot.current;
    if (bt.rev) bt.rev.textContent = money.format(Math.round(51940 * b));
    if (bt.open) bt.open.textContent = nums.format(Math.round(128 * b));
    if (bt.overdue) bt.overdue.textContent = nums.format(Math.round(14 * (1 - b)));
    if (bt.chart) bt.chart.style.strokeDashoffset = (1 - b).toFixed(3);
    const ui = t('hero.ui');
    if (bt.syncText) bt.syncText.textContent = b >= 0.999 ? ui.synced : ui.syncing;
    if (bt.sync) {
      bt.sync.style.color = b >= 0.999 ? '#C8FF2E' : '';
      bt.sync.style.backgroundColor = b >= 0.999 ? 'rgba(200,255,46,0.12)' : '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const measure = useCallback(() => {
    const st = stage.current;
    if (!st) return;
    const sr = st.getBoundingClientRect();
    const wide = window.innerWidth >= 1024;
    const targets = {};
    Object.entries(mods.current).forEach(([key, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width > 0) targets[key] = { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2 };
    });
    const wr = win.current?.getBoundingClientRect();
    geo.current = {
      W: sr.width,
      H: sr.height,
      wide,
      k: wide ? Math.min(1.4, Math.max(0.8, sr.height / 900)) : Math.min(0.85, Math.max(0.6, sr.width / 520)),
      targets,
      win: wr && { bottom: wr.bottom - sr.top, h: wr.height },
    };
    update(p.get());
  }, [p, update]);

  useMotionValueEvent(p, 'change', update);
  useEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, [measure]);

  // pointer parallax on the scraps (fine pointers only)
  const onMove = (e) => {
    const st = stage.current;
    if (!st || e.pointerType !== 'mouse') return;
    st.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
    st.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
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
    <section ref={track} id="top" className="relative h-[340vh]">
      {/* the particle cloud: scattered clusters while it's a mess; it fades away once the system takes over */}
      <div aria-hidden="true" data-shape="1" data-x="1.2" data-mx="0" data-my="-0.9" data-scale="0.85" data-mscale="0.6" data-alpha="0.35" data-malpha="0.25" className="pointer-events-none absolute inset-x-0 top-0 h-[150vh]" />
      <div aria-hidden="true" data-shape="1" data-x="1.7" data-mx="0" data-my="-1.4" data-scale="1.05" data-mscale="0.7" data-alpha="0" data-malpha="0" className="pointer-events-none absolute inset-x-0 top-[180vh] h-[160vh]" />

      <div ref={stage} onPointerMove={onMove} className={`sticky top-0 h-[100svh] overflow-hidden ${ready ? 'is-ready' : ''}`}>
        {/* the system */}
        <div data-nosnippet="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] flex items-end pb-[4svh] lg:items-center lg:pb-0 lg:pt-16">
          <div className="wrap lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div ref={win} style={{ clipPath: 'inset(0 0 100% 0)' }} className="h-[40svh] sm:h-[44svh] lg:col-span-7 lg:col-start-6 lg:h-[min(66svh,700px)]">
              <SystemWindow ui={t('hero.ui')} reg={reg} boot={boot} />
            </div>
          </div>
        </div>

        {/* the scraps */}
        <div data-nosnippet="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
          {FRAGS.map((f, i) => (
            <div key={f.kind} ref={(el) => { frags.current[i] = el; }} className="absolute left-0 top-0 opacity-0 will-change-transform" style={{ width: f.w }}>
              <div className="frag-par" style={{ '--d': f.z }}>
                <div className="frag-in" style={{ transitionDelay: `${0.45 + i * 0.07}s` }}>
                  <div className="frag-drift" style={{ animationDuration: `${7 + (i % 4) * 1.4}s`, animationDelay: `${-i * 1.7}s` }}>
                    <Fragment kind={f.kind} data={frag?.[f.kind]} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* the scan line */}
        <div ref={line} data-nosnippet="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[3] opacity-0 will-change-transform">
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-lime/[0.07] to-transparent" />
          <div className="h-[2px] bg-lime shadow-[0_0_22px_3px_rgba(200,255,46,0.5)]" />
          <div className="wrap">
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-lime">
              {t('hero.scan')} · <span ref={count}>00/{FRAGS.length}</span> {t('hero.sources')}
            </p>
          </div>
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
