import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Calendar, Award } from 'lucide-react';

function GridLines() {
  return <div aria-hidden className="pointer-events-none absolute inset-0" />;
}

export function Education() {
  const { t } = useTranslation();
  return (
    <section id="education" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
      <GridLines />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
              {t('education_heading_label')}
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('education_heading_part1')}</span>
            <span className="block ml-16">{t('education_heading_part2')}</span>
          </h1>

          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('education_snapshot')}
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            {t('education_intro')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#232425] p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#B71C1C]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{t('education_degree_title')}</h3>
            <div className="text-zinc-400 text-sm mb-4">{t('education_university')}</div>

            <div className="flex items-center gap-3 text-zinc-400 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{t('education_location')}</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{t('education_years')}</span>
            </div>

            <p className="mt-4 text-zinc-300 text-sm">
              {t('education_intro')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-[#232425] p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-[#B71C1C]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-3">{t('education_coursework_title')}</h4>
            <ul className="list-disc pl-5 text-zinc-200 text-sm space-y-1">
              <li>{t('education_course_ds')}</li>
              <li>{t('education_course_algo')}</li>
              <li>{t('education_course_db')}</li>
              <li>{t('education_course_se')}</li>
              <li>{t('education_course_web')}</li>
              <li>{t('education_course_os')}</li>
              <li>{t('education_course_arch')}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#232425] p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-[#B71C1C]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-3">{t('education_achievements_title')}</h4>
            <ul className="list-disc pl-5 text-zinc-200 text-sm space-y-2">
              <li>
                <strong className="text-white">{t('education_ach_academic')}</strong> Maintaining strong academic performance while pursuing practical skills.
              </li>
              <li>
                <strong className="text-white">{t('education_ach_team')}</strong> Actively participated in group projects, enhancing teamwork and project management skills.
              </li>
              <li>
                <strong className="text-white">{t('education_ach_practical')}</strong> Applied theoretical knowledge to real-world development projects.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Education;
