/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '../assets/Alogo.png';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="7" width="16" height="1.5" rx="0.75" fill="currentColor" />
    <rect x="8" y="15" width="12" height="1.5" rx="0.75" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default function Navbar({ formatted }) {
  const { i18n, t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(formatted || "");
  const [active, setActive] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const HEADER_OFFSET = 80;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    setSidebarOpen(false);
    setActive(id);
  };

  const menuItems = [
    { id: 'about', label: t('nav_about') },
    { id: 'work', label: t('nav_work') },
    { id: 'projects', label: t('nav_projects') },
    { id: 'services', label: t('nav_services') },
    { id: 'contact', label: t('nav_contact') },
  ];

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // VISIBILITY: Increased backdrop blur and darkened overlay
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 300 }}
              // VISIBILITY: Pushed backdrop blur to max and increased background depth
              className="fixed top-0 right-0 bottom-0 w-[85%] bg-[#050505] backdrop-blur-[120px] border-l border-white/10 p-10 flex flex-col justify-between shadow-[ -20px_0_50px_rgba(0,0,0,0.8)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col gap-16 pt-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/10 font-black">Menu</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-white/30 hover:text-white transition-colors p-2">
                    <CloseIcon />
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToId(item.id)}
                      className="group relative flex items-center"
                    >
                      <span className={`text-4xl font-extralight tracking-tight transition-all duration-700 ${active === item.id ? 'text-white translate-x-4' : 'text-white/20 group-hover:text-white/60'
                        }`}>
                        {item.label}
                      </span>
                      {active === item.id && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute -left-6 w-1 h-10 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-8">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-bold px-2">Select Language</p>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                  {['en', 'sq', 'de'].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => { i18n.changeLanguage(lng); setSidebarOpen(false); }}
                      className={`py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${i18n.language === lng
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'text-white/20 hover:text-white/40'
                        }`}
                    >
                      {lng}
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed top-0 inset-x-0 z-50 flex justify-center p-0 md:p-6 pointer-events-none">
        <header
          className={`
            h-20 md:h-16 flex items-center justify-between w-full pointer-events-auto transition-all duration-1000
            ${isScrolled
              ? 'bg-[#050505]/80 backdrop-blur-3xl border-b border-white/10 md:border md:rounded-full md:max-w-6xl shadow-2xl'
              : 'bg-transparent border-transparent md:bg-black/10 md:backdrop-blur-md md:border-white/5 md:rounded-full md:max-w-6xl'
            }
            px-8 md:px-12
          `}
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home'); }} className="transition-transform hover:scale-110 active:scale-95">
              <img src={logo} className="w-10 h-10 object-contain grayscale brightness-125 hover:grayscale-0 transition-all duration-700" alt="Logo" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-14">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative py-2 ${active === item.id ? 'text-white' : 'text-white/30 hover:text-white'
                  }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.div layoutId="nav-line" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-purple-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Tools (Language + Clock) */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-5 border-l border-white/10 pl-8">
              {['en', 'sq', 'de'].map((lng) => (
                <button
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all ${i18n.language === lng ? 'text-purple-400' : 'text-white/10 hover:text-white/50'
                    }`}
                >
                  {lng}
                </button>
              ))}
            </div>

            <span className="hidden md:block text-[11px] font-mono text-white/20 tracking-[0.2em] pt-0.5 border-l border-white/10 pl-8">{time}</span>

            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-3 text-white/50 hover:text-white transition-colors">
              <MenuIcon />
            </button>
          </div>
        </header>
      </motion.div>
    </>
  );
}