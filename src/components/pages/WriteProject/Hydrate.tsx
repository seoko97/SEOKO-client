import React from "react";

import { notFound, redirect } from "next/navigation";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { userQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getUser } from "@/apis/user";
import { getProject } from "@/apis/project";

interface IProps {
  children: React.ReactNode;
  nid: number | null;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (nid !== null) {
    try {
      await queryClient.query({
        queryKey: ["project", nid],
        queryFn: () => getProject(nid),
      });
    } catch (error) {
      return notFound();
    }
  }
  try {
    await queryClient.query({
      queryKey: userQueryKeys.me,
      queryFn: getUser,
    });
  } catch (error) {
    return redirect("/signin");
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
