/* eslint-env node */
/*
 * Runs after `vite build` and `vite build --ssr`: renders every page in src/lib/seo.js into its own HTML file in dist/
 * (index.html, de.html, impressum.html, datenschutz.html, 404.html) and writes sitemap.xml with language alternates.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--seo--> block or the empty #root');
}
const { render, PAGES, SITE } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

for (const page of PAGES) {
  const { app, head, lang } = await render(page);
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`);
  fs.writeFileSync(path.join(dist, page.file), html);
  console.log(`prerendered ${page.path.padEnd(13)} → dist/${page.file} (${(html.length / 1024).toFixed(0)} KB, ${lang})`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.filter((p) => !p.noindex).map((p) => {
  const alts = p.alt
    ? [['en', p.alt.en], ['de', p.alt.de], ['x-default', p.alt.en]].map(([l, h]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${h}" />`).join('')
    : '';
  return `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority}</priority>${alts}\n  </url>`;
});
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`sitemap.xml: ${urls.length} URLs`);
