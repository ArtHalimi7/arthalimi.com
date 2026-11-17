import { useEffect, useRef, useState } from 'react';

/*
 * A small dot that trails the pointer; over anything with data-cursor="…" it opens into a lime label
 * (e.g. "View project ↗"). Pointer devices only; the system cursor stays as it is.
 */
export default function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;
    setEnabled(true);
    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let raf = 0;
    const move = (e) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = e.target.closest?.('[data-cursor]');
      setLabel(t ? t.getAttribute('data-cursor') : '');
    };
    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', () => setLabel(''));
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[80]" aria-hidden="true">
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-medium text-ink transition-[width,height,padding,opacity,background-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${label ? 'h-11 bg-paper px-5 text-[13px] opacity-100' : 'h-2 w-2 bg-lime px-0 text-[0px] opacity-90'}`}
      >
        {label}
      </div>
    </div>
  );
}
