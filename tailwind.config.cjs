/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#4EC330',
        'primary-pink': '#FFAED5',
        'primary-black': '#141010',
        'primary-white': '#FCFCFC',
        'primary-yellow': '#F8FC3E',
        'primary-blue': '#45B1ED',
        'primary-red': '#F63B3B',
        'primary-gray': '#868686',
        'primary-transparent': 'rgba(0,0,0,0)'
      },
    },
  },
  plugins: [],
};
