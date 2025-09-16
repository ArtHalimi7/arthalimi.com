
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
    description:
      "Illyon is a robust ecommerce platform designed for seamless online shopping experiences. It features advanced product catalog management, secure user authentication, shopping cart, order tracking, and integrated payment gateways. The platform supports promotional campaigns, product reviews, and real-time inventory updates, making it ideal for businesses looking to scale online sales.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "TailwindCSS"],
    features: [
      "Product Catalog & Search",
      "User Authentication & Profiles",
      "Shopping Cart & Checkout",
      "Order Tracking",
      "Integrated Payments",
      "Promotions & Reviews",
      "Admin Dashboard",
    ],
    impact:
      "Enabled hundreds of businesses to launch online stores and increased sales conversion rates.",
    link: "https://illyon.com",
  },
  {
    id: 2,
    title: "ZahlX",
    category: "AI Business Platform",
    image: zahlxImg,
    role: "Lead Developer",
    year: "2025",
    description:
      "ZahlX is an AI-powered business management platform that streamlines operations for SMEs. It offers intelligent analytics, automated invoicing, expense tracking, and predictive insights. ZahlX integrates with popular accounting tools and provides a dashboard for monitoring KPIs, employee performance, and financial health. The AI assistant helps with decision-making and workflow automation.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "OpenAI API",
      "TailwindCSS",
    ],
    features: [
      "AI Analytics & Insights",
      "Automated Invoicing",
      "Expense Tracking",
      "KPI Dashboard",
      "Employee Performance Monitoring",
      "Workflow Automation",
      "Accounting Integrations",
    ],
    impact:
      "Helped businesses save time and money by automating management tasks and providing actionable insights.",
    link: "https://zahlx.com",
  },
  {
    id: 3,
    title: "Andi Shkodra",
    category: "Political Campaign Website",
    image: andiImg,
    role: "Frontend Developer",
    year: "2025",
    description:
      "A modern campaign website for a municipal assembly candidate, Andi. The site features candidate biography, campaign goals, news updates, event calendar, and volunteer sign-up forms. It integrates social media feeds and donation processing, providing a central hub for supporters and constituents to engage with the campaign.",
    tech: ["React", "TailwindCSS", "Vite", "Framer Motion"],
    features: [
      "Candidate Profile",
      "Campaign Goals",
      "News & Events",
      "Volunteer Sign-Up",
      "Donation Integration",
      "Social Media Feeds",
    ],
    impact:
      "Boosted campaign engagement and donations through a user-friendly, informative platform.",
    link: "https://andi.com",
  },
  {
    id: 4,
    title: "Arsa Construction Switzerland",
    category: "Construction Company Website",
    image: arsaImg,
    role: "Frontend Developer",
    year: "2025",
    description:
      "Arsa is a professional website for a construction company based in Switzerland, specializing in drywall installation and other construction services. The site showcases completed projects, service offerings, client testimonials, and contact forms. It features a gallery, service request forms, and multilingual support for Swiss and international clients.",
    tech: ["React", "TailwindCSS", "Vite", "Framer Motion"],
    features: [
      "Project Gallery",
      "Service Offerings",
      "Client Testimonials",
      "Contact & Service Request Forms",
    ],
    impact:
      "Helped Arsa reach new clients and showcase their expertise in Swiss construction.",
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

        {/* Footer CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-white/10 max-w-32" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Want to see more?
            </span>
            <div className="h-px flex-1 bg-white/10 max-w-32" />
          </div>
          <a
            href="https://arthalimi.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#B71C1C] text-white px-8 py-4 font-medium hover:bg-[#8B1515] transition-colors duration-200"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
