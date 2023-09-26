import React from "react";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
import { IGetPostsInput } from "@/types";
import { getPosts } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  params: IGetPostsInput;
}

const Hydrate = async ({ children, params = {} }: IProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });
  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
