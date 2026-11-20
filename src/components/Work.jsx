import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Roll, Tag } from './ui/primitives';
import { useScrollTo } from './Nav';
import { limeAmt } from '../lib/store';
import lbDesk from '../assets/work/lb-desktop.webp';
import lbPhone from '../assets/work/lb-mobile.webp';
import tafaDesk from '../assets/work/tafa-desktop.webp';
import tafaPhone from '../assets/work/tafa-mobile.webp';
import { OpsBoard, OpsPhone } from './work/OpsMock';
import Phone from './ui/Phone';
import Slot from './work/Slot';

/*
 * `ops` is a private system: no link, no screenshots. Its window and phone are drawn (OpsMock) with made-up data,
 * and its button asks about the project instead of visiting it.
 * The Arsa Gipser and Andi Shkodra sites were taken out on 18 Nov 2026 (brochure sites, off the internal-tools
 * pitch); their captures and texts are still in assets/work and the locales.
 */
const ITEMS = [
  { key: 'ops', year: '2026' },
  { key: 'lb', desk: lbDesk, phone: lbPhone, url: 'https://lbhairdesign.ch', year: '2025' },
  { key: 'tafa', desk: tafaDesk, phone: tafaPhone, url: 'https://tafaleka.com', year: '2026' },
];
const SPEED = 1.8; // px of sideways travel per px scrolled
const HOLD = 0.6; // screens of scrolling the last slot stays put for, so there's time to use it
const host = (u) => u.replace(/^https?:\/\//, '');
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const pad = (v) => String(v).padStart(2, '0');

/*
 * Work, sideways, built from the hero's kit. The section pins and scrolling moves a row to the left:
 * an intro ("WORK"), one slide per project, and an open slot for the next one.
 * Each slide is the "after" picture of the hero for a real client: the live site in a system window (hover scrolls
 * through it) and its phone version. As a slide reaches the centre the phone straightens and locks in with the
 * hero's lime flash.
 * Behind it all, lime rises from the bottom of the screen with a soft edge: its level is the share of the run
 * scrolled (half way through, the lower half of the screen is lime), so the page reaches the lime section already
 * lime. The layer only moves (a transform), and each piece of text turns ink as a whole once the lime reaches it.
 * Because the lime rises while the row moves sideways, text never sweeps back and forth across the edge.
 */
const FADE = 0.35; // the soft edge, as a share of the screen height (matches .wk-rise in index.css)

/** The text next to a slide. Each [data-flip] piece turns ink on its own once the rising lime reaches it. */
function Story({ it, i, n }) {
  const { t } = useTranslation();
  const go = useScrollTo();
  const k = (f) => t(`work.items.${it.key}.${f}`);
  const cta = 'wk-flip roll-host group/cta mt-5 inline-flex items-center gap-3 text-[14px] font-medium lg:mt-8';
  const dot = (
    <span className="wk-btn grid h-11 w-11 place-items-center rounded-full bg-lime text-ink group-hover/cta:rotate-45">
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
  return (
    <>
      <div data-flip="" className="wk-flip flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400">
        <span><span className="wk-accent text-lime">{pad(i + 1)}</span> / {pad(n)}</span><span className="wk-rule h-px w-6 bg-paper/15" /><span>{it.year}</span>
      </div>
      <h3 data-flip="" className="wk-flip mt-3 text-[clamp(1.9rem,3.4vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.045em] lg:mt-6">{k('title')}</h3>
      <p data-flip="" className="wk-flip wk-soft mt-2 font-serif text-[clamp(1.25rem,2vw,2.4rem)] italic leading-[1.05] text-ink-300 lg:mt-3">{k('tag')}</p>
      <p data-flip="" className="wk-flip wk-soft mt-6 hidden max-w-[40ch] text-[15px] leading-relaxed text-ink-300 lg:block 2xl:text-[16px]">{k('desc')}</p>
      <div className="mt-4 flex flex-wrap gap-2 lg:mt-6">
        {[k('kind'), k('place')].map((x) => <span key={x} data-flip="" className="wk-flip wk-chip rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 text-[12px] text-ink-200">{x}</span>)}
      </div>
      {it.url ? (
        <a href={it.url} target="_blank" rel="noopener noreferrer" data-flip="" className={cta}>
          {dot}<Roll>{t('work.visit')}</Roll>
        </a>
      ) : (
        <button type="button" onClick={() => go('contact')} data-flip="" className={cta}>
          {dot}<Roll>{t('work.ask')}</Roll>
        </button>
      )}
    </>
  );
}

function Slide({ it, i, n, refs }) {
  const { t } = useTranslation();
  const set = (name) => (el) => { refs[name].current[i] = el; };
  const title = t(`work.items.${it.key}.title`);
  const ui = it.url ? null : t(`work.items.${it.key}.ui`);
  // a live site is one link; a private system is just the picture
  const Stage = it.url ? 'a' : 'div';
  const stageProps = it.url
    ? { href: it.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${title}: ${t('work.visit')}` }
    : {};

  return (
    <div ref={set('wraps')} className="relative h-[min(76svh,820px)] w-[88vw] shrink-0 lg:w-[min(90vw,1640px)]">
      <div className="relative z-10 grid h-full grid-rows-[minmax(0,1fr)_auto] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:grid-rows-1 lg:items-center lg:gap-12">
        {/* the stage: site window and phone */}
        <div className="relative min-h-0 lg:order-2 lg:h-[90%]">
          <Stage {...stageProps} className="group absolute inset-0 block">
            <div ref={set('wins')} className="frag-card absolute bottom-[7%] left-0 right-[11%] top-0 flex flex-col overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0D0D0D] will-change-transform lg:right-[9%]">
              <div className="flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-[linear-gradient(180deg,#171718,#111112)] px-4">
                <span className="flex gap-1.5">{[0, 1, 2].map((d) => <span key={d} className="h-2.5 w-2.5 rounded-full bg-paper/[0.12]" />)}</span>
                <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-ink-300"><Lock className="h-3 w-3 shrink-0" /><span className="truncate">{it.url ? host(it.url) : t(`work.items.${it.key}.host`)}</span></span>
                {it.url ? (
                  <span className="ml-auto flex items-center gap-1.5 rounded-full bg-lime/[0.12] px-2.5 py-1 text-[10.5px] font-medium text-lime">
                    <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" />{t('work.live')}
                  </span>
                ) : (
                  <span className="ml-auto flex items-center gap-1.5 rounded-full bg-paper/[0.06] px-2.5 py-1 text-[10.5px] font-medium text-ink-300">
                    <Lock className="h-3 w-3" />{t('work.private')}
                  </span>
                )}
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-ink-950">
                {ui ? <OpsBoard ui={ui} /> : (
                /* the capture is three screens tall: hovering scrolls through the site */
                <img
                  src={it.desk}
                  alt={`${title} website`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-[object-position] duration-[1.4s] ease-[cubic-bezier(.45,0,.25,1)] [object-position:50%_0%] group-hover:duration-[7s] group-hover:[object-position:50%_100%]"
                />
                )}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
              </div>
            </div>

            <Phone ref={set('phones')} className="hit-ring absolute -bottom-[2%] -right-[2%] w-[40%] max-w-[300px] will-change-transform sm:w-[32%] lg:w-[25%]">
              {ui ? <OpsPhone ui={ui} /> : <img src={it.phone} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />}
            </Phone>
          </Stage>
        </div>

        {/* the story */}
        <div ref={set('infos')} className="will-change-transform lg:order-1">
          <Story it={it} i={i} n={n} />
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const { t, i18n } = useTranslation();
  const section = useRef(null);
  const stage = useRef(null);
  const row = useRef(null);
  const lime = useRef(null);
  const chrome = useRef(null);
  const bar = useRef(null);
  const count = useRef(null);
  const intro = useRef(null);
  const refs = { wraps: useRef([]), wins: useRef([]), phones: useRef([]), infos: useRef([]) };
  const slot = { root: useRef(null), win: useRef(null), phone: useRef(null) };
  const geo = useRef(null);
  const [height, setHeight] = useState(null);
  const { scrollYProgress: p } = useScroll({ target: section, offset: ['start start', 'end end'] });

  const update = useCallback(() => {
    const g = geo.current;
    if (!g || !row.current) return;
    // where the section is, from the scroll position: no layout is read while scrolling
    const top = g.top - window.scrollY;
    const x = -Math.min(Math.max(0, -top) * SPEED, g.travel);
    row.current.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;

    // the rising lime: `level` is where it is half way in; from below the screen at the start to above it at the end
    const P = g.travel ? -x / g.travel : 0;
    const F = g.H * FADE;
    const level = lerp(g.H + F / 2, -F / 2, P);
    if (lime.current) lime.current.style.transform = `translate3d(0, ${(level - F / 2).toFixed(1)}px, 0)`;
    // a piece of text is "on lime" once the level is above its middle; flip it only when that changes
    const flip = (it, dy = 0) => {
      const on = it.y + dy > level;
      if (it.on !== on) { it.on = on; it.el.classList.toggle('on-lime', on); }
    };

    let active = 0;
    let best = Infinity;
    g.centers.forEach((c, i) => {
      const d = (c + x - g.vw / 2) / g.vw; // -1 .. 1 across the screen
      const ad = Math.min(1, Math.abs(d));
      if (Math.abs(d) < best) { best = Math.abs(d); active = i; } // unclamped, so the nearest slide wins even off screen
      const s = ease(1 - clamp01((ad - 0.03) / 0.5)); // 1 when the slide is centred
      const hit = clamp01(1 - Math.abs(s - 0.9) / 0.1); // the lime flash as the pieces lock in

      const win = refs.wins.current[i];
      if (win) win.style.transform = `perspective(1800px) rotateY(${(Math.max(-1, Math.min(1, d)) * -9).toFixed(2)}deg) scale(${(1 - 0.1 * ease(ad)).toFixed(4)})`;
      const phone = refs.phones.current[i];
      if (phone) {
        // off centre the phone drifts outward on its own side, so a leaving slide's phone never lands on the next story
        // On phones the slides sit too close for that: it barely moves and fades instead.
        const out = d < 0 ? -1 : 1;
        const narrow = g.vw < 1024;
        phone.style.transform = `translate3d(${((1 - s) * (narrow ? 12 : 46) * out).toFixed(1)}%, ${((1 - s) * 10).toFixed(1)}%, 0) rotate(${lerp((narrow ? 6 : 11) * out, -3, s).toFixed(2)}deg)`;
        phone.style.opacity = narrow ? clamp01((s - 0.25) / 0.55).toFixed(3) : '';
        phone.style.setProperty('--hit', hit.toFixed(3));
      }
      const info = refs.infos.current[i];
      if (info) {
        const e = 1 - clamp01((ad - 0.1) / 0.38);
        const ty = (1 - ease(e)) * 30;
        g.infoTy[i] = ty;
        info.style.opacity = e.toFixed(3);
        info.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0)`;
        if (e > 0) g.flips[i].forEach((it) => flip(it, ty)); // only the stories on screen
      }
    });

    // the open slot: turns in like a project, then plays its entrance once it's centred
    if (g.slot) {
      const d = (g.slot + x - g.vw / 2) / g.vw;
      const ad = Math.min(1, Math.abs(d));
      const s = ease(1 - clamp01((ad - 0.03) / 0.5));
      if (slot.win.current) slot.win.current.style.transform = `perspective(1800px) rotateY(${(Math.max(-1, Math.min(1, d)) * -9).toFixed(2)}deg) scale(${(1 - 0.1 * ease(ad)).toFixed(4)})`;
      if (slot.phone.current) {
        slot.phone.current.style.transform = `translate3d(${((1 - s) * 46).toFixed(1)}%, ${((1 - s) * 10).toFixed(1)}%, 0) rotate(${lerp(11, -3, s).toFixed(2)}deg)`;
        slot.phone.current.style.setProperty('--hit', clamp01(1 - Math.abs(s - 0.9) / 0.1).toFixed(3));
      }
      const root = slot.root.current;
      if (root) {
        if (ad < 0.22 && !root.classList.contains('is-in')) root.classList.add('is-in');
        else if (ad > 0.75 && root.classList.contains('is-in')) root.classList.remove('is-in');
      }
    }

    // the intro moves off with the row (never under the first slide) and fades on its way out
    if (intro.current) intro.current.style.opacity = (1 - clamp01((-x - g.vw * 0.05) / (g.vw * 0.4))).toFixed(3);

    if (g.chrome) flip(g.chrome);
    if (bar.current) bar.current.style.transform = `scaleX(${P.toFixed(4)})`;
    const label = `${pad(active + 1)} / ${pad(ITEMS.length)}`;
    if (count.current && count.current.textContent !== label) count.current.textContent = label;
    if (top < g.vh && top + g.h > 0) limeAmt.set(P);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const measure = useCallback(() => {
    const rw = row.current;
    const st = stage.current;
    const sec = section.current;
    if (!rw || !st || !sec) return;
    const vw = st.clientWidth;
    const vh = window.innerHeight;
    const travel = Math.max(0, rw.scrollWidth - vw);
    const centers = refs.wraps.current.map((w) => (w ? w.offsetLeft + w.offsetWidth / 2 : 0));
    const sl = slot.root.current;
    // text positions, relative to the stage (and without the slide-up the story is currently drawn with)
    const sr = st.getBoundingClientRect();
    const old = geo.current?.infoTy ?? [];
    const at = (el, dy = 0) => { const r = el.getBoundingClientRect(); return { el, y: r.top + r.height / 2 - sr.top - dy, on: el.classList.contains('on-lime') }; };
    const flips = refs.infos.current.map((el, i) => (el ? [...el.querySelectorAll('[data-flip]')].map((f) => at(f, old[i] ?? 0)) : []));
    const h = Math.round(travel / SPEED + vh + HOLD * vh);
    geo.current = {
      vw, vh, H: st.clientHeight, travel, centers, flips, h,
      top: sec.getBoundingClientRect().top + window.scrollY,
      slot: sl ? sl.offsetLeft + sl.offsetWidth / 2 : 0,
      chrome: chrome.current ? at(chrome.current) : null,
      infoTy: old,
    };
    setHeight((prev) => (prev && Math.abs(prev - h) < 2 ? prev : h));
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  useMotionValueEvent(p, 'change', update);
  useEffect(() => {
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (row.current) ro.observe(row.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [measure, i18n.language]);

  // fetch and decode the screenshots a screen or so before the run starts, so they don't decode mid-scroll
  useEffect(() => {
    const sec = section.current;
    if (!sec || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      sec.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; img.decode?.().catch(() => {}); });
    }, { rootMargin: '0px 0px 150% 0px' });
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={section}
      style={{ height: height ? `${height}px` : '460vh' }}
      className="relative"
    >
      {/* the particle cloud stays hidden through the hero and the whole sideways run; it fades in as the lime section takes over */}
      <div aria-hidden="true" data-shape="3" data-mscale="0.7" data-alpha="0" className="pointer-events-none absolute inset-x-0 bottom-0 h-screen" />

      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={lime} aria-hidden="true" style={{ transform: 'translate3d(0, 100svh, 0)' }} className="wk-rise pointer-events-none absolute inset-x-0 top-0 h-[135%] will-change-transform" />

        <div ref={row} className="relative z-10 flex h-full items-center gap-[7vw] pl-[max(20px,6vw)] pt-10 will-change-transform">
          {/* intro */}
          <div ref={intro} className="flex w-[84vw] shrink-0 flex-col justify-center lg:w-[min(70vw,1150px)]">
            <Tag>{t('work.tag')}</Tag>
            <h2 className="mt-6 text-[clamp(6rem,24vw,26rem)] font-medium uppercase leading-[0.78] tracking-[-0.065em]">{t('work.big')}</h2>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-[22ch] font-serif text-[clamp(1.6rem,2.6vw,3rem)] italic leading-[1.05] text-ink-200">{t('work.title')}</p>
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-400">( {pad(ITEMS.length)} ) {t('work.drag')} →</span>
            </div>
          </div>

          {ITEMS.map((it, i) => <Slide key={it.key} it={it} i={i} n={ITEMS.length} refs={refs} />)}

          <Slot refs={slot} />
        </div>

        {/* progress */}
        <div ref={chrome} aria-hidden="true" className="wk-flip pointer-events-none absolute bottom-12 left-0 z-10 flex items-center gap-5 px-[max(20px,6vw)] font-mono text-[11px] uppercase tracking-[0.08em] text-paper lg:bottom-14">
          <span ref={count} className="tabular-nums">01 / {pad(ITEMS.length)}</span>
          <span className="relative h-px w-[min(240px,30vw)]">
            <span className="absolute inset-0 bg-current opacity-20" />
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-current" />
          </span>
        </div>
      </div>
    </section>
  );
}
