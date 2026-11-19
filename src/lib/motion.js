import { useEffect, useState } from 'react';

/**
 * True when the visitor asks for less motion, false when not, and null until it's known: it's read after mount, so the
 * prerendered HTML (which can't know) and the first client render always agree. Follows the setting if it changes.
 * Anything timed that must not start early (a progress line that ends at once under reduced motion) waits for false.
 */
export function useReduced() {
  const [reduced, setReduced] = useState(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}
