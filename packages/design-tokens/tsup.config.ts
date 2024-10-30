import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  dts: true,
  entry: {
    colors: 'src/lib/colors.ts',
    'font-families': 'src/lib/font-families.ts',
    'font-sizes': 'src/lib/font-sizes.ts',
    'font-weights': 'src/lib/font-weights.ts',
    index: 'src/index.ts',
    'letter-spacings': 'src/lib/letter-spacings.ts',
    'line-heights': 'src/lib/line-heights.ts',
  },
  format: ['esm'],
  minify: !options.watch,
  sourcemap: true,
  splitting: false,
  treeshake: true,
}));
