import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Languages, 
  ArrowRight,
  ChevronDown,
  Code,
  Coffee,
  Heart,
  Target,
  Award,
  Zap,
  Clock,
  Users,
  Briefcase,
  Lightbulb,
  Star
} from 'lucide-react';

/**
 * Minimal Contact Item Component
 */
function MinimalContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
      <Icon className="w-4 h-4 text-[#B71C1C]" />
      <span>{value}</span>
      {href && <ArrowRight className="w-3 h-3 ml-auto opacity-50" />}
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
 * Minimal Language Item Component
 */
function MinimalLanguageItem({ language, proficiency, level }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-zinc-300">{language}</span>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? 'bg-[#B71C1C]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Interactive Stat Card Component
 */
function StatCard({ icon: Icon, value, label, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-gradient-to-br from-[#232425] to-[#1a1b1c] border border-white/10 rounded-xl p-6 text-center hover:border-[#B71C1C]/30 transition-all duration-300 h-[180px] sm:h-[210px] flex flex-col items-center justify-center whitespace-normal"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#B71C1C]/10 to-transparent rounded-xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="relative z-10 mb-4 mx-auto w-12 h-12 bg-[#B71C1C]/10 border border-[#B71C1C]/20 rounded-lg flex items-center justify-center"
          animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-6 h-6 text-[#B71C1C]" />
        </motion.div>

        <motion.div
          className="text-3xl font-bold text-white mb-2"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.div>

        <div className="text-sm text-zinc-400 uppercase tracking-wider">{label}</div>

        {/* Accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#B71C1C]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Interactive Value Card Component
 */
function ValueCard({ icon: Icon, title, description, delay = 0 }) {
  // Static, low-motion card to respect reduced motion preference.
  return (
    <div className="relative">
      <div className="bg-[#232425] border border-white/10 rounded-lg p-6 transition-colors duration-200">
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-10 h-10 bg-[#B71C1C]/10 border border-[#B71C1C]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#B71C1C]" />
          </div>

          <div className="flex-1">
            <h4 className="text-white font-medium mb-2">{title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingParticles() {
  // Heavy particle animation removed to reduce motion; return null for now.
  return null;
}

export function AboutMe() {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);
  const { t } = useTranslation();

  // Contact information intentionally removed from this section per request.

  const languages = [
    { language: t('about_lang_albanian'), proficiency: t('about_lang_prof_native'), level: 5 },
    { language: t('about_lang_english'), proficiency: t('about_lang_prof_advanced'), level: 5 },
    { language: t('about_lang_german'), proficiency: t('about_lang_prof_intermediate'), level: 3 }
  ];

  const stats = [
    { icon: Code, value: t('stats.coding_value'), label: t('stats.coding_label') },
    { icon: Briefcase, value: t('stats.projects_value_short'), label: t('stats.projects_label_short') },
    { icon: Users, value: t('stats.clients_value'), label: t('stats.clients_label') },
    { icon: Star, value: t('stats.satisfaction_value_short'), label: t('stats.satisfaction_label_short') }
  ];

  const values = [
    {
      icon: Target,
      title: t('about_value_precision_title'),
      description: t('about_value_precision_desc')
    },
    {
      icon: Zap,
      title: t('about_value_performance_title'),
      description: t('about_value_performance_desc')
    },
    {
      icon: Heart,
      title: t('about_value_user_title'),
      description: t('about_value_user_desc')
    },
    {
      icon: Lightbulb,
      title: t('about_value_innovation_title'),
      description: t('about_value_innovation_desc')
    }
  ];

  return (
    <section id="about" className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20 overflow-hidden">
      <FloatingParticles />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div>
              <User className="w-6 h-6 text-[#B71C1C]" />
            </div>
            <motion.div 
              className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
              {t('about_personalProfile')}
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('about_titleAbout')}</span>
            <span className="block ml-16">{t('about_titleMe')}</span>
          </h1>
          
          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('about_subtitle')}
            </span>
          </div>
          
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">{t('about_lead')}</p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative group mb-20"
        >
          <motion.div 
            className="bg-gradient-to-br from-[#232425] to-[#1a1b1c] border border-white/10 rounded-xl p-6 lg:p-8 cursor-pointer hover:border-[#B71C1C]/30 transition-all duration-300"
            onClick={() => setIsStoryExpanded(!isStoryExpanded)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-[#B71C1C]" />
                </motion.div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                  {t('about_myStory')}
                </span>
                <motion.div 
                  className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              
              <motion.div
                animate={{ rotate: isStoryExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-500 group-hover:text-[#B71C1C] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {t('about_storyIntro')}
              </motion.p>
              
              {isStoryExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {t('about_storyP1')}
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {t('about_storyP2')}
                  </motion.p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-6 h-6 text-[#B71C1C]" />
            <h3 className="text-2xl font-bold text-white">Core Values</h3>
            <motion.div 
              className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {values.map((value, index) => (
              <ValueCard key={value.title} {...value} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Centered Languages Section (inline pills) */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <Languages className="inline-block w-6 h-6 text-[#B71C1C] mb-2" />
            <h4 className="text-sm uppercase tracking-[0.2em] text-[#B71C1C] font-medium mt-2">
              {t('about_languagesHeading')}
            </h4>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((lang) => (
                <div
                  key={lang.language}
                  className="flex items-center gap-3 bg-[#232425] border border-white/6 rounded-full px-4 py-2 text-sm text-zinc-200"
                >
                  <span className="font-medium">{lang.language}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full inline-block ${i < lang.level ? 'bg-[#B71C1C]' : 'bg-white/20'}`}
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <motion.div 
              className="h-px w-24 bg-gradient-to-r from-transparent to-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 px-4">
              Let's Connect
            </span>
            <motion.div 
              className="h-px w-24 bg-gradient-to-l from-transparent to-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            />
          </div>
          
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#B71C1C] to-[#8B1515] text-white px-8 py-4 font-medium hover:from-[#8B1515] hover:to-[#B71C1C] transition-colors duration-200 rounded-lg shadow-2xl"
          >
            <span className="relative z-10">{t('about_getInTouch')}</span>
            <div className="relative z-10">
              <ArrowRight className="w-5 h-5" />
            </div>
            
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B71C1C] to-[#8B1515] rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutMe;