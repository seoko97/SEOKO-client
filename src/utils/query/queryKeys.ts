import { IGetPostsInput } from "@/types";

export const userQueryKeys = {
  me: ["user"] as const,
} as const;

export const postQueryKeys = {
  root: ["posts"] as const,
  list: (params: IGetPostsInput) => [...postQueryKeys.root, "list", params] as const,
  detail: (nid: number | null) => [...postQueryKeys.root, "detail", nid] as const,
  sibling: (nid: number) => [...postQueryKeys.root, "sibling", nid] as const,
} as const;

export const projectQueryKeys = {
  root: ["projects"] as const,
  detail: (nid: number) => [...projectQueryKeys.root, nid] as const,
} as const;

export const seriesQueryKeys = {
  root: ["series"] as const,
  detail: (nid: number) => [...seriesQueryKeys.root, nid] as const,
} as const;

export const tagQueryKeys = {
  root: ["tags"] as const,
  detail: (name: string) => [...tagQueryKeys.root, name] as const,
} as const;

export const skillQueryKeys = {
  root: ["skills"] as const,
} as const;

export const experienceQueryKeys = {
  root: ["experiences"] as const,
} as const;
