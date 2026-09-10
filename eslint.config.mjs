import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";

const SOURCE_FILES = ["**/*.{js,ts,jsx,tsx,mjs,cjs}"];

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**", "dist/**"]),
  {
    name: "project/base",
    files: SOURCE_FILES,
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    name: "project/react",
    files: SOURCE_FILES,
    rules: {
      "react/display-name": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
    },
  },
  {
    name: "project/react-compiler",
    files: SOURCE_FILES,
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/refs": "error",
      "react-hooks/set-state-in-effect": "error",
      "react-hooks/preserve-manual-memoization": "error",
      "react-hooks/use-memo": "error",
      "react-hooks/memo-dependencies": "error",
    },
  },
  {
    name: "project/next",
    files: SOURCE_FILES,
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    name: "project/typescript",
    files: SOURCE_FILES,
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "never" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "after-used", argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    name: "project/imports",
    files: SOURCE_FILES,
    rules: {
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
  },
  {
    name: "project/jest",
    files: ["jest.setup.js"],
    rules: { "no-undef": "off" },
  },
  {
    name: "project/next-config",
    files: ["next.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  eslintPluginPrettier,
  {
    name: "project/style",
    files: SOURCE_FILES,
    rules: {
      curly: ["error", "all"],
    },
  },
]);

export default eslintConfig;
