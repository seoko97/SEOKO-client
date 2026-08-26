import React from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import getQueryClient from "@utils/query/getQueryClient";
import { getUser } from "@/apis/user";

interface IProps {
  children: React.ReactNode;
}

const Hydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
