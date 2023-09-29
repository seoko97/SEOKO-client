import type { Metadata } from "next";

import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { GOOGLE_SITE_VERIFICATION } from "@utils/constant/env";
import Header from "@components/ui/Header";
import Footer from "@components/ui/Footer";
import Providers from "@components/query/Providers";

import Hydrate from "@components/query/hydrate/UserHydrate";
import Analytics from "@components/Analytics";

import "@styles/globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  metadataBase: siteMetadata.siteUrl as unknown as URL,
  title: {
    absolute: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.applicationName,
  themeColor: "#ffffff",
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  creator: siteMetadata.author,
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
  function setBodyDatasetByTheme() {
    const prefersDarkFromMq = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme = localStorage.getItem("theme");

    const persistedPreference = theme === "dark" || theme === "light" ? theme : null;

    const colorMode = persistedPreference || (prefersDarkFromMq ? "dark" : "light");

    localStorage.setItem("theme", colorMode);
  }

  const stringifyFn = String(setBodyDatasetByTheme);

  const fnToRunOnClient = `(${stringifyFn})()`;

  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      </head>
      <body suppressHydrationWarning={true}>
        <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} async />
        <Analytics />
        <div className="relative min-h-screen w-full bg-primary pb-36 transition-[background-color]">
          <Providers>
            <Hydrate>
              <Header />
              {children}
              <Footer />
            </Hydrate>
          </Providers>
        </div>
        <div id="modal" />
      </body>
    </html>
  );
};

export default RootLayout;
