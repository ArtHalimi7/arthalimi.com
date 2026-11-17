import { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Shift from '../components/Shift';
import Work from '../components/Work';
import Process from '../components/Process';
import Studio from '../components/Studio';
import Contact from '../components/Contact';
import { limeAmt } from '../lib/store';
import { useReady } from '../lib/ready';

import Scene from '../components/Scene';

export default function Home() {
  const ready = useReady();
  useEffect(() => { limeAmt.set(0); }, []);
  return (
    <main className="relative">
      <Scene />
      <div className={`transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <Work />
        <Shift />
        <Services />
        <Process />
        <Studio />
        <Contact />
      </div>
    </main>
  );
}
