import React from "react";

import { notFound } from "next/navigation";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
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
