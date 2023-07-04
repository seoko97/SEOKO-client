import React from "react";

import { AppProps } from "next/app";
import { GlobalStyle } from "@seoko/ui";
import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

import AppLayout from "@components/ui/templates/AppLayout";
import DarkModeButton from "@components/ui/molecules/DarkModeButton";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@ap/useApollo";

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
