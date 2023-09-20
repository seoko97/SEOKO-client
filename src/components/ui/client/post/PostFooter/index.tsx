"use client";

import React from "react";

import SiblingPost from "@components/ui/PostClient/PostFooter/SiblingPost";
import Giscus from "@components/ui/PostClient/PostFooter/Giscus";

interface IProps {
  nid: number;
}

const PostFooter = ({ nid }: IProps) => {
  return (
    <div className="mx-auto mb-7 mt-0 flex w-full max-w-[theme(screens.md.max)] flex-col gap-6 ">
      <SiblingPost nid={nid} />
      <Giscus />
    </div>
  );
};

export default PostFooter;
