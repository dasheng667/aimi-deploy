import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      declaration: false
    }),
  ],
  output: [
    {
      file: 'dist/aimi.js',
      format: 'cjs',
      name: 'aimi',
      sourcemap: false,
      extend: true
    },
  ],
};
