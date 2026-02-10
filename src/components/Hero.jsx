/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ColorBends from './ColorBendsFallback';
import { ArrowRight, Terminal, Plus } from 'lucide-react';

export default function HeroWithGridLines() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  
  return (
    <section id="home" ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex items-center pt-24 md:pt-32 pb-12 md:pb-20">
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <ColorBends
          rotation={45} speed={0.2} colors={["#3300ff","#FF9FFC"]}
          transparent autoRotate={0} scale={1} frequency={1}
          warpStrength={1} mouseInfluence={1} parallax={0.5} noise={0.1}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 md:gap-10 order-1 lg:order-1">
            <header className="space-y-3">
               <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] md:text-sm font-bold text-purple-400 tracking-[0.4em] uppercase font-mono"
               >
                {t('hi')} <span className="text-white">Art Halimi</span>
              </motion.p>
              
              <h1
                className="font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[clamp(2.8rem,12vw,5.5rem)] text-white"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <AnimatedStagger stagger={120} initialDelay={200}>
                  <span className="block">{t('title1')}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
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
              className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group relative flex items-center gap-6 px-12 py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 text-center"
              >
                <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 uppercase tracking-[0.3em] text-[10px] font-bold group-hover:text-white transition-colors">
                  {t('cta_work')}
                </span>
                <div className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
                  <ArrowRight size={16} />
                </div>
              </a>

              <a
                href="#contact"
                className="group flex items-center gap-4 px-4 py-2 text-zinc-500 hover:text-white transition-all duration-300"
              >
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold font-mono">
                  {t('cta_contact')}
                </span>
                <div className="p-2 border border-white/5 rounded-full group-hover:border-purple-500/50 transition-colors">
                  <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Terminal Window */}
          <div className="lg:col-span-5 relative order-2 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="relative w-full max-w-[480px] aspect-[4/3] group"
            >
              <div className="absolute -inset-[1px] rounded-[2rem] bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-500 blur-[2px]" />
              
              <div className="relative h-full w-full rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col">
                <div className="flex-none h-12 border-b border-white/5 flex items-center px-6 gap-3 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">halimi.sys</span>
                  </div>
                  <Terminal size={12} className="text-zinc-600" />
                </div>
                
                <div className="flex-1 p-6 md:p-10 flex items-start justify-start overflow-hidden">
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
    <div className="overflow-hidden">
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
      // We process the full text once, effectively
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
    const delay = direction === 1 ? 50 : 30;
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
      <motion.span 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[6px] h-[14px] md:h-[18px] bg-purple-500/60 ml-1 align-middle"
      />
    </div>
  );
}