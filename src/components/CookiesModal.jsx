import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'cookiesAccepted';

export default function CookiesModal({ animateIn }) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible && animateIn) {
      // Delay to allow parent fade-in, then show modal with slide-in
      setTimeout(() => setShow(true), 200);
    }
  }, [visible, animateIn]);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setShow(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 z-50 w-full bg-[#232425] text-white shadow-2xl px-4 py-2 flex items-center justify-center border-t border-white/10 ${show ? 'animate-cookies-in' : 'opacity-0 translate-y-8'}`}
      style={{ borderRadius: 0, transition: 'all 0.3s cubic-bezier(.4,0,.2,1)', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}
    >
      <div className="w-full max-w-5xl flex items-center justify-between gap-4">
        <div className="flex-1 text-sm text-zinc-200 text-center sm:text-left leading-tight">
          <span className="font-semibold text-white mr-2">Cookies Notice:</span> This website uses cookies to provide the best experience. By using the website, you consent to the use of cookies.
        </div>
        <button
          onClick={acceptCookies}
          className="px-4 py-1 bg-[#B71C1C] hover:bg-[#8B1515] text-white transition font-bold shadow rounded-sm border border-[#B71C1C] hover:border-[#8B1515] focus:outline-none focus:ring-2 focus:ring-[#B71C1C] focus:ring-opacity-50"
          style={{ minWidth: 80 }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
