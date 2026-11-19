import { useEffect, useRef, useState } from 'react';

/*
 * The cut card: a rounded card whose outline is drawn to its measured size, with an optional tab rising from its
 * top-left and a notch cut out of its bottom edge for its button, either at the right-hand corner or as a pocket in
 * the middle. Every place a cut meets an edge is filleted, and the notch runs concentric with the button's rounded
 * ends. Used by the contact form, the studio card and the footer; ui/cut.jsx draws it.
 *
 *   const cut = useCut();
 *   <div ref={cut.box} className="relative pt-11">          ← the whole shape, tab included
 *     <CutShape dims={cut.dims} />
 *     <div ref={cut.tab} className="absolute left-0 top-0 h-11">…</div>
 *     …
 *     <button ref={cut.btn} className="absolute bottom-0 right-0">…</button>
 *   </div>
 */
const RT = 14; // the tab's top-right corner
const F = 14; // fillets where a cut meets an edge
export const GAP = 10; // between the button and the notch

export function cutPath({ w, h, tw = 0, th = 0, bw = 0, bh = 0 }, { r = 28, notch = 'right' } = {}) {
  const rho = bh / 2 + GAP; // the notch's curve, around the button's rounded end
  const p = [`M0 ${r}`, `A${r} ${r} 0 0 1 ${r} 0`];
  if (tw) p.push(`H${tw - RT}`, `A${RT} ${RT} 0 0 1 ${tw} ${RT}`, `V${th - F}`, `A${F} ${F} 0 0 0 ${tw + F} ${th}`);
  p.push(`H${w - r}`, `A${r} ${r} 0 0 1 ${w} ${th + r}`);
  if (bw && notch === 'right') {
    p.push(
      `V${h - bh - GAP - F}`,
      `A${F} ${F} 0 0 1 ${w - F} ${h - bh - GAP}`,
      `H${w - bw + bh / 2}`,
      `A${rho} ${rho} 0 0 0 ${w - bw - GAP} ${h - bh / 2}`,
      `V${h - F}`,
      `A${F} ${F} 0 0 1 ${w - bw - GAP - F} ${h}`,
    );
  } else {
    p.push(`V${h - r}`, `A${r} ${r} 0 0 1 ${w - r} ${h}`);
    if (bw && notch === 'center') {
      const x0 = (w - bw) / 2;
      const x1 = x0 + bw;
      p.push(
        `H${x1 + GAP + F}`,
        `A${F} ${F} 0 0 1 ${x1 + GAP} ${h - F}`,
        `V${h - bh / 2}`,
        `A${rho} ${rho} 0 0 0 ${x1 - bh / 2} ${h - bh - GAP}`,
        `H${x0 + bh / 2}`,
        `A${rho} ${rho} 0 0 0 ${x0 - GAP} ${h - bh / 2}`,
        `V${h - F}`,
        `A${F} ${F} 0 0 1 ${x0 - GAP - F} ${h}`,
      );
    }
  }
  p.push(`H${r}`, `A${r} ${r} 0 0 1 0 ${h - r}`, 'Z');
  return p.join(' ');
}

/** Measures the box, its tab and its button (any of the last two may be left off), and keeps measuring. */
export function useCut() {
  const box = useRef(null);
  const tab = useRef(null);
  const btn = useRef(null);
  const [dims, setDims] = useState(null);
  useEffect(() => {
    if (!box.current) return undefined;
    const ro = new ResizeObserver(() => setDims({
      w: box.current.offsetWidth, h: box.current.offsetHeight,
      tw: tab.current?.offsetWidth ?? 0, th: tab.current?.offsetHeight ?? 0,
      bw: btn.current?.offsetWidth ?? 0, bh: btn.current?.offsetHeight ?? 0,
    }));
    [box, tab, btn].forEach((el) => el.current && ro.observe(el.current));
    return () => ro.disconnect();
  }, []);
  return { box, tab, btn, dims };
}
