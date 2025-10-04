/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "aqua-green": "#92C6C4",
        "soft-pink": "#F7C8C8",
        "pastel-yellow": "#F6E08B",
        "olive-green": "#98A88B",
        "soft-beige": "#FAF6EF",
        "dark-slate": "#4C4C4C",
      },
    },
  },
  plugins: [],
};
