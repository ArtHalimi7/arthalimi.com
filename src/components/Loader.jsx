import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { introA, introAlpha, introB, introFill, introMix, introOn, introScale, textReady } from '../lib/store';
import { EASE } from './ui/primitives';

/*
 * The loader is the particle cloud itself:
 *   scattered points → they assemble into the wordmark "ART HALIMI" → the wordmark fills with lime from left to right
 *   as the counter runs to 100 → the letters scatter into dust and fade out, leaving the hero clean.
 * Shapes (see Scene.jsx): 1 clusters, 5 wordmark.
 */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (t, a, b) => clamp01((t - a) / (b - a));
const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Kept short: the page's main content (and so Largest Contentful Paint) appears at `reveal`.
const T = { assemble: [0.08, 0.7], fill: [0.4, 1.4], melt: [1.45, 2.2], reveal: 1.5, end: 2.25 };
const SEEN = 'ah-intro'; // the intro plays once per browser session
const seenIntro = () => { try { return sessionStorage.getItem(SEEN) === '1'; } catch { return false; } };

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('load'); // load → leave → gone
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const base = window.innerWidth >= 1024 ? 1 : 0.46;
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';

    const finish = () => {
      introOn.set(0);
      document.documentElement.style.overflow = '';
      lenisRef.current?.start();
    };
    if (reduced || seenIntro()) {
      introA.set(1); introB.set(1); introMix.set(0); introFill.set(0); introAlpha.set(0);
      finish(); onDone?.(); setPhase('gone');
      return undefined;
    }

    introOn.set(1);
    introA.set(1); introB.set(1); introMix.set(0); introFill.set(0); introAlpha.set(1);
    introScale.set(base);

    let raf = 0;
    let start = 0;
    let revealed = false;
    const waitStart = performance.now();
    const tick = (now) => {
      // hold the clock until the wordmark exists (or 1.5 s, whichever comes first)
      if (!start) {
        if (textReady.get() || now - waitStart > 700) start = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = (now - start) / 1000;
      const melt = inOut(ramp(t, ...T.melt));
      if (t < T.melt[0]) {
        introA.set(1); introB.set(5);
        introMix.set(inOut(ramp(t, ...T.assemble)));
      } else {
        // the letters drift apart into dust while it fades out
        introA.set(5); introB.set(1);
        introMix.set(melt);
        introScale.set(base * (1 + melt * 0.35));
        introAlpha.set(1 - ramp(melt, 0.15, 1));
      }
      const fill = inOut(ramp(t, ...T.fill));
      introFill.set(fill);
      setCount(Math.round(fill * 100));
      if (t >= T.melt[0] && phase !== 'leave') setPhase('leave');
      if (t >= T.reveal && !revealed) {
        revealed = true;
        onDone?.();
        try { sessionStorage.setItem(SEEN, '1'); } catch { /* ignore */ }
      }
      if (t >= T.end) {
        introA.set(1); introB.set(1); introMix.set(0); introAlpha.set(0);
        finish();
        setPhase('gone');
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (phase !== 'gone') lenis?.stop(); }, [lenis, phase]);

  if (phase === 'gone') return null;
  const leaving = phase === 'leave';
  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" data-nosnippet="">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: leaving ? 0.5 : 0.8, ease: EASE }}
        className="absolute inset-x-0 bottom-8 grid grid-cols-3 items-end px-5 text-[12px] text-ink-400 sm:px-8 lg:px-14"
      >
        <span>Art Halimi Studio</span>
        <span className="justify-self-center font-mono text-[13px] tabular-nums text-paper">{String(count).padStart(3, '0')}</span>
        <span className="justify-self-end">Gelsenkirchen, DE</span>
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-x-0 top-8 flex justify-between px-5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-500 sm:px-8 lg:px-14"
      >
        <span>Systems loading</span>
        <span>{count < 100 ? 'Mapping' : 'Ready'}</span>
      </m.div>
    </div>
  );
}
