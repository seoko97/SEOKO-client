import React, { useState } from "react";

import { Noto_Sans_KR } from "next/font/google";
import { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

import AppLayout from "@components/ui/templates/AppLayout";
import Header from "@components/ui/organisms/Header";
import { GlobalStyle } from "@/styles/GlobalStyle";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SEOKO = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppLayout className={notoSansKr.className}>
          <Header />
          <Component {...pageProps} />
        </AppLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default SEOKO;
