"use client";

import React from "react";

import useGetPosts from "@hooks/useGetPosts";
import PostList from "@components/ui/PostList";
import { IGetPostsInput } from "@/types";

interface IProps {
  params: IGetPostsInput;
}

const HomeContent = ({ params }: IProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [posts, fetchMorePosts] = useGetPosts(params);

  return (
    <section className="flex w-full flex-col gap-5">
      {posts.length > 0 && <PostList ref={ref} posts={posts} func={fetchMorePosts} />}
      {posts?.length === 0 && (
        <div className="py-10 text-center text-2xl font-bold text-gray-400 sm:text-xl">
          포스트를 찾을 수 없습니다 🙄
        </div>
      )}
    </section>
  );
};

export default HomeContent;
