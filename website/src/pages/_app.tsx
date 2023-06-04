import React from "react";

import { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";

import GlobalStyle from "@/theme/GlobalStyle";
import useDarkMode from "@/hooks/useDarkMode";
import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";

import { useApollo } from "@/apollo/useApollo";

const SEOKO = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);
  const [mode, theme, onChangeTheme] = useDarkMode();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <DarkModeButton mode={mode} onClick={onChangeTheme} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default SEOKO;
