import React, { PropsWithChildren } from "react";
import { RenderOptions, render } from "@testing-library/react";

import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

import { GlobalStyle } from "../../src/styles/GlobalStyle";

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

const renderWithEmotion = (ui: React.ReactElement, options: RenderOptions = {}) => {
  return render(ui, { wrapper: Wrapper, ...options });
};

export { Wrapper, renderWithEmotion as render };
