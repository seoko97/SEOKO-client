import React from "react";

import { useGetSiblingPostQuery } from "@hooks/query/post";
import SiblingItem from "@components/ui/client/post/PostFooter/SiblingPost/Item";

interface IProps {
  nid: number;
}

const SiblingPost = ({ nid }: IProps) => {
  const { data } = useGetSiblingPostQuery(nid);

  if (!data) return null;

  const { prev, next } = data;

  return (
    <div className="flex w-full gap-6 md:flex-col">
      <SiblingItem type="prev" post={prev} />
      <SiblingItem type="next" post={next} />
    </div>
  );
};

export default SiblingPost;
