/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Cpu, Globe, Database } from "lucide-react";
import mysqlIcon from "../assets/mysql.png";
import nodeIcon from "../assets/node.png";
import dockerIcon from "../assets/docker.png";

const TechCard = ({ tech, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative h-40 will-change-transform"
    >
      <div className="relative h-full p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:border-purple-500/20 transition-all duration-500 overflow-hidden flex flex-col items-center text-center gap-4">
        {/* Tech Icon — larger, centered */}
        <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-purple-500/[0.06] border border-purple-500/15 group-hover:bg-white/[0.03] group-hover:border-white/[0.05] transition-all duration-500">
          <img
            src={tech.icon}
            alt={tech.name}
            loading="lazy"
            decoding="async"
            className="w-8 h-8 object-contain opacity-100 grayscale-0 group-hover:grayscale group-hover:opacity-60 transition-all duration-500"
          />
        </div>

        {/* Tech name */}
        <h4 className="text-sm font-light text-white group-hover:text-zinc-400 transition-colors duration-500 leading-tight">
          {tech.name}
        </h4>

        {/* Experience tag */}
        <span className="text-[9px] font-mono text-purple-400/80 group-hover:text-zinc-600 uppercase tracking-[0.25em] transition-colors duration-500">
          {tech.years} yrs
        </span>

        {/* Glow on hover — desktop only */}
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
            {category.technologies.length} technologies
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {category.technologies.map((tech, i) => (
          <TechCard key={i} tech={tech} index={i} />
        ))}
      </div>
    </div>
  );
};

export function TechStack() {
  const { t } = useTranslation();

  const techCategories = useMemo(() => [
    {
      id: 1,
      nameKey: 'tech.cat.frontend',
      icon: Globe,
      technologies: [
        { name: t('tech.item.react'), years: '3+', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: t('tech.item.next'), years: '2+', icon: "https://www.svgrepo.com/show/354113/nextjs-icon.svg" },
        { name: t('tech.item.tailwind'), years: '3+', icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
        { name: t('tech.item.framer'), years: '1+', icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
      ]
    },
    {
      id: 2,
      nameKey: 'tech.cat.backend',
      icon: Database,
      technologies: [
        { name: t('tech.item.node'), years: '2+', icon: nodeIcon },
        { name: t('tech.item.postgres'), years: '2+', icon: mysqlIcon },
        { name: t('tech.item.mongo'), years: '2+', icon: "https://images.seeklogo.com/logo-png/48/2/mongodb-logo-png_seeklogo-481256.png" },
        { name: t('tech.item.express'), years: '2+', icon: "https://cdn.worldvectorlogo.com/logos/expressjs.svg" },
      ]
    },
    {
      id: 3,
      nameKey: 'tech.cat.infra',
      icon: Cpu,
      technologies: [
        { name: t('tech.item.docker'), years: '1+', icon: dockerIcon },
        { name: t('tech.item.aws'), years: '1+', icon: "https://images.seeklogo.com/logo-png/31/2/amazon-web-services-aws-logo-png_seeklogo-319188.png" },
        { name: t('tech.item.git'), years: '3+', icon: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
        { name: t('tech.item.vite'), years: '2+', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" },
      ]
    }
  ], [t]);

  return (
    <section id="tech-stack" className="section-glow relative pt-8 pb-8 bg-transparent overflow-hidden">
      {/* White + purple ambient glow — desktop only for performance */}
      <div className="hidden md:block absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-white/[0.015] rounded-full pointer-events-none" style={{ filter: 'blur(100px)' }} />
      <div className="hidden md:block absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full pointer-events-none" style={{ filter: 'blur(80px)' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24">
          <h2 className="text-4xl md:text-9xl font-extralight tracking-tighter text-white leading-none uppercase">
            {t('tech.heading1')} <br />
            <span className="text-zinc-800 italic">{t('tech.heading2')}</span> <br />
            <span className="text-zinc-200">{t('tech.heading3')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {techCategories.map((category, idx) => (
            <div key={category.id}>
              {idx > 0 && <div className="neon-line w-full mb-12 lg:hidden" />}
              <CategorySection category={category} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;