import { generateDefaultMetadata } from "@utils/generateDefaultMetadata";
import { siteMetadata } from "@utils/constant/metadata";

export const metadata = generateDefaultMetadata({
  title: `프로젝트`,
  description:
    "개발자 지석호의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다.",
  url: `${siteMetadata.siteUrl}/project`,
});

export { default } from "@components/pages/Project";
