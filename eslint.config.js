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
    files: ['**/*.vue', '**/*.js'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'vue/no-ref-as-operand': 'error',
      'vue/no-setup-props-destructure': 'error',
      'vue/no-template-shadow': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/no-mutating-props': 'error',
      'vue/return-in-computed-property': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-async-in-computed-properties': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  }
]
