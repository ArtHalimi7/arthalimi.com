import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000, // Increase warning limit for 3D engine and physics components
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@splinetool') || id.includes('howler')) {
              return 'spline';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'animations';
            }
            if (id.includes('three')) {
              return 'three';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('lenis')) {
              return 'vendor';
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui') || id.includes('clsx') || id.includes('tailwind')) {
              return 'ui';
            }
            return 'dependencies'; // Catch-all for other deps to keep main index small
          }
        }
      }
    }
  }
})
