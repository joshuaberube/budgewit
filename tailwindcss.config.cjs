const colors = require("tailwindcss/colors")

const values  = {
  "neg210": "-210px",
  "neg105": "-105px",
  "0": "0",
  "2": "2px",
  "4": "4px",
  "6": "6px",
  "8": "8px",
  "10": "10px",
  "12": "12px",
  "16": "16px",
  "19": "19px",
  "24": "24px",
  "32": "32px",
  "40": "40px",
  "48": "48px",
  "64": "64px",
  "80": "80px",
  "96": "96px",
  "105": "105px",
  "128": "128px",
  "152": "152px",
  "192": "192px",
  "210": "210px",
  "256": "256px",
  "384": "384px",
  "512": "512px",
  "640": "640px",
  "768": "768px",
  "full": "100%",
  "100vw": "100vw",
  "100vh": "100vh"
}

module.exports = {
  purge: ['./src/**/*.{js}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'proxima-nova': ["Proxima Nova"]
      },
      width: values,
      height: values,
      borderRadius: {
        "5": "5px",
        "10": "10px",
        "50%": "50%",
        "full": "9999px"
      },
      spacing: values,
    },
    colors: {
      transparent: "transparent",
      gray: colors.blueGray,
      red: colors.red,
      green: colors.emerald,
      yellow: colors.yellow,
      orange: colors.orange
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 5px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    }
  },
  variants: {
    extend: {
      borderRadius: ['hover'],
      zIndex: ['hover']
    },
  },
  plugins: [],
}
