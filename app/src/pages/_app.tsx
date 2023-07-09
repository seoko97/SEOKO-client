import React from "react";

import { Noto_Sans_KR } from "next/font/google";
import { AppProps } from "next/app";
import { GlobalStyle } from "@seoko/ui";
import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

import { ApolloProvider } from "@apollo/client";

import AppLayout from "@components/ui/templates/AppLayout";
import Header from "@components/ui/organisms/Header";
import DarkModeButton from "@components/ui/molecules/DarkModeButton";
import { useApollo } from "@ap/useApollo";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SEOKO = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppLayout className={notoSansKr.className}>
          <Header />
          <Component {...pageProps} />
          <DarkModeButton />
        </AppLayout>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default SEOKO;
