import React from "react";

import getQueryClient from "@utils/query/getQueryClient";
import { Hydrate as RqHydrate, dehydrate } from "@tanstack/react-query";
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

  return <RqHydrate state={dehydratedState}>{children}</RqHydrate>;
};

export default Hydrate;
