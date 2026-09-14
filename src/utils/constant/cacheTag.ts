const CACHE_TAG = {
  posts: "posts",
  projects: "projects",
  series: "series",
  tags: "tags",
  skills: "skills",
  experiences: "experiences",
} as const;

type CacheTag = (typeof CACHE_TAG)[keyof typeof CACHE_TAG];

export { CACHE_TAG };
export type { CacheTag };
