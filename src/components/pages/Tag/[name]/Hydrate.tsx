import React from "react";

import { notFound } from "next/navigation";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
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
    const tag = await queryClient.fetchQuery({
      queryKey: ["tag", name],
      queryFn: () => getTag(name),
    });

    if (!tag) return notFound();

    const params = { tag: tag._id };

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
