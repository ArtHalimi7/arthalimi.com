/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          950: '#050505',
          900: '#0A0A0A',
          850: '#111111',
          800: '#161616',
          700: '#222222',
          600: '#2E2E2E',
          500: '#4A4A4A',
          400: '#6E6E6E',
          300: '#9A9A96',
          200: '#C9C9C4',
          100: '#E8E8E3',
        },
        paper: '#F2F2EE',
        lime: { DEFAULT: '#C8FF2E', dim: '#9BC722' },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['clamp(3rem, 8.2vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        h2: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        h3: ['clamp(1.375rem, 2.2vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      // 1360px up to ~1700px screens, then grows with the screen so large monitors aren't a narrow strip
      maxWidth: { site: 'clamp(1360px, 80vw, 1880px)' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.35', transform: 'scale(0.8)' } },
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
