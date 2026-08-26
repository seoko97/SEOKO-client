import { useQuery } from "@tanstack/react-query";

import { tagQueryKeys } from "@utils/query/queryKeys";
import { getTag } from "@/apis/tag";

const useGetTagQuery = (name: string) => {
  return useQuery({
    queryKey: tagQueryKeys.detail(name),
    queryFn: () => getTag(name),
  });
};

export { useGetTagQuery };
