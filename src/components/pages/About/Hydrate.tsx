import React from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { experienceQueryKeys, projectQueryKeys, skillQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getSkills } from "@/apis/skill";
import { getProjects } from "@/apis/project";
import { getExperiences } from "@/apis/experience";

interface IProps {
  children: React.ReactNode;
}

const Hydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  await Promise.allSettled([
    queryClient.query({ queryKey: projectQueryKeys.root, queryFn: getProjects }),
    queryClient.query({ queryKey: skillQueryKeys.root, queryFn: getSkills }),
    queryClient.query({ queryKey: experienceQueryKeys.root, queryFn: getExperiences }),
  ]);

  const dehydrateState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>;
};

export default Hydrate;
