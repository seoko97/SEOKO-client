import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@seoko/theme";
import { GlobalStyle } from "../src/styles/GlobalStyle";

import { useDarkMode } from "storybook-dark-mode";

export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? "dark" : "light";

    useEffect(() => {
      localStorage.setItem("theme", mode);
      document.body.dataset.theme = mode;
    }, [mode]);

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    );
  },
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
  decorators,
};

export default preview;
