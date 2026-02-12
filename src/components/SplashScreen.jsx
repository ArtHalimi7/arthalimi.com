/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Alogo from '../assets/Alogo.png';

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Hide the static splash screen from index.html
    const staticSplash = document.getElementById('static-splash');
    if (staticSplash) {
      setTimeout(() => {
        staticSplash.style.opacity = '0';
        setTimeout(() => staticSplash.remove(), 800);
      }, 100);
    }

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const splashContent = (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[99999] bg-[#020202] flex items-center justify-center overflow-hidden"
        >
          {/* Deep Purple Radial Eclipse - Purely Ambient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0.5], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none"
          />

          <div className="relative flex flex-col items-center">

            {/* Logo: The Solitary Focus */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10"
            >
              <img
                src="/Alogo.png"
                alt="Art Halimi Creative Portfolio Logo"
                fetchPriority="high"
                decoding="async"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />

              {/* Ultra-thin Purple Accent Line - Passing through the void */}
              <motion.div
                initial={{ width: 0, left: "50%" }}
                animate={{ width: "140%", left: "-20%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
              />
            </motion.div>

            {/* Typography: Sophisticated Contrast */}
            <div className="flex flex-col items-center">
              <motion.h2
                initial={{ opacity: 0, letterSpacing: "1.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.6em" }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-white text-[11px] font-light uppercase ml-[0.6em]"
              >
                Art Halimi
              </motion.h2>

              {/* Sub-status: Minimalist purple detail */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-4 text-[8px] font-mono text-purple-400 uppercase tracking-[0.3em]"
              >
                System_Ready
              </motion.span>
            </div>
          </div>

          {/* Minimal Corner Accents (Purple Tinge) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute top-12 left-12 w-4 h-4 border-l border-t border-purple-500/50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute bottom-12 right-12 w-4 h-4 border-r border-b border-purple-500/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined' && document.body) {
    return ReactDOM.createPortal(splashContent, document.body);
  }

  return splashContent;
}