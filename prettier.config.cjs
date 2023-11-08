// prettier.config.cjs
const path = require('path');

module.exports = {
  plugins: [import('prettier-plugin-tailwindcss')],
  tailwindConfig: path.resolve(__dirname, './tailwind.config.cjs'),
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
};
