import { Mail, Github, Linkedin, Globe, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function SkeletonGrid() {
  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      {/* Vertical lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/20 to-transparent"
          style={{ left: `${12.5 * (i + 1)}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.1 }}
        />
      ))}
      
      {/* Horizontal lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
          style={{ top: `${25 * (i + 1)}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Grid intersection dots */}
      {[...Array(32)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 bg-[#8B0000]/40 rounded-full"
          style={{
            left: `${12.5 * ((i % 8) + 1)}%`,
            top: `${25 * (Math.floor(i / 8) + 1)}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: 1 + (i * 0.02),
            type: "spring",
            stiffness: 200
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#8B0000]/45 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

import Alogo from '../assets/Alogo.png';

function Logo() {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative flex items-center gap-3"
        transition={{ duration: 0.2 }}
      >
        <img src={Alogo} alt="Alogo" className="w-9 h-9 md:w-11 md:h-11 rounded-full" />
      </motion.div>
    </motion.div>
  );
}

function SocialIcon({ href, icon: Icon, label, delay = 0 }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      className="group relative p-3 bg-gradient-to-br from-black/5 to-transparent border border-black/8 rounded-xl hover:bg-gradient-to-br hover:from-[#8B0000]/10 hover:to-[#8B0000]/3 transition-all duration-300 overflow-hidden"
      aria-label={label}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/8 to-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      />

  <Icon className="w-5 h-5 text-[#B71C1C] group-hover:text-[#8B0000] transition-colors duration-300 relative z-10" />
      
      {/* Hover accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#B71C1C]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

function NavLink({ href, children, delay = 0 }) {
  return (
    <motion.a
      href={href}
      className="group relative text-white/80 hover:text-[#B71C1C] transition-colors duration-300 py-2 px-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -1 }}
    >
      <span className="relative z-10">{children}</span>
      {/* Hover underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8B0000] to-transparent"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/6 to-transparent rounded"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
    </motion.a>
  );
}


export default function Footer() {
  const { t } = useTranslation();

  return (
  <footer className="relative bg-[#232425] border-t border-black/10 overflow-hidden text-zinc-100">
      <SkeletonGrid />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Info Card */}
          <div className="bg-[#2e2f31] border border-white/10 rounded-lg p-6 flex flex-col gap-6 h-full items-center text-center">
            <Logo />
            <p className="text-zinc-300 leading-relaxed text-sm">{t('footer.description', 'Crafting digital experiences with passion and precision. Building the future, one line of code at a time.')}</p>
            <div className="flex gap-6 text-xs justify-center">
              <div>
                <div className="text-[#B71C1C] font-bold text-lg">10+</div>
                <div className="text-zinc-400">Projects</div>
              </div>
              <div>
                <div className="text-[#B71C1C] font-bold text-lg">3+</div>
                <div className="text-zinc-400">Years</div>
              </div>
              <div>
                <div className="text-[#B71C1C] font-bold text-lg">99%</div>
                <div className="text-zinc-400">Success</div>
              </div>
            </div>
          </div>

          {/* Navigation Card */}
          <div className="bg-[#2e2f31] border border-white/10 rounded-lg p-6 flex flex-col gap-6 h-full">
            <h3 className="text-[#B71C1C] font-bold text-base uppercase tracking-widest mb-2 text-center">{t('footer.navigation', 'Navigation')}</h3>
            <nav className="grid grid-cols-2 gap-3 text-xs uppercase tracking-wider font-medium justify-center text-white" style={{ justifyItems: 'center'}} aria-label={t('footer.navAria')}>
              <NavLink href="#about" delay={0.5}>{t('footer.nav.about')}</NavLink>
              <NavLink href="#work" delay={0.6}>{t('footer.nav.work')}</NavLink>
              <NavLink href="#education" delay={0.7}>{t('footer.nav.education')}</NavLink>
              <NavLink href="#projects" delay={0.8}>{t('footer.nav.projects')}</NavLink>
              <NavLink href="#services" delay={0.9}>{t('footer.nav.services')}</NavLink>
              <NavLink href="#contact" delay={1.0}>{t('footer.nav.contact')}</NavLink>
            </nav>
            <div className="flex justify-center mt-3">
              <span
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-[#B71C1C] cursor-pointer font-semibold hover:underline flex items-center gap-1 select-none transition-all duration-200"
                style={{ letterSpacing: '0.12em' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="inline-block">
                  <path d="M12 6v12" stroke="#B71C1C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 11.5l-5-5-5 5" stroke="#B71C1C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t('footer.scrollToTop', 'Scroll to top')}
              </span>
            </div>
          </div>

          {/* Contact & Social Card */}
          <div className="bg-[#2e2f31] border border-white/10 rounded-lg p-6 flex flex-col gap-6 h-full">
            <h3 className="text-[#B71C1C] font-bold text-base uppercase tracking-widest mb-2 text-center">{t('footer.connect', 'Connect')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center">
                <Mail className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm text-zinc-300">arthalimi989@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Linkedin className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm text-zinc-300">/in/arthalimi</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Github className="w-4 h-4 text-[#B71C1C]" />
                <span className="text-sm text-zinc-300">@ArtHalimi7</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <SocialIcon 
                href="mailto:arthalimi989@gmail.com"
                icon={Mail}
                label={t('footer.social.email')}
                delay={0.7}
              />
              <SocialIcon 
                href="https://github.com/ArtHalimi7"
                icon={Github}
                label={t('footer.social.github')}
                delay={0.8}
              />
              <SocialIcon 
                href="https://linkedin.com/in/arthalimi"
                icon={Linkedin}
                label={t('footer.social.linkedin')}
                delay={0.9}
              />
              <SocialIcon 
                href="https://arthalimi.netlify.app"
                icon={Globe}
                label={t('footer.social.portfolio')}
                delay={1.0}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-zinc-400 text-xs">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="w-1 h-1 bg-[#B71C1C] rounded-full inline-block" />
            <span className="font-medium">{t('footer.copyrightName')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 bg-green-600 rounded-full inline-block animate-pulse" />
            <span>{t('footer.available', 'Available for projects')}</span>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#B71C1C]/20 rounded-tl-lg" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#B71C1C]/20 rounded-br-lg" />
    </footer>
  );
}