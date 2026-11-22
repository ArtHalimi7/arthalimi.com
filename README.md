# Art Halimi Studio — arthalimi.com

The website of Art Halimi Studio, an independent software studio in Germany that builds internal tools, dashboards, integrations and AI automation.

**Live:** https://arthalimi.com

## Overview

This repository is the source of arthalimi.com, the bilingual (English/German) marketing site of Art Halimi Studio. It is a React 19 and Vite app that tells one story from top to bottom: the scraps a team runs on (spreadsheets, chats, sticky notes) turning into one working system. That story is told with a scroll-driven hero, working service demos and a WebGL point cloud that changes shape as you scroll. Every route is prerendered to static HTML at build time from a custom SSR entry, so search engines and link previews get the full content without running JavaScript.

## Features

- Particle intro: the point cloud assembles into the "ART HALIMI" wordmark, fills with lime as a counter runs to 100, then dissolves into the hero. It plays once per browser session and is skipped under reduced motion.
- Scroll-driven hero: scraps are swept by a lime scan line, sorted, and assembled into an exploded 3D app blueprint that docks on screen and then keeps working on its own (orders get approved, automations post to the activity feed).
- Pinned, sideways-scrolling Work section: client sites in an app window (hovering scrolls through the capture) with a phone mockup, a drawn mock of a private system, and a final slot where visitors pick modules and watch a system build itself from their picks. The picks then pre-fill the contact form.
- Services stage with four working demos (workflow, dashboards, integrations, AI inbox) that rotate on their own while on screen; hovering or focusing a row picks it and holds it.
- Process timeline drawn by scroll, where each step's artefact (process map, weekly releases, launch, monitoring) comes alive when the line reaches it.
- Studio section with the studio's principles on a signed sheet (the signature writes itself stroke by stroke) and a card showing the current time in Germany.
- Cut-card UI: the contact form, studio card and footer are SVG shapes with a tab and a filleted notch for their button, redrawn whenever their measured size changes.
- Contact brief with service chips, required-field progress and a honeypot, delivered through Web3Forms with a copy kept in Netlify Forms.
- English and German on their own URLs (`/` and `/de`), German legal pages (Impressum, Datenschutz) kept out of search results, a real 404 page, `sitemap.xml`, Open Graph tags and JSON-LD structured data.
- Lenis smooth scrolling, a custom floating scrollbar on pointer devices, self-hosted fonts, and no cookies or tracking.

## Tech stack

- React 19, React Router 6, Vite 7
- Tailwind CSS 3
- Framer Motion 12, Lenis
- OGL (WebGL)
- i18next with `react-i18next`
- Netlify (static hosting, Netlify Forms), Web3Forms
- Backend: Node.js, Express 4, MySQL (`mysql2`)

## Technical highlights

- **Prerendering without a framework.** `npm run build` makes a client build, an SSR build of [`src/entry-server.jsx`](src/entry-server.jsx), then runs [`scripts/prerender.mjs`](scripts/prerender.mjs). The script renders every page through `StaticRouter` into its own HTML file (`index.html`, `de.html`, `impressum.html`, `datenschutz.html`, `404.html`), injects that page's head tags (plus JSON-LD on the home pages), and writes `sitemap.xml` with hreflang alternates. [`src/lib/seo.js`](src/lib/seo.js) is the single source for head data, used at build time and by the client when the page or language changes. [`vite.config.js`](vite.config.js) splits WebGL, motion and i18n code into their own chunks and preloads the hashed main font file.
- **A scroll-scrubbed 3D hero.** [`src/components/Hero.jsx`](src/components/Hero.jsx) pins a 400vh track, and a single update function derives every style from scroll progress, so scrolling back plays the story in reverse. A small projection function mirrors the CSS 3D transform, so each scrap lands exactly on its module of the blueprint. Style writes are cached and skipped when the value has not changed. Once docked, [`SystemWindow.jsx`](src/components/hero/SystemWindow.jsx) runs its simulation only while the hero is on screen.
- **One WebGL scene for the whole page.** [`src/components/Scene.jsx`](src/components/Scene.jsx) draws a fixed point cloud with OGL. Its five shapes are computed in the vertex shader and blended according to the sections around the middle of the screen, which opt in with `data-shape` attributes. The intro wordmark is sampled from the site font on an offscreen canvas. Fewer points are drawn on small screens, pixel ratio is capped, rendering stops while the tab is hidden, and the GL context is released on unmount.
- **Working service demos.** [`src/components/services/demos.jsx`](src/components/services/demos.jsx) holds four short scripted systems built from the hero's components. They run only while the stage is visible and show their end state under reduced motion. The [services list](src/components/Services.jsx) advances on a CSS progress line and waits briefly before reacting to a passing pointer.
- **Contact delivery that survives an outage.** [`src/components/Contact.jsx`](src/components/Contact.jsx) sends each enquiry to Web3Forms (email) and Netlify Forms (stored copy) in parallel and reports success if either one succeeds (`Promise.any`), with a 15-second abort timeout. The builder at the end of the Work section ([`src/components/work/Slot.jsx`](src/components/work/Slot.jsx)) fills in the message through a custom `ah:brief` event and never overwrites text the visitor typed.
- **Readiness, reduced motion and language that match the prerender.** [`useReduced`](src/lib/motion.js) stays `null` until mount, so the static HTML and the first client render agree. A [ready context](src/lib/ready.js) holds section entrances until the intro finishes. On the home pages the URL sets the language; German browsers are sent to `/de` on their first visit, while crawlers stay on `/` ([`src/App.jsx`](src/App.jsx), [`src/i18n.js`](src/i18n.js)).

## Getting started

Prerequisites: Node.js 20.19+ or 22.12+ (required by Vite 7) and npm.

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # client build, SSR build, then prerender every page and write sitemap.xml into dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

The site itself needs no environment variables.

### Analytics backend (optional)

`backend/` is a standalone Express + MySQL API that records page visits (`POST /api/visit`) and returns them behind HTTP Basic Auth (`GET /api/visits`). The current site does not call it. The table is defined in [`backend/schema.sql`](backend/schema.sql); more detail is in [`backend/README.md`](backend/README.md).

```bash
cd backend
npm install
npm run dev       # start with nodemon
npm start         # start with node
```

It reads its configuration from environment variables (dotenv is supported):

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API listens on (defaults to 4000) |
| `DB_HOST`, `DB_PORT`, `DB_NAME` | MySQL host, port (defaults to 3306) and database name |
| `DB_USER`, `DB_PASSWORD` | MySQL credentials |
| `DB_SSL` | Set to `true` to connect over TLS, verified against `backend/ca.pem` |
| `ADMIN_USER`, `ADMIN_PASS` | Basic Auth credentials for `GET /api/visits`; without both, the endpoint stays locked |
| `KEEP_ALIVE_URL` | URL the service pings every 5 minutes to stay awake on its host |

With `DB_SSL=true` the server expects the managed database's CA certificate at `backend/ca.pem`. That file is not committed; download it from your MySQL provider.

## Project structure

```
.
├── backend/                # Standalone Express + MySQL visit-analytics API
├── public/                 # Icons, robots.txt, web manifest, Netlify _redirects
├── scripts/
│   └── prerender.mjs       # Renders every page to HTML and writes sitemap.xml
├── src/
│   ├── assets/             # Project captures, phone frame, logos
│   ├── components/         # Page sections: Hero, Work, Services, Process, Studio, Contact, ...
│   │   ├── hero/           # The scraps and the assembling system window
│   │   ├── services/       # Services stage and its four demos
│   │   ├── process/        # Step artefacts
│   │   ├── work/           # Private-project mock and the "next one" builder
│   │   └── ui/             # Primitives, cut-card shape, phone frame
│   ├── lib/                # SEO data, cut-card geometry, motion and readiness helpers
│   ├── locales/            # en.json, de.json
│   ├── pages/              # Home, legal pages, 404
│   ├── App.jsx             # Routes, smooth scrolling, language and head sync
│   ├── entry-server.jsx    # Build-time render entry
│   └── main.jsx            # Browser entry
└── vite.config.js          # Chunking and font preload
```

## License

Released under the [MIT License](LICENSE).

## Author

Designed and built by [Art Halimi](https://arthalimi.com) · [GitHub](https://github.com/ArtHalimi7)
