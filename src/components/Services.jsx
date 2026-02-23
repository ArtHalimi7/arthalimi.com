/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Zap, ArrowRight, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';

const ServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
  const { t } = useTranslation();
  const Icon = service.icon;
  const isActive = activeIndex === index;

  // Memoized content for render efficiency
  const CapabilitiesList = useMemo(() => () => (
    <div className="pt-6 md:pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {service.capabilities.map((cap, i) => (
        <div key={i} className="flex items-center gap-4 group/cap">
          <div className="w-1 h-1 rounded-full bg-purple-500/40 group-hover/cap:bg-purple-500 transition-colors" />
          <span className="text-sm font-light text-zinc-400 group-hover/cap:text-white transition-colors uppercase tracking-widest">
            {cap}
          </span>
        </div>
      ))}
    </div>
  ), [service.capabilities]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative border-t border-white/[0.06] last:border-b last:border-white/[0.06] group"
    >
      <div
        onClick={() => setActiveIndex(isActive ? null : index)}
        className="relative z-10 py-12 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-1 flex items-center gap-6">
          <span className={`font-mono text-xs ${isActive ? 'text-purple-500' : 'text-zinc-700'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className={`relative p-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-zinc-500 group-hover:text-zinc-300'}`}>
            <Icon size={24} strokeWidth={1.2} />
            {isActive && <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500" />}
          </div>
        </div>

        <div className="lg:col-span-10">
          <div className="flex flex-col">
            <h3 className={`text-3xl md:text-5xl font-extralight tracking-tighter transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              {t(service.titleKey)}
            </h3>
            <p className={`text-xs font-mono uppercase tracking-[0.3em] mt-2 transition-colors ${isActive ? 'text-purple-400/80' : 'text-zinc-700'}`}>
              {t(service.descriptionKey)}
            </p>
          </div>

          {/* --- MOBILE: STATIC (Always Open) --- */}
          <div className="block md:hidden opacity-100">
            <CapabilitiesList />
          </div>

          {/* --- DESKTOP: ANIMATED --- */}
          <div className="hidden md:block">
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <CapabilitiesList />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 justify-end">
          <div className={`transition-colors duration-500 ${isActive ? 'text-purple-500' : 'text-zinc-800'}`}>
            {isActive ? <Minus size={32} strokeWidth={1} /> : <Plus size={32} strokeWidth={1} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ServicesSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      icon: Code,
      titleKey: 'services.frontend.title',
      descriptionKey: 'services.frontend.description',
      capabilities: [t('services.frontend.cap1'), t('services.frontend.cap2'), t('services.frontend.cap3')],
    },
    {
      icon: Zap,
      titleKey: 'services.backend.title',
      descriptionKey: 'services.backend.description',
      capabilities: [t('services.backend.cap1'), t('services.backend.cap2'), t('services.backend.cap3')],
    },
    {
      icon: Palette,
      titleKey: 'services.tools.title',
      descriptionKey: 'services.tools.description',
      capabilities: [t('services.tools.cap1'), t('services.tools.cap2'), t('services.tools.cap3')],
    },
  ];

  return (
    <section id="services" className="relative pt-12 pb-24 md:pb-48 bg-transparent overflow-hidden">
      {/* Removed ambient glows for flattened design */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h2 className="text-4xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic">
            {t('services.section_title1')} <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">{t('services.section_title2')}</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-32 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/[0.06] pt-16">
          <div className="max-w-md">
            <h4 className="text-2xl font-light text-white italic mb-4">{t('services.cta_title')}</h4>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">{t('services.cta_sub')}</p>
          </div>
          <a href="#contact" className="group relative flex items-center gap-6 px-12 py-6 bg-white text-black font-medium overflow-hidden rounded-full">
            <span className="relative z-10 uppercase tracking-widest text-xs">{t('services.cta_btn')}</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;