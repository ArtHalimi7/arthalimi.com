
import React from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';
import illyonImg from "../assets/illyon.png";
import zahlxImg from "../assets/zahlx.png";
import andiImg from "../assets/andi.png";
import arsaImg from "../assets/arsa.png";

const projects = [
  {
    id: 1,
    titleKey: 'projects.illyon.title',
    categoryKey: 'projects.illyon.category',
    image: illyonImg,
    roleKey: 'projects.illyon.role',
    year: '2025',
    descriptionKey: 'projects.illyon.description',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'TailwindCSS'],
    featuresKeys: [
      'projects.illyon.features.catalog',
      'projects.illyon.features.auth',
      'projects.illyon.features.cart',
      'projects.illyon.features.orderTracking',
      'projects.illyon.features.payments',
      'projects.illyon.features.promotions',
      'projects.illyon.features.admin',
    ],
    impactKey: 'projects.illyon.impact',
    link: 'https://illyon.com',
  },
  {
    id: 2,
    titleKey: 'projects.zahlx.title',
    categoryKey: 'projects.zahlx.category',
    image: zahlxImg,
    roleKey: 'projects.zahlx.role',
    year: '2025',
    descriptionKey: 'projects.zahlx.description',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'TailwindCSS'],
    featuresKeys: [
      'projects.zahlx.features.analytics',
      'projects.zahlx.features.invoicing',
      'projects.zahlx.features.expense',
      'projects.zahlx.features.kpi',
      'projects.zahlx.features.performance',
      'projects.zahlx.features.automation',
      'projects.zahlx.features.integrations',
    ],
    impactKey: 'projects.zahlx.impact',
    link: 'https://zahlx.com',
  },
  {
    id: 3,
    titleKey: 'projects.andi.title',
    categoryKey: 'projects.andi.category',
    image: andiImg,
    roleKey: 'projects.andi.role',
    year: '2025',
    descriptionKey: 'projects.andi.description',
    tech: ['React', 'TailwindCSS', 'Vite', 'Framer Motion'],
    featuresKeys: [
      'projects.andi.features.profile',
      'projects.andi.features.goals',
      'projects.andi.features.news',
      'projects.andi.features.volunteer',
      'projects.andi.features.donations',
      'projects.andi.features.social',
    ],
    impactKey: 'projects.andi.impact',
    link: 'https://andi.com',
  },
  {
    id: 4,
    titleKey: 'projects.arsa.title',
    categoryKey: 'projects.arsa.category',
    image: arsaImg,
    roleKey: 'projects.arsa.role',
    year: '2025',
    descriptionKey: 'projects.arsa.description',
    tech: ['React', 'TailwindCSS', 'Vite', 'Framer Motion'],
    featuresKeys: [
      'projects.arsa.features.gallery',
      'projects.arsa.features.services',
      'projects.arsa.features.testimonials',
      'projects.arsa.features.contact',
    ],
    impactKey: 'projects.arsa.impact',
    link: 'https://arsa.com',
  },
];

function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0"></div>
  );
}



function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group bg-[#232425] border border-white/10 hover:border-[#B71C1C] transition-colors duration-200 rounded-none overflow-hidden flex flex-col"
    >
      <div className="w-full h-48 bg-[#18191A] border-b border-white/10 flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
            {t(project.categoryKey)}
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">{project.year}</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-1 truncate">{t(project.titleKey)}</h2>
        <span className="text-zinc-400 text-xs font-medium mb-2 truncate">{t(project.roleKey)}</span>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tech.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 border border-zinc-700 text-[#B71C1C] bg-zinc-800 text-[11px] font-mono"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs text-zinc-400">+{project.tech.length - 3}</span>
          )}
        </div>
        <p className="text-zinc-300 text-sm mb-3 line-clamp-3">{t(project.descriptionKey)}</p>
        <div className="flex-1" />
        <div className="flex justify-center mt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#B71C1C] text-white px-8 py-3 font-medium text-base rounded-none hover:bg-[#8B1515] transition-colors duration-200"
            >
              <span>{t('projects_viewProject')}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
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
              {t('projects_heading')}
            </span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('projects_title_part1')}</span>
            <span className="block ml-16">{t('projects_title_part2')}</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('projects_sub')}
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            {t('projects_lead')}
          </p>
        </motion.div>

        {/* Project Cards in 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
