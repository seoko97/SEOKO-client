import React from "react";

import { notFound } from "next/navigation";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";

import { getProject } from "@/apis/project";

interface IProps {
  children: React.ReactNode;
  nid: number;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (isNaN(nid)) return notFound();

  try {
    await queryClient.fetchQuery({
      queryKey: ["project", nid],
      queryFn: () => getProject(nid),
    });
  } catch (error) {
    return notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
