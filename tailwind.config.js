/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#00A8D0",
        secondary: "#FFB423",
        main: "#2D2D2D",
        danger: "#F93939",
        gray: "#8F8F8F",
        neutral: "#BFBFBF",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          paddingLeft: "16px",
          paddingRight: "16px",
          "@screen sm": {
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "0",
            paddingRight: "0",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "920px",
          },
          "@screen xl": {
            maxWidth: "1120px",
          },
          "@screen 2xl": {
            maxWidth: "1440px",
          },
        },
      });
    }),
  ],
};
