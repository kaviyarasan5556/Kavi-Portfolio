import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/**', 'legacy/**', '.vercel/**']),
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser },
    settings: { react: { version: 'detect' } },
    rules: {
      // Props are not type-checked in this project (plain JavaScript, no PropTypes).
      'react/prop-types': 'off',
      // react-three-fiber elements (<mesh>, <group>, ...) take three.js properties, not DOM ones.
      'react/no-unknown-property': 'off',
    },
  },
  {
    files: ['api/**/*.js', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
  prettier,
]);
