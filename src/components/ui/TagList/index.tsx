import React from "react";

import Tag from "@components/ui/TagList/item";
import { ITag } from "@/types";

interface IProps {
  className?: string;
  tags: ITag[];
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TagList = ({ className = "", tags, onClick }: IProps) => {
  return (
    <div className={`flex w-full flex-row flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag._id} onClick={onClick}>
          {tag.name}
        </Tag>
      ))}
    </div>
  );
};

export default TagList;
