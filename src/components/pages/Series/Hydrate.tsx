import React from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { seriesQueryKeys } from "@utils/query/queryKeys";
import getQueryClient from "@utils/query/getQueryClient";
import { getSeriesAll } from "@/apis/series";

interface IProps {
  children: React.ReactNode;
}

const Hydrate = async ({ children }: IProps) => {
  const queryClient = getQueryClient();

  const series = await queryClient.query({
    queryKey: seriesQueryKeys.all,
    queryFn: getSeriesAll,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-[theme(screens.md.max)] px-0 py-4 sm:mb-4 md:w-full">
        <h1 className="mb-2 text-4xl font-bold text-primary transition-[color]">
          SERIES
          <span className="ml-4 align-top text-sm font-normal">{series.length} series</span>
        </h1>
        <p className="text-slate-500 transition-[color] dark:text-slate-400">
          연재된 시리즈 목록입니다.
        </p>
      </div>
      <div className="mb-8 mt-4 h-1 w-[300px] bg-slate-300 sm:hidden" />
      {children}
    </HydrationBoundary>
  );
};

export default Hydrate;
