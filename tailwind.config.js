/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        yellow: { DEFAULT: '#FBCD44', dark: '#C49A00' },
        night: { DEFAULT: '#1A1A2E', light: '#22223F' },
        cream: '#F5F0E8',
        wa: '#25D366',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}