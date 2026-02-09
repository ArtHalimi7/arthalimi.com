import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import ColorBends from './ColorBendsFallback';
import { ArrowRight, Terminal } from 'lucide-react';

export default function HeroWithGridLines() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  
  return (
    <section id="home" ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex items-center pt-32 pb-20">
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <ColorBends />
      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">
              {t('role')}
            </span>
          </motion.div>

          <h1
            className="font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(2.5rem,8vw,6.5rem)] text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <AnimatedStagger stagger={150} initialDelay={200}>
              <div className="flex flex-col gap-0">
                <p className="text-sm md:text-lg font-medium text-purple-400 tracking-[0.2em] mb-4 normal-case font-mono">
                  {t('hi')} <span className="text-white">Art Halimi</span>
                </p>
                <div className="flex flex-col">
                  <span className="block">{t('title1')}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">
                    {t('title2')}
                  </span>
                  <span className="block opacity-90">{t('title3')}</span>
                </div>
              </div>
            </AnimatedStagger>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-10 max-w-xl"
          >
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light">
              {t('hero_description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-3.5 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                  {t('cta_work')} <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              
              <button className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-lg backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
                {t('cta_contact')}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative aspect-[4/3] lg:aspect-square w-full"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 flex items-center px-6 gap-2 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-purple-500/30" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                  <div className="w-2 h-2 rounded-full bg-green-500/30" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">art_halimi.js</span>
                </div>
                <Terminal className="w-3.5 h-3.5 text-zinc-600" />
              </div>
              
              <div className="pt-14 p-8 h-full">
                <AnimatedCodeSnippet />
              </div>

              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Lines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}

function AnimatedStagger({ children, stagger = 100, initialDelay = 0 }) {
  const items = Array.isArray(children) ? children : [children];
  const [visible, setVisible] = useState(() => items.map(() => false));
  const timers = useRef([]);

  useEffect(() => {
    items.forEach((_, i) => {
      const d = initialDelay + i * stagger;
      const timer = window.setTimeout(() => {
        setVisible((v) => {
          const copy = [...v];
          copy[i] = true;
          return copy;
        });
      }, d);
      timers.current.push(timer);
    });

    return () => timers.current.forEach(clearTimeout);
  }, [children, initialDelay, stagger]);

  return (
    <>
      {items.map((child, i) => (
        <span
          key={i}
          className={`block transition-all duration-1000 ease-out transform ${
            visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {child}
        </span>
      ))}
    </>
  );
}

function AnimatedCodeSnippet() {
  const lines = [
    "class ArtHalimi extends Developer {",
    "  constructor() {",
    "    this.role = 'Full Stack';",
    "    this.tech = ['React', 'JS', 'Node'];",
    "    this.focus = 'UX & Performance';",
    "  }",
    "  ",
    "  createSolution(problem) {",
    "    return cleanCode(problem);",
    "  }",
    "}"
  ];

  const fullText = lines.join('\n');
  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

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

    const delay = direction === 1 ? 40 : 15;
    const pause = pos === fullText.length ? 4000 : pos === 0 ? 1500 : delay;
    
    timerRef.current = window.setTimeout(tick, pause);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [pos, direction, fullText]);

  const renderHighlighted = (s) => {
    const tokenRegex = /(\b(?:class|extends|constructor|this|return|new)\b)|('[^']*')|(\{|\}|\(|\)|\[|\]|;)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(s)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: s.slice(lastIndex, match.index), type: 'plain' });
      }
      if (match[1]) parts.push({ text: match[1], type: 'keyword' });
      else if (match[2]) parts.push({ text: match[2], type: 'string' });
      else if (match[3]) parts.push({ text: match[3], type: 'brace' });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < s.length) parts.push({ text: s.slice(lastIndex), type: 'plain' });

    return parts.map((p, i) => {
      if (p.type === 'keyword') return <span key={i} className="text-purple-400/80 font-bold">{p.text}</span>;
      if (p.type === 'string') return <span key={i} className="text-emerald-400/80">{p.text}</span>;
      if (p.type === 'brace') return <span key={i} className="text-blue-400/80">{p.text}</span>;
      return <span key={i} className="text-zinc-500">{p.text}</span>;
    });
  };

  return (
    <div className="font-mono text-[10px] md:text-sm leading-relaxed whitespace-pre h-full overflow-hidden select-none">
      {renderHighlighted(fullText.slice(0, pos))}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3.5 bg-purple-500/50 ml-0.5 translate-y-0.5"
      />
    </div>
  );
}
