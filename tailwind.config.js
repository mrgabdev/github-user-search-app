/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        brandBlue: 'var(--brand-blue)',
        slateBlue: 'var(--slate-blue)',
        oceanBlue: 'var(--ocean-blue)',
        midnightBlue: 'var(--midnight-blue)',
        softBlue: 'var(--soft-blue)',
        offWhite: 'var(--off-white)',
        navyBlack: 'var(--navy-black)',
      },
      fontWeight: {
        bold: '700',
        regular: '400',
      },
    },
  },
  plugins: [],
}
