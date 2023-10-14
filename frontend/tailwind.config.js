/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: "Noto Sans, sans-serif",
    },
    extend: {
      screens: {
        tablet: "860px",
        "3xl": "1800px",
      },
      colors: {
        primaryDark: "#0C1222",
        primaryDark2: "#0F172A",
        grayDark: "#272E3F",
        grayLight: "#DFDFDF",
      },
      backgroundImage: {
        "futuristic-car": "url('/src/assets/images/register_page.webp')",
      },
    },
  },
  plugins: [],
};
