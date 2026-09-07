import removeMd from "remove-markdown";
import { Metadata } from "next";

import { defaultOpenGraph, siteMetadata } from "@utils/constant/metadata";
import { getPost } from "@/apis/post";

type TProps = Pick<PageProps<"/post/[nid]">, "params">;

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { nid: paramNid } = await params;
  const nid = Number(paramNid);

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
