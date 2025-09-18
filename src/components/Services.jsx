import { motion } from 'framer-motion';
import { Code, Palette, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

// Define services with translation keys for title/description so we can localize at render-time
const services = [
  {
    icon: Code,
    titleKey: 'services.frontend.title',
    descriptionKey: 'services.frontend.description',
    capabilities: ['React', 'Next.js', 'Tailwind'],
    accent: 'bg-[#b71c1c]/80',
    position: 'left',
  },
  {
    icon: Zap,
    titleKey: 'services.backend.title',
    descriptionKey: 'services.backend.description',
    capabilities: ['Node.js', 'Express', 'MongoDB'],
    accent: 'bg-[#b71c1c]/40',
    position: 'center',
  },
  {
    icon: Palette,
    titleKey: 'services.tools.title',
    descriptionKey: 'services.tools.description',
    capabilities: ['Git', 'Vite', 'VS Code'],
    accent: 'bg-[#b71c1c]/80',
    position: 'right',
  },
];

function GridLines() {
  return <div aria-hidden className="pointer-events-none absolute inset-0" />;
}

function ConnectingLines() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B71C1C" stopOpacity="0" />
            <stop offset="50%" stopColor="#B71C1C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B71C1C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 150 300 Q 400 200 650 300 Q 900 400 1150 300"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        {/* Animated dots along the path */}
        <motion.circle
          r="4"
          fill="#B71C1C"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
            <mpath href="#connectingPath" />
          </animateMotion>
        </motion.circle>
        <path id="connectingPath" d="M 150 300 Q 400 200 650 300 Q 900 400 1150 300" fill="none" />
      </svg>
    </div>
  );
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#B71C1C]/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  // Map services to localized versions for rendering
  const localizedService = {
    ...service,
    title: t(service.titleKey),
    description: t(service.descriptionKey),
  };

  const getCardStyle = () => {
    switch (service.position) {
      case 'left':
        return {
          transform: 'rotate(-2deg)',
          zIndex: 1,
        };
      case 'center':
        return {
          transform: 'rotate(0deg) scale(1.05)',
          zIndex: 3,
        };
      case 'right':
        return {
          transform: 'rotate(2deg)',
          zIndex: 1,
        };
      default:
        return {};
    }
  };

  const getHoverStyle = () => {
    switch (service.position) {
      case 'left':
        return {
          transform: 'rotate(-1deg) scale(1.02) translateY(-10px)',
          zIndex: 2,
        };
      case 'center':
        return {
          transform: 'rotate(0deg) scale(1.08) translateY(-15px)',
          zIndex: 4,
        };
      case 'right':
        return {
          transform: 'rotate(1deg) scale(1.02) translateY(-10px)',
          zIndex: 2,
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: service.position === 'center' ? 0 : service.position === 'left' ? -5 : 5 }}
      animate={{ opacity: 1, y: 0, rotate: service.position === 'center' ? 0 : service.position === 'left' ? -2 : 2 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 * index,
        type: "spring",
        stiffness: 100,
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#232425] to-[#1a1b1c] p-8 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden"
        style={{
          minHeight: 380,
          ...getCardStyle(),
        }}
        animate={isHovered ? getHoverStyle() : getCardStyle()}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B71C1C]/5 to-transparent" />
        </div>

        {/* Glowing accent */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B71C1C] to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0.6,
            scaleX: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon Section */}
        <div className="relative z-10 flex items-start gap-4 mb-6">
          <motion.div 
            className="relative"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 flex items-center justify-center border border-white/20 rounded-2xl bg-gradient-to-br from-[#18191A] to-[#2a2b2c] shadow-lg">
              <Icon className="w-8 h-8 text-[#B71C1C]" />
            </div>
            {isHovered && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-[#B71C1C]" />
              </motion.div>
            )}
          </motion.div>

          <div className="flex-1">
            <motion.h3 
              className="text-xl font-bold text-white mb-2"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {localizedService.title}
            </motion.h3>
            <motion.p 
              className="text-zinc-400 text-sm leading-relaxed"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {localizedService.description}
            </motion.p>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="relative z-10 flex-1 flex flex-col">
          <motion.span 
            className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium mb-4 flex items-center gap-2"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="w-1 h-1 bg-[#B71C1C] rounded-full" />
            {t('services_keyCapabilities')}
          </motion.span>
          
          <div className="space-y-3">
            {localizedService.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 text-zinc-200 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                whileHover={{ x: 10, color: '#B71C1C' }}
              >
                <div className="w-1.5 h-1.5 bg-[#B71C1C] rounded-full flex-shrink-0" />
                <span>{cap}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#B71C1C]/10 to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Service number */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#B71C1C]/20 flex items-center justify-center">
          <span className="text-[#B71C1C] text-sm font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20 overflow-hidden">
      <GridLines />
      <FloatingElements />
      <ConnectingLines />
      
      <div className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.titleKey} service={service} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10 max-w-32" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 px-4">
              {t('services_cta_sub')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10 max-w-32" />
          </div>
          
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#B71C1C] to-[#8B1515] text-white px-10 py-5 font-medium hover:from-[#8B1515] hover:to-[#B71C1C] transition-all duration-300 rounded-lg shadow-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">{t('services_cta')}</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
            
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B71C1C] to-[#8B1515] rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;