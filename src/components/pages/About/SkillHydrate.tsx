import type { ReactNode } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { skillQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getSkills } from "@/apis/skill";

interface IProps {
  children: ReactNode;
}

const SkillHydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  await queryClient.query({ queryKey: skillQueryKeys.root, queryFn: getSkills });

  const dehydrateState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>;
};

export default SkillHydrate;
