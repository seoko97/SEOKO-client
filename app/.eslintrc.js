/** @type {import('eslint').Rule} */
module.exports = {
  root: true,
  extends: ["@seoko/eslint-config"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
};
