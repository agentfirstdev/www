/* eslint-env node */

module.exports = {
  env: { node: true, browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: { presets: ['@babel/preset-react'] }
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react', 'react-hooks', 'react-refresh', 'prettier'],
  rules: {
    'no-undef': 'error',
    'no-use-before-define': 'error',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'warn'
  }
};
