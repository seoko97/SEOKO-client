import { cache } from "react";

import { CACHE_TAG } from "@utils/constant/cacheTag";
import { ITag } from "@/types";
import { request } from "@/apis";

const getTag = cache(async (name: string) => {
  return request<ITag>(`/tags/${encodeURIComponent(name)}`, {
    method: "GET",
    next: { revalidate: 3600, tags: [CACHE_TAG.tags] },
  });
});

const getTags = async () => {
  return request<ITag[]>("/tags", {
    method: "GET",
    next: { revalidate: 3600, tags: [CACHE_TAG.tags] },
  });
};

export { getTag, getTags };
