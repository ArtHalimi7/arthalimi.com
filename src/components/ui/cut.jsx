import { useId } from 'react';
import { m } from 'framer-motion';
import { cutPath } from '../../lib/cut';

/**
 * The card's surface, absolutely filling the measured box. With no `fill` it's the dark panel gradient; `className`
 * styles the outline (stroke). `line` draws it half a pixel in so a 1px edge lands on whole pixels.
 * Pass `trace` (a key: change it to run again) and `play` for a lime light that runs once round the edge.
 */
export function CutShape({ dims, r, notch, fill, line = true, className = '', trace, play = false }) {
  const id = `cut${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  if (!dims) return null;
  const k = line ? 1 : 0;
  const d = cutPath({ ...dims, w: dims.w - k, h: dims.h - k }, { r, notch });
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <g transform={line ? 'translate(0.5 0.5)' : undefined}>
        {!fill && (
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#171717" stopOpacity="0.94" />
              <stop offset="1" stopColor="#0C0C0C" stopOpacity="0.94" />
            </linearGradient>
          </defs>
        )}
        <path d={d} fill={fill ?? `url(#${id})`} strokeWidth="1" className={className} />
        {trace !== undefined && (
          <m.path
            key={trace}
            d={d}
            fill="none"
            stroke="#C8FF2E"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={play ? { pathLength: 1, opacity: 0 } : {}}
            transition={{ pathLength: { duration: 1.8, ease: [0.65, 0, 0.35, 1] }, opacity: { delay: 1.5, duration: 0.9 } }}
          />
        )}
      </g>
    </svg>
  );
}
