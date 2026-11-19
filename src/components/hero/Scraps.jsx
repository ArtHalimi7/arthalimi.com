import { startTransition, useEffect, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { useReduced } from '../../lib/motion';
import { FRAGS, Fragment } from './fragments';

const RING_R = { sticky: '4px', toast: '9999px', voice: '9999px' }; // outlines follow each scrap's corners
const TOUR = ['numbers', 'sheet', 'sticky', 'chat']; // diagnosed in turn while nobody's pointing (near, fully on screen)
const NEAR = 0.55; // only scraps this close (sharp enough to read) answer the pointer
const INTRO = 0.03; // the headline beat: before the hero starts moving things

/*
 * The scraps layer of the hero. Hero.jsx positions every scrap from the scroll (through `frags`); this component only
 * adds what happens while the headline is up, and touches none of the styles the hero writes:
 *   arrival    the scraps land like papers thrown onto a desk: from a little outside the pile, tilted, bigger than life
 *   live       the mess carries on by itself (fragments.jsx: typing, unread counts, a third revenue figure…)
 *   diagnosis  a lime tag names what each scrap costs the business ("Two versions of the truth"). It tours a few of
 *              them on its own; on desktop, pointing at a scrap diagnoses that one and brings it into focus.
 * All of it stops once the visitor scrolls into the story, and none of it runs with reduced motion.
 */
export default function Scraps({ layer, frags, data, words, p, ready }) {
  const reduced = useReduced();
  const [intro, setIntro] = useState(true);
  useMotionValueEvent(p, 'change', (v) => setIntro(v < INTRO));
  useEffect(() => { setIntro(p.get() < INTRO); }, [p]);
  const live = ready && intro && reduced === false;
  const ok = words && typeof words === 'object';

  const [hover, setHover] = useState(-1);
  const [tour, setTour] = useState(0);

  // nothing is tagged until the pile has landed
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!live) { setShown(false); return undefined; }
    const id = setTimeout(() => setShown(true), 1700);
    return () => clearTimeout(id);
  }, [live]);
  // the tour: one scrap at a time, paused while someone points at one
  useEffect(() => {
    if (!live || !shown || hover >= 0 || !ok) return undefined;
    const id = setInterval(() => startTransition(() => setTour((s) => (s + 1) % TOUR.length)), 2800);
    return () => clearInterval(id);
  }, [live, shown, hover, ok]);

  // pointing: hit-test the near scraps' boxes once a frame while the pointer moves (their layer takes no events)
  useEffect(() => {
    if (!live || !ok) { setHover(-1); return undefined; }
    let raf = 0;
    let x = -1;
    let y = -1;
    const test = () => {
      raf = 0;
      let hit = -1;
      let best = -1;
      frags.current.forEach((el, i) => {
        const f = FRAGS[i];
        if (!el || f.z < NEAR || !words[f.kind]) return;
        const r = el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && f.z > best) { hit = i; best = f.z; }
      });
      setHover(hit);
    };
    const move = (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(test);
    };
    const leave = () => setHover(-1);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [live, ok, frags, words]);

  const on = !live || !ok ? -1 : hover >= 0 ? hover : shown ? FRAGS.findIndex((f) => f.kind === TOUR[tour]) : -1;

  return (
    <div ref={layer} data-nosnippet="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
      {FRAGS.map((f, i) => {
        // thrown in: from a little further out from the pile than where it lands, tilted, bigger than life
        const throwFrom = { '--fx': `${Math.round((f.a.x - 78) * 7)}px`, '--fy': `${Math.round((f.a.y - 52) * 5 - 30)}px`, '--fr': `${(i % 2 ? 1 : -1) * (8 + (i % 3) * 5)}deg` };
        return (
          <div key={f.kind} ref={(el) => { frags.current[i] = el; }} className={`absolute left-0 top-0 opacity-0 will-change-transform ${on === i ? 'is-diag' : ''}`} style={{ width: f.w }}>
            <div className="frag-par" style={{ '--d': f.z }}>
              <div className="frag-in" style={{ transitionDelay: `${0.4 + i * 0.075}s`, ...throwFrom }}>
                <div className="frag-drift" style={{ animationDuration: `${7 + (i % 4) * 1.4}s`, animationDelay: `${-i * 1.7}s` }}>
                  <Fragment kind={f.kind} data={data?.[f.kind]} live={live} />
                  <i className="frag-ring" style={{ '--r': RING_R[f.kind] ?? '14px' }} />
                  <i className="frag-hot" style={{ '--r': RING_R[f.kind] ?? '14px' }} />
                  {ok && words[f.kind] && <span className="frag-diag"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />{words[f.kind]}</span>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
