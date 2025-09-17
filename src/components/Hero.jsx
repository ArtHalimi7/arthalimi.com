
import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import windowBg from '../assets/window.png';

export default function HeroWithGridLines() {
  const [time, setTime] = useState(new Date());
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const formatted = time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });


  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#18191A] text-zinc-100">
      <Lines />

      {/* HERO */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
        {/* Container boundary lines (animated) */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatedLineSide side="left" className="top-0 h-full w-px bg-white/10" />
          <AnimatedLineSide side="right" className="top-0 h-full w-px bg-white/10" />
        </div>

        <div className="flex items-start justify-between">
          <h1
            className="font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-[clamp(2.75rem,9vw,7.5rem)] text-[#e7e6e3] text-center pl-0 md:text-left md:pl-64"
            style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Cantarell, Noto Sans, sans-serif' }}
          >
            <AnimatedStagger stagger={120} initialDelay={100}>
              <p className="text-lg md:text-xl font-semibold text-zinc-100 text-center tracking-widest md:text-left">
                {t('hi')} <span className="text-[#B71C1C]">Art Halimi</span>
              </p>
              <span className="block">{t('title1')}</span>
              <span className="block ml-24 md:ml-40 whitespace-nowrap">{t('title2')}</span>
              <span className="block">{t('title3')}</span>
            </AnimatedStagger>
          </h1>

          {/* close flex container */}
        </div>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          {/* Animated Code Snippet */}
          <AnimatedFadeUp delay={220}>
            <div className="group relative">
              <div className="absolute -inset-4 rounded-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center">
                <img
                  src={windowBg}
                  alt="window background"
                  className="absolute inset-0 h-full w-full object-cover opacity-100 transform scale-[1.8] sm:scale-[1.5] md:scale-[1.75] md:-translate-x-6 md:-translate-y-4"
                />
                <div className="absolute inset-0 flex items-start justify-start pt-12 sm:pt-20 md:pt-28 pl-12 sm:pl-8 md:pl-16 pointer-events-auto">
                  <div className="w-full max-w-[320px] sm:max-w-[360px] h-[200px] sm:h-[220px] overflow-hidden">
                    <AnimatedCodeSnippet />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedFadeUp>

          {/* Copy & CTAs */}
          <AnimatedFadeUp delay={340}>
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="text-xl">*</span>
                <AnimatedLineHorizontal className="h-px flex-1 bg-white/10" delay={420} />
                <span className="text-[10px] uppercase tracking-widest text-red-600">{t('role')}</span>
              </div>

              <p className="mt-[150px] max-w-xl text-zinc-300">
                {t('description')}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center rounded-xl bg-[#B71C1C] px-5 py-3 font-medium text-white shadow-sm hover:brightness-95 hover:bg-[#8B1515]"
                >
                  {t('contact')}
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-xl px-5 py-3 ring-1 ring-white/15 hover:bg-[#B71C1C] hover:text-white"
                >
                  {t('seeWork')}
                </a>
              </div>
            </div>
          </AnimatedFadeUp>
        </div>
      </div>
    </section>
  );
}

function Lines() {
  // animate: outer frame, bottom rule, left gutter, right gutter
  const [visible, setVisible] = useState({ frame: false, bottom: false, left: false, right: false });
  const timers = useRef([]);

  useEffect(() => {
    // staggered delays (ms)
    const delays = {
      frame: 120,
      bottom: 340,
      left: 560,
      right: 680,
    };

    timers.current.push(window.setTimeout(() => setVisible((v) => ({ ...v, frame: true })), delays.frame));
    timers.current.push(window.setTimeout(() => setVisible((v) => ({ ...v, bottom: true })), delays.bottom));
    timers.current.push(window.setTimeout(() => setVisible((v) => ({ ...v, left: true })), delays.left));
    timers.current.push(window.setTimeout(() => setVisible((v) => ({ ...v, right: true })), delays.right));

    return () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Outer frame (like the red guide lines in the screenshot) */}
      <div
        className={`absolute left-2 right-2 top-2 bottom-[50px] transition-all duration-500 ease-out transform origin-center ${
          visible.frame ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <span
          className={`absolute left-0 right-0 -bottom-12 h-px bg-white/10 transition-opacity duration-400 ease-out ${
            visible.bottom ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Inner gutter lines */}
      <span
        className={`absolute top-0 bottom-0 left-10 w-px bg-white/10 transition-all duration-500 ease-out transform ${
          visible.left ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
      />
      <span
        className={`absolute top-0 bottom-0 right-10 w-px bg-white/10 transition-all duration-500 ease-out transform ${
          visible.right ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      />
    </div>
  );
}

// small hook to reveal after delay(s)
function useStaggeredReveal(initial = false) {
  const [on, setOn] = useState(initial);
  const timer = useRef(null);
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const reveal = (delay = 0) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOn(true), delay);
  };
  return [on, reveal];
}

function AnimatedLineSide({ side = 'left', className = '' }) {
  const [visible, reveal] = useStaggeredReveal(false);
  useEffect(() => {
    // small base delay depending on side
    reveal(side === 'left' ? 520 : 700);
  }, [side]);

  const base = `${className} absolute ${side}-0 transition-all duration-500 ease-out transform ${
    visible ? 'opacity-100 translate-x-0' : 'opacity-0 ' + (side === 'left' ? '-translate-x-2' : 'translate-x-2')
  }`;
  return <span className={base} aria-hidden />;
}

function AnimatedLineHorizontal({ className = '', delay = 300 }) {
  const [visible, reveal] = useStaggeredReveal(false);
  useEffect(() => {
    reveal(delay);
  }, [delay]);

  return <div className={`${className} transition-opacity duration-400 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`} aria-hidden />;
}

// Reveal children one-by-one with a stagger
function AnimatedStagger({ children, stagger = 100, initialDelay = 0 }) {
  const items = Array.isArray(children) ? children : [children];
  const [visible, setVisible] = useState(() => items.map(() => false));
  const timers = useRef([]);

  useEffect(() => {
    // schedule staggered reveals
    items.forEach((_, i) => {
      const d = initialDelay + i * stagger;
      timers.current.push(window.setTimeout(() => {
        setVisible((v) => {
          const copy = v.slice();
          copy[i] = true;
          return copy;
        });
      }, d));
    });

    return () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, [children]);

  return (
    <>
      {items.map((child, i) => (
        <span
          key={i}
          className={`block transition-all duration-500 ease-out transform ${visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
          aria-hidden={false}
        >
          {child}
        </span>
      ))}
    </>
  );
}

function AnimatedFadeUp({ children, delay = 200 }) {
  const [visible, setVisible] = useState(false);
  const t = useRef(null);
  useEffect(() => {
    t.current = window.setTimeout(() => setVisible(true), delay);
    return () => {
      if (t.current) clearTimeout(t.current);
    };
  }, [delay]);

  return (
    <div className={`transition-all duration-500 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
      {children}
    </div>
  );
}

// Animated code snippet component (gray background, red highlights, typing animation)
function AnimatedCodeSnippet() {
  // Code content as an array of lines (easy to edit)
  const lines = [
    'function greet(name) {',
    "  if (!name) {",
    "    return 'Hello, World!';",
    '  }',
    "  return `Hello, ${name}!`;",
    '}',
    '',
    'console.log(greet("Art"));',
  ];

  const fullText = lines.join('\n');

  // Configurable timings
  const TYPING_DELAY = 45; // ms per char
  const ERASING_DELAY = 25; // ms per char when erasing
  const PAUSE_AT_END = 1200; // pause after finishing typing
  const PAUSE_AT_START = 600; // pause after erasing

  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = typing, -1 = erasing
  const timerRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Typing / erasing loop
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (direction === 1) {
      if (pos < fullText.length) {
        timerRef.current = window.setTimeout(() => setPos((p) => p + 1), TYPING_DELAY);
      } else {
        timerRef.current = window.setTimeout(() => setDirection(-1), PAUSE_AT_END);
      }
    } else {
      if (pos > 0) {
        timerRef.current = window.setTimeout(() => setPos((p) => p - 1), ERASING_DELAY);
      } else {
        timerRef.current = window.setTimeout(() => setDirection(1), PAUSE_AT_START);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pos, direction, fullText.length]);

  // Tokenize the visible text and return React nodes with Tailwind classes.
  // This avoids dangerouslySetInnerHTML and is easier to reason about.
  const renderHighlighted = (s) => {
    if (!s) return null;

    // Split into tokens: keywords, strings, braces, or other text
    const tokenRegex = /(\b(?:function|return|if|console|log)\b)|('[^']*'|"[^"]*")|(\{|\})/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(s)) !== null) {
      const index = match.index;
      if (index > lastIndex) {
        parts.push({ text: s.slice(lastIndex, index), type: 'plain' });
      }
      if (match[1]) parts.push({ text: match[1], type: 'keyword' });
      else if (match[2]) parts.push({ text: match[2], type: 'string' });
      else if (match[3]) parts.push({ text: match[3], type: 'brace' });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < s.length) parts.push({ text: s.slice(lastIndex), type: 'plain' });

    return parts.map((p, i) => {
      if (p.type === 'keyword') return (
        <span key={i} className="text-[#ff4444] font-semibold">{p.text}</span>
      );
      if (p.type === 'string') return (
        <span key={i} className="text-gray-300">{p.text}</span>
      );
      if (p.type === 'brace') return (
        <span key={i} className="text-[#ff6b6b]">{p.text}</span>
      );
      return <span key={i}>{p.text}</span>;
    });
  };

  const visible = fullText.slice(0, pos);

  return (
    <div aria-live="polite" className="bg-transparent rounded-2xl p-2 text-[0.95rem] leading-relaxed w-full text-gray-200 font-mono whitespace-pre-wrap select-text">
      <div>{renderHighlighted(visible)}</div>
      <span className={`ml-1 ${direction === 1 && pos < fullText.length ? 'animate-pulse' : 'opacity-80'}`} style={{ color: '#ff4444' }}>
        |
      </span>
    </div>
  );
}

