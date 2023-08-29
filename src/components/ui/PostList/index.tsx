import React, { forwardRef } from "react";

import useInfinityScroll from "@hooks/useInfinityScroll";
import PostItem from "@components/ui/PostList/Item";
import { IPost } from "@/types";

interface IProps {
  posts: IPost[];
  func: () => void;
}

const PostList = forwardRef<HTMLDivElement, IProps>(({ posts, func }, ref) => {
  useInfinityScroll(ref as React.RefObject<HTMLDivElement>, func);

  return (
    <div ref={ref} className="relative mb-8 flex flex-col items-center justify-center gap-4">
      {posts.map((post) => (
        <PostItem key={post.nid} post={post} />
      ))}
    </div>
  );
});

export default PostList;
