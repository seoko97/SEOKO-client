import React from "react";

import { notFound } from "next/navigation";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { postQueryKeys, seriesQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getSeries } from "@/apis/series";
import { getPosts } from "@/apis/post";

interface IProps {
  nid: number;
  children: React.ReactNode;
}

const Hydrate = async ({ nid, children }: IProps) => {
  const queryClient = getQueryClient();

  if (isNaN(nid)) return notFound();

  try {
    const series = await queryClient.query({
      queryKey: seriesQueryKeys.detail(nid),
      queryFn: () => getSeries(nid),
    });

    if (!series) return notFound();

    const params = { series: series._id, sort: -1 };

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
