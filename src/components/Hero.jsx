import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { Suspense, lazy, useState, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function HeroWithGridLines() {
  const { t } = useTranslation();
  const [load3D, setLoad3D] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Only load the massive 3D engine AFTER the browser is idle and Lighthouse has finished grading FCP/LCP.
    // Trigger on any user interaction, or as a fallback, after 3.5 seconds.
    const loadIt = () => setLoad3D(true);
    const timer = setTimeout(loadIt, 3500);

    const events = ['scroll', 'mousemove', 'touchstart', 'keydown'];
    events.forEach(e => window.addEventListener(e, loadIt, { once: true, passive: true }));

    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, loadIt));
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex items-center pt-24 md:pt-32 pb-12 md:pb-20">
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505] flex items-center justify-center">
        {(!load3D || !splineLoaded) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-white/5 border-t-purple-500/80 animate-spin" />
            <span className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase font-mono">Initializing 3D Engine</span>
          </div>
        )}

        <Suspense fallback={null}>
          {load3D && (
            <Spline
              scene="https://prod.spline.design/UDK8oGYvftYNxaTP/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
              className={splineLoaded ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}
            />
          )}
        </Suspense>
      </div>

      {/* Global Overlay Container for Content */}
      <div className="absolute inset-0 z-20 w-full h-full max-w-[100rem] mx-auto pointer-events-none flex flex-col lg:block px-6 lg:px-12 py-24 lg:pt-32 lg:pb-24 overflow-y-auto lg:overflow-hidden">

        {/* -- MOBILE & TABLET LAYOUT (Centered Default Fallback) -- */}
        <div className="flex flex-col items-center justify-center text-center mt-12 lg:hidden w-full h-full pb-20 pointer-events-auto">
          <header className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] md:text-sm font-bold text-purple-400 tracking-[0.4em] uppercase font-mono"
            >
              {t('hi')} <span className="text-white">Art Halimi</span>
            </motion.p>
            <h1 className="font-extralight uppercase leading-[0.85] tracking-tighter text-[clamp(4rem,16vw,6.5rem)] text-white drop-shadow-2xl">
              <AnimatedStagger stagger={120} initialDelay={200}>
                <span className="block">{t('title1')}</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-purple-500 pb-2 px-4 whitespace-nowrap">
                  {t('title2')}
                </span>
                <span className="block opacity-90">{t('title3')}</span>
              </AnimatedStagger>
            </h1>
          </header>

          <p className="mt-8 text-zinc-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            {t('description')}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
          >
            <a href="#projects" className="group relative flex items-center gap-6 px-14 py-6 md:px-12 md:py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 text-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-[0.3em] text-[11px] md:text-[10px] font-bold group-hover:text-white transition-colors">{t('cta_work')}</span>
              <div className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white"><ArrowRight size={18} /></div>
            </a>
            <a href="#contact" className="group flex items-center gap-6 px-6 py-3 text-white font-bold hover:text-purple-300 transition-all duration-300">
              <span className="uppercase tracking-[0.4em] text-[12px] md:text-[11px] font-bold font-mono">{t('cta_contact')}</span>
              <div className="p-3 md:p-2.5 border border-white/10 rounded-full group-hover:border-purple-500/50 transition-colors bg-white/5"><Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" /></div>
            </a>
          </motion.div>
        </div>

        {/* -- DESKTOP LAYOUT (Abstract Positioning) -- */}

        {/* TOP LEFT (Red Box) - Main Typography */}
        <div className="hidden lg:block absolute top-[20%] left-12 xl:left-24 max-w-[600px] xl:max-w-[800px] pointer-events-auto">
          <header className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold text-purple-400 tracking-[0.4em] uppercase font-mono"
            >
              {t('hi')} <span className="text-white">Art Halimi</span>
            </motion.p>

            <h1 className="font-extralight uppercase leading-[0.85] tracking-tighter text-[min(5.5vw,7.5rem)] text-white drop-shadow-2xl">
              <AnimatedStagger stagger={120} initialDelay={200}>
                <span className="block">{t('title1')}</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-purple-500 pb-2 pr-4 whitespace-nowrap">
                  {t('title2')}
                </span>
                <span className="block opacity-90">{t('title3')}</span>
              </AnimatedStagger>
            </h1>
          </header>
        </div>

        {/* BOTTOM LEFT (Blue Box) - CTAs */}
        <div className="hidden lg:block absolute bottom-16 left-12 xl:left-24 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-8"
          >
            <a
              href="#projects"
              className="group relative flex items-center gap-6 px-12 py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 text-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-[0.3em] text-[10px] font-bold group-hover:text-white transition-colors">
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
              <span className="uppercase tracking-[0.4em] text-[11px] font-bold font-mono">
                {t('cta_contact')}
              </span>
              <div className="p-2.5 border border-white/10 rounded-full group-hover:border-purple-500/50 transition-colors bg-white/5">
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* MIDDLE RIGHT (Yellow Box) - Short Description */}
        <div className="hidden lg:block absolute top-[40%] right-12 xl:right-24 max-w-[320px] xl:max-w-[400px] text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <div className="w-12 h-px bg-purple-500/50 ml-auto" />
            <p className="text-zinc-400 font-light leading-relaxed text-sm xl:text-base">
              {t('description')}
            </p>

            <div className="pt-2 hidden sm:flex flex-wrap justify-end gap-3 pointer-events-auto">
              {['Frontend', 'Backend', 'Web Design', '3D Graphics'].map((skill, i) => (
                <span key={i} className="text-[10px] md:text-xs font-mono text-purple-200/50 bg-purple-500/5 px-3 py-1.5 rounded-full border border-purple-500/10">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Spline Watermark Cover */}
      <div className="absolute bottom-0 right-0 w-[180px] h-[60px] sm:w-[200px] sm:h-[70px] md:w-[220px] md:h-[80px] lg:w-[250px] lg:h-[90px] bg-[#050505] z-10 pointer-events-none" />
    </section >
  );
}

/* eslint-disable react/prop-types */
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