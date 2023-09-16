import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISeries, IUpdateSeriesInput } from "@/types";
import { deleteSeries, getSeries, getSeriesAll, updateSeries } from "@/apis/series";

const useGetSeriesQueries = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: getSeriesAll,
  });
};

const useGetSeriesQuery = (nid: number) => {
  return useQuery({
    queryKey: ["series", nid],
    queryFn: () => getSeries(nid),
  });
};

const useUpdateSeriesMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateSeriesInput) => updateSeries(nid, data),
    onMutate: (data: IUpdateSeriesInput) => {
      queryClient.cancelQueries(["series", nid]);

      const previousSeries = queryClient.getQueryData<ISeries>(["series", nid]);

      if (!previousSeries) return;

      const previousSeriesList = queryClient.getQueryData<ISeries[]>(["series"]);

      const newSeries: ISeries = { ...previousSeries, name: data.name, thumbnail: data.thumbnail };

      queryClient.setQueryData<ISeries>(["series", nid], (prev) => {
        if (!prev) return prev;

        return newSeries;
      });

      queryClient.setQueryData<ISeries[]>(["series"], (prev) => {
        if (!prev) return prev;

        return prev.map((series) => {
          if (series.nid !== nid) return series;

          return newSeries;
        });
      });

      return { previousSeries, previousSeriesList };
    },
    onError: (_, __, context) => {
      if (!context) return;

      const { previousSeries, previousSeriesList } = context;

      queryClient.setQueryData<ISeries>(["series", nid], previousSeries);
      queryClient.setQueryData<ISeries[]>(["series"], previousSeriesList);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["series", nid]);
      queryClient.invalidateQueries(["series"]);
    },
  });
};

const useDeleteSeriesMutation = (nid: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteSeries(nid),
    onMutate: () => {
      queryClient.cancelQueries(["series", nid]);

      const previousSeries = queryClient.getQueryData<ISeries>(["series", nid]);
      const previousSeriesList = queryClient.getQueryData<ISeries[]>(["series"]);

      queryClient.setQueryData<ISeries[]>(["series"], (prev) => {
        if (!prev) return prev;

        return prev.filter((series) => series.nid !== nid);
      });

      queryClient.removeQueries(["series", nid]);

      return { previousSeries, previousSeriesList };
    },
    onError: (_, __, context) => {
      if (!context) return;

      const { previousSeries, previousSeriesList } = context;

      queryClient.setQueryData<ISeries>(["series", nid], previousSeries);
      queryClient.setQueryData<ISeries[]>(["series"], previousSeriesList);
    },
    onSettled: () => {
      router.push("/series");

      queryClient.invalidateQueries(["series", nid]);
      queryClient.invalidateQueries(["series"]);
    },
  });
};

export { useGetSeriesQueries, useGetSeriesQuery, useUpdateSeriesMutation, useDeleteSeriesMutation };
