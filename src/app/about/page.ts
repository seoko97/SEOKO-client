import { generateDefaultMetadata } from "@utils/generateDefaultMetadata";
import { siteMetadata } from "@utils/constant/metadata";

export const metadata = generateDefaultMetadata({
  title: "안녕하세요! 개발자 지석호입니다.",
  description: siteMetadata.description,
  url: `${siteMetadata.siteUrl}/about`,
  openGraphType: "profile",
});

export { default } from "@components/pages/About";
