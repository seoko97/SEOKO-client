/** @type {import('eslint').Rule} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "prettier/prettier",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint", "import"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", ["parent", "sibling"], "index"],
        pathGroups: [
          { pattern: "{react,react/*}", group: "builtin", position: "after" },
          { pattern: "{next,next/*}", group: "builtin", position: "after" },
        ],
        alphabetize: { order: "desc", caseInsensitive: true },
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "import/default": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-unused-vars": [1, { args: "after-used", argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: false }],
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "@typescript-eslint/no-unused-vars": "warn",
  },
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },
  overrides: [{ files: ["jest.setup.js"], rules: { "no-undef": "off" } }],
};
