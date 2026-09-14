import type { ReactNode } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { postQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getPosts } from "@/apis/post";

interface IProps {
  tagId: string;
  children: ReactNode;
}

const Hydrate = async ({ tagId, children }: IProps) => {
  const queryClient = getQueryClient();

  const params = { tag: tagId };

  await queryClient.infiniteQuery({
    queryKey: postQueryKeys.listByParams(params),
    queryFn: () => getPosts(params),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
