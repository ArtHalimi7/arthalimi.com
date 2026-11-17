import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useScroll, useTransform } from 'framer-motion';
import { Tag } from './ui/primitives';

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <m.span style={{ opacity }} className={`inline ${accent ? 'text-lime' : ''}`}>
      {children}{' '}
    </m.span>
  );
}

/** A statement that lights up word by word as it scrolls through the screen. */
export default function Manifesto() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const plain = t('manifesto.text').split(' ');
  const accent = t('manifesto.accent').split(' ');
  const words = [...plain.map((w) => [w, false]), ...accent.map((w) => [w, true])];

  return (
    <section data-shape="1" data-x="0.6" data-mx="0" data-my="0" data-scale="1" data-alpha="0.75" data-malpha="0.45" className="relative py-32 sm:py-48">
      <div className="wrap relative z-10">
        <Tag>{t('manifesto.tag')}</Tag>
        <p ref={ref} key={i18n.language} className="mt-10 max-w-[24ch] text-[clamp(2rem,4.4vw,4.1rem)] font-medium leading-[1.08] tracking-[-0.04em]">
          {words.map(([w, a], i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={a}>{w}</Word>
          ))}
        </p>
      </div>
    </section>
  );
}
