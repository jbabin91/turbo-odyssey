import base from '@repo/eslint-config/base.js';

export default [
  ...base,
  { ignores: ['packages/**', 'tooling/**'] },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
