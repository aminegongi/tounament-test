FROM node:12-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

FROM node:alpine AS runner

WORKDIR /app

COPY --from=builder /app /app

ENTRYPOINT next start -p $PORT
