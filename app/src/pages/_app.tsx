import React, { useState } from "react";

import { Noto_Sans_KR } from "next/font/google";
import { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "@seoko/theme";
import { ThemeProvider } from "@emotion/react";

import AppLayout from "@components/ui/templates/AppLayout";
import Header from "@components/ui/organisms/Header";
import { GlobalStyle } from "@/styles/GlobalStyle";

interface IProps extends AppProps {
  dehydratedState: DehydratedState;
}

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SEOKO = ({ Component, pageProps, dehydratedState }: IProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AppLayout className={notoSansKr.className}>
            <Header />
            <Component {...pageProps} />
          </AppLayout>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default SEOKO;
