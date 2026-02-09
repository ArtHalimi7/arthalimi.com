import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Calendar, Award, GraduationCap, Star, Lightbulb } from 'lucide-react';

function GridLines() {
  return <div aria-hidden className="pointer-events-none absolute inset-0" />;
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#7C3AED]/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function TimelineLine() {
  return (
    <div className="absolute left-8 top-32 bottom-0 hidden lg:block">
      <motion.div
        className="w-0.5 h-full bg-gradient-to-b from-[#7C3AED] via-[#7C3AED]/50 to-transparent"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      {/* Timeline dots */}
          {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 bg-[#7C3AED] rounded-full -left-1.5 shadow-lg ring-4 ring-black"
          style={{ top: `${20 + index * 35}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
        />
      ))}
    </div>
  );
}

function EducationCard({ t }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative lg:ml-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#232425] to-[#1a1b1c] p-8 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden"
        animate={{
          scale: isHovered ? 1.02 : 1,
          rotateY: isHovered ? 2 : 0,
          z: isHovered ? 50 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-50" />
        
        {/* Accent line */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] via-[#7C3AED]/70 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0.8,
            scaleX: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Header with icon */}
        <div className="relative z-10 flex items-center gap-4 mb-6">
          <motion.div
            className="p-4 bg-gradient-to-br from-[#7C3AED] to-[#8B1515] rounded-2xl shadow-lg"
            animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          
          <div className="flex-1">
            <motion.h3 
              className="text-2xl font-bold text-white mb-1"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t('education_degree_title')}
            </motion.h3>
            <motion.div 
              className="text-[#7C3AED] font-medium"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {t('education_university')}
            </motion.div>
          </div>
        </div>

        {/* Details */}
        <div className="relative z-10 space-y-4 mb-6">
          <motion.div
            className="flex items-center gap-3 text-zinc-300"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-2 bg-white/5 rounded-lg">
              <MapPin className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <span>{t('education_location')}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-zinc-300"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="p-2 bg-white/5 rounded-lg">
              <Calendar className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <span>{t('education_years')}</span>
          </motion.div>
        </div>

        <motion.p 
          className="relative z-10 text-zinc-300 leading-relaxed"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {t('education_intro')}
        </motion.p>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/10 to-transparent rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

function CourseworkCard({ t }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const courses = [
    t('education_course_ds'),
    t('education_course_algo'),
    t('education_course_db'),
    t('education_course_se'),
    t('education_course_web'),
    t('education_course_os'),
    t('education_course_arch'),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative lg:ml-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#232425] to-[#1a1b1c] p-8 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden"
        animate={{
          scale: isHovered ? 1.02 : 1,
          rotateX: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/3 to-transparent" />
        
        {/* Header */}
        <div className="relative z-10 flex items-center gap-4 mb-6">
          <motion.div
            className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#7C3AED]/10 rounded-xl border border-[#7C3AED]/20"
            animate={isHovered ? { rotate: -5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <BookOpen className="w-6 h-6 text-[#7C3AED]" />
          </motion.div>
          
          <motion.h4 
            className="text-lg font-bold text-white uppercase tracking-wider"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t('education_coursework_title')}
          </motion.h4>
        </div>

        {/* Courses grid */}
        <div className="relative z-10 grid grid-cols-1 gap-3">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
              whileHover={{ x: 10 }}
            >
              <motion.div
                className="w-2 h-2 bg-[#7C3AED] rounded-full flex-shrink-0"
                animate={{
                  scale: isHovered ? [1, 1.3, 1] : 1,
                  opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <span className="text-zinc-200 text-sm group-hover:text-white transition-colors">
                {course}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AchievementsCard({ t }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const achievements = [
    {
      title: t('education_ach_academic'),
      description: "Maintaining strong academic performance while pursuing practical skills.",
      icon: Star,
    },
    {
      title: t('education_ach_team'),
      description: "Actively participated in group projects, enhancing teamwork and project management skills.",
      icon: Award,
    },
    {
      title: t('education_ach_practical'),
      description: "Applied theoretical knowledge to real-world development projects.",
      icon: Lightbulb,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: 15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative lg:ml-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#232425] to-[#1a1b1c] p-8 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden"
        animate={{
          scale: isHovered ? 1.02 : 1,
          rotateY: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#7C3AED]/5 to-transparent opacity-60" />
        
        {/* Header */}
        <div className="relative z-10 flex items-center gap-4 mb-8">
          <motion.div
            className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#7C3AED]/10 rounded-xl border border-[#7C3AED]/20"
            animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Award className="w-6 h-6 text-[#7C3AED]" />
          </motion.div>
          
          <motion.h4 
            className="text-lg font-bold text-white uppercase tracking-wider"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t('education_achievements_title')}
          </motion.h4>
        </div>

        {/* Achievements */}
        <div className="relative z-10 space-y-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + (i * 0.15) }}
            >
              <div className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5">
                <motion.div
                  className="p-2 bg-[#7C3AED]/10 rounded-lg border border-[#7C3AED]/20 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <achievement.icon className="w-5 h-5 text-[#7C3AED]" />
                </motion.div>
                
                <div className="flex-1">
                  <h5 className="font-semibold text-white mb-2 group-hover:text-[#7C3AED] transition-colors">
                    {achievement.title}
                  </h5>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Education() {
  const { t } = useTranslation();
  
  return (
    <section id="education" className="relative min-h-screen bg-black text-zinc-100 py-20 overflow-hidden">
      <GridLines />
      <FloatingElements />
      <TimelineLine />

      <div className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#7C3AED]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7C3AED] font-medium">
              {t('education_heading_label')}
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">{t('education_heading_part1')}</span>
            <span className="block ml-16">{t('education_heading_part2')}</span>
          </h1>

          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#7C3AED]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {t('education_snapshot')}
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            {t('education_intro')}
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="space-y-12">
          <EducationCard t={t} />
          <CourseworkCard t={t} />
          <AchievementsCard t={t} />
        </div>
      </div>
    </section>
  );
}

export default Education;