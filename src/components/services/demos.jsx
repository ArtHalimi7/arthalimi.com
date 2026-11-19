import { startTransition, useEffect, useRef, useState } from 'react';
import { BarChart3, Check, FileSpreadsheet, FileText, Landmark, Mail, MessageSquare, MousePointer2, ReceiptText, ShoppingBag } from 'lucide-react';
import { LogoMark } from '../ui/primitives';
import { useReduced } from '../../lib/motion';

/*
 * Four small systems at work, one per kind of service, drawn from the hero's kit (same panels, same cast: Lena, Tom
 * and Maria at Keller GmbH, Nordlicht AG and the rest). Each one fixes a scrap from the hero's mess:
 *   FlowDemo   the sticky note ("call supplier before 3!! ask Maria") becomes a step with an owner and a deadline
 *   DashDemo   the two revenue figures that don't agree become one, reconciled with its sources
 *   LinkDemo   "17 unread in #orders" becomes data moving between the tools on its own
 *   InboxDemo  "Re: Re: Fwd: Invoice 2291" gets read and filed, with a person checking the one that matters
 * Each plays a short scripted loop while `run` is on (its stage is on screen); with reduced motion it shows how the
 * loop ends, still. Everything here is decoration: the services list next to it carries the content.
 */
const panel = 'rounded-[10px] border border-paper/[0.07] bg-paper/[0.025]';
const card = 'rounded-[8px] border border-paper/[0.06] bg-[#141415]';
const AMBER = '#E8B44A'; // done by hand / waiting on a person (the hero uses it for the odd cells)
const CORAL = '#F2766B'; // wrong (the hero's colour for errors)

/** 0..n-1, one step every `ms` while `run`, looping. Reduced motion: the last step, held. */
function useSteps(run, n, ms) {
  const reduced = useReduced();
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!run || reduced) return undefined;
    // non-urgent: a scroll in progress always wins
    const id = setInterval(() => startTransition(() => setK((v) => (v + 1) % n)), ms);
    return () => clearInterval(id);
  }, [run, reduced, n, ms]);
  return reduced ? n - 1 : k;
}

const money = (lng, v) => {
  const n = new Intl.NumberFormat(lng === 'de' ? 'de-DE' : 'en-GB').format(v);
  return lng === 'de' ? `${n} €` : `€${n}`;
};

function Head({ title, meta }) {
  return (
    <div className="flex min-w-0 items-baseline gap-2">
      <span className="shrink-0 text-[13px] font-medium text-paper">{title}</span>
      {meta && <span className="truncate text-[12px] text-ink-500">{meta}</span>}
    </div>
  );
}

/** One line of "what just happened", replaced as the story moves on. */
function Log({ text, k }) {
  return (
    <div className={`${panel} flex min-w-0 items-center gap-2.5 px-3 py-2.5`}>
      <span className="h-1.5 w-1.5 shrink-0 animate-pulseDot rounded-full bg-lime" />
      <span key={k} className="feed-in block min-w-0 truncate text-[11px] text-ink-300">{text}</span>
    </div>
  );
}

/* ── Workflow: order #2291 moves through the steps, picking up an owner and beating its deadline ─────────────── */
export function FlowDemo({ run, d }) {
  const k = useSteps(run, 5, 1650); // new, checking (Tom), approval (Maria), done, done (held)
  const col = Math.min(k, 3);
  const done = col === 3;
  const owner = [null, 'Tom', 'Maria', 'Maria'][col];
  const cols = Array.isArray(d.cols) ? d.cols : [];
  const cards = Array.isArray(d.cards) ? d.cards : [];
  return (
    <div className="flex h-full flex-col gap-3 p-3 sm:p-4">
      <Head title={d.board} meta={d.week} />
      <div className="relative grid min-h-0 flex-1 grid-cols-4 gap-2">
        {cols.map((c, ci) => (
          <div key={c} className={`${panel} flex min-w-0 flex-col gap-2 overflow-hidden p-2`}>
            <div className="flex h-4 items-center justify-between gap-1 px-1 text-[10px] text-ink-400">
              <span className="truncate font-medium uppercase tracking-[0.06em]">{c}</span>
              <span className="tabular-nums">{(cards[ci]?.length ?? 0) + (col === ci ? 1 : 0)}</span>
            </div>
            {/* the lane the moving order travels along: an empty slot until it arrives */}
            <div className="h-[98px] shrink-0 rounded-[8px] border border-dashed border-paper/[0.07]" />
            {(cards[ci] ?? []).map(([co, no]) => (
              <div key={no} className={`${card} p-2`}>
                <p className="truncate text-[9.5px] tabular-nums text-ink-500">{no}</p>
                <p className="mt-0.5 truncate text-[11px] text-ink-200">{co}</p>
                <span className="mt-2 block h-1 w-2/3 rounded-full bg-paper/[0.06]" />
              </div>
            ))}
          </div>
        ))}
        {/* the order: exactly one column further per step (its width is a column's, so 100% is one column) */}
        <div
          className="pointer-events-none absolute left-0 top-8 w-[calc((100%-24px)/4)] px-2 transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
          style={{ transform: `translateX(calc(${col} * (100% + 8px)))` }}
        >
          <div className={`rounded-[8px] border p-2 transition-[background-color,border-color,box-shadow] duration-500 ${done ? 'border-lime/35 bg-lime/[0.04]' : 'border-lime/60 bg-lime/[0.08] shadow-[0_0_24px_-8px_rgba(200,255,46,0.5)]'}`}>
            <p className="truncate text-[9.5px] text-ink-400">{d.client}</p>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-paper">{d.task}</p>
            <div className="mt-2 flex items-center justify-between gap-1">
              <span className="flex min-w-0 items-center gap-1.5 text-[9.5px] text-ink-300">
                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8.5px] font-medium transition-colors duration-500 ${owner ? 'bg-lime text-ink' : 'border border-dashed border-paper/30'}`}>{owner?.[0]}</span>
                <span className="truncate">{owner ?? d.nobody}</span>
              </span>
              <span
                className="hidden shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium tabular-nums transition-colors duration-500 sm:inline"
                style={done ? { backgroundColor: 'rgba(200,255,46,0.15)', color: '#C8FF2E' } : { backgroundColor: 'rgba(232,180,74,0.15)', color: AMBER }}
              >
                {done ? '✓ 14:20' : '15:00'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Log text={Array.isArray(d.log) ? d.log[col] : ''} k={col} />
    </div>
  );
}

/* ── Dashboards: the two figures nobody trusted become one, checked against bank, shop and sheets ──────────────── */
const WEEKS = [0.38, 0.5, 0.44, 0.58, 0.52, 0.64, 0.6, 0.7, 0.66, 0.78, 0.73, 0.84];

export function DashDemo({ run, d, ui, lng }) {
  const k = useSteps(run, 5, 1700); // two versions, sources checked, reconciled, held, new data in
  const checked = k >= 1;
  const ok = k >= 2;
  const fresh = k === 4;
  const sources = Array.isArray(d.sources) ? d.sources : [];
  return (
    <div className="flex h-full flex-col gap-3 p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <div className={`${panel} col-span-2 p-3 sm:col-span-1`}>
          <p className="truncate text-[10px] text-ink-400">{ui.revenue}</p>
          {ok ? (
            <p key={fresh ? 'b' : 'a'} className={`mt-1.5 text-[21px] font-medium tabular-nums leading-none tracking-[-0.03em] text-paper ${fresh ? 'kpi-bump' : ''}`}>{money(lng, fresh ? 52580 : 51940)}</p>
          ) : (
            <p className="mt-1.5 flex items-baseline gap-1.5 whitespace-nowrap text-[15px] leading-none tabular-nums tracking-[-0.02em]">
              <span className="text-ink-300">{money(lng, 48120)}</span>
              <span style={{ color: CORAL }}>≠</span>
              <span className="text-ink-300">{money(lng, 51940)}</span>
            </p>
          )}
          <span
            className="mt-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={ok ? { backgroundColor: 'rgba(200,255,46,0.15)', color: '#C8FF2E' } : { backgroundColor: 'rgba(242,118,107,0.12)', color: CORAL }}
          >
            {ok && <Check className="h-3 w-3" strokeWidth={2.5} />}{ok ? d.ok : d.versions}
          </span>
        </div>
        <div className={`${panel} hidden p-3 sm:block`}>
          <p className="truncate text-[10px] text-ink-400">{ui.open}</p>
          <p className="mt-1.5 text-[21px] font-medium tabular-nums leading-none tracking-[-0.03em]">128</p>
          <span className="mt-3 flex h-3 items-end gap-[3px]">{[5, 8, 6, 10, 7, 12, 9].map((h, i) => <span key={i} className="w-[4px] rounded-[1px] bg-paper/25" style={{ height: h }} />)}</span>
        </div>
        <div className={`${panel} hidden p-3 sm:block`}>
          <p className="truncate text-[10px] text-ink-400">{ui.overdue}</p>
          <p className="mt-1.5 text-[21px] font-medium tabular-nums leading-none tracking-[-0.03em]">0</p>
          <span className="mt-2.5 inline-block rounded-full bg-lime/15 px-2 py-0.5 text-[10px] font-medium text-lime">{ui.paid}</span>
        </div>
      </div>

      <div className={`${panel} flex min-h-0 flex-1 flex-col p-3`}>
        <div className="flex items-center justify-between gap-3 text-[10px] text-ink-400">
          <span className="truncate">{d.chart}</span>
          <span className={`shrink-0 transition-opacity duration-500 ${fresh ? 'text-lime opacity-100' : 'opacity-0'}`}>{d.synced}</span>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 items-end gap-1 sm:gap-1.5">
          {WEEKS.map((h, i) => {
            const last = i === WEEKS.length - 1;
            const v = ok ? (last && fresh ? h + 0.1 : h) : 0.1;
            return (
              <span
                key={i}
                className={`h-full flex-1 origin-bottom rounded-t-[3px] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${last ? 'bg-lime' : 'bg-paper/[0.14]'}`}
                style={{ transform: `scaleY(${v})`, transitionDelay: ok && !fresh ? `${i * 40}ms` : '0ms' }}
              />
            );
          })}
        </div>
      </div>

      {/* where the number comes from */}
      <div className="flex flex-wrap items-center gap-1.5">
        {sources.map((s, i) => (
          <span key={s} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] transition-colors duration-500 ${checked ? 'border-lime/30 text-paper' : 'border-paper/10 text-ink-500'}`} style={{ transitionDelay: `${i * 180}ms` }}>
            <Check className={`h-3 w-3 text-lime transition-opacity duration-300 ${checked ? 'opacity-100' : 'opacity-0'}`} strokeWidth={2.5} style={{ transitionDelay: `${i * 180}ms` }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Integrations: the tools you already use, wired through one system; data moves on its own ──────────────────── */
// a 600 × 220 drawing: sources on the left, the system in the middle, where things end up on the right
const SRC = [[78, 40], [78, 110], [78, 180]];
const DST = [[522, 40], [522, 110], [522, 180]];
const HUB = [300, 110];
const wire = ([x1, y1], [x2, y2]) => `M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
const WIRES = [...SRC.map((p) => wire(p, HUB)), ...DST.map((p) => wire(HUB, p))];
const SRC_ICONS = [ShoppingBag, Landmark, FileSpreadsheet];
const DST_ICONS = [ReceiptText, MessageSquare, BarChart3];

function Node({ at, icon: Icon, label }) {
  return (
    <span className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-[9px] border border-paper/[0.08] bg-[#141415] px-2 py-1.5 text-[10.5px] text-ink-200 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.8)]" style={{ left: `${(at[0] / 600) * 100}%`, top: `${(at[1] / 220) * 100}%` }}>
      <Icon className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.75} />{label}
    </span>
  );
}

export function LinkDemo({ run, d, ui }) {
  const reduced = useReduced();
  const svg = useRef(null);
  const k = useSteps(run, 4, 1800);
  const log = Array.isArray(d.log) ? d.log : [];
  const live = ui.live || {};
  // the packets are SMIL: cheap, off the main thread's React work; paused whenever the stage isn't running
  useEffect(() => {
    const el = svg.current;
    if (!el?.pauseAnimations) return;
    if (run && !reduced) el.unpauseAnimations(); else el.pauseAnimations();
  }, [run, reduced]);
  const recent = log.length ? [0, 1].map((back) => ({ i: (k - back + log.length) % log.length, back })) : [];
  return (
    <div className="flex h-full flex-col justify-between gap-3 p-3 sm:p-4">
      <Head title={d.title} />
      <div className="relative aspect-[600/220] w-full">
        <svg ref={svg} viewBox="0 0 600 220" className="absolute inset-0 h-full w-full overflow-visible">
          {WIRES.map((p, i) => <path key={i} d={p} fill="none" stroke="rgba(242,242,238,0.12)" strokeWidth="1.2" strokeDasharray="3 4" />)}
          {!reduced && WIRES.map((p, i) => (
            <g key={`p${i}`}>
              <circle r="7" fill="#C8FF2E" opacity="0.16"><animateMotion dur="2.4s" begin={`${(i * 0.53) % 2.4}s`} repeatCount="indefinite" path={p} /></circle>
              <circle r="3" fill="#C8FF2E"><animateMotion dur="2.4s" begin={`${(i * 0.53) % 2.4}s`} repeatCount="indefinite" path={p} /></circle>
            </g>
          ))}
        </svg>
        {SRC.map((at, i) => <Node key={`s${i}`} at={at} icon={SRC_ICONS[i]} label={d.in?.[i]} />)}
        {DST.map((at, i) => <Node key={`d${i}`} at={at} icon={DST_ICONS[i]} label={d.out?.[i]} />)}
        <span className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-[12px] border border-lime/50 bg-[#141a0a] px-3 py-2.5 text-[11.5px] font-medium text-paper shadow-[0_0_30px_-6px_rgba(200,255,46,0.35)]" style={{ left: `${(HUB[0] / 600) * 100}%`, top: `${(HUB[1] / 220) * 100}%` }}>
          <LogoMark className="h-4 w-4" />{d.hub}
        </span>
      </div>
      <div className="space-y-1.5">
        {recent.map(({ i, back }) => (
          <div key={`${k}-${back}`} className={`${panel} flex min-w-0 items-center gap-2.5 px-3 py-2 ${back === 0 ? 'feed-in' : ''}`}>
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${back === 0 ? 'animate-pulseDot bg-lime' : 'bg-paper/25'}`} />
            <span className={`min-w-0 flex-1 truncate text-[11px] ${back === 0 ? 'text-ink-200' : 'text-ink-400'}`}>{log[i]}</span>
            <span className="shrink-0 text-[10px] tabular-nums text-ink-500">{back === 0 ? live.now : String(live.ago ?? '').replace('{n}', '2')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── AI automation: the inbox reads itself; a person signs off the one that needs judgement ─────────────────────── */
/** Where a document went. (.pill-pop sets display, so it sits on a wrapper and the chip keeps its own flex layout.) */
function Filed({ text }) {
  return (
    <span className="pill-pop min-w-0 max-w-full">
      <span className="flex min-w-0 items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 text-[10px] font-medium text-lime">
        <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} /><span className="truncate">{text}</span>
      </span>
    </span>
  );
}

export function InboxDemo({ run, d }) {
  // row i is read at step i + 1 and filed after it; the last one waits for a person (step 5), who checks it (step 6)
  const k = useSteps(run, 7, 1200);
  const rows = Array.isArray(d.rows) ? d.rows : [];
  const fields = Array.isArray(d.fields) ? d.fields : [];
  const last = rows.length - 1;
  const cur = k === 0 ? null : Math.min(k - 1, last); // the document being read, or just read
  return (
    <div className="flex h-full flex-col gap-3 p-3 sm:p-4">
      <Head title={d.title} meta={d.meta} />
      <div className="relative flex flex-col gap-2">
        {rows.map(([kind, title, result], i) => {
          const st = k < i + 1 ? 'queued' : k === i + 1 ? 'reading' : 'done';
          const human = i === last;
          const waiting = human && st === 'done' && k < 6;
          const Icon = kind === 'pdf' ? FileText : Mail;
          return (
            <div
              key={title}
              className={`relative flex min-w-0 items-center gap-3 overflow-hidden rounded-[10px] border px-3 py-2.5 transition-colors duration-500 ${st === 'reading' ? 'border-lime/30 bg-lime/[0.04]' : st === 'done' ? 'border-paper/[0.07] bg-paper/[0.025]' : 'border-paper/[0.05]'}`}
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[7px] transition-colors duration-500 ${st === 'queued' ? 'bg-paper/[0.04] text-ink-500' : 'bg-paper/[0.07] text-ink-200'}`}><Icon className="h-3.5 w-3.5" strokeWidth={1.75} /></span>
              <span className={`min-w-0 flex-1 truncate text-[11.5px] transition-colors duration-500 ${st === 'queued' ? 'text-ink-500' : 'text-paper'}`}>{title}</span>
              <span className="flex max-w-[58%] shrink-0 items-center gap-1.5">
                {st === 'queued' && <span className="h-1.5 w-1.5 rounded-full bg-paper/20" />}
                {st === 'reading' && <span className="text-[10px] text-lime">{d.reading}</span>}
                {st === 'done' && !human && <Filed text={result} />}
                {waiting && (
                  <>
                    <span className="hidden min-w-0 sm:block"><span className="pill-pop max-w-full truncate rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: 'rgba(232,180,74,0.15)', color: AMBER }}>{d.person}</span></span>
                    <span className="rounded-full border border-paper/25 px-2 py-0.5 text-[10px] font-medium text-paper">{d.review}</span>
                  </>
                )}
                {human && k >= 6 && <Filed text={result} />}
              </span>
              {st === 'reading' && <i className="svc-read" />}
            </div>
          );
        })}
        {/* Lena, coming to check the one that needs a person */}
        <span
          className="pointer-events-none absolute bottom-[10px] right-[18px] flex items-start transition-[transform,opacity] duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
          style={{ transform: k >= 5 ? 'translate(0, 0)' : 'translate(70px, 60px)', opacity: k >= 5 ? 1 : 0 }}
        >
          {k === 6 && <i className="live-click" />}
          <MousePointer2 className="h-4 w-4 fill-lime text-ink" strokeWidth={1.5} />
          <span className="ml-0.5 mt-3 rounded-full bg-lime px-1.5 py-0.5 text-[9px] font-medium text-ink">Lena</span>
        </span>
      </div>
      {/* what the model pulled out of the document it's on */}
      <div className={`${panel} mt-auto p-3`}>
        <div className="flex items-center justify-between gap-3 text-[10px] text-ink-400">
          <span className="flex shrink-0 items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" />{d.extract}</span>
          <span className="truncate font-mono text-ink-500">{cur !== null ? rows[cur]?.[1] : ''}</span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {cur === null
            ? [0, 1, 2].map((j) => <span key={j} className="h-[34px] rounded-[6px] bg-paper/[0.04]" />)
            : (fields[cur] ?? []).map(([label, value], j) => (
              <div key={`${cur}-${j}`} className="feed-in min-w-0 rounded-[6px] bg-paper/[0.035] px-2 py-1.5" style={{ animationDelay: `${j * 90}ms` }}>
                <p className="truncate text-[9.5px] text-ink-500">{label}</p>
                <p className="truncate text-[11.5px] text-paper">{value}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
