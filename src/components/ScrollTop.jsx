import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (hero) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When hero is NOT fully visible (scrolled past its bottom area), show the button
            setVisible(!entry.isIntersecting);
          });
        },
        { root: null, threshold: 0, rootMargin: '-10% 0px -80% 0px' }
      );

      observer.observe(hero);
      return () => observer.disconnect();
    } else {
      // Fallback: show button after user scrolls a bit (useful during testing or if #home missing)
      const onScroll = () => setVisible(window.scrollY > 300);
      window.addEventListener('scroll', onScroll, { passive: true });
      // initialize
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const scrollToTop = () => {
    // Use browser's native smooth scroll for speed and responsiveness
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const button = (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed right-2 md:right-4 transform transition-all duration-300 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'} z-[999999]`}
      style={{
        pointerEvents: visible ? 'auto' : 'none',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
        touchAction: 'manipulation'
      }}
      aria-hidden={!visible}
    >
      <div className="w-14 h-14 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[#B71C1C] shadow-lg touch-none border-2 border-[#B71C1C]">
        {/* inner subtle circle */}
        <div className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 6v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 11.5l-5-5-5 5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </button>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(button, document.body);
}
