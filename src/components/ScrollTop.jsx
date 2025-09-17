import { useEffect, useState } from 'react';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`scroll-top ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 4v16" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.06" />
        <path d="M18 12l-6-6-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
