import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { EASE, LogoMark, Roll, Scramble } from './ui/primitives';
import { homePath, isHomePath } from '../lib/seo';
import { saveLanguage } from '../i18n';

const LINKS = ['work', 'services', 'process', 'studio'];
const SECTIONS = [...LINKS, 'contact'];

/** The section under the middle of the screen (null in between, e.g. the hero or the lime statement). Home page only. */
function useActiveSection(enabled) {
  const [id, setId] = useState(null);
  useEffect(() => {
    if (!enabled) { setId(null); return undefined; }
    let raf = 0;
    const read = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let hit = null;
      for (const s of SECTIONS) {
        const r = document.getElementById(s)?.getBoundingClientRect();
        if (r && r.top <= mid && r.bottom > mid) hit = s;
      }
      setId(hit);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [enabled]);
  return id;
}

export function useScrollTo() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return (id) => {
    const el = document.getElementById(id);
    if (!el) { navigate(`${homePath(i18n.language)}#${id}`); return; }
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.5 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
}

/** A real link target for a section (so crawlers and "open in new tab" work): a fragment on the home page, else home + fragment. */
export function useSectionHref() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  return (id) => (isHomePath(pathname) ? `#${id}` : `${homePath(i18n.language)}#${id}`);
}

/** EN / DE. On the home page these are real links to / and /de; switching keeps your scroll position. */
function Lang() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pick = (e, l) => {
    e.preventDefault();
    saveLanguage(l);
    if (isHomePath(pathname)) navigate(homePath(l), { replace: true, state: { keepScroll: true } });
    else i18n.changeLanguage(l);
  };
  return (
    <div className="flex items-center rounded-full border border-paper/10 p-0.5 text-[11px] font-medium">
      {['en', 'de'].map((l) => (
        <a
          key={l}
          href={homePath(l)}
          hrefLang={l}
          lang={l}
          onClick={(e) => pick(e, l)}
          aria-current={i18n.language === l ? 'true' : undefined}
          className={`rounded-full px-2.5 py-1 uppercase tracking-[0.08em] transition-colors ${i18n.language === l ? 'bg-paper text-ink' : 'text-ink-300 hover:text-paper'}`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

function NavLink({ id, label, href, onClick, on }) {
  const [hit, setHit] = useState(0);
  // The scramble's random glyphs have other widths than the label. The real label (invisible) holds the width and the
  // scramble is laid over it, so the pill, which is only as wide as its contents, never resizes and shakes.
  return (
    <a href={href} data-spy={id} aria-current={on ? 'true' : undefined} onClick={(e) => { e.preventDefault(); onClick(); }} onMouseEnter={() => setHit((h) => h + 1)} className={`relative rounded-full px-4 py-2 text-[13.5px] transition-colors hover:text-paper ${on ? 'text-paper' : 'text-ink-200 hover:bg-paper/[0.06]'}`}>
      <span className="opacity-0">{label}</span>
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        <Scramble text={label} trigger={hit} />
      </span>
    </a>
  );
}

export default function Nav() {
  const { t, i18n } = useTranslation();
  const go = useScrollTo();
  const href = useSectionHref();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // where you are on the page: a pill slides to that section's link
  const active = useActiveSection(isHomePath(pathname));
  const links = useRef(null);
  const [pill, setPill] = useState(null);
  useEffect(() => {
    const a = active && links.current?.querySelector(`[data-spy="${active}"]`);
    // in between sections it fades out where it is, instead of sliding away
    setPill((p) => (a ? { x: a.offsetLeft, w: a.offsetWidth } : p && { ...p, gone: true }));
  }, [active, i18n.language]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; }, [open]);

  const nav = (id) => { setOpen(false); go(id); };
  const home = (e) => {
    e.preventDefault();
    setOpen(false);
    if (isHomePath(pathname)) { if (lenis) lenis.scrollTo(0, { duration: 1.5 }); else window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else navigate(homePath(i18n.language));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* a compact pill, centred: as wide as its contents on desktop, capped on smaller screens */}
      <div className={`flex justify-center px-4 transition-[padding] duration-500 sm:px-6 ${scrolled ? 'pt-3' : 'pt-5'}`}>
        <div className={`flex h-[58px] w-full max-w-[640px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-colors duration-500 lg:w-auto lg:max-w-none lg:gap-9 ${scrolled || open ? 'border-paper/10 bg-ink/75 backdrop-blur-xl' : 'border-paper/[0.06] bg-ink/40 backdrop-blur-md'}`}>
          <a href={homePath(i18n.language)} onClick={home} className="flex shrink-0 items-center gap-2.5" aria-label="Art Halimi Studio, home">
            <LogoMark className="h-7 w-7" />
            <span className="text-[14.5px] font-semibold tracking-[-0.02em]">Art Halimi</span>
          </a>

          <nav ref={links} className="relative hidden items-center gap-1 lg:flex" aria-label="Main">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-9 rounded-full border border-paper/[0.08] bg-paper/[0.07] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ width: pill?.w ?? 0, transform: `translate(${pill?.x ?? 0}px, -50%)`, opacity: pill && !pill.gone ? 1 : 0 }}
            />
            {LINKS.map((id) => <NavLink key={id} id={id} on={active === id} label={t(`nav.${id}`)} href={href(id)} onClick={() => nav(id)} />)}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block"><Lang /></div>
            <button type="button" onClick={() => nav('contact')} className="roll-host hidden items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:bg-paper sm:inline-flex">
              <Roll>{t('nav.cta')}</Roll> <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => setOpen((v) => !v)} className="h-10 rounded-full border border-paper/15 px-4 text-[13px] lg:hidden" aria-expanded={open}>
              {open ? t('nav.close') : t('nav.menu')}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 -z-10 flex flex-col justify-end bg-ink px-5 pb-10 pt-28 sm:px-8 lg:hidden"
          >
            <ul>
              {[...LINKS, 'contact'].map((id, i) => (
                <m.li key={id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, ease: EASE }}>
                  <a href={href(id)} onClick={(e) => { e.preventDefault(); nav(id); }} className="flex w-full items-baseline gap-4 border-b border-paper/10 py-4 text-left text-[2.4rem] font-medium tracking-[-0.04em]">
                    <span className="text-[12px] text-lime">0{i + 1}</span>
                    {t(`nav.${id}`)}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <Lang />
              <a href="mailto:arthalimi989@gmail.com" className="text-[13px] text-ink-300">arthalimi989@gmail.com</a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
