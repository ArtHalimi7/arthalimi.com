import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Star, Target } from 'lucide-react';

/**
 * @typedef {Object} InteractiveStatsProps
 * @property {number} totalYears
 * @property {number} totalProjects
 * @property {number} satisfaction
 * @property {number} currentStreak
 */

export function InteractiveStats({ totalYears, totalProjects, satisfaction, currentStreak }) {
  const [animatedValues, setAnimatedValues] = useState({
    years: 0,
    projects: 0,
    satisfaction: 0,
    streak: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        years: totalYears,
        projects: totalProjects,
        satisfaction: satisfaction,
        streak: currentStreak
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [totalYears, totalProjects, satisfaction, currentStreak]);

  const stats = [
    {
      icon: Clock,
      value: animatedValues.years,
      suffix: '+',
      label: 'Years Experience',
      delay: 0
    },
    {
      icon: Target,
      value: animatedValues.projects,
      suffix: '+',
      label: 'Projects Completed',
      delay: 0.1
    },
    {
      icon: Star,
      value: animatedValues.satisfaction,
      suffix: '%',
      label: 'Client Satisfaction',
      delay: 0.2
    },
    {
      icon: TrendingUp,
      value: animatedValues.streak,
      suffix: ' days',
      label: 'Current Streak',
      delay: 0.3
    }
  ];

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: stat.delay }}
            className="relative group"
          >
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
              <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
              <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
              <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
            </div>
            
            <div className="relative bg-[#232425] p-6 flex flex-col items-center justify-center text-center hover:bg-[#2a2b2c] transition-colors duration-200 min-h-[140px] w-full max-w-full overflow-hidden">
              {/* Icon */}
              <div className="flex justify-center items-center mb-4">
                <div className="w-10 h-10 bg-[#18191A] border border-white/10 flex items-center justify-center rounded-lg">
                  <Icon className="w-5 h-5 text-[#B71C1C]" />
                </div>
              </div>

              {/* Value */}
              <div className="mb-2 flex items-end justify-center gap-1 flex-wrap w-full max-w-full overflow-hidden">
                <span className="text-2xl font-semibold text-white tracking-tight break-words max-w-full w-full">
                  {stat.value}
                </span>
                <span className="text-[#B71C1C] font-medium text-lg break-words max-w-full w-full">{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="flex items-center gap-2 w-full min-w-0">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium text-center break-words max-w-full w-full">
                  {stat.label}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B71C1C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}