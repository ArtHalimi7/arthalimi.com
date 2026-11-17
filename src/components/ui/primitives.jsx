import { useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useMotionValue, useTransform } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];
const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Lines slide up from a mask. Pass an array of strings, one per line. */
export function Lines({ lines, className = '', lineClassName = [], delay = 0, animate: forced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const go = forced ?? inView;
  return (
    <span ref={ref} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <m.span
            className={`block will-change-transform ${lineClassName[i] ?? ''}`}
            initial={{ y: '105%' }}
            animate={go ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export function CountUp({ value, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const match = String(value).match(/^(\D*)([\d.,]+)(\D*)$/);
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);
  useEffect(() => {
    if (!match) { setShown(value); return undefined; }
    if (!inView) return undefined;
    if (prefersReduced()) { setShown(value); return undefined; }
    const [, pre, num, suf] = match;
    const sep = num.includes(',') ? ',' : num.includes('.') ? '.' : '';
    const target = Number(num.replace(/[.,]/g, ''));
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      const n = Math.round(target * (1 - Math.pow(1 - p, 4)));
      setShown(`${pre}${sep ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep) : n}${suf}`);
      if (p < 1) raf = requestAnimationFrame(tick); else setShown(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);
  return <span ref={ref} className={className}>{shown}</span>;
}

/** Pulls its child toward the cursor a little (pointer devices only). */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || window.matchMedia('(hover: none)').matches) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate3d(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px, 0)`;
    };
    const leave = () => { el.style.transform = 'translate3d(0,0,0)'; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [strength]);
  return <span ref={ref} className={`inline-block transition-transform duration-300 ease-out ${className}`}>{children}</span>;
}

const GLYPHS = '!<>-_\/[]{}=+*^?#01ABCDEFXYZ';
/** Text that decrypts from random glyphs; replays on hover of the closest .group (or itself). */
export function Scramble({ text, className = '', trigger = 0, speed = 26 }) {
  const [out, setOut] = useState(text);
  const timer = useRef(0);
  useEffect(() => {
    setOut(text);
    if (!trigger || prefersReduced()) return undefined;
    clearInterval(timer.current);
    let frame = 0;
    const total = text.length + 8;
    timer.current = setInterval(() => {
      frame++;
      const shown = Math.max(0, frame - 6);
      setOut(text.split('').map((ch, i) => (ch === ' ' ? ' ' : i < shown ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''));
      if (frame >= total) { clearInterval(timer.current); setOut(text); }
    }, speed);
    return () => clearInterval(timer.current);
  }, [text, trigger, speed]);
  return <span className={className} aria-label={text}><span aria-hidden="true">{out}</span></span>;
}

/** Section label: a short lime rule and plain text. */
export function Tag({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-[13px] font-medium text-ink-300 ${className}`}>
      <span data-tag-dash="" className="h-px w-6 bg-lime" />
      {children}
    </div>
  );
}

/** Brand symbol (direction A, "the scan line"): A diagonals on shared H stems, lime scan line as the crossbar. */
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M5.5 34 L20 5.5 L34.5 34 M5.5 6.5 V34 M34.5 6.5 V34" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M4 23.5 H36" fill="none" stroke="#C8FF2E" strokeWidth="2.6" strokeLinecap="square" />
    </svg>
  );
}

/** Button label that rolls up on hover (the copy below rolls in). Use inside .btn. */
export function Roll({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

// Art's signature as single pen strokes, in writing order (pen lifts between them).
const SIG = {
  viewBox: '0 0 560 200',
  transform: 'translate(34 0) skewX(-14)',
  strokes: [
    'M26 150 C44 112 64 70 88 26 C89 64 93 106 101 140 C104 152 96 150 86 138 C76 124 58 114 40 112 C80 100 118 94 146 98 C150 99 152 92 156 86 C157 99 158 110 160 120 C164 104 171 95 181 95 C187 95 189 101 195 100 C201 82 206 62 211 44 C208 72 205 100 208 124 C210 134 219 132 229 122',
    'M193 84 C207 81 223 79 238 80',
    'M290 50 C287 82 282 114 276 144',
    'M332 44 C328 80 323 114 318 146',
    'M262 104 C294 95 328 90 356 92 C340 90 331 110 341 114 C351 117 357 102 359 94 C358 106 359 116 365 116 C375 108 383 74 387 42 C389 32 381 34 379 46 C375 76 375 102 381 114 C385 120 391 116 397 106 C399 100 401 96 403 94 C402 102 403 110 407 112 C411 108 413 98 417 94 C421 94 421 106 421 114 C425 102 430 94 436 94 C440 96 440 106 441 114 C445 102 451 94 457 94 C461 96 461 106 463 114 C467 106 470 98 473 94 C473 102 474 110 479 112 C494 112 508 104 520 94',
    'M404 76 l1.6 -0.6',
    'M476 76 l1.6 -0.6',
    'M70 176 C60 170 74 164 96 162 C200 154 360 150 470 132 C496 128 512 122 526 114',
  ],
};
const PEN_LIFT = 60; // pause between strokes, in path-length units

function SigStroke({ d, t, span, width, setRef }) {
  const len = useTransform(t, span, [0, 1], { clamp: true });
  const opacity = useTransform(t, [span[0], span[0] + 0.001], [0, 1], { clamp: true });
  return <m.path ref={setRef} d={d} style={{ pathLength: len, opacity }} stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
}

/**
 * Art's signature, drawn stroke by stroke at the speed of a pen (longer strokes take longer).
 * Pass `progress` (a motion value 0..1) to tie it to scroll, or `play` to write it once.
 */
export function Signature({ progress, play = false, duration = 2.4, delay = 0, width = 2.8, className = '', label = 'Art Halimi' }) {
  const own = useMotionValue(0);
  const t = progress ?? own;
  const paths = useRef([]);
  const [spans, setSpans] = useState(() => SIG.strokes.map((_, i, a) => [i / a.length, (i + 1) / a.length]));

  useEffect(() => {
    const lens = paths.current.map((p) => (p?.getTotalLength ? p.getTotalLength() : 100));
    const total = lens.reduce((s, l) => s + l, 0) + PEN_LIFT * (lens.length - 1);
    let at = 0;
    setSpans(lens.map((l) => { const s = [at / total, (at + l) / total]; at += l + PEN_LIFT; return s; }));
  }, []);

  useEffect(() => {
    if (progress) return undefined;
    if (!play) { own.set(0); return undefined; }
    if (prefersReduced()) { own.set(1); return undefined; }
    const c = animate(own, 1, { duration, delay, ease: [0.5, 0.05, 0.35, 1] });
    return () => c.stop();
  }, [play, progress, duration, delay, own]);

  return (
    <svg viewBox={SIG.viewBox} className={className} role="img" aria-label={label}>
      <g transform={SIG.transform}>
        {SIG.strokes.map((d, i) => (
          <SigStroke key={i} d={d} t={t} span={spans[i]} width={width} setRef={(el) => { paths.current[i] = el; }} />
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark className="h-7 w-7" />
      <span className="text-[15px] font-semibold tracking-[-0.02em]">Art Halimi</span>
      <span className="text-[15px] font-normal tracking-[-0.02em] text-ink-300">Studio</span>
    </span>
  );
}
