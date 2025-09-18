import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Coffee } from 'lucide-react';
import Alogo from '../assets/Alogo.png';

function DrawingGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Vertical lines */}
        {[20, 40, 60, 80].map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1="10"
            x2={x}
            y2="90"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 1.5, 
              delay: 0.5 + i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Horizontal lines */}
        {[25, 50, 75].map((y, i) => (
          <motion.line
            key={`h-${i}`}
            x1="10"
            y1={y}
            x2="90"
            y2={y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 2 + i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Border frame */}
        <motion.rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="none"
          stroke="rgba(183, 28, 28, 0.3)"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 3, 
            delay: 3.5,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

function AnimatedLogo({ onComplete }) {
  const [currentChar, setCurrentChar] = useState(0);
  const logoText = "<Art.dev/>";
  
  useEffect(() => {
    if (currentChar < logoText.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Logo complete, trigger next phase (linger longer so text stays visible)
      const timer = setTimeout(onComplete, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentChar, logoText.length, onComplete]);

  return (
    <div className="relative">
      <motion.div
        className="text-4xl md:text-6xl font-mono font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {logoText.slice(0, currentChar)}
        <motion.span
          className="text-[#B71C1C]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 text-4xl md:text-6xl font-mono font-bold text-[#B71C1C] blur-lg opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        {logoText.slice(0, currentChar)}
      </motion.div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circular progress */}
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="#B71C1C"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Center icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Code className="w-6 h-6 text-[#B71C1C]" />
        </motion.div>
      </div>
      
      {/* Loading text */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="text-zinc-400 text-sm tracking-wider">
          Loading Portfolio
        </div>
        
        {/* Loading dots */}
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#B71C1C] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FloatingElements() {
  const icons = [Code, Alogo, Coffee];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: -180
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              rotate: 0,
              y: [-20, -40, -60],
            }}
            transition={{
              duration: 4,
              delay: 2 + Math.random() * 3,
              ease: "easeOut"
            }}
          >
            {typeof Icon === 'string' || Icon instanceof String ? (
              <img src={Icon} alt="logo" className="w-5 h-5 opacity-80" />
            ) : (
              <Icon className="w-4 h-4 text-[#B71C1C]/50" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('logo'); // 'logo', 'loading', 'complete'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('[splash] mounted, initial phase=', phase);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    console.log('[splash] phase changed ->', phase);
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const delta = Math.random() * 15 + 5;
          const next = Math.min(100, prev + delta);
          if (next >= 100) {
            clearInterval(interval);
            // move to complete and notify parent
            setPhase('complete');
            setTimeout(onComplete, 800);
            return 100;
          }
          return next;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [phase, onComplete]);

  const handleLogoComplete = () => {
    // reset progress and move to loading immediately when AnimatedLogo signals completion
    setProgress(0);
    setPhase('loading');
  };

  const splashContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-[#18191A] flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)"
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <DrawingGrid />
        <FloatingElements />
        
        <div className="relative z-10 text-center">
          {phase === 'logo' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedLogo onComplete={handleLogoComplete} />
              
              {/* Subtitle */}
              <motion.div
                className="mt-4 text-zinc-500 text-sm tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Full Stack Developer
              </motion.div>
            </motion.div>
          )}
          
          {phase === 'loading' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingIndicator />
              
              {/* Progress percentage */}
              <motion.div
                className="mt-6 text-[#B71C1C] font-mono text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {Math.floor(progress)}%
              </motion.div>
            </motion.div>
          )}
          
          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl md:text-8xl flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.8 }}
              >
                <motion.img src={Alogo} alt="Alogo" className="w-20 h-20 md:w-28 md:h-28 rounded-full" />
              </motion.div>
              
              <motion.div
                className="mt-4 text-white text-xl font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Welcome
              </motion.div>
            </motion.div>
          )}
        </div>
        
        {/* Corner decorations */}
        <motion.div
          className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#B71C1C]/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#B71C1C]/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 4.2 }}
        />
        
        {/* Skip button */}
        <motion.button
          onClick={onComplete}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-zinc-500 hover:text-[#B71C1C] transition-colors text-sm tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip Intro →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );

  // Portalize into document.body to avoid stacking context / clipping issues
  if (typeof document !== 'undefined' && document.body) {
    return ReactDOM.createPortal(splashContent, document.body);
  }

  return splashContent;
}