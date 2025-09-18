import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Alogo from '../assets/Alogo.png';

export default function Navbar({ formatted }) {
  const { i18n, t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(formatted || "");
  const [active, setActive] = useState('about');
  const [langOpenDesktop, setLangOpenDesktop] = useState(false);
  const [langOpenMobile, setLangOpenMobile] = useState(false);
  const langRefDesktop = useRef(null);
  const langRefMobile = useRef(null);

  // subtle scroll progress (0..1) with smooth lerp for display
  const scrollTargetRef = useRef(0);
  const rafRef = useRef(null);
  const [scrollDisplay, setScrollDisplay] = useState(0);

  // Header height used for anchor offset
  const HEADER_OFFSET = 72; // ~ h-16 + border; tweak to match your header

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      scrollTargetRef.current = pct;
    };

    // read scroll on events
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // animate display value toward target smoothly
    const animate = () => {
      setScrollDisplay((prev) => {
        const target = scrollTargetRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.0005) return target;
        return prev + diff * 0.12; // smoothing factor
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

  // Helper to get flag image URL for a language code
  const getFlagUrl = (lang) => {
    switch (lang) {
      case 'en':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png';
      case 'sq':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/1200px-Flag_of_Albania.svg.png';
      case 'de':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png';
      default:
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png';
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (langRefDesktop.current && !langRefDesktop.current.contains(e.target)) {
        setLangOpenDesktop(false);
      }
      if (langRefMobile.current && !langRefMobile.current.contains(e.target)) {
        setLangOpenMobile(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    // Update live time display to HH:MM (no seconds).
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

  // Smooth-scroll with header offset
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ['about', 'work', 'education', 'projects', 'services', 'contact'];
    const options = {
      root: null,
      // account for sticky header by shrinking the viewport
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

  // Motion variants
  const headerContainer = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, delayChildren: 0.06, ease: 'easeOut' } },
  };

  const brandContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const brandPart = {
    hidden: { opacity: 0, y: 6, scale: 0.98, rotate: -6 },
    show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.45, ease: 'circOut' } },
  };

  const navContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };

  const navItem = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <>
      {/* MOBILE SIDEBAR OVERLAY */}
      {/* SIDEBAR OVERLAY (redesign) */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      >
        {/* Sidebar panel */}
        <nav
    className={`fixed top-0 left-0 h-full w-64 bg-[#18191A] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
          aria-hidden={!sidebarOpen}
        >
          {/* Header: Logo and Name */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center cursor-pointer" onClick={() => { scrollToId('about'); setSidebarOpen(false); }}>
              <img src={Alogo} alt="Alogo" className="h-8 w-8" />
              <div className="ml-3">
                <span className="text-lg font-semibold text-white leading-tight">Art Halimi</span>
                <div className="text-xs text-zinc-400 leading-tight">Full Stack Developer</div>
              </div>
            </div>
            <button
              className="text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md text-xl px-2"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <span aria-hidden>×</span>
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 px-2 py-4 overflow-y-auto">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                  setSidebarOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 mb-2 relative group ${
                  active === item.id ? 'text-red-600 bg-white/10' : 'text-zinc-200 hover:text-red-600 hover:bg-white/5'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span className={`absolute bottom-2 left-4 h-0.5 bg-red-600 transition-all duration-300 ${
                  active === item.id ? 'w-[calc(100%-32px)]' : 'w-0 group-hover:w-[calc(100%-32px)]'
                }`}></span>
              </button>
            ))}

            {/* Subtle red divider */}
            <hr className="my-4 border-t border-red-700/30" />

            {/* Language selector directly under navlinks */}
            <div className="flex justify-center space-x-4 mb-2" ref={langRefMobile}>
              <button
                onClick={() => { i18n.changeLanguage('sq'); setLangOpenMobile(false); }}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  i18n.language === 'sq' ? 'bg-red-600 text-white' : 'text-zinc-200 hover:text-red-600 border border-white/10'
                }`}
              >
                SQ
              </button>
              <button
                onClick={() => { i18n.changeLanguage('en'); setLangOpenMobile(false); }}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  i18n.language === 'en' ? 'bg-red-600 text-white' : 'text-zinc-200 hover:text-red-600 border border-white/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => { i18n.changeLanguage('de'); setLangOpenMobile(false); }}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  i18n.language === 'de' ? 'bg-red-600 text-white' : 'text-zinc-200 hover:text-red-600 border border-white/10'
                }`}
              >
                DE
              </button>
            </div>
          </div>

          {/* ...removed language selector at bottom... */}
        </nav>
      </div>

      {/* HEADER */}
      <motion.header
        className="sticky top-0 z-40 bg-[#18191A] border-b border-white/10"
        initial="hidden"
        animate="show"
        variants={headerContainer}
      >
        {/* subtle scroll progress bar */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1 pointer-events-none">
          <div
            className="h-full bg-[#B71C1C]/60 origin-left transform"
            style={{ transform: `scaleX(${scrollDisplay})`, willChange: 'transform' }}
          />
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <motion.a href="#" className="inline-flex items-center gap-2"
            variants={brandContainer}
            aria-label="Home"
          >
            <motion.img src={Alogo} alt="Alogo" className="h-8 w-8 object-contain" variants={brandPart} />
            <motion.span className="text-white font-semibold" variants={brandPart}>Art Halimi</motion.span>
          </motion.a>

          <motion.nav
            className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 md:flex"
            variants={navContainer}
            aria-label="Primary navigation"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative hover:text-white ${active === item.id ? 'text-white' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                variants={navItem}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {item.label}
                {active === item.id && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </motion.a>
            ))}
          </motion.nav>

          {/* Time on desktop, menu icon on mobile */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex md:items-center md:gap-2">
              <span className="hidden md:block text-[10px] tracking-widest text-zinc-500 md:text-xs">{time}</span>
              {/* Language dropdown (desktop) */}
              <div className="relative" ref={langRefDesktop}>
                <button
                  onClick={() => setLangOpenDesktop((s) => !s)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 p-1 focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-haspopup="true"
                  aria-expanded={langOpenDesktop}
                  aria-label="Select language"
                >
                  <img src={getFlagUrl(i18n.language)} alt={i18n.language} className="h-7 w-7 object-cover rounded-full shadow-2xl transition-transform transform hover:scale-110" />
                </button>
                {langOpenDesktop && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-48 rounded-lg bg-[#202226] p-3 shadow-2xl ring-1 ring-white/10 divide-y divide-white/5 origin-top transform transition-all duration-150">
                    <div className="py-1">
                      <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-white/5 transition-transform transform hover:scale-105" onClick={() => { i18n.changeLanguage('en'); setLangOpenDesktop(false); }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" alt="EN" className="h-8 w-8 object-cover rounded-full shadow-sm" />
                        <span className="text-sm font-medium">English</span>
                      </button>
                    </div>
                    <div className="py-1">
                      <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-white/5 transition-transform transform hover:scale-105" onClick={() => { i18n.changeLanguage('sq'); setLangOpenDesktop(false); }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/1200px-Flag_of_Albania.svg.png" alt="SQ" className="h-8 w-8 object-cover rounded-full shadow-sm" />
                        <span className="text-sm font-medium">Shqip</span>
                      </button>
                    </div>
                    <div className="py-1">
                      <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-white/5 transition-transform transform hover:scale-105" onClick={() => { i18n.changeLanguage('de'); setLangOpenDesktop(false); }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="DE" className="h-8 w-8 object-cover rounded-full shadow-sm" />
                        <span className="text-sm font-medium">Deutsch</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button className="md:hidden text-[#d10000] text-2xl ml-2" onClick={() => setSidebarOpen(true)}>
              &#9776;
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </motion.header>
    </>
  );
}