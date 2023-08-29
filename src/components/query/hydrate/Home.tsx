import React from "react";

import { Hydrate, dehydrate } from "@tanstack/react-query";
import { IGetPostsInput } from "@/types";
import getQueryClient from "@/query/getQueryClient";
import { getPosts } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  params: IGetPostsInput;
}

const HomeHydrate = async ({ children, params = {} }: IProps) => {
  const queryClient = getQueryClient();
  const { series = "", tag = "" } = params;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", { series, tag }],
    queryFn: () => getPosts(params),
  });
  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};

export default HomeHydrate;
