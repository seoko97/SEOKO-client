import { Metadata } from "next";

import getOrNotFound from "@utils/getOrNotFound";
import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { getTag } from "@/apis/tag";

type TProps = Pick<PageProps<"/tag/[name]">, "params">;

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { name: paramsName } = await params;

  const tag = await getOrNotFound(() => getTag(paramsName));

  const { name } = tag;

  const metadataTitle = `TAG [${name}]`;
  const url = `${siteMetadata.siteUrl}/tag/${name}`;
  const description = `TAG [${name}]에 대한 포스팅 목록`;

  const thumbnail = "/SEOKO.png";

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
    },
  };
};

export { default } from "@components/pages/Tag/[name]";
