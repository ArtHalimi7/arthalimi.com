import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Check, Lock } from 'lucide-react';
import { Roll, Tag } from './ui/primitives';
import { limeAmt } from '../lib/store';
import lbDesk from '../assets/work/lb-desktop.webp';
import lbPhone from '../assets/work/lb-mobile.webp';
import tafaDesk from '../assets/work/tafa-desktop.webp';
import tafaPhone from '../assets/work/tafa-mobile.webp';
import arsaDesk from '../assets/work/arsa-desktop.webp';
import arsaPhone from '../assets/work/arsa-mobile.webp';
import andiDesk from '../assets/work/andi-desktop.webp';
import andiPhone from '../assets/work/andi-mobile.webp';

const ITEMS = [
  { key: 'lb', desk: lbDesk, phone: lbPhone, url: 'https://lbhairdesign.ch', year: '2025' },
  { key: 'tafa', desk: tafaDesk, phone: tafaPhone, url: 'https://tafaleka.com', year: '2026' },
  { key: 'arsa', desk: arsaDesk, phone: arsaPhone, url: 'https://arsagipser.ch', year: '2025' },
  { key: 'andi', desk: andiDesk, phone: andiPhone, url: 'https://andishkodra.com', year: '2025' },
];
const SPEED = 1.8; // px of sideways travel per px scrolled
const host = (u) => u.replace(/^https?:\/\//, '');
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const PAPER = [242, 242, 238];
const INK = [10, 10, 10];
const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
const mono = 'font-mono text-[10px] uppercase tracking-[0.08em] text-ink-400';

/*
 * Work, sideways, built from the hero's kit. The section pins and scrolling moves a row to the left:
 * an intro ("WORK"), one slide per project, and a closing panel.
 * Each slide is the "after" picture of the hero for a real client: the live site in a system window (hover scrolls
 * through it), its phone version, and a glass card of what it does. As a slide reaches the centre its pieces
 * straighten and lock in with the hero's lime flash, and a lime scan line passes over the window.
 * Over the last stretch lime light floods in from the right, so the page runs straight into the lime section.
 */
function Slide({ it, i, n, refs }) {
  const { t } = useTranslation();
  const k = (f) => t(`work.items.${it.key}.${f}`);
  const facts = k('facts');
  const metric = k('metric');
  const set = (name) => (el) => { refs[name].current[i] = el; };

  return (
    <div ref={set('wraps')} className="relative h-[min(76svh,820px)] w-[88vw] shrink-0 lg:w-[min(86vw,1560px)]">
      <span ref={set('nums')} aria-hidden="true" className="pointer-events-none absolute -top-[0.5em] left-[-0.04em] select-none text-[clamp(7rem,15vw,19rem)] font-semibold leading-none tracking-[-0.06em] text-transparent will-change-transform [-webkit-text-stroke:1px_rgba(242,242,238,0.14)]">
        0{i + 1}
      </span>

      <div className="relative z-10 grid h-full grid-rows-[minmax(0,1fr)_auto] gap-5 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-10">
        {/* the stage: site window, phone, what it does */}
        <div className="relative min-h-0 lg:order-2 lg:col-span-8 lg:h-[90%]">
          <a href={it.url} target="_blank" rel="noopener noreferrer" data-cursor={`${t('work.cursor')} ↗`} aria-label={`${k('title')}: ${t('work.visit')}`} className="group absolute inset-0 block">
            <div ref={set('wins')} className="frag-card absolute bottom-[7%] left-0 right-[11%] top-0 flex flex-col overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0D0D0D] will-change-transform lg:right-[13%]">
              <div className="flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-[linear-gradient(180deg,#171718,#111112)] px-4">
                <span className="flex gap-1.5">{[0, 1, 2].map((d) => <span key={d} className="h-2.5 w-2.5 rounded-full bg-paper/[0.12]" />)}</span>
                <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-ink-300"><Lock className="h-3 w-3 shrink-0" /><span className="truncate">{host(it.url)}</span></span>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-lime/[0.12] px-2.5 py-1 text-[10.5px] font-medium text-lime">
                  <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" />{t('work.live')}
                </span>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-ink-950">
                {/* the capture is three screens tall: hovering scrolls through the site */}
                <img
                  src={it.desk}
                  alt={`${k('title')} website`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-[object-position] duration-[1.4s] ease-[cubic-bezier(.45,0,.25,1)] [object-position:50%_0%] group-hover:duration-[7s] group-hover:[object-position:50%_100%]"
                />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
                <span ref={set('scans')} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-px bg-lime opacity-0 shadow-[0_0_20px_4px_rgba(200,255,46,0.45)]" />
              </div>
            </div>

            <div ref={set('phones')} className="frag-card absolute bottom-0 right-0 w-[27%] max-w-[240px] rounded-[30px] border border-white/[0.12] bg-[#0b0b0c] p-[5px] will-change-transform lg:w-[21%]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[25px] bg-ink-950">
                <img src={it.phone} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
                <span className="absolute left-1/2 top-[7px] h-[13px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </a>

          <div ref={set('facts')} className="pointer-events-none absolute -left-[2%] bottom-[16%] z-10 hidden w-[min(250px,42%)] will-change-transform sm:block lg:-left-[5%]">
            <div className="frag-card grainy rounded-[14px] border border-white/[0.08] bg-[linear-gradient(180deg,#1c1c1d_0%,#131314_100%)] p-4">
            {Array.isArray(metric) && (
              <div className="mb-3 border-b border-white/[0.06] pb-3">
                <p className={mono}>{metric[0]}</p>
                <p className="mt-1 text-[30px] font-medium leading-none tracking-[-0.04em] text-lime">{metric[1]}</p>
              </div>
            )}
            <p className={mono}>{t('work.factsLabel')}</p>
            <ul className="mt-2.5 space-y-2">
              {Array.isArray(facts) && facts.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12.5px] text-ink-100">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-lime/[0.14] text-lime"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>{f}
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>

        {/* the story */}
        <div ref={set('infos')} className="will-change-transform lg:order-1 lg:col-span-4">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400">
            <span><span className="text-lime">0{i + 1}</span> / 0{n}</span><span className="h-px w-6 bg-paper/15" /><span>{it.year}</span>
          </div>
          <h3 className="mt-3 text-[clamp(1.9rem,3.4vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.045em] lg:mt-6">{k('title')}</h3>
          <p className="mt-2 font-serif text-[clamp(1.25rem,2vw,2.4rem)] italic leading-[1.05] text-ink-300 lg:mt-3">{k('tag')}</p>
          <p className="mt-6 hidden max-w-[40ch] text-[15px] leading-relaxed text-ink-300 lg:block 2xl:text-[16px]">{k('desc')}</p>
          <div className="mt-4 flex flex-wrap gap-2 lg:mt-6">
            {[k('kind'), k('place')].map((c) => <span key={c} className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 text-[12px] text-ink-200">{c}</span>)}
          </div>
          <a href={it.url} target="_blank" rel="noopener noreferrer" className="roll-host group/cta mt-5 inline-flex items-center gap-3 text-[14px] font-medium lg:mt-8">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/cta:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <Roll>{t('work.visit')}</Roll>
          </a>
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
  const refs = { wraps: useRef([]), wins: useRef([]), phones: useRef([]), facts: useRef([]), infos: useRef([]), nums: useRef([]), scans: useRef([]) };
  const geo = useRef(null);
  const [height, setHeight] = useState(null);
  const { scrollYProgress: p } = useScroll({ target: section, offset: ['start start', 'end end'] });

  const update = useCallback(() => {
    const g = geo.current;
    const sec = section.current;
    if (!g || !sec || !row.current) return;
    const r = sec.getBoundingClientRect();
    const x = -Math.min(Math.max(0, -r.top) * SPEED, g.travel);
    row.current.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;

    let active = 0;
    let best = Infinity;
    g.centers.forEach((c, i) => {
      const d = (c + x - g.vw / 2) / g.vw; // -1 .. 1 across the screen
      const ad = Math.min(1, Math.abs(d));
      if (ad < best) { best = ad; active = i; }
      const s = ease(1 - clamp01((ad - 0.03) / 0.5)); // 1 when the slide is centred
      const hit = clamp01(1 - Math.abs(s - 0.9) / 0.1); // the lime flash as the pieces lock in

      const win = refs.wins.current[i];
      if (win) win.style.transform = `perspective(1800px) rotateY(${(Math.max(-1, Math.min(1, d)) * -9).toFixed(2)}deg) scale(${(1 - 0.1 * ease(ad)).toFixed(4)})`;
      const phone = refs.phones.current[i];
      if (phone) {
        phone.style.transform = `translate3d(${((1 - s) * 46).toFixed(1)}%, ${((1 - s) * 10).toFixed(1)}%, 0) rotate(${lerp(11, -3, s).toFixed(2)}deg)`;
        phone.style.setProperty('--hit', hit.toFixed(3));
      }
      const fact = refs.facts.current[i];
      if (fact) {
        fact.style.transform = `translate3d(${((1 - s) * -40).toFixed(1)}px, ${((1 - s) * 50).toFixed(1)}px, 0) rotate(${lerp(-12, -2, s).toFixed(2)}deg)`;
        fact.style.opacity = clamp01(s * 1.4).toFixed(3);
        fact.style.setProperty('--hit', hit.toFixed(3));
      }
      const info = refs.infos.current[i];
      if (info) {
        const e = 1 - clamp01((ad - 0.1) / 0.38);
        info.style.opacity = e.toFixed(3);
        info.style.transform = `translate3d(0, ${((1 - ease(e)) * 30).toFixed(1)}px, 0)`;
      }
      // a lime scan line passes over the window while the slide crosses the centre
      const scan = refs.scans.current[i];
      if (scan) {
        const pos = (0.3 - d) / 0.6;
        scan.style.opacity = pos > 0 && pos < 1 ? (Math.sin(pos * Math.PI) * 0.95).toFixed(3) : '0';
        scan.style.transform = `translate3d(${(clamp01(pos) * (win?.offsetWidth ?? 0)).toFixed(1)}px, 0, 0)`;
      }
      const num = refs.nums.current[i];
      if (num) num.style.transform = `translate3d(${(d * 16).toFixed(2)}vw, 0, 0)`;
    });
    // the intro lags behind the row and fades as the first slide arrives over it
    if (intro.current) {
      intro.current.style.transform = `translate3d(${(-x * 0.35).toFixed(1)}px, 0, 0)`;
      intro.current.style.opacity = (1 - clamp01((-x - g.vw * 0.15) / (g.vw * 0.45))).toFixed(3);
    }

    // lime floods in from the right over the last stretch
    const L = ease(clamp01((-x - (g.travel - g.vw * 2.3)) / (g.vw * 2.15)));
    if (lime.current) {
      const rr = lerp(-50, 175, L);
      const m = `radial-gradient(circle at 108% 55%, #000 ${rr.toFixed(2)}vmax, transparent ${(rr + 50).toFixed(2)}vmax)`;
      lime.current.style.maskImage = m;
      lime.current.style.webkitMaskImage = m;
    }
    if (chrome.current) chrome.current.style.color = mix(PAPER, INK, clamp01(L * 1.7 - 0.35));
    if (bar.current) bar.current.style.transform = `scaleX(${(g.travel ? -x / g.travel : 0).toFixed(4)})`;
    if (count.current) count.current.textContent = `0${active + 1} / 0${ITEMS.length}`;
    if (r.top < window.innerHeight && r.bottom > 0) limeAmt.set(L);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const measure = useCallback(() => {
    const rw = row.current;
    const st = stage.current;
    if (!rw || !st) return;
    const vw = st.clientWidth;
    const travel = Math.max(0, rw.scrollWidth - vw);
    const centers = refs.wraps.current.map((w) => (w ? w.offsetLeft + w.offsetWidth / 2 : 0));
    geo.current = { vw, travel, centers };
    const h = Math.round(travel / SPEED + window.innerHeight);
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

  const next = t('work.next');
  return (
    <section
      id="work"
      ref={section}
      data-shape="3" data-x="0" data-mx="0" data-my="0" data-scale="1" data-mscale="0.7" data-alpha="0.4" data-malpha="0.3"
      style={{ height: height ? `${height}px` : '460vh' }}
      className="relative"
    >
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={lime} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-lime [mask-image:radial-gradient(circle_at_108%_55%,#000_-50vmax,transparent_0vmax)]" />

        <div ref={row} className="relative z-10 flex h-full items-center gap-[7vw] pl-[max(20px,6vw)] pt-10 will-change-transform">
          {/* intro */}
          <div ref={intro} className="flex w-[84vw] shrink-0 flex-col justify-center will-change-transform lg:w-[min(70vw,1150px)]">
            <Tag>{t('work.tag')}</Tag>
            <h2 className="mt-6 text-[clamp(6rem,24vw,26rem)] font-medium uppercase leading-[0.78] tracking-[-0.065em]">{t('work.big')}</h2>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-[22ch] font-serif text-[clamp(1.6rem,2.6vw,3rem)] italic leading-[1.05] text-ink-200">{t('work.title')}</p>
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-400">( 0{ITEMS.length} ) {t('work.drag')} →</span>
            </div>
          </div>

          {ITEMS.map((it, i) => <Slide key={it.key} it={it} i={i} n={ITEMS.length} refs={refs} />)}

          {/* the hand-over to the lime section */}
          <div className="flex h-full w-[100vw] shrink-0 flex-col justify-center px-[max(20px,6vw)] text-ink">
            {Array.isArray(next) && (
              <p className="text-[clamp(3.4rem,11vw,13rem)] font-medium leading-[0.86] tracking-[-0.06em]">
                <span className="block">{next[0]}</span>
                <span className="block font-serif font-normal italic tracking-[-0.03em]">{next[1]}</span>
              </p>
            )}
          </div>
        </div>

        {/* progress */}
        <div ref={chrome} className="pointer-events-none absolute inset-x-0 bottom-12 z-10 text-paper lg:bottom-14">
          <div className="flex items-center gap-5 px-[max(20px,6vw)] font-mono text-[11px] uppercase tracking-[0.08em]">
            <span ref={count} className="tabular-nums">01 / 0{ITEMS.length}</span>
            <span className="relative h-px w-[min(240px,30vw)]">
              <span className="absolute inset-0 bg-current opacity-20" />
              <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-current" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
