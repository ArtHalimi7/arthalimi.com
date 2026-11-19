import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, Roll, Tag } from './ui/primitives';

const EMAIL = 'arthalimi989@gmail.com';

function Field({ label, hot = false, ...props }) {
  const Tag2 = props.rows ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="text-[13px] text-ink-300">{label}</span>
      <Tag2 {...props} className={`mt-2 w-full resize-none border-b bg-transparent pb-3 text-[18px] text-paper outline-none transition-colors duration-700 focus:border-lime ${hot ? 'border-lime' : 'border-paper/15'}`} />
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
      const list = t('contact.needs');
      setPicked((p) => (p.length || !Array.isArray(list) ? p : [list[0]]));
      setHot(true);
      clearTimeout(off);
      off = setTimeout(() => {
        setHot(false);
        // once the scroll has landed: ready to type (not on touch screens, where focus pops the keyboard up)
        if (window.matchMedia('(pointer: fine)').matches) document.querySelector('#contact-form input[name=name]')?.focus({ preventScroll: true });
      }, 1700);
    };
    window.addEventListener('ah:brief', onBrief);
    return () => { window.removeEventListener('ah:brief', onBrief); clearTimeout(off); };
  }, [t]);

  const submit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    if (form.get('_honey')) return;
    setState('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          company: form.get('company') || '-',
          needs: picked.join(', ') || '-',
          message: form.get('message'),
          language: i18n.language,
          _subject: `Art Halimi Studio: new enquiry from ${form.get('name')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === 'false') throw new Error('failed');
      setState('sent');
      formEl.reset();
      setPicked([]);
    } catch {
      setState('error');
    }
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
          <Reveal className="lg:col-span-4">
            <p className="max-w-[34ch] text-[17px] leading-relaxed text-ink-200">{t('contact.lead')}</p>
            <p className="mt-12 text-[13px] text-ink-400">{t('contact.direct')}</p>
            <a href={`mailto:${EMAIL}`} className="link-line mt-2 text-[20px] font-medium tracking-[-0.02em]">{EMAIL}</a>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <form id="contact-form" onSubmit={submit} className="rounded-[24px] border border-paper/[0.09] bg-ink/90 p-6 sm:p-10">
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-10 sm:grid-cols-2">
                <Field label={t('contact.name')} name="name" required autoComplete="name" />
                <Field label={t('contact.email')} name="email" type="email" required autoComplete="email" />
              </div>
              <div className="mt-10"><Field label={t('contact.company')} name="company" autoComplete="organization" /></div>
              <fieldset className="mt-10">
                <legend className="text-[13px] text-ink-300">{t('contact.need')}</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.isArray(needs) && needs.map((n) => {
                    const on = picked.includes(n);
                    return (
                      <button key={n} type="button" onClick={() => toggle(n)} aria-pressed={on} className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${on ? 'border-lime bg-lime text-ink' : 'border-paper/15 text-ink-200 hover:border-paper/40'}`}>
                        {n}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="mt-10"><Field ref={message} hot={hot} label={t('contact.message')} name="message" rows={4} required /></div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <p aria-live="polite" className={`text-[14px] ${state === 'error' ? 'text-red-400' : 'text-lime'}`}>
                  {state === 'sent' && t('contact.sent')}
                  {state === 'error' && t('contact.error')}
                </p>
                <button type="submit" disabled={state === 'sending'} className="btn btn-lime disabled:opacity-60">
                  <Roll>{state === 'sending' ? t('contact.sending') : t('contact.send')}</Roll> <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
