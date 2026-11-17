import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import i18n from './i18n';
import { AppShell } from './App';
import { PAGES, SITE, headFor, headHtml, jsonLd } from './lib/seo';

export { PAGES, SITE };

/**
 * Build-time render of one page: the full markup (so crawlers and link previews see real content without running
 * JavaScript) plus its head tags. The browser then starts the app on top of it as usual.
 */
export async function render(page) {
  await i18n.changeLanguage(page.lang);
  const app = renderToString(
    <StaticRouter location={page.path}>
      <AppShell />
    </StaticRouter>,
  );
  const ld = page.key === 'home' ? jsonLd(page.lang, i18n.t.bind(i18n)) : null;
  return { app, head: headHtml(headFor(page.path, page.lang), ld), lang: page.lang };
}
