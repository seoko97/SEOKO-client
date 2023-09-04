import React from "react";

import { Hydrate, dehydrate } from "@tanstack/react-query";
import { IGetPostsInput } from "@/types";
import getQueryClient from "@/query/getQueryClient";
import { getPosts } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  params: IGetPostsInput;
}

const PostsHydrate = async ({ children, params = {} }: IProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });
  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};

export default PostsHydrate;
