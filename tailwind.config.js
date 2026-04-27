/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e14',
        surface: '#121820',
        'surface-2': '#1a2230',
        'accent-teal': '#00d4aa',
        'accent-blue': '#6366f1',
        'accent-teal-dim': '#00d4aa33',
        'accent-blue-dim': '#6366f133',
        'text-primary': '#e8eaed',
        'text-secondary': '#8b949e',
        risk: '#ef4444',
        moderate: '#f59e0b',
        safe: '#22c55e',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        code: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4aa33' },
          '100%': { boxShadow: '0 0 20px #00d4aa88, 0 0 40px #00d4aa33' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      boxShadow: {
        teal: '0 0 20px #00d4aa44',
        blue: '0 0 20px #6366f144',
        'teal-lg': '0 0 40px #00d4aa33, 0 0 80px #00d4aa11',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
