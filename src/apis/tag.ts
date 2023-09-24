import { cache } from "react";

import { ITag } from "@/types";
import api from "@/apis";

const getTag = cache(async (name: string) => {
  const { data } = await api.get<ITag>(`/tags/${name}`);

  return data;
});

const getTags = async () => {
  const { data } = await api.get<ITag[]>("/tags");

  return data;
};

export { getTag, getTags };
