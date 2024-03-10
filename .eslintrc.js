module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'multiline-ternary': 'off',
  },
};
