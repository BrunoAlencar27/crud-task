import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { prettier: eslintPluginPrettier },
    extends: [js.configs.recommended, eslintConfigPrettier],
    languageOptions: { globals: globals.node },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
