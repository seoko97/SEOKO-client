import React from "react";

import PostHeader from "@components/ui/Post/PostHeader";
import PostFooter from "@components/ui/Post/PostFooter";
import PostContent from "@components/ui/Post/PostContent";
import Hydrate from "@components/pages/Post/[nid]/Hydrate";

interface IProps {
  params: {
    nid: number;
  };
}

const Post = ({ params }: IProps) => {
  const nid = Number(params.nid);

  return (
    <section className="frame flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <Hydrate nid={nid}>
        <PostHeader nid={nid} />
        <PostContent nid={nid} />
        <PostFooter nid={nid} />
      </Hydrate>
    </section>
  );
};

export default Post;
