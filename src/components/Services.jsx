/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Zap, ArrowRight, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
  const { t } = useTranslation();
  const Icon = service.icon;
  const isActive = activeIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
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
          <div className={`p-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'bg-white/5 text-zinc-500 group-hover:text-zinc-300'}`}>
            <Icon size={24} strokeWidth={1.2} />
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

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-4 group/cap">
                      <div className="w-1 h-1 rounded-full bg-purple-500/40 group-hover/cap:bg-purple-500 transition-colors" />
                      <span className="text-sm font-light text-zinc-400 group-hover/cap:text-white transition-colors uppercase tracking-widest">
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1 flex justify-end">
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
    // TIGHTENED: Reduced top padding (pt-12) to meet the previous section better
    <section id="services" className="relative pt-12 pb-24 md:pb-48 bg-transparent overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-800/[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_10%,rgba(168,85,247,0.03),transparent)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-purple-500/50" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase italic">{t('services.section_tag')}</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic">
            {t('services.section_title1')} <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">{t('services.section_title2')}</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-32 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/[0.06] pt-16">
          <div className="max-w-md">
            <h4 className="text-2xl font-light text-white italic mb-4">{t('services.cta_title')}</h4>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">{t('services.cta_sub')}</p>
          </div>
          <motion.a href="#contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative flex items-center gap-6 px-12 py-6 bg-white text-black font-medium overflow-hidden rounded-full">
            <span className="relative z-10 uppercase tracking-widest text-xs">{t('services.cta_btn')}</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;