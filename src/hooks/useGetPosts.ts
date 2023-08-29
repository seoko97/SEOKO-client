import { useCallback } from "react";

import { useGetPostsQuery } from "@hooks/query/post";
import { IGetPostsInput } from "@/types";

const useGetPosts = (params: IGetPostsInput) => {
  const { data, fetchNextPage } = useGetPostsQuery(params);

  const posts = data?.pages?.flat() ?? [];

  const fetchMore = useCallback(() => {
    const limit = params.limit ?? 10;

    if (posts.length % limit !== 0) return;

    fetchNextPage();
  }, [params.limit, posts.length, fetchNextPage]);

  return [posts, fetchMore] as const;
};

export default useGetPosts;
