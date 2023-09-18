import React from "react";

import { notFound } from "next/navigation";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
import { getSeries } from "@/apis/series";
import { getPost, getSiblingPost } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  nid: number;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (isNaN(nid)) return notFound();

  try {
    const post = await queryClient.fetchQuery({
      queryKey: ["post", nid],
      queryFn: () => getPost(nid),
    });

    if (!post) return notFound();

    const { series } = post;

    if (series) {
      await queryClient.prefetchQuery({
        queryKey: ["series", series.nid],
        queryFn: () => getSeries(series.nid),
      });
    }

    await queryClient.prefetchQuery({
      queryKey: ["post", nid, "sibling"],
      queryFn: () => getSiblingPost(nid),
    });
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
