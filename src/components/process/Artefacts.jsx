import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

/*
 * What each step of the process leaves you with, drawn from the hero's kit. Each one comes alive when the lime line
 * reaches its step (`on`, from Process.jsx) and settles back if you scroll up past it again. Until then it shows
 * faintly, like the hero's blueprint, so no step ever looks empty.
 *   Map     the process, step by step, with what's still done by hand found and marked
 *   Build   a release a week, the newest one open to click on
 *   Launch  the new system switched on next to the old way; a beat later the spreadsheets go off
 *   Run     a monitor with a heartbeat, and the fixes and improvements that keep shipping
 * Lime is the fix, amber is still done by hand (as in the hero and the services stage).
 */
const frame = 'relative h-[150px] overflow-hidden rounded-[14px] border border-paper/[0.07] bg-[linear-gradient(180deg,#151515,#0f0f0f)] p-3.5';
const AMBER = '#E8B44A';
const HAND = [1, 2]; // the steps the map finds done by hand

function MapArt({ on, a }) {
  const steps = Array.isArray(a.map) ? a.map : [];
  return (
    <div className={frame}>
      <ol className="relative flex h-full flex-col justify-between">
        <span className="absolute bottom-[8px] left-[4.5px] top-[8px] w-px origin-top bg-paper/15 transition-transform duration-[900ms] ease-[cubic-bezier(.65,0,.35,1)]" style={{ transform: `scaleY(${on ? 1 : 0})` }} />
        {steps.map((label, i) => {
          const hand = HAND.includes(i);
          const delay = { transitionDelay: on ? `${i * 160}ms` : '0ms' };
          return (
            <li key={label} className="relative flex items-center gap-2.5">
              <span
                className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border transition-colors duration-500"
                style={{ ...delay, borderColor: on ? (hand ? AMBER : '#C8FF2E') : 'rgba(242,242,238,0.2)', backgroundColor: on ? (hand ? 'rgba(232,180,74,0.25)' : 'rgba(200,255,46,0.25)') : '#121212' }}
              />
              <span className={`truncate text-[11.5px] transition-colors duration-500 ${on ? 'text-ink-100' : 'text-ink-500'}`} style={delay}>{label}</span>
              {hand && (
                <span className={`ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[9.5px] font-medium transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: on ? `${500 + i * 160}ms` : '0ms', backgroundColor: 'rgba(232,180,74,0.15)', color: AMBER }}>
                  {a.hand}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function BuildArt({ on, a, build }) {
  // newest on top; they arrive oldest first, a week apart
  const rel = [['0.3', build.invoices, 3], ['0.2', build.approvals, 2], ['0.1', build.orders, 1]];
  return (
    <div className={frame}>
      <div className="flex h-full flex-col justify-between">
        {rel.map(([v, name, wk], i) => {
          const latest = i === 0;
          return (
            <div
              key={v}
              className={`flex min-w-0 items-center gap-2.5 rounded-[9px] border px-2.5 py-[7px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-25'} ${latest ? 'border-lime/40 bg-lime/[0.05]' : 'border-paper/[0.06] bg-paper/[0.02]'}`}
              style={{ transitionDelay: on ? `${(rel.length - 1 - i) * 230}ms` : '0ms' }}
            >
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-ink-400">v{v}</span>
              <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-100">{name}</span>
              {latest
                ? <span className="shrink-0 rounded-full bg-lime px-1.5 py-0.5 text-[9.5px] font-medium text-ink">{a.preview}</span>
                : <span className="flex shrink-0 items-center gap-1 text-[10px] text-ink-500">{a.week} {wk}<Check className="h-3 w-3 text-lime" strokeWidth={2.5} /></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ on, label, fix, off }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-500 ${on ? (fix ? 'bg-lime' : 'bg-paper/40') : 'bg-paper/[0.1]'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${on ? 'translate-x-[18px]' : 'translate-x-0.5'} ${on && fix ? 'bg-ink' : 'bg-paper'}`} />
      </span>
      <span className={`truncate text-[12px] transition-colors duration-500 ${off ? 'text-ink-500 line-through decoration-paper/30' : 'text-ink-100'}`}>{label}</span>
    </div>
  );
}

function LaunchArt({ on, a }) {
  const [over, setOver] = useState(false); // the spreadsheets are off
  useEffect(() => {
    if (!on) { setOver(false); return undefined; }
    const id = setTimeout(() => setOver(true), 1500);
    return () => clearTimeout(id);
  }, [on]);
  return (
    <div className={frame}>
      <div className="flex h-full flex-col justify-between">
        <Toggle on={!over} label={a.old} off={over} />
        <Toggle on={on} label={a.new} fix />
        <span className={`self-start rounded-full px-2 py-0.5 text-[10px] font-medium transition-[opacity,background-color,color] duration-500 ${on ? 'opacity-100' : 'opacity-25'} ${over ? 'bg-lime/15 text-lime' : 'bg-paper/[0.07] text-ink-200'}`}>
          {over ? a.switched : a.parallel}
        </span>
      </div>
    </div>
  );
}

function RunArt({ on, a }) {
  const rows = Array.isArray(a.runRows) ? a.runRows : [];
  const beat = 'M0 24 H46 L52 24 L57 9 L63 35 L68 19 L72 24 H122 L128 24 L133 11 L139 33 L144 21 L148 24 H200';
  return (
    <div className={frame}>
      <div className="flex items-center gap-2 text-[11.5px] text-ink-100">
        <span className={`h-1.5 w-1.5 rounded-full ${on ? 'animate-pulseDot bg-lime' : 'bg-paper/20'}`} />{a.ok}
      </div>
      <svg viewBox="0 0 200 44" preserveAspectRatio="none" className="mt-2 h-10 w-full" aria-hidden="true">
        <path d={beat} fill="none" stroke="rgba(242,242,238,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {on && <path d={beat} pathLength="1" fill="none" stroke="#C8FF2E" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" className="run-beat" />}
      </svg>
      <div className="mt-2.5 space-y-1.5">
        {rows.map((r, i) => (
          <div key={r} className={`flex items-center gap-2 text-[11px] transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-25'}`} style={{ transitionDelay: on ? `${600 + i * 260}ms` : '0ms' }}>
            <Check className="h-3 w-3 shrink-0 text-lime" strokeWidth={2.5} /><span className="truncate text-ink-200">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ARTS = [MapArt, BuildArt, LaunchArt, RunArt];

export default function Artefact({ i, on, a, build }) {
  const Art = ARTS[i];
  if (!Art || !a || typeof a !== 'object') return null;
  return <div aria-hidden="true" data-nosnippet="" className="select-none"><Art on={on} a={a} build={build && typeof build === 'object' ? build : {}} /></div>;
}
