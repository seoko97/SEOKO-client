import { Metadata } from "next";

import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { getSeries } from "@/apis/series";

interface IProps {
  params: {
    nid: number;
  };
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const nid = Number(params.nid);

  if (isNaN(nid)) return {};

  const series = await getSeries(nid);

  if (!series) return {};

  const { name, thumbnail = "/SEOKO.png" } = series;

  const metadataTitle = `SERIES [${name}]`;
  const description = `SERIES [${name}]에 대한 포스팅 목록`;
  const url = `${siteMetadata.siteUrl}/series/${nid}`;

  const publishedTime = new Date(series.createdAt).toISOString();
  const modifiedTime = new Date(series.updatedAt || series.createdAt).toISOString();

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

export { default } from "@components/pages/Series/[nid]";
