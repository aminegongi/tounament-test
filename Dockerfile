FROM node:12-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build \
    && mkdir _server && cd _server \
    && mv ../yarn.lock . && yarn init -y \
    && yarn add next

RUN ls -al .next
RUN pwd

FROM node:alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/ .next/
COPY --from=builder /app/_server/ ./
RUN ls -al
RUN pwd

ENTRYPOINT [ "yarn", "run", "start" ]
