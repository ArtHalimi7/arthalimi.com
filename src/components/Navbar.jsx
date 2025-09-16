import { useState } from "react";

export default function Navbar({ formatted }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

          <button className="self-end mb-8 text-zinc-400 text-3xl hover:text-[#B6862C]" onClick={() => setSidebarOpen(false)}>&times;</button>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">Work</a>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">Experiments</a>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">About</a>
          <a href="#" className="text-lg font-semibold text-zinc-100 hover:text-[#B6862C] transition">Contact</a>
        </nav>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#18191A] border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-semibold tracking-wider text-white">&lt;Art.dev/&gt;</a>

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
    </>
  );
}
