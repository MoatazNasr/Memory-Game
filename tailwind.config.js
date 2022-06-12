module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        body :['Shalimar']
      },
      spacing:{
        '96': '760px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
