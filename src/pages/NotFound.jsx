import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText';

export default function NotFound() {
  const [hoverIntensity] = useState(0.55);
  const [enableHover] = useState(true);

  return (
    <main className="relative h-screen overflow-hidden bg-[#18191A] text-zinc-100">
      <div className="relative mx-auto max-w-7xl px-6 py-12 h-full flex items-center">
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
        </div>

        <div className="flex items-center justify-center flex-col w-full" style={{ minHeight: '60vh' }}>
          <FuzzyText baseIntensity={0.2} hoverIntensity={hoverIntensity} enableHover={enableHover}>
            404
          </FuzzyText>

          <h2 className="mt-6 text-3xl font-semibold text-zinc-100">Not Found</h2>

          <p className="mt-4 text-center text-zinc-400 max-w-xl">Page not found — the page you are looking for does not exist.</p>

          <div className="mt-8">
            <Link to="/" className="inline-flex items-center rounded-xl bg-[#B71C1C] px-6 py-3 font-medium text-white shadow-sm hover:brightness-95">Back to homepage</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
