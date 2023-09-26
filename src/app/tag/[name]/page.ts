import { Metadata } from "next";

import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { getTag } from "@/apis/tag";

interface IProps {
  params: {
    name: string;
  };
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const tag = await getTag(params.name);

  if (!tag) return {};

  const { name } = tag;

  const metadataTitle = `TAG [${name}]`;
  const url = `${siteMetadata.siteUrl}/tag/${name}`;
  const description = `TAG [${name}]에 대한 포스팅 목록`;

  const thumbnail = "/SEOKO.png";
  const publishedTime = new Date(tag.createdAt).toISOString();
  const modifiedTime = new Date(tag.updatedAt || tag.createdAt).toISOString();

  return {
    title: metadataTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...defaultOpenGraph,
      url,
      type: "article",
      title: metadataTitle,
      description,
      images: [{ url: thumbnail }],
      publishedTime,
      modifiedTime,
    },
  };
};

export { default } from "@components/pages/Tag/[name]";
