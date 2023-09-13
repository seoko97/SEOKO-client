import { ISeries } from "@/types";
import api from "@/apis";

const getSeriesAll = async () => {
  const { data } = await api.get<ISeries[]>("/series");

  return data;
};

export { getSeriesAll };
