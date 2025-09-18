import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function CustomScrollbar() {
  const thumbRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startTop = useRef(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const ratio = window.innerHeight / doc.scrollHeight;
      const h = Math.max(ratio * window.innerHeight, 36);
      const top = (window.scrollY / Math.max(scrollHeight, 1)) * (window.innerHeight - h);
      setThumbHeight(h);
      setThumbTop(isFinite(top) ? top : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const dy = e.clientY - startY.current;
      const newTop = Math.min(Math.max(0, startTop.current + dy), window.innerHeight - thumbHeight);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = newTop / Math.max(window.innerHeight - thumbHeight, 1);
      window.scrollTo({ top: ratio * scrollable, behavior: 'auto' });
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [thumbHeight]);

  const onThumbMouseDown = (e) => {
    dragging.current = true;
    startY.current = e.clientY;
    startTop.current = thumbTop;
    document.body.style.userSelect = 'none';
  };

  const onRailClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const newTop = Math.min(Math.max(0, clickY - thumbHeight / 2), window.innerHeight - thumbHeight);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = newTop / Math.max(window.innerHeight - thumbHeight, 1);
    window.scrollTo({ top: ratio * scrollable, behavior: 'smooth' });
  };

  const rail = (
    <div
      className="custom-scroll-rail fixed right-2 top-0 bottom-0 z-[99999]"
      onMouseDown={onRailClick}
      aria-hidden
    >
      <div
        ref={thumbRef}
        className="custom-scroll-thumb"
        onMouseDown={onThumbMouseDown}
        style={{ height: `${thumbHeight}px`, transform: `translateY(${thumbTop}px)` }}
      />
    </div>
  );

  if (typeof document !== 'undefined' && document.body) {
    return ReactDOM.createPortal(rail, document.body);
  }

  return rail;
}
