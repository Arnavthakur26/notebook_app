/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        alertOpen: {
          "0%": { top: "2rem" },
          "100%": { top: "3rem" },
        },
        alertClose: {
          "0%": { opacity: "100%" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        alertOpen: "alertOpen 300ms ease-out forwards",
        alertClose: "alertClose 300ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
