module.exports = {
  purge: [
    'public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
      serif: ['Yoster-Island', 'serif'],
    },
    extend: {},
  },
  variants: {
    // all the following default to ['responsive']
    mixBlendMode: ['responsive'],
    backgroundBlendMode: ['responsive'],
    isolation: ['responsive'],
  },
  plugins: [require('tailwindcss-blend-mode')()],
}
