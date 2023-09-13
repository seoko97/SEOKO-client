import { useQuery } from "@tanstack/react-query";
import { getSeriesAll } from "@/apis/series";

const useGetSeriesQueries = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: getSeriesAll,
  });
};

export { useGetSeriesQueries };
