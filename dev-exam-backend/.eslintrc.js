module.exports = {
  env: {
    mocha: true,
    node: true
  },
  extends: [
    './node_modules/eslint-config-airbnb-base/rules/best-practices',
    './node_modules/eslint-config-airbnb-base/rules/errors',
    './node_modules/eslint-config-airbnb-base/rules/node',
    './node_modules/eslint-config-airbnb-base/rules/style',
    './node_modules/eslint-config-airbnb-base/rules/variables',
    //'./node_modules/eslint-config-airbnb-base/rules/es6',
    './node_modules/eslint-config-airbnb-base/rules/imports',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2017,
    //ecmaVersion: 2018,
    //sourceType: 'module',
  },
  rules: {
    strict: 'error',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
  },
  overrides: [
    {
      files: "*.test.js",
      rules: {
        // chai
        "no-unused-expressions": "off"
      }
    }
  ]
};
