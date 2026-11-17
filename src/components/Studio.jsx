import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Lines, Reveal, Tag } from './ui/primitives';

export default function Studio() {
  const { t, i18n } = useTranslation();
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
            <p className="text-[17px] leading-relaxed text-ink-200">{t('studio.p1')}</p>
            <p className="mt-5 text-[15px] text-ink-400">{t('studio.founder')} {t('studio.languages')}</p>
            <a href="https://www.linkedin.com/in/arthalimi/" target="_blank" rel="noopener noreferrer" className="link-line mt-5 text-[14px] text-paper">
              {t('studio.linkedin')} <ArrowUpRight className="h-4 w-4" />
            </a>
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
