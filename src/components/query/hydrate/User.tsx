import React from "react";

import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/query/getQueryClient";
import { getUser } from "@/apis/user";

interface IProps {
  children: React.ReactNode;
}

const UserHydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};

export default UserHydrate;
