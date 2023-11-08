/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#4EC330',
        pink: '#FFAED5',
        black: '#141010',
        white: '#FCFCFC',
        'yellow': '#F8FC3E',
        blue: '#45B1ED',
        red: '#F63B3B',
        gray: '#868686'
      }
    },
  },
  plugins: [],
};
