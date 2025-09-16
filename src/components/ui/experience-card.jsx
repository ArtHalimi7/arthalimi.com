import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building, ChevronDown, Code, Award, Users, ArrowRight } from 'lucide-react';

/**
 * @typedef {Object} ExperienceCardProps
 * @property {string} role
 * @property {string} company
 * @property {string} employmentType
 * @property {string} location
 * @property {string} years
 * @property {string} summary
 * @property {string[]} skills
 * @property {string[]} achievements
 * @property {number} projects
 * @property {number} index
 */

export function ExperienceCard({
  role,
  company,
  employmentType,
  location,
  years,
  summary,
  skills,
  achievements,
  projects,
  index
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Grid structure */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
        <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
      </div>

      <div 
        className="relative bg-[#232425] p-8 sm:p-8 cursor-pointer hover:bg-[#2a2b2c] transition-colors duration-200 rounded-xl overflow-hidden w-full max-w-full min-w-0"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{wordBreak: 'break-word'}}
      >
        {/* Header section */}
  <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-6 gap-4 sm:gap-0 w-full">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {years}
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight break-words">
              {role}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 text-zinc-400 mb-4 w-full">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#B71C1C]" />
                <span className="font-medium">{company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm">{employmentType} • {location}</span>
              </div>
            </div>

            {/* Quick metrics */}
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-6 text-sm w-full">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-zinc-300">{skills.length} Technologies</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-zinc-300">{achievements.length} Achievements</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-zinc-300">{projects} Projects</span>
              </div>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-zinc-500 group-hover:text-[#B71C1C] transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Summary */}
  <p className="text-zinc-300 leading-relaxed mb-6 max-w-full break-words">
          {summary}
        </p>

        {/* Expandable section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/10 pt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-full">
                {/* Skills */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                      Technologies
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className="flex items-center gap-2 p-2 bg-[#18191A] border border-white/10 w-full min-w-0"
                      >
                        <div className="w-1 h-1 bg-[#B71C1C]" />
                        <span className="text-zinc-300 text-sm font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
                      Key Results
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="space-y-3 w-full">
                    {achievements.map((achievement, achievementIndex) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: achievementIndex * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-[#18191A] border border-white/10 w-full min-w-0"
                      >
                        <ArrowRight className="w-4 h-4 text-[#B71C1C] mt-0.5 flex-shrink-0" />
                        <p className="text-zinc-300 text-sm leading-relaxed">
                          {achievement}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B71C1C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </motion.div>
  );
}