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
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "@next/next/no-html-link-for-pages": "off",
    "import/default": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: false }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [1, { args: "after-used", argsIgnorePattern: "^_" }],
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", ["parent", "sibling"], "index"],
        pathGroups: [
          { pattern: "{react,react/*}", group: "internal", position: "before" },
          { pattern: "{next,next/*}", group: "internal", position: "before" },
        ],
        alphabetize: { order: "desc", caseInsensitive: true },
        "newlines-between": "always-and-inside-groups",
      },
    ],
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
