import type { ReactNode } from "react";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { projectQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import getOrNotFound from "@utils/getOrNotFound";
import { getProject } from "@/apis/project";

interface IProps {
  children: ReactNode;
  nid: number | null;
}

const Hydrate = async ({ children, nid }: IProps) => {
  const queryClient = getQueryClient();

  if (nid !== null) {
    await getOrNotFound(() =>
      queryClient.query({
        queryKey: projectQueryKeys.detail(nid),
        queryFn: () => getProject(nid),
      }),
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default Hydrate;
