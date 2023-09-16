import { ISeries, IUpdateSeriesInput } from "@/types";
import api from "@/apis";

const getSeriesAll = async () => {
  const { data } = await api.get<ISeries[]>("/series");

  return data;
};

const getSeries = async (nid: number) => {
  const { data } = await api.get<ISeries>(`/series/${nid}`);

  return data;
};

const updateSeries = async (nid: number, body: IUpdateSeriesInput) => {
  const { data } = await api.put<ISeries>(`/series/${nid}`, body);

  return data;
};

const deleteSeries = async (nid: number) => {
  const { data } = await api.delete<ISeries>(`/series/${nid}`);

  return data;
};

export { getSeriesAll, getSeries, updateSeries, deleteSeries };
