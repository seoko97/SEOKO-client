const siteMetadata = {
  title: "SEOKO",
  author: "SEOKO",
  titleTemplate: "%s | SEOKO",
  applicationName: "SEOKO",
  headerTitle: "SEOKO",
  description: "개발지 지석호의 블로그입니다.",
  keywords: ["SEOKO", "기술 블로그"],
  locale: "ko-KR",
  language: "ko",
  theme: "system",
  siteUrl: "https://seoko.me",
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
};

export { siteMetadata, defaultOpenGraph };
