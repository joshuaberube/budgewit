const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./src/**/*.{js}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {},
    colors: {
      gray: colors.blueGray,
      red: colors.red,
      green: colors.emerald,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
