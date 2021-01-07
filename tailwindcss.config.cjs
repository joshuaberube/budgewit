const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./src/**/*.{js}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      width: {
        "768px": "768px",
        "128": "128px",
        "152": "152px",
        "256": "256px"
      },
      height: {
        "40px": "40px"
      },
      borderRadius: {
        "5px": "5px",
        "10px": "10px"
      },
      spacing: {
        "2": "2px",
        "12": "12px",
        "16px": "16px",
        "32px": "32px",
        "48px": "48px",
        "64px": "64px"
      }
    },
    colors: {
      transparent: "transparent",
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
