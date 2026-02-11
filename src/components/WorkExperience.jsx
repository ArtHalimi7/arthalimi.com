/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Award } from 'lucide-react';

const ExperienceRow = ({ id, role, company, years, summary, skills, achievements, isActive, onClick, index, isEducation, details }) => {
  const { t } = useTranslation();

  // Shared Content Component to avoid duplication
  const DetailContent = useMemo(() => () => (
    <div className="pt-4 md:pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl p-4 md:p-6 -mx-2">
      <div className="space-y-4">
        <p className={`text-zinc-400 font-light leading-relaxed text-base ${isEducation ? 'italic border-l border-purple-500/20 pl-6' : ''}`}>
          {isEducation ? `"${details}"` : summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, i) => (
            <span key={i} className="text-[10px] font-mono text-purple-400/70 border border-purple-500/20 px-2 py-1 rounded-sm bg-purple-500/5">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-l border-white/5 pl-6">
        {isEducation && (
          <h4 className="text-[10px] font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2 mb-2">
            <Award size={12} /> {t('work.key_distinctions')}
          </h4>
        )}
        <ul className="space-y-4">
          {achievements.map((item, i) => (
            <li key={i} className="text-xs text-zinc-500 font-light leading-snug group/item">
              <span className="text-purple-500 mr-2">—</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ), [summary, details, skills, achievements, isEducation, t]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className={`relative group cursor-pointer py-10 border-b-0 transition-all duration-500`}
    >
      {/* Simplified Glow for Performance */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 ${isActive
        ? 'bg-purple-500/30'
        : 'bg-white/[0.06]'
        }`} />

      <span className="absolute -left-4 top-1/2 -translate-y-1/4 text-7xl font-bold text-white/[0.06] select-none pointer-events-none">
        0{index + 1}
      </span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 flex items-center gap-4">
          <div
            className={`h-[1px] hidden md:block transition-all duration-500 ${isActive ? 'w-10 bg-purple-500' : 'w-0 bg-zinc-600'}`}
          />
          {isActive && <div className="neon-dot hidden md:block" />}
          <span className={`text-[11px] font-mono tracking-[0.3em] uppercase transition-colors duration-500 ${isActive ? 'text-purple-400' : 'text-zinc-600'}`}>
            {years}
          </span>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-col">
            <h3 className={`text-3xl md:text-5xl font-light tracking-tighter transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              {role}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">{company}</span>
              {isEducation && (
                <span className="text-[9px] font-mono text-purple-500/50 border border-purple-500/20 px-2 py-0.5 uppercase tracking-tighter">{t('work.academic_track')}</span>
              )}
            </div>
          </div>

          {/* --- MOBILE: ALWAYS OPEN (High Performance) --- */}
          <div className="block md:hidden mt-6 opacity-100">
            <DetailContent />
          </div>

          {/* --- DESKTOP: ANIMATED ACCORDION --- */}
          <div className="hidden md:block">
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <DetailContent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 justify-end pt-2">
          <div className={`p-1 transition-colors duration-500 ${isActive ? 'text-purple-500' : 'text-zinc-700'}`}>
            {isActive ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkExperiences() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(1);

  const timelineEntries = [
    {
      id: 1,
      role: t('work.experiences.1.role'),
      company: t('work.experiences.1.company'),
      years: t('work.experiences.1.years'),
      summary: t('work.experiences.1.summary'),
      skills: ["React", "Next.js", "Framer Motion"],
      achievements: [t('work.experiences.1.achievements.1'), t('work.experiences.1.achievements.2')],
      isEducation: false,
    },
    {
      id: 2,
      role: t('work.experiences.2.role'),
      company: t('work.experiences.2.company'),
      years: t('work.experiences.2.years'),
      summary: t('work.experiences.2.summary'),
      skills: ["Node.js", "TypeScript", "MySQL"],
      achievements: [t('work.experiences.2.achievements.1'), t('work.experiences.2.achievements.2')],
      isEducation: false,
    },
    {
      id: 3,
      role: t('work.experiences.3.role'),
      company: t('work.experiences.3.company'),
      years: t('work.experiences.3.years'),
      summary: t('work.experiences.3.summary'),
      skills: ["Cloud Arch", "DevOps", "Leadership"],
      achievements: [t('work.experiences.3.achievements.1'), t('work.experiences.3.achievements.2')],
      isEducation: false,
    },
    {
      id: 4,
      role: t('education_degree_title'),
      company: t('education_university'),
      years: t('education_years'),
      details: t('education_intro'),
      skills: [t('education_course_ds'), t('education_course_algo'), t('education_course_web')],
      achievements: [t('education_ach_academic'), t('education_ach_team'), t('education_ach_practical')],
      isEducation: true,
    }
  ];

  return (
    <section id="work" className="section-glow relative pt-24 pb-12 bg-[#020202] overflow-hidden">
      {/* Ambient glow — purple + white, desktop only for heavy blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(168,85,247,0.05),transparent)] pointer-events-none" />
      <div className="hidden md:block absolute top-[20%] right-[5%] w-[300px] h-[300px] bg-white/[0.015] rounded-full pointer-events-none" style={{ filter: 'blur(80px)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic"
          >
            {t('work.section_title1')} <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">{t('work.section_title2')}</span>
          </motion.h2>
        </div>

        <div className="border-t border-white/[0.06]">
          {timelineEntries.map((exp, index) => (
            <ExperienceRow
              key={exp.id}
              {...exp}
              index={index}
              isActive={activeId === exp.id}
              onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}