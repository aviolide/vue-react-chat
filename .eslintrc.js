module.exports = {
  "env": {
    "mocha": true,
    "node": true,
    "es6": true,
    "browser": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018
  },
  "plugins": [
    "lodash",
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "walmart/configurations/es6-node.js",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "none",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": true,
        "arrowParens": "always",
        "bracketSpacing": false,
        "jsxBracketSameLine": false,
        "printWith": 150,
        "eol": "lf"
      }
    ],
    "filenames/match-regex": 0,
    "newline-per-chained-call": [2, { "ignoreChainWithDepth": 5 }],
    "array-bracket-newline": 0,
    "array-bracket-spacing": 2,
    "array-element-newline": 0,
    "max-nested-callbacks": 0,
    "max-depth": 0,
    "generator-star-spacing": 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "filenames/filenames": 0,
    "no-use-before-define": 0,
    "no-magic-numbers": 0,
    "max-len": 0,
    "camelcase": 0,
    "consistent-return": 0,
    "complexity": 0,
    "max-statements": 0,
    "max-params": 0,
    "no-unused-expressions": 0,
    "no-bitwise": 0,
    "no-script-url": 0,
    "new-cap": 0,
    "no-multi-str": 0,
    "space-before-function-paren": 0,
    "jquery/no-ajax": 0,
    "no-extra-parens": 0,
    "func-style": 0,
    "no-invalid-this": 0,
    "no-return-assign": 0,
    "arrow-parens": 0,
    "no-confusing-arrow": 0,
    "no-case-declarations": 0,
    "no-nested-ternary": 0,
    "no-labels": 0,
    "global-require": 0,
    "no-lonely-if": 0,
    "no-loop-func": 0,
    "no-shadow": 0,
    "one-var": 0,
    "valid-jsdoc": [
    0,
    {
      "requireParamDescription": false,
      "requireReturnDescription": false
    }
  ],
    "indent": [
    0,
    2,
    {
      "SwitchCase": 1
    }
  ],
    "quotes": ["error", "single"]
  }
};
