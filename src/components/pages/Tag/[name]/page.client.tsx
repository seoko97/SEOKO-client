"use client";

import React, { useRef } from "react";

import { useGetTagQuery } from "@hooks/query/tag";
import { useGetPostsQuery } from "@hooks/query/post";
import PostList from "@components/ui/PostList";

interface IProps {
  name: string;
}

const TagClient = ({ name }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { data: tag } = useGetTagQuery(name);

  const [posts, fetchMorePosts] = useGetPostsQuery({ tag: tag?._id });

  if (!tag) return null;

  const { postCount, name: tagName } = tag;

  return (
    <>
      <div className="flex w-[theme(screens.md.max)] flex-col gap-2 px-0 py-4 text-primary transition-[color] sm:mb-4 md:w-full">
        <h3 className="ml-1 text-lg font-bold text-main">TAG</h3>
        <h1 className="text-4xl font-bold">{tagName}</h1>
        <div className="ml-1 truncate text-sm text-primary text-slate-500 dark:text-slate-400">
          <span className="text-primary transition-[color]">{postCount}개의 포스트</span>
        </div>
      </div>
      {posts.length > 0 && <PostList ref={ref} posts={posts} func={fetchMorePosts} />}
      {posts?.length === 0 && (
        <div className="py-10 text-center text-2xl font-bold text-gray-400 sm:text-xl">
          포스트를 찾을 수 없습니다 🙄
        </div>
      )}
    </>
  );
};

export default TagClient;
