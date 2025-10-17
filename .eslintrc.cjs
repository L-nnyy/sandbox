module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    next: {
      rootDir: ['apps/web'],
    },
  },
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
      extends: ['next/core-web-vitals'],
    },
  ],
};
