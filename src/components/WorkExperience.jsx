import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { ExperienceCard } from './ui/experience-card';
import { InteractiveStats } from './ui/interactive-stats';

// Data uses translation keys; resolved with useTranslation inside the component
const workExperiences = [
  {
    id: 1,
    roleKey: 'work.experiences.1.role',
    companyKey: 'work.experiences.1.company',
    employmentTypeKey: 'work.experiences.1.employmentType',
    locationKey: 'work.experiences.1.location',
    yearsKey: 'work.experiences.1.years',
    summaryKey: 'work.experiences.1.summary',
    skillsKeys: [
      'work.experiences.1.skills.react',
      'work.experiences.1.skills.typescript',
      'work.experiences.1.skills.tailwind'
    ],
    achievementsKeys: [
      'work.experiences.1.achievements.1',
      'work.experiences.1.achievements.2'
    ],
    projects: 8
  },
  {
    id: 2,
    roleKey: 'work.experiences.2.role',
    companyKey: 'work.experiences.2.company',
    employmentTypeKey: 'work.experiences.2.employmentType',
    locationKey: 'work.experiences.2.location',
    yearsKey: 'work.experiences.2.years',
    summaryKey: 'work.experiences.2.summary',
    skillsKeys: [
      'work.experiences.2.skills.javascript',
      'work.experiences.2.skills.react',
      'work.experiences.2.skills.node'
    ],
    achievementsKeys: [
      'work.experiences.2.achievements.1',
      'work.experiences.2.achievements.2'
    ],
    projects: 22
  },
  {
    id: 3,
    roleKey: 'work.experiences.3.role',
    companyKey: 'work.experiences.3.company',
    employmentTypeKey: 'work.experiences.3.employmentType',
    locationKey: 'work.experiences.3.location',
    yearsKey: 'work.experiences.3.years',
    summaryKey: 'work.experiences.3.summary',
    skillsKeys: [
      'work.experiences.3.skills.sysadmin',
      'work.experiences.3.skills.network',
      'work.experiences.3.skills.pm'
    ],
    achievementsKeys: [
      'work.experiences.3.achievements.1',
      'work.experiences.3.achievements.2'
    ],
    projects: 12
  }
];

function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
    </div>
  );
}

export function WorkExperiences() {
  const { t } = useTranslation();
  return (
    <section id="work" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
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
            <Briefcase className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
              {t('work_professionalJourney')}
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('work_heading_part1')}</span>
            <span className="block ml-16">{t('work_heading_part2')}</span>
          </h1>
          
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('work_snapshot_label')}
            </span>
          </div>
          
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            {t('work_intro')}
          </p>
        </motion.div>

        {/* Interactive Stats Grid */}
        <InteractiveStats 
          totalYears={3}
          totalProjects={10}
          satisfaction={100}
          currentStreak={127}
        />

        {/* Experience Cards */}
        <div className="space-y-0">
          {workExperiences.map((experience, index) => {
            const role = t(experience.roleKey);
            const company = t(experience.companyKey);
            const employmentType = t(experience.employmentTypeKey);
            const location = t(experience.locationKey);
            const years = t(experience.yearsKey);
            const summary = t(experience.summaryKey);
            const skills = experience.skillsKeys.map((k) => t(k));
            const achievements = experience.achievementsKeys.map((k) => t(k));

            return (
              <ExperienceCard
                key={experience.id}
                role={role}
                company={company}
                employmentType={employmentType}
                location={location}
                years={years}
                summary={summary}
                skills={skills}
                achievements={achievements}
                projects={experience.projects}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkExperiences;