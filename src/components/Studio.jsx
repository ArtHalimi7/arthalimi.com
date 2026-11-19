import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Lines, Reveal, Roll, Signature, Tag } from './ui/primitives';
import { CutShape } from './ui/cut';
import { GAP, useCut } from '../lib/cut';

/** The time in Gelsenkirchen, to the minute. Empty until mounted, so the prerendered page never shows a stale time. */
function useLocalTime(lng) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = new Intl.DateTimeFormat(lng === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
    const tick = () => setTime(f.format(new Date()));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, [lng]);
  return time;
}

/*
 * The studio's principles, written up as what they are: promises, on a sheet of paper, signed. The signature writes
 * itself (pen speed, stroke by stroke) when the sheet comes into view. The folded corner is .paper-sheet in index.css.
 */
function Agreement({ principles }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  if (!Array.isArray(principles)) return null;
  return (
    <Reveal className="mt-20 sm:mt-24">
      <div ref={ref} className="paper-sheet relative rounded-[6px] bg-paper px-6 pb-9 pt-8 text-ink sm:px-12 sm:pb-12 sm:pt-11 lg:px-16">
        <p className="border-b border-ink/15 pb-5 text-[14px] font-medium tracking-[-0.01em]">{t('studio.terms')}</p>
        <ol>
          {principles.map((p, i) => (
            <li key={p.title} className="grid gap-2 border-b border-ink/10 py-7 md:grid-cols-[64px_minmax(0,1.15fr)_minmax(0,1fr)] md:gap-8 md:py-9">
              <span className="font-serif text-[22px] italic leading-none text-ink/45 md:pt-1">§ {i + 1}</span>
              <p className="text-[clamp(1.45rem,2.3vw,2.15rem)] font-medium leading-[1.08] tracking-[-0.035em]">{p.title}</p>
              <p className="max-w-[48ch] text-[15.5px] leading-relaxed text-ink/70 md:pt-1">{p.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 sm:mt-10">
          <Signature play={seen} delay={0.3} duration={2.6} width={2.4} label={t('hero.sign')} className="-ml-2 h-auto w-[210px] text-ink sm:w-[250px]" />
          <span className="mt-1 block h-px w-[230px] bg-ink/25 sm:w-[270px]" />
          <p className="mt-2.5 text-[13px] text-ink/60">{t('hero.sign')}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Studio() {
  const { t, i18n } = useTranslation();
  const cut = useCut();
  const time = useLocalTime(i18n.language);
  const principles = t('studio.principles');
  return (
    <section id="studio" data-shape="2" data-x="-1.9" data-mx="0" data-my="1.5" data-scale="0.8" data-alpha="0.6" data-malpha="0.3" className="relative py-24 sm:py-32">
      <div className="wrap relative z-10">
        <Tag>{t('studio.tag')}</Tag>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <h2 className="text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1] tracking-[-0.045em] lg:col-span-7">
            <Lines key={i18n.language} lines={[t('studio.title')]} />
          </h2>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-3" delay={0.1}>
            {/* the same cut card as the contact form, with LinkedIn in the notch (ui/cut.jsx) */}
            <div ref={cut.box} className={`group relative pt-10 ${cut.dims ? '' : 'rounded-[24px] bg-ink/90'}`}>
              <CutShape dims={cut.dims} r={24} className="stroke-paper/[0.09] transition-[stroke] duration-500 group-hover:stroke-paper/[0.18]" />
              <div ref={cut.tab} className="absolute left-0 top-0 flex h-10 items-center gap-2 pl-6 pr-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-300 sm:pl-7">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {t('footer.where')}
                {time && <span className="ml-1.5 tabular-nums text-paper">{time}</span>}
              </div>
              <div className="relative px-6 pt-6 sm:px-7">
                <p className="text-[17px] leading-relaxed text-ink-200">{t('studio.p1')}</p>
                <p className="mt-5 text-[15px] text-ink-300">{t('studio.founder')}</p>
                {/* the last line runs alongside the notch */}
                <p className="mt-2 flex min-h-12 items-center text-[13.5px] leading-snug text-ink-400" style={cut.dims ? { paddingRight: cut.dims.bw + GAP + 12 } : undefined}>{t('studio.languages')}</p>
              </div>
              <a ref={cut.btn} href="https://www.linkedin.com/in/arthalimi/" target="_blank" rel="noopener noreferrer" className="btn absolute bottom-0 right-0 h-12 bg-paper px-5 py-0 text-[15px] text-ink hover:bg-lime">
                <Roll>{t('studio.linkedin')}</Roll> <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Agreement principles={principles} />
      </div>
    </section>
  );
}
