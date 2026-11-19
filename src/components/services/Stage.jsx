import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { EASE } from '../ui/primitives';
import { Fragment } from '../hero/fragments';
import { DashDemo, FlowDemo, InboxDemo, LinkDemo } from './demos';

const DEMOS = { flow: FlowDemo, dash: DashDemo, link: LinkDemo, ai: InboxDemo };
// the scrap from the hero each one replaces: [fragment kind, width, tilt]
const SCRAPS = { flow: ['sticky', 168, -6], dash: ['numbers', 226, 4], link: ['toast', 222, -3], ai: ['email', 246, 3] };

/*
 * The services stage: an app window running the system for the chosen kind of service, with the scrap from the hero
 * it replaces pinned above its corner. Each time the stage switches, the scrap gets mapped by the hero's lime scan
 * line and steps back (index.css: .svc-scan, .svc-scrap, .svc-ok) while the system starts working underneath it.
 * Decoration only (aria-hidden): the list beside it carries the content.
 */
export default function Stage({ kind, run }) {
  const { t, i18n } = useTranslation();
  const demo = t('services.demo');
  const ui = t('hero.ui');
  const ok = demo && typeof demo === 'object' && ui && typeof ui === 'object';
  const Demo = DEMOS[kind];
  const [frag, w, tilt] = SCRAPS[kind];

  return (
    <div aria-hidden="true" data-nosnippet="" className="relative select-none pt-[96px] sm:pt-[122px] lg:pl-6">
      {/* what it replaces */}
      <div className="absolute left-0 top-0 z-10 h-[150px] w-full">
        <AnimatePresence initial={false}>
          <m.div
            key={kind}
            className="absolute left-[2%] top-1 lg:left-0"
            initial={{ opacity: 0, y: 18, rotate: tilt - 5 }}
            animate={{ opacity: 1, y: 0, rotate: tilt }}
            exit={{ opacity: 0, y: -10, rotate: tilt + 3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* sized here, not on the motion layer: its inline transform would override a scale class */}
            <div className="svc-scrap relative origin-top-left scale-[0.8] sm:scale-100" style={{ width: w }}>
              {ok && <Fragment kind={frag} data={t(`hero.frag.${frag}`)} />}
              <i className="svc-scan" />
              <span className="svc-ok absolute -right-2.5 -top-2.5 grid h-6 w-6 place-items-center rounded-full bg-lime text-ink shadow-[0_0_18px_rgba(200,255,46,0.45)]"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              {/* a note in the margin, pointing back at it */}
              <span className="svc-note absolute left-full top-1/2 ml-4 hidden items-center gap-1.5 whitespace-nowrap font-serif text-[18px] italic text-ink-300 sm:flex">
                <svg viewBox="0 0 40 20" className="h-5 w-10 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M38 5 C 27 2, 13 4, 4 14 M4 14 L4.5 7 M4 14 L11 13" /></svg>
                {t('services.replaces')}
              </span>
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      {/* the system */}
      <div className="frag-card relative overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0D0D0D]">
        <div className="flex h-10 items-center gap-3 border-b border-white/[0.07] bg-[linear-gradient(180deg,#171718,#111112)] px-4">
          <span className="flex gap-1.5">{[0, 1, 2].map((dot) => <span key={dot} className="h-2.5 w-2.5 rounded-full bg-paper/[0.12]" />)}</span>
          <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-ink-300">
            <Lock className="h-3 w-3 shrink-0" />
            <span key={kind} className="truncate">{ok ? `${ui.app?.toLowerCase?.() ?? 'app'} / ${String(demo[kind]?.title ?? '').toLowerCase()}` : ''}</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-lime/[0.12] px-2.5 py-1 text-[10.5px] font-medium text-lime">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" />{t('work.live')}
          </span>
        </div>
        <div className="relative h-[362px] bg-ink-950 sm:h-[372px] lg:h-[390px]">
          <AnimatePresence initial={false}>
            <m.div key={kind} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
              {ok && <Demo run={run} d={demo[kind]} ui={ui} lng={i18n.language} />}
            </m.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
        </div>
      </div>
    </div>
  );
}
