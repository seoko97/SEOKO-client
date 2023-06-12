import { GetServerSidePropsContext } from "next";
import isEqual from "lodash.isequal";
import merge from "deepmerge";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

import { API_URL, isProd } from "@/utils/constants";

import { MEMORY_CACHE_OPTIONS } from "./constants";

interface IInitializeApollo {
  initialState?: NormalizedCacheObject;
  ctx?: GetServerSidePropsContext;
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const createApolloClient = ({ initialState, ctx }: IInitializeApollo) => {
  const cache = new InMemoryCache(MEMORY_CACHE_OPTIONS);

  const httpLink = createUploadLink({
    uri: `${API_URL}/graphql`,
    credentials: "include",
    headers: ctx?.req.headers as unknown as Record<string, string>,
  });

  const createClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: cache.restore(initialState ?? {}),
    link: from([httpLink]),
    connectToDevTools: !isProd,
    defaultOptions: { query: { errorPolicy: "all" } },
  });

  return createClient;
};

export const initializeClient = ({ initialState, ctx }: IInitializeApollo = {}) => {
  const _apolloClient = apolloClient ?? createApolloClient({ initialState, ctx });

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export type { IInitializeApollo };
