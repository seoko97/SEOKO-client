import { ITag } from "@/types";
import api from "@/apis";

const getTag = async (name: string) => {
  const { data } = await api.get<ITag>(`/tags/${name}`);

  return data;
};

export { getTag };
