import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Languages, 
  Lightbulb,
  ArrowRight,
  Star,
  ChevronDown
} from 'lucide-react';

/**
 * @typedef {Object} ContactInfoProps
 * @property {React.ElementType} icon
 * @property {string} label
 * @property {string} value
 * @property {string} [href]
 */

function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3 p-4 bg-[#232425] border border-white/10 hover:bg-[#2a2b2c] transition-colors duration-200 group">
      <div className="w-8 h-8 bg-[#18191A] border border-white/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#B71C1C]" />
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
          {label}
        </div>
        <div className="text-zinc-300 font-medium">
          {value}
        </div>
      </div>
      {href && (
        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#B71C1C] transition-colors" />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

/**
 * @typedef {Object} LanguageItemProps
 * @property {string} language
 * @property {string} proficiency
 * @property {number} level
 */

/** @param {LanguageItemProps} props */
function LanguageItem({ language, proficiency, level }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-[80px] bg-[#232425] border border-white/10 flex flex-col justify-center"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-300 font-medium">{language}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {proficiency}
        </span>
      </div>
      <div className="flex gap-1 items-center min-h-[20.5px]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-3 flex-1 rounded ${
              i < level ? 'bg-[#B71C1C]' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
/**
 * @typedef {Object} SkillItemProps
 * @property {string} skill
 * @property {number} index
 */

/** @param {SkillItemProps} props */
function SkillItem({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center gap-2 p-3 bg-[#232425] border border-white/10 hover:bg-[#2a2b2c] transition-colors duration-200"
    >
      <div className="w-1 h-1 bg-[#B71C1C]" />
      <span className="text-zinc-300 text-sm font-medium">{skill}</span>
    </motion.div>
  );
}

function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-6 right-6 top-0 bottom-0">
      </div>
    </div>
  );
}

export function AboutMe() {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Prishtina, Kosovo'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '',
      href: 'tel:'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'arthalimi989@gmail.com',
      href: 'mailto:arthalimi989@gmail.com'
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'arthalimi.netlify.app',
      href: 'https://arthalimi.netlify.app'
    }
  ];

  const languages = [
    { language: 'Albanian', proficiency: 'Native proficiency', level: 5 },
    { language: 'English', proficiency: 'Advanced proficiency', level: 4 },
    { language: 'German', proficiency: 'Intermediate proficiency', level: 3 }
  ];

  return (
  <section id="about" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
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
            <User className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
              Personal Profile
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">About</span>
            <span className="block ml-16">Me</span>
          </h1>
          
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Get to know the person behind the code
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            Explore a curated selection of my most impactful projects, highlighting technical expertise, creative problem-solving, and real-world results.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group mb-16"
        >
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
            <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
            <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
            <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
          </div>

          <div 
            className="relative bg-[#232425] p-8 cursor-pointer hover:bg-[#2a2b2c] transition-colors duration-200"
            onClick={() => setIsStoryExpanded(!isStoryExpanded)}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                  My Story
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <motion.div
                animate={{ rotate: isStoryExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-500 group-hover:text-[#B71C1C] transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                I'm a dedicated Web Developer with experience in managing IT operations and developing dynamic web applications. 
                My journey started with a passion for technology and has evolved into expertise in full-stack development.
              </p>
              
              {isStoryExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <p>
                    Proficient in ReactJS, NodeJS, and TailwindCSS, I have a strong background in both frontend and backend development. 
                    I'm known for creating customized technology solutions and improving user experiences through innovative approaches.
                  </p>
                  
                  <p>
                    Currently seeking to leverage my skills and knowledge in a challenging role where I can continue growing and 
                    contributing to meaningful projects that make a difference.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B71C1C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </motion.div>

        {/* Grid Layout for Contact, Languages, and Skills */}
        <div className="grid lg:grid-cols-2 gap-0 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
              <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
              <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
              <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
            </div>

            <div className="relative bg-[#232425] p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                  Contact Information
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <ContactItem {...item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
              <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
              <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
              <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
            </div>

            <div className="relative bg-[#232425] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Languages className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                  Languages
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.language}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <LanguageItem {...lang} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
