import React from "react";

import { notFound } from "next/navigation";

import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/query/getQueryClient";
import { getPost, getSiblingPost } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  nid: number;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (isNaN(nid)) return notFound();

  try {
    await Promise.all([
      queryClient.fetchQuery({
        queryKey: ["post", nid],
        queryFn: () => getPost(nid),
      }),
      queryClient.prefetchQuery({
        queryKey: ["post", nid, "sibling"],
        queryFn: () => getSiblingPost(nid),
      }),
    ]);
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
