/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        Inclusive: ["Inclusive Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        permanent: ["Permanent Marker", "cursive"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
