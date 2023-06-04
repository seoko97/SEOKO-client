import { InMemoryCacheConfig } from "@apollo/client";

import { mergeItem } from "@/utils/apollo/mergeItem";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const MEMORY_CACHE_OPTIONS: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          keyArgs: ["input", ["category", "tag", "limit", "isTemporary", "text"]],
          merge: mergeItem,
        },
      },
    },
  },
};

export { MEMORY_CACHE_OPTIONS, APOLLO_STATE_PROP_NAME };
