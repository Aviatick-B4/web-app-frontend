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
          ".swap-button": {
            position: "absolute",
            top: "50px" /* Adjust this value as needed */,
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f0f0f0",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            zIndex: "10",
          },
          ".modal": {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "100%",
          },

          ".overlay": {
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      });
    }),
  ],
};
