import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { limeAmt } from '../lib/store';
import { useScrollTo } from './Nav';
import { Roll } from './ui/primitives';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeIn = (t) => Math.pow(t, 2.2);
const ramp = (v, a, b) => clamp01((v - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const px = (v) => `${Math.max(0, v).toFixed(1)}px`;

/*
 * The inverted section. Everything is driven by where the section sits on screen (in viewport heights):
 *   enter  the section arrives already lime: Work, above it, ends on a lime screen
 *   hold   until the bottom   everything is lime; the copy is pinned
 *          edge reaches the
 *          screen
 *   exit   bottom 1.00 → 0.30  the section's bottom edge rises like any section end, so the next section
 *                             scrolls in right under it; the top edge drops to meet it → one lime scan line
 *   hand   bottom 0.28 → 0.14  the scan line retracts into the lime dash of the next section's label
 */
function Line({ children, p, from, to, className = '' }) {
  const x = useTransform(p, [0.12, 0.88], [from, to]);
  return <m.span style={{ x }} className={`block whitespace-nowrap will-change-transform ${className}`}>{children}</m.span>;
}

export default function Shift() {
  const { t, i18n } = useTranslation();
  const go = useScrollTo();
  const ref = useRef(null);
  const limeRef = useRef(null);
  const pinned = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const clip = useMotionValue('circle(0px at 50% 50%)');
  // the same lime shape, expressed in the pinned text layer's own box, so black text only exists where there is lime
  const textClip = useMotionValue('circle(0px at 50% 50%)');
  const cta = useMotionValue(0);
  const lines = t('shift.lines');

  const update = useCallback(() => {
    const el = ref.current;
    const lime = limeRef.current;
    const pin = pinned.current;
    if (!el || !lime || !pin) return;
    const V = window.innerHeight;
    const r = el.getBoundingClientRect();
    const L = lime.getBoundingClientRect(); // the lime layer reaches a little past the section, onto the next label
    const c = pin.getBoundingClientRect();
    const top = r.top / V;
    const bot = r.bottom / V;

    if (top >= 1) return; // still below the screen: the section above owns the colour
    if (bot >= 1) {
      // enter + hold: the section arrives already lime (Work hands over a lime screen)
      clip.set('inset(0px 0px 0px 0px)');
      textClip.set('inset(0px 0px 0px 0px)');
      limeAmt.set(1);
      cta.set(ramp(-top, 0.12, 0.36));
      return;
    }

    // exit: band from y0 to y1 on screen, x0..x1 wide
    const B = r.bottom;
    const e = easeIn(ramp(1 - bot, 0, 0.7));
    const k = ease(ramp(1 - bot, 0.72, 0.86));
    let x0 = L.left;
    let x1 = L.right;
    let y1 = B;
    let y0 = B - Math.max(2, B * (1 - e));
    if (k > 0) {
      const dash = el.nextElementSibling?.querySelector('[data-tag-dash]')?.getBoundingClientRect();
      if (dash) {
        const th = lerp(2, Math.max(1, dash.height), k);
        const yc = lerp(B - 1, dash.top + dash.height / 2, k);
        x0 = lerp(L.left, dash.left, k);
        x1 = lerp(L.right, dash.right, k);
        y0 = yc - th / 2;
        y1 = yc + th / 2;
      }
    }
    if (k >= 1) {
      clip.set('inset(50% 50% 50% 50%)'); // the label's own dash carries on
    } else {
      clip.set(`inset(${px(y0 - L.top)} ${px(L.right - x1)} ${px(L.bottom - y1)} ${px(x0 - L.left)})`);
    }
    textClip.set(y1 - y0 < 3 ? 'inset(50% 50% 50% 50%)' : `inset(${px(y0 - c.top)} ${px(c.right - x1)} ${px(c.bottom - y1)} ${px(x0 - c.left)})`);
    limeAmt.set(clamp01((y1 - y0) / V));
    cta.set(1);
  }, [clip, textClip, cta]);

  useMotionValueEvent(p, 'change', update);
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return (
    <section ref={ref} data-shape="3" data-x="0" data-mx="0" data-my="-2.05" data-scale="1" data-mscale="0.62" data-alpha="0.55" className="relative h-[170vh]">
      <m.div ref={limeRef} style={{ clipPath: clip }} className="pointer-events-none absolute inset-x-0 -bottom-24 top-0 bg-lime" />
      <m.div ref={pinned} style={{ clipPath: textClip }} className="sticky top-0 z-10 flex h-[100svh] flex-col justify-center overflow-hidden text-ink">
        <div className="wrap">
          <p className="flex items-center gap-3 text-[13px] font-medium"><span className="h-px w-6 bg-ink" /> {t('shift.tag')}</p>
        </div>
        <h2 key={i18n.language} style={{ fontSize: `min(11.5vw, ${(185 / Math.max(...(Array.isArray(lines) ? lines.map((l) => l.length) : [16]))).toFixed(2)}vw, 12rem)` }} className="mt-6 font-medium leading-[0.9] tracking-[-0.06em]">
          {Array.isArray(lines) && lines.map((l, i) => (
            <Line key={i} p={p} from={i % 2 ? '-18%' : '14%'} to={i % 2 ? '6%' : '-10%'} className={i === 1 ? 'pl-[8vw]' : 'pl-[3vw]'}>
              {l}
            </Line>
          ))}
        </h2>
        <m.div style={{ opacity: cta }} className="wrap mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[46ch] text-[17px] font-medium leading-relaxed">{t('shift.body')}</p>
          <button type="button" onClick={() => go('contact')} className="btn shrink-0 self-start bg-ink text-lime hover:bg-ink-800">
            <Roll>{t('shift.cta')}</Roll> <ArrowUpRight className="h-4 w-4" />
          </button>
        </m.div>
      </m.div>
    </section>
  );
}
