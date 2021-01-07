const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./src/**/*.{js}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'proxima-nova': ["Proxima Nova"]
      },
      width: {
        "768": "768px",
        "128": "128px",
        "152": "152px",
        "256": "256px"
      },
      height: {
        "40": "40px",
        "208": "208px",
        "264": "264px"
      },
      borderRadius: {
        "5": "5px",
        "10": "10px"
      },
      spacing: {
        "2": "2px",
        "4": "4px",
        "8": "8px",
        "10": "10px",
        "12": "12px",
        "16": "16px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "80": "80px",
        "96": "96px",
        "152": "152px"
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
