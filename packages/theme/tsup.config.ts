import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  dts: true,
  entry: ['src/index.ts'],
  external: [
    '@emotion/react',
    '@emotion/styled',
    '@mui/material',
    '@tanstack/react-router',
    'react',
    'react-dom',
  ],
  format: ['esm'],
  minify: !options.watch,
  sourcemap: true,
  splitting: false,
  treeshake: true,
}));
