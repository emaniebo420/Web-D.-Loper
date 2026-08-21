/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',
        surface: '#101620',
        panel: '#121926',
        line: '#232c3a',
        lineSoft: '#1a212c',
        text: '#e7ebf0',
        textMid: '#8f9bab',
        textDim: '#586374',
        accent: '#6c74f0',
        accentSoft: 'rgba(129, 140, 248, 0.14)',
        accentDim: '#8b92f7',
        success: '#34d399',
        successSoft: 'rgba(52, 211, 153, 0.12)',
        amber: '#f5b350',
        amberSoft: 'rgba(245, 179, 80, 0.12)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.2)',
        cardHover: '0 16px 32px -12px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
