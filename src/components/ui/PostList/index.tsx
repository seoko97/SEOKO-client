"use client";

import { type RefObject, useRef } from "react";

import useInfinityScroll from "@hooks/useInfinityScroll";
import { useGetPostsQuery } from "@hooks/query/post";
import PostItem from "@components/ui/PostList/Item";
import { IGetPostsInput } from "@/types";

interface IProps {
  params?: IGetPostsInput;
  keepPrevData?: boolean;
}

const PostList = (props: IProps) => {
  const { params = {}, keepPrevData = false } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { posts, dataUpdatedAt, fetchMore } = useGetPostsQuery(params, { keepPrevData });

  useInfinityScroll(ref as RefObject<HTMLDivElement>, fetchMore);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-10 text-center text-2xl font-bold text-gray-400 sm:text-xl">
        포스트를 찾을 수 없습니다 🙄
      </div>
    );
  }

  return (
    <>
      <div
        ref={ref}
        className="relative mb-8 flex w-full flex-col items-center justify-center gap-4"
      >
        {posts.map((post) => (
          <PostItem key={post.nid} post={post} referenceTime={dataUpdatedAt} />
        ))}
      </div>
    </>
  );
};

export default PostList;
