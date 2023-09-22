import { Metadata } from "next";

import removeMd from "remove-markdown";
import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { getPost } from "@/apis/post";

interface IProps {
  params: {
    nid: number;
  };
}

export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const nid = Number(params.nid);

  if (isNaN(nid)) return {};

  const post = await getPost(nid);

  if (!post) return {};

  const { title, content, thumbnail } = post;

  const metadataTitle = `${title}`;
  const url = `${siteMetadata.siteUrl}/post/${nid}`;
  const description = removeMd(content).slice(0, 100);

  const publishedTime = new Date(post.createdAt).toISOString();
  const modifiedTime = new Date(post.updatedAt || post.createdAt).toISOString();

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

export { default } from "@components/pages/Post/[nid]";
