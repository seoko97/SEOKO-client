import { cache } from "react";

import { ISeries, IUpdateSeriesInput } from "@/types";
import { authRequest } from "@/apis";

const getSeriesAll = async () => {
  return authRequest<ISeries[]>("/series", { method: "GET" });
};

const getSeries = cache(async (nid: number) => {
  return authRequest<ISeries>(`/series/${nid}`, { method: "GET" });
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
