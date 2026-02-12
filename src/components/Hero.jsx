import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import macbook from '../assets/macbook.webp';

const Grainient = lazy(() => import('./Grainient'));

export default function HeroWithGridLines() {
  const { t } = useTranslation();
  const [shouldRenderWebGL, setShouldRenderWebGL] = useState(false);

  useEffect(() => {
    // Delay WebGL initialization slightly to prioritize initial paint
    const timer = setTimeout(() => setShouldRenderWebGL(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex items-center pt-24 md:pt-32 pb-12 md:pb-20">
      {/* Background: Grainient WebGL gradient (Lazy Loaded & Deferred) */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
        {shouldRenderWebGL && (
          <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
            <Grainient
              color1="#000000"
              color2="#9752f8ff"
              timeSpeed={0.25}
              colorBalance={0}
              warpStrength={1}
              warpFrequency={5}
              warpSpeed={2}
              warpAmplitude={50}
              blendAngle={0}
              blendSoftness={0.05}
              rotationAmount={500}
              noiseScale={2}
              grainAmount={0.1}
              grainScale={2}
              grainAnimated={false}
              contrast={1.5}
              gamma={1}
              saturation={1}
              centerX={0}
              centerY={0}
              zoom={0.9}
            />
          </Suspense>
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* Left Column: Text Content */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 md:gap-10 order-1 lg:order-1">
            <header className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] md:text-sm font-bold text-purple-400 tracking-[0.4em] uppercase font-mono"
              >
                {t('hi')} <span className="text-white">Art Halimi</span>
              </motion.p>

              <h1
                className="font-extralight uppercase leading-[0.85] tracking-tighter text-[clamp(4rem,16vw,6.5rem)] lg:text-[clamp(2.5rem,10vw,6.5rem)] text-white"
              >
                <AnimatedStagger stagger={120} initialDelay={200}>
                  <span className="block">{t('title1')}</span>
                  <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-purple-500 pb-2 pr-4 whitespace-nowrap">
                    {t('title2')}
                  </span>
                  <span className="block opacity-90">{t('title3')}</span>
                </AnimatedStagger>
              </h1>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto mt-4 md:mt-0"
            >
              <a
                href="#projects"
                className="group relative flex items-center gap-6 px-14 py-7 md:px-12 md:py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 text-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              >
                <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] md:text-[10px] font-bold group-hover:text-white transition-colors">
                  {t('cta_work')}
                </span>
                <div className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
                  <ArrowRight size={18} />
                </div>
              </a>

              <a
                href="#contact"
                className="group flex items-center gap-6 px-6 py-3 text-white font-bold hover:text-purple-300 transition-all duration-300"
              >
                <span className="uppercase tracking-[0.4em] text-[12px] md:text-[11px] font-bold font-mono">
                  {t('cta_contact')}
                </span>
                <div className="p-3 md:p-2.5 border border-white/10 rounded-full group-hover:border-purple-500/50 transition-colors bg-white/5">
                  <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Terminal Window (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 relative order-2 lg:order-2 justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="relative w-full max-w-[580px]"
            >
              {/* MacBook Image */}
              <img
                src={macbook}
                alt="Art Halimi Fullstack Developer Projects"
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(151,82,248,0.3)]"
              />

              {/* Code Screen Overlay */}
              <div className="absolute top-[16%] left-[13.3%] w-[73.5%] h-[63%] z-10 overflow-hidden sm:rounded-sm">
                <div className="w-full h-full p-2 sm:p-4 md:p-6 overflow-hidden">
                  <AnimatedCodeSnippet />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStagger({ children, stagger = 100, initialDelay = 0 }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className="overflow-hidden py-4 px-6 -mx-6 md:px-12 md:-mx-12">
      {items.map((child, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: (initialDelay / 1000) + (i * stagger / 1000),
            ease: [0.22, 1, 0.36, 1]
          }}
          className="block"
        >
          {child}
        </motion.span>
      ))}
    </div>
  );
}

// --- OPTIMIZATION START: Moved regex logic outside component to prevent re-parsing on every tick ---
const TOKEN_REGEX = /(\b(?:class|extends|constructor|this|return|new)\b)|('[^']*')|(\{|\}|\(|\)|\[|\]|;)/g;

function highlightSyntax(text) {
  const parts = [];
  let lastIndex = 0;
  let match;

  // Create a fresh regex instance for each execution to reset state
  const regex = new RegExp(TOKEN_REGEX);

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push({ text: text.slice(lastIndex, match.index), type: 'plain' });
    if (match[1]) parts.push({ text: match[1], type: 'keyword' });
    else if (match[2]) parts.push({ text: match[2], type: 'string' });
    else if (match[3]) parts.push({ text: match[3], type: 'brace' });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), type: 'plain' });
  return parts;
}
// --- OPTIMIZATION END ---

function AnimatedCodeSnippet() {
  const lines = [
    "class ArtHalimi extends Dev {",
    "  constructor() {",
    "    this.role = 'Full Stack';",
    "    this.tech = ['React', 'Node', 'Express'];",
    "    this.focus = 'Performance';",
    "  }",
    "  build() {",
    "    return 'Clean Code';",
    "  }",
    "};"
  ];

  const fullText = lines.join('\n');
  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState(1);

  // Memoize the highlighted parts to avoid calculation on every render
  const highlightedParts = useMemo(() => {
    return highlightSyntax(fullText.slice(0, pos));
  }, [fullText, pos]);

  useEffect(() => {
    const tick = () => {
      if (direction === 1) {
        if (pos < fullText.length) setPos(p => p + 1);
        else setDirection(-1);
      } else {
        if (pos > 0) setPos(p => p - 1);
        else setDirection(1);
      }
    };
    const delay = direction === 1 ? 70 : 50;
    const pause = pos === fullText.length ? 3000 : pos === 0 ? 1000 : delay;
    const timer = setTimeout(tick, pause);
    return () => clearTimeout(timer);
  }, [pos, direction, fullText]);

  return (
    <div className="font-mono text-[11px] sm:text-xs md:text-sm leading-[1.8] whitespace-pre select-none text-left w-full h-full">
      {highlightedParts.map((p, i) => {
        if (p.type === 'keyword') return <span key={i} className="text-purple-400 font-bold">{p.text}</span>;
        if (p.type === 'string') return <span key={i} className="text-emerald-400">{p.text}</span>;
        if (p.type === 'brace') return <span key={i} className="text-blue-400">{p.text}</span>;
        return <span key={i} className="text-zinc-500">{p.text}</span>;
      })}
      <span
        className="cursor-blink inline-block w-[6px] h-[14px] md:h-[18px] bg-purple-500/60 ml-1 align-middle"
      />
    </div>
  );
}