import React from "react";

import { Noto_Sans_KR } from "next/font/google";
import { AppProps } from "next/app";
import { GlobalStyle } from "@seoko/ui";
import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

import AppLayout from "@components/ui/templates/AppLayout";
import Header from "@components/ui/organisms/Header";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SEOKO = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppLayout className={notoSansKr.className}>
        <Header />
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
};

export default SEOKO;
