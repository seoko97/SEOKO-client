FROM node:16-alpine as base

FROM base as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY .pnp.cjs .
COPY .pnp.loader.mjs .
COPY .yarn/releases ./.yarn/releases
COPY .yarn/cache ./.yarn/cache

RUN yarn install

COPY . .

RUN yarn build

RUN rm -rf .next/standalone/.yarn

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

COPY --from=builder /app/.yarn/releases ./.yarn/releases
COPY --from=builder /app/.yarn/cache ./.yarn/cache

COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./yarnrc.yml

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME localhost

EXPOSE 3000

CMD ["node" , "-r", "./.pnp.cjs", "server.js"]