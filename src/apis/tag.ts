import { cache } from "react";

import { ITag } from "@/types";
import { authRequest } from "@/apis";

const getTag = cache(async (name: string) => {
  return authRequest<ITag>(`/tags/${name}`, { method: "GET" });
});

const getTags = async () => {
  return authRequest<ITag[]>("/tags", { method: "GET" });
};

export { getTag, getTags };
