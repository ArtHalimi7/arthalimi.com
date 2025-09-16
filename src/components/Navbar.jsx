import { useEffect, useState } from "react";

export default function Navbar({ formatted }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(formatted || "");
  const [active, setActive] = useState('about');

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
          className={`fixed right-0 top-0 h-full w-64 bg-[#232425]/90 backdrop-blur-lg shadow-2xl p-8 flex flex-col gap-6 transition-transform duration-300 border-l border-[#B71C1C]/30 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Decorative lines */}
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
          <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />

          <div className="flex items-center justify-between">
            <div className="text-white font-semibold tracking-wider">&lt;Art.dev/&gt;</div>
            <button className="text-zinc-400 text-3xl hover:text-[#B6862C]" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">&times;</button>
          </div>

          <div className="my-4 h-px w-full bg-white/10" />

          <div className="flex flex-1 flex-col items-start justify-start gap-4">
            <a href="#about" className={`flex items-center gap-3 text-lg font-semibold transition w-full ${active === 'about' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-300 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a4 4 0 100-8 4 4 0 000 8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
              </svg>
              <span className="pl-1">About</span>
              {active === 'about' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#work" className={`flex items-center gap-3 text-lg font-semibold transition w-full ${active === 'work' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-300 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v4a1 1 0 001 1h3v4a1 1 0 001 1h8a1 1 0 001-1v-4h3a1 1 0 001-1V7M8 3h8v4H8V3z" />
              </svg>
              <span className="pl-1">Work</span>
              {active === 'work' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#education" className={`flex items-center gap-3 text-lg font-semibold transition w-full ${active === 'education' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-300 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422M12 14v7" />
              </svg>
              <span className="pl-1">Education</span>
              {active === 'education' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#projects" className={`flex items-center gap-3 text-lg font-semibold transition w-full ${active === 'projects' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-300 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M5 7v11a2 2 0 002 2h10a2 2 0 002-2V7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h6v6H9z" />
              </svg>
              <span className="pl-1">Projects</span>
              {active === 'projects' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#services" className={`flex items-center gap-3 text-lg font-semibold transition w-full ${active === 'services' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-300 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2-.672 2-1.5S13.105 8 12 8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
              </svg>
              <span className="pl-1">Services</span>
              {active === 'services' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>

            <a href="#contact" className={`flex items-center gap-3 text-lg font-semibold transition w-full ${active === 'contact' ? 'text-white' : 'text-zinc-100 hover:text-[#B6862C]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-zinc-300 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8V7a2 2 0 00-2-2h-3l-2-3H10L8 5H5a2 2 0 00-2 2v1" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" />
              </svg>
              <span className="pl-1">Contact</span>
              {active === 'contact' && <span className="ml-auto h-6 w-1 bg-[#4a0f0f] rounded-sm" />}
            </a>
          </div>
        </nav>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#18191A] border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-semibold tracking-wider text-white">&lt;Art.dev/&gt;</a>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 md:flex">
              <a href="#about" className={`relative hover:text-white ${active === 'about' ? 'text-white' : ''}`}>
                About
                {active === 'about' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#work" className={`relative hover:text-white ${active === 'work' ? 'text-white' : ''}`}>
                Work
                {active === 'work' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#education" className={`relative hover:text-white ${active === 'education' ? 'text-white' : ''}`}>
                Education
                {active === 'education' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#projects" className={`relative hover:text-white ${active === 'projects' ? 'text-white' : ''}`}>
                Projects
                {active === 'projects' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#services" className={`relative hover:text-white ${active === 'services' ? 'text-white' : ''}`}>
                Services
                {active === 'services' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>

              <a href="#contact" className={`relative hover:text-white ${active === 'contact' ? 'text-white' : ''}`}>
                Contact
                {active === 'contact' && <span className="absolute left-0 -bottom-3 h-1 w-full bg-[#4a0f0f]" />}
              </a>
            </nav>

          {/* Time on desktop, menu icon on mobile */}
          <div className="flex items-center">
            <span className="hidden md:block text-[10px] tracking-widest text-zinc-500 md:text-xs">{time}</span>
            <button className="md:hidden text-[#B6862C] text-2xl ml-2" onClick={() => setSidebarOpen(true)}>
              &#9776;
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </header>
    </>
  );
}
