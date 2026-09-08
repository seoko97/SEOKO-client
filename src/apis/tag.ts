import { cache } from "react";

import { ITag } from "@/types";
import { request } from "@/apis";

const getTag = cache(async (name: string) => {
  return request<ITag>(`/tags/${name}`, { method: "GET" });
});

const getTags = async () => {
  return request<ITag[]>("/tags", { method: "GET" });
};

export { getTag, getTags };
