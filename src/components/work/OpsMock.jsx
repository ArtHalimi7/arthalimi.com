import { LogoMark } from '../ui/primitives';

/*
 * The case study that can't be shown: a production board and its phone view, drawn from the hero's kit with made-up
 * creators, people and posts. Nothing here is a screenshot or copy of the real system.
 * The story it tells: Lena's edit ("Brake pads in 60 seconds") is the lime card on her phone, and on the board it has
 * just landed in QA.
 */
const panel = 'rounded-[10px] border border-paper/[0.07] bg-paper/[0.025]';
const HOT = [2, 0]; // column, card: the post that was just handed on

export function OpsBoard({ ui }) {
  if (!ui || typeof ui !== 'object') return null;
  const cols = Array.isArray(ui.cols) ? ui.cols : [];

  return (
    <div aria-hidden="true" data-nosnippet="" className="grid h-full min-h-0 select-none text-paper lg:grid-cols-[148px_1fr]">
      {/* sidebar */}
      <aside className="hidden flex-col gap-0.5 border-r border-paper/[0.07] p-3 lg:flex">
        <div className="mb-3 flex items-center gap-2 px-2 pt-1 text-[12px] font-medium"><LogoMark className="h-4 w-4" /> {ui.ws}</div>
        {Array.isArray(ui.nav) && ui.nav.map((n, i) => (
          <span key={n} className={`rounded-lg px-2.5 py-1.5 text-[12px] ${i === 0 ? 'bg-paper/[0.07] text-paper' : 'text-ink-400'}`}>{n}</span>
        ))}
        {/* what the steps add up to */}
        <div className="mt-auto space-y-2">
          <div className={`${panel} p-2.5`}>
            <p className="truncate text-[10px] text-ink-400">{ui.earnings}</p>
            <svg viewBox="0 0 120 28" className="mt-2 h-6 w-full" aria-hidden="true">
              <path d="M2 24 L18 21 L32 22 L48 15 L62 17 L78 10 L92 12 L106 6 L118 4" fill="none" stroke="#C8FF2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={`${panel} p-2.5`}>
            <p className="truncate text-[10px] text-ink-400">{ui.payroll}</p>
            <span className="mt-1.5 inline-block rounded-full bg-lime/15 px-2 py-0.5 text-[10px] font-medium text-lime">{ui.payrollValue}</span>
          </div>
        </div>
      </aside>

      <div className="flex min-h-0 flex-col gap-3 p-3 sm:p-4">
        {/* header */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium">{ui.board}</span>
          <span className="text-[12px] text-ink-500">{ui.week}</span>
          <span className="ml-auto hidden gap-1.5 sm:flex">
            {Array.isArray(ui.filters) && ui.filters.map((f, i) => (
              <span key={f} className={`rounded-full px-2.5 py-1 text-[10.5px] ${i === 0 ? 'bg-paper/[0.08] text-paper' : 'border border-paper/[0.08] text-ink-400'}`}>{f}</span>
            ))}
          </span>
        </div>

        {/* the steps */}
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2.5 lg:grid-cols-5">
          {cols.map((c, ci) => (
            <div key={c.name} className={`${panel} min-h-0 flex-col gap-2 overflow-hidden p-2 ${ci > 2 ? 'hidden lg:flex' : 'flex'}`}>
              <div className="flex items-center justify-between px-1 pt-0.5 text-[10px] text-ink-400">
                <span className="font-medium uppercase tracking-[0.06em]">{c.name}</span>
                <span className="tabular-nums">{c.n}</span>
              </div>
              {Array.isArray(c.cards) && c.cards.map(([ch, title, who, when], k) => {
                const hot = ci === HOT[0] && k === HOT[1];
                return (
                  <div key={title} className={`rounded-[8px] border p-2 ${hot ? 'border-lime/60 bg-lime/[0.07] shadow-[0_0_24px_-8px_rgba(200,255,46,0.45)]' : 'border-paper/[0.06] bg-[#141415]'}`}>
                    <p className="truncate text-[9.5px] text-ink-500">{ch}</p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-100">{title}</p>
                    {/* who has it now; once scheduled, when it goes out */}
                    <div className="mt-2 flex items-center gap-1.5 text-[9.5px] text-ink-400">
                      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8.5px] font-medium ${hot ? 'bg-lime text-ink' : 'bg-paper/10 text-paper'}`}>{who?.[0]}</span>
                      <span className="truncate tabular-nums">{ci === cols.length - 1 ? when : who}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* what just happened (the phone covers this row's right end, so it only holds the activity line) */}
        <div className={`${panel} hidden min-w-0 items-center gap-2.5 px-3 py-2.5 sm:flex`}>
          <span className="h-1.5 w-1.5 shrink-0 animate-pulseDot rounded-full bg-lime" />
          <span className="truncate text-[11px] text-ink-300">{ui.toast}</span>
        </div>
      </div>
    </div>
  );
}

export function OpsPhone({ ui }) {
  const p = ui && typeof ui === 'object' ? ui.phone : null;
  if (!p) return null;
  return (
    <div aria-hidden="true" data-nosnippet="" className="absolute inset-0 flex select-none flex-col gap-2 px-3 pb-3 pt-8 text-paper">
      <p className="truncate text-[8.5px] uppercase tracking-[0.08em] text-ink-500">{p.when}</p>
      <p className="text-[13px] font-medium leading-tight">{p.title}</p>
      {Array.isArray(p.cards) && p.cards.map(([ch, title, step], i) => (
        <div key={title} className={`rounded-[10px] border p-2 ${i === 0 ? 'border-lime/50 bg-lime/[0.07]' : 'border-paper/[0.07] bg-paper/[0.03]'}`}>
          <p className="truncate text-[8.5px] text-ink-500">{ch}</p>
          <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug">{title}</p>
          <span className="mt-1.5 inline-block rounded-full bg-paper/[0.07] px-1.5 py-0.5 text-[8px] text-ink-300">{step}</span>
        </div>
      ))}
      <span className="mt-auto flex items-center justify-center gap-1 rounded-full bg-lime py-2 text-[10px] font-medium text-ink">{p.cta} →</span>
    </div>
  );
}
