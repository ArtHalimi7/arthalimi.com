import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Calendar, Award } from 'lucide-react';

function GridLines() {
  return <div aria-hidden className="pointer-events-none absolute inset-0" />;
}

export function Education() {
  return (
    <section className="relative min-h-screen bg-[#18191A] text-zinc-100 py-20">
      <GridLines />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#B71C1C]" />
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B71C1C] font-medium">
              Education & Learning
            </span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-white mb-8">
            <span className="block">EDUCATION </span>
            <span className="block ml-16">& LEARNING</span>
          </h1>

          <div className="flex items-center gap-3 max-w-3xl">
            <span className="text-xl text-[#B71C1C]">*</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Continuous learning & practical experience
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-zinc-300 leading-relaxed">
            Pursuing a comprehensive education in computer science fundamentals, software engineering principles, and modern development practices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#232425] p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#B71C1C]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Bachelor of Science in Computer Science & Engineering</h3>
            <div className="text-zinc-400 text-sm mb-4">University of Business and Technology</div>

            <div className="flex items-center gap-3 text-zinc-400 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Prishtina, Kosovo</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>October 2021 - Present • Currently Enrolled</span>
            </div>

            <p className="mt-4 text-zinc-300 text-sm">
              Pursuing a comprehensive education in computer science fundamentals, software engineering principles, and modern development practices. The program combines theoretical knowledge with practical application, preparing me for the evolving tech industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-[#232425] p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-[#B71C1C]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-3">Relevant Coursework</h4>
            <ul className="list-disc pl-5 text-zinc-200 text-sm space-y-1">
              <li>Data Structures</li>
              <li>Algorithms</li>
              <li>Database Systems</li>
              <li>Software Engineering</li>
              <li>Web Development</li>
              <li>Operating Systems</li>
              <li>Computer Architecture</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#232425] p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-[#B71C1C]" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-3">Key Achievements</h4>
            <ul className="list-disc pl-5 text-zinc-200 text-sm space-y-2">
              <li>
                <strong className="text-white">Academic Excellence:</strong> Maintaining strong academic performance while pursuing practical skills.
              </li>
              <li>
                <strong className="text-white">Team Projects:</strong> Actively participated in group projects, enhancing teamwork and project management skills.
              </li>
              <li>
                <strong className="text-white">Practical Application:</strong> Applied theoretical knowledge to real-world development projects.
              </li>
            </ul>

            <div className="mt-6 p-4 bg-[#2a2b2c] border border-white/5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Learning Philosophy</div>
              <p className="text-zinc-300 text-sm">"Education is not just about acquiring knowledge—it's about developing the ability to think critically, solve complex problems, and adapt to new technologies. I believe in combining academic rigor with hands-on experience to create meaningful solutions."</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Footer */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
          </div>

          <div className="w-full max-w-3xl mx-auto px-8">
            <div className="relative">
              {/* gradient line (grayscale) */}
              <div aria-hidden className="h-0.5 rounded-full bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400" />

              {/* Dots and labels container */}
              <div className="absolute inset-0 flex items-center justify-between">
                {/* Dot 1 */}
                <motion.div
                  className="flex flex-col items-center text-center w-1/3"
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <span className="block w-3 h-3 rounded-full bg-zinc-400 ring-2 ring-black/40" aria-hidden />
                  <div className="mt-3 text-white text-2xl font-bold">2021</div>
                  <div className="text-sm text-zinc-300">Started</div>
                </motion.div>

                {/* Dot 2 */}
                <motion.div
                  className="flex flex-col items-center text-center w-1/3"
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <span className="block w-3 h-3 rounded-full bg-zinc-500 ring-2 ring-black/40" aria-hidden />
                  {/* subtle red accent under current */}
                  <span className="block mt-2 w-8 h-1 rounded-full bg-[#b71c1c] opacity-85" aria-hidden />
                  <div className="mt-3 text-white text-2xl font-bold">2025</div>
                  <div className="text-sm text-zinc-300">Current</div>
                </motion.div>

                {/* Dot 3 */}
                <motion.div
                  className="flex flex-col items-center text-center w-1/3"
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                >
                  <span className="block w-3 h-3 rounded-full bg-zinc-300 ring-2 ring-black/40" aria-hidden />
                  <div className="mt-3 text-white text-2xl font-bold">2026</div>
                  <div className="text-sm text-zinc-300">Graduation</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
