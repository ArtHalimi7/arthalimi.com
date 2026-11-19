import { startTransition, useEffect, useRef, useState } from 'react';
import { BarChart3, CalendarDays, Check, FileText, LayoutGrid, Package, Search, Users, Zap } from 'lucide-react';
import { LogoMark } from '../ui/primitives';

/*
 * The "after" picture: one calm app instead of the scraps.
 *
 * It is built as a stack of layers so the hero can show it as an exploded 3D blueprint and then assemble it:
 *   base (the window frame, the blueprint floor)   tier 0: shell + sidebar   tier 1: orders, activity, week   tier 2: KPIs
 * Every module registers itself (reg) so the hero can move it in z and drive its state through CSS variables:
 *   --z     how far it floats above its slot (px)      --wire  its blueprint outline is visible
 *   --fill  0..1 how much of it has "printed"          --ex    the exploded-view guides (footprint, corner pins)
 *   --flash the lime ring when a scrap lands in it     --pl    the small print line is running
 * The live bits (counters, charts, sync chip) hand their nodes to the hero (boot). Once the system is up (live), a
 * small simulation keeps it working: a teammate approves orders, new orders arrive, automations post to the feed.
 */

export const MODS = {
  chrome: { tier: 0, id: 'app.shell' },
  sidebar: { tier: 0, id: 'nav' },
  schedule: { tier: 1, id: 'schedule.week' },
  orders: { tier: 1, id: 'orders.table' },
  feed: { tier: 1, id: 'activity.feed' },
  kpiRevenue: { tier: 2, id: 'kpi.revenue' },
  kpiOpen: { tier: 2, id: 'kpi.open' },
  kpiOverdue: { tier: 2, id: 'kpi.overdue' },
};

const ROW_H = 34;
const NAV_ICONS = [LayoutGrid, Package, Users, FileText, CalendarDays, BarChart3];
// the opening feed: [kind, who] and how many minutes ago, one per ui.feed line
const FEED_META = [['auto'], ['user', 'L'], ['auto'], ['auto'], ['order'], ['user', 'T']];
const FEED_AGES = [1, 4, 9, 16, 23, 31];
const TEAM = [['Lena', true], ['Tom', true], ['Maria', false]];
const REST = { row: 6.6, x: -96 }; // where the cursor idles, off the status pills
const AMOUNTS = [3200, 1480, 5650, 2240, 4120, 980, 2760];
const CYCLE = ['new', 'approve', 'advance', 'invoice', 'new', 'advance', 'approve', 'stock', 'advance', 'new', 'approve', 'report'];
const TICKS = [2, 1, 3, 2, 1, 2, 3];
const fill = (s, vars) => String(s ?? '').replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Mod({ k, reg, className = '', face = 'mod-panel', children }) {
  return (
    <div ref={reg(k)} className={`mod ${className}`}>
      <i className="mod-foot" />
      <i className="mod-pin" style={{ left: 0, top: 0 }} />
      <i className="mod-pin" style={{ left: '100%', top: 0 }} />
      <i className="mod-pin" style={{ left: 0, top: '100%' }} />
      <i className="mod-pin" style={{ left: '100%', top: '100%' }} />
      <div className="mod-wire">
        <span className="mod-tag">{MODS[k].id}</span>
        <span className="mod-sk" />
      </div>
      <div className={`mod-face ${face}`}>
        {children}
        <i className="mod-print" />
      </div>
      <i className="mod-ring" />
    </div>
  );
}

const tone = {
  new: 'bg-lime text-ink',
  approved: 'bg-lime/15 text-lime',
  inProd: 'bg-paper/10 text-ink-200',
  shipped: 'bg-paper/[0.06] text-ink-300',
  waiting: 'bg-[#F2A33A]/15 text-[#F2A33A]',
};

export default function SystemWindow({ ui, reg, boot, money }) {
  const ok = ui && typeof ui === 'object';
  const L = (ok && ui.live) || {};

  const [rows, setRows] = useState(() => (ok && Array.isArray(ui.rows) ? ui.rows : []).map(([client, no, st, amt]) => ({ id: no, client, no, st, amt, bump: 0, fresh: false })));
  const [feed, setFeed] = useState(() => (ok && Array.isArray(ui.feed) ? ui.feed : []).map((text, i) => ({ id: `f${i}`, text, kind: FEED_META[i]?.[0] ?? 'auto', who: FEED_META[i]?.[1], at: -(FEED_AGES[i] ?? 40), fresh: false })));
  const [clock, setClock] = useState(0);
  const [cur, setCur] = useState({ ...REST, click: 0, on: false });
  const [live, setLive] = useState(false); // switched by the hero (boot.current.setLive)
  const rowsRef = useRef(rows);
  rowsRef.current = rows;
  const sim = useRef({ step: 0, next: 2292, client: 0, amt: 0, clock: 0, invoiced: new Set() });

  // a fresh mount (first load, language switch) starts from the scripted numbers again
  useEffect(() => {
    const bt = boot.current;
    bt.delta = { open: 0, rev: 0 };
    // non-urgent: React can spread the re-render over frames instead of stalling the scroll
    bt.setLive = (v) => startTransition(() => setLive(v));
    setLive(bt.wantLive?.() ?? false); // remounted mid-page (a language switch): pick up where the hero is
    bt.repaint?.();
    const mine = bt.setLive;
    return () => { if (bt.setLive === mine) bt.setLive = undefined; };
  }, [boot]);

  // the system at work: one small event every few seconds while it's on screen
  useEffect(() => {
    if (!live || !ok || reducedMotion()) return undefined;
    let alive = true;
    const timers = [];
    // every event is a non-urgent update, so a scroll in progress always wins
    const later = (ms, fn) => timers.push(setTimeout(() => { if (alive) startTransition(fn); }, ms));
    const s = sim.current;
    const say = (text, kind, who) => setFeed((f) => [{ id: `l${s.step}-${s.clock}`, text, kind, who, at: s.clock, fresh: true }, ...f].slice(0, 10));
    const delta = () => (boot.current.delta ??= { open: 0, rev: 0 });
    const kpi = (key) => {
      boot.current.repaint?.();
      const el = boot.current[key];
      if (!el) return;
      el.classList.remove('kpi-bump');
      void el.offsetWidth; // restart the animation
      el.classList.add('kpi-bump');
    };
    const setRow = (id, patch) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch, bump: r.bump + 1 } : r)));

    const run = () => {
      const kind = CYCLE[s.step % CYCLE.length];
      s.step += 1;
      s.clock += TICKS[s.step % TICKS.length];
      setClock(s.clock);
      const rs = rowsRef.current;
      if (kind === 'new') {
        const client = L.clients?.[s.client % (L.clients?.length || 1)] ?? 'Becker & Co';
        const amt = AMOUNTS[s.amt % AMOUNTS.length];
        const no = `#${s.next}`;
        s.client += 1; s.amt += 1; s.next += 1;
        setRows((r) => [{ id: no, client, no, st: 'new', amt, bump: 0, fresh: true }, ...r].slice(0, 12));
        setCur((c) => ({ ...c, row: Math.min(c.row + 1, 8.6) }));
        say(fill(L.new, { no, client }), 'order');
        delta().open += 1; delta().rev += amt;
        kpi('open'); kpi('rev');
      } else if (kind === 'approve') {
        const i = rs.findIndex((r, j) => j < 7 && (r.st === 'waiting' || r.st === 'new'));
        if (i >= 0) {
          const r = rs[i];
          setCur((c) => ({ ...c, row: i, x: 0, on: true }));
          later(1050, () => {
            setCur((c) => ({ ...c, click: c.click + 1 }));
            setRow(r.id, { st: 'approved' });
            say(fill(L.approved, { who: L.who ?? 'Lena', no: r.no }), 'user', (L.who ?? 'L')[0]);
          });
          later(2100, () => setCur((c) => ({ ...c, row: c.row + 0.55, x: REST.x })));
        }
      } else if (kind === 'advance') {
        const i = rs.findIndex((r, j) => j < 8 && r.st === 'inProd');
        const k = rs.findIndex((r, j) => j < 8 && r.st === 'approved');
        if (i >= 0) {
          setRow(rs[i].id, { st: 'shipped' });
          say(fill(L.shipped, { no: rs[i].no }), 'order');
          delta().open -= 1;
          kpi('open');
        } else if (k >= 0) {
          setRow(rs[k].id, { st: 'inProd' });
          say(fill(L.production, { no: rs[k].no }), 'order');
        }
      } else if (kind === 'invoice') {
        const r = rs.find((x) => x.st === 'shipped' && !s.invoiced.has(x.id)) ?? rs[0];
        s.invoiced.add(r.id);
        say(fill(L.invoice, { no: r.no }), 'auto');
      } else {
        say(kind === 'stock' ? L.stock : L.report, 'auto');
      }
      later(2900, run);
    };
    later(700, () => setCur((c) => ({ ...c, on: true })));
    later(1400, run);
    return () => { alive = false; timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, ok]);

  if (!ok) return null;
  const status = ui.status ?? {};
  const ago = (at) => (clock - at <= 0 ? L.now ?? 'now' : fill(L.ago ?? '{n}m', { n: clock - at }));
  const b = (key) => (el) => { boot.current[key] = el; };

  return (
    <div className="p3d absolute inset-0">
      {/* the frame, and the blueprint it starts as */}
      <div ref={b('base')} className="sys-base absolute inset-0">
        <div className="sys-floor" />
        <div className="sys-solid" />
        <div className="sys-grid" />
        <div className="sys-title">
          <span className="flex items-center gap-2"><LogoMark className="h-3.5 w-3.5" /> {ui.app.toLowerCase()}.system</span>
          <span className="text-paper/40">build <span ref={b('built')} className="tabular-nums text-lime">0/8</span></span>
        </div>
      </div>

      <div className="p3d absolute inset-0 flex flex-col">
        {/* title bar */}
        <Mod k="chrome" reg={reg} className="h-11 shrink-0" face="mod-chrome">
          <div className="flex h-full items-center gap-3 px-4">
            <span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-paper/[0.12]" />)}</span>
            <span className="text-[12.5px] font-medium">{ui.app}</span>
            <span className="hidden text-[12px] text-ink-400 sm:inline">/ {ui.crumb}</span>
            <span className="mx-auto hidden w-[34%] items-center gap-2 rounded-lg border border-paper/[0.07] bg-paper/[0.03] px-2.5 py-1 text-[11px] text-ink-500 xl:flex">
              <Search className="h-3 w-3" /> {ui.search}
              <span className="ml-auto rounded border border-paper/10 px-1 font-mono text-[9.5px] text-ink-400">⌘K</span>
            </span>
            <span className="ml-auto flex items-center gap-3 xl:ml-0">
              <span className="hidden -space-x-1.5 sm:flex">
                {['L', 'T', 'M'].map((n, i) => (
                  <span key={n} className={`grid h-5 w-5 place-items-center rounded-full border border-[#0D0D0D] text-[9px] font-semibold ${i === 0 ? 'bg-lime text-ink' : 'bg-[#2a2a2a] text-ink-200'}`}>{n}</span>
                ))}
              </span>
              <span ref={b('sync')} className="flex items-center gap-1.5 rounded-full bg-paper/[0.06] px-2.5 py-1 text-[11px] font-medium text-ink-300 transition-colors duration-500">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span ref={b('syncText')}>{ui.syncing}</span>
              </span>
            </span>
          </div>
        </Mod>

        <div className="p3d grid min-h-0 flex-1 lg:grid-cols-[148px_1fr] xl:grid-cols-[168px_1fr]">
          {/* sidebar */}
          <Mod k="sidebar" reg={reg} className="hidden lg:block" face="mod-side">
            <div className="flex h-full flex-col gap-0.5 p-3">
              <div className="mb-3 flex items-center gap-2 px-2 pt-1 text-[12px] font-medium"><LogoMark className="h-4 w-4" /> {ui.ws}</div>
              {Array.isArray(ui.nav) && ui.nav.map((n, i) => {
                const Icon = NAV_ICONS[i] ?? LayoutGrid;
                const on = i === 1;
                return (
                  <span key={n} className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] ${on ? 'bg-paper/[0.07] text-paper' : 'text-ink-400'}`}>
                    {on && <span className="absolute -left-3 top-1.5 h-[calc(100%-12px)] w-[2px] rounded-full bg-lime" />}
                    <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} /> {n}
                  </span>
                );
              })}
              <p className="mb-1.5 mt-5 px-2.5 text-[10.5px] text-ink-500">{ui.team}</p>
              {TEAM.map(([name, on], i) => (
                <span key={name} className="flex items-center gap-2.5 px-2.5 py-1 text-[12px] text-ink-300">
                  <span className="relative">
                    <span className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[9px] font-semibold ${i === 0 ? 'bg-lime text-ink' : 'bg-[#2a2a2a] text-ink-200'}`}>{name[0]}</span>
                    <span className={`absolute -bottom-px -right-px h-[7px] w-[7px] rounded-full border-[1.5px] border-[#0d0d0d] ${on ? 'bg-lime' : 'bg-ink-500'}`} />
                  </span>
                  {name}
                  {i === 0 && <span className="ml-auto text-[10px] text-lime/70">{ui.online}</span>}
                </span>
              ))}
              <div className="mt-auto rounded-[10px] border border-paper/[0.07] bg-paper/[0.025] p-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-paper"><Zap className="h-3 w-3 text-lime" fill="currentColor" /> {ui.auto}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[10.5px] text-ink-400"><span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" /> {ui.autoMeta}</p>
              </div>
            </div>
          </Mod>

          <div className="p3d flex min-h-0 flex-col gap-3 p-3 sm:p-4">
            {/* KPIs */}
            <div className="p3d grid grid-cols-3 gap-3">
              <Mod k="kpiRevenue" reg={reg}>
                <div className="relative h-full p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[11px] text-ink-400">{ui.revenue}</p>
                    <span className="sys-late hidden shrink-0 rounded-full bg-lime/10 px-1.5 py-0.5 text-[9.5px] font-medium tabular-nums text-lime 2xl:inline">{ui.delta}</span>
                  </div>
                  <p ref={b('rev')} className="kpi-num mt-1.5 text-[clamp(15px,1.5vw,24px)] font-medium tabular-nums tracking-[-0.03em]">0</p>
                  <svg viewBox="0 0 120 30" preserveAspectRatio="none" className="absolute bottom-2.5 right-3 hidden h-7 w-[44%] sm:block lg:hidden xl:block" aria-hidden="true">
                    <defs>
                      <linearGradient id="sys-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#C8FF2E" stopOpacity="0.28" /><stop offset="1" stopColor="#C8FF2E" stopOpacity="0" /></linearGradient>
                    </defs>
                    <path className="sys-area" d="M2 25 L18 21 L32 23 L48 15 L62 17 L78 10 L92 12 L106 6 L118 3 L118 30 L2 30 Z" fill="url(#sys-area)" />
                    <path ref={b('chart')} pathLength="1" d="M2 25 L18 21 L32 23 L48 15 L62 17 L78 10 L92 12 L106 6 L118 3" fill="none" stroke="#C8FF2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset="1" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </Mod>
              <Mod k="kpiOpen" reg={reg}>
                <div className="relative h-full p-3">
                  <p className="truncate text-[11px] text-ink-400">{ui.open}</p>
                  <p ref={b('open')} className="kpi-num mt-1.5 text-[clamp(15px,1.5vw,24px)] font-medium tabular-nums tracking-[-0.03em]">0</p>
                  <span className="absolute bottom-3 right-3 hidden h-6 items-end gap-[3px] sm:flex">
                    {[0.45, 0.6, 0.4, 0.75, 0.55, 0.85, 1].map((h, i) => (
                      <span key={i} className={`sys-kbar w-[4px] rounded-[1px] ${i === 6 ? 'bg-lime' : 'bg-paper/25'}`} style={{ height: `${h * 100}%`, '--i': i }} />
                    ))}
                  </span>
                </div>
              </Mod>
              <Mod k="kpiOverdue" reg={reg}>
                <div className="relative h-full p-3">
                  <p className="truncate text-[11px] text-ink-400">{ui.overdue}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <p ref={b('overdue')} className="text-[clamp(15px,1.5vw,24px)] font-medium tabular-nums tracking-[-0.03em] text-lime">0</p>
                    <span className="sys-late hidden items-center gap-1 rounded-full bg-lime/10 px-1.5 py-0.5 text-[9.5px] font-medium text-lime xl:flex"><Check className="h-2.5 w-2.5" strokeWidth={3} /> {ui.paid}</span>
                  </div>
                </div>
              </Mod>
            </div>

            {/* orders + activity */}
            <div className="p3d grid min-h-0 flex-1 gap-3 sm:grid-cols-[1.55fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.55fr_1fr]">
              <Mod k="orders" reg={reg} className="min-h-0">
                <div className="sys-orders flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-paper/[0.06] px-3 py-2 text-[11.5px]">
                    <span className="flex items-center gap-2 font-medium">{ui.orders}<span className="rounded-full bg-paper/[0.06] px-1.5 text-[10px] font-normal tabular-nums text-ink-400">{rows.length}</span></span>
                    <span className="text-ink-500">{ui.ordersMeta}</span>
                  </div>
                  <div className="sys-cols border-b border-paper/[0.04] px-3 py-1.5 text-[10px] text-ink-500">
                    <span>{ui.client}</span><span className="sys-no">{ui.order}</span><span className="sys-amt">{ui.amount}</span><span className="text-right">{ui.statusCol}</span>
                  </div>
                  <div className="sys-rows relative min-h-0 flex-1 overflow-hidden">
                    {rows.map((r, i) => (
                      <div key={r.id} className={`sys-cols relative items-center border-b border-paper/[0.04] px-3 text-[11.5px] transition-colors duration-500 ${r.fresh ? 'row-in' : ''} ${cur.on && cur.row === i ? 'bg-paper/[0.035]' : ''}`} style={{ height: ROW_H }}>
                        {r.bump > 0 && <span key={r.bump} className="row-flash pointer-events-none absolute inset-0" />}
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="sys-ava h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] bg-paper/[0.06] text-[9px] font-semibold text-ink-300">{r.client[0]}</span>
                          <span className="truncate text-ink-100">{r.client}</span>
                        </span>
                        <span className="sys-no tabular-nums text-ink-500">{r.no}</span>
                        <span className="sys-amt tabular-nums text-ink-300">{money ? money.format(r.amt ?? 0) : r.amt}</span>
                        <span className="flex justify-end">
                          <span key={`${r.id}-${r.bump}`} className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${tone[r.st] ?? tone.inProd} ${r.bump > 0 ? 'pill-pop' : ''}`}>{status[r.st]}</span>
                        </span>
                      </div>
                    ))}
                    {/* a teammate at work */}
                    <div className={`live-cur pointer-events-none absolute left-[calc(100%-58px)] top-0 ${cur.on ? 'opacity-100' : 'opacity-0'}`} style={{ transform: `translate3d(${cur.x}px, ${cur.row * ROW_H + ROW_H / 2}px, 0)` }}>
                      <span key={cur.click} className={cur.click ? 'live-click' : ''} />
                      <svg viewBox="0 0 16 16" className="live-arrow h-3.5 w-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" aria-hidden="true"><path d="M1.5 1.2 L13.8 6.4 L8.2 8.1 L6.1 13.9 Z" fill="#C8FF2E" stroke="#0A0A0A" strokeWidth="1.1" strokeLinejoin="round" /></svg>
                      <span className="ml-2.5 mt-[-2px] inline-block rounded-[5px] rounded-tl-none bg-lime px-1.5 py-[1px] text-[9.5px] font-semibold text-ink">{L.who ?? 'Lena'}</span>
                    </div>
                  </div>
                </div>
              </Mod>
              <Mod k="feed" reg={reg} className="hidden min-h-0 sm:block lg:hidden xl:block">
                <div className="flex h-full flex-col p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11.5px] font-medium">{ui.activity}</p>
                    <span className="flex items-center gap-1.5 text-[10px] text-ink-500"><span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" /> Live</span>
                  </div>
                  <ul className="mt-1.5 min-h-0 flex-1 overflow-hidden">
                    {feed.map((f) => (
                      <li key={f.id} className={f.fresh ? 'feed-in' : ''}>
                        <span className="flex gap-2.5 py-[7px] text-[11px] leading-snug">
                          <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${f.kind === 'auto' ? 'bg-lime/[0.14] text-lime' : f.kind === 'user' ? (f.who === 'L' ? 'bg-lime text-ink' : 'bg-[#2a2a2a] text-ink-200') : 'bg-paper/[0.07] text-ink-200'}`}>
                            {f.kind === 'auto' ? <Zap className="h-2.5 w-2.5" fill="currentColor" strokeWidth={0} /> : f.kind === 'user' ? <span className="text-[9px] font-semibold">{f.who ?? 'L'}</span> : <Package className="h-2.5 w-2.5" strokeWidth={2} />}
                          </span>
                          <span className="min-w-0 flex-1 text-ink-300">{f.text}</span>
                          <span className="shrink-0 pt-px font-mono text-[9.5px] text-ink-500">{ago(f.at)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Mod>
            </div>

            {/* this week */}
            <Mod k="schedule" reg={reg} className="hidden sm:block">
              <div className="flex items-center gap-3 px-3 py-2.5">
                <span className="min-w-16 shrink-0 whitespace-nowrap text-[11px] text-ink-400">{ui.week}</span>
                <div className="grid flex-1 grid-cols-5 gap-2">
                  {Array.isArray(ui.days) && ui.days.map((d, i) => (
                    <div key={d}>
                      <p className={`text-[10px] ${i === 2 ? 'text-lime' : 'text-ink-500'}`}>{d}</p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper/[0.06]">
                        <div className={`sys-sbar h-full rounded-full ${i === 2 ? 'bg-lime' : 'bg-paper/30'}`} style={{ width: `${[70, 45, 90, 30, 55][i]}%`, '--i': i }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Mod>
          </div>
        </div>
      </div>
    </div>
  );
}
