import React from "react";

import { notFound } from "next/navigation";

import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/query/getQueryClient";
import { getPost } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  nid: number | null;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (nid !== null) {
    try {
      await queryClient.fetchQuery({
        queryKey: ["post", nid],
        queryFn: () => getPost(nid),
      });
    } catch (error) {
      return notFound();
    }
  }

  const dehydratedState = dehydrate(queryClient);

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
