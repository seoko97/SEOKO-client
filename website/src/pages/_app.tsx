import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";

import GlobalStyle from "@/theme/GlobalStyle";
import useDarkMode from "@/hooks/useDarkMode";
import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";

const SEOKO = ({ Component, pageProps }: AppProps) => {
  const [mode, theme, onChangeTheme] = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
      <DarkModeButton mode={mode} onClick={onChangeTheme} />
    </ThemeProvider>
  );
};

export default SEOKO;
