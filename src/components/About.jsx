/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Zap, ShieldCheck, Globe } from 'lucide-react';

export default function AboutMe() {
  const { t } = useTranslation();

  const principles = [
    { icon: Zap, title: t('about.principle1.title'), desc: t('about.principle1.desc') },
    { icon: ShieldCheck, title: t('about.principle2.title'), desc: t('about.principle2.desc') },
    { icon: Globe, title: t('about.principle3.title'), desc: t('about.principle3.desc') },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-56 bg-transparent text-white border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.04),transparent)] pointer-events-none" />
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
                <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase">{t('about.system_overview')}</span>
                <div className="h-[1px] w-16 bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>

              <h3 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-[0.9] mb-10">
                {t('about.architecting')} <br />
                <span className="text-zinc-700 italic">{t('about.precision')}</span> <br />
                {t('about.interfaces')}
              </h3>

              <div className="space-y-8 max-w-xl">
                <p className="text-zinc-400 font-light leading-relaxed text-lg lg:text-2xl lg:leading-tight">
                  {t('about_storyP1')}
                </p>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                <p className="text-zinc-500 font-light leading-relaxed text-base italic border-l-2 border-purple-500/20 pl-8">
                  {t('about.specialization')}
                </p>
              </div>
            </div>

            <motion.a
              href="/arthalimi.docx"
              download="Art_Halimi_CV.docx"
              whileHover={{ scale: 1.05, x: 10 }}
              className="inline-flex items-center gap-6 w-fit group"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Download size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{t('about.download_dossier')}</span>
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{t('about.download_pdf')}</span>
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
                className="group relative p-8 rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.015] hover:from-white/[0.06] hover:to-white/[0.03] hover:border-purple-500/15 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.06),0_0_60px_rgba(168,85,247,0.03)]"
              >
                <div className="flex items-start gap-8">
                  <span className="text-[10px] font-mono text-zinc-800 mt-1">0{i + 1}</span>
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
        <div className="mt-32 pt-16 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: t('about.deployment_index'), val: t('stats.projects_value_short') },
            { label: t('about.structural_uptime'), val: t('about.stats.uptime_value') },
            { label: t('about.active_experience'), val: t('about.stats.experience_value') },
            { label: t('about.response_protocol'), val: t('about.stats.response_value') }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-700 tracking-[0.4em] uppercase mb-3">{stat.label}</span>
              <span className="text-4xl font-extralight text-zinc-200 tracking-tighter tabular-nums italic" style={{ textShadow: '0 0 20px rgba(168,85,247,0.12)' }}>
                {stat.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}