/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F1',
        'cream-soft': '#F2EDE3',
        ink: '#0F1B2D',
        'ink-soft': '#2A3547',
        brass: '#B8884C',
        'brass-deep': '#8F6932',
        forest: '#1F3A2E',
        stone: '#6B7280',
        'stone-light': '#9CA3AF',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Modular scale 1.250 (major third), base 16
        'xs': ['0.8rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.65' }],
        'lg': ['1.25rem', { lineHeight: '1.5' }],
        'xl': ['1.563rem', { lineHeight: '1.4' }],
        '2xl': ['1.953rem', { lineHeight: '1.25' }],
        '3xl': ['2.441rem', { lineHeight: '1.15' }],
        '4xl': ['3.052rem', { lineHeight: '1.05' }],
        '5xl': ['3.815rem', { lineHeight: '1.0' }],
        '6xl': ['4.768rem', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        wider: '0.08em',
      },
      maxWidth: {
        'prose-narrow': '38ch',
        'prose-wide': '72ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'underline-draw': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
