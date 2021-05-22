const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
