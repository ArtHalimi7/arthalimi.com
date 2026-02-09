/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Award } from 'lucide-react';

const ExperienceRow = ({ id, role, company, years, summary, skills, achievements, isActive, onClick, index, isEducation, details }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onClick={onClick}
      className="relative group cursor-pointer py-10 border-b border-white/5 last:border-b-0"
    >
      <span className="absolute -left-4 top-8 text-7xl font-bold text-white/[0.02] select-none pointer-events-none transition-colors duration-700 group-hover:text-purple-500/[0.03]">
        0{index + 1}
      </span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 flex items-center gap-4">
          <motion.div 
            animate={{ 
              width: isActive ? 40 : 0,
              backgroundColor: isActive ? "#a855f7" : "#52525b" 
            }}
            className="h-[1px] hidden md:block"
          />
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
                <span className="text-[9px] font-mono text-purple-500/50 border border-purple-500/20 px-2 py-0.5 uppercase tracking-tighter">Academic_Track</span>
              )}
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
                />
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <Award size={12} /> Key_Distinctions
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1 flex justify-end pt-2">
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
      skills: ["Node.js", "TypeScript", "PostgreSQL"],
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
    // TIGHTENED: pb-12 pulls the TechStack section up significantly
    <section id="work" className="relative pt-24 pb-12 bg-[#020202] overflow-hidden">
      <div className="absolute left-6 top-1/2 -rotate-90 origin-left hidden xl:block">
        <span className="text-[10px] font-mono tracking-[1em] text-zinc-800 uppercase">Archive_Sequence</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic"
          >
            History <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">Theory</span>
          </motion.h2>
          <p className="mt-6 text-zinc-500 font-mono text-[11px] tracking-[0.3em] uppercase">
            Curated Professional & Academic Path
          </p>
        </div>

        <div className="border-t border-white/5">
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