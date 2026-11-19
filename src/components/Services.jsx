import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Lines, Reveal, Tag } from './ui/primitives';
import { useReduced } from '../lib/motion';
import Stage from './services/Stage';

const KINDS = ['flow', 'dash', 'link', 'ai']; // services.items, in order
const DWELL = 8.5; // seconds each kind plays before the next (about one loop of its demo)

/*
 * The four kinds of systems, shown working. The list is the content; the stage beside it (services/Stage.jsx) runs
 * the chosen kind as a small live system, fixing one of the scraps from the hero.
 * While the section is on screen it moves through the four on its own; the lime line along the chosen row shows how
 * long until the next. Pointing at a row (or focusing it) picks it and holds it; tapping picks it on touch screens.
 * On desktop the rows open one at a time; on phones every row stays open, so nothing reflows while you read.
 */
export default function Services() {
  const { t, i18n } = useTranslation();
  const items = t('services.items');
  const list = Array.isArray(items) ? items.slice(0, KINDS.length) : [];
  const reduced = useReduced();
  const [active, setActive] = useState(0);
  const [lap, setLap] = useState(0); // restarts the progress line
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);
  const intent = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(intent.current); };
  }, []);

  const pick = (i) => { clearTimeout(intent.current); setActive(i); setLap((l) => l + 1); };
  const next = () => { setActive((a) => (a + 1) % KINDS.length); setLap((l) => l + 1); };
  const auto = seen && !hold;

  return (
    <section id="services" ref={ref} data-shape="2" data-x="1.7" data-mx="0" data-my="1.4" data-scale="0.95" data-alpha="0.8" data-malpha="0.4" className="relative pb-24 pt-8 sm:pb-32 sm:pt-10">
      <div className="wrap relative z-10">
        <Tag>{t('services.tag')}</Tag>
        <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[1] tracking-[-0.045em]">
          <Lines key={i18n.language} lines={[t('services.title')]} />
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <ol className="border-t border-paper/[0.1]" onPointerLeave={() => { clearTimeout(intent.current); setHold(false); }}>
              {list.map((it, i) => {
                const on = i === active;
                return (
                  <li key={it.title} className="relative border-b border-paper/[0.1]">
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`svc-${i}`}
                      onClick={() => pick(i)}
                      onFocus={() => { setHold(true); pick(i); }}
                      onBlur={() => setHold(false)}
                      onPointerEnter={(e) => {
                        if (e.pointerType !== 'mouse') return;
                        setHold(true);
                        clearTimeout(intent.current);
                        intent.current = setTimeout(() => pick(i), 110); // a pointer passing over doesn't count
                      }}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-offset-[-2px] lg:py-7"
                    >
                      <span className={`text-[clamp(1.7rem,2.6vw,2.7rem)] font-medium leading-[1.02] tracking-[-0.045em] transition-colors duration-500 ${on ? 'text-paper' : 'text-ink-200 group-hover:text-paper lg:text-ink-500 lg:group-hover:text-ink-200'}`}>{it.title}</span>
                      <span className={`hidden h-9 w-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 lg:grid ${on ? 'border-lime bg-lime text-ink' : '-rotate-45 border-paper/15 text-ink-400'}`}>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                    <div id={`svc-${i}`} className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)] max-lg:grid-rows-[1fr] ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="min-h-0 overflow-hidden">
                        <p className="max-w-[46ch] text-[16px] leading-relaxed text-ink-200">{it.desc}</p>
                        <p className="max-w-[46ch] pb-7 pt-2 text-[13.5px] leading-relaxed text-ink-400">{t('services.eg')}: {it.eg}</p>
                      </div>
                    </div>
                    {/* how long until the next one */}
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
                      {on && reduced === false && (
                        <span key={lap} onAnimationEnd={next} className="svc-progress block h-full bg-lime" style={{ animationDuration: `${DWELL}s`, animationPlayState: auto ? 'running' : 'paused' }} />
                      )}
                      {on && reduced && <span className="block h-full bg-lime" />}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-400">{t('services.also')}</p>
          </Reveal>

          <div className="order-first lg:order-none lg:col-span-7">
            <Stage kind={KINDS[active]} run={seen} />
          </div>
        </div>
      </div>
    </section>
  );
}
