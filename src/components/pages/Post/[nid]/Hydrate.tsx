import React from "react";

import { notFound } from "next/navigation";

import { HydrationBoundary, dehydrate, noop } from "@tanstack/react-query";

import getQueryClient from "@utils/query/getQueryClient";
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
    const post = await queryClient.query({
      queryKey: ["post", nid],
      queryFn: () => getPost(nid),
    });

    if (!post) return notFound();

    const { series } = post;

    if (series) {
      await queryClient
        .query({
          queryKey: ["series", series.nid],
          queryFn: () => getSeries(series.nid),
        })
        .catch(noop);
    }

    await queryClient
      .query({
        queryKey: ["post", nid, "sibling"],
        queryFn: () => getSiblingPost(nid),
      })
      .catch(noop);
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
