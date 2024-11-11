/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        title: {
          dark: "#25A25A",
          light: "#55D98D",
          main: "#2ECC71",
        },
      },
    },
  },
  plugins: [],
};
