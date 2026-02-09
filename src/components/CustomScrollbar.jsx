/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function CustomScrollbar() {
  const thumbRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startTop = useRef(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const windowHeight = window.innerHeight;
      const scrollHeight = doc.scrollHeight;
      
      // Calculate height ratio
      const ratio = windowHeight / scrollHeight;
      const h = Math.max(ratio * windowHeight, 40); // Minimum 40px thumb
      
      // Calculate top position based on scroll progress
      const maxScroll = scrollHeight - windowHeight;
      const scrollProgress = window.scrollY / Math.max(maxScroll, 1);
      const top = scrollProgress * (windowHeight - h);
      
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
      const windowHeight = window.innerHeight;
      const maxThumbTop = windowHeight - thumbHeight;
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
  }, [thumbHeight]);

  const onThumbMouseDown = (e) => {
    e.stopPropagation(); // Prevents rail click from firing
    dragging.current = true;
    startY.current = e.clientY;
    startTop.current = thumbTop;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
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
      className="fixed right-0 top-0 bottom-0 z-[99999] flex justify-center transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={onRailClick}
      aria-hidden
      style={{ 
        width: isHovered ? '12px' : '6px', 
        background: 'rgba(255,255,255,0.02)',
        borderLeft: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      {/* Decorative Track Line */}
      <div className="absolute inset-y-0 w-px bg-white/5 left-1/2 -translate-x-1/2" />

      {/* The Architectural Thumb */}
      <div
        ref={thumbRef}
        onMouseDown={onThumbMouseDown}
        className="relative transition-colors duration-300"
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
          background: isHovered ? '#7C3AED' : '#3f3f46', // Purple when active
          width: '2px', // Razor thin like your grid lines
          cursor: 'pointer',
        }}
      >
        {/* Invisible hit area for better UX on thin line */}
        <div className="absolute inset-y-0 -left-4 -right-4 cursor-pointer" />
        
        {/* Glow effect when hovered */}
        {isHovered && (
          <div className="absolute inset-0 bg-purple-500 blur-sm opacity-50" />
        )}
      </div>
    </div>
  );

  if (typeof document !== 'undefined' && document.body) {
    return ReactDOM.createPortal(rail, document.body);
  }

  return null;
}