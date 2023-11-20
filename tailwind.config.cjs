/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg1': '#706231',
        'bg2': '#312808',
        'primary': '#FFD600',
        'primary-green': '#0FBE0C',
      },
      fontFamily: {
        header: ["Pirata One"],
        body: ["Kadwa"]
      }
    },
  },
  plugins: [],
};
