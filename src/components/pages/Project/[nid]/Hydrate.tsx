import React from "react";

import { notFound } from "next/navigation";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { projectQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";

import { getProject } from "@/apis/project";

interface IProps {
  children: React.ReactNode;
  nid: number;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (isNaN(nid)) return notFound();

  try {
    await queryClient.query({
      queryKey: projectQueryKeys.detail(nid),
      queryFn: () => getProject(nid),
    });
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
