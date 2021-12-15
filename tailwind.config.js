module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  media: false, // or 'darkMode'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      display: ["Gilroy", "Arial", "sans-serif"],
      body: ["Alice", "Arial", "sans-serif"],
      serif: ["Yoster-Island", "serif"],
    },
    extend: {},
  },
  variants: {
    // all the following default to ['responsive']
    mixBlendMode: ["responsive"],
    backgroundBlendMode: ["responsive"],
    isolation: ["responsive"],
    extend: {},
  },
  plugins: [require("tailwindcss-blend-mode")()],
};
