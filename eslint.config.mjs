import expoConfig from 'eslint-config-expo/flat.js'
import prettierConfig from 'eslint-config-prettier/flat'
import prettierPlugin from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  expoConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
  },
  {
    ignores: ['.expo', 'dist', 'node_modules'],
  },
  prettierConfig,
  {
    rules: {
      'import/no-duplicates': 'warn',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'error',
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
