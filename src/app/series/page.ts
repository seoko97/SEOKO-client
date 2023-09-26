import { generateDefaultMetadata } from "@utils/generateDefaultMetadata";
import { siteMetadata } from "@utils/constant/metadata";

export const metadata = generateDefaultMetadata({
  title: `시리즈`,
  description: "개발자 지석호의 시리즈 목록입니다. 주제별 시리즈를 만들어서 포스팅하고 있습니다.",
  url: `${siteMetadata.siteUrl}/series`,
});

export { default } from "@components/pages/Series";
