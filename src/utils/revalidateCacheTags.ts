"use server";

import { updateTag } from "next/cache";

import type { CacheTag } from "@utils/constant/cacheTag";

const revalidateCacheTags = async (tags: CacheTag[]) => {
  tags.forEach((tag) => updateTag(tag));
};

export { revalidateCacheTags };
