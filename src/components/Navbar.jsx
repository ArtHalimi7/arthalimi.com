import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useHiringMode } from '../context/HiringModeContext';

export default function Navbar({ formatted }) {
  const { i18n, t } = useTranslation();
  const { setHiringMode } = useHiringMode();
  const [showBriefcaseShake, setShowBriefcaseShake] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(formatted || "");
  const [active, setActive] = useState('home');
  const [langOpenDesktop, setLangOpenDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRefDesktop = useRef(null);

  const scrollTargetRef = useRef(0);
  const rafRef = useRef(null);
  const [scrollDisplay, setScrollDisplay] = useState(0);

  const HEADER_OFFSET = 80;

  useEffect(() => {
    try {
      const seen = localStorage.getItem('hiringPanelSeen');
      setShowBriefcaseShake(!seen);
    } catch (e) {
      setShowBriefcaseShake(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      scrollTargetRef.current = pct;
      setScrolled(scrollTop > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const animate = () => {
      setScrollDisplay((prev) => {
        const target = scrollTargetRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.0005) return target;
        return prev + diff * 0.12;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (langRefDesktop.current && !langRefDesktop.current.contains(e.target)) {
        setLangOpenDesktop(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const ids = ['home', 'about', 'work', 'tech-stack', 'education', 'projects', 'services', 'contact'];
    const options = {
      root: null,
      rootMargin: `-${HEADER_OFFSET}px 0px -40% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id || '');
        }
      });
    }, options);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [HEADER_OFFSET]);

  const menuItems = [
    { id: 'about', label: t('nav_about') },
    { id: 'work', label: t('nav_work') },
    { id: 'education', label: t('nav_education') },
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
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col gap-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white">Art Halimi</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Developer</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToId(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`text-lg font-medium text-left transition-colors ${active === item.id ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="flex gap-4">
                  {['en', 'sq', 'de'].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => { i18n.changeLanguage(lng); setSidebarOpen(false); }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border ${i18n.language === lng ? 'bg-white text-black border-white' : 'text-zinc-400 border-white/10 hover:border-white/20'}`}
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 py-4 ${
          scrolled 
            ? 'mt-4 mx-auto max-w-5xl rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-8">
          <motion.a 
            href="#home" 
            className="flex items-center gap-2 group"
            onClick={(e) => { e.preventDefault(); scrollToId('home'); }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white leading-none">Art Halimi</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mt-1">Full Stack</span>
            </div>
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`text-[11px] font-semibold uppercase tracking-widest transition-all relative py-1 ${
                  active === item.id ? 'text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white/60"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <span className="text-[11px] font-mono text-zinc-400 tracking-wider bg-white/5 px-2 py-1 rounded border border-white/5">
                {time}
              </span>
              
              <div className="relative" ref={langRefDesktop}>
                <button
                  onClick={() => setLangOpenDesktop(!langOpenDesktop)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <Globe className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-bold text-white uppercase">{i18n.language}</span>
                  <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${langOpenDesktop ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {langOpenDesktop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-32 bg-[#0a0a0a] border border-white/10 rounded-xl p-1 shadow-2xl backdrop-blur-xl overflow-hidden"
                    >
                      {[
                        { code: 'en', label: 'English', emoji: '🇺🇸' },
                        { code: 'sq', label: 'Shqip', emoji: '🇦🇱' },
                        { code: 'de', label: 'Deutsch', emoji: '🇩🇪' }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { i18n.changeLanguage(lang.code); setLangOpenDesktop(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                            i18n.language === lang.code ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {lang.label}
                          <span>{lang.emoji}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => {
                  setHiringMode(true);
                  try { localStorage.setItem('hiringPanelSeen', '1'); } catch (e) {}
                  setShowBriefcaseShake(false);
                }}
                className={`group p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all ${showBriefcaseShake ? 'animate-bounce' : ''}`}
              >
                <Briefcase className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="absolute left-0 right-0 -bottom-px h-px bg-white/5 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
            style={{ width: `${scrollDisplay * 100}%` }}
          />
        </div>
      </header>
    </>
  );
}
