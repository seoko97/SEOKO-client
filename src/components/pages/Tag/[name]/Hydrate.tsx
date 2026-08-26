import React from "react";

import { notFound } from "next/navigation";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { postQueryKeys, tagQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getTag } from "@/apis/tag";
import { getPosts } from "@/apis/post";

interface IProps {
  name: string;
  children: React.ReactNode;
}

const Hydrate = async ({ name, children }: IProps) => {
  const queryClient = getQueryClient();

  if (!name) return notFound();

  try {
    const tag = await queryClient.query({
      queryKey: tagQueryKeys.detail(name),
      queryFn: () => getTag(name),
    });

    if (!tag) return notFound();

    const params = { tag: tag._id };

    await queryClient.infiniteQuery({
      queryKey: postQueryKeys.list(params),
      queryFn: () => getPosts(params),
      initialPageParam: 0,
    });
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
