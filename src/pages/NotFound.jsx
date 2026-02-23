/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const [hoverIntensity] = useState(0.55);
  const [enableHover] = useState(true);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-transparent text-white overflow-hidden">
      
      {/* BACKGROUND METADATA - Anchored to corners */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 opacity-40">
        <span className="text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase">Status: 404_NULL</span>
      </div>
      
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-40">
        <span className="text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase rotate-180 [writing-mode:vertical-lr]">Directory_Index_Missing</span>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
        

          {/* CONTENT DESCRIPTION (Stacked on Mobile, Offset on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-start-8 lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left space-y-10"
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none uppercase">
                Void <br />
                <span className="text-zinc-800 italic">Detected.</span>
              </h1>
              
              <p className="text-zinc-500 font-light text-lg lg:text-xl leading-relaxed max-w-sm">
                The requested resource has been moved or purged from the architectural database.
              </p>
            </div>

            <div className="h-px w-24 bg-white/10 hidden lg:block" />

            {/* THE BACK ACTION */}
            <Link to="/" className="group flex flex-col lg:flex-row items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out">
                <ArrowLeft size={24} strokeWidth={1} />
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Return Home</span>
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Exit_Error_Loop</span>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </main>
  );
}