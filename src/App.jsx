import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Hud from './components/Hud';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Datenschutz, Impressum } from './pages/Legal';
import { ReadyContext } from './lib/ready';
import { introOn } from './lib/store';
import { headFor, isHomePath, normPath, pageFor } from './lib/seo';
import { browserLanguage, savedLanguage } from './i18n';

function RouteEffects() {
  const { pathname, hash, state } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (state?.keepScroll) return; // a language switch: stay where you are
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { setTimeout(() => (lenis ? lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView()), 60); return; }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash, lenis]);
  return null;
}

/** On the home pages the URL is the language: / is English, /de is German. */
function LangSync() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  useEffect(() => {
    const p = normPath(pathname);
    if (p === '/de' && i18n.language !== 'de') i18n.changeLanguage('de');
    if (p === '/' && i18n.language !== 'en') i18n.changeLanguage('en');
  }, [pathname, i18n]);
  // first visit to / : German browsers (or anyone who picked German before) go to /de. Crawlers stay on /.
  useEffect(() => {
    if (normPath(window.location.pathname) !== '/') return;
    if ((savedLanguage() ?? browserLanguage()) === 'de') navigate(`/de${window.location.hash}`, { replace: true, state: { keepScroll: true } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Keeps title, description, canonical and Open Graph tags right when the page or language changes in the browser. */
function Seo() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  useEffect(() => {
    const path = normPath(pathname);
    const h = headFor(path, i18n.language);
    // pages written in one language only (Impressum, Datenschutz) always declare it
    const page = pageFor(path);
    document.documentElement.lang = page.alt || page.key === 'notfound' ? i18n.language : page.lang;
    document.title = h.title;
    const set = (sel, attr, val) => document.head.querySelector(sel)?.setAttribute(attr, val);
    set('meta[name="description"]', 'content', h.description);
    set('meta[name="robots"]', 'content', h.robots);
    set('meta[property="og:url"]', 'content', h.url);
    set('meta[property="og:title"]', 'content', h.ogTitle);
    set('meta[property="og:description"]', 'content', h.description);
    set('meta[property="og:locale"]', 'content', h.ogLocale);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (h.canonical) canonical?.setAttribute('href', h.canonical);
    else canonical?.remove();
  }, [pathname, i18n.language]);
  return null;
}

/** Everything inside the router. The browser wraps it in BrowserRouter, the prerenderer in StaticRouter. */
export function AppShell() {
  const { pathname } = useLocation();
  // the intro only plays when the visit starts on a home page
  const [startedHome] = useState(() => isHomePath(pathname));
  const [ready, setReady] = useState(!startedHome);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => { if (!startedHome) introOn.set(0); }, [startedHome]);

  return (
    <ReactLenis root options={{ lerp: reduced ? 1 : 0.09, smoothWheel: !reduced }}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <ReadyContext.Provider value={ready}>
            <RouteEffects />
            <LangSync />
            <Seo />
            {startedHome && <Loader onDone={() => setReady(true)} />}
            <div className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}><Nav /></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/de" element={<Home />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <Cursor />
            <Hud show={ready} />
          </ReadyContext.Provider>
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
    </BrowserRouter>
  );
}
