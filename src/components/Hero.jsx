import heroBg from '../assets/herobg.png';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

export default function HeroWithGridLines() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex items-center pt-24 md:pt-32 pb-12 md:pb-20">
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column — Text content */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 md:gap-10">
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

          {/* Right Column — Glassmorphic stats grid (desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-4 w-full max-w-[420px]">
              {[
                { value: '5+', label: 'Years', sub: 'Experience' },
                { value: '10+', label: 'Projects', sub: 'Delivered' },
                { value: '12+', label: 'Technologies', sub: 'Mastered' },
                { value: '100%', label: 'Client', sub: 'Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-7 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05] cursor-default"
                >
                  {/* ── Glowing corner accents ── */}
                  {/* Top-left corner glow */}
                  <div className="absolute -top-px -left-px w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400/40 to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-purple-400/40 to-transparent" />
                    <div className="absolute top-0 left-0 w-3 h-3 rounded-tl-2xl bg-purple-400/[0.06] blur-sm group-hover:bg-purple-400/[0.15] transition-all duration-700" />
                  </div>
                  {/* Bottom-right corner glow */}
                  <div className="absolute -bottom-px -right-px w-12 h-12 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-purple-400/30 to-transparent" />
                    <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-purple-400/30 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-br-2xl bg-purple-400/[0.04] blur-sm group-hover:bg-purple-400/[0.12] transition-all duration-700" />
                  </div>

                  {/* ── Card content (centered) ── */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="block text-3xl font-extralight tracking-tight text-white mb-1.5 transition-all duration-500 group-hover:text-purple-100 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.25)]">
                      {stat.value}
                    </span>
                    <span className="block text-[11px] font-mono tracking-[0.2em] text-purple-300/60 uppercase">
                      {stat.label}
                    </span>
                    <span className="block text-[9px] font-mono tracking-[0.15em] text-zinc-600 uppercase mt-0.5 transition-colors duration-500 group-hover:text-zinc-400">
                      {stat.sub}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
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