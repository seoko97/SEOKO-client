import { InMemoryCacheConfig } from "@apollo/client";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const MEMORY_CACHE_OPTIONS: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          keyArgs: ["input", ["category", "tag", "limit", "isTemporary", "text"]],
        },
      },
    },
  },
};

export { MEMORY_CACHE_OPTIONS, APOLLO_STATE_PROP_NAME };
