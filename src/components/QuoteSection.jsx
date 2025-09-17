import React from "react";
import { useTranslation } from 'react-i18next';
import einsteinImg from "../assets/quote.png";

function Lines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-2 right-2 top-2 bottom-[50px]">
        <span className="absolute left-0 right-0 -bottom-12 h-px bg-white/10" />
      </div>
      <span className="absolute top-0 bottom-0 left-10 w-px bg-white/70" />
      <span className="absolute top-0 bottom-0 right-10 w-px bg-white/10" />
    </div>
  );
}

export default function QuoteSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 py-6 md:py-8 min-h-[100px] md:min-h-[90px] bg-[#dadadb]"
    >
      {/* Top SVG wave */}
      <div className="absolute top-0 left-0 w-full z-10" style={{lineHeight:0}}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[38px] md:h-[60px]">
          <path d="M0,30 Q360,60 720,30 T1440,30 V0 H0 Z" fill="#dadadb" />
        </svg>
      </div>
      {/* Subtle halftone gradients in corners */}
      <div className="pointer-events-none select-none">
        <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-[#B71C1C]/10 to-transparent rounded-full blur-2xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#B71C1C]/10 to-transparent rounded-full blur-2xl opacity-30" />
      </div>
      <Lines />
      <div className="max-w-4xl mx-auto px-3 flex flex-col md:flex-row items-center justify-between gap-6 relative z-20">
        {/* Quote content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <svg className="w-12 h-12 text-[#B71C1C]/60 mb-1" fill="none" viewBox="0 0 64 64"><text x="0" y="48" fontSize="64" fontWeight="bold" fill="currentColor">“</text></svg>
          <blockquote className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug drop-shadow-sm">
            {t('quote_text')}
          </blockquote>
          <div className="flex flex-col items-center md:items-start gap-1 mt-1">
            <span className="text-base font-semibold text-[#B71C1C] tracking-wide">{t('quote_author')}</span>
            <span className="text-zinc-600 text-xs">{t('quote_sub')}</span>
          </div>
        </div>
        {/* Einstein image on right, smaller and clipped */}
        <div className="flex-1 flex justify-center md:justify-end items-center">
          <img 
            src={einsteinImg}
            alt="Albert Einstein"
            className="w-[140px] md:w-[200px] max-w-full h-auto object-contain animate-float bg-transparent border-none shadow-none rounded-none"
            style={{background: 'transparent', minWidth: '60px'}}
          />
        </div>
      </div>
      {/* Bottom SVG wave */}
      <div className="absolute bottom-0 left-0 w-full z-10" style={{lineHeight:0}}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[38px] md:h-[60px]">
          <path d="M0,30 Q360,0 720,30 T1440,30 V60 H0 Z" fill="#dadadb" />
        </svg>
      </div>
      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
