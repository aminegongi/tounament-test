const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './shared/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    colors: {
      ...colors,
      primary: '#26beb5',
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      primary: '#26beb5',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
