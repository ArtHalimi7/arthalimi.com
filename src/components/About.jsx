/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Zap, ShieldCheck, Globe } from 'lucide-react';

export default function AboutMe() {
  const { t } = useTranslation();

  const principles = [
    { icon: Zap, title: "High-Performance", desc: "Optimizing for sub-second latency and fluid interaction cycles across all devices." },
    { icon: ShieldCheck, title: "Architectural Integrity", desc: "Building secure, type-safe, and maintainable systems designed for structural longevity." },
    { icon: Globe, title: "Universal Design", desc: "Engineering accessible, inclusive solutions that resonate with a global, diverse audience." },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-56 bg-transparent text-white border-y border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* LEFT SIDE: THE NARRATIVE (Cols 1-6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col space-y-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase">System_Overview</span>
                <div className="h-[1px] w-16 bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>

              <h3 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-[0.9] mb-10">
                Architecting <br />
                <span className="text-zinc-700 italic">Precision</span> <br />
                Interfaces.
              </h3>

              <div className="space-y-8 max-w-xl">
                <p className="text-zinc-400 font-light leading-relaxed text-lg lg:text-2xl lg:leading-tight">
                  {t('about_storyP1')}
                </p>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                <p className="text-zinc-500 font-light leading-relaxed text-base italic border-l-2 border-purple-500/20 pl-8">
                  I specialize in the intersection of high-fidelity design and rigorous software engineering.
                </p>
              </div>
            </div>

            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.05, x: 10 }}
              className="inline-flex items-center gap-6 w-fit group"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Download size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Download Dossier</span>
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">PDF // 1.2MB</span>
              </div>
            </motion.a>
          </motion.div>

          {/* RIGHT SIDE: PRINCIPLE CARDS (Cols 8-12) */}
          {/* NOTICE: lg:pt-32 moves the right side down on desktop to create the "balanced stagger" */}
          <div className="lg:col-start-8 lg:col-span-5 flex flex-col space-y-6 lg:pt-40">
            {principles.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-start gap-8">
                  <span className="text-[10px] font-mono text-zinc-800 mt-1">0{i+1}</span>
                  <div className="flex-1">
                    <h4 className="text-xl font-light mb-3 tracking-tight group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* BOTTOM STATS BAR */}
        <div className="mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Deployment_Index", val: t('stats.projects_value_short') },
            { label: "Structural_Uptime", val: "100%" },
            { label: "Active_Experience", val: "4+YRS" },
            { label: "Response_Protocol", val: "24/7" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-800 tracking-[0.4em] uppercase mb-3">{stat.label}</span>
              <span className="text-4xl font-extralight text-zinc-200 tracking-tighter tabular-nums italic">
                {stat.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}