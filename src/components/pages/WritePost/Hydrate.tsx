import React from "react";

import { notFound, redirect } from "next/navigation";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { postQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getUser } from "@/apis/user";
import { getPost } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  nid: number | null;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (nid !== null) {
    try {
      await queryClient.query({
        queryKey: postQueryKeys.detail(nid),
        queryFn: () => getPost(nid),
      });
    } catch (error) {
      return notFound();
    }
  }

  try {
    await queryClient.query({
      queryKey: ["user"],
      queryFn: getUser,
    });
  } catch (error) {
    return redirect("/signin");
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
