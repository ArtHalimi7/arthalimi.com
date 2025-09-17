import React from 'react';
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
    summary: "Contributed to frontend features and UI polish across a compact delivery cycle, working with React and modern development tools to enhance user experience and application performance.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git", "Figma"],
    achievements: [
      "Built 3 responsive components used across the main application",
      "Improved page load speed by 15% through code optimization",
      "Collaborated with design team on 5+ UI/UX improvements"
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
    summary: "Delivered client websites and custom components, shipping 20+ projects end-to-end with focus on performance and user experience. Specialized in modern web technologies and SEO optimization.",
    skills: ["JavaScript", "React", "Node.js", "WordPress", "SEO", "UI/UX Design"],
    achievements: [
      "Successfully delivered 20+ client projects on time and budget",
      "Achieved 98% client satisfaction rate with positive testimonials",
      "Increased client website traffic by average 40% through SEO optimization",
      "Built custom e-commerce solutions generating $50K+ in client revenue"
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
    summary: "Managed IT operations and infrastructure; coordinated tooling and support for teams while ensuring system reliability and security. Led technical initiatives and cross-department collaboration.",
    skills: ["System Administration", "Network Security", "Team Leadership", "Project Management", "Technical Support"],
    achievements: [
      "Reduced system downtime by 60% through proactive monitoring",
      "Led IT infrastructure upgrade serving 50+ employees",
      "Implemented security protocols reducing vulnerabilities by 80%",
      "Managed team of 4 IT specialists and coordinated cross-department projects"
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
              Professional Journey
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">Work</span>
            <span className="block ml-16">Experiences</span>
          </h1>
          
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Professional Snapshot
            </span>
          </div>
          
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            Click on any experience to explore detailed achievements, technologies used, 
            and key project highlights from my professional journey.
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