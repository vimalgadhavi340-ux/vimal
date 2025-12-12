/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#050505',
          panel: '#0a0a0a',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      }
    }
  },
  plugins: [],
}