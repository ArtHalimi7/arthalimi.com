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
  return (
    <>
      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 bg-[#18191A]/80 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <nav
          className={`fixed right-0 top-0 h-full w-64 bg-[#232425] backdrop-blur-lg shadow-2xl p-8 flex flex-col gap-6 transition-transform duration-300 border-l border-[#B71C1C]/30 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Decorative lines */}
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
          <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />

          <div className="flex items-center justify-between">
            <div className="text-white font-semibold tracking-wider">&lt;Art.dev/&gt;</div>
            <button className="text-zinc-400 text-3xl hover:text-[#b9310f]" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">&times;</button>
          </div>

          <div className="my-4 h-px w-full bg-white/10" />

          <div className="flex flex-1 flex-col items-start justify-start gap-4">
            <a href="#about" className={`text-lg font-semibold transition w-full ${active === 'about' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <span className="pl-1">{t('nav_about')}</span>
              {active === 'about' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#work" className={`text-lg font-semibold transition w-full ${active === 'work' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <span className="pl-1">{t('nav_work')}</span>
              {active === 'work' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#education" className={`text-lg font-semibold transition w-full ${active === 'education' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <span className="pl-1">{t('nav_education')}</span>
              {active === 'education' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#projects" className={`text-lg font-semibold transition w-full ${active === 'projects' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <span className="pl-1">{t('nav_projects')}</span>
              {active === 'projects' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#services" className={`text-lg font-semibold transition w-full ${active === 'services' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <span className="pl-1">{t('nav_services')}</span>
              {active === 'services' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#contact" className={`text-lg font-semibold transition w-full ${active === 'contact' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <span className="pl-1">{t('nav_contact')}</span>
              {active === 'contact' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>


            {/* Language dropdown in mobile sidebar */}
            <div className="mt-4 relative flex justify-center" ref={langRefMobile}>
              <button
                onClick={() => setLangOpenMobile((s) => !s)}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 p-1 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-haspopup="true"
                aria-expanded={langOpenMobile}
                aria-label="Select language"
              >
                <img src={getFlagUrl(i18n.language)} alt={i18n.language} className="h-10 w-10 object-cover rounded-full shadow-2xl transition-transform transform hover:scale-110" />
              </button>

              {langOpenMobile && (
                <div className="mt-2 w-44 rounded-md bg-[#232425] p-2 shadow-2xl border border-white/10">
                  <button className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-white/5 transition-transform transform hover:scale-105" onClick={() => { i18n.changeLanguage('en'); setLangOpenMobile(false); }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" alt="EN" className="h-8 w-8 object-cover rounded-full shadow-sm" />
                    <span className="text-sm">English</span>
                  </button>
                  <button className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-white/5 transition-transform transform hover:scale-105" onClick={() => { i18n.changeLanguage('sq'); setLangOpenMobile(false); }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/1200px-Flag_of_Albania.svg.png" alt="SQ" className="h-8 w-8 object-cover rounded-full shadow-sm" />
                    <span className="text-sm">Shqip</span>
                  </button>
                  <button className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-white/5 transition-transform transform hover:scale-105" onClick={() => { i18n.changeLanguage('de'); setLangOpenMobile(false); }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="DE" className="h-8 w-8 object-cover rounded-full shadow-sm" />
                    <span className="text-sm">Deutsch</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#18191A] border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-semibold tracking-wider text-white">&lt;Art.dev/&gt;</a>

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
