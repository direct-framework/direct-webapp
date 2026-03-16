module.exports = {
  // Add rules for JavaScript files
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    // indent: ['error', 2], // Disabled as it conflicts with Prettier
    semi: ['error', 'never'],
    'no-var': 'error',
  },
  overrides: [
    {
      // Add rules for Test files
      files: ['**/*.test.{js}'],
      env: {
        browser: true,
        es6: true,
        node: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:storybook/recommended',
      ],
      plugins: ['prettier'],
      parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
      },
      rules: {
        'prettier/prettier': 'error',
        // indent: ['error', 2], // Disabled as it conflicts with Prettier
        semi: ['error', 'never'],
        'no-var': 'error',
      },
      // Include testing globals for vitest
      globals: {
        vi: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
  ],
}
