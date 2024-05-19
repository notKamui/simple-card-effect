import antfu from '@antfu/eslint-config'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import nextPlugin from '@next/eslint-plugin-next'

export default antfu({
  typescript: true,
  vue: false,
  react: true,
  ignores: [
    'node_modules/**/*',
    'dist/**/*',
    '.next/**/*',
  ],
  rules: {
    'curly': ['error', 'multi-line'],
    'brace-style': 'off',
    'antfu/if-newline': 'off',
    'antfu/generic-spacing': 'off',
    'react/prop-types': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/jsx-one-expression-per-line': 'off',
    'ts/ban-types': 'off',
  },
}, {
  files: ['**/*.ts', '**/*.tsx', '**/*.html', '**/*.css'],
  plugins: { tailwindcss: tailwindPlugin },
  settings: {
    tailwindcss: {
      callees: ['className', 'classnames', 'classNames', 'clsx', 'cn', 'cva'],
    },
  },
  rules: {
    ...tailwindPlugin.configs.recommended.rules,
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/enforces-shorthand': 'off',
  },
}, {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: { '@next/next': nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    'react-refresh/only-export-components': 'off', // off because Next.js
  },
})
