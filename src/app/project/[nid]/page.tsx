import { Metadata } from "next";

import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { getProject } from "@/apis/project";

interface IProps {
  params: {
    nid: number;
  };
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const nid = Number(params.nid);

  if (isNaN(nid)) return {};

  const project = await getProject(nid);

  if (!project) return {};

  const { title, description, thumbnail } = project;

  const metadataTitle = `PROJECT [${title}]`;
  const url = `${siteMetadata.siteUrl}/project/${nid}`;

  const publishedTime = new Date(project.createdAt).toISOString();
  const modifiedTime = new Date(project.updatedAt || project.createdAt).toISOString();

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

export { default } from "@components/pages/Project/[nid]";
