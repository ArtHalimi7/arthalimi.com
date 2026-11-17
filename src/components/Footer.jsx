import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { m, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { EASE, LogoMark, Roll, Signature } from './ui/primitives';
import { useScrollTo, useSectionHref } from './Nav';

const PAGES = ['work', 'services', 'process', 'studio', 'contact'];
const ELSEWHERE = [
  ['Email', 'mailto:arthalimi989@gmail.com'],
  ['LinkedIn', 'https://www.linkedin.com/in/arthalimi/'],
  ['GitHub', 'https://github.com/ArtHalimi7'],
];

// Flowing lines behind the panel: work moving through a system. A few carry a lime pulse.
const FLOW = Array.from({ length: 24 }, (_, j) => {
  let d = '';
  for (let x = -40; x <= 1640; x += 20) {
    const y = (j + 0.5) * (1000 / 24) + Math.sin(x * 0.0042 + j * 0.55) * 34 + Math.sin(x * 0.011 - j * 0.9) * 10 + Math.sin(x * 0.0017 + j * 0.25) * 46;
    d += `${x === -40 ? 'M' : 'L'}${x} ${y.toFixed(1)} `;
  }
  return d;
});
function FlowLines() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
      {FLOW.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(242,242,238,0.055)" strokeWidth="1.2" />)}
      {[5, 13, 19].map((i, k) => <path key={`p${i}`} d={FLOW[i]} fill="none" stroke="#C8FF2E" strokeWidth="1.6" strokeLinecap="round" className="flow-pulse" style={{ animationDelay: `${-k * 3.1}s`, animationDuration: `${9 + k * 2}s` }} />)}
    </svg>
  );
}

/** The AH mark, drawn when the footer arrives, with a scan line passing over it. */
function Mark({ play }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 40 40" className="relative h-auto w-full overflow-visible" aria-hidden="true">
        {/* at this size the diagonals' square caps poke out past the stems' feet; trim them flush */}
        <defs><clipPath id="mark-feet"><rect x="3.9" y="-2" width="32.2" height="37.6" /></clipPath></defs>
        <m.path clipPath="url(#mark-feet)" d="M5.5 34 L20 5.5 L34.5 34 M5.5 6.5 V34 M34.5 6.5 V34" fill="none" stroke="#F2F2EE" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" initial={{ pathLength: 0, opacity: 0 }} animate={play ? { pathLength: 1, opacity: 1 } : {}} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], opacity: { duration: 0.01 } }} />
        <m.path d="M4 23.5 H36" fill="none" stroke="#C8FF2E" strokeWidth="2.6" strokeLinecap="square" initial={{ pathLength: 0, opacity: 0 }} animate={play ? { pathLength: 1, opacity: 1 } : {}} transition={{ delay: 1.4, duration: 0.8, ease: EASE, opacity: { delay: 1.4, duration: 0.01 } }} />
      </svg>
      <span aria-hidden="true" className={`mark-scan pointer-events-none absolute inset-x-[-12%] h-px bg-lime shadow-[0_0_18px_3px_rgba(200,255,46,0.45)] transition-opacity duration-700 ${play ? 'opacity-70' : 'opacity-0'}`} />
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const lenis = useLenis();
  const go = useScrollTo();
  const href = useSectionHref();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const top = () => (lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));
  const stack = t('footer.stack');
  const label = 'font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-400';
  const big = 'text-[clamp(1.35rem,2.3vw,2.5rem)] font-semibold uppercase leading-[1.06] tracking-[-0.035em] transition-colors duration-300 hover:text-lime';

  return (
    <footer className="relative z-10 mt-10 rounded-t-[36px] bg-lime px-2.5 pb-14 pt-16 text-ink sm:rounded-t-[48px] sm:px-4 sm:pt-20 lg:pb-16">
      <div ref={ref} className="relative mx-auto max-w-[1880px]">
        {/* the tab on top of the panel */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%-1px)]">
          <div className="relative flex h-11 w-[min(300px,64vw)] items-center justify-center gap-2 rounded-t-[22px] bg-ink text-paper sm:h-12">
            <span className="absolute bottom-0 right-full h-6 w-6 bg-[radial-gradient(circle_at_0_0,transparent_23.5px,#0A0A0A_24px)]" />
            <span className="absolute bottom-0 left-full h-6 w-6 bg-[radial-gradient(circle_at_100%_0,transparent_23.5px,#0A0A0A_24px)]" />
            <LogoMark className="h-5 w-5" />
            <span className="text-[13px] font-semibold tracking-[-0.02em]">Art Halimi</span>
            <span className="text-[13px] text-ink-300">Studio</span>
          </div>
        </div>

        {/* the panel */}
        <div className="relative overflow-hidden rounded-[30px] bg-ink px-5 pb-8 pt-16 text-paper sm:rounded-[40px] sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
          <FlowLines />
          <div className="relative">
            {/* the closing line, signed */}
            <div className="relative mx-auto w-fit max-w-full text-center">
              <p className="text-[clamp(2.4rem,7.2vw,8.6rem)] font-semibold uppercase leading-[0.86] tracking-[-0.05em]">{t('footer.h1')}</p>
              <p className="font-serif text-[clamp(2.7rem,8.2vw,9.8rem)] italic leading-[0.92] tracking-[-0.02em] text-lime">{t('footer.h2')}</p>
              <Signature play={seen} delay={0.6} duration={2.4} width={2.3} className="pointer-events-none absolute -left-[4%] -top-[34%] w-[44%] -rotate-[9deg] text-lime drop-shadow-[0_0_14px_rgba(200,255,46,0.3)]" />
            </div>
            <p className="mt-6 text-center text-[14px] text-ink-400">{t('footer.line')} {t('footer.where')}.</p>

            {/* pages · mark · elsewhere */}
            <div className="mt-12 grid grid-cols-2 items-center gap-y-12 lg:mt-14 lg:grid-cols-[1fr_auto_1fr]">
              <nav aria-label="Footer" className="text-center">
                <p className={label}>{t('footer.pages')}</p>
                <ul className="mt-4">
                  {PAGES.map((id) => (
                    <li key={id}><a href={href(id)} onClick={(e) => { e.preventDefault(); go(id); }} className={big}>{t(`nav.${id}`)}</a></li>
                  ))}
                </ul>
              </nav>
              <div className="order-first col-span-2 mx-auto w-[min(52vw,260px)] lg:order-none lg:col-span-1 lg:w-[clamp(220px,18vw,320px)]">
                <Mark play={seen} />
              </div>
              <div className="text-center">
                <p className={label}>{t('footer.elsewhere')}</p>
                <ul className="mt-4">
                  {ELSEWHERE.map(([name, href]) => (
                    <li key={name}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={big}>{name}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 flex justify-center lg:mt-14">
              <button type="button" onClick={() => go('contact')} className="btn btn-lime px-6 py-3.5 text-[16px]">
                <Roll>{t('nav.cta')}</Roll> <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* what it's built with */}
            <div className="relative mt-12 overflow-hidden border-t border-paper/[0.08] pt-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-10 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-300">
                {Array.isArray(stack) && [...stack, ...stack].map((s, i) => (
                  <span key={i} className="flex items-center gap-10">{s}<span className="h-1 w-1 rounded-full bg-lime" /></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* on the lime */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 text-[13px] font-medium sm:px-5">
          <span>© {new Date().getFullYear()} Art Halimi Studio. {t('footer.rights')}</span>
          <div className="flex gap-5">
            <Link to="/impressum" className="link-line">{t('footer.imprint')}</Link>
            <Link to="/datenschutz" className="link-line">{t('footer.privacy')}</Link>
            <button type="button" onClick={top} className="link-line">{t('footer.top')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
