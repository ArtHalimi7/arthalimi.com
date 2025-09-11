// AboutMe.jsx
import { useEffect, useRef, useState } from "react";

const ACCENT = "#B6862C";

/* ---------- tiny reveal helper (no deps) ---------- */
function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, show };
}
function Reveal({ children, delay = 0 }) {
  const { ref, show } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}

/* ---------- Icons (inline SVG so no packages) ---------- */
const ico = {
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" {...p}>
      <path d="M12 3l2.6 5.3 5.9.9-4.2 4.2 1 5.8L12 16.8 6.7 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="currentColor" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" {...p}>
      <path d="M12 21s7-4.6 7-10a7 7 0 10-14 0c0 5.4 7 10 7 10z" stroke="currentColor" />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" {...p}>
      <path d="M5 4h4l2 5-3 2a15 15 0 006 6l2-3 5 2v4a2 2 0 01-2 2C9.2 22 2 14.8 2 5a2 2 0 012-1z" stroke="currentColor" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" {...p}>
      <path d="M3 7l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M3 12h18M12 3c3.5 3.8 3.5 14.2 0 18M12 3c-3.5 3.8-3.5 14.2 0 18" stroke="currentColor" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" {...p}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Bulb: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <path d="M8 15a6 6 0 118 0l-1 2H9l-1-2zm1 5h6" stroke="currentColor" />
    </svg>
  ),
  Brain: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <path d="M8 7a3 3 0 10-2 5 3 3 0 104 3m6-8a3 3 0 112 5 3 3 0 11-4 3" stroke="currentColor" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M12 7v5l3 2" stroke="currentColor" />
    </svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <path d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 13a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" />
      <path d="M2 19a6 6 0 0112 0M10 19a6 6 0 0112 0" stroke="currentColor" />
    </svg>
  ),
  Target: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  Puzzle: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <path d="M9 3h3a2 2 0 010 4H9v3H6a2 2 0 100 4h3v3h3a2 2 0 110 4H9a2 2 0 01-2-2v-3H4a2 2 0 110-4h3V5a2 2 0 012-2z" stroke="currentColor" />
    </svg>
  ),
  Zap: (p) => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" {...p}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" />
    </svg>
  ),
};

export function About() {
  return (
    <section
      id="about"
      className="relative -mt-[50px] bg-[#18191A] pt-[50px] text-zinc-100"
    >
      <AboutLines />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Container boundary lines (match hero container) */}
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />
          <span className="absolute top-0 left-0 right-0 h-px bg-white/10" />
        </div>

        {/* Title + kicker */}
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2
              className="font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2rem,6vw,4.5rem)] text-[#e7e6e3]"
              style={{
                fontFamily:
                  "Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Cantarell, Noto Sans, sans-serif",
              }}
            >
              About Me
            </h2>
            <div className="flex items-center gap-3 text-zinc-400">
              <ico.Star style={{ color: ACCENT }} />
              <span className="text-[10px] uppercase tracking-[0.25em]">
                Get to know the person behind the code
              </span>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Story card */}
          <Reveal>
            <article
              className="relative rounded-2xl border border-white/10 p-6 md:p-8
              transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/20"
              style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)" }}
            >
              {/* top accent line */}
              <span
                className="pointer-events-none absolute left-0 right-0 top-0 block h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(182,134,44,0.65), transparent)",
                }}
              />
              <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed">
                <p>
                  I&apos;m a dedicated Web Developer with experience in managing
                  IT operations and developing dynamic web applications. My
                  journey started with a passion for technology and has evolved
                  into expertise in full-stack development.
                </p>
                <p>
                  Proficient in <strong>ReactJS</strong>, <strong>NodeJS</strong>, and{" "}
                  <strong>TailwindCSS</strong>, I have a strong background in both
                  frontend and backend development. I&apos;m known for creating
                  customized technology solutions and improving user experiences
                  through innovative approaches.
                </p>
                <p>
                  Currently seeking to leverage my skills and knowledge in a
                  challenging role where I can continue growing and contributing
                  to meaningful projects that make a difference.
                </p>
              </div>

              {/* quick highlights */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { icon: ico.Bulb, label: "Ideas to impact" },
                  { icon: ico.Brain, label: "Problem solver" },
                  { icon: ico.Clock, label: "On-time delivery" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300"
                  >
                    <Icon style={{ color: ACCENT }} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Right rail */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {/* Contact */}
            <Reveal delay={75}>
              <section
                className="group rounded-2xl border border-white/10 p-6 transition-all duration-300
                hover:translate-y-[-2px] hover:ring-1"
                style={{ hoverRingColor: ACCENT }}
              >
                <h3 className="mb-5 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
                  <ico.Star style={{ color: ACCENT }} />
                  Contact Information
                </h3>
                <dl className="grid grid-cols-1 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <ico.Pin className="text-zinc-400 h-4 w-4" />
                    <div>
                      <dt className="text-zinc-500">Location</dt>
                      <dd>Prishtina, Kosovo</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ico.Phone className="text-zinc-400 h-4 w-4" />
                    <div>
                      <dt className="text-zinc-500">Phone</dt>
                      <dd>
                        <a className="hover:text-white" href="tel:">
                          
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ico.Mail className="text-zinc-400 h-4 w-4" />
                    <div>
                      <dt className="text-zinc-500">Email</dt>
                      <dd>
                        <a
                          className="hover:text-white"
                          href="mailto:arthalimi989@gmail.com"
                        >
                          arthalimi989@gmail.com
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ico.Globe className="text-zinc-400 h-4 w-4" />
                    <div>
                      <dt className="text-zinc-500">Website</dt>
                      <dd>
                        <a
                          className="hover:text-white"
                          href="https://arthalimi.netlify.app"
                          target="_blank"
                          rel="noreferrer"
                        >
                          arthalimi.netlify.app
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </section>
            </Reveal>

            {/* Languages */}
            <Reveal delay={150}>
              <section className="rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:translate-y-[-2px]">
                <h3 className="mb-5 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
                  <ico.Star style={{ color: ACCENT }} />
                  Languages
                </h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { name: "Albanian", level: "Native proficiency", pct: 100 },
                    { name: "English", level: "Advanced proficiency", pct: 85 },
                    { name: "German", level: "Intermediate proficiency", pct: 60 },
                  ].map((l) => (
                    <li key={l.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span>{l.name}</span>
                        <span className="text-zinc-500">{l.level}</span>
                      </div>
                      <div className="h-1.5 w-full rounded bg-white/10">
                        <div
                          className="h-1.5 rounded"
                          style={{ width: `${l.pct}%`, backgroundColor: ACCENT }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Soft Skills */}
            <Reveal delay={225}>
              <section className="rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:translate-y-[-2px]">
                <h3 className="mb-5 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
                  <ico.Star style={{ color: ACCENT }} />
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { t: "Critical thinking", I: ico.Brain },
                    { t: "Attention to detail", I: ico.Target },
                    { t: "Creativity", I: ico.Bulb },
                    { t: "Time management", I: ico.Clock },
                    { t: "Adaptability", I: ico.Puzzle },
                    { t: "Strong communication", I: ico.Users },
                    { t: "Problem-solving", I: ico.Target },
                    { t: "Quick learner", I: ico.Zap },
                  ].map(({ t, I }) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-[color:var(--accent)]"
                      style={{ ["--accent"]: ACCENT }}
                    >
                      <I style={{ color: ACCENT }} />
                      {t}
                      <ico.Check className="text-zinc-500" />
                    </span>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Continues the hero's guide lines exactly */
function AboutLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Outer frame continuation (connects to hero) */}
      <div className="absolute left-2 right-2 top-0 bottom-[50px]">
        <span className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        {/* Add a bottom frame if you want to lead into the next section: */}
        {/* <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" /> */}
      </div>
      {/* Inner gutter rails (match hero) */}
      <span className="absolute top-0 bottom-0 left-10 w-px bg-white/10" />
      <span className="absolute top-0 bottom-0 right-10 w-px bg-white/10" />
    </div>
  );
}

export default About;