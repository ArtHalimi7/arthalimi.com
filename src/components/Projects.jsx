
import React from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight } from "lucide-react";
import illyonImg from "../assets/illyon.png";
import zahlxImg from "../assets/zahlx.png";
import andiImg from "../assets/andi.png";
import arsaImg from "../assets/arsa.png";

const projects = [
  {
    id: 1,
    title: "Illyon",
    category: "Ecommerce Platform",
    image: illyonImg,
    role: "Full-Stack Developer",
    year: "2025",
    description: "Ecommerce platform with product catalog, checkout, and admin features.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    features: ["Catalog", "Auth", "Checkout"],
    impact: "Helped businesses launch online stores.",
    link: "https://illyon.com",
  },
  {
    id: 2,
    title: "ZahlX",
    category: "AI Business Platform",
    image: zahlxImg,
    role: "Lead Developer",
    year: "2025",
    description: "AI-backed business platform for automated invoicing and analytics.",
    tech: ["React", "Node.js", "OpenAI API"],
    features: ["Analytics", "Invoicing"],
    impact: "Streamlined operations for SMEs.",
    link: "https://zahlx.com",
  },
  {
    id: 3,
    title: "Andi Shkodra",
    category: "Political Campaign Website",
    image: andiImg,
    role: "Frontend Developer",
    year: "2025",
    description: "Campaign site with biography, events, and volunteer signup.",
    tech: ["React", "TailwindCSS"],
    features: ["Profile", "Events"],
    impact: "Increased campaign engagement.",
    link: "https://andi.com",
  },
  {
    id: 4,
    title: "Arsa Construction Switzerland",
    category: "Construction Company Website",
    image: arsaImg,
    role: "Frontend Developer",
    year: "2025",
    description: "Company website showcasing projects and services.",
    tech: ["React", "TailwindCSS"],
    features: ["Gallery", "Contact"],
    impact: "Helped reach new clients.",
    link: "https://arsa.com",
  },
];

function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0"></div>
  );
}



function ProjectCard({ project, index }) {
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
            {project.category}
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">{project.year}</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-1 truncate">{project.title}</h2>
        <span className="text-zinc-400 text-xs font-medium mb-2 truncate">{project.role}</span>
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
        <p className="text-zinc-300 text-sm mb-3 line-clamp-3">{project.description}</p>
        <div className="flex-1" />
        <div className="flex justify-center mt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#B71C1C] text-white px-8 py-3 font-medium text-base rounded-none hover:bg-[#8B1515] transition-colors duration-200"
            >
              <span>View Project</span>
              <ArrowRight className="w-5 h-5" />
            </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
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
              Project Portfolio
            </span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">Featured</span>
            <span className="block ml-16">Projects</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Innovative Solutions & Creative Work
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            Explore a curated selection of my most impactful projects, highlighting technical expertise, creative problem-solving, and real-world results.
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
