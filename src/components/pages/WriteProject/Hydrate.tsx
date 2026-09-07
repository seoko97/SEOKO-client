import React from "react";

import { redirect } from "next/navigation";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { projectQueryKeys, userQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import getOrNotFound from "@utils/getOrNotFound";
import { getUser } from "@/apis/user";
import { getProject } from "@/apis/project";

interface IProps {
  children: React.ReactNode;
  nid: number | null;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  try {
    await queryClient.query({
      queryKey: userQueryKeys.me,
      queryFn: getUser,
    });
  } catch {
    return redirect("/signin");
  }

  if (nid !== null) {
    await getOrNotFound(() =>
      queryClient.query({
        queryKey: projectQueryKeys.detail(nid),
        queryFn: () => getProject(nid),
      }),
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
