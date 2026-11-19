import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, BarChart3, Boxes, CalendarDays, Check, CheckCheck, FileText, Lock, Package, Plus, Users, Wallet, X } from 'lucide-react';
import { LogoMark, Roll } from '../ui/primitives';
import { useScrollTo } from '../Nav';

/*
 * The end of the Work run: "The next one could be yours."
 * The visitor picks what their team still does by hand, and the system on the right builds itself from the picks:
 * every module prints in with the hero's scan line, the sidebar and the phone follow, and the rest of the grid slides
 * to make room. The button then carries the picks to the contact form (an `ah:brief` event fills in its message).
 *
 * Work.jsx owns the motion that depends on scroll: it turns the window and phone like the project slides, and adds
 * .is-in to the root once the slot is centred, which plays the entrance (headline, chips, modules printing in).
 */
const BUILD = [
  ['orders', Package], ['schedule', CalendarDays], ['invoices', FileText], ['reports', BarChart3],
  ['inventory', Boxes], ['approvals', CheckCheck], ['portal', Users], ['payroll', Wallet],
];
const ICON = Object.fromEntries(BUILD);
const START = ['orders', 'invoices', 'reports'];
const ORDER = BUILD.map(([k]) => k);
// a bento: two rows at most; with an odd count the first module takes two columns
const colsFor = (n) => (n <= 1 ? 1 : n === 4 ? 2 : Math.ceil(n / 2));
// the headline number on each module (made up, like the rest of the window): [value, kind]
const METRIC = { orders: [128, 'n'], schedule: [24, 'n'], invoices: [96, '%'], reports: [18, '+%'], inventory: [1204, 'n'], approvals: [3, 'n'], portal: [312, 'n'], payroll: [24, 'n'] };
const fill = (s, vars) => String(s ?? '').replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const bar = 'block shrink-0 rounded-full bg-paper/[0.1]';

/** A small, wordless picture of each module, so any combination reads as a real app. */
function Viz({ k }) {
  switch (k) {
    case 'orders':
      return (
        <div className="flex flex-col justify-end gap-2">
          {[['72%', 'bg-lime/85'], ['56%', 'bg-paper/25'], ['64%', 'bg-paper/25'], ['48%', 'bg-paper/15']].map(([w, pill], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-paper/[0.08]" />
              <span className={`${bar} h-1.5`} style={{ width: w }} />
              <span className={`ml-auto h-2.5 w-7 shrink-0 rounded-full ${pill}`} />
            </div>
          ))}
        </div>
      );
    case 'schedule':
      return (
        <div className="grid h-full grid-cols-5 gap-1.5">
          {[[[6, 30]], [[18, 26], [56, 24]], [[34, 34]], [[8, 22], [46, 30]], [[26, 28]]].map((blocks, i) => (
            <div key={i} className="relative rounded-[4px] bg-paper/[0.03]">
              {blocks.map(([t, h], j) => (
                <span key={j} className={`absolute inset-x-[3px] rounded-[3px] ${i === 1 && j === 1 ? 'bg-lime/85' : 'bg-paper/[0.14]'}`} style={{ top: `${t}%`, height: `${h}%` }} />
              ))}
            </div>
          ))}
        </div>
      );
    case 'invoices':
      return (
        <div className="flex flex-col justify-end gap-2">
          {['40%', '52%', '34%', '46%'].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`${bar} h-1.5`} style={{ width: w }} />
              <span className={`${bar} ml-auto h-1.5 w-8 bg-paper/20`} />
              <span className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full ${i < 3 ? 'bg-lime text-ink' : 'border border-paper/25'}`}>
                {i < 3 && <Check className="h-2 w-2" strokeWidth={4} />}
              </span>
            </div>
          ))}
        </div>
      );
    case 'reports':
      return (
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="slot-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#C8FF2E" stopOpacity="0.3" /><stop offset="1" stopColor="#C8FF2E" stopOpacity="0" /></linearGradient>
          </defs>
          {[20, 40, 60, 80].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="40" stroke="#F2F2EE" strokeOpacity="0.05" vectorEffect="non-scaling-stroke" />)}
          <path d="M0 34 L12 30 L24 32 L38 22 L50 25 L64 15 L76 18 L88 9 L100 5 L100 40 L0 40 Z" fill="url(#slot-area)" />
          <path d="M0 34 L12 30 L24 32 L38 22 L50 25 L64 15 L76 18 L88 9 L100 5" fill="none" stroke="#C8FF2E" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case 'inventory':
      return (
        <div className="flex flex-col justify-end gap-2.5">
          {[[84, false], [62, false], [92, true], [40, false]].map(([w, on], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`${bar} h-1.5 w-6 bg-paper/[0.08]`} />
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-paper/[0.05]"><span className={`block h-full rounded-full ${on ? 'bg-lime/85' : 'bg-paper/25'}`} style={{ width: `${w}%` }} /></span>
            </div>
          ))}
        </div>
      );
    case 'approvals':
      return (
        <div className="flex flex-col justify-end gap-2.5">
          {[true, false, false].map((done, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`h-4 w-4 shrink-0 rounded-full ${i === 0 ? 'bg-lime/85' : 'bg-paper/15'}`} />
              <span className={`${bar} h-1.5`} style={{ width: ['46%', '38%', '52%'][i] }} />
              <span className={`ml-auto grid h-4 w-4 shrink-0 place-items-center rounded-full ${done ? 'bg-lime text-ink' : 'border border-paper/25 text-paper/50'}`}><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-paper/15 text-paper/30"><X className="h-2.5 w-2.5" strokeWidth={3} /></span>
            </div>
          ))}
        </div>
      );
    case 'portal':
      return (
        <div className="flex h-full items-end justify-center">
          <div className="flex w-[78%] max-w-[150px] flex-col items-center gap-2 rounded-[8px] border border-paper/[0.08] bg-paper/[0.03] px-3 py-2.5">
            <span className="h-5 w-5 rounded-full bg-paper/20" />
            <span className={`${bar} h-1.5 w-3/4`} />
            <span className={`${bar} h-1.5 w-1/2 bg-paper/[0.07]`} />
            <span className="mt-0.5 block h-3 w-full rounded-full bg-lime/85" />
          </div>
        </div>
      );
    case 'payroll':
      return (
        <div className="flex flex-col justify-end gap-2.5">
          <span className="flex items-center gap-1.5">
            <span className="grid h-5 place-items-center rounded-full bg-lime px-2 text-ink"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
            <span className={`${bar} h-1.5 w-1/3`} />
          </span>
          <span className="flex -space-x-1.5">{[0, 1, 2, 3].map((i) => <span key={i} className={`h-5 w-5 rounded-full border-2 border-[#151515] ${i === 0 ? 'bg-paper/40' : 'bg-paper/20'}`} />)}</span>
          <span className={`${bar} h-2 w-4/5 bg-paper/[0.14]`} />
        </div>
      );
    default:
      return null;
  }
}

export default function Slot({ refs }) {
  const { t, i18n } = useTranslation();
  const go = useScrollTo();
  const next = t('work.next');
  const names = t('work.build') ?? {};
  const [sel, setSel] = useState(START);
  const [born, setBorn] = useState([]); // picked after the entrance: these print in straight away
  const cells = useRef({});
  const before = useRef(null);

  // the rest of the grid glides to its new place when a module comes or goes (FLIP)
  const toggle = (k) => {
    before.current = Object.fromEntries(Object.entries(cells.current).filter(([, el]) => el).map(([key, el]) => [key, el.getBoundingClientRect()]));
    setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : ORDER.filter((x) => x === k || s.includes(x))));
    setBorn((b) => (b.includes(k) ? b : [...b, k]));
  };
  useIsoLayoutEffect(() => {
    const prev = before.current;
    if (!prev) return;
    before.current = null;
    Object.entries(cells.current).forEach(([k, el]) => {
      if (!el || !prev[k] || typeof el.animate !== 'function') return;
      const a = prev[k];
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      const dx = a.left - b.left; const dy = a.top - b.top;
      const sx = a.width / b.width; const sy = a.height / b.height;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) return;
      el.animate(
        [{ transformOrigin: '0 0', transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transformOrigin: '0 0', transform: 'none' }],
        { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    });
  }, [sel]);

  const n = sel.length;
  const cols = colsFor(n);
  const cta = n === 0 ? t('work.slotCta0') : n === 1 ? t('work.slotCta1') : fill(t('work.slotCta'), { n });
  const start = () => {
    if (n) {
      const list = sel.map((k) => names[k] ?? k);
      let text;
      try { text = new Intl.ListFormat(i18n.language === 'de' ? 'de-DE' : 'en-GB', { type: 'conjunction' }).format(list); } catch { text = list.join(', '); }
      window.dispatchEvent(new CustomEvent('ah:brief', { detail: { text: fill(t('work.slotBrief'), { list: text }) } }));
    }
    go('contact-form');
  };
  const delay = (k, i) => (born.includes(k) ? '0ms' : `${380 + i * 120}ms`);
  const num = new Intl.NumberFormat(i18n.language === 'de' ? 'de-DE' : 'en-GB');
  const metric = (k) => {
    const [v, kind] = METRIC[k] ?? [0, 'n'];
    if (kind === '%') return `${num.format(v)}${i18n.language === 'de' ? ' %' : '%'}`;
    if (kind === '+%') return `+${num.format(v)}${i18n.language === 'de' ? ' %' : '%'}`;
    return num.format(v);
  };

  return (
    <div ref={refs.root} className="slot ml-[5vw] flex h-full w-[100vw] shrink-0 items-center px-[max(20px,6vw)] text-ink">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-[5vw]">
        {/* the invitation */}
        <div>
          <div className="slot-fade flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-lime"><Plus className="h-3 w-3" strokeWidth={2.75} /></span>
            {t('work.slotTag')}
          </div>
          {Array.isArray(next) && (
            <p className="mt-5 text-[clamp(2.8rem,5.2vw,7.4rem)] font-medium leading-[0.9] tracking-[-0.06em]">
              <span className="slot-line"><span>{next[0]}</span></span>
              <span className="slot-line"><span className="font-serif font-normal italic tracking-[-0.03em]">{next[1]}</span></span>
            </p>
          )}
          <p className="slot-fade mt-6 max-w-[40ch] text-[16px] font-medium leading-relaxed text-ink/75 lg:text-[17px]">{t('work.slotBody')}</p>

          <p className="slot-fade mt-7 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink/55">{t('work.slotPick')}</p>
          <div className="mt-3 flex max-w-[600px] flex-wrap gap-2">
            {BUILD.map(([k], i) => {
              const on = sel.includes(k);
              return (
                <button key={k} type="button" aria-pressed={on} onClick={() => toggle(k)} className={`slot-chip ${on ? 'is-on' : ''}`} style={{ '--i': i }}>
                  <span className="slot-chip-mark">{on ? <Check className="h-3 w-3" strokeWidth={3.25} /> : <Plus className="h-3 w-3" strokeWidth={2.75} />}</span>
                  {names[k] ?? k}
                </button>
              );
            })}
          </div>

          <button type="button" onClick={start} className="slot-fade btn group mt-8 bg-ink text-lime hover:bg-ink-800" style={{ '--i': 9 }}>
            <Roll>{cta}</Roll> <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* the system it becomes */}
        <div aria-hidden="true" data-nosnippet="" className="relative hidden h-[min(64svh,660px)] lg:block">
          <div ref={refs.win} className="absolute bottom-[7%] left-0 right-[9%] top-0 flex flex-col overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0D0D0D] text-paper shadow-[0_60px_120px_-40px_rgba(10,10,10,0.75)] will-change-transform">
            <div className="flex h-10 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-[linear-gradient(180deg,#171718,#111112)] px-4">
              <span className="flex gap-1.5">{[0, 1, 2].map((d) => <span key={d} className="h-2.5 w-2.5 rounded-full bg-paper/[0.12]" />)}</span>
              <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-ink-300">
                <Lock className="h-3 w-3 shrink-0" /><span className="truncate">{t('work.slotUrl')}</span><span className="h-3.5 w-px animate-blink bg-lime" />
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-lime/[0.12] px-2.5 py-1 text-[10.5px] font-medium tabular-nums text-lime">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" />
                {n === 1 ? t('work.slotModules1') : fill(t('work.slotModules'), { n })}
              </span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[150px_1fr]">
              <aside className="flex min-h-0 flex-col gap-0.5 border-r border-white/[0.07] p-3">
                <div className="mb-3 flex items-center gap-2 px-2 pt-1 text-[12px] font-medium"><LogoMark className="h-4 w-4" /> {t('work.slotWs')}</div>
                {sel.map((k, i) => {
                  const Icon = ICON[k];
                  return (
                    <span key={k} className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12px] ${i === 0 ? 'bg-paper/[0.07] text-paper' : 'text-ink-400'} ${born.includes(k) ? 'slot-side-in' : ''}`}>
                      {i === 0 && <span className="absolute -left-3 top-1.5 h-[calc(100%-12px)] w-[2px] rounded-full bg-lime" />}
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} /> <span className="truncate">{names[k]}</span>
                    </span>
                  );
                })}
              </aside>
              <div className="relative min-h-0 p-4">
                {n === 0 ? (
                  <div className="grid h-full place-items-center rounded-[12px] border border-dashed border-paper/[0.14]">
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-400"><Plus className="h-3.5 w-3.5" /> {t('work.slotEmpty')}</span>
                  </div>
                ) : (
                  <div className="grid h-full gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: 'minmax(0, 1fr)' }}>
                    {sel.map((k, i) => {
                      const Icon = ICON[k];
                      return (
                        <div key={k} ref={(el) => { cells.current[k] = el; }} className="slot-cell min-h-0" style={i === 0 && n % 2 && n > 1 ? { gridColumn: 'span 2' } : undefined}>
                          <div className="slot-tile" style={{ '--d': delay(k, i) }}>
                            <div className="flex items-center gap-2">
                              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-lime/[0.12] text-lime"><Icon className="h-3 w-3" strokeWidth={2} /></span>
                              <span className="truncate text-[11.5px] font-medium">{names[k]}</span>
                              <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-lime/70" />
                            </div>
                            <p className="mt-2.5 text-[clamp(16px,1.5vw,24px)] font-medium tabular-nums leading-none tracking-[-0.03em]">{metric(k)}</p>
                            <div className="mt-3 flex min-h-0 flex-1 flex-col justify-end overflow-hidden"><Viz k={k} /></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* the phone version */}
          <div ref={refs.phone} className="frag-card hit-ring absolute bottom-0 right-0 w-[19%] max-w-[210px] rounded-[30px] border border-white/[0.12] bg-[#0b0b0c] p-[5px] will-change-transform">
            <div className="relative flex aspect-[390/844] flex-col gap-2 overflow-hidden rounded-[25px] bg-ink-950 px-3 pb-3 pt-8 text-paper">
              <span className="absolute left-1/2 top-[7px] h-[13px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
              <p className="text-[8.5px] uppercase tracking-[0.08em] text-ink-500">{t('work.slotPhone')}</p>
              <p className="text-[13px] font-medium leading-tight">{t('work.slotWs')}</p>
              {sel.slice(0, 4).map((k, i) => {
                const Icon = ICON[k];
                return (
                  <div key={k} className={`flex items-center gap-2 rounded-[10px] border p-2 ${i === 0 ? 'border-lime/50 bg-lime/[0.07]' : 'border-paper/[0.07] bg-paper/[0.03]'} ${born.includes(k) ? 'slot-side-in' : ''}`}>
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-lime/[0.12] text-lime"><Icon className="h-3 w-3" strokeWidth={2} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[9.5px] font-medium">{names[k]}</span>
                      <span className="mt-1 block h-1 w-3/4 rounded-full bg-paper/[0.1]" />
                    </span>
                  </div>
                );
              })}
              <span className="mt-auto block h-7 rounded-full bg-lime" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
