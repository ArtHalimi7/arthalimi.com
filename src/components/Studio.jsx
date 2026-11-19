import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Lines, Reveal, Roll, Tag } from './ui/primitives';
import { CutShape } from './ui/cut';
import { GAP, useCut } from '../lib/cut';

export default function Studio() {
  const { t, i18n } = useTranslation();
  const cut = useCut();
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

        <ol className="mt-20 grid gap-px overflow-hidden rounded-[20px] border border-paper/[0.09] bg-paper/[0.09] md:grid-cols-3">
          {Array.isArray(principles) && principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="group relative bg-ink p-8 sm:p-10">
              <span className="text-[13px] tabular-nums text-ink-500 transition-colors duration-500 group-hover:text-lime">0{i + 1}</span>
              <p className="mt-16 text-[22px] font-medium leading-[1.15] tracking-[-0.03em]">{p.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-300">{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
