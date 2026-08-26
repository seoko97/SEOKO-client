import { IGetPostsInput } from "@/types";

export const userQueryKeys = {
  me: ["user"] as const,
} as const;

export const postQueryKeys = {
  all: ["posts"] as const,
  list: (params: IGetPostsInput) => [...postQueryKeys.all, params] as const,
  detail: (nid: number | null) => [...postQueryKeys.all, nid] as const,
  sibling: (nid: number) => [...postQueryKeys.all, nid, "sibling"] as const,
} as const;

export const projectQueryKeys = {
  all: ["projects"] as const,
  detail: (nid: number) => [...projectQueryKeys.all, nid] as const,
} as const;

export const seriesQueryKeys = {
  all: ["series"] as const,
  detail: (nid: number) => [...seriesQueryKeys.all, nid] as const,
} as const;

export const tagQueryKeys = {
  all: ["tags"] as const,
  detail: (name: string) => [...tagQueryKeys.all, name] as const,
} as const;

export const skillQueryKeys = {
  all: ["skills"] as const,
} as const;

export const experienceQueryKeys = {
  all: ["experiences"] as const,
} as const;
