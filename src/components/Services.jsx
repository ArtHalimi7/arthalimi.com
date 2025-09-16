import { motion } from 'framer-motion';
import { Code, Palette, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Modern, responsive UIs with React, Next.js, and TailwindCSS.',
    capabilities: [
      'ReactJS',
      'NextJS',
      'TailwindCSS',
      'ThreeJS',
    ],
    accent: 'bg-[#B71C1C]',
  },
  {
    icon: Zap,
    title: 'Backend Development',
    description: 'Robust APIs and databases with Node.js, Express, and MongoDB.',
    capabilities: [
      'NodeJS',
      'ExpressJS',
      'MongoDB',
      'MySQL',
    ],
    accent: 'bg-yellow-600',
  },
  {
    icon: Palette,
    title: 'Web Tools & Workflow',
    description: 'Efficient dev workflow with Git, Vite, and modern tooling.',
    capabilities: [
      'Git & GitHub',
      'Vite',
      'VS Code',
      'Chrome DevTools',
    ],
    accent: 'bg-[#B71C1C]',
  },
];

function GridLines() {
  return <div aria-hidden className="pointer-events-none absolute inset-0" />;
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group relative bg-[#232425] border border-white/10 hover:border-[#B71C1C] transition-all duration-300 rounded-xl overflow-hidden flex flex-col shadow-none hover:shadow-2xl hover:scale-[1.025]"
      style={{ minHeight: 320 }}
    >
      {/* Accent bar */}
      <div className={`absolute left-0 top-0 h-full w-2 ${service.accent} rounded-r-xl`} />
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(120deg,rgba(183,28,28,0.08) 0%,rgba(255,255,255,0.02) 100%)'}} />
      <div className="flex items-center gap-4 p-6 border-b border-white/10 relative z-10">
        <div className={`w-14 h-14 flex items-center justify-center border border-white/10 rounded-xl shadow-lg ${service.accent} bg-opacity-80 group-hover:shadow-[0_0_24px_4px_rgba(183,28,28,0.25)] transition-all duration-300`}>
          <Icon className="w-7 h-7 text-white drop-shadow-lg" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
          <p className="text-zinc-400 text-sm">{service.description}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-6 relative z-10">
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
            Key Capabilities
          </span>
          <ul className="list-disc pl-5 text-zinc-200 text-sm space-y-1 mt-1">
            {service.capabilities.map((cap, i) => (
              <li key={i}>{cap}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
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
              My Services
            </span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">What</span>
            <span className="block ml-16">I Do</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Elevate your web presence
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            A comprehensive suite of services to help you build, launch, and grow your digital products with modern web technologies.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
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
              Ready to start your project?
            </span>
            <div className="h-px flex-1 bg-white/10 max-w-32" />
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#B71C1C] text-white px-8 py-4 font-medium hover:bg-[#8B1515] transition-colors duration-200"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;