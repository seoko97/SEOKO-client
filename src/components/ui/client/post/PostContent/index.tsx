"use client";

import React, { useMemo } from "react";

import { compiler } from "markdown-to-jsx";
import { useGetPostQuery } from "@hooks/query/post";
import overrides from "@components/ui/Markdown/overrides";
import { Viewer } from "@components/ui/Markdown";
import Toc from "@components/ui/client/post/PostContent/Toc";
import Like from "@components/ui/client/post/PostContent/Like";

interface IProps {
  nid: number;
}

const PostContent = ({ nid }: IProps) => {
  const { data } = useGetPostQuery(nid);
  const markdown = useMemo(
    () => compiler(data?.content ?? "", { wrapper: null, overrides }),
    [data?._id],
  );

  if (!data) return null;

  const { isLiked } = data;

  return (
    <div className="relative my-6 flex w-full justify-center lg:flex-col-reverse lg:items-center">
      <div className="sticky top-24 flex h-fit w-full flex-1 justify-end lg:my-8 lg:justify-center">
        <Like nid={nid} isLiked={isLiked} />
      </div>
      <Viewer content={markdown} isMarked={true} />
      <div className="sticky top-24 h-fit flex-1 overflow-hidden lg:hidden">
        <Toc markdown={markdown} />
      </div>
    </div>
  );
};

export default PostContent;
