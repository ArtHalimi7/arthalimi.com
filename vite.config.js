import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Preloads the main text font (Geist, Latin) so text paints sooner and the intro's particle wordmark, which waits
 * for this font, can start earlier. The file name has a content hash, so it is looked up in the finished bundle.
 */
function preloadFonts() {
  const wanted = [/geist-latin-wght-normal-[\w-]+\.woff2$/];
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const files = Object.keys(ctx.bundle).filter((f) => wanted.some((re) => re.test(f)));
        return files.map((f) => ({ tag: 'link', attrs: { rel: 'preload', href: `/${f}`, as: 'font', type: 'font/woff2', crossorigin: '' }, injectTo: 'head' }));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadFonts()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/ogl/')) return 'webgl';
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion';
          if (id.includes('i18next')) return 'i18n';
          return 'vendor';
        },
      },
    },
  },
});
