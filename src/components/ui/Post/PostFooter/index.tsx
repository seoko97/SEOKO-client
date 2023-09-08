"use client";

import React from "react";

import SiblingPost from "@components/ui/Post/PostFooter/SiblingPost";
import Giscus from "@components/ui/Post/PostFooter/Giscus";

interface IProps {
  nid: number;
}

const PostFooter = ({ nid }: IProps) => {
  return (
    <div className="mx-auto mb-7 mt-0 flex w-[theme(screens.md.max)] flex-col gap-6 md:w-full ">
      <SiblingPost nid={nid} />
      <Giscus />
    </div>
  );
};

export default PostFooter;
