/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

export default function CustomScrollbar() {
  const thumbRef = useRef(null);
  const railRef = useRef(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startTop = useRef(0);
  const thumbHeightRef = useRef(0);
  const thumbTopRef = useRef(0);
  const isHovered = useRef(false);

  // Direct DOM update — no React re-render
  const applyThumbStyle = useCallback(() => {
    const el = thumbRef.current;
    if (!el) return;
    el.style.height = `${thumbHeightRef.current}px`;
    el.style.transform = `translateY(${thumbTopRef.current}px)`;
  }, []);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const windowHeight = window.innerHeight;
      const scrollHeight = doc.scrollHeight;

      const ratio = windowHeight / scrollHeight;
      const h = Math.max(ratio * windowHeight, 40);

      const maxScroll = scrollHeight - windowHeight;
      const scrollProgress = window.scrollY / Math.max(maxScroll, 1);
      const top = scrollProgress * (windowHeight - h);

      thumbHeightRef.current = h;
      thumbTopRef.current = isFinite(top) ? top : 0;
      applyThumbStyle();
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [applyThumbStyle]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;

      const dy = e.clientY - startY.current;
      const windowHeight = window.innerHeight;
      const maxThumbTop = windowHeight - thumbHeightRef.current;
      const newTop = Math.min(Math.max(0, startTop.current + dy), maxThumbTop);

      const scrollable = document.documentElement.scrollHeight - windowHeight;
      const ratio = newTop / Math.max(maxThumbTop, 1);

      window.scrollTo({ top: ratio * scrollable, behavior: 'auto' });
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const onThumbMouseDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    startY.current = e.clientY;
    startTop.current = thumbTopRef.current;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const onRailClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const h = thumbHeightRef.current;
    const newTop = Math.min(Math.max(0, clickY - h / 2), window.innerHeight - h);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = newTop / Math.max(window.innerHeight - h, 1);

    window.scrollTo({ top: ratio * scrollable, behavior: 'smooth' });
  };

  const onEnter = () => {
    isHovered.current = true;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (rail) rail.style.width = '12px';
    if (thumb) thumb.style.background = '#7C3AED';
  };
  const onLeave = () => {
    isHovered.current = false;
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (rail) rail.style.width = '6px';
    if (thumb) thumb.style.background = '#3f3f46';
  };

  const rail = (
    <div
      ref={railRef}
      className="fixed right-0 top-0 bottom-0 z-[99999] flex justify-center transition-all duration-500"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onRailClick}
      aria-hidden
      style={{
        width: '6px',
        background: 'rgba(255,255,255,0.02)',
        borderLeft: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <div className="absolute inset-y-0 w-px bg-white/5 left-1/2 -translate-x-1/2" />
      <div
        ref={thumbRef}
        onMouseDown={onThumbMouseDown}
        className="relative transition-colors duration-300"
        style={{
          height: 0,
          transform: 'translateY(0px)',
          background: '#3f3f46',
          width: '2px',
          cursor: 'pointer',
        }}
      >
        <div className="absolute inset-y-0 -left-4 -right-4 cursor-pointer" />
      </div>
    </div>
  );

  if (typeof document !== 'undefined' && document.body) {
    return ReactDOM.createPortal(rail, document.body);
  }

  return null;
}