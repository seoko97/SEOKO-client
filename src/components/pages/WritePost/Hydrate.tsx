import React from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { postQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import getOrNotFound from "@utils/getOrNotFound";
import { getPost } from "@/apis/post";

interface IProps {
  children: React.ReactNode;
  nid: number | null;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (nid !== null) {
    await getOrNotFound(() =>
      queryClient.query({
        queryKey: postQueryKeys.detail(nid),
        queryFn: () => getPost(nid),
      }),
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
