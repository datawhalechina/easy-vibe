import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  {
    ignores: ['node_modules/**', 'docs/.vitepress/dist/**', 'docs/.vitepress/cache/**']
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: false
        }
      }
    },
    rules: {
      // Important Vue rules - keep as errors
      'vue/no-ref-as-operand': 'error',
      'vue/no-template-shadow': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/no-mutating-props': 'error',
      'vue/return-in-computed-property': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-async-in-computed-properties': 'error',
      'no-undef': 'error',

      // Relaxed rules - warnings or off
      'vue/no-setup-props-destructure': 'warn',
      'vue/require-valid-default-prop': 'off',
      'no-unused-vars': 'warn',

      // Disable formatting rules (handled by Prettier)
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/first-attribute-linebreak': 'off',

      // Other Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off', // v-html is common in docs
      'no-case-declarations': 'off', // Too strict for demo code
      'no-control-regex': 'off', // Terminal codes need this
      'no-useless-escape': 'warn', // Sometimes needed for clarity
      'no-dupe-keys': 'error', // Real issue
      'no-prototype-builtins': 'warn', // Common in demo code
      'no-dupe-else-if': 'warn', // Sometimes intentional
      'no-async-promise-executor': 'warn' // Common pattern in demo code
    }
  }
]
