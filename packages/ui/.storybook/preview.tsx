import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@seoko/theme";
import { GlobalStyle } from "@seoko/ui";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
