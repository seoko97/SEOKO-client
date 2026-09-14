import type { Metadata } from "next";

const siteMetadata = {
  title: "SEOKO",
  author: "SEOKO",
  titleTemplate: "%s | SEOKO",
  applicationName: "SEOKO",
  headerTitle: "SEOKO",
  description: "개발자 지석호의 블로그입니다.",
  keywords: [
    "SEOKO",
    "기술 블로그",
    "개발자 지석호",
    "지석호",
    "블로그",
    "개발 블로그",
    "프론트엔드",
    "백엔드",
    "웹 개발",
  ],
  locale: "ko-KR",
  language: "ko",
  theme: "system",
  siteUrl: "https://seoko.blog",
  siteRepo: "https://github.com/seoko97/SEOKO-client",
  siteLogo: "/SEOKO.png",
  fallbackImage: "/images/fallback.webp",
};

const defaultOpenGraph = {
  url: siteMetadata.siteUrl,
  type: "website",
  title: siteMetadata.title,
  siteName: siteMetadata.title,
  description: siteMetadata.description,
  locale: siteMetadata.locale,
  images: {
    url: siteMetadata.siteLogo,
    width: 1200,
    height: 630,
  },
} satisfies NonNullable<Metadata["openGraph"]>;

export { siteMetadata, defaultOpenGraph };
