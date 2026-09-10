import type { MetadataRoute } from "next";

import { siteMetadata } from "@utils/constant/metadata";
import { API_URL } from "@utils/constant/env";
import type { IPost } from "@/types";

const createUrl = (path: string) => new URL(path, siteMetadata.siteUrl).toString();

const staticRoutes: MetadataRoute.Sitemap = ["/", "/project", "/series", "/about"].map((path) => ({
  url: createUrl(path),
}));

const getPostSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const query = new URLSearchParams({ sort: "1", limit: "9999" }).toString();
  const url = `${API_URL}/posts?${query}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return [];
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    const posts = data as IPost[];

    return posts.map(({ nid, createdAt, updatedAt }: IPost) => ({
      url: createUrl(`/post/${nid}`),
      lastModified: updatedAt || createdAt,
    }));
  } catch {
    return [];
  }
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSitemap();

  return [...staticRoutes, ...posts];
}

export default sitemap;
