import React from "react";

import PostHeader from "@components/ui/client/post/PostHeader";
import PostFooter from "@components/ui/client/post/PostFooter";
import PostContent from "@components/ui/client/post/PostContent";
import Hydrate from "@components/pages/Post/[nid]/Hydrate";

interface IProps {
  params: Promise<{ nid: number }>;
}

const Post = async ({ params }: IProps) => {
  const { nid } = await params;

  const nidNumber = Number(nid);

  return (
    <section className="frame relative flex w-[theme(screens.xl.max)] flex-col items-center xl:w-full">
      <Hydrate nid={nidNumber}>
        <PostHeader nid={nidNumber} />
        <PostContent nid={nidNumber} />
        <PostFooter nid={nidNumber} />
      </Hydrate>
    </section>
  );
};

export default Post;
