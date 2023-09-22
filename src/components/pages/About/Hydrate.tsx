import React from "react";

import getQueryClient from "@utils/query/getQueryClient";
import { dehydrate, Hydrate as RqHydrate } from "@tanstack/react-query";
import { getSkills } from "@/apis/skill";
import { getProjects } from "@/apis/project";
import { getExperiences } from "@/apis/experience";

interface IProps {
  children: React.ReactNode;
}

const Hydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    }),
    queryClient.prefetchQuery({
      queryKey: ["skills"],
      queryFn: getSkills,
    }),
    queryClient.prefetchQuery({
      queryKey: ["experiences"],
      queryFn: getExperiences,
    }),
  ]);

  const dehydrateState = dehydrate(queryClient);

  return <RqHydrate state={dehydrateState}>{children}</RqHydrate>;
};

export default Hydrate;
