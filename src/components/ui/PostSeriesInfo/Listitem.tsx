import React from "react";

import Link from "next/link";

import { IPost } from "@/types";

interface IProps {
  post: IPost;
  isSelected: boolean;
}

const ListItem = ({ post, isSelected }: IProps) => {
  const { nid, title } = post;

  const text = isSelected ? "text-main" : "text-primary hover:text-effect1";

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isSelected) return;

    e.preventDefault();
  };

  return (
    <li key={nid} className={`transition-[color] ${text}`}>
      <Link href={`/post/${nid}`} onClick={onClick} className="ml-1" scroll={false}>
        {title}
      </Link>
    </li>
  );
};

export default ListItem;
