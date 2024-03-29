import path from "path";
import fs from "fs";

import type { StorybookConfig } from "@storybook/nextjs";

function readTsConfig(configPath: string) {
  const rawConfig = fs.readFileSync(configPath, "utf-8");
  const tsConfig = JSON.parse(rawConfig);
  return tsConfig;
}

function getAbsolutePathsFromTsConfig(configPath: string) {
  const tsConfig = readTsConfig(configPath);
  const baseUrl = tsConfig.compilerOptions.baseUrl || ".";
  const paths = tsConfig.compilerOptions.paths || {};

  const absolutePaths = Object.entries(paths).reduce((acc, a) => {
    const [alias, relativePaths] = a;
    const absolutePath = path.resolve(baseUrl, (relativePaths as Array<any>)[0]);
    acc[alias.replace("/*", "")] = absolutePath.replace("/*", "");
    return acc;
  }, {});

  return absolutePaths;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal(config) {
    if (!config.resolve || !config.module) return config;

    const aliases = getAbsolutePathsFromTsConfig(path.resolve(__dirname, "../tsconfig.json"));

    config.resolve.modules?.push(path.resolve(__dirname, ".."));
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
    };

    return config;
  },
};

export default config;
