import React from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { postQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { IGetPostsInput } from "@/types";
import { getPosts } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  params: IGetPostsInput;
}

const Hydrate = async ({ children, params = {} }: IProps) => {
  const queryClient = getQueryClient();

  await queryClient.infiniteQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: () => getPosts(params),
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
