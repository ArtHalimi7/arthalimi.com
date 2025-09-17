import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { ExperienceCard } from './ui/experience-card';
import { InteractiveStats } from './ui/interactive-stats';

const workExperiences = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "StarLabs",
    employmentType: "Internship",
    location: "Remote",
    years: "April 2024 – July 2024",
    summary: "Worked on UI features and performance improvements for a React app.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    achievements: [
      "Built responsive components used across the app",
      "Improved page load performance"
    ],
    projects: 8
  },
  {
    id: 2,
    role: "Web Developer",
    company: "Freelance",
    employmentType: "Freelance",
    location: "Remote",
    years: "June 2021 – April 2024",
    summary: "Built websites and components for clients, delivering reliable designs and performance.",
    skills: ["JavaScript", "React", "Node.js"],
    achievements: [
      "Delivered 20+ client projects",
      "Improved client site performance and conversions"
    ],
    projects: 22
  },
  {
    id: 3,
    role: "IT Manager",
    company: "BlackSn0w",
    employmentType: "Full-time",
    location: "Gjilan",
    years: "June 2019 – August 2020",
    summary: "Oversaw IT operations and infrastructure, improving reliability and processes.",
    skills: ["System Admin", "Network Security", "Project Management"],
    achievements: [
      "Reduced system downtime",
      "Led infrastructure upgrades"
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
          {workExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              role={experience.role}
              company={experience.company}
              employmentType={experience.employmentType}
              location={experience.location}
              years={experience.years}
              summary={experience.summary}
              skills={experience.skills}
              achievements={experience.achievements}
              projects={experience.projects}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkExperiences;