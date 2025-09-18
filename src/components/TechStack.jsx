import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Layers, Database, Globe, Cpu, Palette } from "lucide-react";
import { useTranslation } from 'react-i18next';

const techCategories = [
  {
    id: 1,
    nameKey: 'tech.category.frontend',
    icon: Globe,
    color: "#374151", // Sophisticated dark gray
    technologies: [
      { 
        nameKey: 'tech.names.react',
        name: "React",
        level: 95, 
        experience: "3+ years",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
      },
      { 
        nameKey: 'tech.names.next',
        name: "Next.js",
        level: 85, 
        experience: "2+ years",
        icon: "https://www.svgrepo.com/show/354113/nextjs-icon.svg"
      },
      { 
        nameKey: 'tech.names.tailwind',
        name: "TailwindCSS",
        level: 92, 
        experience: "3+ years",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png"
      },
      { 
        nameKey: 'tech.names.framer',
        name: "Framer Motion",
        level: 80, 
        experience: "1+ year",
        icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg"
      },
    ]
  },
  {
    id: 2,
    nameKey: 'tech.category.backend',
    icon: Database,
    color: "#4B5563", // Medium gray
    technologies: [
      { 
        nameKey: 'tech.names.node',
        name: "Node.js",
        level: 88, 
        experience: "2+ years",
        icon: "https://images.seeklogo.com/logo-png/27/1/node-js-logo-png_seeklogo-273749.png"
      },
      { 
        nameKey: 'tech.names.express',
        name: "Express",
        level: 85, 
        experience: "2+ years",
        icon: "https://cdn.worldvectorlogo.com/logos/expressjs.svg"
      },
      { 
        nameKey: 'tech.names.mongodb',
        name: "MongoDB",
        level: 80, 
        experience: "2+ years",
        icon: "https://images.seeklogo.com/logo-png/48/2/mongodb-logo-png_seeklogo-481256.png"
      },
      { 
        nameKey: 'tech.names.mysql',
        name: "MySQL",
        level: 75, 
        experience: "1+ year",
        icon: "https://images.icon-icons.com/1381/PNG/512/mysqlworkbench_93532.png"
      },
    ]
  },
  {
    id: 3,
    nameKey: 'tech.category.tools',
    icon: Cpu,
    color: "#6B7280", // Lighter sophisticated gray
    technologies: [
      { 
        nameKey: 'tech.names.git',
        name: "Git",
        level: 90, 
        experience: "3+ years",
        icon: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
      },
      { 
        nameKey: 'tech.names.docker',
        name: "Docker",
        level: 75, 
        experience: "1+ year",
        icon: "https://images.icon-icons.com/2108/PNG/512/docker_icon_130955.png"
      },
      { 
        nameKey: 'tech.names.aws',
        name: "AWS",
        level: 70, 
        experience: "1+ year",
        icon: "https://images.seeklogo.com/logo-png/31/2/amazon-web-services-aws-logo-png_seeklogo-319188.png"
      },
      { 
        nameKey: 'tech.names.render',
        name: "Render",
        level: 85, 
        experience: "2+ years",
        icon: "https://images.seeklogo.com/logo-png/53/1/render-logo-png_seeklogo-532232.png"
      },
      { 
        nameKey: 'tech.names.vite',
        name: "Vite",
        level: 80, 
        experience: "1+ year",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/2078px-Vitejs-logo.svg.png"
      },
    ]
  },
  {
    id: 4,
    nameKey: 'tech.category.design',
    icon: Palette,
    color: "#52525b", // Elegant zinc gray
    technologies: [
      { 
        nameKey: 'tech.names.figma',
        name: "Figma",
        level: 85, 
        experience: "2+ years",
        icon: "https://static.vecteezy.com/system/resources/previews/065/386/871/non_2x/figma-logo-icon-figma-app-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.png"
      },
      { 
        nameKey: 'tech.names.adobexd',
        name: "Adobe XD",
        level: 75, 
        experience: "1+ year",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/2101px-Adobe_XD_CC_icon.svg.png"
      },
      { 
        nameKey: 'tech.names.photoshop',
        name: "Photoshop",
        level: 70, 
        experience: "2+ years",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1051px-Adobe_Photoshop_CC_icon.svg.png"
      },
      { 
        nameKey: 'tech.names.illustrator',
        name: "Illustrator",
        level: 65, 
        experience: "1+ year",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/500px-Adobe_Illustrator_CC_icon.svg.png"
      },
    ]
  }
];

function GridLines() {
  return null; // Removed grid lines for cleaner look
}

function TechBubble({ tech, delay, category }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  // prepare a display name that avoids breaking inside tokens like "Node.js" or "Next.js"
  const rawName = t(tech.nameKey);
  const displayName = rawName.replace(/\.(?=\w)/g, '\u00A0.').replace(/-/g, '\u2011'); // non-breaking hyphen
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div 
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 bg-gradient-to-br from-white to-gray-50 transition-all duration-500 flex items-center justify-center backdrop-blur-sm overflow-y-hidden focus:outline-none"
        style={{ borderColor: category.color }}
      >
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-2 py-2">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-1 flex items-center justify-center">
            <img 
              src={tech.icon}
              alt={t(tech.nameKey)}
              className="w-full h-full object-contain"
              style={{ 
                filter: tech.name === 'Next.js' || tech.name === 'Express' ? 'brightness(0.2)' : 'none'
              }}
            />
          </div>
          <span className="mt-1 text-[9px] sm:text-[10px] md:text-[13px] font-semibold text-gray-800 leading-tight text-center break-normal max-w-[85%] whitespace-normal flex items-center justify-center">
            {displayName}
          </span>
        </div>
        
        {/* Removed progress ring to avoid inner circle/half-circle visuals */}
        
        {/* Floating label */}
          <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -20 : 10,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-3 rounded-xl text-xs whitespace-nowrap z-20 border border-gray-700"
        >
          <div className="text-center">
            <div className="font-semibold text-white">{t('tech.proficiency', { level: tech.level })}</div>
            <div className="text-gray-300 text-xs mt-1">{tech.experience}</div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-gray-800"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CategorySection({ category, index }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 * index }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-8">
        <category.icon 
          className="w-6 h-6"
          style={{ color: category.color }}
        />
        <div className="h-px flex-1 bg-black/10" />
        <span 
          className="text-xs uppercase tracking-wider font-bold"
          style={{ color: category.color }}
        >
          {t(category.nameKey)}
        </span>
      </div>
      
      {/* On small screens allow horizontal scroll; desktop keeps centered wrap */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-4 sm:gap-6 md:gap-12 overflow-x-auto sm:flex-wrap justify-start sm:justify-center py-2 no-scrollbar">
          {category.technologies.map((tech, techIndex) => (
            <div key={tech.name} className="flex-shrink-0 sm:flex-shrink md:flex-shrink-0">
              <TechBubble
                tech={tech}
                category={category}
                delay={0.1 * techIndex + 0.3 * index}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const { t } = useTranslation();

  return (
    <section id="tech-stack" className="relative min-h-screen bg-[#dadadb] text-gray-900 py-20">
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
            <Code className="w-6 h-6 text-[#374151]" />
            <div className="h-px flex-1 bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#374151] font-medium">
              {t('tech.heading_small')}
            </span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-gray-900 mb-8">
            <span className="block">{t('tech.title_part1')}</span>
            <span className="block ml-16">{t('tech.title_part2')}</span>
          </h1>
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#374151]">*</span>
            <div className="h-px flex-1 bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
              {t('tech.sub_lead')}
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-gray-700 leading-relaxed">
            {t('tech.lead')}
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="space-y-16">
            {techCategories.map((category, index) => (
              <CategorySection 
                key={category.id} 
                category={category} 
                index={index} 
              />
            ))}
          </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-extrabold text-[#374151] mb-2">17+</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">{t('stats.technologies')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-[#4B5563] mb-2">3+</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">{t('stats.years')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-[#6B7280] mb-2">10+</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">{t('stats.projects')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-[#52525b] mb-2">24/7</div>
            <div className="text-sm uppercase tracking-wider text-gray-600">{t('tech.learning') || t('stats.satisfaction')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;