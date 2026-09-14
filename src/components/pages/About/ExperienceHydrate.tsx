import type { ReactNode } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { experienceQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getExperiences } from "@/apis/experience";

interface IProps {
  children: ReactNode;
}

const ExperienceHydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  await queryClient.query({ queryKey: experienceQueryKeys.root, queryFn: getExperiences });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ExperienceHydrate;
