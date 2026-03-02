// Imports ESLint's core recommended rules (catches common JS mistakes)
import js from '@eslint/js'
// Imports browser global variables (window, document, etc.) so ESLint doesn't flag them as undefined
import globals from 'globals'
// Imports rules that enforce correct usage of React Hooks (e.g. no hooks inside if statements)
import reactHooks from 'eslint-plugin-react-hooks'
// Imports rules that warn if you export components in ways that break Vite's Hot Module Replacement
import reactRefresh from 'eslint-plugin-react-refresh'
// Imports helper functions for defining the ESLint config
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Tells ESLint to completely skip the dist/ folder (your production build output)
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],  // Apply these rules to all .js and .jsx files
    extends: [
      js.configs.recommended,               // Base JS best practices (no undefined vars, etc.)
      reactHooks.configs.flat.recommended,  // Enforces Rules of Hooks
      reactRefresh.configs.vite,            // Ensures HMR works correctly in Vite
    ],
    languageOptions: {
      ecmaVersion: 2020,          // Allows modern JS syntax (optional chaining, nullish coalescing, etc.)
      globals: globals.browser,   // Recognizes browser globals so ESLint doesn't flag them as errors
      parserOptions: {
        ecmaVersion: 'latest',          // Parser uses the latest JS syntax support
        ecmaFeatures: { jsx: true },    // Enables JSX parsing (needed for React components)
        sourceType: 'module',           // Treats files as ES modules (import/export syntax)
      },
    },
    rules: {
      // Flags unused variables as errors, EXCEPT those starting with a capital letter or underscore
      // (Capital letter exclusion is useful for imported React components you define but don't use yet)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])