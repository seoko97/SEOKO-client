import type { Metadata } from "next";

import { Noto_Sans_KR } from "next/font/google";

import Providers from "@components/ui/Providers";
import Header from "@components/ui/Header";
import Footer from "@components/ui/Footer";

import "@styles/globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SEOKO",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  function setBodyDatasetByTheme() {
    const prefersDarkFromMq = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const persistedPreference = localStorage.getItem("theme");

    const colorMode = persistedPreference || (prefersDarkFromMq ? "dark" : "light");

    localStorage.setItem("theme", colorMode);

    document.body.dataset.theme = colorMode;
  }

  function ThemeScript() {
    const stringifyFn = String(setBodyDatasetByTheme);

    const fnToRunOnClient = `(${stringifyFn})()`;

    return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />;
  }

  return (
    <html lang="ko">
      <body className={notoSansKR.className} suppressHydrationWarning={true}>
        <ThemeScript />
        <div className="relative min-h-screen w-full bg-primary pb-36 transition-[background-color]">
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
