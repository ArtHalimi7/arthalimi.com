import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLenis } from 'lenis/react';

/*
 * A quiet status note in the bottom-right corner. It sits on its own small dark pill so it reads on the dark and the
 * lime sections alike (a blend mode did that before, but it made the browser re-composite the whole page per frame).
 * It steps aside at the very end of the page, where the footer's bottom line sits in that corner.
 */
export default function Hud({ show }) {
  const { i18n } = useTranslation();
  const [atEnd, setAtEnd] = useState(false);
  useLenis(({ scroll, limit }) => setAtEnd(limit - scroll < 120));
  return (
    <div data-nosnippet="" aria-hidden="true" className={`pointer-events-none fixed bottom-0 right-0 z-40 hidden px-5 pb-4 transition-opacity duration-700 sm:px-8 lg:flex lg:px-14 ${show && !atEnd ? 'opacity-100' : 'opacity-0'}`}>
      <span className="flex items-center gap-1.5 rounded-full border border-paper/[0.08] bg-ink/85 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-300">
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" /> {i18n.language === 'de' ? 'Offen für Projekte' : 'Open for projects'}
      </span>
    </div>
  );
}
