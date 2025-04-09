import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['**/node_modules/**', 'cucumber.js', 'jest.config.js'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['**/node_modules/**', 'cucumber.js', 'jest.config.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['**/node_modules/**', 'cucumber.js', 'jest.config.js'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
]);
