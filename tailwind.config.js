// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        maritime: {
          blue: "#0a4da3",
          darkBlue: "#072f61",
          lightBlue: "#e6f0fa",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};