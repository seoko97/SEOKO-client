import React from "react";

import { notFound } from "next/navigation";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
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
    const series = await queryClient.fetchQuery({
      queryKey: ["series", nid],
      queryFn: () => getSeries(nid),
    });

    if (!series) return notFound();

    const params = { series: series._id, sort: -1 };

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["posts", params],
      queryFn: () => getPosts(params),
    });
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
