import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Lines, Reveal, Tag } from './ui/primitives';
import { useScrollTo } from './Nav';

/** Big rows; on hover a lime fill wipes in from the left and the row inverts. */
export default function Services() {
  const { t, i18n } = useTranslation();
  const go = useScrollTo();
  const items = t('services.items');
  return (
    <section id="services" data-shape="2" data-x="1.7" data-mx="0" data-my="1.4" data-scale="0.95" data-alpha="0.8" data-malpha="0.4" className="relative pb-24 pt-8 sm:pb-32 sm:pt-10">
      <div className="wrap relative z-10">
        <Tag>{t('services.tag')}</Tag>
        <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1] tracking-[-0.045em]">
          <Lines key={i18n.language} lines={[t('services.title')]} />
        </h2>

        <ol className="mt-16 border-t border-paper/[0.1]">
          {Array.isArray(items) && items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.05} className="border-b border-paper/[0.1]">
              <button type="button" onClick={() => go('contact')} data-cursor={`${t('nav.cta')} ↗`} className="group relative block w-full overflow-hidden text-left">
                <span className="absolute inset-0 origin-left scale-x-0 bg-lime transition-transform duration-[650ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
                <span className="relative grid gap-3 px-1 py-9 transition-colors duration-500 group-hover:text-ink sm:px-4 md:grid-cols-[72px_1.1fr_1fr_40px] md:items-center md:gap-8 md:py-11">
                  <span className="text-[13px] tabular-nums text-ink-500 transition-colors duration-500 group-hover:text-ink">0{i + 1}</span>
                  <span className="text-[clamp(1.9rem,3.6vw,3.4rem)] font-medium leading-[1] tracking-[-0.045em]">{it.title}</span>
                  <span className="block">
                    <span className="block text-[16px] leading-relaxed text-ink-200 transition-colors duration-500 group-hover:text-ink">{it.desc}</span>
                    <span className="mt-2 block text-[13.5px] text-ink-400 transition-colors duration-500 group-hover:text-ink/70">{t('services.eg')}: {it.eg}</span>
                  </span>
                  <ArrowUpRight className="hidden h-6 w-6 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block" />
                </span>
              </button>
            </Reveal>
          ))}
        </ol>
        <Reveal><p className="mt-8 max-w-[70ch] text-[15px] text-ink-400">{t('services.also')}</p></Reveal>
      </div>
    </section>
  );
}
