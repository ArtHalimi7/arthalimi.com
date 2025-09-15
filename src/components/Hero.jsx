import { useEffect, useState } from "react";
import profilePic from '../assets/profile.png';

export default function HeroWithGridLines() {
  const [time, setTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const formatted = time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#18191A] text-zinc-100">
      <Lines />

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-50 bg-[#18191A]/80 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <nav className={`fixed right-0 top-0 h-full w-64 bg-[#232425]/90 backdrop-blur-lg shadow-2xl p-8 flex flex-col gap-6 transition-transform duration-300 border-l border-[#B71C1C]/30 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Decorative lines */}
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
          <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />

          <button className="self-end mb-8 text-zinc-400 text-3xl hover:text-[#B6862C]" onClick={() => setSidebarOpen(false)}>&times;</button>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">Work</a>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">Experiments</a>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">About</a>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">Contact</a>
        </nav>
      </div>

      {/* HEADER */}
      <header className="relative">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-semibold tracking-wider">&lt;Art.dev/&gt;</a>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 md:flex">
            <a href="#" className="hover:text-white">Work</a>
            <a href="#" className="hover:text-white">Experiments</a>
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
          </nav>

          {/* Time on desktop, menu icon on mobile */}
          <div className="flex items-center">
            <span className="hidden md:block text-[10px] tracking-widest text-zinc-500 md:text-xs">{formatted}</span>
            <button className="md:hidden text-[#B6862C] text-2xl ml-2" onClick={() => setSidebarOpen(true)}>
              &#9776;
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </header>

      {/* HERO */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
        {/* Container boundary lines */}
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />
        </div>

        <h1
          className="font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-[clamp(2.75rem,9vw,7.5rem)] text-[#e7e6e3] text-center pl-0 md:text-left md:pl-64"
          style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Cantarell, Noto Sans, sans-serif' }}
        >
                    <p className="text-lg md:text-xl font-semibold text-zinc-100 text-center tracking-widest md:text-left">
          Hi, I'm <span className="text-[#B71C1C]">Art Halimi</span>
        </p>
          <span className="block">CREATIVE</span>
          <span className="block ml-24 md:ml-40">FULL STACK</span>
          <span className="block">DEVELOPER</span>
        </h1>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          {/* Portrait */}
          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl" />
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                className="h-full w-full object-contain opacity-95"
                src={profilePic}
                alt="Portrait"
              />
            </div>
          </div>

          {/* Copy & CTAs */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="text-xl">*</span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-widest text-red-600">Modern Web Architect</span>
            </div>

            <p className="mt-[150px] max-w-xl text-zinc-300">
A dedicated Full Stack Web Developer from Kosovo, specializing in React, Node.js, and modern web technologies. <br />
 I create dynamic, responsive applications that deliver exceptional user experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center rounded-xl bg-[#B71C1C] px-5 py-3 font-medium text-white shadow-sm hover:brightness-95 hover:bg-[#8B1515]"
              >
                Get in touch
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-xl px-5 py-3 ring-1 ring-white/15 hover:bg-[#B71C1C] hover:text-white"
              >
                See work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Outer frame (like the red guide lines in the screenshot) */}
      <div className="absolute left-2 right-2 top-2 bottom-[50px]">
        <span className="absolute left-0 right-0 -bottom-12 h-px bg-white/10" />
      </div>
      {/* Inner gutter lines */}
      <span className="absolute top-0 bottom-0 left-10 w-px bg-white/10" />
      <span className="absolute top-0 bottom-0 right-10 w-px bg-white/10" />
    </div>
  );
}