import fs from 'fs';
import resolveConfig from 'tailwindcss/resolveConfig.js';
import prettier from 'prettier';
import path from 'path';
import tailwindConfig from '../tailwind.config.cjs';

const { theme } = resolveConfig(tailwindConfig);
console.log(theme.colors);
const themeStr = JSON.stringify(theme.colors);
const js = `
export const theme  = {
  colors: ${themeStr}
  
}

export default theme
`;

try {
  // write the file to src/theme.js after
  // having prettier format the string for us
  fs.writeFileSync(
    path.resolve(process.cwd(), '../src/theme.ts'),
    await prettier.format(js, { parser: 'babel' }),
    'utf-8'
  );
} catch (err) {
  // uh-oh, something happened here!
  console.log(err.message);
}
