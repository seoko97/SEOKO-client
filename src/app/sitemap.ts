import { MetadataRoute } from "next";

import { API_URL, HOST } from "@utils/constant/env";
import { IPost } from "@/types";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const query = new URLSearchParams({ sort: "1", limit: "9999" }).toString();
  const url = `${API_URL}/posts?${query}`;

  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });

    const posts = (await res.json()) as IPost[];

    const postsSiteMap = posts.map(({ nid, createdAt }) => ({
      url: `${HOST}/post/${nid}`,
      lastModified: createdAt,
    }));

    const routes = ["", "/project", "/series", "/about"].map((route) => ({
      url: `${HOST}${route}`,
      lastModified: new Date().toISOString(),
    }));

    return [...routes, ...postsSiteMap];
  } catch (e) {
    return [];
  }
}

export default sitemap;
