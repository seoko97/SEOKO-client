import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-console": "error",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: false }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "after-used", argsIgnorePattern: "^_" },
      ],
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
    settings: {
      react: { version: "detect" },
    },
  },
]);

export default eslintConfig;
