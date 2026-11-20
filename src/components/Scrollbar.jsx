import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { limeAmt } from '../lib/store';

const MIN = 48; // shortest the thumb gets, in px
const IDLE = 1100; // ms after the last scroll before it fades

/*
 * A floating scrollbar for mouse and trackpad screens: a slim pill on the right edge with nothing behind it (the
 * browser's own bar is hidden there in index.css, because on Windows it always keeps a gutter strip). It shows while the
 * page scrolls or the pointer is near the edge, widens on hover, turns lime while dragged, and goes dark over the lime
 * section. Dragging moves the page, clicking the rail jumps there. Wheel, keys and touch scroll as before (Lenis).
 * Decorative for assistive tech (aria-hidden): the page itself is the scrollable thing.
 */
export default function Scrollbar({ show = true }) {
  const lenis = useLenis();
  const rail = useRef(null);
  const thumb = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const st = useRef({ size: MIN, max: 0, limit: 1, scroll: 0, drag: null, idle: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const on = () => setEnabled(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const place = () => {
    const s = st.current;
    const el = thumb.current;
    if (!el) return;
    const vh = window.innerHeight;
    s.limit = Math.max(1, s.limit);
    s.size = Math.max(MIN, Math.round((vh * vh) / (vh + s.limit)));
    s.max = vh - s.size - 12; // 6px clear of the top and bottom edges
    el.style.height = `${s.size}px`;
    el.style.transform = `translate3d(0, ${(6 + (s.scroll / s.limit) * s.max).toFixed(1)}px, 0)`;
  };

  const wake = () => {
    const r = rail.current;
    if (!r) return;
    r.dataset.active = 'true';
    clearTimeout(st.current.idle);
    st.current.idle = setTimeout(() => { if (!st.current.drag && r.dataset.hover !== 'true') r.dataset.active = 'false'; }, IDLE);
  };

  // follow the page
  useLenis(({ scroll, limit }) => {
    st.current.scroll = scroll;
    st.current.limit = limit;
    place();
    wake();
  });

  // size it once, and again when the page or the window changes size
  useEffect(() => {
    if (!enabled) return undefined;
    const measure = () => {
      st.current.limit = lenis?.limit ?? document.documentElement.scrollHeight - window.innerHeight;
      st.current.scroll = lenis?.scroll ?? window.scrollY;
      place();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [enabled, lenis]);

  // dark over the lime section
  useEffect(() => {
    if (!enabled) return undefined;
    const set = (v) => { if (rail.current) rail.current.dataset.ink = v > 0.5 ? 'true' : 'false'; };
    set(limeAmt.get());
    return limeAmt.on('change', set);
  }, [enabled]);

  // the pointer near the right edge brings it up
  useEffect(() => {
    if (!enabled) return undefined;
    const near = (e) => {
      const r = rail.current;
      if (!r) return;
      const close = window.innerWidth - e.clientX < 28;
      if (close !== (r.dataset.hover === 'true')) { r.dataset.hover = close ? 'true' : 'false'; if (close) r.dataset.active = 'true'; else wake(); }
    };
    window.addEventListener('pointermove', near, { passive: true });
    return () => window.removeEventListener('pointermove', near);
  }, [enabled]);

  const to = (y, immediate) => {
    const s = st.current;
    const target = Math.min(s.limit, Math.max(0, y));
    if (lenis) lenis.scrollTo(target, immediate ? { immediate: true } : { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  };

  const onThumbDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const s = st.current;
    s.drag = { y: e.clientY, from: s.scroll };
    e.currentTarget.setPointerCapture(e.pointerId);
    rail.current.dataset.drag = 'true';
    document.documentElement.style.userSelect = 'none';
  };
  const onThumbMove = (e) => {
    const s = st.current;
    if (!s.drag) return;
    to(s.drag.from + ((e.clientY - s.drag.y) / Math.max(1, s.max)) * s.limit, true);
  };
  const onThumbUp = (e) => {
    const s = st.current;
    if (!s.drag) return;
    s.drag = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    rail.current.dataset.drag = 'false';
    document.documentElement.style.userSelect = '';
    wake();
  };
  // a click on the empty rail: centre the thumb on that point
  const onRailDown = (e) => {
    const s = st.current;
    to(((e.clientY - 6 - s.size / 2) / Math.max(1, s.max)) * s.limit, false);
  };

  if (!enabled) return null;
  return (
    <div
      ref={rail}
      aria-hidden="true"
      data-active="false"
      data-show={show ? 'true' : 'false'}
      onPointerDown={onRailDown}
      className="ah-scrollbar fixed bottom-0 right-0 top-0 z-[70] w-4 transition-opacity duration-500"
    >
      <div ref={thumb} onPointerDown={onThumbDown} onPointerMove={onThumbMove} onPointerUp={onThumbUp} onPointerCancel={onThumbUp} className="ah-scrollbar-thumb absolute right-[5px] top-0" />
    </div>
  );
}
