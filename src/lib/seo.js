/*
 * One source of truth for what each page tells search engines and link previews.
 * Used at build time (scripts/prerender.mjs writes it into every HTML file) and in the browser (Seo keeps the head in
 * sync when the language or page changes).
 */
export const SITE = 'https://arthalimi.com';
export const OG_IMAGE = `${SITE}/og.png`;
export const EMAIL = 'arthalimi989@gmail.com';

// Every page that gets its own HTML file. `alt` = the same page in the other language.
export const PAGES = [
  { path: '/', file: 'index.html', lang: 'en', key: 'home', alt: { en: '/', de: '/de' }, priority: '1.0' },
  { path: '/de', file: 'de.html', lang: 'de', key: 'home', alt: { en: '/', de: '/de' }, priority: '1.0' },
  { path: '/impressum', file: 'impressum.html', lang: 'de', key: 'impressum', priority: '0.2' },
  { path: '/datenschutz', file: 'datenschutz.html', lang: 'de', key: 'datenschutz', priority: '0.2' },
  { path: '/404', file: '404.html', lang: 'en', key: 'notfound', noindex: true },
];

const META = {
  home: {
    en: {
      title: 'Custom Internal Tools, Dashboards & Automation | Art Halimi Studio',
      description: 'Art Halimi Studio builds custom internal tools, dashboards, integrations and AI automation for growing teams in Germany, Switzerland and Austria.',
      ogTitle: 'Art Halimi Studio | We build the systems your team runs on',
    },
    de: {
      title: 'Individuelle Software, Dashboards & Automatisierung | Art Halimi Studio',
      description: 'Art Halimi Studio entwickelt individuelle Software für wachsende Teams: interne Tools, Dashboards, Schnittstellen und KI-Automatisierung. Aus Gelsenkirchen.',
      ogTitle: 'Art Halimi Studio | Wir bauen die Systeme, mit denen Ihr Team arbeitet',
    },
  },
  impressum: { de: { title: 'Impressum | Art Halimi Studio', description: 'Impressum von Art Halimi Studio, Softwareentwicklung aus Gelsenkirchen.' } },
  datenschutz: { de: { title: 'Datenschutzerklärung | Art Halimi Studio', description: 'Datenschutzerklärung von Art Halimi Studio: keine Cookies, kein Tracking.' } },
  notfound: {
    en: { title: 'Page not found | Art Halimi Studio', description: 'This page does not exist.' },
    de: { title: 'Seite nicht gefunden | Art Halimi Studio', description: 'Diese Seite existiert nicht.' },
  },
};

export const normPath = (p) => p.replace(/\/+$/, '') || '/';
export const isHomePath = (p) => ['/', '/de'].includes(normPath(p));
export const pageFor = (path) => PAGES.find((p) => p.path === path) ?? PAGES.find((p) => p.key === 'notfound');
export const homePath = (lang) => (lang === 'de' ? '/de' : '/');
export const abs = (path) => `${SITE}${path}`;

/** Everything the head needs for one page, in one language. */
export function headFor(path, lang) {
  const page = pageFor(path);
  const metaSet = META[page.key];
  const m = metaSet[lang] ?? metaSet[page.lang] ?? Object.values(metaSet)[0];
  const known = PAGES.some((p) => p.path === path);
  return {
    lang,
    title: m.title,
    description: m.description,
    ogTitle: m.ogTitle ?? m.title,
    canonical: known && !page.noindex ? abs(page.path) : null,
    robots: page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    alternates: page.alt ? [['en', abs(page.alt.en)], ['de', abs(page.alt.de)], ['x-default', abs(page.alt.en)]] : [],
    ogLocale: lang === 'de' ? 'de_DE' : 'en_US',
    ogLocaleAlt: page.alt ? (lang === 'de' ? 'en_US' : 'de_DE') : null,
    url: abs(known ? page.path : '/'),
  };
}

/** Structured data for the home pages: the studio, its founder, the site, and what it offers. */
export function jsonLd(lang, t) {
  const services = t('services.items');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE}/#studio`,
        name: 'Art Halimi Studio',
        url: abs(homePath(lang)),
        logo: `${SITE}/android-chrome-512x512.png`,
        image: OG_IMAGE,
        email: EMAIL,
        description: META.home[lang].description,
        slogan: `${t('hero.h1a')} ${t('hero.h1b')}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Gelsenkirchen', addressRegion: 'NRW', addressCountry: 'DE' },
        areaServed: [{ '@type': 'Country', name: 'Germany' }, { '@type': 'Country', name: 'Switzerland' }, { '@type': 'Country', name: 'Austria' }, { '@type': 'Place', name: 'Europe' }],
        availableLanguage: ['en', 'sq'], // the Studio section: projects run in English or Albanian
        founder: { '@id': `${SITE}/#art` },
        sameAs: ['https://www.linkedin.com/in/arthalimi/', 'https://github.com/ArtHalimi7'],
        knowsAbout: ['Custom software development', 'Internal tools', 'Workflow automation', 'Dashboards', 'API integration', 'LLM integration', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL'],
        hasOfferCatalog: Array.isArray(services) ? {
          '@type': 'OfferCatalog',
          name: t('services.title'),
          itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.desc } })),
        } : undefined,
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#art`,
        name: 'Art Halimi',
        jobTitle: lang === 'de' ? 'Gründer und leitender Entwickler, Art Halimi Studio' : 'Founder and lead engineer, Art Halimi Studio',
        worksFor: { '@id': `${SITE}/#studio` },
        url: SITE,
        sameAs: ['https://www.linkedin.com/in/arthalimi/', 'https://github.com/ArtHalimi7'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        name: 'Art Halimi Studio',
        url: SITE,
        inLanguage: ['en', 'de'],
        publisher: { '@id': `${SITE}/#studio` },
      },
    ],
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The <head> tags for one page, as HTML (used when prerendering). */
export function headHtml(h, ld) {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${h.robots}" />`,
    h.canonical && `<link rel="canonical" href="${h.canonical}" />`,
    ...h.alternates.map(([l, href]) => `<link rel="alternate" hreflang="${l}" href="${href}" />`),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Art Halimi Studio" />`,
    `<meta property="og:url" content="${h.url}" />`,
    `<meta property="og:title" content="${esc(h.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:locale" content="${h.ogLocale}" />`,
    h.ogLocaleAlt && `<meta property="og:locale:alternate" content="${h.ogLocaleAlt}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Art Halimi Studio" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ld && `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n  ');
}
