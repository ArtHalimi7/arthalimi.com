// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const principles = [
    {
      title: t('about.principle1.title'),
      desc: t('about.principle1.desc'),
    },
    {
      title: t('about.principle2.title'),
      desc: t('about.principle2.desc'),
    },
    {
      title: t('about.principle3.title'),
      desc: t('about.principle3.desc'),
    },
  ];

  const stats = [
    { label: t('about.deployment_index'), val: t('stats.projects_value_short') },
    { label: t('about.structural_uptime'), val: t('stats.structural_uptime_value') },
    { label: t('about.active_experience'), val: t('stats.active_experience_value') },
    { label: t('about.response_protocol'), val: t('stats.response_protocol_value') },
  ];

  return (
    <section id="about" style={{ padding: '2rem 0', color: '#fff', background: '#18181b' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 12, letterSpacing: 2, color: '#a78bfa', textTransform: 'uppercase' }}>{t('about.system_overview')}</span>
          <h2 style={{ fontSize: 48, fontWeight: 200, margin: '16px 0 0 0', lineHeight: 1.1 }}>
            {t('about.architecting')} <br />
            <span style={{ color: '#52525b', fontStyle: 'italic' }}>{t('about.precision')}</span> <br />
            {t('about.interfaces')}
          </h2>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: '#a1a1aa', fontSize: 18, fontWeight: 300, maxWidth: 600 }}>{t('about.specialization')}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
          {principles.map((item, i) => (
            <div key={i} style={{ background: '#232336', borderRadius: 12, padding: 24, border: '1px solid #27272a' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontSize: 14, color: '#a1a1aa', marginRight: 8 }}>{`0${i + 1}`}</span>
                <div>
                  <h4 style={{ fontSize: 22, fontWeight: 300, margin: 0 }}>{item.title}</h4>
                  <p style={{ fontSize: 15, color: '#a1a1aa', margin: '8px 0 0 0' }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, borderTop: '1px solid #27272a', paddingTop: 32 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 10, color: '#a1a1aa', letterSpacing: 2, marginBottom: 6 }}>{stat.label}</span>
              <span style={{ fontSize: 32, fontWeight: 200, color: '#fff', fontStyle: 'italic' }}>{stat.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;