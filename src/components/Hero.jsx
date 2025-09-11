import React from 'react';
import Prism from './Prism';

const Hero = () => {
  return (
      <div className="relative w-full h-[99vh] bg-black text-white">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3}
          baseWidth={3.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          className="mt-32"
        />
        <div
          className="hero-content flex flex-col items-center md:items-start justify-center absolute top-0 left-0 h-full px-12 sm:px-24 md:pl-48 w-full md:w-3/4"
          style={{ zIndex: 2 }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl text-blue-300 mb-4 text-center md:text-left font-light tracking-wide drop-shadow-lg">Hello, my name is</p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 text-white text-center md:text-left tracking-tight drop-shadow-xl">Art Halimi</h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10 text-blue-200 text-center md:text-left tracking-wide drop-shadow-lg">Full Stack Web Developer</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl text-center md:text-left font-medium leading-relaxed drop-shadow-md">
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