"use client";

import React, { useMemo } from "react";

import { compiler } from "markdown-to-jsx";
import { useGetPostQuery } from "@hooks/query/post";
import Toc from "@components/ui/Post/PostContent/Toc";
import Like from "@components/ui/Post/PostContent/Like";
import overrides from "@components/ui/Markdown/overrides";
import Markdown from "@components/ui/Markdown";

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
    <div className="relative my-6 flex w-full justify-center xl:flex-col-reverse xl:items-center">
      <div className="sticky top-24 flex h-fit flex-1 justify-end">
        <Like nid={nid} isLiked={isLiked} />
      </div>
      <Markdown content={markdown} isMarked={true} />
      <div className="sticky top-24 h-fit flex-1 xl:hidden">
        <Toc markdown={markdown} />
      </div>
    </div>
  );
};

export default PostContent;
