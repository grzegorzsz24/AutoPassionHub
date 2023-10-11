/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
      },
      colors: {
        primaryDark: "#0F172A",
      },
    },
  },
  plugins: [],
};
