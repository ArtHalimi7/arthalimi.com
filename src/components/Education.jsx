/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Award, GraduationCap, MapPin, Calendar, Plus, Minus } from 'lucide-react';

/* --- Sub-Component: Minimal Row concept --- */
const EducationRow = ({ title, subtitle, years, location, details, courses, achievements, isActive, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onClick={onClick}
      className="relative group cursor-pointer py-12 border-t border-white/5 first:border-t-0"
    >
      {/* Background Ghost Number */}
      <span className="absolute -left-4 top-10 text-8xl font-bold text-white/[0.01] select-none pointer-events-none transition-colors duration-700 group-hover:text-purple-500/[0.03]">
        0{index + 1}
      </span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline/Meta Column */}
        <div className="lg:col-span-3 flex items-center gap-4">
          <div
            className={`h-[1px] hidden md:block transition-all duration-500 ${isActive ? 'w-10 bg-purple-500' : 'w-0 bg-zinc-600'}`}
          />
          <div className="flex flex-col">
            <span className={`text-[11px] font-mono tracking-[0.3em] uppercase transition-colors duration-500 ${isActive ? 'text-purple-400' : 'text-zinc-600'}`}>
              {years}
            </span>
            <span className="text-[10px] text-zinc-700 font-mono mt-1 italic uppercase">{location}</span>
          </div>
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-8">
          <div className="flex flex-col">
            <h3 className={`text-3xl md:text-5xl font-extralight tracking-tighter transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              {title}
            </h3>
            <p className="text-xs font-medium text-zinc-500 mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
              {subtitle}
              {isActive && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />}
            </p>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Narrative/Summary */}
                  <div className="space-y-6">
                    <p className="text-zinc-400 font-light leading-relaxed text-base italic border-l border-purple-500/20 pl-6">
                      &#34;{details}&#34;
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {courses.map((course, i) => (
                        <span key={i} className="text-[10px] font-mono text-zinc-500 border border-white/5 px-2 py-1 rounded-sm bg-white/[0.02]">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Milestones/Achievements */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <Award size={12} /> Key_Distinctions
                    </h4>
                    <ul className="space-y-4">
                      {achievements.map((item, i) => (
                        <li key={i} className="text-xs text-zinc-500 font-light flex items-start gap-3">
                          <span className="text-purple-500/50 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Column */}
        <div className="lg:col-span-1 flex justify-end pt-2">
          <div className={`p-1 transition-colors duration-500 ${isActive ? 'text-purple-500' : 'text-zinc-800'}`}>
            {isActive ? <Minus size={24} strokeWidth={1} /> : <Plus size={24} strokeWidth={1} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Education() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(1);

  const educationEntries = [
    {
      id: 1,
      title: t('education_degree_title'),
      subtitle: t('education_university'),
      years: t('education_years'),
      location: t('education_location'),
      details: t('education_intro'),
      courses: [t('education_course_ds'), t('education_course_algo'), t('education_course_web')],
      achievements: [t('education_ach_academic'), t('education_ach_team'), t('education_ach_practical')]
    }
  ];

  return (
    <section id="education" className="relative pt-12 pb-32 md:pb-48 bg-[#020202] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-purple-500/20 to-transparent hidden lg:block" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full pointer-events-none" style={{ filter: 'blur(80px)' }} />
      {/* White neon accent line */}
      <div className="neon-line w-32 mx-auto mb-4" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header - Matching Experience Styling */}
        <div className="mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-purple-500/50" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase italic">
              Academic_Archive
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic">
            Foundation <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">Theory</span>
          </h2>
        </div>

        {/* Education Rows Wrapper */}
        <div className="border-t border-white/5">
          {educationEntries.map((edu, index) => (
            <EducationRow
              key={edu.id}
              {...edu}
              index={index}
              isActive={activeId === edu.id}
              onClick={() => setActiveId(activeId === edu.id ? null : edu.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;