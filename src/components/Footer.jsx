import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { m, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { EASE, LogoMark, Roll } from './ui/primitives';
import { CutShape } from './ui/cut';
import { useCut } from '../lib/cut';
import { useScrollTo, useSectionHref } from './Nav';
import { isHomePath } from '../lib/seo';

// On the home page the footer's lime fade starts this far up, behind the contact section, so it runs unbroken to the end.
const LEAD = '70vh';

const PAGES = ['work', 'services', 'process', 'studio', 'contact'];
const ELSEWHERE = [
  ['Email', 'mailto:hello@arthalimi.com'],
  ['LinkedIn', 'https://www.linkedin.com/in/arthalimi/'],
  ['GitHub', 'https://github.com/ArtHalimi7'],
];

/** The AH mark, drawn when the footer arrives. */
function Mark({ play }) {
  return (
    <svg viewBox="0 0 40 40" className="h-auto w-full overflow-visible" aria-hidden="true">
      {/* at this size the diagonals' square caps poke out past the stems' feet; trim them flush */}
      <defs><clipPath id="mark-feet"><rect x="3.9" y="-2" width="32.2" height="37.6" /></clipPath></defs>
      <m.path clipPath="url(#mark-feet)" d="M5.5 34 L20 5.5 L34.5 34 M5.5 6.5 V34 M34.5 6.5 V34" fill="none" stroke="#0A0A0A" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" initial={{ pathLength: 0, opacity: 0 }} animate={play ? { pathLength: 1, opacity: 1 } : {}} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], opacity: { duration: 0.01 } }} />
      <m.path d="M4 23.5 H36" fill="none" stroke="#C8FF2E" strokeWidth="2.6" strokeLinecap="square" initial={{ pathLength: 0, opacity: 0 }} animate={play ? { pathLength: 1, opacity: 1 } : {}} transition={{ delay: 1.4, duration: 0.8, ease: EASE, opacity: { delay: 1.4, duration: 0.01 } }} />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const lenis = useLenis();
  const go = useScrollTo();
  const href = useSectionHref();
  const home = isHomePath(useLocation().pathname);
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const cut = useCut();
  const top = () => (lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));
  const label = 'font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-400';
  const big = 'text-[clamp(1.15rem,1.7vw,1.85rem)] font-semibold uppercase leading-[1.06] tracking-[-0.035em] transition-colors duration-300 hover:text-ink-400';

  return (
    // On the home page the footer reaches up behind the contact section (z-[5]: under its content, over the particle
    // canvas) and its fade starts there, transparent, so contact → footer is one unbroken gradient.
    <footer style={home ? { marginTop: `-${LEAD}` } : undefined} className={`footer-fade relative z-[5] px-2.5 pb-4 pt-14 text-ink sm:px-4 sm:pb-5 sm:pt-16 ${home ? '' : 'mt-10'}`}>
      {home && <div aria-hidden="true" style={{ height: LEAD }} />}
      {/* data-shape: on the home page the particle cloud (Scene.jsx) fades out as the footer comes in */}
      <div ref={ref} data-shape="0" data-scale="1.25" data-mscale="0.9" data-alpha="0" className="relative mx-auto max-w-[1880px]">
        {/* the tab on top of the panel */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%-1px)]">
          <div className="relative flex h-10 w-[min(250px,60vw)] items-center justify-center gap-2 rounded-t-[18px] bg-white text-ink sm:h-11">
            <span className="absolute bottom-0 right-full h-5 w-5 bg-[radial-gradient(circle_at_0_0,transparent_19.5px,#FFFFFF_20px)]" />
            <span className="absolute bottom-0 left-full h-5 w-5 bg-[radial-gradient(circle_at_100%_0,transparent_19.5px,#FFFFFF_20px)]" />
            <LogoMark className="h-[18px] w-[18px]" />
            <span className="text-[13px] font-semibold tracking-[-0.02em]">Art Halimi</span>
            <span className="text-[13px] text-ink-400">Studio</span>
          </div>
        </div>

        {/* the panel, with a pocket cut into its bottom edge for the button (ui/cut.jsx) */}
        <div ref={cut.box} className={`relative px-5 pb-[92px] pt-12 text-ink [&_:focus-visible]:outline-ink sm:px-10 sm:pt-14 lg:px-14 lg:pt-16 ${cut.dims ? '' : 'rounded-[30px] bg-white'}`}>
          <CutShape dims={cut.dims} r={30} notch="center" fill="#FFFFFF" line={false} />
          <div className="relative">
            {/* the closing line */}
            <div className="text-center">
              <p className="text-[clamp(2rem,5.4vw,6.2rem)] font-semibold uppercase leading-[0.86] tracking-[-0.05em]">{t('footer.h1')}</p>
              <p className="font-serif text-[clamp(2.3rem,6.2vw,7rem)] italic leading-[0.92] tracking-[-0.02em]">
                <span className="bg-[linear-gradient(transparent_58%,#C8FF2E_58%,#C8FF2E_88%,transparent_88%)] px-[0.08em] [box-decoration-break:clone]">{t('footer.h2')}</span>
              </p>
            </div>
            <p className="mt-5 text-center text-[14px] text-ink-400">{t('footer.line')} {t('footer.where')}.</p>

            {/* pages · mark · elsewhere */}
            <div className="mt-10 grid grid-cols-2 items-center gap-y-10 lg:grid-cols-[1fr_auto_1fr]">
              <nav aria-label="Footer" className="text-center">
                <p className={label}>{t('footer.pages')}</p>
                <ul className="mt-3">
                  {PAGES.map((id) => (
                    <li key={id}><a href={href(id)} onClick={(e) => { e.preventDefault(); go(id); }} className={big}>{t(`nav.${id}`)}</a></li>
                  ))}
                </ul>
              </nav>
              <div className="order-first col-span-2 mx-auto w-[min(40vw,190px)] lg:order-none lg:col-span-1 lg:w-[clamp(160px,13vw,230px)]">
                <Mark play={seen} />
              </div>
              <div className="text-center">
                <p className={label}>{t('footer.elsewhere')}</p>
                <ul className="mt-3">
                  {ELSEWHERE.map(([name, href]) => (
                    <li key={name}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={big}>{name}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button ref={cut.btn} type="button" onClick={() => go('contact')} className="btn absolute bottom-0 left-1/2 h-12 -translate-x-1/2 bg-ink px-6 py-0 text-[15px] text-paper hover:bg-lime hover:text-ink">
            <Roll>{t('nav.cta')}</Roll> <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* on the lime */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 text-[13px] font-medium sm:px-5">
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
