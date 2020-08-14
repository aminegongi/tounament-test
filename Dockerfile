FROM node:12-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

FROM node:alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

RUN ls -al
RUN pwd

ENTRYPOINT [ "yarn", "run", "start" ]
