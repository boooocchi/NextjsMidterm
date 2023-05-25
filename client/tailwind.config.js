/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Helvetica Neue", "sans-serif"],
        main: ["Oswald", "sans-serif"]
      },
      colors: {
        accent: "#d6d30ee2",
        grayblack: "#9BA3AF"
      }
    }
  },
  plugins: []
};
