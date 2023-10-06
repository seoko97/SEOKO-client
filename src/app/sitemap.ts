import { HOST } from "@utils/constant/env";
import { getPosts } from "@/apis/post";

const ROUTES = ["", "/project", "/series", "/about"];

const sitemap = async () => {
  const posts = (await getPosts({ sort: 1, limit: 9999 })).map(({ nid, createdAt }) => ({
    url: `${HOST}/post/${nid}`,
    lastModified: createdAt,
  }));

  const routes = ROUTES.map((route) => ({
    url: `${HOST}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
};

export default sitemap;
