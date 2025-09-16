import React from 'react';
import { Code, Palette, Zap, ArrowRight } from 'lucide-react';

/**
 * @param {{ className?: string }} props
 */
export function ServicesSection({ className = '' }) {
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
      accent: 'red-700',
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
      accent: 'yellow-600',
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
      accent: 'red-700',
    },
  ];

  return (
    <section id="services" className={`relative py-32 bg-[#18191A] text-zinc-100 ${className}`}>
      <div className="relative px-8 lg:px-24 max-w-7xl mx-auto">
        {/* Professional snapshot label and line */}
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-meta text-[#B6862C]">★ SERVICES</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>


        <div className="mb-16">
          <h2
            className="font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.75rem,6vw,4.5rem)] text-[#e7e6e3] text-center"
            style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Cantarell, Noto Sans, sans-serif' }}
          >
            <span className="block">WHAT</span>
            <span className="block text-[#B71C1C]">I DO</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-zinc-300 text-center tracking-wide mt-4">
            A comprehensive suite of services to elevate your web presence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-[#232425] border border-white/10 rounded-2xl p-8 hover:border-[#B6862C]/30 transition-all duration-300"
            >
              {/* Top hairline */}
              <div className="absolute top-0 left-8 right-8 h-px bg-white/10" />
              {/* Accent stripe */}
              <div className={`absolute top-0 left-0 w-1 h-16 bg-${service.accent} rounded-r`} />

              <div className="space-y-6">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#18191A] border border-white/10 rounded-xl flex items-center justify-center group-hover:border-[#B6862C]/30 transition-colors duration-300">
                  <service.icon size={20} className="text-[#B6862C]" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-h2 text-zinc-100 group-hover:text-[#B6862C] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-body text-zinc-400">
                    {service.description}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="space-y-3">
                  <div className="text-meta text-zinc-500 uppercase tracking-wider">
                    Key Capabilities
                  </div>
                  <div className="space-y-2">
                    {service.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center space-x-2 text-body text-zinc-300">
                        <div className="w-1 h-1 bg-[#B6862C] rounded-full" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini-case link */}
                <button className="group/btn flex items-center space-x-2 text-meta text-[#B6862C] hover:text-[#B71C1C] transition-colors duration-200 mt-6">
                  <span>VIEW CASE STUDY</span>
                  <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

              {/* Grid overlay on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-4 border border-white/5" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-[#232425] border border-white/10 rounded-2xl">
          <h3 className="text-h2 text-zinc-100 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-body text-zinc-400 mb-6 max-w-lg mx-auto">
            Let's discuss how I can help bring your vision to life with modern web technologies.
          </p>
          <button className="group relative px-8 py-4 bg-[#B71C1C] text-zinc-100 text-meta rounded-2xl transition-all duration-200 hover:bg-[#8B1515] hover:shadow-lg">
            <span className="relative z-10">START A PROJECT</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;