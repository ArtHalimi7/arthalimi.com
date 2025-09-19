
import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
                className="mt-[150px] max-w-xl text-zinc-300"
              >
                {t('description')}
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.22, ease: 'easeOut' }}
                  className="inline-flex items-center px-5 py-3 font-medium text-white shadow-sm border border-[#B71C1C] bg-[#B71C1C] transition-all duration-300 ease-out hover:bg-[#8B1515] hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] focus:ring-offset-2 ring-offset-[#18191A] relative overflow-hidden group"
                  style={{ borderRadius: 0 }}
                >
                  <span className="relative z-10">{t('contact')}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </motion.a>
                <motion.a
                  href="#projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.32, ease: 'easeOut' }}
                  className="inline-flex items-center px-5 py-3 font-medium text-[#B71C1C] border border-[#B71C1C] bg-transparent transition-all duration-300 ease-out hover:bg-black hover:text-white hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B71C1C] focus:ring-offset-2 ring-offset-[#18191A] relative overflow-hidden group"
                  style={{ borderRadius: 0 }}
                >
                  <span className="relative z-10">{t('seeWork')}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#B71C1C] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              </div>
            </div>
          </AnimatedFadeUp>
        </div>
      </div>
    </section>
  );
}

function Lines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Outer frame with pencil drawing animation */}
      <motion.div className="absolute left-2 right-2 top-2 bottom-[50px]">

        {/* Bottom rule with pencil drawing */}
        <motion.span
          className="absolute left-0 right-0 -bottom-12 h-px bg-white/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      <motion.span
        className="absolute top-0 bottom-0 left-10 w-px bg-white/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
      
      {/* Right gutter - draws top to bottom with slight delay */}
      <motion.span
        className="absolute top-0 bottom-0 right-10 w-px bg-white/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />

      {/* Pencil drawing effect dots */}
      <PencilDrawingEffects />
    </div>
  );
}

function PencilDrawingEffects() {
  const pencilPositions = [
    // Following the drawing path
    { x: "8px", y: "8px", delay: 0.5 }, // Start top-left
    { x: "50%", y: "8px", delay: 1.1 }, // Middle of top line
    { x: "calc(100% - 8px)", y: "8px", delay: 1.7 }, // End top line
    { x: "calc(100% - 8px)", y: "50%", delay: 2.5 }, // Middle of right line
    { x: "calc(100% - 8px)", y: "calc(100% - 58px)", delay: 3.2 }, // End right line
    { x: "50%", y: "calc(100% - 58px)", delay: 3.8 }, // Middle of bottom line
    { x: "8px", y: "calc(100% - 58px)", delay: 4.4 }, // End bottom line
    { x: "8px", y: "50%", delay: 5.0 }, // Middle of left line
  ];

  return (
    <>
      {pencilPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#B71C1C]/60 rounded-full"
          style={{ left: pos.x, top: pos.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 1], 
            opacity: [0, 1, 0.8] 
          }}
          transition={{ 
            duration: 0.3, 
            delay: pos.delay,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Drawing dust/eraser particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
            y: [0, -10, -20]
          }}
          transition={{
            duration: 1.5,
            delay: 7 + Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </>
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
    // Delayed to appear after main frame drawing
    // make these faster: previously very long delays (ms), shorten by ~80%
    reveal(side === 'left' ? 1400 : 1800);
  }, [side]);

  return (
    <motion.span 
      className={`${className} absolute ${side}-0`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: visible ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      aria-hidden 
    />
  );
}

function AnimatedLineHorizontal({ className = '', delay = 300 }) {
  return (
    <motion.div 
      className={className}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.45, delay: delay / 1000, ease: "easeInOut" }}
      style={{ transformOrigin: "left" }}
      aria-hidden 
    />
  );
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
  // 'console.log(greet("Art"));',
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

