import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';

export default function Navbar({ formatted }) {
  const { i18n, t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(formatted || "");
  const [active, setActive] = useState('about');
  const [langOpenDesktop, setLangOpenDesktop] = useState(false);
  const [langOpenMobile, setLangOpenMobile] = useState(false);
  const langRefDesktop = useRef(null);
  const langRefMobile = useRef(null);

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

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ['about', 'work', 'education', 'projects', 'services', 'contact'];
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
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
  }, []);
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
      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 bg-[#18191A]/80 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <nav
          className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#1f1f1f]/80 to-[#161616] backdrop-blur-md shadow-2xl p-4 flex flex-col gap-4 overflow-y-hidden pb-6 transition-transform duration-400 border-r border-[#B71C1C]/20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
          aria-hidden={!sidebarOpen}
        >
          {/* Decorative lines */}
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
          <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />

          <div className="flex items-center justify-between sticky top-0 z-20 py-2 bg-transparent sidebar-sticky">
            <div className="flex items-center gap-2">
              <img src="/src/assets/Alogo.png" alt="Profile" className="h-12 w-12 rounded-full object-cover shadow-inner" />
              <div>
                <div className="text-white font-semibold">Art Halimi</div>
                <div className="text-sm text-zinc-400">Full Stack Dev</div>
              </div>
            </div>
            <button
              className="close-btn text-zinc-300 text-2xl p-1 rounded-md hover:bg-white/5 transition-transform duration-200"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <span aria-hidden>×</span>
            </button>
          </div>

          <div className="my-2 h-px w-full bg-white/6" />

          <div className="relative flex-1 w-full">
            {/* Centered language selector (vertically centered) */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center z-10">
              <div className="lang-bar inline-flex items-center gap-3 bg-white/3 rounded-full p-1 shadow-sm" ref={langRefMobile} role="tablist" aria-label="Language selector">
                <button
                  className={`lang-pill inline-flex items-center gap-2 px-3 py-1 rounded-full ${i18n.language === 'en' ? 'bg-white/10 scale-105' : 'bg-transparent'}`}
                  onClick={() => { i18n.changeLanguage('en'); setLangOpenMobile(false); }}
                  role="tab"
                  aria-selected={i18n.language === 'en'}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" alt="EN" className="h-5 w-5 rounded-full" />
                  <span className="text-xs font-semibold">EN</span>
                </button>
                <button
                  className={`lang-pill inline-flex items-center gap-2 px-3 py-1 rounded-full ${i18n.language === 'sq' ? 'bg-white/10 scale-105' : 'bg-transparent'}`}
                  onClick={() => { i18n.changeLanguage('sq'); setLangOpenMobile(false); }}
                  role="tab"
                  aria-selected={i18n.language === 'sq'}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/1200px-Flag_of_Albania.svg.png" alt="SQ" className="h-5 w-5 rounded-full" />
                  <span className="text-xs font-semibold">SQ</span>
                </button>
                <button
                  className={`lang-pill inline-flex items-center gap-2 px-3 py-1 rounded-full ${i18n.language === 'de' ? 'bg-white/10 scale-105' : 'bg-transparent'}`}
                  onClick={() => { i18n.changeLanguage('de'); setLangOpenMobile(false); }}
                  role="tab"
                  aria-selected={i18n.language === 'de'}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="DE" className="h-5 w-5 rounded-full" />
                  <span className="text-xs font-semibold">DE</span>
                </button>
              </div>
            </div>

            {/* Menu (scrollable) */}
            <div className="flex flex-col gap-2 pt-2 pb-6 overflow-y-auto max-h-[calc(100vh-140px)] z-0">
              {menuItems.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`w-full text-lg font-semibold flex items-center justify-between transition-colors duration-200 nav-sidebar-item ${active === item.id ? 'text-white' : 'text-zinc-200 hover:text-[#B6862C]'}`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="pl-1">{item.label}</span>
                  {active === item.id && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#18191A] border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="inline-flex items-center gap-2">
            <img src="/src/assets/Alogo.png" alt="Alogo" className="h-8 w-8 object-contain" />
            <span className="text-white font-semibold">Art Halimi</span>
          </a>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 md:flex">
              <a href="#about" className={`relative hover:text-white ${active === 'about' ? 'text-white' : ''}`}>
                {t('nav_about')}
                {active === 'about' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#work" className={`relative hover:text-white ${active === 'work' ? 'text-white' : ''}`}>
                {t('nav_work')}
                {active === 'work' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#education" className={`relative hover:text-white ${active === 'education' ? 'text-white' : ''}`}>
                {t('nav_education')}
                {active === 'education' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#projects" className={`relative hover:text-white ${active === 'projects' ? 'text-white' : ''}`}>
                {t('nav_projects')}
                {active === 'projects' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#services" className={`relative hover:text-white ${active === 'services' ? 'text-white' : ''}`}>
                {t('nav_services')}
                {active === 'services' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#contact" className={`relative hover:text-white ${active === 'contact' ? 'text-white' : ''}`}>
                {t('nav_contact')}
                {active === 'contact' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>
            </nav>

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
      </header>
    </>
  );
}
