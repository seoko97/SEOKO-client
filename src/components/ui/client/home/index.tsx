"use client";

import React, { useRef } from "react";

import { useGetPostsQuery } from "@hooks/query/post";
import PostList from "@components/ui/PostList";
import ContentHeader from "@components/ui/client/home/HomeHeader";
import { IGetPostsInput } from "@/types";

interface IProps {
  params: IGetPostsInput;
}

const HomeClient = ({ params }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [posts, fetchMorePosts] = useGetPostsQuery(params);

  return (
    <section className="flex w-full flex-col gap-5">
      <ContentHeader text={params.text ?? ""} />
      {posts.length > 0 && <PostList ref={ref} posts={posts} func={fetchMorePosts} />}
      {posts?.length === 0 && (
        <div className="py-10 text-center text-2xl font-bold text-gray-400 sm:text-xl">
          포스트를 찾을 수 없습니다 🙄
        </div>
      )}
    </section>
  );
};

export default HomeClient;
