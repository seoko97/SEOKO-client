import React, { PropsWithChildren } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { GlobalStyle } from "@seoko/ui";
import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

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
