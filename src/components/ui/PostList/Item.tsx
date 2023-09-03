import React from "react";

import Link from "next/link";

import removeMd from "remove-markdown";

import { dateTimeParser } from "@utils/dateTimeParser";
import Image from "@components/ui/core/Image";
import { LikeIcon, ViewIcon } from "@components/icons";
import { IPost } from "@/types";

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps) => {
  const parsedContent = removeMd(post.content).substring(0, 120);

  return (
    <Link href={`/post/${post.nid}`} className="w-full">
      <div className="w-ful group relative flex cursor-pointer items-center justify-center gap-8 rounded-md px-2 py-2 transition-[background-color] hover:bg-tertiary md:flex-col md:gap-0">
        <div className="relative flex aspect-[130/100] w-[250px] flex-col rounded-lg bg-gray-400 transition-[box-shadow] group-hover:shadow-md md:w-full">
          <Image
            src={post.thumbnail}
            alt={post.title}
            loading="lazy"
            placeholder="blur"
            blurDataURL={post.thumbnail}
          />
        </div>
        <div className="flex min-h-[200px] flex-1 flex-col justify-around gap-4 break-all text-primary md:min-h-0 md:w-full md:gap-3 md:px-2 md:py-3">
          <h1 className="w-full text-lg font-medium transition-[color] group-hover:text-effect1">
            {post.title}
          </h1>
          <p className="mb-2 font-light transition-[color]">{parsedContent}...</p>
          <div>태그목록</div>
          <div className="flex items-center justify-start gap-4 text-sm">
            <span className="font-normal text-gray-400">{dateTimeParser(post.createdAt)}</span>
            <div className="flex items-center justify-center gap-1">
              <ViewIcon className="h-[1.2em] w-[1.2em] stroke-gray-400" />
              <span className="text-gray-400">{post.viewCount}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <LikeIcon className="h-[1.2em] w-[1.2em] stroke-gray-400" />
              <span className="text-gray-400">{post.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
