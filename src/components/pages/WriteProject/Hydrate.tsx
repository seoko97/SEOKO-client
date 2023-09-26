import React from "react";

import { notFound, redirect } from "next/navigation";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
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
      await queryClient.fetchQuery({
        queryKey: ["project", nid],
        queryFn: () => getProject(nid),
      });
    } catch (error) {
      return notFound();
    }
  }
  try {
    await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: getUser,
    });
  } catch (error) {
    return redirect("/signin");
  }

  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
