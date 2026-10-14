/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme tokens (values live in src/index.css, they switch with .dark)
        background: 'rgb(var(--background) / <alpha-value>)',
        thirdary: 'rgb(var(--thirdary) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        editorial: "0.2em",
        wideDisplay: "0.15em",
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        floating: 'floating 4s ease-in-out infinite',
        cursor: 'blink 1.5s infinite',
      },
      keyframes: {
        floating: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        blink: { '0%, 50%, 100%': { opacity: '1' }, '25%, 75%': { opacity: '0' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
