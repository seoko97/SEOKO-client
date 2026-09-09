import type { Metadata, Viewport } from "next";

import { THEME, THEME_STORAGE_KEY } from "@utils/constant/theme";
import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { GOOGLE_SITE_VERIFICATION } from "@utils/constant/env";
import Header from "@components/ui/Header";
import Footer from "@components/ui/Footer";
import Providers from "@components/query/Providers";

import UserHydrate from "@components/query/hydrate/UserHydrate";
import Analytics from "@components/Analytics";

import "@styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    absolute: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.applicationName,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  creator: siteMetadata.author,
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: { ...defaultOpenGraph },
  icons: {
    icon: [
      {
        url: "/favicons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicons/favicon-16x16.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicons/apple-touch-icon.png",
      type: "image/png",
    },
  },
  manifest: "/favicons/manifest.json",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  function setBodyDatasetByTheme(darkTheme: string, lightTheme: string, storageKey: string) {
    const prefersDarkFromMq = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme = localStorage.getItem(storageKey);

    const persistedPreference = theme === darkTheme || theme === lightTheme ? theme : null;

    const colorMode = persistedPreference || (prefersDarkFromMq ? darkTheme : lightTheme);

    localStorage.setItem(storageKey, colorMode);
    document.body.dataset.theme = colorMode;
  }

  const stringifyFn = String(setBodyDatasetByTheme);

  const fnToRunOnClient = `(${stringifyFn})(${JSON.stringify(THEME.dark)}, ${JSON.stringify(
    THEME.light,
  )}, ${JSON.stringify(THEME_STORAGE_KEY)})`;

  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />
        <Analytics />
        <div className="relative min-h-screen w-full bg-primary pb-36 transition-[background-color]">
          <Providers>
            <UserHydrate>
              <Header />
            </UserHydrate>
            {children}
            <Footer />
          </Providers>
        </div>
        <div id="modal" />
      </body>
    </html>
  );
};

export default RootLayout;
