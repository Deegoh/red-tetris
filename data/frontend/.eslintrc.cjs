module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "arrow-spacing": "error",
    "indent": [
      "error",
      2
    ],
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "no-var": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "quotes": [
      "error",
      "single"
    ],
    "require-await": "error",
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "align": "value"
      }
    ],
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "no-mixed-spaces-and-tabs": "error",
    "no-return-await": "error",
    "semi": [
      "error",
      "always"
    ],
    "yoda": "error",
    "global-require": "warn",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "brace-style": [
      "error",
      "stroustrup",
      {
        "allowSingleLine": true
      }
    ],
    "object-curly-newline": [
      "error",
      {
        "consistent": true
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "array-element-newline": [
      "error",
      "consistent"
    ],
    "array-bracket-newline": [
      "error",
      "consistent"
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "no-multi-spaces": [
      "error",
      {
        "ignoreEOLComments": true
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "error"
    ]
  },
}
