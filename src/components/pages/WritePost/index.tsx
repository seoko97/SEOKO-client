import React from "react";

import PostClient from "@components/ui/client/write/post";
import Hydrate from "@components/pages/WritePost/Hydrate";

interface IProps {
  params?: Promise<{ nid: number }>;
}

const WritePost = async ({ params }: IProps) => {
  const nid = (await params)?.nid ?? null;

  return (
    <Hydrate nid={nid}>
      <PostClient nid={nid} />
    </Hydrate>
  );
};

export default WritePost;
