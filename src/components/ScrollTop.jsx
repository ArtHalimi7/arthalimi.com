import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 500px of scroll for a cleaner look
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const button = (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed z-[999999] right-8 bottom-10 group"
          aria-label="Scroll to top"
        >
          {/* Glass Container */}
          <div className="relative w-12 h-12 flex items-center justify-center bg-white/[0.03] backdrop-blur-2xl rounded-xl border border-white/10 transition-all duration-500 group-hover:border-purple-500/40 group-hover:bg-purple-500/[0.05]">

            {/* Corner Light Glint */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 rounded-tl-lg" />

            {/* The Icon */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp
                className="w-5 h-5 text-white/60 group-hover:text-purple-400 transition-colors duration-300"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Subtle Radiant Purple Glow on Hover Removed */}
          </div>

          {/* External Label (Optional/Minimal) */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-[10px] font-mono text-purple-400 uppercase tracking-widest pointer-events-none"
          >
            Top
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(button, document.body);
}