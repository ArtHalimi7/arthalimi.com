import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Plus } from 'lucide-react';
import { Reveal, Roll, Tag } from './ui/primitives';
import { CutShape } from './ui/cut';
import { GAP, useCut } from '../lib/cut';

const EMAIL = 'hello@arthalimi.com';
const REQUIRED = ['name', 'email', 'message'];

/** The email, as a card: the address opens the mail app, the round button copies it. */
function EmailCard({ label, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* the link still works */ }
  };
  return (
    <div className="rounded-[20px] border border-paper/[0.09] bg-ink-850/70 p-5 sm:p-6">
      <p aria-live="polite" className={`flex items-center gap-1.5 text-[13px] transition-colors duration-300 ${copied ? 'text-lime' : 'text-ink-400'}`}>{copied ? <><Check className="h-3.5 w-3.5" strokeWidth={2.5} />{copiedLabel}</> : label}</p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <a href={`mailto:${EMAIL}`} className="group/e flex min-w-0 items-center gap-2 text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium tracking-[-0.02em] text-paper">
          <span className="truncate">{EMAIL}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-400 transition-[color,transform] duration-300 group-hover/e:-translate-y-0.5 group-hover/e:translate-x-0.5 group-hover/e:text-lime" />
        </a>
        <button type="button" onClick={copy} aria-label={copyLabel} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300 ${copied ? 'border-lime bg-lime text-ink' : 'border-paper/15 text-ink-300 hover:border-paper/40 hover:text-paper'}`}>
          {copied ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/** What happens after the brief is sent. Once it's sent, the first step ticks off and the second is the live one. */
function NextSteps({ title, steps, sent }) {
  if (!Array.isArray(steps)) return null;
  const now = sent ? 1 : 0;
  return (
    <div>
      <p className="text-[13px] text-ink-400">{title}</p>
      <ol className="relative mt-5">
        <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-paper/[0.1]" />
        <span aria-hidden="true" className="absolute left-[7px] top-3 w-px origin-top bg-lime transition-[height] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ height: sent ? '42%' : 0 }} />
        {steps.map((s, i) => (
          <li key={s.when} className="relative pb-6 pl-9 last:pb-0">
            <span aria-hidden="true" className={`absolute left-0 top-[3px] grid h-[15px] w-[15px] place-items-center rounded-full border transition-colors duration-500 ${i < now ? 'border-lime bg-lime text-ink' : i === now ? 'border-lime bg-ink' : 'border-paper/20 bg-ink'}`}>
              {i < now ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : i === now ? <span className="h-[5px] w-[5px] animate-pulseDot rounded-full bg-lime" /> : null}
            </span>
            <p className={`text-[12.5px] transition-colors duration-500 ${i === now ? 'text-lime' : 'text-ink-400'}`}>{s.when}</p>
            <p className="mt-1 max-w-[30ch] text-[15.5px] leading-snug text-ink-100">{s.what}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Field({ n, label, hot = false, ...props }) {
  const El = props.rows ? 'textarea' : 'input';
  return (
    <label className="group/f relative block">
      <span className="flex items-baseline gap-2.5 text-[13px] text-ink-300 transition-colors duration-300 group-focus-within/f:text-paper">
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-500 transition-colors duration-300 group-focus-within/f:text-lime">{n}</span>
        {label}
      </span>
      <El {...props} className="peer mt-2.5 block w-full resize-none border-b border-paper/[0.12] bg-transparent pb-3 text-[18px] text-paper outline-none transition-colors duration-300 hover:border-paper/25 focus-visible:outline-none" />
      {/* the focus line draws in from the left */}
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-lime transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] peer-focus:scale-x-100 ${hot ? 'scale-x-100' : 'scale-x-0'}`} />
    </label>
  );
}

export default function Contact() {
  const { t, i18n } = useTranslation();
  const needs = t('contact.needs');
  const [picked, setPicked] = useState([]);
  const [state, setState] = useState('idle');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 25%'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['-12%', '0%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['12%', '0%']);
  const toggle = (n) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  // the card's shape follows its own size, the tab's and the button's (ui/cut.jsx)
  const { box, tab, btn, dims } = useCut();

  // a lime light runs once round the edge when the form arrives, and again when a brief lands or it's sent
  const seen = useInView(box, { once: true, margin: '0px 0px -15% 0px' });
  const [trace, setTrace] = useState(0);

  // how much of the brief is filled in (name, a valid email, a message)
  const form = useRef(null);
  const [done, setDone] = useState(0);
  const check = useCallback(() => {
    const els = form.current?.elements;
    if (els) setDone(REQUIRED.filter((k) => els[k]?.value.trim() && els[k].checkValidity()).length);
  }, []);

  // the builder at the end of the Work run hands over what the visitor picked (Work → work/Slot.jsx)
  const message = useRef(null);
  const filled = useRef('');
  const [hot, setHot] = useState(false);
  useEffect(() => {
    let off = 0;
    const onBrief = (e) => {
      const text = e.detail?.text;
      const el = message.current;
      if (!text || !el) return;
      // never overwrite what the visitor typed themselves
      if (!el.value.trim() || el.value === filled.current) { el.value = text; filled.current = text; }
      check();
      const list = t('contact.needs');
      setPicked((p) => (p.length || !Array.isArray(list) ? p : [list[0]]));
      setHot(true);
      setTrace((n) => n + 1);
      clearTimeout(off);
      off = setTimeout(() => {
        setHot(false);
        // once the scroll has landed: ready to type (not on touch screens, where focus pops the keyboard up)
        if (window.matchMedia('(pointer: fine)').matches) document.querySelector('#contact-form input[name=name]')?.focus({ preventScroll: true });
      }, 1700);
    };
    window.addEventListener('ah:brief', onBrief);
    return () => { window.removeEventListener('ah:brief', onBrief); clearTimeout(off); };
  }, [t, check]);

  const submit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    if (data.get('_honey')) return;
    setState('sending');
    // Netlify Forms: the form is found in the prerendered HTML at deploy, and submissions are posted back to the site.
    // Netlify stores them and emails them to the address set under Site configuration → Notifications.
    data.set('needs', picked.join(', ') || '-');
    data.set('company', data.get('company') || '-');
    data.set('subject', `New enquiry from ${data.get('name')}`);
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15000); // never leave the button on "Sending…"
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
        signal: ctl.signal,
      });
      if (!res.ok) throw new Error('failed');
      setState('sent');
      setTrace((n) => n + 1);
      formEl.reset();
      setPicked([]);
      setDone(0);
    } catch {
      setState('error');
    } finally {
      clearTimeout(timer);
    }
  };
  const onInput = () => {
    check();
    if (state === 'sent' || state === 'error') setState('idle');
  };

  return (
    <section id="contact" ref={ref} data-shape="0" data-x="0" data-mx="0" data-my="0" data-scale="1.25" data-mscale="0.9" data-alpha="0.5" data-malpha="0.3" className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative z-10">
        <div className="wrap"><Tag>{t('contact.tag')}</Tag></div>
        <h2 key={i18n.language} className="mt-10 text-center text-[clamp(3.4rem,12vw,12.5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
          <m.span style={{ x: x1 }} className="block whitespace-nowrap will-change-transform">{t('contact.big1')}</m.span>
          <m.span style={{ x: x2 }} className="block whitespace-nowrap text-ink-300 will-change-transform">{t('contact.big2')}</m.span>
        </h2>

        <div className="wrap mt-24 grid gap-16 lg:grid-cols-12">
          {/* the side: a promise, what happens next, and the address, spread to the height of the form */}
          <Reveal className="lg:col-span-4">
            <div className="flex h-full flex-col gap-12 lg:pt-11">
              <p className="max-w-[17ch] text-[clamp(1.6rem,2.3vw,2.15rem)] font-medium leading-[1.12] tracking-[-0.035em]">{t('contact.lead')}</p>
              <NextSteps title={t('contact.nextTitle')} steps={t('contact.next', { returnObjects: true })} sent={state === 'sent'} />
              <div className="lg:mt-auto">
                <EmailCard label={t('contact.direct')} copyLabel={t('contact.copy')} copiedLabel={t('contact.copied')} />
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div ref={box} className={`group relative pt-11 ${dims ? '' : 'rounded-[28px] bg-ink/90'}`}>
              <CutShape dims={dims} trace={trace} play={seen} className="stroke-paper/[0.09] transition-[stroke] duration-500 group-focus-within:stroke-paper/[0.2]" />

              {/* the tab */}
              <div ref={tab} className="absolute left-0 top-0 flex h-11 items-center gap-2 pl-6 pr-5 sm:pl-10 sm:pr-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-300">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-lime" />
                {t('contact.brief')}
              </div>

              {/* eslint-disable-next-line react/no-unknown-property -- Netlify reads this attribute from the prerendered HTML */}
              <form id="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="_honey" ref={form} onSubmit={submit} onInput={onInput} className="relative px-6 pt-8 sm:px-10 sm:pt-10">
                {/* Netlify Forms: the form's name, a trap field for bots, and the fields filled in on send (they must exist here
                    for Netlify to keep them) */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="needs" value="" />
                <input type="hidden" name="language" value={i18n.language} />
                <input type="hidden" name="subject" value="" />
                <div className="grid gap-10 sm:grid-cols-2">
                  <Field n="01" label={t('contact.name')} name="name" required autoComplete="name" />
                  <Field n="02" label={t('contact.email')} name="email" type="email" required autoComplete="email" />
                </div>
                <div className="mt-10"><Field n="03" label={t('contact.company')} name="company" autoComplete="organization" /></div>
                <fieldset className="mt-10">
                  <legend className="flex items-baseline gap-2.5 text-[13px] text-ink-300">
                    <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-500">04</span>
                    {t('contact.need')}
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.isArray(needs) && needs.map((n) => {
                      const on = picked.includes(n);
                      return (
                        <button key={n} type="button" onClick={() => toggle(n)} aria-pressed={on} className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-[14px] transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.97] ${on ? 'border-lime/50 bg-lime/[0.07] text-paper' : 'border-paper/[0.12] text-ink-200 hover:border-paper/35 hover:text-paper'}`}>
                          <span className={`grid h-6 w-6 place-items-center rounded-full border transition-colors duration-300 ${on ? 'border-lime bg-lime text-ink' : 'border-paper/20 text-ink-400'}`}>
                            {on ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Plus className="h-3.5 w-3.5" />}
                          </span>
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="mt-10"><Field n="05" ref={message} hot={hot} label={t('contact.message')} name="message" rows={4} required /></div>

                {/* the last row runs alongside the notch: how far the brief is, or how sending went */}
                <div className="mt-8 flex min-h-14 items-center gap-3" style={dims ? { paddingRight: dims.bw + GAP + 12 } : undefined}>
                  {state === 'idle' || state === 'sending' ? (
                    <div aria-hidden="true" className="flex items-center gap-3">
                      <span className="flex gap-1">
                        {REQUIRED.map((k, i) => <span key={k} className={`h-[3px] w-5 rounded-full transition-colors duration-500 ${i < done ? 'bg-lime' : 'bg-paper/[0.12]'}`} />)}
                      </span>
                      <span className={`font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-500 ${done === REQUIRED.length ? 'text-lime' : 'text-ink-400'}`}>
                        {done === REQUIRED.length ? t('contact.ready') : `${done}/${REQUIRED.length}`}
                      </span>
                    </div>
                  ) : null}
                  <p aria-live="polite" className={`text-[13px] leading-snug sm:text-[14px] ${state === 'error' ? 'text-red-400' : 'text-lime'}`}>
                    {state === 'sent' && t('contact.sent')}
                    {state === 'error' && t('contact.error')}
                  </p>
                </div>

                <button ref={btn} type="submit" disabled={state === 'sending'} className="btn btn-lime absolute bottom-0 right-0 h-14 px-7 py-0 text-[16px] disabled:opacity-60">
                  <Roll>{state === 'sending' ? t('contact.sending') : t('contact.send')}</Roll> <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
