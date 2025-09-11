import React from 'react';
import Prism from './Prism';

const Hero = () => {
  return (
      <div className="relative w-full h-[80vh] bg-black text-white">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={2.5}
          baseWidth={4.5}
          scale={2.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          className="mt-32"
        />
      </div>
  );
};

export default Hero;