import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { seriesQueryKeys } from "@utils/query/queryKeys";
import { ISeries, IUpdateSeriesInput } from "@/types";
import { deleteSeries, getSeries, getSeriesAll, updateSeries } from "@/apis/series";

const useGetSeriesQueries = () => {
  return useQuery({
    queryKey: seriesQueryKeys.root,
    queryFn: getSeriesAll,
  });
};

const useGetSeriesQuery = (nid: number | null = null) => {
  const queryKey = nid === null ? seriesQueryKeys.root : seriesQueryKeys.detail(nid);

  return useQuery({
    queryKey,
    queryFn: () => {
      if (!nid) return null;

      return getSeries(nid);
    },
    enabled: nid !== null,
  });
};

const useUpdateSeriesMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateSeriesInput) => updateSeries(nid, data),
    onMutate: async (data: IUpdateSeriesInput) => {
      await queryClient.cancelQueries({ queryKey: seriesQueryKeys.root });

      const previousSeries = queryClient.getQueryData<ISeries>(seriesQueryKeys.detail(nid));

      if (!previousSeries) return;

      const previousSeriesList = queryClient.getQueryData<ISeries[]>(seriesQueryKeys.root);

      const newSeries: ISeries = { ...previousSeries, name: data.name, thumbnail: data.thumbnail };

      queryClient.setQueryData<ISeries>(seriesQueryKeys.detail(nid), (prev) => {
        if (!prev) return prev;

        return newSeries;
      });

      queryClient.setQueryData<ISeries[]>(seriesQueryKeys.root, (prev) => {
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

      queryClient.setQueryData<ISeries>(seriesQueryKeys.detail(nid), previousSeries);
      queryClient.setQueryData<ISeries[]>(seriesQueryKeys.root, previousSeriesList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.detail(nid) });
      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.root });
    },
  });
};

const useDeleteSeriesMutation = (nid: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteSeries(nid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: seriesQueryKeys.root });

      const previousSeries = queryClient.getQueryData<ISeries>(seriesQueryKeys.detail(nid));
      const previousSeriesList = queryClient.getQueryData<ISeries[]>(seriesQueryKeys.root);

      queryClient.setQueryData<ISeries[]>(seriesQueryKeys.root, (prev) => {
        if (!prev) return prev;

        return prev.filter((series) => series.nid !== nid);
      });

      queryClient.removeQueries({ queryKey: seriesQueryKeys.detail(nid) });

      return { previousSeries, previousSeriesList };
    },
    onError: (_, __, context) => {
      if (!context) return;

      const { previousSeries, previousSeriesList } = context;

      queryClient.setQueryData<ISeries>(seriesQueryKeys.detail(nid), previousSeries);
      queryClient.setQueryData<ISeries[]>(seriesQueryKeys.root, previousSeriesList);
    },
    onSettled: () => {
      router.push("/series");

      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.detail(nid) });
      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.root });
    },
  });
};

export { useGetSeriesQueries, useGetSeriesQuery, useUpdateSeriesMutation, useDeleteSeriesMutation };
