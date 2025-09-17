import { motion } from 'framer-motion';
import { Code, Palette, Zap, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Define services with translation keys for title/description so we can localize at render-time
const services = [
  {
    icon: Code,
    titleKey: 'services.frontend.title',
    descriptionKey: 'services.frontend.description',
    capabilities: ['React', 'Next.js', 'Tailwind'],
    accent: 'bg-[#b71c1c]/80',
  },
  {
    icon: Zap,
    titleKey: 'services.backend.title',
    descriptionKey: 'services.backend.description',
    capabilities: ['Node.js', 'Express', 'MongoDB'],
    accent: 'bg-[#b71c1c]/40',
  },
  {
    icon: Palette,
    titleKey: 'services.tools.title',
    descriptionKey: 'services.tools.description',
    capabilities: ['Git', 'Vite', 'VS Code'],
    accent: 'bg-[#b71c1c]/80',
  },
];

function GridLines() {
  return <div aria-hidden className="pointer-events-none absolute inset-0" />;
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="relative bg-[#232425] p-8 border border-white/10 rounded-xl flex flex-col"
      style={{ minHeight: 320 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-xl bg-[#18191A]">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
          <p className="text-zinc-400 text-sm">{service.description}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2">
          {t('services_keyCapabilities')}
        </span>
        <ul className="list-disc pl-5 text-zinc-200 text-sm space-y-1 mt-1">
          {service.capabilities.map((cap, i) => (
            <li key={i}>{cap}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();

  // Map services to localized versions for rendering
  const localizedServices = services.map((s) => ({
    ...s,
    title: t(s.titleKey),
    description: t(s.descriptionKey),
  }));

  return (
    <section id="services" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
      <GridLines />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
              {t('services_heading')}
            </span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('services_title_part1')}</span>
            <span className="block ml-16">{t('services_title_part2')}</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('services_sub')}
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            {t('services_lead')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localizedServices.map((service, index) => (
            <ServiceCard key={service.titleKey} service={service} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-white/10 max-w-32" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('services_cta_sub')}
            </span>
            <div className="h-px flex-1 bg-white/10 max-w-32" />
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#B71C1C] text-white px-8 py-4 font-medium hover:bg-[#8B1515] transition-colors duration-200"
          >
            <span>{t('services_cta')}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;