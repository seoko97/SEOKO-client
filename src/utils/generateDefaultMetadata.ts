import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";

interface GenerateDefaultMetadataArgs {
  title: string;
  description: string;
  url: string;
  images?: string;
}

const generateDefaultMetadata = ({
  title,
  description,
  url,
  images,
}: GenerateDefaultMetadataArgs) => {
  const ogTitle = siteMetadata.titleTemplate.replace("%s", title);

  const openGraph = {
    ...defaultOpenGraph,
    images: images ?? defaultOpenGraph.images,
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
