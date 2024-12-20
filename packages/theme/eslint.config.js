import { config as baseConfig } from '@repo/eslint-config/base';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.lint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/theme/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },
];
