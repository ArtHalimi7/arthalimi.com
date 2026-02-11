/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Cpu, Globe, Database } from "lucide-react";

const TechCard = ({ tech, index, categoryIdx }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const percentage = tech.level;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-52 will-change-transform"
    >
      <div className="relative h-full p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-all duration-500 overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-5">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                {/* Simplified Circle Animation */}
                <motion.circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="rgba(168,85,247,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - percentage / 100) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
              </svg>
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy" 
                className="w-5 h-5 object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
            <span className="text-[10px] font-mono text-zinc-600 group-hover:text-purple-400 tabular-nums transition-colors duration-500">
              {percentage}%
            </span>
          </div>

          <h4 className="text-sm font-light text-zinc-400 group-hover:text-white transition-colors duration-500 mb-1">
            {tech.name}
          </h4>
          <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.3em]">
            {t('tech.verified_skill')}
          </span>
        </div>

        <div className="mt-4 h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500/60 to-purple-400/30 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Disabled Glow on Mobile for Performance */}
        <div className="hidden md:block absolute -bottom-8 -right-8 w-24 h-24 bg-purple-500/[0.06] blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, idx }) => {
  const { t } = useTranslation();
  const Icon = category.icon;

  return (
    <div className="relative">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2.5 rounded-xl bg-purple-500/[0.08] border border-purple-500/[0.12]">
          <Icon size={20} strokeWidth={1.2} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-extralight text-white tracking-tight uppercase">
            {t(category.nameKey)}
          </h3>
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
            {category.technologies.length} {t('tech.comp_prefix')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {category.technologies.map((tech, i) => (
          <TechCard key={i} tech={tech} index={i} categoryIdx={idx} />
        ))}
      </div>
    </div>
  );
};

export function TechStack() {
  const { t } = useTranslation();

  const techCategories = [
    {
      id: 1,
      nameKey: 'tech.cat.frontend',
      icon: Globe,
      technologies: [
        { name: t('tech.item.react'), level: 95, icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: t('tech.item.next'), level: 85, icon: "https://www.svgrepo.com/show/354113/nextjs-icon.svg" },
        { name: t('tech.item.tailwind'), level: 92, icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
        { name: t('tech.item.framer'), level: 80, icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
      ]
    },
    {
      id: 2,
      nameKey: 'tech.cat.backend',
      icon: Database,
      technologies: [
        { name: t('tech.item.node'), level: 88, icon: "https://images.seeklogo.com/logo-png/27/1/node-js-logo-png_seeklogo-273749.png" },
        { name: t('tech.item.postgres'), level: 80, icon: "https://static-00.iconduck.com/assets.00/postgresql-icon-1987x2048-v29is76n.png" },
        { name: t('tech.item.mongo'), level: 75, icon: "https://images.seeklogo.com/logo-png/48/2/mongodb-logo-png_seeklogo-481256.png" },
        { name: t('tech.item.express'), level: 85, icon: "https://cdn.worldvectorlogo.com/logos/expressjs.svg" },
      ]
    },
    {
      id: 3,
      nameKey: 'tech.cat.infra',
      icon: Cpu,
      technologies: [
        { name: t('tech.item.docker'), level: 75, icon: "https://images.icon-icons.com/2108/PNG/512/docker_icon_130955.png" },
        { name: t('tech.item.aws'), level: 70, icon: "https://images.seeklogo.com/logo-png/31/2/amazon-web-services-aws-logo-png_seeklogo-319188.png" },
        { name: t('tech.item.git'), level: 90, icon: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
        { name: t('tech.item.vite'), level: 85, icon: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" },
      ]
    }
  ];

  return (
    <section id="tech-stack" className="relative pt-8 pb-8 bg-transparent overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24">
          <h2 className="text-6xl md:text-9xl font-extralight tracking-tighter text-white leading-none uppercase">
            {t('tech.heading1')} <br />
            <span className="text-zinc-800 italic">{t('tech.heading2')}</span> <br />
            <span className="text-zinc-200">{t('tech.heading3')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {techCategories.map((category, idx) => (
            <CategorySection key={category.id} category={category} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;