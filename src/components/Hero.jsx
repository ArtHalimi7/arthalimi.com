import React from 'react';
import Prism from './Prism';

const Hero = () => {
  return (
    <div style={{ width: '100%', height: '80vh', position: 'relative', backgroundColor: 'black' }}>
      <Prism
        animationType="hover"
        timeScale={0.5}
        height={2.5}
        baseWidth={4.5}
        scale={2.6}
        hueShift={0}
        colorFrequency={1}
        noise={0.5}
        glow={1}
      />
    </div>
  );
};

export default Hero;