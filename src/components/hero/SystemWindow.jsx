import { LogoMark } from '../ui/primitives';

/*
 * The "after" picture: one calm app instead of the scraps. Every module registers itself (reg) so the scraps can fly
 * into it, and the live bits (counters, sparkline, sync chip) hand their nodes to the hero (boot) to animate.
 */
const panel = 'rounded-[12px] border border-paper/[0.07] bg-paper/[0.025] transition-[box-shadow] duration-300';

export default function SystemWindow({ ui, reg, boot }) {
  if (!ui || typeof ui !== 'object') return null;
  const status = ui.status ?? {};
  const tone = { inProd: 'bg-paper/10 text-ink-200', approved: 'bg-lime/15 text-lime', shipped: 'bg-paper/[0.06] text-ink-300', waiting: 'bg-[#F2A33A]/15 text-[#F2A33A]' };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-paper/[0.1] bg-[#0D0D0D] text-paper shadow-[0_60px_160px_-40px_rgba(0,0,0,0.95)]">
      {/* title bar */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-paper/[0.07] px-4">
        <span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-paper/[0.12]" />)}</span>
        <span className="text-[12.5px] font-medium">{ui.app}</span>
        <span className="hidden text-[12px] text-ink-400 sm:inline">/ {ui.crumb}</span>
        <span ref={(el) => { boot.current.sync = el; }} className="ml-auto flex items-center gap-1.5 rounded-full bg-paper/[0.06] px-2.5 py-1 text-[11px] font-medium text-ink-300 transition-colors duration-500">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          <span ref={(el) => { boot.current.syncText = el; }}>{ui.syncing}</span>
        </span>
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[164px_1fr]">
        {/* sidebar */}
        <aside ref={reg('sidebar')} className="hidden flex-col gap-0.5 border-r border-paper/[0.07] p-3 lg:flex">
          <div className="mb-3 flex items-center gap-2 px-2 pt-1 text-[12px] font-medium"><LogoMark className="h-4 w-4" /> {ui.ws}</div>
          {Array.isArray(ui.nav) && ui.nav.map((n, i) => (
            <span key={n} className={`rounded-lg px-2.5 py-1.5 text-[12.5px] ${i === 1 ? 'bg-paper/[0.07] text-paper' : 'text-ink-400'}`}>{n}</span>
          ))}
        </aside>

        <div className="flex min-h-0 flex-col gap-3 p-3 sm:p-4">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            <div ref={reg('kpiRevenue')} className={`${panel} relative overflow-hidden p-3`}>
              <p className="truncate text-[11px] text-ink-400">{ui.revenue}</p>
              <p ref={(el) => { boot.current.rev = el; }} className="mt-1.5 text-[clamp(15px,1.5vw,24px)] font-medium tabular-nums tracking-[-0.03em]">0</p>
              <svg viewBox="0 0 120 28" className="absolute bottom-2 right-2 hidden h-6 w-[42%] sm:block" aria-hidden="true">
                <path ref={(el) => { boot.current.chart = el; }} pathLength="1" d="M2 24 L18 20 L32 22 L48 14 L62 16 L78 9 L92 11 L106 5 L118 3" fill="none" stroke="#C8FF2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset="1" />
              </svg>
            </div>
            <div ref={reg('kpiOpen')} className={`${panel} p-3`}>
              <p className="truncate text-[11px] text-ink-400">{ui.open}</p>
              <p ref={(el) => { boot.current.open = el; }} className="mt-1.5 text-[clamp(15px,1.5vw,24px)] font-medium tabular-nums tracking-[-0.03em]">0</p>
            </div>
            <div ref={reg('kpiOverdue')} className={`${panel} p-3`}>
              <p className="truncate text-[11px] text-ink-400">{ui.overdue}</p>
              <p ref={(el) => { boot.current.overdue = el; }} className="mt-1.5 text-[clamp(15px,1.5vw,24px)] font-medium tabular-nums tracking-[-0.03em] text-lime">0</p>
            </div>
          </div>

          {/* orders + activity */}
          <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[1.55fr_1fr]">
            <div ref={reg('orders')} className={`${panel} min-h-0 overflow-hidden`}>
              <div className="flex items-center justify-between border-b border-paper/[0.06] px-3 py-2 text-[11.5px]">
                <span className="font-medium">{ui.orders}</span>
                <span className="text-ink-500">{ui.ordersMeta}</span>
              </div>
              {Array.isArray(ui.rows) && ui.rows.map(([client, no, st]) => (
                <div key={no} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-paper/[0.04] px-3 py-[7px] text-[11.5px] last:border-0">
                  <span className="truncate text-ink-100">{client}</span>
                  <span className="tabular-nums text-ink-500">{no}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone[st] ?? tone.inProd}`}>{status[st]}</span>
                </div>
              ))}
            </div>
            <div ref={reg('feed')} className={`${panel} hidden min-h-0 overflow-hidden p-3 sm:block`}>
              <p className="text-[11.5px] font-medium">{ui.activity}</p>
              <ul className="mt-2.5 space-y-2.5">
                {Array.isArray(ui.feed) && ui.feed.map((f, i) => (
                  <li key={f} className="flex gap-2 text-[11px] leading-snug text-ink-300">
                    <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? 'bg-lime' : 'bg-paper/25'}`} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* this week */}
          <div ref={reg('schedule')} className={`${panel} hidden items-center gap-3 px-3 py-2.5 sm:flex`}>
            <span className="w-16 shrink-0 text-[11px] text-ink-400">{ui.week}</span>
            <div className="grid flex-1 grid-cols-5 gap-2">
              {Array.isArray(ui.days) && ui.days.map((d, i) => (
                <div key={d}>
                  <p className="text-[10px] text-ink-500">{d}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-paper/[0.06]">
                    <div className={`h-full rounded-full ${i === 2 ? 'bg-lime' : 'bg-paper/30'}`} style={{ width: `${[70, 45, 90, 30, 55][i]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
