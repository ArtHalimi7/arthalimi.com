/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Mail, Github, Linkedin, Globe, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Alogo from '../assets/Alogo.png';

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 bg-white/[0.03] border border-white/[0.07] rounded-lg hover:border-purple-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-zinc-500 hover:text-white"
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020202] pt-16 pb-8 overflow-hidden border-t border-white/[0.06]">
      {/* Flat accent line */}
      <div className="w-48 mx-auto absolute top-0 left-1/2 -translate-x-1/2 h-px bg-white/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-12 mb-16 text-center lg:text-left">

          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <img src={Alogo} alt="Logo" className="w-10 h-10 grayscale opacity-80" />
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">Art Halimi</h3>
                <p className="text-[8px] font-mono text-purple-500/80 uppercase tracking-[0.4em]">Fullstack_Dev</p>
              </div>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {t('footer.description', 'Building high-performance digital solutions with refined architectural integrity.')}
            </p>
          </div>

          {/* Minimal Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {['about', 'work', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
              >
                {t(`footer.nav.${item}`, item)}
              </a>
            ))}
          </nav>

          {/* Socials & Location */}
          <div className="flex flex-col items-center lg:items-end gap-5">
            <div className="flex gap-3">
              <SocialIcon href="https://github.com/ArtHalimi7" icon={Github} label="GitHub" />
              <SocialIcon href="https://linkedin.com/in/arthalimi" icon={Linkedin} label="LinkedIn" />
              <SocialIcon href="mailto:arthalimi989@gmail.com" icon={Mail} label="Email" />
              <SocialIcon href="https://arthalimi.com" icon={Globe} label="Live" />
            </div>
            <p className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase italic">
              Gelsenkirchen, Germany // 2026
            </p>
          </div>
        </div>

        {/* --- Lower Utility Bar --- */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center">
            <span className="text-[9px] text-zinc-700 font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} AH_SYSTEMS
            </span>
            <div className="hidden md:block w-1 h-1 bg-zinc-800 rounded-full" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
              <div className="w-1 h-1 bg-emerald-500/60 rounded-full animate-pulse" />
              <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500">
                {t('footer.available', 'Ready for new projects')}
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-purple-400 transition-colors"
          >
            Root <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}