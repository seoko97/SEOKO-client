import { cache } from "react";

import { CACHE_TAG } from "@utils/constant/cacheTag";
import { ISeries, IUpdateSeriesInput } from "@/types";
import { authRequest, request } from "@/apis";

const getSeriesAll = async () => {
  return request<ISeries[]>("/series", {
    method: "GET",
    next: { revalidate: 300, tags: [CACHE_TAG.series] },
  });
};

const getSeries = cache(async (nid: number) => {
  return request<ISeries>(`/series/${nid}`, {
    method: "GET",
    next: { revalidate: 300, tags: [CACHE_TAG.series] },
  });
});

const updateSeries = async (nid: number, body: IUpdateSeriesInput) => {
  return authRequest<ISeries>(`/series/${nid}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

const deleteSeries = async (nid: number) => {
  return authRequest<ISeries>(`/series/${nid}`, { method: "DELETE" });
};

export { getSeriesAll, getSeries, updateSeries, deleteSeries };
