import { useEffect, useState } from "react";

export default function HeroWithGridLines() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const formatted = time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0c0d12] text-zinc-100">
      <Lines />

      {/* HEADER */}
      <header className="relative">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-semibold tracking-wider">bjornflow</a>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 md:flex">
            <a href="#" className="hover:text-white">Work</a>
            <a href="#" className="hover:text-white">Experiments</a>
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
          </nav>

          <div className="text-[10px] tracking-widest text-zinc-500 md:text-xs">
            turn on sound • {formatted}
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
          <span className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
        </div>

        <p className="text-center text-sm tracking-widest text-zinc-400 md:text-left">
          Hi, I'm Bjorn Encuțescu
        </p>

        <h1 className="mt-2 text-center font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-left md:text-7xl">
          <span className="block">CREATIVE</span>
          <span className="block">WEBFLOW</span>
          <span className="block">DEVELOPER</span>
        </h1>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          {/* Portrait */}
          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl ring-1 ring-white/5" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10">
              <img
                className="h-full w-full object-cover opacity-95"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
                alt="Portrait"
              />
              {/* little notched corner */}
              <div className="absolute right-0 top-0 h-8 w-8 bg-[#0c0d12]" />
            </div>
          </div>

          {/* Copy & CTAs */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="text-xl">*</span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">Webflow Certified Partner</span>
            </div>

            <p className="mt-6 max-w-xl text-zinc-300">
              I create immersive, high‑performing Webflow websites tailored for startups, agencies,
              and in‑house teams that need speed, scalability, and full control.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center rounded-xl bg-yellow-300 px-5 py-3 font-medium text-black shadow-sm hover:brightness-95"
              >
                Get in touch
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-xl px-5 py-3 ring-1 ring-white/15 hover:bg-white/5"
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
      <div className="absolute left-2 right-2 top-2 bottom-2">
        <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
        <span className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
        <span className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />
      </div>
      {/* Inner gutter lines */}
      <span className="absolute top-0 bottom-0 left-10 w-px bg-white/5" />
      <span className="absolute top-0 bottom-0 right-10 w-px bg-white/5" />
    </div>
  );
}
