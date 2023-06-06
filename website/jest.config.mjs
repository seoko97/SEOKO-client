import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/**/*.test.{ts,tsx}", "<rootDir>/**/*.spec.{ts,tsx}"],
};

export default createJestConfig(config);
