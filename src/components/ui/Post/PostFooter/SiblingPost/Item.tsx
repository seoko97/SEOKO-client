import React from "react";

import Link from "next/link";

import { ReftArrowIcon, RightArrowIcon } from "@components/icons";
import { IPost } from "@/types";

interface IProps {
  post: IPost | null;
  type: keyof typeof ARROW;
}

const ICON_CLASS_NAME = "w-3 h-3 fill-[theme(textColor.primary)] transition-[fill]";

const ARROW = {
  prev: ReftArrowIcon,
  next: RightArrowIcon,
};

const SiblingItem = ({ post, type }: IProps) => {
  const Icon = ARROW[type];

  const linkClassName = `group flex w-full cursor-pointer flex-col gap-3 rounded-md bg-secondary p-4 shadow-md transition-[background-color] ${
    type === "next" ? "items-end" : "items-start"
  }`;
  const headingClassName = `w-full truncate text-lg font-bold text-primary transition-[color] group-hover:text-effect1 ${
    type === "next" ? "text-right" : "text-left"
  }`;

  return (
    <div className="flex-1">
      {post && (
        <Link href={`/post/${post.nid}`} className={linkClassName}>
          <div className="flex items-center gap-4 text-sm font-bold text-primary transition-[color]">
            {type === "prev" && <Icon className={ICON_CLASS_NAME} />}
            {type.toLocaleUpperCase()}
            {type === "next" && <Icon className={ICON_CLASS_NAME} />}
          </div>
          <h3 className={headingClassName}>{post.title}</h3>
        </Link>
      )}
    </div>
  );
};

export default SiblingItem;
