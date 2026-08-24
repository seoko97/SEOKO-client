import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**", "dist/**"]),
  {
    files: ["**/*.{js,ts,jsx,tsx,mjs,cjs}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "never" }],
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
  },
  {
    files: ["jest.setup.js"],
    rules: { "no-undef": "off" },
  },
  {
    files: ["next.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    // TODO: ref 접근 및 Effect 내부 상태 갱신 코드를 정리한 뒤 이 임시 예외를 제거한다.
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  eslintPluginPrettier,
]);

export default eslintConfig;
