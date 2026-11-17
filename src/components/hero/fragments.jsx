import { Bell, Folder, Mail, Paperclip, Play } from 'lucide-react';

/*
 * The "before" picture: scraps of how a growing team really runs. Positions are the card centre in % of the screen.
 *   a = desktop, while the headline is up (clustered on the right)   b = desktop, "it runs on this" (spread out)
 *   m = phones (lower half, under the copy)   z = depth 0 (far, blurred) .. 1 (near)   to = the module it becomes
 * One visual language for all of them (dark glass, mono details); the only colour is a muted coral for what's wrong.
 * Lime is kept for the fix.
 */
export const FRAGS = [
  { kind: 'sheet', to: 'orders', z: 0.95, w: 300, a: { x: 74, y: 33, r: -6 }, b: { x: 62, y: 29, r: -9 }, m: { x: 36, y: 76, r: -6 } },
  { kind: 'chat', to: 'feed', z: 0.8, w: 252, a: { x: 90, y: 22, r: 5 }, b: { x: 87, y: 19, r: 8 }, m: { x: 74, y: 68, r: 6 } },
  { kind: 'numbers', to: 'kpiRevenue', z: 1, w: 236, a: { x: 82, y: 53, r: 4 }, b: { x: 74, y: 56, r: 7 }, m: { x: 68, y: 88, r: 5 } },
  { kind: 'email', to: 'feed', z: 0.7, w: 262, a: { x: 92, y: 69, r: -4 }, b: { x: 89, y: 72, r: -7 }, m: { x: 82, y: 97, r: -4 } },
  { kind: 'sticky', to: 'kpiOpen', z: 0.9, w: 176, a: { x: 69, y: 73, r: 7 }, b: { x: 52, y: 80, r: 10 }, m: { x: 22, y: 93, r: 7 } },
  { kind: 'calendar', to: 'schedule', z: 0.6, w: 244, a: { x: 80, y: 88, r: -3 }, b: { x: 70, y: 91, r: -6 }, m: { x: 50, y: 101, r: -3 } },
  { kind: 'pdf', to: 'orders', z: 0.5, w: 214, a: { x: 97, y: 44, r: 11 }, b: { x: 97, y: 44, r: 14 }, m: { x: 93, y: 81, r: 10 } },
  { kind: 'toast', to: 'feed', z: 0.55, w: 230, a: { x: 71, y: 13, r: -3 }, b: { x: 45, y: 11, r: -5 }, m: { x: 30, y: 65, r: -3 } },
  { kind: 'folder', to: 'sidebar', z: 0.4, w: 262, a: { x: 66, y: 53, r: -9 }, b: { x: 39, y: 47, r: -11 }, m: { x: 14, y: 85, r: -9 } },
  { kind: 'voice', to: 'feed', z: 0.45, w: 210, a: { x: 87, y: 95, r: 5 }, b: { x: 92, y: 95, r: 8 }, m: { x: 88, y: 63, r: 6 } },
];

const glass = 'frag-card grainy overflow-hidden rounded-[14px] border border-white/[0.08] bg-[linear-gradient(180deg,#1c1c1d_0%,#131314_100%)] text-paper';
const mono = 'font-mono text-[10px] uppercase tracking-[0.06em] text-ink-400';
const CORAL = 'text-[#F2766B]';

function Sheet({ f }) {
  return (
    <div className={glass}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
        <span className="grid h-3 w-3 grid-cols-2 gap-[1.5px] opacity-50">{[0, 1, 2, 3].map((i) => <span key={i} className="rounded-[1px] bg-paper" />)}</span>
        <span className="truncate font-mono text-[10.5px] text-ink-200">{f.file}</span>
      </div>
      <div className="grid grid-cols-[18px_1.35fr_0.6fr_1fr_0.8fr] font-mono text-[10px] tabular-nums">
        {['', 'A', 'B', 'C', 'D'].map((h, i) => <span key={`h${i}`} className="border-b border-r border-white/[0.05] px-1.5 py-1 text-center text-ink-500">{h}</span>)}
        {f.rows.map((r, ri) => [
          <span key={`n${ri}`} className="border-b border-r border-white/[0.05] py-1 text-center text-ink-500">{ri + 1}</span>,
          ...r.map((c, ci) => {
            const err = c === '#REF!' || c.startsWith('=S');
            const odd = c.includes('?') || c.endsWith('!');
            return (
              <span key={`${ri}-${ci}`} className={`truncate border-b border-r border-white/[0.05] px-1.5 py-1 ${err ? `bg-[#F2766B]/[0.12] ${CORAL}` : odd ? 'text-[#E8B44A]' : 'text-ink-200'}`}>
                {c}
              </span>
            );
          }),
        ])}
      </div>
    </div>
  );
}

function Chat({ f }) {
  return (
    <div className={`${glass} p-3.5`}>
      <div className="mb-3 flex items-center justify-between">
        <span className={mono}># {f.channel}</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#F2766B]"><span className="h-1.5 w-1.5 rounded-full bg-[#F2766B]" />{f.badge}</span>
      </div>
      <div className="space-y-2.5">
        {f.msgs.map(([who, text], i) => (
          <div key={i} className="flex gap-2.5">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.08] text-[9px] font-medium text-ink-200">{who[0]}</span>
            <p className="text-[11.5px] leading-snug"><span className="mr-1.5 font-medium text-paper">{who}</span><span className="text-ink-300">{text}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Email({ f }) {
  return (
    <div className={`${glass} p-3.5`}>
      <div className={`flex items-center gap-1.5 ${mono}`}><Mail className="h-3 w-3" /> {f.from}</div>
      <p className="mt-2 text-[12.5px] font-medium leading-snug text-paper">{f.subject}</p>
      <p className="mt-1 text-[11px] leading-snug text-ink-400">{f.body}</p>
      <span className="mt-2.5 inline-flex items-center gap-1 rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] text-ink-300"><Paperclip className="h-3 w-3" /> {f.attach}</span>
    </div>
  );
}

function Numbers({ f }) {
  return (
    <div className={`${glass} p-3.5`}>
      <p className={mono}>{f.label}</p>
      <div className="mt-2.5 flex items-baseline gap-2.5 tabular-nums">
        <span className="text-[20px] font-medium tracking-[-0.03em]">{f.v1}</span>
        <span className={`text-[16px] ${CORAL}`}>≠</span>
        <span className="text-[20px] font-medium tracking-[-0.03em] text-ink-300">{f.v2}</span>
      </div>
      <p className={`mt-2 text-[11px] ${CORAL}`}>{f.q}</p>
    </div>
  );
}

function Sticky({ f }) {
  return (
    <div className="frag-card relative rounded-[4px] bg-paper px-4 pb-4 pt-5 text-ink">
      <span className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[-3deg] bg-paper/60 shadow-[0_1px_2px_rgba(0,0,0,0.15)] backdrop-blur-[1px]" />
      <p className="font-serif text-[22px] italic leading-[1.02] text-ink/85">{f.text}</p>
    </div>
  );
}

function Calendar({ f }) {
  return (
    <div className={`${glass} p-3.5`}>
      <div className="flex items-center justify-between">
        <span className={mono}>{f.day}</span>
        <span className="rounded-full bg-[#F2766B]/[0.12] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-[#F2766B]">{f.conflict}</span>
      </div>
      <div className="relative mt-3 h-[62px]">
        <div className="absolute left-0 right-9 top-0 h-[38px] rounded-[8px] border-l-2 border-paper/40 bg-white/[0.06] px-2.5 py-1.5 text-[10.5px] text-ink-200">{f.e1}</div>
        <div className="absolute left-9 right-0 top-[22px] h-[38px] rounded-[8px] border-l-2 border-[#F2766B] bg-[#2a1a19] px-2.5 py-1.5 text-[10.5px] text-ink-100">{f.e2}</div>
      </div>
    </div>
  );
}

function Pdf({ f }) {
  return (
    <div className={`${glass} flex items-center gap-3 p-3`}>
      <span className="relative h-12 w-[38px] shrink-0 rounded-[5px] bg-white/[0.07] [clip-path:polygon(0_0,72%_0,100%_22%,100%_100%,0_100%)]">
        <span className="absolute right-0 top-0 h-[22%] w-[28%] rounded-bl-[3px] bg-white/[0.12]" />
        <span className="absolute bottom-1.5 left-1.5 font-mono text-[7.5px] font-semibold text-[#F2766B]">PDF</span>
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-[10.5px] text-ink-100">{f.file}</span>
        <span className="mt-1 block text-[10.5px] text-ink-400">{f.meta}</span>
      </span>
    </div>
  );
}

function Toast({ f }) {
  return (
    <div className={`${glass} flex items-center gap-2.5 rounded-full px-3.5 py-2.5 text-[11.5px] text-ink-200`}>
      <span className="relative text-ink-300"><Bell className="h-3.5 w-3.5" /><span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#F2766B]" /></span>
      {f.text}
    </div>
  );
}

function FolderPath({ f }) {
  return (
    <div className={`${glass} flex items-center gap-2 px-3.5 py-3 font-mono text-[10.5px]`}>
      <Folder className="h-3.5 w-3.5 shrink-0 text-ink-400" />
      <span className="truncate text-ink-400">
        ~/{f.path.slice(0, -1).join('/')}/<span className="text-paper">{f.path[f.path.length - 1]}</span>
      </span>
    </div>
  );
}

function Voice({ f }) {
  const bars = [5, 11, 8, 15, 6, 12, 17, 9, 5, 13, 7, 10, 4, 8, 12, 6];
  return (
    <div className={`${glass} flex items-center gap-3 rounded-full py-2 pl-2 pr-4`}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.08] text-paper"><Play className="ml-0.5 h-3 w-3" fill="currentColor" /></span>
      <span className="flex h-5 items-center gap-[2px]">{bars.map((h, i) => <span key={i} className={`w-[2px] rounded-full ${i < 5 ? 'bg-paper/80' : 'bg-paper/25'}`} style={{ height: h }} />)}</span>
      <span className="font-mono text-[10px] tabular-nums text-ink-400">{f.len}</span>
    </div>
  );
}

const KINDS = { sheet: Sheet, chat: Chat, email: Email, numbers: Numbers, sticky: Sticky, calendar: Calendar, pdf: Pdf, toast: Toast, folder: FolderPath, voice: Voice };

export function Fragment({ kind, data }) {
  const C = KINDS[kind];
  return C && data ? <C f={data} /> : null;
}
