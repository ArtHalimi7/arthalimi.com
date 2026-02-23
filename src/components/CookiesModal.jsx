/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const COOKIE_KEY = 'cookiesAccepted';

export default function CookiesModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      // Delaying the appearance to ensure it feels like a deliberate system load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-8 pointer-events-none"
        >
          <div className="mx-auto max-w-6xl w-full pointer-events-auto">
            {/* The Glass Container */}
            <div className="relative overflow-hidden bg-[#080808]/90 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2rem]">

              {/* Responsive Grid System */}
              <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

                {/* Content Side */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 text-center md:text-left">
                  {/* Icon - Hidden on very small screens to save space */}
                  <div className="hidden sm:flex p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-500 shrink-0">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <span className="text-[9px] md:text-[10px] font-mono tracking-[0.4em] text-purple-500 uppercase italic">
                        Privacy_Protocol
                      </span>
                      <div className="hidden md:block h-px w-12 bg-white/10" />
                    </div>

                    <h3 className="text-white text-lg md:text-xl font-light tracking-tight">
                      We value your <span className="italic text-zinc-400">digital sovereignty</span>.
                    </h3>

                    <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-2xl">
                      Our platform utilizes selective cookies to synchronize your experience. By proceeding, you acknowledge our specialized
                      <span className="text-white/80"> data transmission frameworks</span>.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  {/* Decline - Minimalist Ghost Style */}
                  <button
                    onClick={acceptCookies} // Usually maps to same action for simplicity, or link to settings
                    className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors duration-300 py-2 px-4"
                  >
                    Decline
                  </button>

                  {/* Accept - The Signature Pill */}
                  <motion.button
                    onClick={acceptCookies}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative w-full sm:w-auto flex items-center justify-center gap-6 px-10 py-4 bg-white text-black overflow-hidden rounded-full transition-all duration-500"
                  >
                    <span className="relative z-10 uppercase tracking-[0.2em] text-[10px] font-bold">
                      Acknowledge
                    </span>
                    <ArrowRight size={14} className="relative z-10 transition-transform group-hover:translate-x-1" />

                    {/* Purple Slide Transition */}
                    <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </motion.button>
                </div>
              </div>

              {/* Decorative Tech-Line (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500/40" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}