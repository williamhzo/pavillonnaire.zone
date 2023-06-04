module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Gilroy', 'Arial', 'sans-serif'],
      body: ['Alice', 'Arial', 'sans-serif'],
      serif: ['Yoster-Island', 'serif'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
