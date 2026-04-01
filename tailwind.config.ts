import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A2E45',
          50: '#EEF2F7',
          100: '#D5E0EC',
          200: '#ABBDDA',
          700: '#1A2E45',
          800: '#132233',
          900: '#0D1822',
        },
        teal: {
          DEFAULT: '#5B9BAD',
          light: '#7AB3C2',
          dark: '#4A7E8E',
        },
        surface: '#F4F5F7',
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
