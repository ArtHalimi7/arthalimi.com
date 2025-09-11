import React from 'react';
import Prism from './Prism';

const Hero = () => {
  return (
      <div className="relative w-full h-[99vh] bg-black text-white">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          className="mt-32"
        />
        <div
          className="hero-content flex flex-col items-center md:items-start justify-center absolute top-0 left-0 h-full px-8 sm:px-16 md:pl-32 w-full md:w-2/3"
          style={{ zIndex: 2 }}
        >
          <p className="text-xl sm:text-xl md:text-2xl text-gray-300 mb-2 text-center md:text-left">Hello, my name is</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white text-center md:text-left">Art Halimi</h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 text-gray-200 text-center md:text-left">Full Stack Web Developer</h2>
            <p className="text-xl sm:text-xl md:text-2xl text-gray-400 max-w-xl text-center md:text-left">
            A dedicated Full Stack Web Developer from Kosovo, specializing in React, Node.js, and modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center md:items-start justify-center md:justify-start w-full">
            <button
              className="px-8 py-3 rounded-full bg-white text-gray-900 font-semibold shadow transition hover:bg-gray-100 focus:outline-none"
            >
              Get Started
            </button>
            <button
              className="px-8 py-3 rounded-full border border-white text-white font-semibold bg-transparent opacity-60 hover:opacity-80 transition focus:outline-none"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
  );
};

export default Hero;