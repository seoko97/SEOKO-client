import { Metadata } from "next";

import { generateDefaultMetadata } from "@utils/generateDefaultMetadata";
import { siteMetadata } from "@utils/constant/metadata";

export const generateMetadata = (): Metadata => {
  const { openGraph, ...rest } = generateDefaultMetadata({
    title: "About",
    description: siteMetadata.description,
    url: `${siteMetadata.siteUrl}/about`,
  });
  openGraph.type = "profile";

  return { openGraph, ...rest };
};

export { default } from "@components/pages/About";
