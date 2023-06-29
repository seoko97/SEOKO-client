/** @type {import('eslint').Rule} */
module.exports = {
  root: true,
  extends: ["@seoko/eslint-config", "plugin:storybook/recommended"],
  rules: {
    "no-unused-vars": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
