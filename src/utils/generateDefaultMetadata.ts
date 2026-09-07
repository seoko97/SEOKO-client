import type { Metadata } from "next";

import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";

interface IGenerateDefaultMetadataArgs {
  title: string;
  description: string;
  url: string;
  images?: string;
  openGraphType?: "website" | "profile";
}

const generateDefaultMetadata = ({
  title,
  description,
  url,
  images,
  openGraphType = "website",
}: IGenerateDefaultMetadataArgs): Metadata => {
  const ogTitle = siteMetadata.titleTemplate.replace("%s", title);

  const openGraph = {
    ...defaultOpenGraph,
    images: images ?? defaultOpenGraph.images,
    type: openGraphType,
    title: ogTitle,
    description,
    url,
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph,
  };
};

export { generateDefaultMetadata };
