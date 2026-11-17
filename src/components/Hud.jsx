import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* A quiet live readout in the corners: local time in Gelsenkirchen, real FPS, the page's real LCP and scroll depth. */
export default function Hud({ show }) {
  const { i18n } = useTranslation();
  const [time, setTime] = useState('');
  const [fps, setFps] = useState(0);
  const [lcp, setLcp] = useState(null);
  const [scroll, setScroll] = useState(0);
  const frames = useRef(0);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const clock = setInterval(() => setTime(fmt.format(new Date())), 1000);
    setTime(fmt.format(new Date()));

    let raf = 0;
    const count = () => { frames.current++; raf = requestAnimationFrame(count); };
    raf = requestAnimationFrame(count);
    const fpsTimer = setInterval(() => { setFps(frames.current); frames.current = 0; }, 1000);

    let po;
    try {
      po = new PerformanceObserver((list) => {
        const e = list.getEntries().at(-1);
        if (e) setLcp(e.startTime / 1000);
      });
      po.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch { /* not supported */ }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearInterval(clock); clearInterval(fpsTimer); cancelAnimationFrame(raf); po?.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const item = 'flex items-center gap-1.5';
  return (
    <div data-nosnippet="" aria-hidden="true" className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden justify-between px-5 pb-4 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-400 mix-blend-difference transition-opacity duration-700 sm:px-8 lg:flex lg:px-14 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex gap-5">
        <span className={item}><span className="text-ink-500">GE</span> {time}</span>
        <span className={item}><span className="text-ink-500">FPS</span> {String(fps).padStart(3, '0')}</span>
        <span className={item}><span className="text-ink-500">LCP</span> {lcp ? `${lcp.toFixed(2)}s` : '—'}</span>
        <span className={item}><span className="text-ink-500">{i18n.language === 'de' ? 'Scroll' : 'Scroll'}</span> {String(scroll).padStart(3, '0')}%</span>
      </div>
      <span className={item}>
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" /> {i18n.language === 'de' ? 'Offen für Projekte' : 'Open for projects'}
      </span>
    </div>
  );
}
