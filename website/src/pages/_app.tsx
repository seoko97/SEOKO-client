import React from "react";

import { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";

import GlobalStyle from "@/theme/GlobalStyle";
import { BP, keyByTheme } from "@/theme";
import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";

import { useApollo } from "@/apollo/useApollo";

const SEOKO = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ ...keyByTheme, BP }}>
        <GlobalStyle />
        <Component {...pageProps} />
        <DarkModeButton />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default SEOKO;
