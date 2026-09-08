import { cache } from "react";

import { ITag } from "@/types";
import { request } from "@/apis";

const getTag = cache(async (name: string) => {
  return request<ITag>(`/tags/${name}`, { method: "GET", next: { revalidate: 3600 } });
});

const getTags = async () => {
  return request<ITag[]>("/tags", { method: "GET", next: { revalidate: 3600 } });
};

export { getTag, getTags };
