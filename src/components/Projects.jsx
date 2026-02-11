/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

// --- DATA ASSETS ---
import tafaImg from "../assets/tafa.png";
import lbImg from "../assets/lb.png";
import andiImg from "../assets/andi.png";
import arsaImg from "../assets/arsa.png";

const projectsData = [
  { id: 1, titleKey: 'projects.tafa.title', image: tafaImg, year: '2026', descriptionKey: 'projects.tafa.description', tech: 'projects.tafa.tech', link: 'https://tafaleka.com', color: '#080808' },
  { id: 2, titleKey: 'projects.lb.title', image: lbImg, year: '2026', descriptionKey: 'projects.lb.description', tech: 'projects.lb.tech', link: 'https://lbhairdesign.ch', color: '#0B080C' },
  { id: 3, titleKey: 'projects.andi.title', image: andiImg, year: '2025', descriptionKey: 'projects.andi.description', tech: 'Portfolio', link: 'https://andishkodra.com', color: '#08090C' },
  { id: 4, titleKey: 'projects.arsa.title', image: arsaImg, year: '2025', descriptionKey: 'projects.arsa.description', tech: 'Architecture', link: 'https://arsagipser.ch', color: '#080A08' },
];

function ProjectCard({ project, index }) {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-10">
      <motion.div
        initial={{ transform: "scale(0.9) translateZ(0)", opacity: 0 }}
        whileInView={{ transform: "scale(1) translateZ(0)", opacity: 1 }}
        viewport={{ margin: "-5%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: project.color, willChange: "transform, opacity" }}
        className="relative w-full max-w-7xl h-[80vh] rounded-[32px] border border-white/[0.07] flex flex-col md:flex-row items-center p-8 md:p-14 gap-8 md:gap-16 shadow-[0_0_80px_rgba(168,85,247,0.04),0_40px_100px_rgba(0,0,0,0.7)] hover:shadow-[0_0_80px_rgba(168,85,247,0.04),0_40px_100px_rgba(0,0,0,0.7),0_0_1px_rgba(255,255,255,0.15),0_0_15px_rgba(255,255,255,0.04)] hover:border-white/[0.12] transition-all duration-700 overflow-hidden"
      >
        <div className="w-full md:w-[35%] flex flex-col justify-between h-full z-10 overflow-hidden">
          <div className="overflow-hidden">
            <div className="flex items-center gap-3 mb-6 shrink-0">
              <span className="text-purple-500/80 text-[10px] font-bold tracking-[0.5em] uppercase italic">0{index + 1}</span>
              <div className="h-[1px] w-8 bg-zinc-800" />
              <span className="text-zinc-600 text-[10px] font-medium tracking-widest">{project.year}</span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extralight italic tracking-tighter text-white mb-6 leading-[1.05] shrink-0">
              {t(project.titleKey)}
            </h3>

            <div className="max-h-[25vh] overflow-y-auto custom-scrollbar mb-8 pr-2">
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed italic">
                {t(project.descriptionKey)}
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[9px] text-zinc-400 uppercase tracking-widest font-medium">
                {t(project.tech)}
              </span>
            </div>
          </div>

          <a href={project.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 text-white w-fit pt-6 shrink-0">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-500 transform group-hover:scale-110">
              <ArrowUpRight size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">View Case</span>
          </a>
        </div>

        <div className="w-full md:w-[65%] h-[40vh] md:h-full relative rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/[0.07] flex-grow">
          {/* OPTIMIZATION: Added loading="lazy" and decoding="async" */}
          <motion.img
            src={project.image}
            alt={t(project.titleKey)}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-1000"
            style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <section id="projects" className="section-glow bg-black relative pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(168,85,247,0.05),transparent)] pointer-events-none" />
      <div className="hidden md:block absolute top-[5%] right-[20%] w-[350px] h-[350px] bg-white/[0.012] rounded-full pointer-events-none" style={{ filter: 'blur(100px)' }} />
      <div className="h-[35vh] w-full flex flex-col justify-center items-center px-6 text-center overflow-hidden relative z-10">
        <motion.div style={{ y: yParallax, willChange: "transform" }} className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-purple-500/50" />
            <span className="text-purple-500/80 text-[10px] font-bold tracking-[0.6em] uppercase italic">{t('projects.section_tag')}</span>
            <div className="w-10 h-[1px] bg-purple-500/50" />
          </div>

          <h2 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic leading-[0.85]">
            {t('projects.section_title1')} <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">{t('projects.section_title2')}</span>
          </h2>

          <p className="mt-6 text-zinc-500 text-base md:text-lg font-light max-w-xl leading-relaxed italic">
            {t('projects.section_lead')}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Projects;