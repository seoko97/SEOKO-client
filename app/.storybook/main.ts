import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: {
    name: path.dirname(
      require.resolve(path.join("@storybook/nextjs", "package.json")),
    ) as "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config) {
    if (config.resolve) {
      config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, "..")];
      config.resolve.alias = {
        ...config.resolve.alias,
        "@components": path.resolve(__dirname, "../src/components"),
        "@hooks": path.resolve(__dirname, "../src/hooks"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@t": path.resolve(__dirname, "../src/types"),
        "@": path.resolve(__dirname, "../src"),
      };
    }

    return config;
  },
};
export default config;
