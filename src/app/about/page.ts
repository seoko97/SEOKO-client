import { Metadata } from "next";

import { generateDefaultMetadata } from "@utils/generateDefaultMetadata";
import { siteMetadata } from "@utils/constant/metadata";

export const generateMetadata = (): Metadata => {
  const { openGraph, ...rest } = generateDefaultMetadata({
    title: "안녕하세요! 개발자 지석호입니다.",
    description: siteMetadata.description,
    url: `${siteMetadata.siteUrl}/about`,
  });
  openGraph.type = "profile";

  return { openGraph, ...rest };
};

export { default } from "@components/pages/About";
