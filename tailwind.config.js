const colorPalette = require("./src/theme/colorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colorPalette.light.primary,
        secondary: colorPalette.light.secondary,
        background: colorPalette.light.background,
        text: colorPalette.light.text,
        error: colorPalette.light.error,
        divider: colorPalette.light.divider,
        dark: colorPalette.dark,
      },
    },
  },
  plugins: [],
};
