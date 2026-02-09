/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Cpu, Globe, Database } from "lucide-react";

const SkillItem = ({ tech }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="group/item flex items-center justify-between py-4 border-b border-white/[0.03] last:border-0"
  >
    <div className="flex items-center gap-5">
      <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.02] border border-white/5 group-hover/item:border-purple-500/30 transition-all duration-500">
        <img 
          src={tech.icon} 
          alt={tech.name} 
          className="w-5 h-5 object-contain opacity-20 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700"
        />
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm font-light text-zinc-500 group-hover/item:text-white transition-colors">
          {tech.name}
        </span>
        <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest mt-0.5">
          Verified_Skill
        </span>
      </div>
    </div>

    <div className="flex items-center gap-8">
      <div className="hidden md:flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0.1 }}
            whileInView={{ opacity: i < Math.floor(tech.level / 20) ? 1 : 0.1 }}
            className={`h-3 w-[2px] ${i < Math.floor(tech.level / 20) ? 'bg-purple-500' : 'bg-zinc-800'}`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-zinc-600 tabular-nums">
        {tech.level}.00
      </span>
    </div>
  </motion.div>
);

const SkillGroup = ({ category, idx }) => {
  const { t } = useTranslation();
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      // FIXED: Removed conditional lg:mt logic to ensure all tables align perfectly at the top
      className="relative flex flex-col mt-0"
    >
      <div className="flex items-end gap-4 mb-10 pb-6 border-b border-white/5">
        <div className="text-purple-500/40">
          <Icon size={24} strokeWidth={1} />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
            Comp_0{category.id}
          </span>
          <h3 className="text-2xl font-extralight text-white tracking-tighter uppercase">
            {category.nameKey}
          </h3>
        </div>
      </div>

      <div className="space-y-1">
        {category.technologies.map((tech, i) => (
          <SkillItem key={i} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
};

export function TechStack() {
  const { t } = useTranslation();

  const techCategories = [
    {
      id: 1,
      nameKey: 'Frontend',
      icon: Globe,
      technologies: [
        { name: "React Ecosystem", level: 95, icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: "Next.js Framework", level: 85, icon: "https://www.svgrepo.com/show/354113/nextjs-icon.svg" },
        { name: "Tailwind Engine", level: 92, icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
        { name: "Framer Motion", level: 80, icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
      ]
    },
    {
      id: 2,
      nameKey: 'Backend',
      icon: Database,
      technologies: [
        { name: "Node.js Environment", level: 88, icon: "https://images.seeklogo.com/logo-png/27/1/node-js-logo-png_seeklogo-273749.png" },
        { name: "PostgreSQL DB", level: 80, icon: "https://static-00.iconduck.com/assets.00/postgresql-icon-1987x2048-v29is76n.png" },
        { name: "MongoDB Atlas", level: 75, icon: "https://images.seeklogo.com/logo-png/48/2/mongodb-logo-png_seeklogo-481256.png" },
        { name: "Express Logic", level: 85, icon: "https://cdn.worldvectorlogo.com/logos/expressjs.svg" },
      ]
    },
    {
      id: 3,
      nameKey: 'Infrastructure',
      icon: Cpu,
      technologies: [
        { name: "Docker Systems", level: 75, icon: "https://images.icon-icons.com/2108/PNG/512/docker_icon_130955.png" },
        { name: "AWS Services", level: 70, icon: "https://images.seeklogo.com/logo-png/31/2/amazon-web-services-aws-logo-png_seeklogo-319188.png" },
        { name: "Git Versioning", level: 90, icon: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
        { name: "Vite Tooling", level: 85, icon: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" },
      ]
    }
  ];

  return (
    <section id="tech-stack" className="relative pt-8 pb-8 bg-transparent overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-mono tracking-[0.5em] text-purple-500 uppercase">Tech_Manifest // 2026</span>
            <div className="h-px w-24 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-extralight tracking-tighter text-white leading-none uppercase">
            Core <br />
            <span className="text-zinc-800 italic">Engineering</span> <br />
            <span className="text-zinc-200">Capabilities.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          {techCategories.map((category, idx) => (
            <SkillGroup key={category.id} category={category} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;