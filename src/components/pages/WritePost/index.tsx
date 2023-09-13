import React from "react";

import PostClient from "@components/ui/Write/post";
import Hydrate from "@components/pages/WritePost/Hydrate";

interface IProps {
  params?: {
    nid: number;
  };
}

const WritePost = ({ params }: IProps) => {
  const nid = params?.nid === undefined ? null : Number(params.nid);

  return (
    <Hydrate nid={nid}>
      <PostClient nid={nid} />
    </Hydrate>
  );
};

export default WritePost;
