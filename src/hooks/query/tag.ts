import { useQuery } from "@tanstack/react-query";
import { getTag } from "@/apis/tag";

const useGetTagQuery = (name: string) => {
  return useQuery({
    queryKey: ["tag", name],
    queryFn: () => getTag(name),
  });
};

export { useGetTagQuery };
