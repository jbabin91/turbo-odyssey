import { config as baseConfig } from '@repo/eslint-config/base';

export default [
  ...baseConfig,
  { ignores: ['packages/**', 'tooling/**'] },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
