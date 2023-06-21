import React from "react";

import { AppProps } from "next/app";
import { GlobalStyle } from "@seoko/ui";
import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";

import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";

import AppLayout from "@/components/AppLayout";
import { useApollo } from "@/apollo/useApollo";

const SEOKO = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppLayout>
          <Component {...pageProps} />
          <DarkModeButton />
        </AppLayout>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default SEOKO;
