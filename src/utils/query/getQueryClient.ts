import { cache } from "react";

import { QueryClient } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5;

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: STALE_TIME } },
    }),
);

export { STALE_TIME };
export default getQueryClient;
