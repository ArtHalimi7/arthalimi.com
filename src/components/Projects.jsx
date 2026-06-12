/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

// --- DATA ASSETS ---
import tafaImg from "../assets/tafa.png";
import lbImg from "../assets/lb.png";
import andiImg from "../assets/andi.png";
import arsaImg from "../assets/arsa.png";
import swissFlag from "../assets/swiss.png";
import macbookImg from "../assets/macbook.webp";

const projectsData = [
  { id: 1, titleKey: 'projects.tafa.title', image: tafaImg, year: '2026', descriptionKey: 'projects.tafa.description', tech: 'projects.tafa.tech', link: 'https://tafaleka.com', domain: 'tafaleka.com', categoryKey: 'projects.tafa.category' },
  { id: 2, titleKey: 'projects.lb.title', image: lbImg, year: '2026', descriptionKey: 'projects.lb.description', tech: 'projects.lb.tech', link: 'https://lbhairdesign.ch', flag: swissFlag, domain: 'lbhairdesign.ch', categoryKey: 'projects.lb.category' },
  { id: 3, titleKey: 'projects.andi.title', image: andiImg, year: '2025', descriptionKey: 'projects.andi.description', tech: 'Portfolio', link: 'https://andishkodra.com', domain: 'andishkodra.com', categoryKey: 'projects.andi.category' },
  { id: 4, titleKey: 'projects.arsa.title', image: arsaImg, year: '2025', descriptionKey: 'projects.arsa.description', tech: 'Architecture', link: 'https://arsagipser.ch', flag: swissFlag, domain: 'arsagipser.ch', categoryKey: 'projects.arsa.category' },
];

export function Projects() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(1);

  const activeProject = projectsData.find(p => p.id === activeId) || projectsData[0];

  return (
    <section id="projects" className="relative bg-[#050505] pt-32 pb-24 md:pb-36 overflow-hidden border-t border-white/[0.06]">
      {/* Subtle Grid Lines (Architectural Aesthetic) */}
      <div className="absolute inset-y-0 left-12 md:left-24 lg:left-32 w-px bg-white/[0.02] pointer-events-none" />
      <div className="absolute inset-y-0 right-12 md:right-24 lg:right-32 w-px bg-white/[0.02] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
        
        {/* Header (KEEPING AS IT IS) */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-purple-500/80 text-[10px] font-bold tracking-[0.5em] uppercase italic">
                {t('projects.section_tag')}
              </span>
              <div className="h-[1px] w-12 bg-purple-500/20" />
            </div>

            <h2 className="text-4xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic leading-[0.85]">
              {t('projects.section_title1')} <br />
              <span className="text-zinc-800 italic">&</span> <span className="text-purple-500/80">{t('projects.section_title2')}</span>
            </h2>

            <p className="mt-8 text-zinc-500 text-base md:text-lg font-light max-w-xl leading-relaxed italic border-l border-zinc-800/40 pl-6">
              {t('projects.section_lead')}
            </p>
          </motion.div>
        </div>

        {/* MOBILE LAYOUT TABS SELECTOR */}
        <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-3 pb-6 border-b border-white/[0.06] mb-8">
          {projectsData.map((project, index) => {
            const isActive = activeId === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveId(project.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 flex items-center gap-2 ${
                  isActive 
                    ? "bg-purple-500 text-white border-purple-500/50 shadow-lg" 
                    : "bg-white/[0.02] text-zinc-400 border-white/10 hover:text-white"
                }`}
              >
                <span>0{index + 1}</span>
                <span className="font-light">{t(project.titleKey)}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN SHOWROOM SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT PANEL: Nav Selector + Active Details (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            
            {/* Desktop Navigation Tabs (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col border-b border-white/[0.06]">
              {projectsData.map((project, index) => {
                const isActive = activeId === project.id;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    className={`flex items-center justify-between py-6 border-t border-white/[0.06] text-left transition-all duration-300 group ${
                      isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className={`text-[10px] font-mono tracking-widest transition-colors ${
                        isActive ? 'text-purple-400' : 'text-zinc-600'
                      }`}>
                        0{index + 1}
                      </span>
                      {/* Project Title (KEEPING AS IT IS) */}
                      <h3 className="text-xl md:text-2xl font-extralight tracking-tighter uppercase italic leading-none transition-transform group-hover:translate-x-1">
                        {t(project.titleKey)}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono opacity-50">{project.year}</span>
                      {project.flag && (
                        <img 
                          src={project.flag} 
                          alt="Switzerland" 
                          className="w-3.5 h-3.5 object-contain opacity-55 border border-white/10 rounded-sm" 
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Project Details Presentation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 md:space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    {t(activeProject.categoryKey)}
                  </span>
                  {/* Title fallback visible only in mobile view flow */}
                  <h3 className="lg:hidden text-2xl font-extralight tracking-tighter text-white uppercase italic leading-none">
                    {t(activeProject.titleKey)}
                  </h3>
                </div>

                <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base border-l-2 border-purple-500/20 pl-6">
                  {t(activeProject.descriptionKey)}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {t(activeProject.tech).split(',').map((techName, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-mono text-purple-300 bg-purple-500/[0.04] border border-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider"
                    >
                      {techName.trim()}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Circle Button */}
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 w-fit group/btn cursor-pointer pt-2"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover/btn:bg-white group-hover/btn:text-black group-hover/btn:scale-110 transition-all duration-500">
                    <ArrowUpRight size={16} strokeWidth={1.5} className="group-hover/btn:rotate-45 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400 group-hover/btn:text-white transition-colors">
                      {t('projects_viewProject')}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                      {activeProject.domain} // live
                    </span>
                  </div>
                </a>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* RIGHT PANEL: High-fidelity MacBook Mockup Showcase (7 Columns) */}
          <div className="lg:col-span-7 flex items-center justify-center pt-8 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[3944/2564] max-w-[680px] select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(124,58,237,0.08)]"
            >
              {/* Laptop Shell (Front view) */}
              <img 
                src={macbookImg} 
                className="w-full h-full object-contain pointer-events-none z-10 relative" 
                alt="MacBook mockup" 
              />
              
              {/* Dynamic Overlay Screen Area */}
              <div className="absolute top-[12.1%] left-[11.2%] w-[77.6%] h-[76.2%] overflow-hidden rounded-[1%]/[1.5%] bg-black z-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProject.id}
                    src={activeProject.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Projects;