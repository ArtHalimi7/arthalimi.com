import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useScroll, useTransform } from 'framer-motion';
import { Lines, Tag } from './ui/primitives';

function Step({ s, i, n, progress }) {
  const at = (i + 0.5) / n;
  const color = useTransform(progress, [at - 0.06, at], ['#4A4A4A', '#C8FF2E']);
  const opacity = useTransform(progress, [at - 0.12, at], [0.35, 1]);
  const y = useTransform(progress, [at - 0.12, at], [24, 0]);
  return (
    <m.li style={{ opacity, y }} className="relative pt-10 md:pr-8">
      <m.span style={{ backgroundColor: color }} className="absolute -top-[5px] left-0 h-[11px] w-[11px] rounded-full" />
      <m.span style={{ color }} className="text-[13px] tabular-nums">0{i + 1}</m.span>
      <h3 className="mt-5 text-[clamp(1.9rem,3vw,2.7rem)] font-medium tracking-[-0.04em]">{s.title}</h3>
      <p className="mt-4 text-[16px] leading-relaxed text-ink-300">{s.desc}</p>
    </m.li>
  );
}

/** A lime line draws across the four steps as you scroll; each step lights up when it is reached. */
export default function Process() {
  const { t, i18n } = useTranslation();
  const steps = t('process.steps');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const n = Array.isArray(steps) ? steps.length : 4;

  return (
    <section id="process" data-shape="4" data-x="2.1" data-mx="0" data-my="1.6" data-scale="0.75" data-alpha="0.6" data-malpha="0.3" className="relative py-24 sm:py-32">
      <div className="wrap relative z-10">
        <Tag>{t('process.tag')}</Tag>
        <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1] tracking-[-0.045em]">
          <Lines key={i18n.language} lines={[t('process.title')]} />
        </h2>
        <div ref={ref} className="relative mt-20">
          <div className="absolute left-0 right-0 top-0 h-px bg-paper/10" />
          <m.div style={{ scaleX }} className="absolute left-0 right-0 top-0 h-px origin-left bg-lime shadow-[0_0_14px_rgba(200,255,46,0.7)]" />
          <ol className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(steps) && steps.map((s, i) => <Step key={s.title} s={s} i={i} n={n} progress={scrollYProgress} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}
