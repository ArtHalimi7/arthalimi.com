import React, { useEffect, useRef, useState } from "react";
import sql from "../assets/sql.png";
import reactLogo from "../assets/react.png";
import ts from "../assets/ts.png";
import js from "../assets/js.png";
import node from "../assets/node.png";
import redux from "../assets/redux.png";
import tailwind from "../assets/tailwindcss.png";
import express from "../assets/expressjs.png";
import profilePic from '../assets/profile.png';

const skillsOuter = [
  { icon: sql, label: 'SQL' },
  { icon: express, label: 'Express' },
  { icon: reactLogo, label: 'React' },
  { icon: js, label: 'JavaScript' },
  { icon: ts, label: 'TypeScript' },
];
const skillsInner = [
  { icon: redux, label: 'Redux' },
  { icon: node, label: 'Node.js' },
  { icon: tailwind, label: 'Tailwind CSS' },
];

// new: short descriptions shown in tiny hover modal
const descriptionsOuter = [
  'Structured queries for storing & retrieving app data.',
  'Minimal web framework for building APIs on Node.',
  'Component-based UI library for fast, reactive interfaces.',
  'The language of the web — used for interactivity & logic.',
  'Typed superset of JS for safer, more maintainable code.',
];
const descriptionsInner = [
  'Predictable state container for complex front-end state.',
  'Server-side JavaScript runtime for backend logic & APIs.',
  'Utility-first CSS to build responsive UI quickly.',
];


export default function SkillsOrbit() {
  // Responsive SVG/orbit sizes
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  // use a ref for scroll to avoid re-rendering on every scroll event
  const scrollRef = useRef(0);
  const orbitRef = useRef(null);
  // hovered planet indexes (null = none)
  const [hoveredOuter, setHoveredOuter] = useState(null);
  const [hoveredInner, setHoveredInner] = useState(null);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 500) setDimensions({ width: 340, height: 260 });
      else if (w < 900) setDimensions({ width: 600, height: 400 });
      else setDimensions({ width: 900, height: 600 });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function onScroll() {
      scrollRef.current = window.scrollY || 0;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Orbit radii (responsive)
  const width = dimensions.width;
  const height = dimensions.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const orbits = [
    { radius: width * 0.38, count: skillsOuter.length },
    { radius: width * 0.26, count: skillsInner.length },
  ];

  // Helper to get icon positions on an arc
  // startAngle: degrees where the arc starts; span: how many degrees to cover (use 180 for top semicircle)
  function getOrbitPositions(radius, count, centerX, centerY, startAngle = -90, span = 360) {
    if (count <= 1) {
      const angle = startAngle + span / 2;
      const rad = (angle * Math.PI) / 180;
      return [{ x: centerX + radius * Math.cos(rad), y: centerY + radius * Math.sin(rad), angle }];
    }
    const angleStep = span / (count - 1);
    return Array.from({ length: count }).map((_, i) => {
      const angle = startAngle + i * angleStep;
      const rad = (angle * Math.PI) / 180;
      return {
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad),
        angle,
      };
    });
  }

  // Scroll-based rotation (parallax) with smooth animation
  const [outerRotation, setOuterRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);

  useEffect(() => {
    // slower single rAF loop: smaller target multipliers and gentler lerp for a slower orbit feel
    let animationFrame = 0;
    function animate() {
      const scrollVal = scrollRef.current;
      const targetOuter = scrollVal * 0.08;   // slower response
      const targetInner = scrollVal * -0.11;  // slower response
      const lerp = 0.04; // smaller lerp => slower smoothing
      setOuterRotation(prev => prev + ((targetOuter - prev) * lerp));
      setInnerRotation(prev => prev + ((targetInner - prev) * lerp));
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // compute positions along the top semicircle (start -180°, span 180°)
  const outerPositions = getOrbitPositions(orbits[0].radius, skillsOuter.length, centerX, centerY, -180, 180);
  const innerPositions = getOrbitPositions(orbits[1].radius, skillsInner.length, centerX, centerY, -180, 180);

  // helper to rotate a point around center by angleDeg (degrees)
  function rotatePoint(pt, angleDeg, cx, cy) {
    const rad = (angleDeg * Math.PI) / 180;
    const dx = pt.x - cx;
    const dy = pt.y - cy;
    const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
    return { x: cx + rx, y: cy + ry };
  }

  return (
  <section className="relative flex items-center justify-center min-h-[90vh] h-full bg-[#18191A] overflow-hidden">
      <Lines />
      {/* Subtle top semicircle orbits (background) */}
  <svg width={width} height={height} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" style={{zIndex:1, overflow:'visible'}}>
        {/* Outer top arc */}
        <path
          d={(() => {
            const r = orbits[0].radius;
            const x1 = centerX - r;
            const y1 = centerY;
            const x2 = centerX + r;
            const y2 = centerY;
            // use sweep-flag=1 so the arc goes above the center (top semicircle)
            return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
          })()}
          fill="none"
          stroke="#B6862C22"
          strokeWidth={width < 500 ? 2 : 5}
        />
        {/* Inner top arc */}
        <path
          d={(() => {
            const r = orbits[1].radius;
            const x1 = centerX - r;
            const y1 = centerY;
            const x2 = centerX + r;
            const y2 = centerY;
            return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
          })()}
          fill="none"
          stroke="#B6862C22"
          strokeWidth={width < 500 ? 1.5 : 3}
        />
      </svg>

      {/* Outer Orbit Planets */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: width,
            height: height,
            transform: `translate(-50%, -50%) rotate(${outerRotation}deg)`,
            transformOrigin: '50% 50%',
            transition: 'width 0.2s, height 0.2s',
          }}
        >
          {outerPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: pos.x - 48,
                top: pos.y - 48,
                width: 96,
                height: 96,
                pointerEvents: 'auto',
                zIndex: hoveredOuter === i ? 60 : 30, // raised z-index; higher when hovered
              }}
              onMouseEnter={() => setHoveredOuter(i)}
              onMouseLeave={() => setHoveredOuter(null)}
            >
              <div className="bg-[#232425] border-4 border-[#B6862C66] rounded-full shadow-xl flex items-center justify-center w-24 h-24 hover:scale-110 transition-transform duration-200">
                <img src={skillsOuter[i].icon} alt={skillsOuter[i].label} className="w-14 h-14 object-contain" />
              </div>
            </div>
           ))}
        </div>
      </div>

      {/* Inner Orbit Planets */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: width,
            height: height,
            transform: `translate(-50%, -50%) rotate(${innerRotation}deg)`,
            transformOrigin: '50% 50%',
            transition: 'width 0.2s, height 0.2s',
          }}
        >
          {innerPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: pos.x - 44,
                top: pos.y - 44,
                width: 88,
                height: 88,
                pointerEvents: 'auto',
                zIndex: hoveredInner === i ? 60 : 30, // raised z-index; higher when hovered
              }}
              onMouseEnter={() => setHoveredInner(i)}
              onMouseLeave={() => setHoveredInner(null)}
            >
              <div className="bg-[#232425] border-4 border-[#B6862C66] rounded-full shadow-xl flex items-center justify-center w-[88px] h-[88px] hover:scale-110 transition-transform duration-200">
                <img src={skillsInner[i].icon} alt={skillsInner[i].label} className="w-12 h-12 object-contain" />
              </div>
            </div>
           ))}
        </div>
      </div>

      {/* Overlay Orbits (visible top semicircles, behind planets) */}
      <svg
        width={width}
        height={height}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 3, overflow: 'visible' }}
      >
        <path
          d={(() => {
            const r = orbits[0].radius;
            const x1 = centerX - r;
            const y1 = centerY;
            const x2 = centerX + r;
            const y2 = centerY;
            return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
          })()}
          fill="none"
          stroke="#B6862C44"
          strokeWidth={width < 500 ? 3 : 6}
          strokeLinecap="round"
        />
        <path
          d={(() => {
            const r = orbits[1].radius;
            const x1 = centerX - r;
            const y1 = centerY;
            const x2 = centerX + r;
            const y2 = centerY;
            return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
          })()}
          fill="none"
          stroke="#B6862C33"
          strokeWidth={width < 500 ? 2 : 4}
          strokeLinecap="round"
        />
      </svg>

      {/* Upright overlay tooltip(s) — non-rotating, uses orbit positions so tooltip stays readable */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: width, height: height, zIndex: 4 }}
      >
        {hoveredOuter !== null && (() => {
          // rotate original orbit position by the current outerRotation so tooltip matches visual planet
          const orig = outerPositions[hoveredOuter];
          const pos = rotatePoint(orig, outerRotation, centerX, centerY);
           return (
             <div
               style={{
                 position: 'absolute',
                 left: pos.x,
                 top: pos.y - 48, // above planet center
                 transform: 'translate(-50%, -100%)',
                 pointerEvents: 'none',
                 zIndex: 40,
               }}
             >
               <div className="w-44 bg-[#0f1112] text-xs text-zinc-200 p-2 rounded-md border border-[#B6862C33]">
                 <div className="font-semibold text-[#B6862C] text-sm">{skillsOuter[hoveredOuter].label}</div>
                 <div className="mt-1 leading-tight">{descriptionsOuter[hoveredOuter]}</div>
               </div>
             </div>
           );
         })()}

         {hoveredInner !== null && (() => {
          // rotate original orbit position by the current innerRotation so tooltip matches visual planet
          const orig = innerPositions[hoveredInner];
          const pos = rotatePoint(orig, innerRotation, centerX, centerY);
           return (
             <div
               style={{
                 position: 'absolute',
                 left: pos.x,
                 top: pos.y - 44,
                 transform: 'translate(-50%, -100%)',
                 pointerEvents: 'none',
                 zIndex: 40,
               }}
             >
               <div className="w-40 bg-[#0f1112] text-xs text-zinc-200 p-2 rounded-md border border-[#B6862C33]">
                 <div className="font-semibold text-[#B6862C] text-sm">{skillsInner[hoveredInner].label}</div>
                 <div className="mt-1 leading-tight">{descriptionsInner[hoveredInner]}</div>
               </div>
             </div>
           );
         })()}
      </div>

      {/* Center Figure */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 w-full">
        <div className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#B6862C33] rounded-full blur-xl" style={{zIndex:0}} />
          <img
            src={profilePic}
            alt="Avatar"
            className="relative z-10 w-44 h-44 object-contain rounded-full border-4 border-[#B6862C] bg-[#232425] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function Lines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Outer frame (like the red guide lines in the screenshot) */}
      <div className="absolute left-2 right-2 top-2 bottom-[50px]">
        <span className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
      </div>
      {/* Inner gutter lines */}
      <span className="absolute top-0 bottom-0 left-10 w-px bg-white/10" />
      <span className="absolute top-0 bottom-0 right-10 w-px bg-white/10" />
    </div>
  );
}