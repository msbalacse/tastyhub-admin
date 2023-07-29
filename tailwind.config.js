/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-background": "var(--primary-background)",
        "primary-color": "var(--primary-color)",
      },
      gridTemplateColumns: {
        main: "250px 1fr",
      },
      fontFamily: {
        Comfortaa: "Comfortaa, cursive",
      },
    },
  },
  plugins: [],
};
