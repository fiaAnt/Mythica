import { defineConfig } from 'eslint/config'
import expoConfig from 'eslint-config-expo/flat.js'
import prettierConfig from 'eslint-config-prettier/flat'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
  expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['.expo', 'dist', 'node_modules'],
  },
  {
    rules: {
      'import/no-duplicates': 'warn',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'error',
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  prettierConfig,
])
