module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  media: false, // or 'darkMode'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['Gilroy', 'Arial', 'sans-serif'],
      body: ['Alice', 'Arial', 'sans-serif'],
      serif: ['Yoster-Island', 'serif'],
    },
    extend: {},
  },
  variants: {
    // all the following default to ['responsive']
    mixBlendMode: ['responsive'],
    backgroundBlendMode: ['responsive'],
    isolation: ['responsive'],
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-blend-mode')(),
    require('tailwind-scrollbar-hide'),
  ],
};
